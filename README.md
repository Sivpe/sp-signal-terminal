# SP Gold Signal Terminal — PRIVATE

Steven's personal AI-style trading-signals terminal for **gold only (XAUUSD)**.
Inspired by the layout of Zoqira's terminal, but original code, original
branding, and Steven's own signal rules (the same EMA / breakout / range-edge
logic as his SP Gold Scalp Panel, with ATR-based stop and targets).

**This repository is private. Do not make it public and do not enable
GitHub Pages on it** — on a normal GitHub account a Pages site is public on
the internet even when the repository is private. Private live hosting
options are listed at the bottom.

## What it does

- Live gold chart (15m / 1h / 4h) with EMA 21 / 55 — candles from the public
  PAXG feed (Binance Vision, OKX fallback). PAXG tracks spot gold within a
  few dollars; it is **not** the Exness XAUUSDc price. Check every entry
  against MT5 before trading.
- **Desk scan** — an "analyst council" (Technical, Momentum, Sentiment/RSI,
  Risk) votes on the last *closed* candle only. A BUY/SELL needs Technical
  plus 3 of 4 agreeing and no Risk veto (ATR too wild), otherwise WAIT.
  Entry = last close, SL = 1×ATR, TP1/TP2/TP3 = 1.0R / 1.8R / 2.6R.
  H1 bias (EMA 21/55 + ADX) adjusts conviction.
- **Signals & Record** — every BUY/SELL scan is saved on the device and
  graded honestly against later candles (TP1 vs SL, first touch wins).
  Losses are never removed. The record starts at zero — it is earned.
- **Journal** — daily notes, stored in the browser on that device only.
- **My MT5 Panel** — load `SP_Scalp_Signal.json` from the SP Gold Scalp
  Panel indicator to see the MT5 signal beside the web desk.
- Optional signal beep (rising = BUY, falling = SELL) with vibration,
  foreground only — the same pattern as the Smart Grid dashboard.

Signal-only: it never places a trade and holds no money. Not financial advice.

## Run it

Option A — on a computer: download `index.html` (or clone this repo) and
open it in Chrome. Option B — serve the folder locally:
`python3 -m http.server` then open `http://localhost:8000`.

## If you later want it live but still only-you

1. **Your VPS over Tailscale** (recommended — same setup as your Smart Grid
   dashboard): truly private, only your devices.
2. **Cloudflare Pages + Cloudflare Access** (email code login): private,
   free tier, code stays in this private repo.
3. GitHub Pages is **not** private on a normal account — do not use it
   for this one.

## Later upgrades (not in v1)

- True spot XAUUSD candles via a Twelve Data API key (settings field).
- News blackout window (CPI / NFP / FOMC) like the Scalp Panel.
- Push notifications through the existing MT5 notifier route.
