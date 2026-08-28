# date-planner

A playful, interactive web app to ask someone out on a date with a client-side password gate, a step-by-step booking flow, and Formspree confirmation. Built with vanilla HTML, CSS, and JavaScript—no dependencies or build process.

## Features

- ✨ **Client-Side Password Gate** - SHA-256 verification discourages casual access
- 📅 **Date Picker** - Select dates with special date highlighting
- 🕐 **Time Selection** - Choose your preferred time
- 🍽️ **Food Preferences** - Pick your menu
- 💌 **Email Confirmation** - Automatically sends booking details via Formspree
- 🌐 **Bilingual UI Content** - Supports Italian and English strings
- 📱 **Responsive Design** - Works on mobile and desktop
- 🎮 **Interactive Elements** - Features a cheeky "No" button that tries to escape!

## Quick Start

### 1. Clone & Serve

```bash
git clone https://github.com/WickedPapa/date-planner.git
cd date-planner
```

Serve the directory using any static web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Or use any other static server (nginx, Apache, GitHub Pages, Vercel, etc.)
```

Then open `http://localhost:8000` in your browser.

### 2. Configure

Edit **config.js** to personalize:

```javascript
const CONFIG = {
  lang: "ita", // "ita" or "eng"
  targetName: "RecipientName", // Recipient's name (shown in the personalized text)
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
  passwordHashSHA256: "YOUR_SHA256_HASH", // Never put the plain-text password here
  highlightedDates: ["2026-09-01", "09-01"] // One-off or annually recurring dates
};
```

### 3. Generate Password Hash

Open your browser console and run:

```javascript
await sha256("your-password")
```

Copy the hash to `passwordHashSHA256` in config.js.

### 4. Set Up Email

1. Go to [formspree.io](https://formspree.io)
2. Create a new form and get your endpoint
3. Update `formspreeEndpoint` in config.js. Formspree determines the destination inbox from that form's dashboard settings.

## How It Works

The app follows a linear step-by-step flow:

1. **index.html** - Password authentication
2. **step1-quest.html** - "Will you go out with me?" (with a playful escaping button)
3. **step2-datetime.html** - Date and Time selection
4. **step3-food.html** - Food selection
5. **step4-notes.html** - Notes
6. **step5-confirm.html** - Review & confirm
7. **step6-success.html** - Confirmation sent

The selections are kept in the browser's `localStorage` and submitted to Formspree when confirmed. The project has no application server or database, but `localStorage` persists until it is cleared and Formspree processes the submitted data.

## Project Structure

```
.
├── index.html           # Password gate
├── step1-quest.html     # Initial question
├── step2-datetime.html  # Date and Time pickers
├── step3-food.html      # Food selection
├── step4-notes.html     # Additional notes
├── step5-confirm.html   # Summary & confirm
├── step6-success.html   # Success page
├── config.js            # Configuration (password, email, language)
├── i18n.js              # Translations (Italian & English)
├── utils.js             # Shared utilities (getText, sha256, formatDate)
├── styles.css           # Unified styling
└── .github/
    └── copilot-instructions.md  # Copilot agent guide
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Gradient backgrounds, flexbox, responsive design
- **Vanilla JavaScript (ES6+)** - Web Crypto API for SHA-256, async/await
- **localStorage** - Client-side session state
- **Formspree** - Confirmation delivery

## Customization

### Change Language

Edit **config.js**:
```javascript
lang: "eng" // Switch to English
```

## License

See LICENSE file for details.

## Contributing

Feel free to fork, improve, and submit pull requests!
