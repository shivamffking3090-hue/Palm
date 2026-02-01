import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { staggerContainer, fadeInUp } from '../theme/animations';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'हिंदी', native: 'Hindi' },
  { code: 'es', name: 'Español', native: 'Spanish' },
  { code: 'fr', name: 'Français', native: 'French' },
  { code: 'it', name: 'Italiano', native: 'Italian' },
  { code: 'kr', name: '한국어', native: 'Korean' },
];

export default function LanguageScreen() {
  const { t, i18n } = useTranslation();
  const { setLanguage } = useUserStore();
  const navigate = useNavigate();

  const handleLanguageSelect = (langCode) => {
    i18n.changeLanguage(langCode);
    setLanguage(langCode);
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pb-20">
      {/* Title */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="text-center mb-12"
      >
        <Globe className="w-20 h-20 mx-auto mb-6 text-neon-blue drop-shadow-neon" strokeWidth={1.5} />
        <h1 className="text-4xl md:text-5xl font-bold font-display text-gradient mb-4">
          {t('common.start') || 'Choose Your Language'}
        </h1>
        <p className="text-lg text-gray-300">
          모든 언어로 영혼의 메시지를 받으세요
        </p>
      </motion.div>

      {/* Language Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-5 w-full max-w-md"
      >
        {languages.map((lang) => (
          <motion.div key={lang.code} variants={fadeInUp}>
            <GlassCard
              glow="blue"
              padding="p-8"
              onClick={() => handleLanguageSelect(lang.code)}
              className="text-center hover:scale-105 active:scale-95"
            >
              <div className="text-4xl mb-3">{lang.native === 'English' ? 'A' : lang.native[0]}</div>
              <p className="text-xl font-semibold text-white">{lang.native}</p>
              <p className="text-sm text-gray-400 mt-1">{lang.name}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Powered by */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 text-center text-gray-500 text-sm"
      >
        Powered by Cosmic Intelligence
      </motion.p>
    </div>
  );
}
