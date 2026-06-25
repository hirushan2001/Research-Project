import React from 'react';
import { Trash2, CheckCircle2 } from 'lucide-react';

interface ImagePreviewProps {
  file: File;
  onClear: () => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  file,
  onClear,
  onAnalyze,
  isLoading,
}) => {
  const [imageUrl, setImageUrl] = React.useState<string>('');

  React.useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="w-full space-y-4 fade-in">
      <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 shadow-inner group aspect-video flex items-center justify-center">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Fruit Preview"
            className="max-h-full max-w-full object-contain"
          />
        )}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-end p-3">
          <button
            onClick={onClear}
            disabled={isLoading}
            className="p-2 rounded-xl bg-red-600/90 hover:bg-red-700 text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
            title="Remove Image"
          >
            <Trash2 className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          onClick={onClear}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all font-medium text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel Selection
        </button>
        <button
          onClick={onAnalyze}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-medium text-sm transition-all shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isLoading ? 'Processing Model...' : 'Start Assessment'}</span>
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
