import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Smart Navbar: Hide on scroll down, Show on scroll up
      const showAnim = gsap.from(navRef.current, { 
        yPercent: -100,
        paused: true,
        duration: 0.3,
        ease: "power2.out"
      }).progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          self.direction === -1 ? showAnim.play() : showAnim.reverse();
        }
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "20px 0",
        borderBottom: "1px solid var(--glass-border)",
        background: "rgba(5, 5, 10, 0.7)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ fontSize: "20px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "24px", height: "24px", background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))", borderRadius: "6px" }} />
          <span>Matchify</span>
        </Link>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <Link to="/" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500", transition: "var(--transition-smooth)" }}>Home</Link>
          <Link to="/about" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500", transition: "var(--transition-smooth)" }}>About</Link>
          <Link
            to="/app"
            className="glass"
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "600",
              background: "var(--accent-primary)",
              border: "none",
              color: "white",
              borderRadius: "8px",
            }}
          >
            Launch App
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
