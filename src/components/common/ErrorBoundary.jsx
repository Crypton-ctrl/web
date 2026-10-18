import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
    this.setState({ errorInfo });
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          className="p-6 my-4 bg-rose-50 border border-rose-200 rounded-2xl text-center max-w-xl mx-auto shadow-sm"
          data-testid="error-boundary-fallback"
        >
          <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-rose-900 mb-1">
            {this.props.title || 'Something went wrong'}
          </h3>
          <p className="text-sm text-rose-700 mb-4">
            {this.state.error?.message || 'An unexpected rendering error occurred in this component.'}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-medium transition shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white border border-rose-200 hover:bg-rose-100 text-rose-800 rounded-xl text-sm font-medium transition"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
