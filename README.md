
# SafeScan Ireland 🇮🇪
### Automated Food Recall & Safety Alert Monitor

**About the Project**
SafeScan is a lightweight utility designed to monitor the Food Safety Authority of Ireland (FSAI) for new product recalls. Instead of manually checking for updates, this script automatically scrapes the official FSAI "News & Alerts" page and triggers a system desktop notification the moment a new alert is published.

**Current Features (Working)**
- [x] **Web Scraping**: Directly pulls data from the FSAI website using Axios and Cheerio (bypassing unreliable RSS feeds).
- [x] **Smart Filtering**: Uses CSS selectors to identify alert titles and headlines.
- [x] **Anti-Spam Logic**: Implements a `Set`-based history to ensure you only get notified once per unique alert.
- [x] **Desktop Notifications**: Cross-platform alerts (Windows, macOS, Linux) via `node-notifier`.
- [x] **Bot-Detection Bypass**: Uses custom User-Agent headers to mimic a real browser.

**Tech Stack**
- **Node.js**: The runtime environment.
- **Axios**: Handles HTTP requests to fetch the website content.
- **Cheerio**: Provides a jQuery-like syntax to parse and extract data from the HTML.
- **Node-notifier**: Triggers system-level pop-up alerts.

**Quick Start**
1. **Clone the repository** and navigate to the project folder.
2. **Install dependencies**:
   ```bash
   npm install axios cheerio node-notifier
   
