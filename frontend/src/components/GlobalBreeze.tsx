import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const GlobalBreeze: React.FC = () => {
  const planeRef = useRef<SVGSVGElement>(null);
  const trailRef1 = useRef<SVGSVGElement>(null);
  const trailRef2 = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const refs = [planeRef.current, trailRef1.current, trailRef2.current];
      
      refs.forEach((ref, index) => {
        // Timeline for viewport-locked flight
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8 + (index * 0.15), // Smooth but responsive
            onRefresh: (self) => {
               // Ensure we are visible on refresh
               gsap.set([planeRef.current, trailRef1.current, trailRef2.current], { opacity: 1 });
            }
          }
        });

        tl.to(ref, {
          motionPath: {
            path: pathRef.current!,
            align: pathRef.current!,
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
          ease: "none",
        });

        // Final fade out as we hit very bottom
        tl.to(ref, {
          opacity: 0,
          scale: 0.5,
          duration: 0.05
        });
      });
    });

    // Final safety: Force refresh on mount
    setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => ctx.revert();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1, // Under everything
        overflow: "hidden",
        background: "transparent"
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000" // Viewport-sized coordinate system
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="neon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <filter id="neon-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Winding path confined to viewport dimensions */}
        <path
          ref={pathRef}
          d="M 500 0 
             C 800 200, 200 400, 500 600
             C 800 800, 200 1000, 500 1100"
          stroke="rgba(255,255,255,0.01)"
          strokeWidth="1"
          strokeDasharray="10 20"
        />

        {/* Trail 2 */}
        <svg ref={trailRef2} width="40" height="40" viewBox="0 0 24 24" style={{ filter: "url(#neon-glow)", opacity: 0.3 }}>
          <path d="M4 2L20 12L4 22" stroke="url(#neon-grad)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />
        </svg>

        {/* Trail 1 */}
        <svg ref={trailRef1} width="40" height="40" viewBox="0 0 24 24" style={{ filter: "url(#neon-glow)", opacity: 0.6 }}>
          <path d="M4 2L20 12L4 22" stroke="url(#neon-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
        </svg>

        {/* Main Chevron */}
        <svg ref={planeRef} width="40" height="40" viewBox="0 0 24 24" style={{ filter: "url(#neon-glow)", opacity: 1 }}>
          <path d="M4 2L20 12L4 22" stroke="url(#neon-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>

      </svg>
    </div>
  );
};

export default GlobalBreeze;
