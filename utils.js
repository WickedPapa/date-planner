// Recupera il testo tradotto dal dizionario I18N_DATA applicando i placeholder
function getText(key, replacements = {}) {
  const currentLang = (typeof CONFIG !== 'undefined' && CONFIG.lang) ? CONFIG.lang : 'ita';
  let text = (I18N_DATA && I18N_DATA[currentLang] && I18N_DATA[currentLang][key]) ? I18N_DATA[currentLang][key] : key;
  
  replacements['name'] = (typeof CONFIG !== 'undefined' && CONFIG.targetName) ? CONFIG.targetName : '';
  
  for (const [placeholder, val] of Object.entries(replacements)) {
    text = text.replace(new RegExp(`{${placeholder}}`, 'g'), val);
  }
  return text;
}

// Calcolo dell'hash SHA-256 della password
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Formatta la data da YYYY-MM-DD a DD-MM-YYYY per la lingua italiana
function formatDate(dateString) {
  if (!dateString) return '';
  const currentLang = (typeof CONFIG !== 'undefined' && CONFIG.lang) ? CONFIG.lang : 'ita';
  
  const [year, month, day] = dateString.split('-');
  
  if (currentLang === 'ita') {
    return `${day}-${month}-${year}`;
  }
  
  // Per l'inglese o default lascia YYYY-MM-DD oppure YYYY/MM/DD
  return dateString; 
}

