import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTarotReading } from '../services/aiService';
import Header from '../components/ui/Header';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { fadeInUp, staggerContainer, cardFlip } from '../theme/animations';
import { Sparkles, Share2, Home } from 'lucide-react';

export default function TarotResultScreen() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { cards, question, category } = location.state || {};

  const [reading, setReading] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cards || cards.length === 0) {
      navigate('/tarot');
      return;
    }

    const fetchReading = async () => {
      try {
        const response = await getTarotReading(
          cards,
          question,
          t(`tarot.categories.${category}`) || category,
          i18n.language
        );
        setReading(response);
      } catch (err) {
        setReading("The cards are whispering softly today… Please try again in a moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchReading();
  }, [cards, question, category, i18n.language, navigate, t]);

  const shareReading = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Tarot Reading',
        text: `I just received a powerful 3-card tarot reading: ${cards.map(c => c.name).join(', ')}`,
      });
    }
  };

  if (loading) {
    return <Loader message="The cards are aligning..." />;
  }

  return (
    <>
      <Header title={t('tarot.reveal')} />

      <div className="px-6 pb-32 pt-4 min-h-screen">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >

          {/* Question */}
          {question && (
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <GlassCard glow="purple" padding="p-6">
                <p className="text-xl italic text-gray-300">
                  "{question}"
                </p>
              </GlassCard>
            </motion.div>
          )}

          {/* Cards Display */}
          <motion.div variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gradient mb-12">
              Your Sacred Three-Card Spread
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={cardFlip}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.4 }}
                  className="relative"
                  whileHover={{ y: -20, rotateY: 180 }}
                >
                  <GlassCard
                    glow="blue"
                    padding="p-6"
                    className="h-full text-center bg-gradient-to-br from-yellow-600/20 to-orange-700/20 border-yellow-500/30"
                  >
                    {/* Placeholder for real card art – in production you'd use card.image */}
                    <div className="w-full h-64 bg-gradient-to-br from-yellow-600 to-orange-700 rounded-3xl mb-6 flex items-center justify-center shadow-2xl">
                      <Sparkles className="w-24 h-24 text-yellow-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-yellow-300 mb-2">
                      {card.name}
                    </h3>
                    <p className="text-sm text-yellow-200 opacity-80">
                      Position {index + 1} — {index === 0 ? 'Past' : index === 1 ? 'Present' : 'Future'}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Interpretation – Long-form */}
          <motion.div variants={fadeInUp}>
            <GlassCard glow="purple" padding="p-10">
              <div className="text-center mb-8">
                <Sparkles className="w-16 h-16 mx-auto text-neon-blue mb-4" />
                <h2 className="text-4xl font-bold font-display text-gradient">
                  Message from the Universe
                </h2>
              </div>

              <div className="prose prose-invert max-w-none text-lg leading-relaxed text-gray-200 space-y-6">
                {reading.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="first-letter:text-4xl first-letter:text-neon-blue first-letter:font-bold">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <p className="text-sm text-gray-400 italic">
                  The cards have spoken. Trust the journey.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Actions */}
          <motion.div variants={fadeInUp} className="mt-12 flex gap-4">
            <Button variant="secondary" size="lg" fullWidth onClick={shareReading}>
              <Share2 className="w-5 h-5 mr-2" />
              Share Reading
            </Button>
            <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/home')}>
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Button>
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-xs text-gray-500 mt-10 px-6 leading-relaxed"
          >
            {t('disclaimer.text')}
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
