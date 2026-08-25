// Retrieves translated text from I18N_DATA and applies placeholders
function getText(key, replacements = {}) {
  const currentLang = (typeof CONFIG !== 'undefined' && CONFIG.lang) ? CONFIG.lang : 'ita';
  let text = (I18N_DATA && I18N_DATA[currentLang] && I18N_DATA[currentLang][key]) ? I18N_DATA[currentLang][key] : key;
  
  replacements['name'] = (typeof CONFIG !== 'undefined' && CONFIG.targetName) ? CONFIG.targetName : '';
  
  for (const [placeholder, val] of Object.entries(replacements)) {
    text = text.replace(new RegExp(`{${placeholder}}`, 'g'), val);
  }
  return text;
}

// Computes the SHA-256 hash of a password
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Formats dates as DD-MM-YYYY in Italian, otherwise keeps YYYY-MM-DD
function formatDate(dateString) {
  if (!dateString) return '';
  const currentLang = (typeof CONFIG !== 'undefined' && CONFIG.lang) ? CONFIG.lang : 'ita';
  
  const [year, month, day] = dateString.split('-');
  
  if (currentLang === 'ita') {
    return `${day}-${month}-${year}`;
  }
  
  return dateString;
}