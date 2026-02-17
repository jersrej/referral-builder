import { useRef, useState } from 'react';
import { Upload, X, User } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  value?: FileList | null;
  onChange: (files: FileList | null) => void;
  preview?: string | null;
  onRemove?: () => void;
  accept?: string;
  label?: string;
}

const FileUpload = ({
  onChange,
  preview,
  onRemove,
  accept = 'image/*',
  label = 'Avatar'
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onChange(files);
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
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(files[0]);
      onChange(dataTransfer.files);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {preview ? (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
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
            title="Remove avatar"
          >
            <X size={16} className="text-gray-500 group-hover:text-red-500" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={clsx(
            'relative flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg transition-all cursor-pointer',
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
            <p className="text-xs text-gray-500 mt-0.5">Click to browse or drag and drop</p>
            <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
