// ImageKit Configuration
export const IMAGEKIT_CONFIG = {
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY as string,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT as string,
  authenticationEndpoint: '/api/imagekit-auth',
  maxFileSize: 5 * 1024 * 1024, // 5MB
  acceptedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  maxImages: 5,
};

if (!IMAGEKIT_CONFIG.publicKey || !IMAGEKIT_CONFIG.urlEndpoint) {
  console.error(
    'ImageKit configuration missing. Please ensure VITE_IMAGEKIT_PUBLIC_KEY and VITE_IMAGEKIT_URL_ENDPOINT are set in .env'
  );
}

// Helper function to validate image file
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!IMAGEKIT_CONFIG.acceptedFormats.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file format. Accepted formats: JPEG, PNG, WebP, GIF`,
    };
  }

  if (file.size > IMAGEKIT_CONFIG.maxFileSize) {
    return {
      valid: false,
      error: `File size exceeds ${IMAGEKIT_CONFIG.maxFileSize / (1024 * 1024)}MB limit`,
    };
  }

  return { valid: true };
}
