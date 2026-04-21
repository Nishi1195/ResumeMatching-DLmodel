import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const ImpactSection: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Force immediate visibility reset
      gsap.set(".cta-content > *", { opacity: 1, y: 0 });

      gsap.from(".cta-content > *", {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "all"
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ctaRef}
      id="impact-cta-v3"
      style={{
        padding: "180px 0",
        textAlign: "center",
        position: "relative",
        background: "transparent",
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: -1,
        }}
      />

      <div className="container cta-content" style={{ opacity: 1 }} data-v="3">
        <div style={{ marginBottom: "24px" }}>
           <span style={{ 
             fontSize: "14px", 
             color: "var(--accent-primary)", 
             fontWeight: "800", 
             letterSpacing: "0.4em", 
             textTransform: "uppercase" 
           }}>
             Start Matching
           </span>
        </div>

        <h2 style={{ 
          fontSize: "clamp(2.5rem, 7vw, 4.5rem)", 
          marginBottom: "24px", 
          lineHeight: 1,
          fontFamily: "var(--font-display)",
          maxWidth: "800px",
          margin: "0 auto 24px"
        }}>
          Ready to find your <br /> 
          <span className="accent-gradient" style={{ fontSize: "1.1em" }}>next standard?</span>
        </h2>

        <p style={{ 
          color: "var(--text-secondary)", 
          fontSize: "1.25rem", 
          maxWidth: "580px", 
          margin: "0 auto 64px", 
          lineHeight: "1.7",
          fontFamily: "var(--font-body)",
          fontWeight: "400"
        }}>
          Join the next generation of HR. Use Sentence-BERT to identify top talent with 99.9% semantic accuracy.
        </p>
        
        <Link
          to="/app"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "18px 48px",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
            color: "white",
            borderRadius: "12px",
            fontWeight: "700",
            fontSize: "16px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            textDecoration: "none",
            position: "relative",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.borderColor = "var(--accent-primary)";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(139, 92, 246, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
          }}
        >
          Get Started
          <svg style={{ marginLeft: "12px", width: "16px", height: "16px" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
             <line x1="5" y1="12" x2="19" y2="12"></line>
             <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default ImpactSection;
