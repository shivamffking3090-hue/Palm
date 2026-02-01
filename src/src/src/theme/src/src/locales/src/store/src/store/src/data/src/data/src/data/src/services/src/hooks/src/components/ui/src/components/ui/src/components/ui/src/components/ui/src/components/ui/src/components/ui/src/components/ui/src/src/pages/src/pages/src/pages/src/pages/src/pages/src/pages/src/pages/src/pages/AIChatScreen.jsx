import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useHistoryStore } from '../store/historyStore';
import { getChatResponse } from '../services/aiService';
import Header from '../components/ui/Header';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { Send, Sparkles, Moon } from 'lucide-react';

export default function AIChatScreen() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const { chatHistory, addChatMessage, clearChat } = useHistoryStore();
  const [messages, setMessages] = useState(chatHistory);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Sync with store
  useEffect(() => {
    setMessages(chatHistory);
  }, [chatHistory]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { text: input, isUser: true, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    addChatMessage(userMessage);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getChatResponse(
        messages.filter(m => !m.isUser),
        input,
        i18n.language
      );

      const aiMessage = { text: response, isUser: false, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMessage]);
      addChatMessage(aiMessage);
    } catch (err) {
      const errorMsg = { 
        text: "I'm having trouble connecting to the stars right now. Please try again in a moment.", 
        isUser: false, 
        timestamp: Date.now() 
      };
      setMessages(prev => [...prev, errorMsg]);
      addChatMessage(errorMsg);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <Header title={t('home.chat_ai')} />

      <div className="flex flex-col h-screen pb-24 pt-20">

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="p-10 rounded-full bg-gradient-to-br from-neon-blue to-purple-600 shadow-2xl mb-8"
                >
                  <Sparkles className="w-20 h-20 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  Hello, Seeker
                </h2>
                <p className="text-lg text-gray-300 max-w-sm">
                  I am your Spiritual Guide. Ask me anything about love, life, purpose, or the energies around you.
                </p>
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                  {['What is my soul mission?', 'How can I attract love?', 'What should I focus on this month?'].map((q) => (
                    <button
                      key={q}
                      onClick={() => setInput(q)}
                      className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div className="space-y-6 mt-6">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${msg.isUser ? 'order-2' : ''}`}>
                      <GlassCard
                        glow={msg.isUser ? "purple" : "blue"}
                        padding="p-5"
                        className={`inline-block ${msg.isUser ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}`}
                      >
                        <p className="text-white leading-relaxed whitespace-pre-wrap">
                          {msg.text}
                        </p>
                        <p className="text-xs text-white/60 mt-2 text-right">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </GlassCard>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <GlassCard glow="blue" padding="p-5">
                      <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                            className="w-2 h-2 bg-neon-blue rounded-full"
                          />
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cosmic-900 via-cosmic-900/90 to-transparent">
          <GlassCard glow="purple" padding="p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask your spiritual guide..."
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-all"
              />
              <Button
                variant="primary"
                size="lg"
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="rounded-full p-4"
              >
                <Send className="w-6 h-6" />
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>

      {isTyping && <Loader message="Channeling divine wisdom..." />}
    </>
  );
}
