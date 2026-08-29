import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { useReadingStats, useLatestReading } from "@/hooks/use-sari";
import { Lightbulb, Leaf, DollarSign, AlertTriangle, CheckCircle, Zap, ZapOff, RefreshCw } from "lucide-react";

export default function EnergyTips() {
  const { data: stats } = useReadingStats();
  const { data: latest } = useLatestReading();

  // --- حالات التحكم في التنبيه المنبثق ---
  const [showHazardModal, setShowHazardModal] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isAutoOff, setIsAutoOff] = useState(false);

  // 1. مراقبة مستوى الخطر (Critical Monitoring)
  useEffect(() => {
    // إذا وصل مستوى الخطر لـ CRITICAL تظهر النافذة فوراً
    if (latest?.riskLevel === "CRITICAL" && !showHazardModal && !isAutoOff) {
      setShowHazardModal(true);
      setCountdown(30);
    }
  }, [latest?.riskLevel]);

  // 2. منطق العداد التنازلي
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showHazardModal && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (showHazardModal && countdown === 0) {
      handleAction("AUTO_SHUTDOWN");
    }
    return () => clearTimeout(timer);
  }, [showHazardModal, countdown]);

  // 🚀 دالة التحكم (إرسال الأوامر للسيرفر)
  const handleAction = async (type: "MANUAL" | "AUTO_SHUTDOWN" | "IGNORE") => {
    setShowHazardModal(false);
    
    if (type !== "IGNORE") {
      setIsAutoOff(true);
      
      try {
        // إرسال أمر الإطفاء للسيرفر لكي يراه الأردوينو
        await fetch("/api/device/control", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ powerStatus: "OFF" }),
        });
        console.log(`🔌 SARI: Command ${type} sent to server`);
      } catch (err) {
        console.error("Failed to send shutdown command", err);
      }
    }
  };

  // 🔄 دالة إعادة تشغيل الكهرباء
  const handleReconnect = async () => {
    try {
      await fetch("/api/device/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ powerStatus: "ON" }),
      });
      setIsAutoOff(false); // إخفاء رسالة الإطفاء والعودة للوضع الطبيعي
      console.log("🔌 SARI: Power Reconnected Successfully");
    } catch (err) {
      console.error("Failed to reconnect power", err);
    }
  };

  const avgPower = stats?.averagePower || 0;

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-display font-bold">Smart Energy Guide</h1>
          <p className="text-muted-foreground">Monitoring your consumption and protecting your home.</p>
        </header>

        {/* بطاقة الحالة الحالية بناءً على الواط */}
{/* بطاقة الاستهلاك الحالي - مربوطة ببيانات الحساس الحقيقية */}
{/* بطاقة الاستهلاك الذكية - تتفاعل مع قوة الواط */}
        <section className="mb-8">
          <div className={`p-8 rounded-2xl border transition-all duration-500 flex items-center gap-6 shadow-xl ${
            Number(latest?.power) > 3000 ? "bg-red-950/30 border-red-500/50" : 
            Number(latest?.power) > 1500 ? "bg-yellow-950/30 border-yellow-500/50" : 
            "bg-[#1a1f2c] border-white/5"
          }`}>
            <div className={`p-4 rounded-xl ${
              Number(latest?.power) > 3000 ? "bg-red-500/20" : 
              Number(latest?.power) > 1500 ? "bg-yellow-500/20" : 
              "bg-primary/10"
            }`}>
              <Zap className={`${
                Number(latest?.power) > 3000 ? "text-red-500 animate-pulse" : 
                Number(latest?.power) > 1500 ? "text-yellow-500" : 
                "text-primary"
              } w-10 h-10`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Current Consumption</h3>
              <p className="text-lg font-mono mb-1">
                <span className={
                  Number(latest?.power) > 3000 ? "text-red-500 font-black" : 
                  Number(latest?.power) > 1500 ? "text-yellow-500 font-bold" : 
                  "text-primary font-bold"
                }>
                  {latest?.power ? latest.power.toFixed(0) : "0"}W
                </span>
              </p>
              
              {/* ✅ نظام النصائح التلقائي بناءً على الواط */}
              <p className="text-sm font-medium">
                {Number(latest?.power) > 3000 ? (
                  <span className="text-red-400">⚠️ High Usage: Please turn off heavy appliances like AC or Water Heater!</span>
                ) : Number(latest?.power) > 1500 ? (
                  <span className="text-yellow-400">⚡ Moderate Usage: Consider reducing unnecessary lighting.</span>
                ) : (
                  <span className="text-green-400">✅ Normal Usage: Your energy consumption is well-optimized.</span>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* نصائح توفير الطاقة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-xl border border-border">
            <Lightbulb className="text-yellow-500 mb-4" />
            <h3 className="font-bold mb-2">Lighting Optimization</h3>
            <p className="text-sm text-muted-foreground">Switch to LED bulbs to save up to 75% energy.</p>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <Leaf className="text-green-500 mb-4" />
            <h3 className="font-bold mb-2">AC Maintenance</h3>
            <p className="text-sm text-muted-foreground">Keep your AC at 24°C for the best efficiency.</p>
          </div>
        </div>

        {/* --- 🚨 نافذة التنبيه المنبثقة (Emergency Pop-up) --- */}
        {showHazardModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <div className="bg-card border-4 border-destructive w-full max-w-lg p-10 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex flex-col items-center text-center">
                <AlertTriangle className="text-destructive w-16 h-16 mb-6 animate-bounce" />
                <h2 className="text-3xl font-black text-destructive mb-3">EMERGENCY ALERT!</h2>
                <p className="text-lg mb-6">Critical hazard detected! Should SARI cut power now?</p>
                
                <div className="text-6xl font-mono font-black text-primary mb-8">{countdown}s</div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <button onClick={() => handleAction("MANUAL")} className="bg-destructive text-white py-4 rounded-2xl font-bold hover:scale-105 transition-all">YES, SHUTDOWN</button>
                  <button onClick={() => handleAction("IGNORE")} className="bg-secondary text-foreground py-4 rounded-2xl font-bold">IGNORE</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* رسالة تأكيد الإطفاء + زر إعادة التشغيل */}
        {isAutoOff && (
          <div className="fixed bottom-10 right-10 bg-destructive text-white p-6 rounded-2xl shadow-2xl animate-in slide-in-from-right flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <ZapOff />
              <div>
                <p className="font-bold">POWER DISCONNECTED</p>
                <p className="text-xs opacity-80">Safety protocol executed.</p>
              </div>
            </div>
            
            {/* ✅ زر إعادة التشغيل المضاف */}
            <button 
              onClick={handleReconnect}
              className="bg-white text-destructive font-black py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-inner"
            >
              <RefreshCw size={18} />
              RECONNECT POWER
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
