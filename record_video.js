const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

(async () => {
  console.log("Starting browser...");
  const browser = await puppeteer.launch({ 
    headless: "new", 
    defaultViewport: { width: 1920, height: 1080 } 
  });
  const page = await browser.newPage();
  
  // Configure recorder
  const Config = {
    followNewTab: false,
    fps: 30,
    ffmpeg_Path: null,
    videoFrame: {
      width: 1920,
      height: 1080,
    },
    aspectRatio: '16:9',
  };
  
  const recorder = new PuppeteerScreenRecorder(page, Config);
  const savePath = 'C:\\Users\\Admin\\Desktop\\LinkedIn_Post_Video\\Portfolio_Walkthrough.mp4';
  
  console.log("Starting recording...");
  await recorder.start(savePath);
  
  console.log("Navigating to portfolio...");
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 60000 });
  
  // Wait at the top
  console.log("Waiting at the top...");
  await new Promise(r => setTimeout(r, 4000));
  
  // Smooth scroll
  console.log("Scrolling down smoothly...");
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      let distance = 30; // Scroll 30px at a time
      let timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 30); 
    });
  });
  
  console.log("Waiting at the bottom...");
  await new Promise(r => setTimeout(r, 3000));
  
  console.log("Stopping recording...");
  await recorder.stop();
  await browser.close();
  
  console.log('Video recording completed successfully at:', savePath);
})().catch(err => console.error("Error during recording:", err));
