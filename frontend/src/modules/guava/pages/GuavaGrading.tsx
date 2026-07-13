import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { predictGuava } from '../api';
import UploadZone from '../../../components/UploadZone';
import ImagePreview from '../../../components/ImagePreview';
import PredictionCard from '../../../components/PredictionCard';
import PredictionHistory from '../../../components/PredictionHistory';
import FutureFeatureCard from '../../../components/FutureFeatureCard';
import LoadingSpinner from '../../../components/LoadingSpinner';
import type { FutureFeature, Prediction } from '../../../types';
import { Info, AlertTriangle } from 'lucide-react';

const FUTURE_FEATURES: FutureFeature[] = [
  {
    id: 'feat-1',
    title: 'Blemish Detection',
    description: 'Pixel-level segmentation of guava skin spots, pest marks, and mechanical wounds.',
    icon: 'eye'
  },
  {
    id: 'feat-2',
    title: 'Ripeness Analysis',
    description: 'Calculate relative ratio of yellow-to-green coloration to assess maturity indices.',
    icon: 'sparkles'
  },
  {
    id: 'feat-3',
    title: 'Diameter Estimation',
    description: 'Estimate size category of guavas based on pixel boundaries against standard scales.',
    icon: 'ruler'
  }
];

export const GuavaGrading: React.FC = () => {
  const { addPrediction } = useApp();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [prediction, setPrediction] = useState<{
    grade: 'G1' | 'G2' | 'G3' | 'G4';
    confidence: number;
    message: string;
    predictionTime: number;
    imageUrl: string;
  } | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null);
    setPrediction(null);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPrediction(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await predictGuava(selectedFile);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        
        const newPred = {
          grade: result.grade,
          confidence: result.confidence,
          message: result.message,
          predictionTime: result.prediction_time,
          imageUrl: base64Image
        };
        
        setPrediction(newPred);
        addPrediction(newPred);
      };
      
      reader.readAsDataURL(selectedFile);
      
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.detail || 
        'Failed to connect to the guava backend services. Please verify the FastAPI application is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryRecord = (record: Prediction) => {
    setSelectedFile(null);
    setPrediction({
      grade: record.grade,
      confidence: record.confidence,
      message: record.message,
      predictionTime: record.predictionTime,
      imageUrl: record.imageUrl
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-10 fade-in">
      
      {/* Module Title Header */}
      <section className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🍐</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">
            Guava Quality Assessment
          </h2>
        </div>
        <p className="text-sm text-slate-550 dark:text-slate-400 font-sans max-w-2xl leading-relaxed">
          Upload a clear photograph of a guava specimen. The model will analyze skin spots, bruising, and coloration, outputting a graded quality report (G1 - G4).
        </p>
      </section>

      {/* Main Analysis Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Upload Zone / Specimen display (Left Side) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 bg-white/40 dark:bg-slate-900/10 shadow-lg">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Specimen Input Area
            </h3>
            
            {!selectedFile && !prediction && !isLoading && (
              <UploadZone onFileSelect={handleFileSelect} />
            )}

            {selectedFile && !prediction && !isLoading && (
              <ImagePreview
                file={selectedFile}
                onClear={handleClear}
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
              />
            )}

            {isLoading && (
              <LoadingSpinner />
            )}

            {prediction && !isLoading && (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 aspect-video flex items-center justify-center border border-slate-200/45 dark:border-slate-800/35">
                  <img
                    src={prediction.imageUrl}
                    alt="Current Specimen"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <button
                  onClick={handleClear}
                  className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all font-medium text-xs cursor-pointer"
                >
                  Analyze New Specimen
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="flex gap-3 p-4 rounded-2xl border border-red-200 bg-red-50 text-red-700 dark:border-red-950/40 dark:bg-red-950/20 dark:text-red-400 text-xs leading-relaxed fade-in">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-500" />
              <div>
                <p className="font-bold">Execution Failed</p>
                <p className="mt-0.5">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Prediction Results Display (Right Side) */}
        <div className="lg:col-span-6">
          {prediction ? (
            <PredictionCard
              grade={prediction.grade}
              confidence={prediction.confidence}
              message={prediction.message}
              predictionTime={prediction.predictionTime}
              imageUrl={prediction.imageUrl}
              onReset={handleClear}
            />
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/45 bg-white/40 dark:bg-slate-900/10 glass-panel">
              <div className="p-4 mb-4 rounded-full bg-slate-100 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-800/40 text-slate-400 dark:text-slate-650 animate-float">
                <Info className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Awaiting Specimen Analysis
              </h4>
              <p className="mt-1.5 text-xs text-slate-450 dark:text-slate-550 max-w-[280px]">
                Please upload an image file of a guava specimen and trigger the grading analysis model to view results.
              </p>
            </div>
          )}
        </div>

      </section>

      {/* Local Storage Prediction History */}
      <section className="pt-4 border-t border-slate-200/40 dark:border-slate-800/35">
        <PredictionHistory onSelectRecord={handleSelectHistoryRecord} />
      </section>

      {/* Future enhancements */}
      <section className="space-y-5 pt-4 border-t border-slate-200/40 dark:border-slate-800/35">
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-500" />
            <span>Planned Research Enhancements</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Below features represent the upcoming development phases of this research project engine.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {FUTURE_FEATURES.map((feature) => (
            <FutureFeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default GuavaGrading;
