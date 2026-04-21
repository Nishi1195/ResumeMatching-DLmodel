import { useLayoutEffect, useRef, useState, useEffect } from "react";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

type ApiResponse = {
  match_probability: number;
  verdict: string;
};

const AppPage: React.FC = () => {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animations
      gsap.from(".app-header > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".input-card", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        stagger: 0.1,
        ease: "power2.out",
      });

      gsap.from(".analyze-btn", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "back.out(1.7)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Keyboard shortcut: Ctrl + Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        if (!loading && resume && jobDesc) {
          analyze();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resume, jobDesc, loading]);

  const analyze = async () => {
    if (!resume || !jobDesc) return;

    setLoading(true);
    setResult(null);
    try {
      const startTime = Date.now();
      const res = await axios.post<ApiResponse>("/predict", {
        resume,
        job_description: jobDesc,
      });
      const elapsed = Date.now() - startTime;
      if (elapsed < 1500) await new Promise(r => setTimeout(r, 1500 - elapsed));

      setResult(res.data);

      // Animate result reveal
      setTimeout(() => {
        gsap.fromTo(resultRef.current,
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );

        ScrollTrigger.refresh();
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);

    } catch {
      alert("Error connecting to the backend engine.");
    } finally {
      setLoading(false);
    }
  };

  const isAccepted = result?.verdict?.toLowerCase().includes("accept");
  const verdictColor = isAccepted ? "#22c55e" : "#ef4444"; // green-500 : red-500

  return (
    <div ref={containerRef}>
      <Navbar />

      <main style={{ paddingTop: "160px", minHeight: "100vh" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>

          <header className="app-header" style={{ textAlign: "center", marginBottom: "64px" }}>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)", marginBottom: "16px" }}>AI Match <span className="accent-gradient">Analysis</span></h1>

          </header>

          <div style={{ display: "grid", gap: "40px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
              <div className="input-card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label style={{ fontSize: "12px", fontWeight: "800", color: "var(--text-secondary)", letterSpacing: "0.1em" }}>RESUME DATA</label>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", opacity: 0.6 }}>{resume.length} characters</span>
                </div>
                <textarea
                  placeholder="Paste plain-text resume content..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="glass"
                  style={textAreaStyle}
                />
              </div>
              <div className="input-card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label style={{ fontSize: "12px", fontWeight: "800", color: "var(--text-secondary)", letterSpacing: "0.1em" }}>JOB SPECIFICATION</label>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", opacity: 0.6 }}>{jobDesc.length} characters</span>
                </div>
                <textarea
                  placeholder="Paste job description..."
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="glass"
                  style={textAreaStyle}
                />
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                className="analyze-btn"
                onClick={analyze}
                disabled={loading || !resume || !jobDesc}
                style={{
                  ...buttonStyle,
                  opacity: (loading || !resume || !jobDesc) ? 0.4 : 1,
                  cursor: (loading || !resume || !jobDesc) ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center" }}>
                    <div className="spinner" />
                    <span>ENGINEERING FEATURES...</span>
                  </div>
                ) : "INITIATE NEURAL MATCH"}
              </button>
              <p style={{ marginTop: "16px", fontSize: "12px", color: "var(--text-secondary)", opacity: 0.5 }}>
                Tip: Press <kbd style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: "4px" }}>Ctrl + Enter</kbd> to analyze instantly
              </p>
            </div>
          </div>

          {result && (
            <div
              ref={resultRef}
              className="glass"
              style={{
                marginTop: "100px",
                marginBottom: "100px",
                padding: "80px 64px",
                textAlign: "center",
                border: `1px solid ${verdictColor}55`,
                background: `${verdictColor}05`,
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, transparent, ${verdictColor}, transparent)` }} />

              <div style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.4em", color: verdictColor, marginBottom: "32px" }}>
                CLASSIFICATION VERDICT
              </div>

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "48px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "80px", fontWeight: "900", lineHeight: "1" }} className="accent-gradient">
                    {(result.match_probability * 100).toFixed(1)}%
                  </div>
                  <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "8px", letterSpacing: "0.1em" }}>CONFIDENCE SCORE</div>
                </div>

                <div style={{ width: "2px", height: "80px", background: "var(--glass-border)" }} />

                <div>
                  <h2 style={{ fontSize: "56px", color: verdictColor, lineHeight: "1", textTransform: "uppercase" }}>
                    {result.verdict}
                  </h2>

                </div>
              </div>

              <div style={{ height: "1px", background: "var(--glass-border)", width: "200px", margin: "48px auto 32px" }} />

            </div>
          )}
        </div>
      </main>

      <style>{`
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <Footer />
    </div>
  );
};

const textAreaStyle: React.CSSProperties = {
  width: "100%",
  height: "360px",
  padding: "24px",
  borderRadius: "20px",
  border: "1px solid var(--glass-border)",
  background: "rgba(0,0,0,0.4)",
  color: "white",
  fontSize: "15px",
  lineHeight: "1.8",
  fontFamily: "var(--font-body)",
  outline: "none",
  transition: "var(--transition-smooth)",
  resize: "none",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "400px",
  padding: "24px",
  borderRadius: "20px",
  border: "none",
  background: "var(--accent-primary)",
  color: "white",
  fontWeight: "800",
  fontSize: "16px",
  letterSpacing: "0.15em",
  transition: "var(--transition-smooth)",
  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.2)",
};

export default AppPage;