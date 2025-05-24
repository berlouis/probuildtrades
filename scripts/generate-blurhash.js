/**
 * Generate BlurHash values for images
 *
 * This script can be used to pre-generate blurhash values for images
 * to improve loading performance on the website.
 *
 * Usage:
 * 1. Install sharp and blurhash: npm install sharp blurhash
 * 2. Run: node scripts/generate-blurhash.js <image-folder>
 */

const fs = require('fs');
const path = require('path');
const { encode } = require('blurhash');
const sharp = require('sharp');

// Configuration
const DEFAULT_IMAGE_DIR = '../public/images';
const OUTPUT_FILE = 'src/utils/image-blurhash.json';
const COMPONENTS_X = 4;
const COMPONENTS_Y = 3;

async function encodeImageToBlurhash(imagePath) {
  try {
    // Load image using sharp
    const { data: imageData, info: metadata } = await sharp(imagePath)
      .raw()
      .ensureAlpha()
      .resize(100, 100, { fit: 'inside' })
      .toBuffer({ resolveWithObject: true });

    // Encode blurhash
    const blurhash = encode(
      new Uint8ClampedArray(imageData),
      metadata.width,
      metadata.height,
      COMPONENTS_X,
      COMPONENTS_Y
    );

    return blurhash;
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error);
    return null;
  }
}

async function processImagesInDirectory(directory) {
  const result = {};

  try {
    // Get all files in directory
    const files = fs.readdirSync(directory);

    // Filter image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext);
    });

    console.log(`Found ${imageFiles.length} image files`);

    // Process each image
    for (const imageFile of imageFiles) {
      const imagePath = path.join(directory, imageFile);
      console.log(`Processing ${imagePath}...`);

      const blurhash = await encodeImageToBlurhash(imagePath);

      if (blurhash) {
        const relativePath = path.relative(process.cwd(), imagePath);
        result[relativePath] = blurhash;
        console.log(`Generated hash for ${imageFile}: ${blurhash}`);
      }
    }

    // Write results to JSON file
    const outputPath = path.join(process.cwd(), OUTPUT_FILE);
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log(`BlurHash values saved to ${outputPath}`);

  } catch (error) {
    console.error('Error processing directory:', error);
  }

  return result;
}

// Run the script
(async () => {
  const targetDir = process.argv[2] || DEFAULT_IMAGE_DIR;
  console.log(`Generating BlurHash values for images in ${targetDir}`);

  await processImagesInDirectory(targetDir);
})();
