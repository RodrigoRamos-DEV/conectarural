import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import LeadForm from '../components/LeadForm';

const slides = [
  { src: '/assets/screens/comprador1.jpg', alt: 'Tela do comprador 1' },
  { src: '/assets/screens/comprador2.jpg', alt: 'Tela do comprador 2' },
  { src: '/assets/screens/comprador4.jpg', alt: 'Tela do vendedor 1' },
  { src: '/assets/screens/comprador3.jpg', alt: 'Tela do vendedor 2' },
];

const ganhos = [
  { title: 'Origem garantida', desc: 'Fale direto com quem produz e escolha fornecedores confiáveis.' },
  { title: 'Melhor preço', desc: 'Negocie volumes, combos e recorrência sem atravessadores.' },
  { title: 'Entrega combinada', desc: 'Retire, receba ou combine como preferir.' },
  { title: 'Pagamentos claros', desc: 'Fluxo simples, histórico a um toque.' },
];

const cenarios = [
  { title: 'Feiras e mercadinhos', desc: 'Reposição rápida com produtores locais.' },
  { title: 'Restaurantes', desc: 'Sazonalidade organizada e entrega combinada.' },
  { title: 'Cooperativas de consumo', desc: 'Pedidos coletivos e recorrência facilitada.' },
];

export default function Compradores() {
  return (
    <>
      <section className="page-hero">
        <div className="container split">
          <div>
            <p className="eyebrow">Para quem compra</p>
            <h1>Compre direto do campo com transparência e agilidade.</h1>
            <p className="muted">
              Encontre produtores próximos, negocie preço e entrega no mesmo fluxo e acompanhe tudo no app.
            </p>
            <div className="cta">
              <Link to="/contato" className="btn">
                Quero comprar direto
              </Link>
              <Link to="/" className="btn btn-alt">
                Voltar para início
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
          <div className="card-list">
            {ganhos.map((g) => (
              <div key={g.title} className="card">
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Funciona para diferentes cenários</h2>
          <div className="feature-grid small">
            {cenarios.map((c) => (
              <div key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact">
        <div className="container">
          <LeadForm title="Quero comprar com produtores locais" subtitle="Deixe seus dados e conte o que procura." />
        </div>
      </section>
    </>
  );
}
