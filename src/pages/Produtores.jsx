import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import LeadForm from '../components/LeadForm';

const slides = [
  { src: '/assets/screens/vendedor1.jpg', alt: 'Tela do vendedor 1' },
  { src: '/assets/screens/vendedor2.jpg', alt: 'Tela do vendedor 2' },
  { src: '/assets/screens/vendedor3.jpg', alt: 'Tela do comprador 1' },
  { src: '/assets/screens/vendedor4.jpg', alt: 'Tela do comprador 2' },
  { src: '/assets/screens/vendedor5.jpg', alt: 'Tela do comprador 2' },
];

const pontos = [
  { title: 'Cadastre lotes e safras', desc: 'Publique volume, variedade, preço e disponibilidade em minutos.' },
  { title: 'Negocie direto', desc: 'Envie mensagem direto pelo whatsapp sem intermédio.' },
  { title: 'Logística combinada', desc: 'Escolha entrega própria, frete, ou retirada — tenha controle do que é seu.' },
  { title: 'Você Decide o Pagamento ', desc: 'Tenha o poder da decisão da sua produção e combine o pagamento.' },
];

const etapas = [
  { title: 'Suporte e ajuda', desc: 'Acompanhamos seu primeiro cadastro e anúncio.' },
  { title: 'Ative o catálogo', desc: 'Organize itens, combos e promoções sazonais.' },
  { title: 'Venda recorrente', desc: 'Reputação e clientes fiéis.' },
];

export default function Produtores() {
  return (
    <>
      <section className="page-hero">
        <div className="container split">
          <div>
            <p className="eyebrow">Para quem produz</p>
            <h1>Venda direto, mantenha sua margem e controle o frete.</h1>
            <p className="muted">
              Cadastre-se, publique ofertas e feche pedidos com pagamento e logística combinados. Suporte dedicado nos
              primeiros passos.
            </p>
            <div className="cta">
              <Link to="/contato" className="btn">
                Quero vender no Conecta
              </Link>
              <Link to="/" className="btn btn-alt">
                Ver o app
              </Link>
            </div>
          </div>
          <div className="hero-media">
            <div className="device-frame">
              <Carousel items={slides} />
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Por que vale para o produtor?</h2>
          <div className="card-list">
            {pontos.map((p) => (
              <div key={p.title} className="card">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how">
        <div className="container">
          <h2>Seu caminho até a primeira venda</h2>
          <ol className="steps alt">
            {etapas.map((etapa) => (
              <li key={etapa.title}>
                <strong>{etapa.title}</strong>
                <span>{etapa.desc}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="contact">
        <div className="container">
          <LeadForm title="Fale com o time de implantação" subtitle="Conte seu cenário e agende um onboarding assistido." />
        </div>
      </section>
    </>
  );
}
