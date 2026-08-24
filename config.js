const CONFIG = {
  // Configurazione Generale
  lang: "ita", // "ita" oppure "eng"
  targetName: "Marta",
  targetEmail: "p.montano1993@gmail.com",
  
  // Endpoint Formspree (crea un account gratuito su formspree.io e incolla qui il tuo ID form)
  formspreeEndpoint: "https://formspree.io/f/TUO_FORMSPREE_ID",

  // SHA-256 Hash della password desiderata (Es: "marta123")
  // Puoi calcolarlo online o da console browser con crypto.subtle
  passwordHashSHA256: "a5707a3548e7e6f0ebc064ed4feaae82597acba6e524aa034de376b0ec06dbb6",

  // Date da evidenziare nel calendario con il cuoricino (Formato: YYYY-MM-DD)
  highlightedDates: [
    "2026-09-01" // 1 Settembre
  ],

  // Dizionario Traduzioni
  i18n: {
    ita: {
      welcomeTitle: "Benvenuta sul sito di prenotazione di un appuntamento con me!",
      enterPass: "Inserisci la password per continuare:",
      btnSubmit: "Entra",
      passError: "Mi dispiace, solo {name} può richiedere un appuntamento con me e lei sa la password!",
      
      step2Title: "Ciao {name}! Vuoi uscire con me?",
      btnYes: "SÌ! ❤️",
      btnNo: "No 😜",

      step3Title: "Scegli una data",
      btnNext: "Avanti ➡️",
      btnBack: "⬅️ Indietro",

      step4Title: "A che ora ci vediamo?",
      timeLabel: "Seleziona l'orario:",

      step5Title: "Cosa ti andrebbe di mangiare?",
      sendingMsg: "Invio della prenotazione in corso...",

      successTitle: "Evviva! 🎉",
      successMsg: "Ok, ci vediamo il {date} alle {time}! ❤️",
      foodChosen: "Menu scelto: {food}"
    },
    eng: {
      welcomeTitle: "Welcome to the date booking website with me!",
      enterPass: "Enter the password to continue:",
      btnSubmit: "Enter",
      passError: "Sorry, only {name} can book a date with me and she knows the password!",

      step2Title: "Hi {name}! Will you go out with me?",
      btnYes: "YES! ❤️",
      btnNo: "No 😜",

      step3Title: "Pick a date",
      btnNext: "Next ➡️",
      btnBack: "⬅️ Back",

      step4Title: "What time shall we meet?",
      timeLabel: "Select time:",

      step5Title: "What would you like to eat?",
      sendingMsg: "Sending your reservation...",

      successTitle: "Hooray! 🎉",
      successMsg: "Awesome, see you on {date} at {time}! ❤️",
      foodChosen: "Chosen menu: {food}"
    }
  }
};

// Funzione helper per ottenere il testo tradotto
function getText(key, replacements = {}) {
  const currentLang = CONFIG.lang || 'ita';
  let text = CONFIG.i18n[currentLang][key] || key;
  replacements['name'] = CONFIG.targetName;
  
  for (const [placeholder, val] of Object.entries(replacements)) {
    text = text.replace(new RegExp(`{${placeholder}}`, 'g'), val);
  }
  return text;
}

// Calcolo Hash SHA-256 per verifica password
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
