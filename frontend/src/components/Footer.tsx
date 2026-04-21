const Footer: React.FC = () => {
  return (
    <footer style={{ padding: "40px 0", borderTop: "1px solid var(--glass-border)", marginTop: "80px" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: "18px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "20px", height: "20px", background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))", borderRadius: "5px" }} />
            <span>Matchify</span>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "400px" }}>
            Advanced resume matching engine powered by deep learning. Built for precision and efficiency in modern hiring.
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "12px", marginTop: "8px" }}>
            © 2024 Matchify. All rights reserved.
          </p>
        </div>

        <a 
          href="https://github.com/Nishi1195/ResumeMatching-DLmodel" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            color: "var(--text-secondary)", 
            transition: "var(--transition-smooth)",
            display: "flex",
            alignItems: "center"
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "white")}
          onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
