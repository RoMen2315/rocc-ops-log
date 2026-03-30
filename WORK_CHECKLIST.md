# ROCC Operations Log v4.0 - Quick Work Deployment Checklist
# Rocky Dev Co. | Rosendo Meza

---

## THE EASY WAY (GitHub Pages — already live):

**URL: https://romen2315.github.io/rocc-ops-log/**

1. Open the URL above on your work computer
2. If it loads — you're done. Share this URL with your team.
3. Everyone signs in with their own name and starts logging.

No SharePoint needed. No uploading files. Just open the link.

---

## IF GITHUB IS BLOCKED AT WORK, TRY SHAREPOINT:

### Step 1: Get the file
- Open OneDrive on your work computer
- Go to Documents > AES LOGS
- The file `index.html` should already be synced
- If not synced: copy from USB, email, or Google Drive

### Step 2: Upload to SharePoint
- Go to your SharePoint site > Documents
- Create folder: "ROCC Operations Log"
- Upload `index.html`

### Step 3: Open and verify
- Click `index.html` in SharePoint
- If you see the login screen — it works
- If you see a blank page — SharePoint is blocking scripts, use GitHub Pages instead

### Step 4: Share with team
- Copy the URL and send to your team
- Everyone opens the same link
- Everyone signs in with their own name

---

## IF BOTH ARE BLOCKED, USE GOOGLE APPS SCRIPT HOSTING:

1. Go to https://script.google.com
2. Open the ROCC Backend project
3. Add a new HTML file named `Index`
4. Paste the contents of `index.html` into it
5. Deploy > New deployment > Web app > Anyone
6. The deployment URL IS the app — share that URL

---

## WHAT TO TELL YOUR TEAM:

```
ROCC Operations Log is now live.

LINK: https://romen2315.github.io/rocc-ops-log/

How to use:
- Open the link in Chrome, Edge, or Firefox
- Enter your name/initials, pick your role and shift, click Sign In
- Use the tabs to switch between sections
- Enter readings and click Save
- Dashboard shows all sites at a glance
- Data syncs between all operators every 15 seconds

New features in v4.0:
- Shift Turnover tab for structured handoffs
- SOC Trend Charts on dashboard
- Current time slot highlighted in yellow
- Dark/Light mode (sun icon in header)
- Midnight alarm to save daily report
- Bellefield & Rexford in SOC heatmap and node trends

Tips:
- Tab or Enter moves to the next field
- Click the green "Synced" indicator to force a refresh
- Switch days with the day tabs at the top
- Arrow buttons navigate between weeks
```

---

## IF SOMETHING GOES WRONG:

| Problem | Fix |
|---------|-----|
| Blank page on SharePoint | Use GitHub Pages: https://romen2315.github.io/rocc-ops-log/ |
| "Sync Error" | Click the sync indicator to retry. Check internet connection |
| Data not syncing | Make sure everyone uses the same URL. Click sync to force refresh |
| Need to update | Push changes to GitHub. Tell everyone to **Ctrl+F5** |
| Got kicked to login after refresh | Hit **Ctrl+F5** once to load the latest version. After that, normal refresh will keep you logged in |
| Not seeing other operators' data | **Ctrl+F5** to get the latest sync fix. Data should appear within 15 seconds |

---

## CURRENT URLS:

| What | URL |
|------|-----|
| **App (GitHub Pages)** | https://romen2315.github.io/rocc-ops-log/ |
| **GitHub Repo** | https://github.com/RoMen2315/rocc-ops-log |
| **Google Apps Script** | https://script.google.com/macros/s/AKfycbxL1coFx0N_OxO1PIM_gr8BWpsl-Sz7wq6ADI2Efu4H5KHXeeh4GqOKVoNsjRW2P-xgCw/exec |

---

## IMPORTANT NOTES:

- The Google Sheet is the database. All data lives there, not in the HTML file.
- If the HTML file gets deleted, no data is lost. Just re-open the URL.
- Multiple people can enter data at the same time from different computers.
- The app merges everyone's changes server-side — no data gets overwritten.
- Each day has its own data. Switch days with the tabs.
- Do NOT edit the Google Sheet directly. Always use the app.

---

Rocky Dev Co. | Rosendo Meza | 2026
