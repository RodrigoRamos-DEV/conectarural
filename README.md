# Conecta Rural — Site institucional/lead em React

Site multi-página em React/Vite para aproximar produtores e consumidores, com CTA para captação de leads e formulário integrado ao Google Apps Script/Sheets.

## Como rodar
- `npm install`
- `npm run dev` para desenvolvimento
- `npm run build` para gerar a pasta `dist`
- `npm run preview` para servir o build localmente

## Estrutura
- `src/App.jsx`: navegação (React Router), header/footer e rotas.
- `src/pages/*`: páginas Home, Produtores, Compradores, Sobre e Contato.
- `src/components/LeadForm.jsx`: formulário de lead com integração Apps Script (constante `ENDPOINT`).
- `src/components/Carousel.jsx`: carrossel de telas do app.
- `src/index.css`: estilos globais e responsividade.
- `src/main.jsx`: bootstrap do React.
- `public/assets/`: logo e screenshots (`screens/Tela1.png` etc.).
- `vite.config.js`: configuração Vite + React.

## Integração com Google Sheets (Apps Script)
1. Crie uma planilha no Google Sheets (ex.: “Conecta Rural Leads”). Opcional: na aba “Leads”, coloque cabeçalhos na linha 1: Timestamp, Nome, Email, Telefone, Endereço, Perfil, Mensagem, UTM Source, UTM Medium, UTM Campaign, UTM Term, UTM Content, Page, Referrer, User Agent.
2. Em Extensões → Apps Script, cole o código abaixo e troque `SHEET_ID` pelo ID da planilha (trecho entre `/d/` e `/edit` na URL):
```javascript
function doPost(e) {
  var ss = SpreadsheetApp.openById('SHEET_ID');
  var sh = ss.getSheetByName('Leads') || ss.insertSheet('Leads');
  var p = e.parameter || {};
  var row = [
    new Date(),
    p.nome || '',
    p.email || '',
    p.telefone || '',
    p.endereco || '',
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
```
3. Publique como Web App: “Implementar” → Nova implementação → Tipo “Aplicativo da Web” → Executar como “Eu” → Acesso “Qualquer pessoa” → Implementar. Copie a URL do Web App.
4. No arquivo `src/App.jsx`, defina a constante `ENDPOINT` com essa URL.

O formulário envia via `application/x-www-form-urlencoded` os campos: `nome`, `email`, `telefone`, `endereco`, `perfil`, `mensagem`, `page`, `referrer`, `user_agent` e, se existirem, UTMs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`).
