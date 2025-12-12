import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import LeadForm from '../components/LeadForm';

const slides = [
  { src: '/assets/screens/vendedor1.jpg', alt: 'Tela do app 1' },
  { src: '/assets/screens/vendedor2.jpg', alt: 'Tela do app 2' },
  { src: '/assets/screens/comprador1.jpg', alt: 'Tela do app 3' },
  { src: '/assets/screens/comprador4.jpg', alt: 'Tela do app 4' },
];

const stats = [
  {
    title: 'Suporte para Início Rápido',
    desc: 'Suporte guiado para cooperativas, feiras e pequenos mercados.',
  },
  {
    title: 'Entrega e pagamento resolvidos',
    desc: 'Negocie, combine frete e receba com segurança em um só fluxo.',
  },
  {
    title: 'Suporte dedicado',
    desc: 'Equipe acompanhando seus primeiros cadastros e vendas.',
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="pill">Pré-lançamento</span>
            </div>
            <h1>Venda direto. Compre melhor.</h1>
            <p>
              O Conecta Rural aproxima produtores e consumidores, simplificando a venda direta com negociação
              transparente, logística e pagamento descomplicados.
            </p>
            <div className="cta">
              <Link to="/contato" className="btn">
                Sou produtor
              </Link>
              <Link to="/contato" className="btn btn-alt">
                Sou comprador
              </Link>
            </div>
            <p className="note">Junte-se à lista de interesse e receba novidades do lançamento.</p>
            <div className="stats-grid">
              {stats.map((stat) => (
                <div className="stat-card" key={stat.title}>
                  <span className="stat-title">{stat.title}</span>
                  <span className="stat-desc">{stat.desc}</span>
                </div>
              ))}
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
          <h2>Por que Conecta Rural?</h2>
          <ul className="feature-grid">
            <li>
              <h3>Cadastro simples</h3>
              <p>Publique seus produtos com poucos toques, defina preço e disponibilidade.</p>
            </li>
            <li>
              <h3>Negociação transparente</h3>
              <p>Converse direto no whatsapp, sem intermediários: preço justo para todos.</p>
            </li>
            <li>
              <h3>Controle total</h3>
              <p>Tenha controle das suas compras e vendas, com liberdade para negociar como preferir.</p>
            </li>
            <li>
              <h3>Reputação e confiança</h3>
              <p>Avaliações e histórico para fortalecer relações sustentáveis.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="how">
        <div className="container">
          <h2>Como funciona</h2>
          <ol className="steps">
            <li>
              <strong>Cadastre-se</strong>
              <span>Crie seu perfil de produtor ou comprador.</span>
            </li>
            <li>
              <strong>Conecte-se</strong>
              <span>Encontre ofertas próximas e negocie direto pelo whatsapp.</span>
            </li>
            <li>
              <strong>Conclua</strong>
              <span>Combine a entrega, pague com segurança e avalie a experiência.</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="contact">
        <div className="container">
          <LeadForm />
        </div>
      </section>
    </>
  );
}
