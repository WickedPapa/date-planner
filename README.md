# dinner-with-me

A playful, interactive web app to ask someone out on a date with password protection, step-by-step booking flow, and email confirmation. Built with vanilla HTML, CSS, and JavaScript—no dependencies, no build process.

## Features

✨ **Password-Protected Access** - SHA-256 hashed password verification keeps the booking form private  
📅 **Date Picker** - Select dates with special date highlighting  
🕐 **Time Selection** - Choose your preferred time  
🍽️ **Food Preferences** - Pick your menu  
💌 **Email Confirmation** - Automatically sends booking details via Formspree  
🌐 **Bilingual** - Fully supports Italian and English  
📱 **Responsive Design** - Works on mobile and desktop  
🎮 **Interactive Elements** - Features a cheeky "No" button that tries to escape!

## Quick Start

### 1. Clone & Serve

```bash
git clone https://github.com/WickedPapa/date-with-me.git
cd date-with-me
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
  lang: "ita",              // "ita" or "eng"
  targetName: "Marta",      // Recipient's name (shown in all text)
  targetEmail: "email@example.com",
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
  passwordHashSHA256: "...", // Generate with: sha256("your-password")
  highlightedDates: ["2026-09-01"] // Special dates to highlight
};
```

### 3. Generate Password Hash

Open your browser console and run:

```javascript
await sha256("your-password")
```

Copy the hash to `passwordHashSHA256` in config.js.

### 4. Set Up Email (Optional)

1. Go to [formspree.io](https://formspree.io)
2. Create a new form and get your endpoint
3. Update `formspreeEndpoint` in config.js

## How It Works

The app follows a linear step-by-step flow:

1. **index.html** - Password authentication
2. **step2-quest.html** - "Will you go out with me?" (with a playful escaping button)
3. **step3-date.html** - Date selection
4. **step4-time.html** - Time selection
5. **step5-food.html** - Food preference
6. **step6-confirm.html** - Review & confirm
7. **success.html** - Confirmation sent

All data is stored in the browser's `localStorage` and sent via email when confirmed. No server, no database, no persistent storage.

## Project Structure

```
.
├── index.html           # Password gate
├── step2-quest.html     # Initial question
├── step3-date.html      # Date picker
├── step4-time.html      # Time selection
├── step5-food.html      # Food preference
├── step6-confirm.html   # Summary & confirm
├── success.html         # Success page
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
- **Formspree** - Email delivery (optional)

## Customization

### Change Language

Edit **config.js**:
```javascript
lang: "eng" // Switch to English
```

### Add More Options

Edit **i18n.js** to add new strings, then reference them with `getText()` in your HTML/JS.

### Style Changes

Edit **styles.css**. The gradient, colors, and card styling are all customizable.

### Add/Modify Steps

Create a new `stepN.html` file, link navigation between steps, and add localStorage persistence for your new field.

## Browser Support

- Chrome/Edge 90+
- Firefox 87+
- Safari 15+
- Any modern browser supporting:
  - Web Crypto API (SHA-256)
  - localStorage
  - ES6+ JavaScript

## License

See LICENSE file for details.

## Contributing

Feel free to fork, improve, and submit pull requests!