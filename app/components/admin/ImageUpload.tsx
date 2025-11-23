import { useRef, useState, useEffect } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, GripVertical } from 'lucide-react';
import { useImageUpload, type UploadedImage } from '../../hooks/useImageUpload';
import { Button } from '../ui/button';
import { cn } from '../../lib/cn';

interface ImageUploadProps {
  maxImages?: number;
  existingImages?: string[];
  onChange: (urls: string[]) => void;
  disabled?: boolean;
}

export function ImageUpload({
  maxImages = 5,
  existingImages = [],
  onChange,
  disabled = false,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const {
    images,
    isUploading,
    handleFilesUpload,
    removeImage: removeImageFromHook,
    reorderImages: reorderImagesInHook,
    setExistingImages,
    getImageUrls,
  } = useImageUpload({
    maxImages,
  });

  // Initialize with existing images when they change
  useEffect(() => {
    // Get current image URLs
    const currentUrls = getImageUrls();

    // Check if existingImages is different from current state
    const hasChanged =
      existingImages.length !== currentUrls.length ||
      existingImages.some((url, idx) => url !== currentUrls[idx]);

    // Update only if there's a real change
    if (hasChanged) {
      setExistingImages(existingImages);
    }
  }, [existingImages]);

  // Notify parent when images change
  useEffect(() => {
    const currentUrls = getImageUrls();
    onChange(currentUrls);
  }, [images]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFilesUpload(files);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFilesUpload(files);
    }
  };

  const handleRemove = (index: number) => {
    removeImageFromHook(index);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDragOverImage = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      reorderImagesInHook(draggedIndex, index);
      setDraggedIndex(index);
    }
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {canAddMore && !disabled && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-accent/50',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
          />

          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-primary/10 p-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>

            <div>
              <p className="text-sm font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, WebP or GIF (max 5MB)
              </p>
              <p className="text-xs text-muted-foreground">
                {images.length} of {maxImages} images uploaded
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              draggable={!image.isUploading && !disabled}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOverImage(e, index)}
              className={cn(
                'relative group aspect-square rounded-lg overflow-hidden border-2 transition-all',
                image.isUploading
                  ? 'border-primary animate-pulse'
                  : 'border-border hover:border-primary',
                image.error && 'border-destructive',
                draggedIndex === index && 'opacity-50'
              )}
            >
              {/* Image */}
              {image.url && !image.error ? (
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}

              {/* Loading Overlay */}
              {image.isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
              )}

              {/* Error Overlay */}
              {image.error && (
                <div className="absolute inset-0 bg-destructive/90 flex items-center justify-center">
                  <p className="text-xs text-white px-2 text-center">
                    {image.error}
                  </p>
                </div>
              )}

              {/* Drag Handle */}
              {!image.isUploading && !disabled && (
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                  <div className="bg-black/50 rounded p-1">
                    <GripVertical className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}

              {/* Remove Button */}
              {!image.isUploading && !disabled && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}

              {/* Image Index */}
              <div className="absolute bottom-2 left-2 bg-black/50 rounded px-2 py-1">
                <span className="text-xs text-white font-medium">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Status */}
      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Uploading images...</span>
        </div>
      )}

      {/* Info Text */}
      {images.length === maxImages && (
        <p className="text-sm text-muted-foreground text-center">
          Maximum number of images reached
        </p>
      )}
    </div>
  );
}
