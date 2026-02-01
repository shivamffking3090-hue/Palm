import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import { fadeInUp, staggerContainer } from '../theme/animations';
import { Sparkles, Hand, Moon } from 'lucide-react';

const slides = [
  {
    id: 1,
    titleKey: 'onboarding.title1',
    descKey: 'onboarding.desc1',
    icon: Sparkles,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 2,
    titleKey: 'onboarding.title2',
    descKey: 'onboarding.desc2',
    icon: Hand,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    titleKey: 'onboarding.title3',
    descKey: 'onboarding.desc3',
    icon: Moon,
    gradient: 'from-indigo-500 to-purple-600'
  }
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/profile');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-6 py-10">
      {/* Skip Button */}
      <button
        onClick={() => navigate('/profile')}
        className="self-end text-gray-400 hover:text-neon-blue transition-colors text-sm"
      >
        Skip
      </button>

      {/* Slides */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-md"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <div className={`inline-flex p-8 rounded-full bg-gradient-to-br ${slides[currentSlide].gradient} shadow-2xl mb-10`}>
                <slides[currentSlide].icon className="w-20 h-20 text-white" strokeWidth={1.5} />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold font-display text-gradient mb-6">
                {t(slides[currentSlide].titleKey)}
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed px-4">
                {t(slides[currentSlide].descKey)}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mb-10">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            animate={{
              scale: currentSlide === index ? 1.4 : 1,
              backgroundColor: currentSlide === index ? '#00f2ff' : '#ffffff33'
            }}
            className="w-3 h-3 rounded-full transition-all duration-300"
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-center">
        {currentSlide > 0 && (
          <Button variant="secondary" size="lg" onClick={prevSlide}>
            Back
          </Button>
        )}

        <Button
          variant="primary"
          size="lg"
          fullWidth={!currentSlide > 0}
          onClick={nextSlide}
        >
          {currentSlide === slides.length - 1 ? 'Begin Journey' : t('common.next')}
        </Button>
      </div>

      {/* Disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-xs text-gray-500 mt-10 px-6 leading-relaxed"
      >
        {t('disclaimer.text')}
      </motion.p>
    </div>
  );
}
