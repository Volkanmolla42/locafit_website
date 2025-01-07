import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

interface OptimizeImageOptions {
  quality?: number;
  width?: number;
  height?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export async function optimizeImage(
  inputPath: string,
  outputPath: string,
  options: OptimizeImageOptions = {}
) {
  const {
    quality = 80,
    width,
    height,
    format = 'webp'
  } = options;

  try {
    let image = sharp(inputPath);

    // Resize if dimensions provided
    if (width || height) {
      image = image.resize(width, height, {
        fit: 'cover',
        withoutEnlargement: true
      });
    }

    // Convert to specified format and optimize
    switch (format) {
      case 'webp':
        image = image.webp({ quality });
        break;
      case 'jpeg':
        image = image.jpeg({ quality });
        break;
      case 'png':
        image = image.png({ quality });
        break;
    }

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    await fs.mkdir(outputDir, { recursive: true });

    // Save optimized image
    await image.toFile(outputPath);

    return true;
  } catch (error) {
    console.error('Image optimization failed:', error);
    return false;
  }
}

export async function generateImageSizes(
  inputPath: string,
  outputDir: string,
  sizes: number[] = [640, 750, 828, 1080, 1200]
) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  
  const results = await Promise.all(
    sizes.map(async (width) => {
      const outputPath = path.join(outputDir, `${filename}-${width}.webp`);
      
      await optimizeImage(inputPath, outputPath, {
        width,
        format: 'webp'
      });
      
      return `${filename}-${width}.webp`;
    })
  );
  
  return results;
}
