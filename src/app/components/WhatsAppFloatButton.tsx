const WHATSAPP_FLOAT_URL =
  "https://wa.me/917218344700?text=Hi%20ARCHORA%2C%20I%20am%20interested%20in%20discussing%20a%20healthcare%20infrastructure%20project.";

export function WhatsAppFloatButton() {
  return (
    <>
      <style>{`
        .wa-float-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #25d366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.28);
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .wa-float-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 26px rgba(0,0,0,0.35);
        }

        .wa-float-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid #25d366;
          opacity: 0.55;
          animation: wa-pulse 2.2s ease-out infinite;
          pointer-events: none;
        }

        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: 0.55; }
          100% { transform: scale(1.7); opacity: 0; }
        }

        .wa-float-tooltip {
          position: absolute;
          right: 70px;
          top: 50%;
          transform: translateY(-50%);
          background: #041c2e;
          color: #fff;
          padding: 7px 14px;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          letter-spacing: 0.02em;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        .wa-float-btn:hover .wa-float-tooltip {
          opacity: 1;
        }

        @media (max-width: 560px) {
          .wa-float-btn {
            bottom: 18px;
            right: 18px;
            width: 52px;
            height: 52px;
          }
          .wa-float-tooltip {
            display: none;
          }
        }
      `}</style>

      <a
        href={WHATSAPP_FLOAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float-btn"
        aria-label="Chat with ARCHORA on WhatsApp"
      >
        <span className="wa-float-ring" />
        <span className="wa-float-tooltip">Chat with us</span>
        <svg width="29" height="29" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.738-.868-2.878-1.549-4.023-3.516-.305-.526.305-.488.873-1.626.097-.198.05-.371-.05-.52-.099-.149-.671-1.612-.92-2.207-.247-.595-.5-.518-.67-.527-.173-.01-.371-.012-.57-.012-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.057 3.142 4.99 4.28 2.932 1.139 2.932.76 3.395.713.462-.05 1.51-.617 1.722-1.214.213-.595.213-1.104.149-1.214-.064-.108-.247-.173-.521-.297z" />
          <path d="M12.04 2c-5.523 0-10 4.477-10 10 0 1.78.47 3.45 1.29 4.9L2 22l5.1-1.33A9.96 9.96 0 0012.04 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.2c-1.5 0-2.92-.4-4.15-1.1l-.3-.17-3.03.79.8-2.94-.2-.31a8.18 8.18 0 01-1.27-4.37c0-4.53 3.69-8.2 8.2-8.2 4.51 0 8.2 3.67 8.2 8.2 0 4.53-3.69 8.2-8.2 8.2z" />
        </svg>
      </a>
    </>
  );
}