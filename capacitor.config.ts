
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4bf8b2b81f854adf83868bc14846b58f',
  appName: 'exam-genie-archive',
  webDir: 'dist',
  server: {
    url: 'https://4bf8b2b8-1f85-4adf-8386-8bc14846b58f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: '#3B82F6',
      showSpinner: true,
      spinnerColor: '#FFFFFF'
    }
  }
};

export default config;
