import { motion } from 'framer-motion';
import { 
  Home, 
  MessageCircle, 
  Sparkles, 
  Sun, 
  Settings 
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { id: 'home', icon: Home, label: 'Home', path: '/home' },
  { id: 'chat', icon: MessageCircle, label: 'Chat', path: '/chat' },
  { id: 'tarot', icon: Sparkles, label: 'Tarot', path: '/tarot' },
  { id: 'daily', icon: Sun, label: 'Daily', path: '/daily' },
  { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-panel rounded-full px-4 py-4 border border-white/20 shadow-neon-blue/50 backdrop-blur-2xl flex gap-8">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(item.path)}
              className="relative p-4 rounded-full transition-all duration-300"
            >
              {/* Active Indicator Glow */}
              {isActive && (
                <motion.div
                  layoutId="activeNavGlow"
                  className="absolute inset-0 bg-neon-blue/30 rounded-full blur-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <item.icon 
                className={`w-7 h-7 transition-all duration-300 ${
                  isActive 
                    ? 'text-neon-blue drop-shadow-neon' 
                    : 'text-gray-400'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              
              {/* Active Dot */}
              {isActive && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute -top-1 -right-1 w-3 h-3 bg-neon-blue rounded-full shadow-neon-blue"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
