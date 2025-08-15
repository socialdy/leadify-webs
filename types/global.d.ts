declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface Gtag {
  (...args: any[]): void;
  (command: 'js', config: Date): void;
  (command: 'config', targetId: string, config?: Record<string, any>): void;
}

declare var gtag: Gtag; 