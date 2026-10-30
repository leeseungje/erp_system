import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const targetUrl = process.env.ERP_WEB_URL || 'http://localhost:3000';
const screenshotDir = path.resolve(process.cwd(), '../../storage/screenshots');

fs.mkdirSync(screenshotDir, { recursive: true });

async function runAutomation() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.locator('h1').waitFor({ timeout: 15000 });

        await page.locator('input[name="company"]').fill('테스트 회사');
        await page.locator('input[name="vendor"]').fill('홍길동');
        await page.locator('input[name="amount"]').fill('2500000');
        await page.locator('input[name="paymentDate"]').fill('2026-10-30');
        await page.locator('select[name="approver"]').selectOption('김팀장');
        await page.locator('textarea[name="description"]').fill('사무용품 구매 및 출장비');

        await page.getByRole('button', { name: 'AI 요약 생성' }).click();
        await page.locator('.summary-box').waitFor({ timeout: 15000 });

        await page.getByRole('button', { name: '임시 저장' }).click();
        await page.locator('.status-banner').waitFor({ timeout: 15000 });

        const title = await page.locator('h1').textContent();
        const bannerText = await page.locator('.status-banner').textContent();
        const fileName = `erp-automation-${Date.now()}.png`;
        const screenshotPath = path.join(screenshotDir, fileName);

        await page.screenshot({ path: screenshotPath, fullPage: true });

        console.log(JSON.stringify({
            status: 'success',
            url: targetUrl,
            title,
            summaryGenerated: true,
            bannerText,
            screenshot: screenshotPath,
            workflow: 'AI summary -> validation -> draft save -> final submission by approver',
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
