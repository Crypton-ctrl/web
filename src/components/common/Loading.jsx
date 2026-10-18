import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading = ({
  message = 'Loading...',
  variant = 'spinner', // 'spinner' | 'skeleton' | 'full'
  className = ''
}) => {
  if (variant === 'skeleton') {
    return (
      <div className={`space-y-4 animate-pulse ${className}`} data-testid="loading-skeleton">
        <div className="h-48 bg-slate-200 rounded-2xl w-full"></div>
        <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded-md w-1/2"></div>
        <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          <p className="text-sm font-medium text-slate-700">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 gap-3 text-slate-500 ${className}`}
      data-testid="loading-spinner"
    >
      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      <span className="text-sm font-medium text-slate-600">{message}</span>
    </div>
  );
};

export default Loading;
