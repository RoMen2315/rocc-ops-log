# ROCC Operations Log v4.0 - Operator Guide
# AES Clean Energy | Rocky Dev Co.

---

## GETTING STARTED

### Open the App
**Primary URL:** https://romen2315.github.io/rocc-ops-log/

Open this link in Chrome, Edge, or Firefox on your laptop.

### Sign In
1. Enter your name or initials
2. Select your role (Operator, CRO 1, CRO 2, Shift Lead, Engineer, Manager)
3. Select your shift (Day 0600-1800 / Night 1800-0600)
4. Click **Sign In**

---

## APP LAYOUT

### Header Bar
- **ROCC Ops Log** — app name
- **Green dot "Synced"** — click to force refresh from Google Sheets
- **← This Wk →** — navigate between weeks
- **Report** — view/print/download daily report
- **Export CSV** — download data for Excel
- **Sun/Moon icon** — toggle dark/light mode
- **Switch Op** — sign in as a different operator
- **Your name/shift** — shown at the right

### Tabs
- **Dashboard** — overview of all sites, alerts, charts, activity
- **Turnover** — shift handoff with issues, events, pending actions
- **BESS Avail** — node counts and SOC for all BESS sites
- **BESS Ctrl** — V/VAR, ADS, comms status
- **CA Beacon** — PF and curtailment for Beacon sites
- **CA Big Sky** — VARs for Big Sky sites
- **V/VAR Chk** — Bellefield and Rexford voltage checks
- **Site BESS** — Bellefield and Rexford BESS readings
- **AZ Sites** — Arizona VARs
- **MCF PV** — McFarland MVAR and ADS
- **RR/Kauai** — Road Runner and Kauai miscellaneous
- **Substations** — breaker checks for all substations

### Day Tabs
- Click **Mon through Sun** to view/edit data for that day
- A green dot marks today
- Past days' data is always available and editable
- Arrow buttons switch between weeks

---

## ENTERING DATA

1. Click the **section tab** for the readings you need
2. The **current time slot is highlighted in yellow** with a pulsing glow and "NOW" placeholders
3. Enter your readings in the input fields
4. Press **Tab** or **Enter** to move to the next field
5. Click **Save** when done
6. Your name and timestamp are recorded with every entry

### Tips
- **Hover** any cell with data to see who logged it and when
- Fields turn **red** when a BESS site hits outage threshold
- The "Logged by" line at the top of each section shows who has entered data
- You can edit past time slots — just enter the value and save

---

## DASHBOARD

The Dashboard shows a full overview of the current day:

### Sections on Dashboard
1. **Outage Alerts** — BESS sites at or below outage threshold (red)
2. **Shift Handoff** — who's signed in, what shift
3. **Overall Completion** — percentage of expected readings entered
4. **SOC Heatmap** — color-coded SOC values per site per time slot
5. **SOC Trend Charts** — sparkline graphs showing SOC over time per site
6. **Missing Readings** — flashes when readings are overdue (BESS Avail + Substations)
7. **Node Count Trend** — node counts over time per BESS site
8. **Substation Checks** — completion per substation
9. **BESS Control Status** — latest V/VAR, ADS, Pmax, Emax per site
10. **CA PV Status** — Beacon PF/Curt and Big Sky VARs
11. **V/VAR + Site BESS** — Bellefield and Rexford latest readings
12. **AZ / MCF PV / Road Runner / Kauai** — latest misc readings
13. **Outage Event Log** — all outage events for the day
14. **Shift Notes** — free-text notes for handoff info
15. **Activity Log** — full audit trail of who entered what

### Reading the SOC Trend Charts
- Each BESS site has its own mini chart
- **Green** = SOC above 80%
- **Yellow** = SOC 50-80%
- **Orange** = SOC 20-50%
- **Red** = SOC below 20%
- Hover dots to see exact time and value
- Background bands show the threshold zones

---

## SHIFT TURNOVER

Go to the **Turnover** tab to submit or review shift handoffs.

