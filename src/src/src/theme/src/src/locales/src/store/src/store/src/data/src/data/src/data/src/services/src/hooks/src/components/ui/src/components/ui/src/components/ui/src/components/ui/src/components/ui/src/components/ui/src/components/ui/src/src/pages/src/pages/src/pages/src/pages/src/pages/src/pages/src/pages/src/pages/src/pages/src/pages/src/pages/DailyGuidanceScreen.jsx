import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useHistoryStore } from '../store/historyStore';
import { drawCards } from '../data/tarotData';
import { getDailyGuidance } from '../services/aiService';
import Header from '../components/ui/Header';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { fadeInUp, staggerContainer, cardFlip } from '../theme/animations';
import { Sun, Share2, Sparkles } from 'lucide-react';

export default function DailyGuidanceScreen() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { getDailyGuidance, setDailyGuidance } = useHistoryStore();

  const [card, setCard] = useState(null);
  const [guidance, setGuidance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const cached = getDailyGuidance();
    if (cached) {
      setCard(cached.card);
      setGuidance(cached.guidance);
      setRevealed(true);
      setLoading(false);
      return;
    }

    // Draw today's card
    const todayCard = drawCards(1)[0];

    const fetchGuidance = async () => {
      try {
        const response = await getDailyGuidance(
          todayCard.name,
          i18n.language
        );

        const fullGuidance = {
          mood: response.match(/Mood[:\s]*(.+?)(?=\n|$)/i)?.[1]?.trim() || '',
          love: response.match(/Love[:\s]*(.+?)(?=\n|$)/i)?.[1]?.trim() || '',
          career: response.match(/Career|Money[:\s]*(.+?)(?=\n|$)/i)?.[1]?.trim() || '',
          embrace: response.match(/Embrace[:\s]*(.+?)(?=\n|$)/i)?.[1]?.trim() || '',
          avoid: response.match(/Avoid[:\s]*(.+?)(?=\n|$)/i)?.[1]?.trim() || '',
          lucky: response.match(/Lucky[:\s]*(.+)/i)?.[1]?.trim() || '',
          raw: response
        };

        setCard(todayCard);
        setGuidance(fullGuidance);
        setDailyGuidance({ card: todayCard, guidance: fullGuidance });
      } catch (err) {
        setGuidance({
          raw: "The stars are quiet today, but your inner light still shines. Trust yourself."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGuidance();
  }, [i18n.language, getDailyGuidance, setDailyGuidance]);

  const shareDaily = () => {
    if (navigator.share && card && guidance) {
      navigator.share({
        title: "My Daily Cosmic Guidance",
        text: `Today's Card: ${card.name}\n\n${guidance.mood || ''}\n\n✨ Embrace: ${guidance.embrace || 'peace'}\nAvoid: ${guidance.avoid || 'doubt'}`,
      });
    }
  };

  if (loading) {
    return <Loader message="Drawing today's energy..." />;
  }

  return (
    <>
      <Header title={t('home.daily_guidance')} />

      <div className="px-6 pb-32 pt-8 min-h-screen">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-xl mx-auto"
        >

          {/* Today's Date */}
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <p className="text-2xl font-display text-neon-blue">
              {new Date().toLocaleDateString(undefined, { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </motion.div>

          {/* Card Reveal */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center mb-16"
            onClick={() => setRevealed(true)}
          >
            <motion.div
              variants={cardFlip}
              initial="hidden"
              animate={revealed ? "visible" : "hidden"}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              {/* Card Back */}
              {!revealed && (
                <div className="w-72 h-96 md:w-80 md:h-112 bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 rounded-3xl shadow-2xl border-4 border-white/20 flex items-center justify-center">
                  <Sparkles className="w-32 h-32 text-neon-blue opacity-60" />
                </div>
              )}

              {/* Card Front */}
              {revealed && card && (
                <GlassCard
                  glow="blue"
                  padding="p-8"
                  className="w-72 h-96 md:w-80 md:h-112 bg-gradient-to-br from-yellow-600/30 to-orange-700/30 border-yellow-500/40"
                >
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-full h-64 bg-gradient-to-br from-yellow-600 to-orange-700 rounded-3xl mb-6 shadow-2xl flex items-center justify-center">
                      <Sun className="w-32 h-32 text-yellow-200" />
                    </div>
                    <h3 className="text-3xl font-bold text-yellow-300 font-display">
                      {card.name}
                    </h3>
                    <p className="text-yellow-200 mt-2">Today's Energy</p>
                  </div>
                </GlassCard>
              )}
            </motion.div>
          </motion.div>

          {/* Guidance Content */}
          {revealed && guidance && (
            <>
              <motion.div variants={fadeInUp}>
                <GlassCard glow="purple" padding="p-10">
                  <h2 className="text-4xl font-bold text-center text-gradient mb-10">
                    Today's Cosmic Message
                  </h2>

                  <div className="space-y-10 text-lg leading-relaxed">
                    {guidance.mood && (
                      <div>
                        <p className="text-neon-blue font-bold text-xl mb-3">Today's Energy</p>
                        <p className="text-gray-200">{guidance.mood}</p>
                      </div>
                    )}

                    {guidance.love && (
                      <div>
                        <p className="text-pink-400 font-bold text-xl mb-3">In Love</p>
                        <p className="text-gray-200">{guidance.love}</p>
                      </div>
                    )}

                    {guidance.career && (
                      <div>
                        <p className="text-yellow-400 font-bold text-xl mb-3">Career & Abundance</p>
                        <p className="text-gray-200">{guidance.career}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-6 mt-12">
                      {guidance.embrace && (
                        <GlassCard glow="blue" padding="p-6" className="text-center">
                          <p className="text-green-400 font-bold text-lg mb-2">Embrace</p>
                          <p className="text-gray-200">{guidance.embrace}</p>
                        </GlassCard>
                      )}
                      {guidance.avoid && (
                        <GlassCard glow="purple" padding="p-6" className="text-center">
                          <p className="text-red-400 font-bold text-lg mb-2">Avoid</p>
                          <p className="text-gray-200">{guidance.avoid}</p>
                        </GlassCard>
                      )}
                    </div>

                    {guidance.lucky && (
                      <div className="text-center pt-8 border-t border-white/10">
                        <p className="text-yellow-300 font-bold text-2xl mb-3">
                          Lucky Element
                        </p>
                        <p className="text-3xl">{guidance.lucky}</p>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Actions */}
              <motion.div variants={fadeInUp} className="mt-12 flex gap-4">
                <Button variant="secondary" size="lg" fullWidth onClick={shareDaily}>
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
                <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/home')}>
                  Return Home
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
