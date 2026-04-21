import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Problem: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
        opacity: 0.1,
        stagger: 0.2,
      });

      gsap.from(".reveal-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      ref={sectionRef}
      style={{ padding: "160px 0", background: "rgba(255,255,255,0.01)" }}
    >
      <div className="container">
        <h2
          className="reveal-text"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            maxWidth: "950px",
            lineHeight: 1.25,
            marginBottom: "80px",
          }}
        >
          Hiring is limited by rigid keyword matching. We use <span className="accent-gradient">Sentence-BERT</span> to capture contextual meaning that traditional systems miss.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
          }}
        >
          {[
            {
              title: "Contextual Analysis",
              desc: "Transforms raw text into 384-dimensional dense vectors using all-MiniLM-L6-v2 models.",
            },
            {
              title: "Feature engineering",
              desc: "Derives 1537 features including absolute delta and element-wise products for better prediction.",
            },
            {
              title: "Neural Verdict",
              desc: "Binary accepted/rejected decisions based on a 0.5 probability threshold from a Keras DNN.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="glass reveal-card"
              style={{
                padding: "48px",
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              <h3 style={{ fontSize: "22px", marginBottom: "20px" }}>{item.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: "1.7" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
