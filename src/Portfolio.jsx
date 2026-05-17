import { useState, useEffect, useRef } from "react";
const API = "http://localhost:5000/api";

const PROJECTS = [
  {
    id: 1,
    title: "ShopEase — E-Commerce Platform",
    category: "Full Stack",
    year: "2024",
    desc: "Full-featured online store with cart, auth, payments, and an admin dashboard. Built with React frontend and SQL-backed REST API.",
    stack: ["React", "Node.js", "SQL", "Tailwind CSS"],
    color: "#00FF94",
  },
  {
    id: 2,
    title: "TaskBoard — Project Manager",
    category: "Frontend",
    year: "2024",
    desc: "Drag-and-drop kanban board with real-time updates, user assignments, and deadline tracking.",
    stack: ["React", "JavaScript", "Tailwind CSS", "HTML"],
    color: "#00C8FF",
  },
  {
    id: 3,
    title: "DataVault — SQL Dashboard",
    category: "Backend / DB",
    year: "2023",
    desc: "Admin panel for visualizing and querying SQL databases with live charts, filters, and CSV exports.",
    stack: ["JavaScript", "SQL", "CSS", "HTML"],
    color: "#FF6B35",
  },
];

const SKILLS = [
  { label: "React JS", pct: 90, cat: "Frontend" },
  { label: "JavaScript", pct: 88, cat: "Frontend" },
  { label: "HTML", pct: 95, cat: "Frontend" },
  { label: "CSS", pct: 92, cat: "Frontend" },
  { label: "Tailwind CSS", pct: 87, cat: "Styling" },
  { label: "SQL", pct: 80, cat: "Database" },
];

