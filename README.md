# 🛡️ CloakedLink

**CloakedLink** is a privacy-first utility designed to automatically sanitize URLs and strip tracking/telemetry parameters (like Google `gclid`, Facebook `fbclid`, UTM tags, and 50+ others) before you visit or share them.

All cleaning happens **on your device** — CloakedLink collects no data, sets no cookies, makes no network requests of its own, and has no analytics.

The project consists of a sleek, modern landing page built with HTML/CSS/JS and a lightweight, high-performance browser extension.

---

## 🌟 Key Features

### 💻 Web Platform
- **Instant Cleaning**: Paste any link with tracking parameters and get a clean, shareable URL instantly.
- **Privacy-Safe Recommendations**: Curated directory of privacy-respecting services (VPNs, Email, Search) without tracking cookies.
- **Enterprise Scrubbing** *(roadmap)*: Planned API endpoints for scrubbing CRM and outbound data pipelines.

### 🧩 Browser Extension (Manifest V3)
- **Zero Latency**: Powered by Chrome's native `declarativeNetRequest` engine, stripping parameters at the network level before pages even start loading.
- **Live Counter**: Sleek dark-mode popup showing a local count of trackers stripped on your device (no data leaves the browser).
- **Pro Toggles** *(roadmap)*: Planned options to enable/disable clipboard monitoring and background auto-cleaning.

---

## 🚀 Repository Structure

```
├── index.html          # Web landing page & monetization grid
└── extension/          # Manifest V3 browser extension source
    ├── manifest.json   # Extension metadata and permissions
    ├── rules.json      # DeclarativeNetRequest tracking rules
    ├── background.js   # Extension service worker (tracks stats & Pro state)
    ├── popup.html      # Dark-mode popup interface
    └── popup.js        # Extension settings and UI controller
```

---

## 🛠️ Local Development & Testing

### 1. Launching the Landing Page
Simply open `index.html` in any web browser, or serve it using a lightweight local server:
```bash
# Using Python
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.

### 2. Loading the Extension in Chrome
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click the **Load unpacked** button in the top-left corner.
4. Select the `extension` folder inside this repository.
5. Pin the CloakedLink extension to your toolbar to watch clean stats update in real-time.

---

## 💰 Monetization Architecture

CloakedLink enforces a **Zero-Cookie / Zero-Tracker** policy. We monetise transparently using the following privacy-aligned models:

1. **Freemium Browser Extension**: Free tier strips common tracking parameters. The **Pro Tier ($1.99/mo)** unlocks automatic Clipboard sanitization and intermediate redirect bypasses.
2. **Privacy-Safe Affiliates**: Contextual listings for privacy-first tools (like Mullvad VPN and ProtonMail) using clean referral codes instead of tracking pixels.
3. **Enterprise Data APIs**: Off-the-shelf integration points for organizations needing outward telemetry sanitization for compliance (GDPR/CCPA).