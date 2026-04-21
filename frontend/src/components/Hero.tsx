import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.to(".hero-bg", {
        scale: 1.1,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "linear",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Abstract Background Visual */}
      <div
        className="hero-bg"
        style={{
          position: "absolute",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: -1,
        }}
      />

      <div className="container hero-content" style={{ textAlign: "center", zIndex: 1 }}>
        <div
          className="glass"
          style={{
            display: "inline-block",
            padding: "8px 20px",
            fontSize: "13px",
            fontWeight: "800",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "32px",
            color: "var(--accent-primary)",
            background: "rgba(139, 92, 246, 0.1)",
            borderColor: "rgba(139, 92, 246, 0.2)",
            fontFamily: "var(--font-body)"
          }}
        >
          Resume Matcher Engine
        </div>
        <h1
          style={{
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            lineHeight: 1.1,
            marginBottom: "32px",
          }}
        >
          AI-Powered <br />
          <span className="accent-gradient">Resume Screening.</span>
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            color: "var(--text-secondary)",
            maxWidth: "700px",
            margin: "0 auto 48px",
            lineHeight: "1.8",
            fontFamily: "var(--font-body)"
          }}
        >
          Predict match probability using <strong>Sentence-BERT embeddings</strong> and a 
          trained <strong>Keras DNN classifier</strong>. Served through a high-performance <strong>Flask</strong> backend.
        </p>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <Link
            to="/app"
            style={{
              padding: "18px 40px",
              background: "white",
              color: "black",
              borderRadius: "14px",
              fontWeight: "800",
              fontSize: "16px",
              letterSpacing: "0.05em",
              transition: "var(--transition-smooth)",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Launch Matcher
          </Link>
          <a
            href="#problem"
            className="glass"
            style={{
              padding: "18px 40px",
              borderRadius: "14px",
              fontWeight: "600",
              fontSize: "16px",
              transition: "var(--transition-smooth)",
            }}
          >
            Project Overview
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
