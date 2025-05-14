const fs = require('fs');
const { createCanvas } = require('canvas');

// Define avatar configs
const avatars = [
  { name: 'Mark', color: '#3b82f6' },
  { name: 'BeeMan', color: '#8b5cf6' },
  { name: 'Tony', color: '#0ea5e9' },
  { name: 'Kai', color: '#ec4899' },
  { name: 'Chris', color: '#f97316' },
  { name: 'Parzicano', color: '#3b82f6' },
  { name: 'Shadyy', color: '#8b5cf6' },
  { name: 'iCoder', color: '#0ea5e9' },
  { name: 'Dimitri', color: '#ec4899' }
];

// Generate avatars with initials
function generateInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('');
}

// Function to generate an avatar image
function generateAvatar(name, color) {
  const canvas = createCanvas(300, 300);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add gradient overlay
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw initials
  const initials = generateInitials(name);
  ctx.font = 'bold 120px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText(initials, canvas.width / 2, canvas.height / 2);
  
  return canvas.toBuffer();
}

// Generate and save avatars
avatars.forEach(({ name, color }) => {
  const buffer = generateAvatar(name, color);
  fs.writeFileSync(`${__dirname}/${name.toLowerCase()}.png`, buffer);
  console.log(`Avatar generated for ${name}`);
});

console.log('All avatars generated successfully');