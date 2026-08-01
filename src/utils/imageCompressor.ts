/**
 * Utility to compress images uploaded by users before storing in state,
 * Firestore, or LocalStorage. Converts high-res image files to compact
 * resized Data URLs (e.g., JPEG/WebP @ 0.75 quality, max 1000px).
 */

export async function compressImageFile(
  file: File,
  maxWidth = 600,
  maxHeight = 600,
  quality = 0.65
): Promise<string> {
  // If it's not an image (e.g. video), read directly
  if (!file.type.startsWith('image/')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  const isPngOrTransparent =
    file.type.includes('png') ||
    file.type.includes('svg') ||
    file.type.includes('webp') ||
    file.name.toLowerCase().endsWith('.png') ||
    file.name.toLowerCase().endsWith('.svg') ||
    file.name.toLowerCase().endsWith('.webp');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Calculate aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve((e.target?.result as string) || '');
          return;
        }

        if (isPngOrTransparent) {
          // Clear rect for transparent background
          ctx.clearRect(0, 0, width, height);
        } else {
          // Fill white background for JPEG so transparent corners never turn black
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to png if PNG/transparent to retain 100% transparency, else jpeg
        const mimeType = isPngOrTransparent ? 'image/png' : 'image/jpeg';
        const compressedDataUrl = canvas.toDataURL(mimeType, isPngOrTransparent ? undefined : quality);
        resolve(compressedDataUrl);
      };

      img.onerror = () => {
        // Fallback to uncompressed if image loading fails
        resolve((e.target?.result as string) || '');
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
