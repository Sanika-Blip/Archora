import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/facilities", label: "Facilities" },
    { path: "/our-flow", label: "Our Process" },
    { path: "/why-us", label: "Why Us" },
    { path: "/journal", label: "Journal" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .nav-teal-line::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #4bccd4 30%, #4bccd4 70%, transparent);
          opacity: 0.3;
          transition: opacity 0.3s ease;
        }

        .nav-teal-line.scrolled::after {
          opacity: 0;
        }

        .nav-link-item {
          position: relative;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 400;
          text-decoration: none;
          padding-bottom: 3px;
          transition: color 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }

        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          transform: scaleX(0);
          transition: transform 0.25s ease;
          transform-origin: left;
        }

        .nav-link-item.active::after {
          transform: scaleX(1);
        }

        .nav-cta-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 500;
          border: 1px solid;
          background: transparent;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .nav-cta-btn .cta-arrow {
          display: inline-block;
          transition: transform 0.2s ease;
        }

        .nav-cta-btn:hover .cta-arrow {
          transform: translateX(4px);
        }

        .nav-cta-btn.dark {
          border-color: rgba(75, 204, 212, 0.5);
          color: #4bccd4;
        }

        .nav-cta-btn.dark:hover {
          background: #4bccd4;
          color: #041c2e;
          border-color: #4bccd4;
        }

        .nav-cta-btn.light {
          border-color: rgba(15, 74, 117, 0.55);
          color: #0f4a75;
        }

        .nav-cta-btn.light:hover {
          background: #0f4a75;
          color: #ffffff;
          border-color: #0f4a75;
        }

        .mobile-link-item {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 400;
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: color 0.2s;
          color: rgba(255,255,255,0.5);
        }

        .mobile-link-item.active {
          color: #4bccd4;
        }

        .mobile-link-item:hover {
          color: rgba(255,255,255,0.9);
        }

        .mobile-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px;
          margin-top: 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 500;
          border: 1px solid rgba(75, 204, 212, 0.45);
          background: transparent;
          color: #4bccd4;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .mobile-cta-btn:hover {
          background: #4bccd4;
          color: #041c2e;
        }

        /* Facilities nav badge */
        .nav-facilities-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .nav-facilities-badge .badge-dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #4bccd4;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .nav-link-item:hover .badge-dot,
        .nav-link-item.active .badge-dot {
          opacity: 1;
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-teal-line ${isScrolled ? "scrolled" : ""}`}
        style={{
          background: isScrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(0,0,0,0.07)"
            : "1px solid rgba(75,204,212,0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 no-underline">
              <img
                src="/logo.png"
                alt="Archora"
                style={{ height: "82px", width: "auto" }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: isScrolled ? "rgba(0,0,0,0.28)" : "rgba(255,255,255,0.28)",
                  borderLeft: isScrolled
                    ? "1px solid rgba(0,0,0,0.1)"
                    : "1px solid rgba(255,255,255,0.12)",
                  paddingLeft: "12px",
                  lineHeight: 1,
                  transition: "color 0.3s ease, border-color 0.3s ease",
                }}
              >
                Healthcare Architecture
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const isFacilities = link.path === "/facilities";
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-link-item ${isActive ? "active" : ""}`}
                    style={{
                      color: isActive
                        ? isScrolled ? "#0a2233" : "#ffffff"
                        : isScrolled ? "rgba(10,34,51,0.45)" : "rgba(255,255,255,0.5)",
                      ["--link-underline-color" as string]: isScrolled ? "#0f7a8a" : "#4bccd4",
                    }}
                  >
                    <style>{`
                      .nav-link-item::after { background: var(--link-underline-color, #4bccd4); }
                    `}</style>
                    {isFacilities ? (
                      <span className="nav-facilities-badge">
                        {link.label}
                        <span className="badge-dot" />
                      </span>
                    ) : (
                      link.label
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-5">
              <div
                style={{
                  width: "1px",
                  height: "20px",
                  background: isScrolled ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.14)",
                  transition: "background 0.3s ease",
                }}
              />
              <Link to="/contact">
                <button className={`nav-cta-btn ${isScrolled ? "light" : "dark"}`}>
                  Get Started
                  <span className="cta-arrow">→</span>
                </button>
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden transition-colors"
              style={{ color: isScrolled ? "#0a2233" : "#ffffff" }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden"
            style={{
              background: "#041c2e",
              borderTop: "1px solid rgba(75,204,212,0.1)",
            }}
          >
            <div className="px-6 pb-8 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`mobile-link-item ${location.pathname === link.path ? "active" : ""}`}
                >
                  {link.label}
                  {link.path === "/facilities" && (
                    <span style={{ marginLeft: 8, fontSize: 9, letterSpacing: "1.5px", color: "#4bccd4", opacity: 0.7 }}>35 Types</span>
                  )}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="mobile-cta-btn">
                  Get Started →
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}