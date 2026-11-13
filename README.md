# SP Gold Trading

Steven's AI-style trading-signals terminal for **gold only (XAUUSD)** — the
website is named **SP Gold Trading** (the repo keeps its original
`sp-signal-terminal` slug so the live URL and the gold-news feed stay put).
Inspired by the layout of Zoqira's terminal, but original code, original
branding, and Steven's own signal rules (the same EMA / breakout / range-edge
logic as his SP Gold Scalp Panel, with ATR-based stop and targets).

**Live site: https://sivpe.github.io/sp-signal-terminal/**
This repository is PUBLIC and the site is served by GitHub Pages from this
repo (main branch, root) — Steven's decision on 2026-11-13, replacing the
original private-only setup. Anyone with the link can open the terminal.
Each visitor's saved signals, record and journal live only in their own
browser — nothing is uploaded anywhere. The Gold News section is the one
shared part: it reads `news-reports.json` in this repo, which Muse's gold
news watch updates before and after gold-moving releases.

## What it does

- **Real gold market data (v2)** — candles from **OKX's XAU gold contract**,
  a real exchange-traded gold market that tracks spot XAU/USD, plus a live
  spot XAU/USD reference price from gold-api.com. (v1 used the PAXG token;
  Steven rejected it as "fake gold" and it was removed completely.)
  Optional: paste a free **Twelve Data** API key in “How it works → Data
  feed” and the candles switch to true spot XAU/USD (the key stays in that
  browser only). Broker prices still differ by spread — check entries
  against Exness XAUUSDc in MT5 before trading.
- Live gold chart (15m / 1h / 4h) with EMA 21 / 55.
- **Desk scan** — an "analyst council" (Technical, Momentum, Sentiment/RSI,
  Risk) votes on the last *closed* candle only. A BUY/SELL needs Technical
  plus 3 of 4 agreeing and no Risk veto (ATR too wild), otherwise WAIT.
  Entry = last close, SL = 1×ATR, TP1/TP2/TP3 = 1.0R / 1.8R / 2.6R.
  H1 bias (EMA 21/55 + ADX) adjusts conviction.
- **Signals & Record** — every BUY/SELL scan is saved on the device and
  graded honestly against later candles (TP1 vs SL, first touch wins).
  Losses are never removed. The record starts at zero — it is earned.
- **Gold News** — Muse's scheduled-release reports (pre-news call with
  reasons ~10 min before, result + updated call after), from
  `news-reports.json`.
- **News Blackout Shield** — top of the Terminal: next gold event + live
  countdown; from 30 min before to 60 min after a release the banner turns
  red ("NEWS BLACKOUT — NO TRADE") and a scan asks for explicit
  confirmation (otherwise a NO TRADE card is shown). Events come from
  `news-events.json` (ISO times, Phnom Penh), synced each morning from the
  news watch calendar plus hand-seeded Fed/BEA dates.
- **Backtest** — runs the desk's exact live rules (the live scan and the
  backtest share one `councilAt` function) over up to 1,000 past OKX/Twelve
  Data candles per timeframe: one trade at a time, SL counted first when a
  candle touches both, 96-candle max hold, wins/losses/expired, net R,
  BUY-vs-SELL split, equity curve, trade list. Labelled honestly: no
  spread/slippage, reference feed not Exness, in-test bias comes from the
  tested timeframe (live 15m scans use the H1 bias).
- **Journal** — daily notes, stored in the browser on that device only.
- **My MT5 Panel** — load `SP_Scalp_Signal.json` from the SP Gold Scalp
  Panel indicator to see the MT5 signal beside the web desk. (An automatic
  Tailscale-link loader was added on 2026-11-13 and removed the same day —
  Steven found it confusing and chose the simple manual load.)
- Optional signal beep (rising = BUY, falling = SELL) with vibration,
  foreground only — the same pattern as the Smart Grid dashboard.

Signal-only: it never places a trade and holds no money. Not financial advice.

## Run it

On the live site above, or locally: download `index.html` (or clone this
repo) and open it in Chrome, or serve the folder with
`python3 -m http.server` and open `http://localhost:8000`
(the Gold News section needs the folder served, or the live site, so it can
fetch `news-reports.json`).

## Hosting

GitHub Pages, public, from this repository (main / root):
https://sivpe.github.io/sp-signal-terminal/

(Earlier the repo was private with Pages off, because on a normal GitHub
account a Pages site is public even from a private repo. Steven chose to
make it public on 2026-11-13.)

## Later upgrades (not built yet)

- News blackout window (CPI / NFP / FOMC) like the Scalp Panel.
- Push notifications through the existing MT5 notifier route.
