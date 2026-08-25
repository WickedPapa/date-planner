# Copilot Instructions for dinner-with-me

## Project Overview

**dinner-with-me** is a client-side multi-step interactive date booking web application. It guides users through a progressive form flow to schedule a date, with password authentication, date/time selection, and food preferences.

## Architecture

### Application Flow

The app follows a strict linear step-by-step progression:

1. **index.html** - Password authentication gate (hashed SHA-256 verification)
2. **step2-quest.html** - Initial question: "Will you go out with me?" (features an interactive escaping "No" button)
3. **step3-date.html** - Date picker with validation and special date highlighting
4. **step4-time.html** - Time selection
5. **step5-food.html** - Food/menu preference selection
6. **step6-confirm.html** - Summary and confirmation
7. **success.html** - Final confirmation with Formspree email submission

Session state is managed entirely via **localStorage**, with no backend dependencies except email delivery via Formspree.

### Core Modules

- **config.js** - Centralized configuration (target name, language, password hash, special dates, Formspree endpoint)
- **i18n.js** - Internationalization data supporting Italian (ita) and English (eng) with placeholder substitution
- **utils.js** - Shared utilities:
  - `getText(key, replacements)` - Retrieves translated text with placeholder replacement
  - `sha256(message)` - SHA-256 password hashing using Web Crypto API
  - `formatDate(dateString)` - Date formatting (Italian: DD-MM-YYYY, English: YYYY-MM-DD)
- **styles.css** - Unified styling with gradient background, card-based UI, responsive design

## Key Conventions

### Password Protection

- **All step pages** check for `localStorage.getItem('auth')` and redirect to index.html if missing
- Password verification occurs on index.html; on success, `localStorage.setItem('auth', 'true')` is called
- Password is stored in config.js as SHA-256 hash (`passwordHashSHA256`)
- Client-side comparison: `sha256(userInput) === CONFIG.passwordHashSHA256`

### Text & Internationalization

- All UI text is retrieved via `getText(key, replacements)` function
- Placeholder substitution uses `{placeholder}` syntax: `{name}`, `{date}`, `{time}`, `{food}`
- Add new strings to `I18N_DATA` in i18n.js with both Italian and English versions
- Language is controlled by `CONFIG.lang` ("ita" or "eng")

### Data Storage

- Each step saves its selection to localStorage before proceeding:
  - `selectedDate` - YYYY-MM-DD format
  - `selectedTime` - HH:MM format
  - `selectedFood` - String value
- Data persists until page reload or localStorage clear
- No database; final data is sent via Formspree API on confirmation

### Configuration

Modify `config.js` to change:
- `lang` - Set default language
- `targetName` - Recipient name (interpolated into all text as {name})
- `targetEmail` - Email to receive booking submissions
- `formspreeEndpoint` - Formspree form endpoint for email delivery
- `passwordHashSHA256` - SHA-256 hash of the password (generate with `sha256(password)`)
- `highlightedDates` - Array of special dates (YYYY-MM-DD) that trigger special UI messages

### Special UI Behaviors

- **step2-quest.html** - The "No" button flees on hover/touch/click. Uses CSS transitions and absolute positioning within the card bounds
- **step3-date.html** - Date picker has minimum date validation (tomorrow minimum) and highlights special dates with heart emoji
- All pages use localStorage-based navigation; no server-side routing

### No Build Process

This is a zero-dependency, client-side only application:
- No npm scripts, no build tool, no transpiler
- Serve directly via any static web server (HTTP required for localStorage)
- Modern browser features used: Web Crypto API, async/await, template literals, modern CSS

## Testing & Verification

Since there is no automated test suite or build process:

1. **Manual UI testing** - Open each step in a browser, verify navigation and data persistence
2. **Password verification** - Test with correct and incorrect passwords
3. **localStorage** - Verify data is saved and persists across page navigation
4. **Responsive design** - Test on mobile and desktop viewports
5. **Formspree submission** - Verify final confirmation sends email correctly

## Development Tips

- Edit config.js to test with different names, emails, and special dates
- Use browser DevTools Console to verify hashes: `sha256('mypassword')` returns the hash to store in `passwordHashSHA256`
- Test localStorage directly: `localStorage.setItem/getItem/removeItem` to inspect session state
- All dates in code use YYYY-MM-DD ISO format for consistency
- Each step HTML file is self-contained; shared scripts are loaded first