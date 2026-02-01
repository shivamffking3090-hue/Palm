import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from './store/userStore';
import { useBackHandler } from './hooks/useBackHandler';
import { useToast } from './components/ui/Toast';

// Screens
import SplashScreen from './pages/SplashScreen';
import LanguageScreen from './pages/LanguageScreen';
import OnboardingScreen from './pages/OnboardingScreen';
import ProfileSetupScreen from './pages/ProfileSetupScreen';
import HomeScreen from './pages/HomeScreen';
import PalmScanScreen from './pages/PalmScanScreen';
import PalmResultScreen from './pages/PalmResultScreen';
import AIChatScreen from './pages/AIChatScreen';
import TarotScreen from './pages/TarotScreen';
import TarotResultScreen from './pages/TarotResultScreen';
import DailyGuidanceScreen from './pages/DailyGuidanceScreen';
import HoroscopeScreen from './pages/HoroscopeScreen';
import SettingsScreen from './pages/SettingsScreen';

// Components
import Container from './components/ui/Container';
import BottomNav from './components/ui/BottomNav';
import Toast from './components/ui/Toast';
import Loader from './components/ui/Loader';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasOnboarded, language } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const { show } = useToast();

  // Initial navigation logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      if (!hasOnboarded) {
        navigate('/language', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }
    }, 4000); // Splash duration

    return () => clearTimeout(timer);
  }, [hasOnboarded, navigate]);

  // Double back to exit on Home
  useBackHandler(() => {
    if (location.pathname === '/home') {
      show("Press back again to exit", "info");
    }
  });

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <Container key={location.pathname}>
          {location.pathname === '/language' && <LanguageScreen />}
          {location.pathname === '/onboarding' && <OnboardingScreen />}
          {location.pathname === '/profile' && <ProfileSetupScreen />}
          
          {/* Protected Routes with BottomNav */}
          {(location.pathname === '/home' || 
            location.pathname === '/chat' || 
            location.pathname === '/tarot' || 
            location.pathname === '/daily' || 
            location.pathname === '/settings') && (
            <>
              {location.pathname === '/home' && <HomeScreen />}
              {location.pathname === '/chat' && <AIChatScreen />}
              {location.pathname === '/tarot' && <TarotScreen />}
              {location.pathname === '/daily' && <DailyGuidanceScreen />}
              {location.pathname === '/settings' && <SettingsScreen />}
              <BottomNav />
            </>
          )}

          {location.pathname.startsWith('/palm/scan') && <PalmScanScreen />}
          {location.pathname.startsWith('/palm/result') && <PalmResultScreen />}
          {location.pathname.startsWith('/tarot/result') && <TarotResultScreen />}
          {location.pathname.startsWith('/horoscope') && <HoroscopeScreen />}
        </Container>
      </AnimatePresence>

      {/* Global Components */}
      <Toast />
      <Loader />
    </>
  );
}

export default App;
