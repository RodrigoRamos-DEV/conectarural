Conecta Rural — Landing Page

Como usar

- Abra `index.html` em um navegador.
- Adicione screenshots do app em `assets/screens/` com os nomes `screen1.png`, `screen2.png`, `screen3.png` (pode adicionar mais, atualize os `<li>` no HTML se quiser).
- Edite textos e CTAs conforme sua estratégia.

Estrutura

- `index.html` — Estrutura da página e conteúdo.
- `styles.css` — Estilos responsivos, tema e layout.
- `script.js` — Carrossel, rolagem suave, interações simples.
- `assets/screens/` — Coloque aqui as imagens do app (PNG/JPG/SVG).

Integração com Google Sheets (Apps Script)

1) Crie uma planilha no Google Sheets (ex.: "Conecta Rural Leads"). Opcional: crie uma aba "Leads" e coloque cabeçalhos na linha 1: Timestamp, Nome, Email, Telefone, Endereço, Perfil, Mensagem, UTM Source, UTM Medium, UTM Campaign, UTM Term, UTM Content, Page, Referrer, User Agent.

2) Abra Extensões → Apps Script e cole o script abaixo, trocando `SHEET_ID` pelo ID da sua planilha (o trecho entre `/d/` e `/edit` na URL). Se preferir, você pode usar o arquivo pronto em `conecta-rural-landing/apps-script/Code.gs` já com o seu ID:

function doPost(e) {
  var ss = SpreadsheetApp.openById('SHEET_ID');
  var sh = ss.getSheetByName('Leads') || ss.insertSheet('Leads');
  var p = e.parameter || {};
  var row = [
    new Date(),
    p.nome || '',
    p.email || '',
    p.perfil || '',
    p.mensagem || '',
    p.utm_source || '',
    p.utm_medium || '',
    p.utm_campaign || '',
    p.utm_term || '',
    p.utm_content || '',
    p.page || '',
    p.referrer || '',
    p.user_agent || ''
  ];
  sh.appendRow(row);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

3) Publique como Web App: Implementar → Nova implementação → Tipo "Aplicativo da Web" → Executar como "Eu" → Quem tem acesso: "Qualquer pessoa" → Implementar. Copie a URL do Web App.

4) No arquivo `script.js`, defina a constante `ENDPOINT` com essa URL.

O formulário envia via `application/x-www-form-urlencoded` (sem preflight CORS) os campos: `nome`, `email`, `perfil`, `mensagem` e, se existirem na URL, UTMs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`). Também envia `page`, `referrer` e `user_agent`.
