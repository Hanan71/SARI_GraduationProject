import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { setupAuth } from "./auth"; // تم التغيير للاعتماد على ملف auth المحلي الجديد
import { z } from "zod";
import { InsertReading, InsertAlert } from "@shared/schema";


let currentPowerStatus = "ON"; // تعريف الحالة هنا لتبقى محفوظة


export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // 1. إعداد نظام التوثيق المستقل (اسم المستخدم وكلمة المرور)
  setupAuth(app);

  // --- API Routes ---

  // جلب آخر قراءة من الحساسات
  app.get(api.readings.latest.path, async (req, res) => {
    const reading = await storage.getLatestReading();
    if (!reading) return res.json(null);
    res.json(reading);
  });

  // جلب سجل القراءات (للرسم البياني)
  app.get(api.readings.history.path, async (req, res) => {
    const limit = Number(req.query.limit) || 50;
    const history = await storage.getReadingsHistory(limit);
    res.json(history.reverse());
  });

    // جلب الإحصائيات العامة للداشبورد (المتوافق مع AnalyticsPage)
      app.get(api.readings.stats.path, async (req, res) => {
        try {
          const history = await storage.getReadingsHistory(100);
          const allAlerts = await storage.getAlerts();

          if (history.length === 0) {
            return res.json({
              averagePower: 0,
              peakCurrent: 0,
              totalAlerts: allAlerts.length
            });
          }
          
          // حساب مجموع الواط
          const totalPower = history.reduce((sum, r) => sum + (Number(r.power) || 0), 0);
          
          // حساب أعلى تيار (Peak)
          const maxCurrent = Math.max(...history.map(r => Number(r.current) || 0));
          
          res.json({
            averagePower: totalPower / history.length,
            peakCurrent: maxCurrent,
            totalAlerts: allAlerts.length // هنا نرسل كل التنبيهات لتظهر في صفحة Analytics
          });
        } catch (error) {
          res.status(500).json({ error: "Failed to calculate stats" });
        }
      });

      // جلب قائمة التنبيهات (هذا الكود سليم ابقيه كما هو)
      app.get(api.alerts.list.path, async (req, res) => {
        const alerts = await storage.getAlerts();
        res.json(alerts);
      });

  // تحديد التنبيه كـ "مقروء"
  app.patch(api.alerts.markRead.path, async (req, res) => {
    const id = Number(req.params.id);
    const updated = await storage.markAlertAsRead(id);
    if (!updated) return res.status(404).json({ message: "Alert not found" });
    res.json(updated);
  });

    
    
    // 1. استقبال التنبيهات من الأردوينو وحفظها
        app.post("/api/alerts", async (req, res) => {
          console.log("------------------------------------");
          console.log("📥 Incoming Alert from Arduino:", req.body);
          
          try {
            const { severity, type, message } = req.body;
            
            const newAlert = await storage.createAlert({
              type: (type === "OVERLOAD" || type === "LEAKAGE" || type === "OVERHEATING" || type === "SHORT_CIRCUIT")
                    ? type : "OVERLOAD",
              message: message || "Arduino Alert",
              severity: (severity === "LOW" || severity === "MEDIUM" || severity === "HIGH" || severity === "CRITICAL")
                        ? severity : "CRITICAL",
              isRead: false,
              timestamp: new Date() // أضفناه هنا أيضاً للأمان
            });

            console.log("✅ SUCCESS: Saved Alert to Neon ID:", newAlert.id);
            res.status(201).json(newAlert);
          } catch (error: any) {
            console.log("❌ ERROR DURING ALERT SAVE:", error.message);
            res.status(500).json({ error: error.message });
          }
          console.log("------------------------------------");
        });

    
    
    // 2. استقبال القراءات الكهربائية وتحديث الرسم البياني
            app.post("/api/readings", async (req, res) => {
              try {
                // طباعة ما يصلنا من الأردوينو للتأكد
                console.log("📈 Data Received:", req.body);

                // استخراج القيم وتحويلها لأرقام (استخدمنا الأسماء التي يرسلها الأردوينو)
                const v = parseFloat(req.body.voltage) || 0;
                const c = parseFloat(req.body.current) || 0;

                const newReading = await storage.addReading({
                  voltage: v,
                  current: c,
                  leakageCurrent: 0.1, // قيمة بسيطة لكي لا يظهر 0.0 في العداد
                  temperature: 25.0,    // قيمة ثابتة مبدئياً للحرارة
                  power: v * c,
                  // مطابقة الـ Enum الموجود في السكيما (SAFE, MODERATE, HIGH, CRITICAL)
                  riskLevel: c > 15 ? "CRITICAL" : (c > 10 ? "HIGH" : "SAFE"),
                  timestamp: new Date()
                });

                console.log(`✅ Reading Saved: ${v}V, ${c}A`);
                res.status(201).json(newReading);
              } catch (error: any) {
                console.error("❌ Reading Error:", error.message);
                res.status(500).json({ error: "Reading error" });
              }
            });
    
    
    
    
  // حالة المحاكاة (Simulation)
  app.get(api.simulation.status.path, async (req, res) => {
    const config = await storage.getSimulationConfig();
    res.json(config);
  });

  // التحكم في تشغيل/إيقاف المحاكاة
  app.post(api.simulation.toggle.path, async (req, res) => {
    try {
      const input = api.simulation.toggle.input.parse(req.body);
      await storage.updateSimulationConfig(input);
      res.json({ message: "Simulation updated" });
    } catch (e) {
      res.status(400).json({ message: "Invalid input" });
    }
  });


    
    // --- ضعيه هنا (داخل الدالة وقبل المحاكاة) ---
      app.post("/api/device/control", async (req, res) => {
        const { powerStatus } = req.body;
        if (powerStatus) {
          currentPowerStatus = powerStatus;
          console.log(`🔌 Power Command Received: ${currentPowerStatus}`);
          return res.json({ success: true, status: currentPowerStatus });
        }
        res.status(400).json({ error: "Invalid status" });
      });

      app.get("/api/device/status", (req, res) => {
        res.send(currentPowerStatus);
      });
      // ------------------------------------------


    
          
  // --- دورة المحاكاة (محاكاة طبقة الحساسات وذكاء Sari الاصطناعي) ---
  setInterval(async () => {
    const config = await storage.getSimulationConfig();
    if (!config.isRunning) return;

    // قيم أساسية (حالة طبيعية)
    let current = 5 + Math.random() * 2; // 5-7 أمبير
    let voltage = 220 + Math.random() * 5; // 220-225 فولت
    let leakage = Math.random() * 2; // 0-2 مللي أمبير (آمن)
    let temperature = 35 + Math.random() * 5; // 35-40 درجة مئوية

    // تعديل القيم بناءً على سيناريوهات الأعطال
    if (config.scenario === "LEAKAGE_FAULT") {
      leakage = 25 + Math.random() * 15; // تهريب خطير
    } else if (config.scenario === "OVERLOAD") {
      current = 25 + Math.random() * 10; // حمل زائد
      temperature += 20;
    } else if (config.scenario === "OVERHEATING") {
      temperature = 75 + Math.random() * 15; // حرارة مرتفعة جداً
    }

    const power = current * voltage;

    // منطق تصنيف المخاطر (AI Mock)
    let riskLevel: "SAFE" | "MODERATE" | "HIGH" | "CRITICAL" = "SAFE";
    
    if (leakage > 30) {
      riskLevel = "CRITICAL";
      if (Math.random() > 0.8) {
        await storage.createAlert({
          type: "LEAKAGE",
          message: `Critical Leakage Detected: ${leakage.toFixed(1)}mA`,
          severity: "CRITICAL",
          isRead: false
        });
      }
    } else if (current > 20) {
      riskLevel = "HIGH";
      if (Math.random() > 0.9) {
        await storage.createAlert({
          type: "OVERLOAD",
          message: `System Overload: ${current.toFixed(1)}A`,
          severity: "HIGH",
          isRead: false
        });
      }
    } else if (temperature > 60) {
      riskLevel = "MODERATE";
      if (Math.random() > 0.9) {
        await storage.createAlert({
          type: "OVERHEATING",
          message: `High Temperature: ${temperature.toFixed(1)}°C`,
          severity: "MEDIUM",
          isRead: false
        });
      }
    }

    // حفظ القراءة في قاعدة البيانات (Neon)
    await storage.addReading({
      current,
      voltage,
      leakageCurrent: leakage,
      temperature,
      power,
      riskLevel
    });

  }, 2000); // تحديث كل ثانيتين

  return httpServer;
}


