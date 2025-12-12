import LeadForm from '../components/LeadForm';

export default function Contato() {
  return (
    <>
      <section className="page-hero">
        <div className="container split">
          <div>
            <p className="eyebrow">Fale com a gente</p>
            <h1>Vamos entender seu cenário e antecipar seu acesso.</h1>
            <p className="muted">
              Conte se você é produtor ou comprador. A equipe responde rápido para ajudar na
              implantação.
            </p>
          </div>
        </div>
      </section>

      <section className="contact">
        <div className="container">
          <LeadForm title="Deixe seus dados" subtitle="Responderemos com as próximas etapas do Conecta Rural." />
        </div>
      </section>
    </>
  );
}
