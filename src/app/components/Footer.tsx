import { Link } from "react-router";
import { MapPin, Phone, Mail, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Instagram, href: "https://www.instagram.com/archoraofficial", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/archora/?viewAsMember=true", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/share/1EpNTof8Wi/?mibextid=wwXIfr", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/@Archoraofficial", label: "YouTube" },
];

export function Footer() {
  const quickLinks = [
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
    { to: "/our-flow", label: "Our Process" },
    { to: "/why-us", label: "Why Us" },
    { to: "/journal", label: "Journal" },
  ];

  const services = [
    "Hospital Planning",
    "Interior Design",
    "ICU Design",
    "Turnkey Projects",
    "Compliance Planning",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .footer-root {
          background: #041c2e;
          color: white;
          font-family: 'DM Sans', sans-serif;
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 0;
          border-bottom: 1px solid rgba(75, 204, 212, 0.08);
        }

        @media (max-width: 900px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer-col:nth-child(3),
          .footer-col:nth-child(4) {
            border-top: 1px solid rgba(255,255,255,0.05) !important;
          }
          .footer-col:nth-child(2),
          .footer-col:nth-child(4) {
            border-left: 1px solid rgba(255,255,255,0.05) !important;
            margin-left: 0 !important;
            padding-left: 32px !important;
          }
        }

        @media (max-width: 560px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
          }
          .footer-col {
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.05) !important;
            padding-left: 0 !important;
            margin-left: 0 !important;
          }
          .footer-col:first-child {
            border-top: none !important;
          }
          .footer-bottom-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
        }

        .footer-col {
          padding: 56px 48px;
        }

        .footer-col + .footer-col {
          border-left: 1px solid rgba(255, 255, 255, 0.05);
          padding-left: 40px;
          margin-left: 0;
        }

        .footer-col:first-child {
          padding-left: 48px;
        }

        .footer-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px;
          font-weight: 300;
          letter-spacing: 0.02em;
          color: #ffffff;
          line-height: 1;
          margin-bottom: 4px;
        }

        .footer-brand-name em {
          color: #4bccd4;
          font-style: italic;
          font-weight: 300;
        }

        .footer-brand-sub {
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.28);
          margin-bottom: 22px;
        }

        .footer-tagline {
          font-size: 13px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.42);
          max-width: 230px;
          margin-bottom: 28px;
          font-weight: 300;
        }

        .footer-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          border: 1px solid rgba(75, 204, 212, 0.2);
          font-size: 9.5px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(75, 204, 212, 0.65);
          font-weight: 400;
        }

        .footer-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #4bccd4;
          opacity: 0.65;
          flex-shrink: 0;
        }

        .footer-col-head {
          font-size: 9.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.28);
          margin-bottom: 24px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          font-weight: 400;
        }

        .footer-link-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .footer-link-list a {
          display: inline-flex;
          align-items: center;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.45);
          text-decoration: none;
          transition: color 0.2s ease;
          gap: 0;
          font-weight: 300;
        }

        .footer-link-list a::before {
          content: ', ';
          font-size: 10px;
          color: #4bccd4;
          opacity: 0;
          width: 0;
          overflow: hidden;
          transition: opacity 0.2s ease, width 0.2s ease, margin-right 0.2s ease;
          margin-right: 0;
          display: inline-block;
        }

        .footer-link-list a:hover {
          color: rgba(255, 255, 255, 0.85);
        }

        .footer-link-list a:hover::before {
          opacity: 1;
          width: 14px;
          margin-right: 6px;
        }

        .footer-service-item {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 300;
          padding: 5px 0;
          padding-left: 14px;
          position: relative;
        }

        .footer-service-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(75, 204, 212, 0.35);
        }

        .footer-contact-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.42);
          font-weight: 300;
          line-height: 1.6;
        }

        .footer-contact-icon {
          flex-shrink: 0;
          color: #4bccd4;
          opacity: 0.55;
          margin-top: 2px;
          width: 14px;
          height: 14px;
        }

        .footer-socials {
          display: flex;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-social-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-right: -1px;
          color: rgba(255, 255, 255, 0.32);
          transition: all 0.2s ease;
          cursor: pointer;
          background: transparent;
          text-decoration: none;
        }

        .footer-social-btn:hover {
          background: rgba(75, 204, 212, 0.08);
          color: #4bccd4;
          border-color: rgba(75, 204, 212, 0.3);
          z-index: 1;
          position: relative;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          gap: 20px;
        }

        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 20px;
        }

        .footer-copy {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.2);
          letter-spacing: 0.04em;
          font-weight: 300;
        }

        .footer-copy span {
          color: rgba(75, 204, 212, 0.45);
        }

        .footer-award {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.18);
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.06em;
          font-weight: 300;
        }

        .footer-award-star {
          color: rgba(75, 204, 212, 0.35);
          font-size: 13px;
          line-height: 1;
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .footer-legal a {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.18);
          text-decoration: none;
          letter-spacing: 0.04em;
          font-weight: 300;
          transition: color 0.2s ease;
        }

        .footer-legal a:hover {
          color: rgba(255, 255, 255, 0.5);
        }

        .footer-legal-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }
      `}</style>

      <footer className="footer-root">
        <div className="max-w-7xl mx-auto">
          <div className="footer-top-grid">

            {/* Brand col */}
            <div className="footer-col">
              <div className="footer-brand-name">
                ARCHORA
              </div>
              <div className="footer-brand-sub">Healthcare Infrastructure</div>
              <p className="footer-tagline">
                India's dedicated healthcare infrastructure partner, architecture, compliance, engineering, and execution under one accountable roof.
              </p>
            </div>

            {/* Quick links */}
            <div className="footer-col">
              <div className="footer-col-head">Navigation</div>
              <ul className="footer-link-list">
                {quickLinks.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-col">
              <div className="footer-col-head">Specialisms</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {services.map((s) => (
                  <div key={s} className="footer-service-item">{s}</div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <div className="footer-col-head">Get in Touch</div>
              <div className="footer-contact-row">
                <MapPin className="footer-contact-icon" size={14} />
                <span>903 Niramaya Heights, Parsik Nagar, Kalwa,<br />Thane East, Thane, 400605, Maharashtra</span>
              </div>
              <div className="footer-contact-row">
                <Phone className="footer-contact-icon" size={14} />
                <a href="tel:+917218444700" style={{ color: "inherit", textDecoration: "none" }}>+91 72184 44700</a>
              </div>
              <div className="footer-contact-row">
                <Mail className="footer-contact-icon" size={14} />
                <a href="mailto:contact@archora.in" style={{ color: "inherit", textDecoration: "none" }}>contact@archora.in</a>
              </div>

              {/* Social icons */}
              <div className="footer-socials">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label={label}>
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <div className="footer-bottom-inner">
              <p className="footer-copy">
                © 2026 <span>ARCHORA</span>. All rights reserved.
              </p>
              <div className="footer-legal">
                <Link to="/why-us?tab=privacy">Privacy Policy</Link>
                <span className="footer-legal-dot" />
                <Link to="/why-us?tab=privacy">Terms of Service</Link>
                <span className="footer-legal-dot" />
                <Link to="/why-us?tab=privacy">Cookie Preferences</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}