import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { drawCards } from '../data/tarotData';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Header from '../components/ui/Header';
import { fadeInUp, cardFlip } from '../theme/animations';
import { Sparkles, Heart, Briefcase, UserCheck } from 'lucide-react';

const categories = [
  { id: 'love', title: 'Love & Relationships', icon: Heart, color: 'from-pink-500 to-red-600' },
  { id: 'career', title: 'Career & Finance', icon: Briefcase, color: 'from-yellow-500 to-orange-600' },
  { id: 'growth', title: 'Personal Growth', icon: UserCheck, color: 'from-green-500 to-emerald-600' },
  { id: 'general', title: 'General Reading', icon: Sparkles, color: 'from-purple-500 to-indigo-600' },
];

export default function TarotScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState(urlCategory || null);
  const [cards, setCards] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [question, setQuestion] = useState('');

  const startReading = () => {
    if (!selectedCategory) return;

    setIsShuffling(true);
    const drawn = drawCards(3);
    setCards(drawn);
    setRevealedCards([]);

    setTimeout(() => {
      setIsShuffling(false);
    }, 2000);
  };

  const revealCard = (index) => {
    if (revealedCards.includes(index)) return;
    setRevealedCards(prev => [...prev, index]);
    
    if (revealedCards.length + 1 === 3) {
      setTimeout(() => {
        navigate('/tarot/result', {
          state: {
            cards: cards,
            question: question || 'General guidance',
            category: selectedCategory
          }
        });
      }, 1200);
    }
  };

  return (
    <>
      <Header title={t('home.tarot_reading')} />

      <div className="px-6 pb-32 pt-4 min-h-screen">

        {/* Category Selection */}
        {!isShuffling && cards.length === 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center text-gradient mb-12">
              {t('tarot.pick_card')}
            </h2>

            {/* Question Input */}
            <GlassCard glow="purple" padding="p-6" className="mb-10">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Focus on your question (optional)..."
                className="w-full bg-transparent text-white placeholder-gray-400 text-center text-lg focus:outline-none"
              />
            </GlassCard>

            {/* Category Grid */}
            <div className="grid grid-cols-2 gap-6">
              {categories.map((cat) => (
                <motion.div
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <GlassCard
                    glow={selectedCategory === cat.id ? "blue" : "purple"}
                    padding="p-10"
                    className={`text-center h-full ${selectedCategory === cat.id ? 'ring-4 ring-neon-blue/50' : ''}`}
                  >
                    <div className={`p-8 rounded-full bg-gradient-to-br ${cat.color} shadow-2xl mx-auto mb-6 w-28 h-28 flex items-center justify-center`}>
                      <cat.icon className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-xl font-bold text-white">
                      {t(`tarot.categories.${cat.id}`)}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={startReading}
              disabled={!selectedCategory}
              className="mt-12"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Draw Cards
            </Button>
          </motion.div>
        )}

        {/* Shuffling Animation */}
        {isShuffling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full mt-32"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl shadow-2xl"
                  initial={{ rotate: i * 15, x: 0, y: 0 }}
                  animate={{
                    rotate: i * 15 + 360,
                    x: [0, Math.sin(i) * 100, 0],
                    y: [0, Math.cos(i) * 100, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ transformOrigin: 'center' }}
                />
              ))}
              <div className="w-48 h-72 bg-gradient-to-br from-purple-900 to-blue-900 rounded-3xl shadow-2xl flex items-center justify-center">
                <Sparkles className="w-24 h-24 text-neon-blue" />
              </div>
            </motion.div>

            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-12 text-2xl font-display text-gradient"
            >
              Shuffling the cosmic deck...
            </motion.p>
          </motion.div>
        )}

        {/* Card Reveal */}
        {!isShuffling && cards.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-center text-gradient mb-16">
              Tap a card to reveal your message
            </h2>

            <div className="flex justify-center gap-8 flex-wrap">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 300, rotate: -30 + index * 30 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: index * 0.3, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -20 }}
                  onClick={() => revealCard(index)}
                  className="cursor-pointer"
                >
                  <motion.div
                    variants={cardFlip}
                    initial="hidden"
                    animate={revealedCards.includes(index) ? "visible" : "hidden"}
                    className="relative w-48 h-72"
                  >
                    {/* Card Back */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 rounded-3xl shadow-2xl border-4 border-white/20 flex items-center justify-center">
                      <Sparkles className="w-20 h-20 text-neon-blue opacity-50" />
                    </div>

                    {/* Card Front (revealed) */}
                    {revealedCards.includes(index) && (
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 to-orange-700 rounded-3xl shadow-2xl border-4 border-white/30 flex flex-col items-center justify-center p-6">
                        <div className="text-6xl mb-4">Arcana</div>
                        <p className="text-xl font-bold text-white text-center">
                          {card.name}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
