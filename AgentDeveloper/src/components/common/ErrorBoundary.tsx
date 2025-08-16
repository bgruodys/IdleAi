interface ComponentProps {
  className?: string;
  children?: any;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

import { Component, ErrorInfo } from 'react';

export class ErrorBoundary extends Component<ComponentProps, ErrorBoundaryState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Game Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen bg-void-black text-white flex items-center justify-center p-8'>
          <div className='panel max-w-md text-center'>
            <h2 className='heading-primary text-2xl mb-4'>System Failure</h2>
            <p className='text-gray-300 mb-4'>
              The machine spirit has encountered an error. The Adeptus Mechanicus is investigating.
            </p>
            <button
              className='btn-primary'
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Restart Systems
            </button>
            {this.state.error && (
              <details className='mt-4 text-left'>
                <summary className='cursor-pointer text-warning-amber'>
                  Technical Details
                </summary>
                <pre className='mt-2 text-xs text-gray-400 overflow-auto'>
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
