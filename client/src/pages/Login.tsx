import { useState, useEffect } from "react"; // دمجنا useEffect هنا
import { Zap, Loader2 } from "lucide-react";
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
      {/* Branding Section */}
      <div style={{ flex: 1, padding: "60px", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "1px solid #1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
          <Zap size={50} color="#22d3ee" fill="#22d3ee" />
          <h1 style={{ fontSize: "3.5rem", fontWeight: "bold", margin: 0 }}>SARI</h1>
        </div>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
          Intelligent Electrical <br />
          <span style={{ color: "#22d3ee" }}>Safety Systems</span>
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#94a3b8", maxWidth: "450px" }}>
          Real-time monitoring and AI-driven hazard detection.
        </p>
      </div>

      {/* Form Section */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ backgroundColor: "#1e293b", padding: "40px", borderRadius: "24px", width: "100%", maxWidth: "400px", border: "1px solid #334155" }}>
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
            {isLogin ? "Access Dashboard" : "Create Account"}
          </h2>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: "12px", borderRadius: "10px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "white" }}
                required
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: "12px", borderRadius: "10px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "white" }}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              style={{ padding: "15px", borderRadius: "10px", border: "none", backgroundColor: "#06b6d4", color: "black", fontWeight: "bold", cursor: "pointer" }}
            >
              {isProcessing ? <Loader2 className="animate-spin mx-auto" /> : (isLogin ? "Sign In" : "Register")}
            </button>
            
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              style={{ background: "none", border: "none", color: "#22d3ee", cursor: "pointer", textDecoration: "underline", fontSize: "0.9rem" }}>
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}