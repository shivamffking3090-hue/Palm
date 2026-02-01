import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { analyzePalmImage } from '../services/aiService';
import Header from '../components/ui/Header';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { fadeInUp, staggerContainer } from '../theme/animations';
import { Hand, Sparkles, Share2 } from 'lucide-react';

export default function PalmResultScreen() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { image, hand } = location.state || {};

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!image) {
      navigate('/palm/scan');
      return;
    }

    const analyze = async () => {
      try {
        const analysis = await analyzePalmImage(image, i18n.language);
        setResult(analysis);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    analyze();
  }, [image, i18n.language, navigate]);

  const shareReading = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AI Palm Reading',
        text: 'Check out my spiritual palm reading!',
        url: window.location.href
      });
    }
  };

  if (loading) return <Loader message={t('palm.analyzing') || "Reading your destiny..."} />;

  if (error || !result) {
    return (
      <>
        <Header title={t('palm.result_title')} />
        <div className="px-6 py-20 text-center">
          <p className="text-xl text-red-400 mb-8">
            Unable to read the palm clearly.
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate('/palm/scan')}>
            Try Again
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title={t('palm.result_title')} />

      <div className="px-6 pb-32 pt-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-2xl mx-auto"
        >

          {/* Hand Image */}
          <motion.div variants={fadeInUp} className="mb-10">
            <GlassCard glow="purple" padding="p-4">
              <div className="relative">
                <img src={image} alt="Your palm" className="w-full rounded-3xl" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full">
                  <p className="text-neon-blue font-bold flex items-center gap-2">
                    <Hand className="w-5 h-5" />
                    {hand}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Overall Vibe */}
          {result.summary && (
            <motion.div variants={fadeInUp} className="mb-10">
              <GlassCard glow="blue" padding="p-8">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 text-neon-blue" />
                  <h2 className="text-3xl font-bold text-gradient mb-4">
                    Your Spiritual Essence
                  </h2>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    {result.summary}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Line-by-Line Analysis */}
          <div className="space-y-8">
            {result.heartLine && (
              <motion.div variants={fadeInUp}>
                <GlassCard glow="purple" padding="p-8">
                  <h3 className="text-2xl font-bold text-pink-400 mb-4 flex items-center gap-3">
                    <div className="w-12 h-1 bg-pink-400 rounded-full" />
                    Heart Line • Love & Emotions
                  </h3>
                  <p className="text-gray-200 leading-relaxed text-lg">
                    {result.heartLine}
                  </p>
                </GlassCard>
              </motion.div>
            )}

            {result.headLine && (
              <motion.div variants={fadeInUp}>
                <GlassCard glow="blue" padding="p-8">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
                    <div className="w-12 h-1 bg-cyan-400 rounded-full" />
                    Head Line • Intellect & Mindset
                  </h3>
                  <p className="text-gray-200 leading-relaxed text-lg">
                    {result.headLine}
                  </p>
                </GlassCard>
              </motion.div>
            )}

            {result.lifeLine && (
              <motion.div variants={fadeInUp}>
                <GlassCard glow="purple" padding="p-8">
                  <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-3">
                    <div className="w-12 h-1 bg-purple-400 rounded-full" />
                    Life Line • Vitality & Journey
                  </h3>
                  <p className="text-gray-200 leading-relaxed text-lg">
                    {result.lifeLine}
                  </p>
                </GlassCard>
              </motion.div>
            )}

            {result.fateLine && (
              <motion.div variants={fadeInUp}>
                <GlassCard glow="blue" padding="p-8">
                  <h3 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-3">
                    <div className="w-12 h-1 bg-indigo-400 rounded-full" />
                    Fate Line • Destiny & Career
                  </h3>
                  <p className="text-gray-200 leading-relaxed text-lg">
                    {result.fateLine}
                  </p>
                </GlassCard>
              </motion.div>
            )}
          </div>

          {/* Share & Done */}
          <motion.div variants={fadeInUp} className="mt-12 flex gap-4">
            <Button variant="secondary" size="lg" fullWidth onClick={shareReading}>
              <Share2 className="w-5 h-5 mr-2" />
              Share Reading
            </Button>
            <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/home')}>
              Return Home
            </Button>
          </motion.div>

          {/* Final Disclaimer */}
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
