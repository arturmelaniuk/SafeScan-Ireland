const axios = require('axios');
const cheerio = require('cheerio');
const notifier = require('node-notifier');

let alertHistory = new Set();

async function scrapeFSAI() {
    try {
        console.log(`[${new Date().toLocaleTimeString()}] Pobieranie strony FSAI...`);

        const response = await axios.get('https://www.fsai.ie/news-alerts', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            timeout: 15000
        });

        const $ = cheerio.load(response.data);
        let alerts = [];

        // Próbujemy różnych selektorów, które FSAI mogło zastosować
        const selectors = [
            '.news-item h3', 
            '.news-list h3', 
            'h3', 
            'h2', 
            '.card__title', 
            '.news-article__title'
        ];

        selectors.forEach(selector => {
            $(selector).each((i, el) => {
                const text = $(el).text().trim();
                // Ignorujemy bardzo krótkie teksty i menu (typu "Home", "Contact")
                if (text.length > 15 && !alerts.includes(text)) {
                    alerts.push(text);
                }
            });
        });

        if (alerts.length > 0) {
            console.log(`Znaleziono ${alerts.length} potencjalnych wpisów.`);
            
            // Bierzemy tylko 3 najświeższe, żeby nie spamować przy starcie
            alerts.slice(0, 3).forEach(title => {
                if (!alertHistory.has(title)) {
                    console.log(`🚨 NOWY ALERT: ${title}`);

                    notifier.notify({
                        title: 'FSAI Food Safety',
                        message: title.substring(0, 70) + '...',
                        sound: true,
                        wait: true
                    });

                    alertHistory.add(title);
                }
            });
        } else {
            console.log("❌ Nadal nie znaleziono alertów. Sprawdzam strukturę strony...");
            // Wyświetlmy nazwy klas dostępnych na stronie, by zdiagnozować problem
            const classes = new Set();
            $('*[class]').each((i, el) => {
                const cls = $(el).attr('class').split(' ')[0];
                classes.add(cls);
            });
            console.log("Dostępne klasy na stronie (pierwsze 10):", Array.from(classes).slice(0, 10));
        }

    } catch (error) {
        console.error("❌ Błąd połączenia:", error.message);
    }
}

// Start
scrapeFSAI();
setInterval(scrapeFSAI, 600000);
