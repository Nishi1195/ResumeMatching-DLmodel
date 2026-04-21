import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.from(".about-hero > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Section reveals
      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
        gsap.from(section.querySelectorAll(".reveal-item"), {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
        });
      });

      // Horizontal line expansions
      gsap.from(".divider", {
        scrollTrigger: {
          trigger: ".divider",
          start: "top 90%",
          end: "top 40%",
          scrub: true,
        },
        width: 0,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <Navbar />

      <main style={{ paddingTop: "160px" }}>

        <section className="container about-hero" style={{ textAlign: "center", marginBottom: "120px" }}>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", marginBottom: "24px" }}>Deep Learning <br /> <span className="accent-gradient">Pipeline</span></h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", maxWidth: "800px", margin: "0 auto" }}>
            Our engine uses advanced Sentence-BERT embeddings and a Keras DNN classifier to go beyond traditional keyword matching.
          </p>
        </section>

        <section className="container reveal-section" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", padding: "80px 0" }}>
          <div className="reveal-item">
            <div className="glass" style={{ width: "100%", height: "450px", background: "rgba(255,255,255,0.02)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px" }}>
              <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--accent-primary)", marginBottom: "24px", letterSpacing: "0.2em" }}>PIPELINE STEPS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "1. Text Ingestion",
                  "2. S-BERT Encoding (384-dim)",
                  "3. Feature Engineering (1537-dim)",
                  "4. Normalization (StandardScaler)",
                  "5. Neural Classification (Sigmoid)"
                ].map((step, i) => (
                  <div key={i} style={{ padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid var(--glass-border)", fontSize: "14px" }}>{step}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="reveal-item">
            <h2 style={{ fontSize: "2.5rem", marginBottom: "24px" }}>Feature Engineering</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.125rem", marginBottom: "24px", lineHeight: "1.8" }}>
              The system engineers a rich <strong>1537-dimensional feature vector</strong> by deriving four complementary signals from the embeddings:
            </p>
            <ul style={{ color: "var(--text-secondary)", listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "16px" }}>• <strong>Raw Overlap</strong>: Element-wise product of resume and JD embeddings.</li>
              <li style={{ marginBottom: "16px" }}>• <strong>Contrastive Delta</strong>: Element-wise absolute difference between vectors.</li>
              <li style={{ marginBottom: "16px" }}>• <strong>Cos-Sim</strong>: Scalar semantic similarity score (all-MiniLM-L6-v2).</li>
              <li>• <strong>Scaled Input</strong>: Normalized features via pre-fitted scaler.pkl.</li>
            </ul>
          </div>
        </section>

        <div className="divider" style={{ height: "1px", background: "var(--glass-border)", margin: "80px auto", maxWidth: "1200px" }} />

        <section className="container reveal-section" style={{ padding: "80px 0" }}>
          <h2 className="reveal-item" style={{ textAlign: "center", marginBottom: "80px", fontSize: "2.5rem" }}>Technical <span className="accent-gradient">Edge</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {[
              { step: "S-BERT", title: "Semantic Depth", desc: "Encoded into 384-dim vectors using Sentence-BERT for deep contextual understanding." },
              { step: "KERAS", title: "Neural Logic", desc: "Trained DNN classifier predicts match probability with 0.5 threshold binary verdict." },
              { step: "FLASK", title: "Edge Speed", desc: "Inference served through a robust Flask backend for real-time performance." }
            ].map((item, i) => (
              <div
                key={i}
                className="glass reveal-item"
                style={{ padding: "48px", borderTop: "2px solid var(--accent-primary)", position: "relative" }}
              >
                <div style={{ fontSize: "12px", fontWeight: "900", color: "var(--accent-primary)", marginBottom: "24px", letterSpacing: "0.2em" }}>{item.step}</div>
                <h3 style={{ fontSize: "24px", marginBottom: "16px" }}>{item.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: "1.7" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container reveal-section" style={{ padding: "80px 0", textAlign: "center", position: "relative" }}>
          <h2 className="reveal-item" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "32px" }}>
            Universal Accuracy
          </h2>
          <p className="reveal-item" style={{ color: "var(--text-secondary)", fontSize: "1.25rem", maxWidth: "800px", margin: "0 auto 48px", lineHeight: "1.8" }}>
            Matchify removes noise and focuses on actual capability. By removing keyword gimmicks
            and focusing on semantic alignment, we help companies build better teams.
          </p>
          <div className="reveal-item">
            <div style={{ padding: "2px", background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))", borderRadius: "14px", display: "inline-block" }}>
              <a href="/app" style={{ display: "block", padding: "16px 32px", background: "var(--bg-color)", borderRadius: "12px", fontWeight: "600", transition: "var(--transition-smooth)" }}>
                Launch Engine Now
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;
