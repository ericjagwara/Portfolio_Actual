import { Component, ReactNode } from "react";
import { C } from "@/constants/theme";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="min-h-screen flex items-center justify-center px-6"
          style={{ background: C.bg, color: C.text }}
        >
          <div className="text-center max-w-md">
            <h1
              className="text-3xl mb-4"
              style={{ fontFamily: "'Instrument Serif',serif", color: C.bright }}
            >
              Something went wrong
            </h1>
            <p
              className="text-sm mb-6"
              style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}
            >
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-80"
              style={{
                background: C.accent,
                color: C.bg,
                fontFamily: "'Inter',sans-serif",
              }}
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <pre
                className="mt-6 p-4 rounded-lg text-left text-xs overflow-auto"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
              >
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
