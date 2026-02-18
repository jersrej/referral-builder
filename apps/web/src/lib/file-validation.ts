export const mbToBytes = (mb: number): number => mb * 1024 * 1024;

export const MAX_FILE_SIZE = mbToBytes(2); // 2MB in bytes

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * validation for file size
 * @param file
 * @param maxSize
 * @returns
 */
export const validateFileSize = (
  file: File,
  maxSize: number = MAX_FILE_SIZE
): FileValidationResult => {
  if (file.size > maxSize) {
    const maxSizeInMB = Math.round(maxSize / (1024 * 1024));
    return {
      isValid: false,
      error: `File size exceeds ${maxSizeInMB}MB. Please choose a smaller file.`
    };
  }

  return { isValid: true };
};

/**
 * validation for file types
 * @param file
 * @returns
 */
export const validateFileType = (file: File): FileValidationResult => {
  if (!file.type.startsWith('image/')) {
    return {
      isValid: false,
      error: 'Only image files are allowed (PNG, JPG, GIF).'
    };
  }

  return { isValid: true };
};

/**
 * validation for file type and size
 * @param file
 * @param maxSize
 * @returns
 */
export const validateFile = (file: File, maxSize: number = MAX_FILE_SIZE): FileValidationResult => {
  const typeValidation = validateFileType(file);
  if (!typeValidation.isValid) {
    return typeValidation;
  }

  const sizeValidation = validateFileSize(file, maxSize);
  if (!sizeValidation.isValid) {
    return sizeValidation;
  }

  return { isValid: true };
};
