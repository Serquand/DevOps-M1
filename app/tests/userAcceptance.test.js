const dotenv = require("dotenv");
dotenv.config();
const puppeteer = require('puppeteer')

let browser;

async function canReachWebsite() {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    try {
        await page.goto(`http://${process.env.VPS_IP}:3000`, { waitUntil: 'networkidle2' });
        return { status: true, content: page }
    } catch {
        await browser.close();
        return { status: false, content: null }
    }
}

describe('User Acceptance Test', () => {
    let reachableWebsite;
    let isWebsiteAccessible;

    beforeAll(async () => reachableWebsite = await canReachWebsite());
    afterAll(async () => await browser.close());

    it('should access website', () => {
        isWebsiteAccessible = reachableWebsite.status;
        expect(isWebsiteAccessible).toBe(true);
    });

    it('should see title', async () => {
        expect(isWebsiteAccessible).toBe(true);

        const page = reachableWebsite.content;
        await page.waitForSelector('h1');
        const h1Text = await page.evaluate(() => {
            const h1Element = document.querySelector('h1');
            return h1Element ? h1Element.textContent : null;
        });

        expect(h1Text).toBe("DevOps M1 | Project");
    })
});