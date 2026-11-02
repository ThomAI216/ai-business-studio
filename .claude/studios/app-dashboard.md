# App & dashboard studio

**Purpose:** the logged-in part: a client area, bookings or forms that save data, and her own
back office (clients, sign-ups, numbers). **Owns:** `docs/wiki/app/`. **Specialists:**
`database`, `builder`, `designer`, `verifier`, `reviewer`. **Needs first:** the app section of
`business/product-spec.md`. "Not needed yet" is a valid answer there; say so instead of building.

## Playbook
| Step | Use |
|---|---|
| Plan, data, logins, build | `webapp-dashboard` skill |
| Any data change | SOP `02-data-change.md` |
| Going live | SOP `03-publish.md` |

## Rules
- Security lives in the database (row-level security on every table), never only in the page.
- Nothing is sent to her clients (emails, messages) without her confirmation.
