# Copilot Instructions for date-planner

## Project Overview

**date-planner** is a zero-dependency, client-side date-booking web app. It uses static HTML pages, shared JavaScript and CSS, browser `localStorage`, and Formspree for the final submission.

## Architecture

### Application Flow

The app follows a strict linear step-by-step progression:

1. **index.html** - Password authentication gate (hashed SHA-256 verification)
2. **quest.html** - Initial question with an escaping "No" button
3. **datetime.html** - Combined date/time selection and validation
4. **food.html** - Food preference selection
5. **notes.html** - Optional notes (up to 300 characters)
6. **confirm.html** - Summary and Formspree submission
7. **success.html** - Final confirmation

Session state is managed entirely via **localStorage**, with no backend dependencies except email delivery via Formspree.

### Core Modules

- **config.js** - Centralized configuration (target name, language, password hash, special dates, Formspree endpoint)
- **i18n.js** - Internationalization data supporting Italian (ita) and English (eng) with placeholder substitution
- **utils.js** - Shared utilities:
  - `getText(key, replacements)` - Retrieves translated text with placeholder replacement
  - `sha256(message)` - SHA-256 password hashing using Web Crypto API
  - `formatDate(dateString)` - Date formatting (Italian: DD-MM-YYYY; otherwise YYYY-MM-DD)
- **styles.css** - Unified styling with gradient background, card-based UI, responsive design

## Key Conventions

### Password Protection

- **All step pages** check for `localStorage.getItem('auth')` and redirect to `index.html` if missing
- Password verification occurs on index.html; on success, `localStorage.setItem('auth', 'true')` is called
- The SHA-256 password hash is stored in `config.js` (`passwordHashSHA256`)
- Client-side comparison: `sha256(userInput) === CONFIG.passwordHashSHA256`
- This is a convenience gate, not a security boundary: static assets and the hash are public to visitors.

### Text & Internationalization

- All UI text is retrieved via `getText(key, replacements)` function
- Placeholder substitution uses `{placeholder}` syntax: `{name}`, `{date}`, `{time}`, `{food}`
- Add new strings to `I18N_DATA` in i18n.js with both Italian and English versions
- Language is controlled by `CONFIG.lang` ("ita" or "eng")

### Data Storage

- Steps save these values to `localStorage`:
  - `selectedDate` - YYYY-MM-DD format
  - `selectedTime` - HH:MM format
  - `selectedFood` - String value
  - `noteContent` - Optional notes string
  - `auth` - Authentication-gate flag (`"true"`)
- Data survives reloads and persists until it is overwritten or localStorage is cleared
- No database; final data is sent via Formspree API on confirmation

### Configuration

Modify `config.js` to change:
- `lang` - Set default language
- `targetName` - Recipient name (interpolated into all text as {name})
- `formspreeEndpoint` - Formspree form endpoint for email delivery
- `passwordHashSHA256` - SHA-256 hash of the password (generate with `sha256(password)`)
- `highlightedDates` - Exact dates (`YYYY-MM-DD`) or annually recurring dates (`MM-DD`) that trigger a special UI message

### Special UI Behaviors

- **quest.html** - The "No" button flees on hover/touch/click using absolute positioning inside its button container
- **datetime.html** - The earliest valid selection is the current local date/time; configured dates display a special note
- All pages use localStorage-based navigation; no server-side routing

### No Build Process

This is a zero-dependency, client-side only application:
- No npm scripts, no build tool, no transpiler
- Serve directly through a static web server. Avoid opening files through `file://`; Web Crypto is restricted to secure contexts in modern browsers (localhost is suitable for development).
- Modern browser features used: Web Crypto API, async/await, template literals, modern CSS

## Testing & Verification

Since there is no automated test suite or build process:

1. **Manual UI testing** - Open each step in a browser, verify navigation and data persistence
2. **Password verification** - Test with correct and incorrect passwords
3. **localStorage** - Verify `auth`, date, time, food, and notes persist across navigation and reloads
4. **Responsive design** - Test on mobile and desktop viewports
5. **Formspree submission** - Verify the request payload and destination configured in Formspree

## Development Tips

- Edit config.js to test with different names, emails, and special dates
- Use browser DevTools Console to verify hashes: `sha256('mypassword')` returns the hash to store in `passwordHashSHA256`
- Test localStorage directly: `localStorage.setItem/getItem/removeItem` to inspect session state
- Exact dates use `YYYY-MM-DD`; recurring highlighted dates use `MM-DD`
- Each step HTML file is self-contained; shared scripts are loaded first
- Preserve the script order `config.js`, `i18n.js`, then `utils.js`
- When adding visible UI text, add both `ita` and `eng` entries to `I18N_DATA` and retrieve them through `getText()`
