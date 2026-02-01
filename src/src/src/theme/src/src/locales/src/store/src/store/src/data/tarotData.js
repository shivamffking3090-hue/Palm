// Major Arcana Data (The 22 Trump Cards)
const MAJOR_ARCANA = [
  { id: 'major_0', name: 'The Fool', keywords: ['New Beginnings', 'Innocence', 'Spontaneity'], image: 'major_0.webp' },
  { id: 'major_1', name: 'The Magician', keywords: ['Manifestation', 'Power', 'Action'], image: 'major_1.webp' },
  { id: 'major_2', name: 'The High Priestess', keywords: ['Intuition', 'Mystery', 'Subconscious'], image: 'major_2.webp' },
  { id: 'major_3', name: 'The Empress', keywords: ['Fertility', 'Nature', 'Abundance'], image: 'major_3.webp' },
  { id: 'major_4', name: 'The Emperor', keywords: ['Authority', 'Structure', 'Control'], image: 'major_4.webp' },
  { id: 'major_5', name: 'The Hierophant', keywords: ['Tradition', 'Spiritual Guidance', 'Conformity'], image: 'major_5.webp' },
  { id: 'major_6', name: 'The Lovers', keywords: ['Love', 'Harmony', 'Choices'], image: 'major_6.webp' },
  { id: 'major_7', name: 'The Chariot', keywords: ['Willpower', 'Victory', 'Determination'], image: 'major_7.webp' },
  { id: 'major_8', name: 'Strength', keywords: ['Courage', 'Compassion', 'Influence'], image: 'major_8.webp' },
  { id: 'major_9', name: 'The Hermit', keywords: ['Soul-searching', 'Solitude', 'Inner Guidance'], image: 'major_9.webp' },
  { id: 'major_10', name: 'Wheel of Fortune', keywords: ['Change', 'Cycles', 'Destiny'], image: 'major_10.webp' },
  { id: 'major_11', name: 'Justice', keywords: ['Fairness', 'Truth', 'Law'], image: 'major_11.webp' },
  { id: 'major_12', name: 'The Hanged Man', keywords: ['Surrender', 'New Perspective', 'Sacrifice'], image: 'major_12.webp' },
  { id: 'major_13', name: 'Death', keywords: ['Endings', 'Transformation', 'Transition'], image: 'major_13.webp' },
  { id: 'major_14', name: 'Temperance', keywords: ['Balance', 'Moderation', 'Patience'], image: 'major_14.webp' },
  { id: 'major_15', name: 'The Devil', keywords: ['Addiction', 'Materialism', 'Playfulness'], image: 'major_15.webp' },
  { id: 'major_16', name: 'The Tower', keywords: ['Sudden Change', 'Upheaval', 'Awakening'], image: 'major_16.webp' },
  { id: 'major_17', name: 'The Star', keywords: ['Hope', 'Faith', 'Rejuvenation'], image: 'major_17.webp' },
  { id: 'major_18', name: 'The Moon', keywords: ['Illusion', 'Fear', 'Anxiety'], image: 'major_18.webp' },
  { id: 'major_19', name: 'The Sun', keywords: ['Positivity', 'Success', 'Vitality'], image: 'major_19.webp' },
  { id: 'major_20', name: 'Judgement', keywords: ['Rebirth', 'Inner Calling', 'Absolution'], image: 'major_20.webp' },
  { id: 'major_21', name: 'The World', keywords: ['Completion', 'Integration', 'Travel'], image: 'major_21.webp' },
];

const SUITS = ['Wands', 'Cups', 'Swords', 'Pentacles'];
const RANKS = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];

// Helper to generate the full 78-card deck
export const getTarotDeck = () => {
  const deck = [...MAJOR_ARCANA];

  SUITS.forEach(suit => {
    RANKS.forEach((rank, index) => {
      deck.push({
        id: `${suit.toLowerCase()}_${index + 1}`,
        name: `${rank} of ${suit}`,
        // Simple keyword generation for context (The AI Service provides deep meaning)
        keywords: [`${suit} Energy`, rank, 'Minor Arcana'], 
        image: `${suit.toLowerCase()}_${index + 1}.webp`,
        isMinor: true,
        suit: suit
      });
    });
  });

  return deck;
};

// Helper to shuffle and draw cards
export const drawCards = (count = 1) => {
  const deck = getTarotDeck();
  // Fisher-Yates Shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.slice(0, count);
};
