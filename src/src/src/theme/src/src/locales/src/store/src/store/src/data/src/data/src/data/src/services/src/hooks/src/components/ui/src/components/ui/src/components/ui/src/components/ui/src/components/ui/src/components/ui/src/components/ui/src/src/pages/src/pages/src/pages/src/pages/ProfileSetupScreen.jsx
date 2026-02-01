import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import { fadeInUp, staggerContainer } from '../theme/animations';
import { User, Calendar, Clock, VenusMars } from 'lucide-react';

export default function ProfileSetupScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setProfile, completeOnboarding } = useUserStore();

  const [form, setForm] = useState({
    name: '',
    dob: '',
    timeOfBirth: '',
    gender: ''
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.dob) return;

    setProfile(form);
    completeOnboarding();
    navigate('/home', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full"
      >

        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="inline-flex p-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 shadow-2xl mb-8">
            <User className="w-20 h-20 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-gradient mb-4">
            Tell Us About You
          </h1>
          <p className="text-lg text-gray-300">
            For a more personal cosmic experience
          </p>
        </motion.div>

        <GlassCard glow="purple" padding="p-8" className="space-y-8">

          {/* Name */}
          <motion.div variants={fadeInUp}>
            <label className="flex items-center gap-3 text-neon-blue mb-3">
              <User className="w-5 h-5" />
              <span className="font-medium">Your Name</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder={t('common.name') || "Enter your name"}
              className="w-full px-6 py-5 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:shadow-neon-blue/50 transition-all"
            />
          </motion.div>

          {/* Date of Birth */}
          <motion.div variants={fadeInUp}>
            <label className="flex items-center gap-3 text-neon-blue mb-3">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Date of Birth</span>
            </label>
            <input
              type="date"
              value={form.dob}
              onChange={(e) => handleChange('dob', e.target.value)}
              className="w-full px-6 py-5 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl text-white focus:outline-none focus:border-neon-blue focus:shadow-neon-blue/50 transition-all"
            />
          </motion.div>

          {/* Time of Birth (Optional) */}
          <motion.div variants={fadeInUp}>
            <label className="flex items-center gap-3 text-neon-blue mb-3">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Time of Birth (Optional)</span>
            </label>
            <input
              type="time"
              value={form.timeOfBirth}
              onChange={(e) => handleChange('timeOfBirth', e.target.value)}
              className="w-full px-6 py-5 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl text-white focus:outline-none focus:border-neon-blue focus:shadow-neon-blue/50 transition-all"
            />
          </motion.div>

          {/* Gender (Optional) */}
          <motion.div variants={fadeInUp}>
            <label className="flex items-center gap-3 text-neon-blue mb-3">
              <VenusMars className="w-5 h-5" />
              <span className="font-medium">Gender (Optional)</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Male', 'Female', 'Other'].map(g => (
                <button
                  key={g}
                  onClick={() => handleChange('gender', g)}
                  className={`py-4 rounded-3xl transition-all ${
                    form.gender === g
                      ? 'bg-gradient-to-r from-neon-blue to-purple-600 text-white shadow-neon-blue'
                      : 'bg-white/10 border border-white/20 text-gray-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="pt-6">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleSubmit}
              disabled={!form.name || !form.dob}
            >
              Begin Your Journey
            </Button>
          </motion.div>

        </GlassCard>

        <motion.p
          variants={fadeInUp}
          className="text-center text-xs text-gray-500 mt-8 px-6 leading-relaxed"
        >
          {t('disclaimer.text')}
        </motion.p>
      </motion.div>
    </div>
  );
}
