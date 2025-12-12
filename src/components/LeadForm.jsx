import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzco1eCkNPUJ1t7LNCoD_lR8WW-vqOFAHZYYOEO9HrLekwhVKF3Kc3b5kBGAJnq498K_A/exec';

const initialForm = {
  nome: '',
  email: '',
  telefone: '',
  endereco: '',
  perfil: '',
  mensagem: '',
};

export default function LeadForm({ title = 'Entre na lista de interesse', subtitle = 'Receba novidades e garanta acesso antecipado ao app.' }) {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const location = useLocation();

  const utmParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const out = {};
    keys.forEach((k) => {
      const v = params.get(k);
      if (v) out[k] = v;
    });
    return out;
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('idle');

    const payload = {
      ...formData,
      page: window.location.href,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      ...utmParams,
    };

    setStatus('sending');
    try {
      const body = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => body.append(k, v?.trim ? v.trim() : v));

      const resp = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body,
      });
      if (!resp.ok) throw new Error('HTTP error');
      try {
        await resp.json();
      } catch (_) {
        // Apps Script pode responder texto puro; ignore se não for JSON
      }
      setFormData(initialForm);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="contact-card">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <form onSubmit={handleSubmit} className="interest-form">
        <div className="grid">
          <label>
            <span>Nome</span>
            <input
              name="nome"
              type="text"
              placeholder="Seu nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>E-mail</span>
            <input
              name="email"
              type="email"
              placeholder="voce@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Telefone</span>
            <input
              name="telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <label>
          <span>Endereço</span>
          <input
            name="endereco"
            type="text"
            placeholder="Rua, número, bairro, cidade/UF"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <span>Quem é você?</span>
          <select name="perfil" value={formData.perfil} onChange={handleChange} required>
            <option value="">Selecione...</option>
            <option>Produtor(a)</option>
            <option>Comprador(a)</option>
            <option>Outro</option>
          </select>
        </label>
        <label>
          <span>Mensagem (opcional)</span>
          <textarea
            name="mensagem"
            rows="3"
            placeholder="Conte um pouco sobre sua necessidade"
            value={formData.mensagem}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando...' : 'Quero participar'}
        </button>
        <p className="form-note">Sem spam. Cancelamento a qualquer momento.</p>
        {status === 'success' && <p className="form-success">Obrigado! Em breve entraremos em contato.</p>}
        {status === 'error' && <p className="form-error">Não foi possível enviar agora. Tente novamente.</p>}
      </form>
    </div>
  );
}
