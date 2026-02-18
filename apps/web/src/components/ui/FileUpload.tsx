import { useRef, useState } from 'react';
import { Upload, X, User } from 'lucide-react';
import clsx from 'clsx';
import { validateFile } from '@/lib/file-validation';

interface Props {
  value?: FileList | null;
  onChange: (files: FileList | null) => void;
  preview?: string | null;
  onRemove?: () => void;
  accept?: string;
  label?: string;
  onError?: (error: string) => void;
}

const FileUpload = ({
  onChange,
  preview,
  onRemove,
  accept = 'image/*',
  label = 'Avatar',
  onError
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const validateAndUpdateFile = (file: File) => {
    const validation = validateFile(file);
    // const validation = validateFile(file, mbToBytes(10)); // for example we can set max file size to 10MB

    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      onError?.(validation.error || 'Invalid file');
      return false;
    }

    setError(null);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (validateAndUpdateFile(files[0])) {
        onChange(files);
      } else {
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (validateAndUpdateFile(files[0])) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        onChange(dataTransfer.files);
      }
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label id="file-upload-label" className="text-sm font-medium text-gray-700">
        {label}
      </label>

      {preview ? (
        <div
          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
          role="group"
          aria-label="Avatar preview"
        >
          <div className="relative">
            <img
              src={preview}
              alt="Avatar preview"
              className="h-14 w-14 rounded-full object-cover border-2 border-gray-200 shadow-sm"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">Avatar uploaded</p>
            <p className="text-xs text-gray-500 mt-0.5">Click remove to change the image</p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors group"
            aria-label="Remove avatar"
          >
            <X size={16} className="text-gray-500 group-hover:text-red-500" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
          aria-labelledby="file-upload-label"
          aria-describedby="file-upload-description"
          className={clsx(
            'relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
          )}
        >
          <div
            className={clsx(
              'p-2 rounded-full transition-colors',
              isDragging ? 'bg-blue-100' : 'bg-gray-200'
            )}
          >
            {isDragging ? (
              <Upload size={20} className="text-blue-600" />
            ) : (
              <User size={20} className="text-gray-500" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              {isDragging ? 'Drop image here' : 'Upload avatar'}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Click to browse or drag and drop (PNG, JPG, GIF up to 2MB)
            </p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        aria-describedby={error ? 'file-upload-error' : undefined}
      />

      {error && (
        <p id="file-upload-error" className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
