# ROCC Operations Log v4.0 - Complete Setup & Deployment Guide
# AES Clean Energy | Rocky Dev Co. | Rosendo Meza

---

## WHAT'S IN THIS FOLDER

| File                 | Purpose                                                     |
|----------------------|-------------------------------------------------------------|
| `index.html`         | The app — single file, runs in any browser                  |
| `GoogleAppsScript.js`| Backend code — goes into Google Apps Script                 |
| `SETUP_GUIDE.md`     | This file — complete instructions for everything            |
| `WORK_CHECKLIST.md`  | Quick checklist for deploying at work                       |
| `WORK_GUIDE.md`      | Detailed step-by-step deployment options                    |

---

## OVERVIEW

The ROCC Operations Log is a single-file web app for real-time shift logging across all AES sites. Multiple operators can enter data simultaneously from different laptops. All data syncs through Google Sheets.

### Architecture
```
[Operator A Browser] ──┐
[Operator B Browser] ───┼──→ Google Apps Script ──→ Google Sheet
[Operator C Browser] ──┘        (API)                (Database)
```

### App Features (v4.0)
- **Dashboard** — Alerts, SOC heatmap, SOC trend charts, node count trends, completion tracking, shift info
- **Log Sections** — BESS Avail, BESS Ctrl, CA Beacon, CA Big Sky, V/VAR Checks, Site BESS, AZ Sites, MCF PV, RR/Kauai, Substations
- **Shift Turnover** — Structured handoff with issues, events, pending actions, auto-snapshot, acknowledgment
- **Dark/Light Mode** — Toggle in header, persists per browser
- **Current Slot Highlighting** — Active time slot glows yellow on log pages with "NOW" placeholder
- **Flashing Missing Count** — Dashboard missing indicator flashes when logs are due
- **Midnight Report Alarm** — Popup at 23:55-00:05 reminding you to download the daily report
- **SOC Trend Charts** — SVG sparkline per BESS site with color-coded thresholds
- **Bellefield & Rexford** — Included in SOC heatmap and node count trends
- **Report** — Printable/downloadable daily report with all sections
- **CSV Export** — Download day's data for Excel
- **Activity Log** — Full audit trail of who entered what and when
- **Multi-user merge sync** — Server-side deep merge prevents users from overwriting each other

---

## PART 1: GOOGLE SHEETS BACKEND SETUP (one-time, ~10 minutes)

This is what lets multiple operators share data in real time.

### 1A. Create the Google Sheet

1. Go to https://sheets.google.com
2. Click **+ Blank spreadsheet**
3. Name it: `ROCC Operations Log - Backend`
4. Note the URL — you'll come back to this sheet

### 1B. Add the Apps Script

1. In the spreadsheet menu: **Extensions > Apps Script**
2. Delete any default code in the editor
3. Open `GoogleAppsScript.js` from this folder
4. Select All (Ctrl+A), Copy (Ctrl+C)
5. Paste into the Apps Script editor (Ctrl+V)
6. Click **Save** (floppy disk icon) or Ctrl+S
7. Name the project: `ROCC Backend`

### 1C. Deploy as Web App

1. Click **Deploy** (top right) > **New deployment**
2. Click the **gear icon** next to "Select type" > choose **Web app**
3. Fill in:
   - Description: `ROCC Backend v4`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** > **Go to ROCC Backend (unsafe)** > **Allow**
6. **COPY THE WEB APP URL** — it looks like:
   ```
   https://script.google.com/macros/s/ABCDEF.../exec
   ```

### 1D. Paste the URL into the App

1. Open `index.html` in a text editor (Notepad, VS Code, etc.)
2. Find the line near the top that says:
   ```
   const SCRIPT_URL="https://script.google.com/macros/s/...";
   ```
3. Replace the URL between the quotes with YOUR URL from step 1C
4. Save the file

### 1E. Test It

