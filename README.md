# Shreemudra — Pranav Lakshmi-Ganesh Mudra Landing Page

## Folder Structure
```
shreemudra-website/
├── index.html          → main page (markup only)
├── css/
│   └── styles.css      → all styling
├── js/
│   └── script.js       → all interactivity (countdown, live ticker, cart, modal, order flow)
├── images/              → product photography used on the page
└── README.md            → this file
```

## Before Going Live — 2 things to update

Open `js/script.js` and change these two constants near the bottom (search for them):

1. **WhatsApp number** (for Cash on Delivery orders)
   ```js
   const WHATSAPP_NUMBER = "91XXXXXXXXXX";
   ```
   Replace with your real WhatsApp Business number — country code + number, no `+`, no spaces.
   Example: `919812345678`

2. **Payment link** (for online prepaid orders)
   ```js
   const PAYMENT_LINK = "https://your-payment-link-here.example.com";
   ```
   Replace with your real payment gateway link (Razorpay Payment Page / Instamojo / PayU / etc.).

That's it — both buttons in the order pop-up ("ऑनलाइन Pay करें" and "COD — WhatsApp पर ऑर्डर भेजें") will start working immediately once these two values are updated.

## How to preview locally
Just double-click `index.html` — it works with no build step, no server, no dependencies.

## How to deploy
Upload the entire `shreemudra-website` folder (keeping the same structure) to any static host:
- Netlify / Vercel (drag-and-drop the folder)
- GitHub Pages
- Hostinger / GoDaddy / any shared hosting — upload via FTP into `public_html`

Do not rename or move the `css`, `js`, or `images` folders — `index.html` references them by relative path.

## What's inside
- Mobile-first responsive layout (375px–430px tested, scales up to desktop)
- Auto-rotating 360° coin showing both engraved sides
- Live "just bought" ticker + toast with randomly generated Indian names/cities (large combinatorial pool)
- Countdown-timer offer sections
- Sticky bottom "Buy Now" bar on mobile
- Order pop-up with quantity selector, COD-via-WhatsApp flow, and Pay-Online flow
- FAQ accordion, testimonials, and full footer with policy links
