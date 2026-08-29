import { useState, useEffect } from "react"; 
import { Loader2 } from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { useLocation } from "wouter";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { login, user } = useAuth() as any; 
  const [, setLocation] = useLocation();

  // توجيه المستخدم إذا كان مسجلاً بالفعل
  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  if (user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      if (isLogin) {
        await login({ username, password });
      } else {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          await login({ username, password });
        } else {
          const data = await response.json();
          alert("Error: " + (data.message || "Failed to register"));
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Connection error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", backgroundColor: "#0f172a", color: "white", fontFamily: "sans-serif" }}>
      
      {/* Branding Section (الجزء الأيسر) */}
      <div style={{ 
        flex: 1.2, // زيادة مساحة الجزء الأيسر ليتناسب مع حجم الشعار
        padding: "60px", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        borderRight: "1px solid #1e293b",
        background: "radial-gradient(circle at 30% 50%, #1e293b 0%, #0f172a 100%)" // تدرج خفيف لإبراز الشعار
      }}>
        
        {/* الشعار - حجم كبير جداً وبارز */}
        <div style={{ marginBottom: "50px", display: "flex", justifyContent: "flex-start" }}>
          <img 
            src="/logo.png" 
            alt="Sari Logo" 
            style={{ 
              height: "400px", // حجم ضخم كما طلبت
              width: "auto",
              maxWidth: "95%", 
              objectFit: "contain",
              // تأثير الظل المضيء لجعل الشعار بارزاً (Pop-out effect)
              filter: "drop-shadow(0px 0px 30px rgba(34, 211, 238, 0.3))" 
            }} 
          />
        </div>

        <h2 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px", lineHeight: "1.2" }}>
          Intelligent Electrical <br />
          <span style={{ color: "#22d3ee" }}>Safety Systems</span>
        </h2>
        <p style={{ fontSize: "1.3rem", color: "#94a3b8", maxWidth: "550px", lineHeight: "1.6" }}>
          Real-time monitoring and AI-driven hazard detection.
        </p>
      </div>

      {/* Form Section (الجزء الأيمن) */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ backgroundColor: "#1e293b", padding: "45px", borderRadius: "28px", width: "100%", maxWidth: "420px", border: "1px solid #334155", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
          <h2 style={{ textAlign: "center", marginBottom: "35px", fontSize: "1.8rem" }}>
            {isLogin ? "Access Dashboard" : "Create Account"}
          </h2>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: "14px", borderRadius: "12px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "white", fontSize: "1rem", outline: "none" }}
                required
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: "14px", borderRadius: "12px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "white", fontSize: "1rem", outline: "none" }}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              style={{ 
                padding: "16px", 
                borderRadius: "12px", 
                border: "none", 
                backgroundColor: "#06b6d4", 
                color: "black", 
                fontWeight: "bold", 
                cursor: "pointer", 
                fontSize: "1.1rem",
                transition: "all 0.2s" 
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#22d3ee"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#06b6d4"}
            >
              {isProcessing ? <Loader2 className="animate-spin mx-auto" /> : (isLogin ? "Sign In" : "Register")}
            </button>
            
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              style={{ background: "none", border: "none", color: "#22d3ee", cursor: "pointer", textDecoration: "underline", fontSize: "0.95rem" }}>
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}