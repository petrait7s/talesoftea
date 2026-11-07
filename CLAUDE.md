# Tales of Tea: project rules

Public website + order form + admin (Website Settings, Super POS + Ledger) for a tea leaf seller.
8 tea varieties, several grades, sold by weight (100g, 250g, 500g, 1kg). Customers in Bangladesh,
mobile-first, Cash on Delivery or bKash/Nagad. Plan: `docs/TalesOfTea_Build_Plan.pdf`.

## Layout
- `web/`  Astro (static build) for the public site. Domain: `domain.com`.
- `app/`  Laravel + Livewire (PHP 8.1+) for admin, POS, ledger and the order API. `admin.domain.com`. (Not started yet.)
- `preview/`  Static design mock-ups. Reference only, not shipped.
- `docs/`  Plan and specs.

## Hosting limits
20GB cPanel plan: no Docker, no Redis, no queue workers, use cron. No payment gateway.
Everything runs on the one host. Database comes with the hosting plan, no separate paid DB.
Telegram Bot for new-order alerts. Keep dependencies minimal.

## Design (web/)
Palette "Matcha Glass": light, frosted-glass cards (subtle, low gloss), bento grid on home.
Tokens live in `web/src/styles/global.css`. Bangla-first with English toggle. Fonts: Tiro Bangla (Bangla), Montserrat (English).
Mobile feels like an app (bottom tab bar, installable PWA). Desktop is a normal website.

## RULES
1. **Due is never stored.** due = order total minus sum of verified payments. Cancelled orders are excluded.
2. **Stock is in grams**, changed only through `stock_movements`, never edited directly. Cancel after confirm writes a reverse movement.
3. `payments.trx_id` is **unique**. One TrxID verifies one payment only.
4. Money is DECIMAL(12,2), never float. Currency BDT. Phone stored as `01XXXXXXXXX` (normalise `+880`, `880`).
5. Owner sees everything. Staff cannot see cost or profit, edit settings or delete records (Laravel policies).
6. Order creation (order, items, payments, stock) runs in one DB transaction.
7. Public order endpoint is insert-only, validated, rate-limited, with a honeypot. Never expose orders or customers publicly.
8. Server recomputes every price and total from variant ids. Never trust prices sent by the browser.
9. `order_items` snapshot `unit_price` AND `unit_cost`, so later price changes do not rewrite profit.
10. Profit = sales - cost of goods sold (snapshot cost x qty) - operating expenses. Stock purchases are inventory, not expenses (no double count).
11. Payments are never deleted: use `void` with a reason. Soft deletes everywhere. Audit log for order and payment edits.
12. Order endpoint accepts an idempotency key so a double tap makes one order.
13. Telegram failure must never block an order: log it and retry from cron.
14. Secrets only in `.env`, never committed. Text lives in language files (Bangla, English).
15. Warn admin when a phone has earlier cancelled orders.

## Working method
1. Before coding each phase, show a short plan (files, tables, decisions) and wait for approval.
2. Challenge weak ideas and recommend the simpler option.
3. After coding, run tests, summarise, suggest a commit message.
4. Do not start the next day until tests for the current day pass.
5. If something is unclear or the host lacks a feature, ask before assuming.

## Done means
A real order from the website reaches admin and Telegram, staff can sell in POS, due matches payments exactly, and a backup restores cleanly.
