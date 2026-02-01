import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { ZODIAC_SIGNS, getZodiacByDate } from '../data/zodiacData';
import { getDailyGuidance } from '../services/aiService';
import Header from '../components/ui/Header';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { fadeInUp, staggerContainer } from '../theme/animations';
import { Star, Share2, Calendar } from 'lucide-react';

export default function HoroscopeScreen() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { profile } = useUserStore();

  const [selectedSign, setSelectedSign] = useState(null);
  const [horoscope, setHoroscope] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-detect from DOB
  useEffect(() => {
    if (profile.dob) {
      const [year, month, day] = profile.dob.split('-').map(Number);
      const sign = getZodiacByDate(day, month);
      setSelectedSign(sign);
    }
  }, [profile.dob]);

  const fetchHoroscope = async (sign) => {
    setLoading(true);
    try {
      const response = await getDailyGuidance(sign.name, i18n.language);
      setHoroscope(response);
    } catch (err) {
      setHoroscope("The stars are veiled today, but your inner wisdom knows the way. Trust yourself.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSign) {
      fetchHoroscope(selectedSign);
    }
  }, [selectedSign, i18n.language]);

  const shareHoroscope = () => {
    if (navigator.share && selectedSign && horoscope) {
      navigator.share({
        title: `${selectedSign.name} Daily Horoscope`,
        text: `Today's ${selectedSign.name} energy:\n\n${horoscope}`,
      });
    }
  };

  return (
    <>
      <Header title={t('home.horoscope')} />

      <div className="px-6 pb-32 pt-8 min-h-screen">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >

          {/* Zodiac Selector */}
          {!selectedSign && (
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-bold text-center text-gradient mb-12">
                Choose Your Zodiac Sign
              </h2>

              <div className="grid grid-cols-3 gap-6">
                {ZODIAC_SIGNS.map((sign) => (
                  <motion.div
                    key={sign.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSign(sign)}
                  >
                    <GlassCard
                      glow="purple"
                      padding="p-8"
                      className="text-center hover:shadow-neon-blue/70"
                    >
                      <div className="text-6xl mb-4">{sign.symbol}</div>
                      <p className="text-xl font-bold text-white">{sign.name}</p>
                      <p className="text-sm text-gray-400">{sign.dates}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Horoscope Display */}
          {selectedSign && (
            <>
              {/* Sign Header */}
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <GlassCard glow="blue" padding="p-10">
                  <div className="text-9xl mb-6">{selectedSign.symbol}</div>
                  <h1 className="text-5xl font-bold font-display text-gradient mb-2">
                    {selectedSign.name}
                  </h1>
                  <p className="text-2xl text-neon-blue flex items-center justify-center gap-3">
                    <Calendar className="w-6 h-6" />
                    {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </GlassCard>
              </motion.div>

              {/* Horoscope Text */}
              {loading ? (
                <Loader message="Reading the stars..." />
              ) : (
                <motion.div variants={fadeInUp}>
                  <GlassCard glow="purple" padding="p-12">
                    <div className="text-center mb-10">
                      <Star className="w-20 h-20 mx-auto text-yellow-400 mb-4" />
                      <h2 className="text-4xl font-bold font-display text-gradient">
                        Your Daily Cosmic Energy
                      </h2>
                    </div>

                    <div className="prose prose-invert max-w-none text-lg leading-loose text-gray-200 space-y-6">
                      {horoscope.split('\n\n').map((para, i) => (
                        <p key={i} className="first-letter:text-5xl first-letter:text-neon-blue first-letter:font-bold">
                          {para}
                        </p>
                      ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10 text-center">
                      <p className="text-yellow-300 font-bold text-xl">
                        Element: {selectedSign.element}
                      </p>
                      <p className="text-gray-400 mt-2">
                        {selectedSign.traits.join(' • ')}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Actions */}
              <motion.div variants={fadeInUp} className="mt-12 flex gap-4">
                <Button variant="secondary" size="lg" fullWidth onClick={() => setSelectedSign(null)}>
                  Choose Another Sign
                </Button>
                <Button variant="primary" size="lg" fullWidth onClick={shareHoroscope}>
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </motion.div>
            </>
          )}

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-gray-500 mt-12 px-6 leading-relaxed"
          >
            {t('disclaimer.text')}
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
