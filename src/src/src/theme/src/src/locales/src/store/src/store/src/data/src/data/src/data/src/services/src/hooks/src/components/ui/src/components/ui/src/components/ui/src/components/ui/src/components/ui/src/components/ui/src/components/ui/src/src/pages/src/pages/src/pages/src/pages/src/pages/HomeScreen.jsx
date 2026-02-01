import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { staggerContainer, fadeInUp } from '../theme/animations';
import { 
  Hand, 
  Sparkles, 
  Heart, 
  Sun, 
  MessageCircle,
  Star 
} from 'lucide-react';

const features = [
  { id: 'palm', title: 'Palm Reading', icon: Hand, path: '/palm/scan', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'tarot', title: 'Tarot Reading', icon: Sparkles, path: '/tarot', gradient: 'from-purple-500 to-pink-500' },
  { id: 'love', title: 'Love Reading', icon: Heart, path: '/tarot?category=love', gradient: 'from-red-500 to-pink-600' },
  { id: 'daily', title: 'Daily Guidance', icon: Sun, path: '/daily', gradient: 'from-yellow-400 to-orange-500' },
  { id: 'horoscope', title: 'Horoscope', icon: Star, path: '/horoscope', gradient: 'from-indigo-500 to-purple-600' },
  { id: 'chat', title: 'Ask Spirit AI', icon: MessageCircle, path: '/chat', gradient: 'from-neon-blue to-purple-600', primary: true },
];

export default function HomeScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const userName = profile.name || 'Seeker';

  return (
    <div className="min-h-screen pb-24 pt-8 px-6">
      {/* Personalized Welcome */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold font-display text-gradient mb-3">
          {t('home.welcome', { name: userName })}
        </h1>
        <p className="text-xl text-gray-300">
          {t('home.subtitle')}
        </p>
      </motion.div>

      {/* AI Chat – Primary Focus (Bigger Card) */}
      <motion.div variants={fadeInUp}>
        <GlassCard
          glow="blue"
          padding="p-10"
          onClick={() => navigate('/chat')}
          className="mb-12 hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-neon-blue mb-3">
                {t('home.chat_ai')}
              </h2>
              <p className="text-gray-300 text-lg">
                Talk directly with your Spiritual Guide
              </p>
            </div>
            <div className="p-6 rounded-full bg-gradient-to-br from-neon-blue to-purple-600 shadow-2xl">
              <MessageCircle className="w-16 h-16 text-white" strokeWidth={2} />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Feature Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-5"
      >
        {features.filter(f => f.id !== 'chat').map((feature) => (
          <motion.div
            key={feature.id}
            variants={fadeInUp}
            whileTap={{ scale: 0.95 }}
          >
            <GlassCard
              glow="purple"
              padding="p-8"
              onClick={() => navigate(feature.path)}
              className="text-center h-full flex flex-col items-center justify-center space-y-4 hover:shadow-neon-purple/70"
            >
              <div className={`p-6 rounded-full bg-gradient-to-br ${feature.gradient} shadow-2xl`}>
                <feature.icon className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
              <p className="text-lg font-semibold text-white">
                {t(`home.${feature.id}`)}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Subtle Disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-xs text-gray-500 mt-12 px-6 leading-relaxed"
      >
        {t('disclaimer.text')}
      </motion.p>
    </div>
  );
}
