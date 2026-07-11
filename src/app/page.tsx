export default function Home() {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "2rem",
      textAlign: "center",
    }}>
      <div style={{
        maxWidth: "600px",
        padding: "2.5rem",
        borderRadius: "12px",
        border: "1px solid var(--card-border)",
        background: "var(--card-bg)",
        boxShadow: "var(--shadow-md)",
      }}>
        <div style={{
          display: "inline-block",
          padding: "6px 12px",
          borderRadius: "100px",
          background: "var(--primary-light)",
          color: "var(--primary)",
          fontSize: "0.85rem",
          fontWeight: "600",
          marginBottom: "1.5rem",
        }}>
          🚧 Under Construction
        </div>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          lineHeight: "1.2",
          marginBottom: "1rem",
          letterSpacing: "-0.02em",
        }}>
          YIMBY Arvada
        </h1>
        <h2 style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "var(--muted)",
          marginBottom: "1.5rem",
        }}>
          Comprehensive Plan Desires
        </h2>
        <p style={{
          fontSize: "1.05rem",
          color: "var(--muted)",
          marginBottom: "2rem",
          lineHeight: "1.5",
        }}>
          We are drafting our vision for Arvada's upcoming comprehensive plan update. Stay tuned for our recommendations on housing abundance, walkable neighborhoods, and vibrant communities.
        </p>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}>
          <a 
            href="https://yimbyaction.org" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              borderRadius: "6px",
              background: "var(--primary)",
              color: "#fff",
              fontWeight: "600",
              fontSize: "0.95rem",
            }}
          >
            About YIMBY Action
          </a>
        </div>
      </div>
    </main>
  );
}

