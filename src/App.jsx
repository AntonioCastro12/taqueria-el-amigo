import {
  CheckCircle2,
  Clock3,
  Download,
  Facebook,
  Flame,
  Heart,
  MapPin,
  Menu,
  Phone,
  QrCode,
  Send,
  Share2,
  Sparkles,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const cardUrl = import.meta.env.VITE_CARD_URL || window.location.href;

const business = {
  name: 'TAQUERÍA EL AMIGO',
  subtitle: 'Tacos, pastor, gringas y más',
  tagline: 'El sabor que se comparte entre amigos.',
  description:
    'Disfruta auténticos tacos estilo mexicano, preparados al momento con ingredientes frescos, buen sazón y el toque especial de la casa.',
  phone: '462 XXX XXXX',
  phoneHref: 'tel:462XXXXXXX',
  location: 'Irapuato, Guanajuato',
  hours: 'Lunes a domingo de 5:00 p.m. a 12:00 a.m.',
  facebookName: 'Taquería El Amigo',
  logo: '/assets/logo-taqueria.png',
  introLogo: '/assets/intro-logo.png',
  taquero: '/assets/taquero.png',
  tacos: '/assets/tacos.png',
  trompo: '/assets/trompo.png',
  whatsappUrl:
    'https://wa.me/52462XXXXXXX?text=Hola,%20me%20gustar%C3%ADa%20hacer%20un%20pedido%20en%20Taquer%C3%ADa%20El%20Amigo',
  menuUrl: '/menu-taqueria.pdf',
  facebookUrl: 'https://facebook.com/taqueriaelamigo',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Taqueria+El+Amigo+Irapuato+Guanajuato',
};

const menuItems = [
  'Tacos al pastor',
  'Tacos de asada',
  'Gringas',
  'Quesadillas',
  'Tortas',
  'Volcanes',
  'Salsas de la casa',
  'Refrescos',
];

const contactItems = [
  { label: 'Tel', value: business.phone, icon: Phone },
  { label: 'Facebook', value: business.facebookName, icon: Facebook },
  { label: 'Ubicación', value: business.location, icon: MapPin },
  { label: 'Horario', value: business.hours, icon: Clock3 },
];

const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Taquería El Amigo
ORG:Taquería El Amigo
TEL:${business.phone}
ADR:;;${business.location};;;;
URL:${cardUrl}
END:VCARD`;

const contactButtons = [
  {
    label: 'Pedir por WhatsApp',
    href: business.whatsappUrl,
    icon: Send,
    tone: 'whatsapp',
    ariaLabel: 'Pedir por WhatsApp a Taquería El Amigo',
  },
  {
    label: 'Llamar ahora',
    href: business.phoneHref,
    icon: Phone,
    tone: 'light',
    ariaLabel: 'Llamar a Taquería El Amigo',
  },
  {
    label: 'Ver menú',
    href: business.menuUrl,
    icon: Menu,
    tone: 'menu',
    ariaLabel: 'Ver menú de Taquería El Amigo',
  },
  {
    label: 'Facebook',
    href: business.facebookUrl,
    icon: Facebook,
    tone: 'light',
    ariaLabel: 'Abrir Facebook de Taquería El Amigo',
  },
  {
    label: 'Ubicación en Google Maps',
    href: business.mapsUrl,
    icon: MapPin,
    tone: 'light',
    ariaLabel: 'Abrir ubicación de Taquería El Amigo en Google Maps',
  },
  {
    label: 'Compartir tarjeta digital',
    href: cardUrl,
    icon: Share2,
    tone: 'share',
    ariaLabel: 'Compartir tarjeta digital',
    action: 'share',
  },
  {
    label: 'Guardar contacto',
    href: `data:text/vcard;charset=utf-8,${encodeURIComponent(vCard)}`,
    icon: Download,
    tone: 'save',
    ariaLabel: 'Descargar contacto de Taquería El Amigo',
    download: 'taqueria-el-amigo.vcf',
  },
];

function copyCardUrl() {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(cardUrl);
  }

  const textArea = document.createElement('textarea');
  textArea.value = cardUrl;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  return Promise.resolve();
}

async function shareCard(event) {
  event.preventDefault();

  try {
    if (navigator.share) {
      await navigator.share({
        title: business.name,
        text: business.tagline,
        url: cardUrl,
      });
      return;
    }

    await copyCardUrl();
  } catch (error) {
    if (error?.name !== 'AbortError') {
      await copyCardUrl();
    }
  }
}

function IntroScreen() {
  return (
    <section className="intro-screen" aria-hidden="true">
      <div className="intro-brand">
        <img src={business.introLogo} alt="" />
        <strong>{business.name}</strong>
      </div>
      <div className="intro-loader">
        <span />
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="card-header">
      <div className="header-decor" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <img src={business.logo} alt="Logotipo de Taquería El Amigo" />
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-label="Presentación de Taquería El Amigo">
      <div className="hero-image-card">
        <div className="hero-plate" aria-hidden="true">
          <img className="hero-taquero" src={business.taquero} alt="" />
          <img className="hero-trompo" src={business.trompo} alt="" />
          <img className="hero-tacos" src={business.tacos} alt="" />
        </div>
        <span className="floating-favorite" aria-hidden="true">
          <Heart size={20} fill="currentColor" />
        </span>
      </div>

      <div className="hero-copy">
        <span className="hero-pill">TAQUERÍA MEXICANA</span>
        <h1>{business.name}</h1>
        <p className="subtitle">{business.subtitle}</p>
        <p className="tagline">{business.tagline}</p>
        <p className="description">{business.description}</p>
        <a
          aria-label="Pedir por WhatsApp a Taquería El Amigo"
          className="primary-cta"
          href={business.whatsappUrl}
          rel="noreferrer"
          target="_blank"
        >
          <Send aria-hidden="true" size={22} />
          Pedir por WhatsApp
        </a>
      </div>
    </section>
  );
}

function MenuPreview() {
  return (
    <section className="section menu-preview" id="menu" aria-labelledby="menu-title">
      <div className="section-heading">
        <span>MENÚ</span>
        <h2 id="menu-title">Favoritos de la casa</h2>
      </div>

      <div className="menu-list">
        {menuItems.map((item, index) => (
          <article className="menu-item" key={item}>
            <span className={index % 3 === 0 ? 'menu-icon fire' : 'menu-icon'}>
              {index % 3 === 0 ? (
                <Flame aria-hidden="true" size={18} />
              ) : (
                <CheckCircle2 aria-hidden="true" size={18} />
              )}
            </span>
            <strong>{item}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactButtons() {
  return (
    <section className="section contact-section" aria-labelledby="contact-title">
      <div className="section-heading">
        <span>CONTACTO</span>
        <h2 id="contact-title">Pedidos y redes</h2>
      </div>

      <div className="contact-buttons">
        {contactButtons.map((button) => {
          const Icon = button.icon;
          const isExternal = button.href.startsWith('http');

          return (
            <a
              aria-label={button.ariaLabel}
              className={`action-button ${button.tone}`}
              download={button.download}
              href={button.href}
              key={button.label}
              onClick={button.action === 'share' ? shareCard : undefined}
              rel={isExternal ? 'noreferrer' : undefined}
              target={isExternal ? '_blank' : undefined}
            >
              <span className="button-icon">
                <Icon aria-hidden="true" size={22} strokeWidth={2.5} />
              </span>
              <span>{button.label}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function InfoCard() {
  return (
    <section className="section info-card" aria-label="Datos de contacto">
      {contactItems.map((item) => {
        const Icon = item.icon;

        return (
          <div className="info-row" key={item.label}>
            <span className="info-icon">
              <Icon aria-hidden="true" size={18} />
            </span>
            <div>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          </div>
        );
      })}
    </section>
  );
}

function QRSection() {
  return (
    <section className="section qr-section" aria-labelledby="qr-title">
      <div className="section-heading centered">
        <span>QR DIGITAL</span>
        <h2 id="qr-title">Escanea y abre nuestra tarjeta digital</h2>
      </div>
      <p>Guarda esta tarjeta y pide tus tacos favoritos cuando quieras.</p>

      <div className="qr-box" aria-label={`Código QR para abrir ${cardUrl}`}>
        <QRCodeSVG
          value={cardUrl}
          size={190}
          bgColor="#FFFFFF"
          fgColor="#3E1A11"
          level="H"
          includeMargin={false}
        />
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="section quote-section">
      <Sparkles aria-hidden="true" size={20} />
      <p>“Buenos tacos, buena salsa y buenos amigos.”</p>
    </section>
  );
}

function Footer() {
  return <footer className="footer">Tarjeta digital desarrollada por RCM CodeDev</footer>;
}

function App() {
  return (
    <>
      <IntroScreen />
      <main className="page-shell">
        <section className="card-shell" aria-label="Tarjeta digital de Taquería El Amigo">
          <article className="digital-card">
            <Header />
            <Hero />
            <MenuPreview />
            <ContactButtons />
            <InfoCard />
            <QRSection />
            <QuoteSection />
            <Footer />
          </article>
        </section>
      </main>
    </>
  );
}

export default App;
