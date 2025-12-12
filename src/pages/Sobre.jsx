import { Link } from 'react-router-dom';
import TiltCarousel from '../components/TiltCarousel';

const pilares = [
  { title: 'Transparência', desc: 'Preço e condições claras para quem compra e vende.' },
  { title: 'Simplicidade', desc: 'Fluxos curtos, menos telas, mais resultado.' },
  { title: 'Relações duradouras', desc: 'Reputação, histórico e recorrência como base de confiança.' },
];

const sobrePhotos = [
  {
    src: '/assets/sobre/homenagem.png',
    alt: 'Voto de Congratulações',
    title: 'Voto de Congratulações',
    caption:
      'Reconhecimento público pelo nosso papel na modernização da agricultura e no fortalecimento da economia local.',
  },
  {
    src: '/assets/sobre/podio.png',
    alt: 'Conecta Rural Campeão em Inovação',
    title: 'Conecta Rural Campeão em Inovação',
    caption: 'Plataforma que transforma a logística rural, unindo produtores e compradores com geolocalização.',
  },
  {
    src: '/assets/sobre/mv.jpg',
    alt: 'Troféu Conecta Rural Campeão em Inovação',
    title: '1º Lugar no Agro Inova Summit',
    caption: 'Agradecemos ao Movimento Empreendedor e ao Agro Inova Summit pelo reconhecimento e por impulsionarem a inovação no agronegócio.',
  },
  
  {
    src: '/assets/sobre/video.mp4',
    alt: 'Vídeo Conecta Rural',
    title: 'Uma Jornada de Inovação',
    caption: 'O primeiro dia da competição que marcou a trajetória do Conecta Rural até a conquista do 1º lugar.',
    type: 'video',
  },
];

export default function Sobre() {
  return (
    <>
      <section className="page-hero">
        <div className="container split">
          <div>
            <p className="eyebrow">Sobre o Conecta Rural</p>
            <h1>Uma ponte entre quem produz e quem consome.</h1>
            <p className="muted">
              Estamos construindo um jeito direto, justo e simples de aproximar o campo da cidade, com tecnologia que
              respeita o trabalho de quem produz e a confiança de quem compra.
            </p>
            <div className="cta">
              <Link to="/contato" className="btn">
                Quero participar
              </Link>
              <Link to="/" className="btn btn-alt">
                Voltar
              </Link>
            </div>
          </div>
          <div className="card-list">
            {pilares.map((p) => (
              <div key={p.title} className="card">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-tilt">
        <div className="container container-wide">
          <TiltCarousel items={sobrePhotos} />
        </div>
      </section>
    </>
  );
}