### Submitting a Turnover (outgoing shift)
1. **Issues & Exceptions** — add rows for any sites needing attention
   - Site name, issue description, status (Active/Monitoring/Resolved/Escalated)
   - Click **+ Add Issue** for more rows
   - Only add sites with problems — don't list all 200+ sites
2. **Key Events This Shift** — curtailments, outages, comms losses, anything notable
3. **Pending Actions** — what the next shift needs to do or watch for
4. Click **Submit Turnover**

### Auto Snapshot
The right panel shows live system status:
- Overall completion %
- Missing logs count
- Sites in outage (with details)
- Sites with SOC below 20%

This snapshot is saved with the turnover so you can see what the system looked like at handoff time.

### Acknowledging a Turnover (incoming shift)
1. Open the Turnover tab
2. Find the turnover with a flashing yellow "Awaiting acknowledgment" dot
3. Click **Acknowledge**
4. It turns green showing your name and time

### Turnover History
All turnovers for the selected day are listed with full details, newest first.

---

## MIDNIGHT REPORT ALARM

Between **23:55 and 00:05**, a popup alarm appears:

- **Open Report** — opens the daily report viewer where you can print or download
- **Export CSV** — immediately downloads the CSV file
- **Dismiss** — closes the popup

The alarm only fires once per day. You must be signed in for it to trigger.

---

## DARK / LIGHT MODE

- Click the **sun icon** (☀) in the header to switch to light mode
- Click the **moon icon** (🌙) to switch back to dark mode
- Your preference is saved per browser
- Also available on the login screen

---

## REPORTS

### Viewing a Report
1. Click **Report** in the header
2. The daily report shows all sections with printed-format tables
3. Includes operator info, all readings, shift notes, and audit trail
4. Signature lines at the bottom

### Downloading
- **Download File** — saves as an HTML file you can open anytime
- **Print / PDF** — opens the browser print dialog (choose "Save as PDF" for a PDF file)

### CSV Export
- Click **Export CSV** in the header
- Downloads a `.csv` file with all the day's data
- Open in Excel, Google Sheets, or any spreadsheet app
- Columns: Section, Site, Time Slot, Field, Value, Logged By, Logged At

---

## SYNCING & MULTI-USER

### How Sync Works
- When you click **Save**, your data is sent to Google Sheets
- The server **merges** your data with existing data — it never overwrites
- After saving, the app pulls the latest data from Google Sheets
- Auto-refresh runs every 15 seconds on all tabs
- Click the **sync indicator** (green dot) to force an immediate refresh

### If Sync Shows an Error
1. Click the sync indicator to retry
2. Check your internet connection
3. If it persists, the Google Apps Script may need redeployment

### Offline
- The app caches data locally in your browser
- If you lose internet, you can still enter data
- It will sync when the connection comes back
- The header shows **"Local Only"** when offline

---

## TROUBLESHOOTING

| Problem | Fix |
|---------|-----|
| Blank page | Use GitHub Pages: https://romen2315.github.io/rocc-ops-log/ |
| "Sync Error" | Click sync indicator. Check internet. Verify SCRIPT_URL |
| Data not showing from others | Wait 15 seconds or click sync indicator |
| Theme resets on tab switch | Update to v4.0 (this bug was fixed) |
| Can't print report | Allow popups in your browser settings |
| Midnight alarm didn't show | Must be signed in. Only fires 23:55-00:05, once per day |
| Need past data | Click the day tab. Use arrow buttons for previous weeks |
| Lost data | Data is in Google Sheets. Re-open the app and it comes back |

---

## URLS

| What | URL |
|------|-----|
| **App** | https://romen2315.github.io/rocc-ops-log/ |
| **GitHub Repo** | https://github.com/RoMen2315/rocc-ops-log |
| **Google Apps Script** | https://script.google.com/macros/s/AKfycbxL1coFx0N_OxO1PIM_gr8BWpsl-Sz7wq6ADI2Efu4H5KHXeeh4GqOKVoNsjRW2P-xgCw/exec |

---

*ROCC Operations Log v4.0 — AES Clean Energy*
*Developed by Rocky Dev Co. | Rosendo Meza | 2026*
