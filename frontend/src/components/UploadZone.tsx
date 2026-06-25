import React, { useState, useRef } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  maxSizeMB?: number;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect, maxSizeMB = 5 }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const validateAndSelectFile = (file: File) => {
    setError(null);
    
    // Validate file type (image only)
    if (!file.type.startsWith('image/')) {
      setError('Unsupported file type. Please upload a valid image (JPEG, PNG, WEBP).');
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File is too large. Maximum size allowed is ${maxSizeMB}MB.`);
      return;
    }

    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        className={`relative flex flex-col items-center justify-center w-full min-h-[260px] p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/2 scale-[1.01]'
            : 'border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 hover:border-emerald-500/60 hover:bg-white/70 dark:hover:bg-slate-900/30'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />

        <div className="flex flex-col items-center text-center">
          <div className="p-4 mb-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8 animate-bounce" />
          </div>
          
          <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
            Drag & drop your fruit image here
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            or <span className="text-emerald-600 dark:text-emerald-400 font-semibold underline">browse file explorer</span>
          </p>
          <p className="mt-4 text-[11px] text-slate-400 dark:text-slate-500">
            Supports: JPEG, PNG, WEBP (Max {maxSizeMB}MB)
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 p-3.5 rounded-xl border border-red-200/50 bg-red-50/50 dark:border-red-900/30 dark:bg-red-950/20 text-xs text-red-600 dark:text-red-400 fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