1. Open `index.html` in Chrome (just double-click the file)
2. Sign in with any name
3. The header should show a green dot with **"Synced"**
4. If it shows "Sync Error" — double-check your URL
5. Enter some test data, click Save
6. Open the Google Sheet — you should see a "ROCCData" tab with data
7. Open `index.html` in a second browser/incognito window, sign in as someone else
8. Verify you can see the data from step 5

---

## PART 2: HOSTING THE APP (pick one)

The HTML file needs to be accessible to everyone on your team. Here are your options, from most reliable to least:

### Option A: GitHub Pages (RECOMMENDED — most reliable)

This is the backup that's already set up.

**Live URL:** https://romen2315.github.io/rocc-ops-log/

**How it works:**
- The app is hosted on GitHub's free static hosting
- Anyone with the URL can open it
- Works from any browser on any network
- Data still syncs through Google Sheets

**To update after code changes:**
1. Open a terminal in this folder
2. Run:
   ```
   git add index.html
   git commit -m "Update app"
   git push
   ```
3. Wait 1-2 minutes for GitHub to rebuild
4. Tell everyone to refresh (Ctrl+F5)

**To set up from scratch (if repo doesn't exist):**
1. Go to https://github.com and sign in
2. Create a new repository called `rocc-ops-log`
3. Make it **Public**
4. Upload `index.html`
5. Go to **Settings > Pages**
6. Under "Source" select **main** branch, root folder
7. Click Save
8. Your URL will be: `https://YOUR-USERNAME.github.io/rocc-ops-log/`

### Option B: SharePoint

**Try this first at work — but it may not work.**

1. Go to your SharePoint site
2. Navigate to **Documents**
3. Create a folder: **ROCC Operations Log**
4. Upload `index.html`
5. Click on the file to open it

**If you see a blank page:**
- SharePoint Online blocks JavaScript by default
- Ask IT to enable "Custom Scripts" on the site
- Or use Option A (GitHub Pages) instead

**If it works:**
1. Copy the URL from your browser
2. Share it with the team
3. Everyone opens the same URL and signs in

### Option C: Google Apps Script Hosting

The Google Apps Script can serve the app directly — no other hosting needed.

**Setup:**
1. Open your ROCC Backend project at https://script.google.com
2. Click **+** next to "Files" in the left sidebar
3. Click **HTML**
4. Name it exactly: `Index` (it becomes `Index.html`)
5. Delete the default content
6. Open your local `index.html`, copy everything, paste it into the Apps Script `Index.html`
7. The `Code.gs` file should already have the updated `doGet` that serves HTML (from the latest `GoogleAppsScript.js`)
8. Click **Deploy > New deployment**
9. Web app > Execute as Me > Anyone
10. Click **Deploy**
11. Copy the URL

**The URL is now the app.** Anyone who opens it gets the full ROCC Ops Log.

**Downside:** Slightly slower page load compared to GitHub Pages.

### Option D: Shared Network Drive

1. Place `index.html` on a shared drive everyone can access
   - Example: `\\server\shared\ROCC\index.html`
2. Each operator opens the file from that location in their browser
3. Data still syncs through Google Sheets

**Downside:** Each person runs a local copy. If you update the file, everyone gets the update only when they re-open.

---

## PART 3: SHARING WITH YOUR TEAM

Send this to your team (email, Teams, Slack):

```
Subject: ROCC Operations Log - Now Live

Team,

The ROCC Operations Log is now available online. Everyone uses the same link.

LINK: https://romen2315.github.io/rocc-ops-log/
(Backup if SharePoint works: [paste SharePoint URL here])

HOW TO USE:
1. Open the link in Chrome, Edge, or Firefox
2. Enter your name/initials, select your role and shift
3. Click Sign In
4. Use the section tabs to enter readings
5. Click Save after entering data in each section
6. Dashboard shows all sites at a glance

FEATURES:
- Real-time sync between all operators (15-second auto-refresh)
- Every reading is stamped with who entered it and when
- Hover any cell to see who logged it
- Shift Turnover tab for structured handoffs
- SOC Trend Charts on dashboard
- Current time slot highlighted in yellow on log pages
- Dark/Light mode toggle (sun icon in header)
- Click "Report" to view/print/download the daily report
- Click "Export CSV" to download data for Excel
- Midnight alarm reminds you to save the daily report

TIPS:
- Tab or Enter moves to the next field
- Click the green "Synced" indicator to force a refresh
- Switch days with the day tabs at the top
- Arrow buttons navigate between weeks
- Past days' data is always available — click the day tab to view it
```

---

## PART 4: DAILY OPERATIONS

### For Operators

**Starting your shift:**
1. Open the app link
2. Sign in with your name, role, and shift (Day/Night)
3. Check the Dashboard for any alerts or missing logs
4. Check the Turnover tab for any pending handoffs from the previous shift
5. If there's an unacknowledged turnover, click **Acknowledge**

**During your shift:**
1. Click the section tab for the readings you need to take
2. The current time slot is highlighted in **yellow** with "NOW" placeholders
3. Enter your readings and click **Save**
4. Data syncs to Google Sheets immediately
5. Other operators' entries appear within 15 seconds

**End of shift:**
1. Go to the **Turnover** tab
2. Fill in any **Issues & Exceptions** (only sites that need attention)
3. Add **Key Events** (curtailments, outages, comms issues)
4. Add **Pending Actions** for the next shift
5. Click **Submit Turnover**
6. The auto-snapshot captures the current state of all data

**At midnight:**
- A popup alarm appears between 23:55 and 00:05
- Click **Open Report** to view/print/download the daily report
- Or click **Export CSV** to save data for Excel
- Click **Dismiss** if you don't need to save right now

### For Shift Leads

**Checking completion:**
- Dashboard shows overall completion % and per-section breakdown
- Missing count flashes when readings are overdue
- SOC Trend Charts show visual trends per site

**Reviewing turnovers:**
- Go to the Turnover tab to see all handoffs for the day
- Unacknowledged turnovers show a flashing yellow dot
- Each turnover includes an auto-snapshot of the system state at that time

---

## PART 5: UPDATING THE APP

### After Code Changes

**If using GitHub Pages:**
```bash
cd "/media/rmeza/Extreme SSD/AES/AES LOGS"
git add index.html
git commit -m "Description of changes"
git push
```
Wait 1-2 minutes, then tell everyone to Ctrl+F5.

**If using SharePoint:**
1. Replace `index.html` on SharePoint with the new version
2. Tell everyone to Ctrl+F5

**If using Google Apps Script hosting:**
1. Open the Apps Script project
2. Replace the contents of the `Index.html` file
3. Deploy > **New deployment** (not "Manage deployments")
4. The URL changes — share the new URL

### After Google Apps Script Changes

Every time you edit `GoogleAppsScript.js`:
1. Open the Apps Script project at https://script.google.com
2. Replace the code in `Code.gs`
3. Click **Deploy > New deployment** (MUST be "New", not "Manage")
4. Web app > Execute as Me > Anyone > Deploy
5. **Copy the new URL**
6. Update line ~36 in `index.html` with the new URL:
   ```
   const SCRIPT_URL="https://script.google.com/macros/s/NEW_URL_HERE/exec";
   ```
7. Re-deploy `index.html` (push to GitHub, re-upload to SharePoint, etc.)

### Adding or Removing Sites

Edit the site arrays near the top of `index.html`:
- `BESS_SITES` — BESS availability and control sites
- `CAPV_BEACONS` — CA PV Beacon sites
- `CAPV_BIGSKY` — CA PV Big Sky sites
- `VVAR_SITES` — V/VAR check sites (Bellefield, Rexford)
- `RANDO_AZ`, `RANDO_MCF`, `RANDO_RR`, `RANDO_KAUAI` — Other sites
- `SUB_SITES` — Substation sites

Each site is an object like `{id:"lab",n:"LAB",max:108,out:92}`.

---

## PART 6: TROUBLESHOOTING

| Problem | Fix |
|---------|-----|
| **Blank page on SharePoint** | SharePoint blocks JavaScript. Use GitHub Pages instead: https://romen2315.github.io/rocc-ops-log/ |
| **"Sync Error" in header** | Check that SCRIPT_URL in index.html is correct and the Apps Script is deployed. Click the indicator to retry |
| **"Local Only" in header** | SCRIPT_URL is not set. Follow Part 1 to set up the backend |
| **Data not showing for others** | Wait 15 seconds or click the sync indicator. All operators must use the same SCRIPT_URL |
| **Theme resets on tab switch** | Update to v4.0 — this bug was fixed |
| **Print not working** | Allow popups for the site in your browser settings |
| **Midnight alarm not showing** | It only triggers between 23:55-00:05 and once per day. Must be signed in |
| **Need to look at past data** | Click the day tabs (Mon-Sun). Use arrow buttons for previous weeks |
| **Lost data** | Data is always in the Google Sheet. Open the spreadsheet directly to see raw JSON data in the ROCCData tab |
| **Need to update the Apps Script** | Edit code, then Deploy > **New deployment**. Get the new URL. Update index.html |
| **Multiple people overwriting each other** | v4.0 uses server-side merge — this should not happen. If it does, click sync indicator to refresh |

---

## PART 7: BACKEND REFERENCE

### Current Configuration

| Setting | Value |
|---------|-------|
| Google Apps Script URL | `https://script.google.com/macros/s/AKfycbxL1coFx0N_OxO1PIM_gr8BWpsl-Sz7wq6ADI2Efu4H5KHXeeh4GqOKVoNsjRW2P-xgCw/exec` |
| GitHub Pages URL | https://romen2315.github.io/rocc-ops-log/ |
| GitHub Repo | https://github.com/RoMen2315/rocc-ops-log |
| Deployment access | Anyone (no Google account required) |
| Sync interval | 15 seconds (all tabs) |
| Data storage | Google Sheets > ROCCData tab |
| Data format | JSON key-value pairs, one row per day |
| Merge strategy | Server-side deep merge at section > site > slot > field level |

### Data Structure

Each day is stored as one key in Google Sheets:
- **Key:** `2026-03-30` (date string)
- **Value:** JSON containing all sections:
  ```
  {
    "bess_avail": { "lab": { "0800": { "nc": "105", "soc": "85", "_user": "RM", "_ts": 1234567890 } } },
    "bess_ctrl": { ... },
    "shifts": [ { "name": "RM", "role": "CRO 2", "shift": "Night", "loginTime": ... } ],
    "notes": [ { "text": "...", "user": "RM", "role": "CRO 2", "ts": ... } ],
    "turnovers": [ { "outgoing": {...}, "issues": [...], "events": "...", "pending": "...", "snapshot": {...}, "ack": null } ]
  }
  ```

### Security Notes

- The Google Sheet is the single source of truth
- Apps Script runs under the deployer's Google account
- "Anyone" can read/write via the API URL
- The HTML file contains no secrets
- To restrict: change Apps Script deployment to "Anyone in [your org]"
- **Do NOT edit the Google Sheet directly** — always use the app

---

## CONTACTS

| Role | Contact |
|------|---------|
| App developer | Rosendo Meza (Rocky Dev Co.) |
| Google Sheet owner | [Google account that deployed Apps Script] |
| SharePoint admin | [Your SharePoint admin] |
| GitHub repo owner | RoMen2315 |

---

*ROCC Operations Log v4.0 — AES Clean Energy*
*Single-file deployment | Google Sheets backend | Real-time multi-operator sync*
*Developed by Rocky Dev Co. | 2026*
