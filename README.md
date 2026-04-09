# Agency Zero → Hero

Interactive SEO & Marketing execution platform. Run every client through the same proven framework with AI-powered guidance.

---

## Quick Start (Cursor / Vite)

### 1. Create the project

```bash
npm create vite@latest agency-zero-hero -- --template react
cd agency-zero-hero
```

### 2. Drop in the files

- Replace `src/App.jsx` with **AgencyZeroToHero.jsx**
- (Optional) Copy `server.js` to the project root for the AI proxy

### 3. Run it

```bash
npm install
npm run dev
```

Open `http://localhost:5173` — the app works immediately (checklist, projects, notes, progress tracking all use localStorage).

---

## Setting Up AI Help (the "AI" button on each task)

You have two options:

### Option A: Quick & easy (direct API call)

Best for local prototyping only — the key is visible in the browser.

1. Create `.env` in the project root:

```
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

2. Restart the dev server. Done — the AI button works.

### Option B: Backend proxy (recommended)

Keeps your API key secure on the server.

1. Install dependencies:

```bash
npm install express cors
```

2. Create `.env` in the project root:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

3. Run the proxy in a second terminal:

```bash
node server.js
```

4. Add a Vite proxy so the frontend can reach it. In `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})
```

5. Make sure `.env` does NOT have `VITE_ANTHROPIC_API_KEY` set (so the app uses the proxy path instead).

---

## What's Included

| Feature | Details |
|---|---|
| **Dashboard** | Create unlimited client projects with name + niche |
| **4 Guide Templates** | SMM & Funnels · Client Delivery · Local SEO · Delivery Ops |
| **Per-Task Tools** | Checkbox, tip, AI help, and notes on every task |
| **AI Guidance** | Context-aware help using the client's niche |
| **Progress Tracking** | Ring charts and bars at every level |
| **Persistent Storage** | All data saved to localStorage |

---

## File Structure

```
agency-zero-hero/
├── src/
│   └── App.jsx          ← AgencyZeroToHero.jsx goes here
├── server.js            ← AI proxy (optional)
├── .env                 ← API key
├── vite.config.js
└── package.json
```

---

## .gitignore reminder

Make sure `.env` is in your `.gitignore` so you never commit your API key.
