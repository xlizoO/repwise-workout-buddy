import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d17dad7686524160b43225137f59c11f',
  appName: 'RepMate - 健身搭子',
  webDir: 'dist',
  server: {
    url: "https://d17dad76-8652-4160-b432-25137f59c11f.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1a1b23",
      showSpinner: false
    }
  }
};

export default config;