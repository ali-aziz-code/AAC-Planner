'use strict';
const fields = [
  {id:'sector',label:'Sector / area',step:'focus'},
  {id:'brief',label:'SEC brief topic',step:'focus'},
  {id:'idea',label:'My project idea',step:'focus'},
  {id:'alignment',label:'Connection to the brief',step:'focus'},
  {id:'research',label:'Research to inform my plan',step:'focus'},
  {id:'action',label:'My intended action & objective',step:'action'},
  {id:'stakeholders',label:'Stakeholders & audience',step:'action'},
  {id:'role',label:'My own contribution',step:'action'},
  {id:'evidence',label:'Evidence & impact',step:'action'},
  {id:'next',label:'Next steps & timing',step:'action'},
  {id:'practical',label:'Resources & permissions',step:'action'},
  {id:'reflection',label:'A reflection to return to',step:'action'}
];
const $ = id => document.getElementById(id);
const form = $('planner');
let dirty = false;
let lastExport = '';
let currentStep = 'focus';
const value = id => $(id).value.trim();
const notesCount = () => fields.filter(f => value(f.id)).length;
const guidance = {
  focus: ['Keep the brief in view.', 'Your sector is a starting point. Your issue and action need to connect to the SEC brief.', 'What makes this issue worth acting on?'],
  action: ['Make the action yours.', 'A project involves taking action. Show your own contribution, even when you work with others.', 'How will you know whether anything changed?'],
  review: ['Pause. Read. Refine.', 'Check the connections between your issue, research, action and evidence. Discuss uncertainties with your teacher.', 'What is the one thing you need to clarify next?']
};
function updateProgress() {
  const count = notesCount();
  $('notes-count').textContent = `${count} / ${fields.length}`;
  $('progress-fill').style.width = `${count / fields.length * 100}%`;
}
function showStep(step, target) {
  currentStep = step;
  ['focus','action','review'].forEach(s => {
    $(`${s}-panel`).hidden = s !== step;
    const button = document.querySelector(`[data-step="${s}"]`);
    button.classList.toggle('active', s === step);
    if (s === step) button.setAttribute('aria-current','step');
    else button.removeAttribute('aria-current');
  });
  const [title,text,question] = guidance[step];
  $('guidance-title').textContent = title;
  $('guidance-text').textContent = text;
  $('guidance-question').textContent = question;
  if (step === 'review') renderReview();
  $('workspace').scrollIntoView({behavior:'auto',block:'start'});
  if (target) {
    const el = $(target);
    const details = el.closest('details');
    if (details) details.open = true;
    el.focus();
  } else $(step === 'review' ? 'review-title' : `${step}-title`).focus({preventScroll:true});
}
function summaryText() {
  const lines = ['LC CASD | ACTION PROJECT PLANNING SUMMARY', 'Planning draft', ''];
  fields.forEach(f => lines.push(f.label, value(f.id) || '[Not yet added]', ''));
  lines.push('This is a planning aid, not the SEC Action Project Journal. Follow the current brief and SEC submission instructions.', 'Nothing has been submitted to your teacher.', '', 'Guidance source: NCCA, AAC Guidelines, November 2024 (pp. 4–9).', 'https://www.curriculumonline.ie/getmedia/73252104-823e-4a8f-9650-af1144adf110/AAC_Guidelines_LC-CASD_Final.pdf');
  return lines.join('\n');
}
function renderReview() {
  const missing = fields.filter(f => !value(f.id));
  const count = fields.length - missing.length;
  $('review-status').textContent = count === fields.length ? 'You have notes in every planning area.' : `${count} of ${fields.length} planning areas have notes.`;
  $('review-gaps').replaceChildren();
  missing.forEach(f => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${f.id}`;
    a.textContent = `Add notes: ${f.label.toLowerCase()}`;
    a.addEventListener('click', e => {e.preventDefault();showStep(f.step,f.id);});
    li.append(a);
    $('review-gaps').append(li);
  });
  $('summary-content').replaceChildren();
  fields.forEach(f => {
    const item = document.createElement('div'); item.className = 'summary-item';
    const heading = document.createElement('h4'); heading.textContent = f.label;
    const content = document.createElement('p'); content.textContent = value(f.id) || 'Not yet added';
    if (!value(f.id)) content.className = 'empty';
    item.append(heading, content); $('summary-content').append(item);
  });
  $('export-status').textContent = '';
  $('manual-copy').hidden = true;
}
form.addEventListener('submit', e => e.preventDefault());
form.addEventListener('input', () => {dirty = notesCount() > 0;updateProgress();});
document.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => showStep(b.dataset.step)));
document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => showStep(b.dataset.go)));
$('copy-summary').addEventListener('click', async () => {
  const text = summaryText();
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    lastExport = text;
    $('export-status').textContent = 'Summary copied. Paste it into your own document to keep it.';
  } catch {
    $('copy-text').value = text;
    $('manual-copy').hidden = false;
    $('copy-text').focus(); $('copy-text').select();
    $('export-status').textContent = 'Automatic copying is unavailable. Use the selected text below to copy manually.';
  }
});
$('download-summary').addEventListener('click', () => {
  const text = summaryText();
  const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = 'CASD_AAC_Project_Plan.txt';
  document.body.append(link);link.click();link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  lastExport = text;
  $('export-status').textContent = 'Download requested. Check your downloads for CASD_AAC_Project_Plan.txt.';
});
$('clear-plan').addEventListener('click', () => $('clear-dialog').showModal());
$('cancel-clear').addEventListener('click', () => $('clear-dialog').close());
$('confirm-clear').addEventListener('click', () => {
  form.reset();dirty=false;lastExport='';$('copy-text').value='';
  $('clear-dialog').close();updateProgress();showStep('focus');
});
window.addEventListener('beforeunload', e => {
  if (dirty && summaryText() !== lastExport) {e.preventDefault();e.returnValue='';}
});
updateProgress();
