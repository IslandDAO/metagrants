import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const members = [
  { name: 'mark', handle: 'socalstreet' },
  { name: 'kai', handle: 'DefiVaults' },
  { name: 'chris', handle: 'Whalesfriend' },
  { name: 'taki', handle: 'Milimalism' },
  { name: 'parzicano', handle: 'Parzicano' },
  { name: 'shadyy', handle: 'notemxem' },
  { name: 'icoder', handle: 'Ify_Ezeugwu' },
  { name: 'beeman', handle: 'beeman_nl' },
  { name: 'tony', handle: 'tonyboyletweets' }
];

(async () => {
  try {
    // Launch browser
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: "new" });

    // Create new page
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1280, height: 800 });

    // Loop through each member
    for (const member of members) {
      console.log(`Processing ${member.name} (@${member.handle})...`);
      
      // Navigate to Twitter profile
      await page.goto(`https://x.com/${member.handle}`, { waitUntil: 'networkidle2' });
      
      // Wait for avatar to load
      await page.waitForTimeout(2000); // Give it some time to load
      
      // Try to find the avatar image
      const avatarElement = await page.$('img[data-testid="tweetAvatar"],img[src*="profile_images"]');
      
      if (avatarElement) {
        // Get the image src
        const imgSrc = await page.evaluate(el => el.src, avatarElement);
        
        console.log(`Found avatar URL: ${imgSrc}`);
        
        // Create a screenshot of the avatar
        await avatarElement.screenshot({
          path: path.join(__dirname, '..', 'client', 'src', 'assets', 'team-avatars', `${member.name}.png`)
        });
        
        console.log(`Saved avatar for ${member.name}`);
      } else {
        console.error(`Could not find avatar for ${member.name}`);
      }
    }

    // Close browser
    await browser.close();
    console.log('Done!');

  } catch (error) {
    console.error('Error:', error);
  }
})();