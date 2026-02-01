import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { useHistoryStore } from '../store/historyStore';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Header from '../components/ui/Header';
import { fadeInUp, staggerContainer } from '../theme/animations';
import { 
  Languages, 
  Share2, 
  Star, 
  Shield, 
  Trash2, 
  Sparkles,
  LogOut
} from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'es', name: 'Español (Spanish)' },
  { code: 'fr', name: 'Français (French)' },
  { code: 'it', name: 'Italiano (Italian)' },
  { code: 'kr', name: '한국어 (Korean)' },
];

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { language, setLanguage, resetData } = useUserStore();
  const { clearHistory } = useHistoryStore();

  const shareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Palm Reader – Tarot & Astrology',
        text: 'Discover your destiny with AI-powered palm reading, tarot, and horoscope!',
        url: window.location.origin
      });
    }
  };

  const rateApp = () => {
    // In production, this would open Play Store / App Store link
    alert("Thank you for your support! Rating will be available on the Play Store soon.");
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to reset all data and start fresh?")) {
      resetData();
      clearHistory();
      navigate('/language', { replace: true });
    }
  };

  return (
    <>
      <Header title={t('settings.title')} />

      <div className="px-6 pb-32 pt-8 min-h-screen">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-md mx-auto"
        >

          {/* Language Selection */}
          <motion.div variants={fadeInUp} className="mb-10">
            <GlassCard glow="blue" padding="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Languages className="w-10 h-10 text-neon-blue" />
                <h2 className="text-2xl font-bold text-white">{t('settings.language')}</h2>
              </div>

              <div className="space-y-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-6 py-5 rounded-3xl transition-all ${
                      language === lang.code
                        ? 'bg-gradient-to-r from-neon-blue to-purple-600 text-white shadow-neon-blue'
                        : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{lang.name}</span>
                      {language === lang.code && <Sparkles className="w-5 h-5" />}
                    </div>
                  </button>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* App Actions */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <Button variant="secondary" size="lg" fullWidth onClick={shareApp}>
              <Share2 className="w-6 h-6 mr-3" />
              Share This App
            </Button>

            <Button variant="secondary" size="lg" fullWidth onClick={rateApp}>
              <Star className="w-6 h-6 mr-3" />
              Rate & Review
            </Button>

            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => navigate('/privacy')}
            >
              <Shield className="w-6 h-6 mr-3" />
              Privacy Policy
            </Button>
          </motion.div>

          {/* Danger Zone */}
          <motion.div variants={fadeInUp} className="mt-16">
            <GlassCard glow="purple" padding="p-8">
              <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
                <Trash2 className="w-8 h-8" />
                Reset All Data
              </h3>
              <p className="text-gray-300 mb-8">
                This will permanently delete your profile, chat history, and all readings.
              </p>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 shadow-red-600/50"
              >
                <LogOut className="w-6 h-6 mr-3" />
                Start Fresh Journey
              </Button>
            </GlassCard>
          </motion.div>

          {/* Version & Credit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-16 text-gray-500 text-sm"
          >
            <p>AI Palm Reader v1.0.0</p>
            <p className="mt-2">Powered by Cosmic Intelligence</p>
            <p className="mt-4 text-xs">Made with <span className="text-red-500">♥</span> for spiritual seekers</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
