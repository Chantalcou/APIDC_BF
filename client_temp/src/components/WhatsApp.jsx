import "./WhatsApp.css";

const WhatsApp = () => {
  const phoneNumber = "1568824488";

  const url = `https://wa.me/${phoneNumber}`;

  return (
    <div>
      <div className="whatsapp-link">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            src="https://res.cloudinary.com/dg05pzjsq/image/upload/v1696767556/5ae21cc526c97415d3213554_asiupg.png"
            alt="WhatsApp logo"
          />
        </a>
      </div>
    </div>
  );
};

export default WhatsApp;
