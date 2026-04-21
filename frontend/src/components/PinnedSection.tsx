import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PinnedSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".pinned-section",
          start: "top top",
          end: "+=4000",
          scrub: true,
          pin: true,
        },
      });

      // Initial state: Step 1 active, others hidden
      gsap.set(".step-content", { opacity: 0, y: 30 });
      gsap.set(".visual-item", { opacity: 0, scale: 0.8, filter: "blur(10px)" });
      
      gsap.set(".step-1", { opacity: 1, y: 0 });
      gsap.set(".v-1", { opacity: 1, scale: 1, filter: "blur(0px)" });

      // Transitions
      // Step 1 out
      tl.to(".step-1", { opacity: 0, y: -30, duration: 1 })
        .to(".v-1", { opacity: 0, scale: 1.2, filter: "blur(10px)", duration: 1 }, "<")
        // Step 2 in
        .to(".step-2", { opacity: 1, y: 0, duration: 1 })
        .to(".v-2", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 }, "<")
        // Step 2 out
        .to(".step-2", { opacity: 0, y: -30, duration: 1, delay: 1 })
        .to(".v-2", { opacity: 0, scale: 1.2, filter: "blur(10px)", duration: 1 }, "<")
        // Step 3 in
        .to(".step-3", { opacity: 1, y: 0, duration: 1 })
        .to(".v-3", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 }, "<")
        // Step 3 out
        .to(".step-3", { opacity: 0, y: -30, duration: 1, delay: 1 })
        .to(".v-3", { opacity: 0, scale: 1.2, filter: "blur(10px)", duration: 1 }, "<")
        // Step 4 in
        .to(".step-4", { opacity: 1, y: 0, duration: 1 })
        .to(".v-4", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pinned-section" ref={containerRef} style={{ height: "100vh", position: "relative" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", height: "100%", alignItems: "center" }}>
        
        <div className="left" style={{ position: "relative", height: "300px" }}>
          <div className="step-content step-1" style={{ position: "absolute" }}>
            <h2 style={{ fontSize: "48px", marginBottom: "24px" }}>Signal Input</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "18px" }}>Paste your plain-text resume and job description. We extract semantic features immediately.</p>
          </div>
          <div className="step-content step-2" style={{ position: "absolute" }}>
            <h2 style={{ fontSize: "48px", marginBottom: "24px" }}>S-BERT Encoding</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "18px" }}>Texts are encoded into 384-dimensional dense vectors using the all-MiniLM-L6-v2 transformer.</p>
          </div>
          <div className="step-content step-3" style={{ position: "absolute" }}>
            <h2 style={{ fontSize: "48px", marginBottom: "24px" }}>Deep Classification</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "18px" }}>A 1537-dimensional feature vector is processed through a trained Keras DNN classifier.</p>
          </div>
          <div className="step-content step-4" style={{ position: "absolute" }}>
            <h2 style={{ fontSize: "48px", marginBottom: "24px" }}>Binary Verdict</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "18px" }}>Receive an instant Accepted/Rejected decision based on a 0.5 match probability threshold.</p>
          </div>
        </div>

        <div className="right" style={{ position: "relative", height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}>
           {/* Visual Items */}
           <div className="visual-item v-1 glass" style={{ position: "absolute", width: "400px", height: "300px", display: "flex", flexDirection: "column", padding: "20px" }}>
             <div style={{ height: "20px", width: "60%", background: "rgba(255,255,255,0.1)", marginBottom: "12px", borderRadius: "4px" }} />
             <div style={{ height: "20px", width: "90%", background: "rgba(255,255,255,0.1)", marginBottom: "12px", borderRadius: "4px" }} />
             <div style={{ height: "20px", width: "40%", background: "rgba(255,255,255,0.1)", marginBottom: "12px", borderRadius: "4px" }} />
             <div style={{ height: "20px", width: "70%", background: "rgba(255,255,255,0.1)", marginBottom: "12px", borderRadius: "4px" }} />
             <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--accent-primary)" }} />
                <div style={{ height: "32px", width: "100px", background: "rgba(255,255,255,0.1)", borderRadius: "16px" }} />
             </div>
           </div>

           <div className="visual-item v-2" style={{ position: "absolute", width: "400px", height: "400px" }}>
              {/* Nodes Animation Placeholder */}
              <div style={{ position: "absolute", inset: 0, display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", alignItems: "center" }}>
                 {[...Array(6)].map((_, i) => (
                    <div key={i} className="glass" style={{ width: "110px", height: "40px", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.1em" }}>
                       384-DIM VEC
                    </div>
                 ))}
                 <div style={{ position: "absolute", width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, var(--accent-primary), transparent)", top: "50%" }} />
                 <div style={{ position: "absolute", height: "100%", width: "1px", background: "linear-gradient(180deg, transparent, var(--accent-secondary), transparent)", left: "50%" }} />
              </div>
           </div>

           <div className="visual-item v-3 glass" style={{ position: "absolute", width: "400px", height: "300px", padding: "40px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ height: "4px", width: "100%", background: "rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", height: "100%", width: "60%", background: "var(--accent-primary)" }} />
              </div>
              <div style={{ height: "4px", width: "100%", background: "rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", height: "100%", width: "85%", background: "var(--accent-secondary)" }} />
              </div>
              <div style={{ height: "4px", width: "100%", background: "rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", height: "100%", width: "45%", background: "var(--accent-primary)" }} />
              </div>
              <div style={{ marginTop: "auto", textAlign: "center", fontSize: "12px", fontWeight: "700", color: "var(--accent-primary)", letterSpacing: "0.2em" }}>FEATURE ENGINEERING...</div>
           </div>

           <div className="visual-item v-4 glass" style={{ position: "absolute", width: "400px", height: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: "80px", fontWeight: "800", marginBottom: "10px" }} className="accent-gradient">87%</div>
              <div style={{ fontSize: "20px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase" }}>Strong Match</div>
              <div style={{ marginTop: "40px", padding: "12px 24px", borderRadius: "100px", background: "rgba(34, 197, 94, 0.2)", border: "1px solid #22c55e", color: "#22c55e", fontSize: "14px", fontWeight: "bold", letterSpacing: "0.1em" }}>
                VERDICT: ACCEPTED
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default PinnedSection;