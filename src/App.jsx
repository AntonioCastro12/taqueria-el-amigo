import {
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
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
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';


const cardUrl = import.meta.env.VITE_CARD_URL || window.location.href;

const business = {
  name: 'TAQUERÍA EL AMIGO',
  subtitle: 'Tacos, Quesadillas y Charolas Surtidas',
  tagline: 'El sabor que se comparte entre amigos.',
  description:
    'Disfruta auténticos tacos estilo mexicano, preparados al momento con ingredientes frescos, buen sazón y el toque especial de la casa.',
  phone: '462 XXX XXXX',
  phoneHref: 'tel:462XXXXXXX',
  location: 'Irapuato, Guanajuato',
  hours: 'Lunes a domingo de 5:00 p.m. a 12:00 a.m.',
  facebookName: 'Taquería El Amigo',
  logo: '/assets/intro-logo.jpeg',
  introLogo: '/assets/intro-logo.jpeg',
  taquero: '/assets/taquero.jpeg',
  tacos: '/assets/tacos.jpeg',
  whatsappUrl:
    'https://wa.me/524622601179?text=Hola,%20me%20gustar%C3%ADa%20hacer%20un%20pedido%20en%20Taquer%C3%ADa%20El%20Amigo',
  menuUrl: '/menu-taqueria.pdf',
  facebookUrl: 'https://facebook.com/taqueriaelamigo',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Taqueria+El+Amigo+Irapuato+Guanajuato',
};

const menuItems = [
  'Tacos al pastor',
  'Tacos de chorizo',
  'Tacos de suadero',
  'Tacos de bisctec',
  'Tacos de tripa',
  'Quesadillas',
  'Charolas surtidas',
];

const taquizaIncludes = [
  'Tacos a llenar',
  '3 carnes: bistec, chorizo y pastor',
  'Quesadillas',
  'Desechables',
  '1 vitrolero de agua',
  'Salsas, verdura y cebolla asada',
];

const extraMeats = ['Cabeza', 
  'Tripa'
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
    label: 'Descargar menú completo',
    href: business.menuUrl,
    icon: Menu,
    tone: 'menu',
    ariaLabel: 'Ver menú de Taquería El Amigo',
  },
  {
    label: 'Ubicación en Google Maps',
    href: business.mapsUrl,
    icon: MapPin,
    tone: 'light',
    ariaLabel: 'Abrir ubicación de Taquería El Amigo en Google Maps',
  },
  {
    label: 'Cotizar taquiza',
    href: '#cotizar-taquiza',
    icon: Calculator,
    tone: 'quote',
    ariaLabel: 'Cotizar una taquiza por WhatsApp',
    action: 'quote',
  },
  
  // {
  //   label: 'Compartir tarjeta digital',
  //   href: cardUrl,
  //   icon: Share2,
  //   tone: 'share',
  //   ariaLabel: 'Compartir tarjeta digital',
  //   action: 'share',
  // },
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
          <img className="hero-food hero-food-top hero-logo-badge" src={business.logo} alt="" />
          <img className="hero-food hero-food-bottom" src={business.tacos} alt="" />
          <img className="hero-taquero" src={business.taquero} alt="" />
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const visibleItems = isMenuOpen ? menuItems : [];
  const ToggleIcon = isMenuOpen ? ChevronUp : ChevronDown;

  return (
    <section className="section menu-preview" id="menu" aria-labelledby="menu-title">
      <div className="section-heading">
        <span>MENÚ</span>
        <h2 id="menu-title">Favoritos de la casa</h2>
      </div>

      <div className={`menu-list ${isMenuOpen ? 'is-open' : ''}`} id="menu-list">
        {visibleItems.map((item, index) => (
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

      <button
        aria-expanded={isMenuOpen}
        aria-controls="menu-list"
        className="menu-toggle"
        type="button"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span>{isMenuOpen ? 'Ocultar menú completo' : 'Ver menú completo'}</span>
        <ToggleIcon aria-hidden="true" size={20} strokeWidth={2.5} />
      </button>
    </section>
  );
}

function ContactButtons() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [guestCount, setGuestCount] = useState('');

  function createQuoteMessage() {
    return [
      'Hola, me gustaría cotizar una taquisa en Taquería El Amigo.',
      '',
      `Personas que asistirán: ${guestCount}`,
      '',
      'Cotización incluye:',
      ...taquizaIncludes.map((item) => `- ${item}`),
      '',
      'Carnes con costo extra:',
      ...extraMeats.map((item) => `- ${item}`),
    ].join('\n');
  }

  function sendQuote(event) {
    event.preventDefault();

    if (!guestCount) {
      return;
    }

    const quoteUrl = `https://wa.me/524622601179?text=${encodeURIComponent(createQuoteMessage())}`;
    window.open(quoteUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="section contact-section" aria-labelledby="contact-title">
      <div className="section-heading">
        <span>CONTACTO</span>
        <h2 id="contact-title">Pedidos y cotizaciones</h2>
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
              onClick={
                button.action === 'share'
                  ? shareCard
                  : button.action === 'quote'
                    ? (event) => {
                        event.preventDefault();
                        setIsQuoteOpen((current) => !current);
                      }
                    : undefined
              }
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

      {isQuoteOpen && (
        <form className="quote-form" id="cotizar-taquisa" onSubmit={sendQuote}>
          <div className="quote-form-heading">
            <span className="quote-icon">
              <Users aria-hidden="true" size={20} />
            </span>
            <div>
              <strong>Cotización de taquisa</strong>
              <p>Indica cuántas personas asistirán y envía la solicitud por WhatsApp.</p>
            </div>
          </div>

          <label className="guest-field">
            <span>Personas que asistirán</span>
            <input
              inputMode="numeric"
              min="1"
              pattern="[0-9]*"
              placeholder="Ej. 30"
              required
              type="number"
              value={guestCount}
              onChange={(event) => setGuestCount(event.target.value)}
            />
          </label>

          <div className="quote-includes">
            <strong>Incluye</strong>
            <ul>
              {taquizaIncludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="quote-extra">
            <strong>Carnes con costo extra</strong>
            <span>{extraMeats.join(' · ')}</span>
          </div>

          <button className="quote-submit" type="submit">
            <Send aria-hidden="true" size={20} />
            Enviar cotización por WhatsApp
          </button>
        </form>
      )}
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
