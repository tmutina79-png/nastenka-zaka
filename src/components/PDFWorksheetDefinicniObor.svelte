<script>
  let selectedProblems = $state([]);

  const problems = [
    {
      id: 1,
      title: 'Lineární funkce',
      text: 'Urči definiční obor funkce f(x) = −2x + 5.'
    },
    {
      id: 2,
      title: 'Zlomek – dělení nulou',
      text: 'Urči definiční obor funkce f(x) = 3/(x + 1).'
    },
    {
      id: 3,
      title: 'Odmocnina',
      text: 'Urči definiční obor funkce f(x) = √(2x − 4).'
    },
    {
      id: 4,
      title: 'Odmocnina ve jmenovateli',
      text: 'Urči definiční obor funkce f(x) = 1/√(x − 3).'
    },
    {
      id: 5,
      title: 'Slovní úloha – prkno',
      text: 'Délka prkna v závislosti na počtu stejně dlouhých dílků je dána vztahem d(n) = 120/n, kde n je počet dílků. Jaký je definiční obor funkce, pokud prkno dělíme na celé dílky?'
    },
    {
      id: 6,
      title: 'Složený zlomek',
      text: 'Urči definiční obor funkce f(x) = (x + 2) / (x² − 9).'
    },
    {
      id: 7,
      title: 'Odmocnina z výrazu se závorkou',
      text: 'Urči definiční obor funkce f(x) = √(6 − 3x).'
    },
    {
      id: 8,
      title: 'Zlomek s odmocninou v čitateli',
      text: 'Urči definiční obor funkce f(x) = √(x − 2) / (x − 5).'
    },
    {
      id: 9,
      title: 'Kvadratická funkce',
      text: 'Urči definiční obor funkce f(x) = x² − 4x + 3.'
    },
    {
      id: 10,
      title: 'Absolutní hodnota',
      text: 'Urči definiční obor funkce f(x) = |x − 7| + 1.'
    }
  ];

  function toggleProblem(id) {
    if (selectedProblems.includes(id)) {
      selectedProblems = selectedProblems.filter(p => p !== id);
    } else {
      selectedProblems = [...selectedProblems, id];
    }
  }

  function selectAll() {
    selectedProblems = problems.map(p => p.id);
  }

  function generatePdf() {
    const selected = problems.filter(p => selectedProblems.includes(p.id));
    if (selected.length === 0) { alert('Vyber alespoň jeden příklad!'); return; }
    const singleProblemClass = selected.length === 1 ? 'single-problem' : '';

    const content = selected.map((p, i) => `
      <div class="problem">
        <h3>Příklad ${i + 1}: ${p.title}</h3>
        <p>${p.text}</p>
        <div class="workspace">
          <p class="ws-label">Místo pro řešení:</p>
          <div class="ws-space"></div>
        </div>
      </div>
    `).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Definiční obor – Příklady</title>
    <style>
      @page{size:A4;margin:2cm}
      body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;line-height:1.6}
      h1{text-align:center;color:#1e3a8a;font-size:22px;margin-bottom:12px}
      .student-info{display:flex;justify-content:space-between;border-bottom:2px solid #dbeafe;padding-bottom:10px;margin-bottom:20px;font-size:13px;color:#1e293b}
      .student-info span{border-bottom:1px solid #1e293b;min-width:180px;display:inline-block;margin-left:6px}
      .problem{page-break-inside:avoid;margin-bottom:14px;border:1px solid #e2e8f0;border-radius:8px;padding:16px;display:flex;flex-direction:column}
      .problem:last-child{margin-bottom:0}
      h3{color:#1e3a8a;font-size:15px;margin:0 0 8px 0;border-bottom:2px solid #dbeafe;padding-bottom:6px}
      p{margin:0 0 8px 0;font-size:14px}
      .workspace{margin-top:10px;display:flex;flex-direction:column;flex:1}
      .ws-label{font-size:11px;color:#94a3b8;margin-bottom:4px}
      .ws-space{min-height:5cm;border:1px solid #e2e8f0;border-radius:6px;flex:1}
      .single-problem .ws-space{min-height:12cm}
    </style></head><body class="${singleProblemClass}">
    <h1>📐 Definiční obor funkce – Pracovní list</h1>
    <div class="student-info"><div>Příjmení a jméno žáka: <span>&nbsp;</span></div><div>Datum: <span>&nbsp;</span></div></div>
    ${content}
    </body></html>`;

    const w = window.open('', '_blank');
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 500);
  }
</script>

<div class="pdf-gen">
  <div class="pdf-header">
    <div class="pdf-icon">🖨️</div>
    <div>
      <h3 class="pdf-title">Vygeneruj PDF s příklady</h3>
      <p class="pdf-sub">Vyber příklady a vytiskni si je na papír</p>
    </div>
  </div>

  <div class="pdf-list">
    {#each problems as p}
      <label class="pdf-item" class:selected={selectedProblems.includes(p.id)}>
        <input type="checkbox" checked={selectedProblems.includes(p.id)} onchange={() => toggleProblem(p.id)} />
        <span class="pdf-item-title">{p.title}</span>
        <span class="pdf-item-text">{p.text}</span>
      </label>
    {/each}
  </div>

  <div class="pdf-actions">
    <button class="pdf-btn pdf-btn-all" onclick={selectAll}>☑️ Vybrat vše</button>
    <button class="pdf-btn pdf-btn-gen" onclick={generatePdf}>🖨️ Vygenerovat příklady do PDF ({selectedProblems.length})</button>
  </div>
</div>

<style>
  .pdf-gen {
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 14px;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  .pdf-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
  .pdf-icon { font-size: 2rem; }
  .pdf-title { font-size: 1.1rem; font-weight: 700; color: #1e3a8a; margin: 0; }
  .pdf-sub { font-size: 0.8rem; color: #64748b; margin: 0; }
  .pdf-list { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
  .pdf-item {
    display: flex; align-items: flex-start; gap: 0.75rem;
    padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 8px;
    background: white; cursor: pointer; transition: all 0.15s;
  }
  .pdf-item:hover { border-color: #93c5fd; }
  .pdf-item.selected { border-color: #3b82f6; background: #eff6ff; }
  .pdf-item input[type="checkbox"] { margin-top: 3px; accent-color: #3b82f6; }
  .pdf-item-title { font-weight: 700; color: #1e3a8a; font-size: 0.9rem; white-space: nowrap; }
  .pdf-item-text { font-size: 0.8rem; color: #64748b; }
  .pdf-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .pdf-btn {
    padding: 0.6rem 1.2rem; border-radius: 8px; border: none;
    font-weight: 700; font-size: 0.9rem; cursor: pointer;
    font-family: inherit; transition: all 0.15s;
  }
  .pdf-btn-all { background: #e2e8f0; color: #334155; }
  .pdf-btn-all:hover { background: #cbd5e1; }
  .pdf-btn-gen { background: #3b82f6; color: white; }
  .pdf-btn-gen:hover { background: #2563eb; }
</style>