const SKILL_GROUPS = ["Frontend", "Styling", "Database"];
const GROUP_COLORS = { Frontend: "#00FF94", Styling: "#00C8FF", Database: "#FF6B35" };

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimatedBar({ pct, color, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ height: 3, background: "#1c1c1c", borderRadius: 2, overflow: "hidden" }}>
      <div style={{
        height: "100%",
        width: visible ? `${pct}%` : "0%",
        background: color,
        borderRadius: 2,
        transition: `width 1.1s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }} />
    </div>
  );
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [hovered, setHovered] = useState(null);
  const [activeNav, setActiveNav] = useState("about");
  const [typed, setTyped] = useState("");
  const [cursorOn, setCursorOn] = useState(true);
  const [roleIdx, setRoleIdx] = useState(0);
  const roles = ["Frontend Developer", "React JS Specialist", "UI Engineer"];

  useEffect(() => {
    const role = roles[roleIdx];
    let i = 0;
    setTyped("");
    const type = setInterval(() => {
      setTyped(role.slice(0, i + 1));
      i++;
      if (i === role.length) {
        clearInterval(type);
        setTimeout(() => {
          let j = role.length;
          const erase = setInterval(() => {
            setTyped(role.slice(0, j - 1));
            j--;
            if (j === 0) { clearInterval(erase); setRoleIdx(r => (r + 1) % roles.length); }
          }, 38);
        }, 1800);
      }
    }, 82);
    return () => clearInterval(type);
  }, [roleIdx]);

  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 520);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace", background: "#070707", color: "#e2e2e2", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Syne:wght@600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #00FF9430; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #070707; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
        .nav-btn { background: none; border: none; cursor: pointer; font-family: inherit; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; padding: 5px 0; transition: color 0.2s; }
        .chip-btn { background: none; border: 1px solid #222; color: #666; font-family: inherit; font-size: 11px; letter-spacing: 0.1em; padding: 9px 20px; cursor: pointer; transition: all 0.2s; border-radius: 2px; }
        .chip-btn:hover { border-color: #00FF94; color: #00FF94; }
        .chip-btn.accent { border-color: #00FF9466; color: #00FF94; }
        .chip-btn.accent:hover { background: #00FF9412; }
        .pcard { transition: transform 0.3s, border-color 0.3s; }
        .pcard:hover { transform: translateY(-5px); }
        a { text-decoration: none; }
      `}</style>

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg,#ffffff05 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      <div style={{ position: "fixed", top: "8%", right: "8%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,#00FF9410 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "15%", left: "3%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,#00C8FF0c 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px", background: "rgba(7,7,7,0.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid #141414" }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: "0.04em" }}>MT<span style={{ color: "#00FF94" }}>.</span></span>
        <div style={{ display: "flex", gap: 32 }}>
          {["about", "projects", "skills", "contact"].map(s => (
            <button key={s} className="nav-btn" onClick={() => scrollTo(s)} style={{ color: activeNav === s ? "#00FF94" : "#555" }}>{s}</button>
          ))}
        </div>
        <div style={{ fontSize: 10, color: "#333", letterSpacing: "0.1em" }}><span style={{ color: "#00FF94" }}>●</span> Available</div>
      </nav>

      <section id="about" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 48px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: "#00FF94", letterSpacing: "0.22em", marginBottom: 22, opacity: 0.85 }}>Hi, I'm</div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(44px,6.5vw,82px)", lineHeight: 1.04, letterSpacing: "-0.02em", color: "#efefef", marginBottom: 14 }}>
            Muhammad<br /><span style={{ color: "#00FF94" }}>Talha</span>
          </h1>
          <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "clamp(13px,1.8vw,17px)", color: "#555", marginBottom: 28, height: 26 }}>
            <span style={{ color: "#444" }}>&gt; </span>
            <span style={{ color: "#bbb" }}>{typed}</span>
            <span style={{ opacity: cursorOn ? 1 : 0, color: "#00FF94" }}>_</span>
          </div>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.85, maxWidth: 500, marginBottom: 40 }}>
            Passionate about crafting clean, responsive web experiences. Skilled in React JS, Tailwind CSS, and SQL — turning ideas into polished, production-ready products.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
            {["React JS", "JavaScript", "Tailwind CSS", "HTML", "CSS", "SQL"].map(s => (
              <span key={s} style={{ fontSize: 10, fontFamily: "'IBM Plex Mono'", color: "#444", background: "#111", border: "1px solid #1e1e1e", padding: "4px 10px", borderRadius: 2, letterSpacing: "0.08em" }}>{s}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="chip-btn accent" onClick={() => scrollTo("projects")}>View Work →</button>
            <button className="chip-btn" onClick={() => scrollTo("contact")}>Contact Me</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 44, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div style={{ fontSize: 9, color: "#2a2a2a", letterSpacing: "0.22em", marginBottom: 10 }}>SCROLL</div>
          <div style={{ width: 1, height: 56, background: "linear-gradient(to bottom,#00FF94,transparent)", margin: "0 auto" }} />
        </div>
      </section>

      <section id="projects" style={{ padding: "96px 48px", position: "relative", zIndex: 1, borderTop: "1px solid #111" }}>
        <FadeIn>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 52 }}>
            <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: "#00FF94", letterSpacing: "0.2em" }}>02.</span>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "clamp(26px,4vw,42px)", color: "#efefef" }}>Projects</h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 18 }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 110}>
              <div className="pcard"
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ background: "#0c0c0c", border: `1px solid ${hovered === p.id ? p.color + "50" : "#181818"}`, borderRadius: 4, padding: "26px 22px", height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
                  <span style={{ fontSize: 9, color: p.color, letterSpacing: "0.18em", fontWeight: 500 }}>{p.category.toUpperCase()}</span>
                  <span style={{ fontSize: 10, color: "#2a2a2a" }}>{p.year}</span>
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 16, color: "#e0e0e0", marginBottom: 10, lineHeight: 1.35 }}>{p.title}</h3>
                <p style={{ fontSize: 12, color: "#4a4a4a", lineHeight: 1.75, marginBottom: 22 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.stack.map(t => (
                    <span key={t} style={{ fontSize: 9, fontFamily: "'IBM Plex Mono'", color: "#3a3a3a", background: "#131313", border: "1px solid #1e1e1e", padding: "2px 7px", borderRadius: 2 }}>{t}</span>
                  ))}
                </div>
                <div style={{ height: 2, background: "#131313", marginTop: 22, borderRadius: 1, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: hovered === p.id ? "100%" : "0%", background: p.color, transition: "width 0.4s ease" }} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="skills" style={{ padding: "96px 48px", position: "relative", zIndex: 1, borderTop: "1px solid #111" }}>
        <FadeIn>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 52 }}>
            <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: "#00FF94", letterSpacing: "0.2em" }}>03.</span>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "clamp(26px,4vw,42px)", color: "#efefef" }}>Skills</h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 36 }}>
          {SKILL_GROUPS.map((group, gi) => (
            <FadeIn key={group} delay={gi * 100}>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 10, color: GROUP_COLORS[group], letterSpacing: "0.18em", marginBottom: 20 }}>{group.toUpperCase()}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {SKILLS.filter(s => s.cat === group).map((s, i) => (
                    <div key={s.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                        <span style={{ fontSize: 12, color: "#666" }}>{s.label}</span>
                        <span style={{ fontSize: 10, color: "#333" }}>{s.pct}%</span>
                      </div>
                      <AnimatedBar pct={s.pct} color={GROUP_COLORS[group]} delay={i * 80 + gi * 120} />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="contact" style={{ padding: "96px 48px 80px", position: "relative", zIndex: 1, borderTop: "1px solid #111" }}>
        <FadeIn>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 52 }}>
            <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: "#00FF94", letterSpacing: "0.2em" }}>04.</span>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "clamp(26px,4vw,42px)", color: "#efefef" }}>Let's Talk</h2>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <p style={{ fontSize: 14, color: "#4a4a4a", lineHeight: 1.85, maxWidth: 460, marginBottom: 40 }}>
            Open to freelance projects, full-time roles, and collabs. I reply within 24 hours — let's build something great together.
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "GitHub", href: "https://github.com/coder399" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/talha-khattak" },
              { label: "Email", href: "talhaktk705@gmail.com" },
              { label: "Twitter", href: "https://x.com/tallukhan12" },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer">
                <button className="chip-btn">{c.label}</button>
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

      <footer style={{ padding: "24px 48px", borderTop: "1px solid #111", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
        <span style={{ fontSize: 10, color: "#222", fontFamily: "'IBM Plex Mono'" }}>© 2025 Muhammad Talha</span>
        <span style={{ fontSize: 10, color: "#222", fontFamily: "'IBM Plex Mono'" }}>Built with React JS</span>
      </footer>
    </div>
  );
}