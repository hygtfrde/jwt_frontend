import puppeteer from 'puppeteer';

async function run() {
    const browser = await puppeteer.launch({
        executablePath: '/path/to/chrome',
        // Other configuration options
    });
    const page = await browser.newPage();
  
    // Navigate to the React app homepage
    await page.goto('https://localhost:3000');
  
    // Rest of your code for taking snapshots or performing other actions
    await page.screenshot({ path: 'screenshot.png' });

    // Close the browser when done
    await browser.close();
  }
  
  run();