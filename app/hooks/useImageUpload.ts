import { useState } from 'react';
import { upload } from '@imagekit/react';
import { validateImageFile, IMAGEKIT_CONFIG } from '../lib/imagekit';
import { toast } from 'sonner';

export interface UploadedImage {
  url: string;
  fileId?: string;
  name: string;
  file?: File;
  isUploading?: boolean;
  progress?: number;
  error?: string;
}

interface UseImageUploadOptions {
  maxImages?: number;
  onUploadComplete?: (images: UploadedImage[]) => void;
}

interface AuthParams {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
}

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const { maxImages = IMAGEKIT_CONFIG.maxImages, onUploadComplete } = options;
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch authentication parameters from server
  const getAuthParams = async (): Promise<AuthParams> => {
    try {
      const response = await fetch(IMAGEKIT_CONFIG.authenticationEndpoint);
      if (!response.ok) {
        throw new Error('Failed to get authentication parameters');
      }
      return await response.json();
    } catch (error) {
      console.error('Auth error:', error);
      throw error;
    }
  };

  const uploadImage = async (file: File, onProgress?: (percent: number) => void): Promise<UploadedImage | null> => {
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid file');
      return null;
    }

    try {
      // Get authentication parameters
      const authParams = await getAuthParams();

      // Upload using ImageKit SDK
      const result = await upload({
        file,
        fileName: file.name,
        folder: '/products',
        useUniqueFileName: true,
        tags: ['product-image'],
        publicKey: authParams.publicKey,
        signature: authParams.signature,
        token: authParams.token,
        expire: authParams.expire,
        onProgress: (event) => {
          const percent = (event.loaded / event.total) * 100;
          if (onProgress) {
            onProgress(percent);
          }
        },
      });

      return {
        url: result.url || '',
        fileId: result.fileId || '',
        name: result.name || file.name,
      };
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload image');
      return null;
    }
  };

  const handleFilesUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);

    // Check if adding these files would exceed the limit
    if (images.length + fileArray.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setIsUploading(true);

    // Create temporary image objects with loading state
    const tempImages: UploadedImage[] = fileArray.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      file,
      isUploading: true,
      progress: 0,
    }));

    setImages((prev) => [...prev, ...tempImages]);

    // Upload all files
    const uploadPromises = fileArray.map(async (file, index) => {
      const uploadedImage = await uploadImage(file, (percent) => {
        // Update progress for this specific image
        setImages((prev) =>
          prev.map((img, i) => {
            const tempIndex = prev.length - fileArray.length + index;
            if (i === tempIndex && img.isUploading) {
              return { ...img, progress: percent };
            }
            return img;
          })
        );
      });

      // Update the specific image in the array
      setImages((prev) =>
        prev.map((img, i) => {
          const tempIndex = prev.length - fileArray.length + index;
          if (i === tempIndex) {
            if (uploadedImage) {
              // Revoke the temporary URL
              URL.revokeObjectURL(img.url);
              return {
                ...uploadedImage,
                isUploading: false,
              };
            } else {
              return {
                ...img,
                isUploading: false,
                error: 'Upload failed',
              };
            }
          }
          return img;
        })
      );

      return uploadedImage;
    });

    await Promise.all(uploadPromises);

    // Remove failed uploads
    setImages((prev) => prev.filter((img) => !img.error));

    setIsUploading(false);

    // Trigger callback with successful uploads
    const successfulImages = images.filter((img) => !img.error && !img.isUploading);
    if (onUploadComplete) {
      onUploadComplete(successfulImages);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      const removed = newImages.splice(index, 1)[0];

      // Revoke temporary URL if it exists
      if (removed.file) {
        URL.revokeObjectURL(removed.url);
      }

      return newImages;
    });
  };

  const deleteImageFromImageKit = async (fileId: string) => {
    try {
      const response = await fetch(`/api/upload-image?fileId=${fileId}&_method=DELETE`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Delete failed');
      }

      toast.success('Image deleted successfully');
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Failed to delete image');
    }
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      const [removed] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, removed);
      return newImages;
    });
  };

  const setExistingImages = (existingUrls: string[]) => {
    const existingImages: UploadedImage[] = existingUrls.map((url) => ({
      url,
      name: url.split('/').pop() || 'image',
    }));
    setImages(existingImages);
  };

  const getImageUrls = (): string[] => {
    return images.filter((img) => !img.error && !img.isUploading).map((img) => img.url);
  };

  return {
    images,
    isUploading,
    handleFilesUpload,
    removeImage,
    deleteImageFromImageKit,
    reorderImages,
    setExistingImages,
    getImageUrls,
  };
}
