import MissingMiddle from "@/components/sections/MissingMiddle";
import CardSection from "@/components/ui/CardSection";

export default function Home() {
  return (
    <main style={{
      width: "100%",
      background: "var(--background)",
    }}>
      {/* Intro section */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "6rem 2rem 4rem",
      }}>
        <div style={{
          maxWidth: "600px",
          width: "100%",
          padding: "2.5rem",
          borderRadius: "12px",
          border: "1px solid var(--card-border)",
          background: "var(--card-bg)",
          boxShadow: "var(--shadow-md)",
          textAlign: "center",
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
            We are drafting our vision for Arvada&apos;s upcoming comprehensive plan update. Stay tuned for our recommendations on housing abundance, walkable neighborhoods, and vibrant communities.
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
      </div>

      <section>
        <MissingMiddle />
      </section>

      {/* Transit Station Section */}
      <CardSection title="Make each G-Line Station a Destination">
        <p style={{ marginBottom: "1rem" }}>
          Olde Town Arvada proves it—Train stations are more fun with things to do near them.
          Unfortunately, not every station in Arvada has equal amenities.
          Some, like the 60th and Sheridan and Wheat Ridge/Ward stations, have parking lots and little else.
        </p>
        <p>
          We propose that the city allow a greater diversity of experiences near these stations—Restaurants, bars, and other amenities that give people a reason to stop by.
        </p>
      </CardSection>

      {/* Parking Section */}
      <CardSection title="Relax Parking Requirements Near Transit">
        <p style={{ marginBottom: "1rem" }}>
          Right now the city of Arvada dictates the same parking requirements for every building, regardless of location.
          This makes no sense for housing built near a train or a high-frequency bus station.
        </p>
        <p>
          We&apos;re not saying to eliminate parking. But the one-size-fits-all model is costly, inefficient, and wastes space.
          We should relax these requirements near transit, so builders and business owners can right-size their parking for the needs of their clients and tenants.
        </p>
      </CardSection>

      {/* Downsizing Section with extra bottom margin */}
      <CardSection title="Promote Downsize-Friendly Housing" style={{ marginBottom: "12rem" }}>
        <p style={{ marginBottom: "1.5rem" }}>
          Like most of the Denver Metro region, Arvada has an aging population that is expected to grow over the next few decades.
          As people get older, have their kids move out, and retire, the same house they may have purchased in the 1980s might no longer make sense for their needs—but right now, they&apos;d have to leave their communities if they want to downsize.
          It doesn&apos;t have to be this way. A few small changes to our zoning code could make it easier for seniors to keep living in their community.
        </p>

        <div style={{ textAlign: "left", paddingLeft: "1rem", borderLeft: "2px solid var(--primary)", marginBottom: "1.5rem" }}>
          <h4 style={{ fontWeight: "700", marginBottom: "0.5rem" }}>1. Streamline Permitting for ADUs</h4>
          <p style={{ marginBottom: "0.75rem", fontSize: "0.95rem" }}>
            Accessory Dwelling Units, also called backyard cottages or mother-in-law apartments, are endorsed by the AARP as a great way for longtime residents to find flexible housing options that work for them in old age.
            An ADU is essentially a separate, detached house on a lot where a larger house already exists—perfect for seniors who want independence, but still need help from their children from time to time.
          </p>
          <p style={{ fontSize: "0.95rem" }}>
            Arvada&apos;s ADU laws have &ldquo;poison pills,&rdquo; like owner-occupancy requirements, that could be removed from the code to make these more feasible.
          </p>
        </div>

        <div style={{ textAlign: "left", paddingLeft: "1rem", borderLeft: "2px solid var(--primary)" }}>
          <h4 style={{ fontWeight: "700", marginBottom: "0.5rem" }}>2. Make it easier to build elevators</h4>
          <p style={{ fontSize: "0.95rem" }}>
            As seniors age, stairs can become a barrier.
            Elevators solve this problem by eliminating it entirely, but American laws place unnecessarily strict requirements on building them.
            As a result, many small apartment and condo complexes are built as walk-ups instead.
            We could remove those regulatory requirements, bringing our standards more in line with those of the rest of the world, and make it easier for people to install elevators.
          </p>
        </div>
      </CardSection>
    </main>
  );
}
