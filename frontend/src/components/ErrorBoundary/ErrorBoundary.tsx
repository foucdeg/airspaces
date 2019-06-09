import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  FallbackComponent: React.ComponentType;
}
interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    // Send error to your monitoring system
  }

  render() {
    const { hasError } = this.state;
    const { FallbackComponent, children } = this.props;
    return hasError ? <FallbackComponent /> : children;
  }
}

export default ErrorBoundary;
