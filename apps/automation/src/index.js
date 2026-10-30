import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const targetUrl = process.env.ERP_WEB_URL || 'http://127.0.0.1:3000';
const screenshotDir = path.resolve(process.cwd(), '../../storage/screenshots');

fs.mkdirSync(screenshotDir, { recursive: true });

async function runAutomation() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.locator('h1').waitFor({ timeout: 15000 });

        const title = await page.locator('h1').textContent();
        const fileName = `erp-automation-${Date.now()}.png`;
        const screenshotPath = path.join(screenshotDir, fileName);

        await page.screenshot({ path: screenshotPath, fullPage: true });

        console.log(JSON.stringify({
            status: 'success',
            url: targetUrl,
            title,
            screenshot: screenshotPath,
            timestamp: new Date().toISOString(),
        }, null, 2));
    } catch (error) {
        console.log(JSON.stringify({
            status: 'failed',
            url: targetUrl,
            error: error.message,
            timestamp: new Date().toISOString(),
        }, null, 2));
        process.exitCode = 1;
    } finally {
        await browser.close();
    }
}

runAutomation();
