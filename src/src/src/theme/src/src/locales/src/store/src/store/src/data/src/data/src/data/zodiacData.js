import { Flame, Droplets, Wind, Mountain } from 'lucide-react';

export const ZODIAC_SIGNS = [
  {
    id: 'aries',
    name: 'Aries',
    dates: 'Mar 21 - Apr 19',
    element: 'Fire',
    symbol: '♈',
    icon: Flame, 
    traits: ['Courageous', 'Determined', 'Confident']
  },
  {
    id: 'taurus',
    name: 'Taurus',
    dates: 'Apr 20 - May 20',
    element: 'Earth',
    symbol: '♉',
    icon: Mountain,
    traits: ['Reliable', 'Patient', 'Practical']
  },
  {
    id: 'gemini',
    name: 'Gemini',
    dates: 'May 21 - Jun 20',
    element: 'Air',
    symbol: '♊',
    icon: Wind,
    traits: ['Adaptable', 'Outgoing', 'Intelligent']
  },
  {
    id: 'cancer',
    name: 'Cancer',
    dates: 'Jun 21 - Jul 22',
    element: 'Water',
    symbol: '♋',
    icon: Droplets,
    traits: ['Intuitive', 'Sentimental', 'Compassionate']
  },
  {
    id: 'leo',
    name: 'Leo',
    dates: 'Jul 23 - Aug 22',
    element: 'Fire',
    symbol: '♌',
    icon: Flame,
    traits: ['Passionate', 'Generous', 'Warm-hearted']
  },
  {
    id: 'virgo',
    name: 'Virgo',
    dates: 'Aug 23 - Sep 22',
    element: 'Earth',
    symbol: '♍',
    icon: Mountain,
    traits: ['Loyal', 'Analytical', 'Kind']
  },
  {
    id: 'libra',
    name: 'Libra',
    dates: 'Sep 23 - Oct 22',
    element: 'Air',
    symbol: '♎',
    icon: Wind,
    traits: ['Cooperative', 'Diplomatic', 'Gracious']
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    dates: 'Oct 23 - Nov 21',
    element: 'Water',
    symbol: '♏',
    icon: Droplets,
    traits: ['Resourceful', 'Brave', 'Passionate']
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    dates: 'Nov 22 - Dec 21',
    element: 'Fire',
    symbol: '♐',
    icon: Flame,
    traits: ['Generous', 'Idealistic', 'Humorous']
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    dates: 'Dec 22 - Jan 19',
    element: 'Earth',
    symbol: '♑',
    icon: Mountain,
    traits: ['Responsible', 'Disciplined', 'Self-control']
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    dates: 'Jan 20 - Feb 18',
    element: 'Air',
    symbol: '♒',
    icon: Wind,
    traits: ['Progressive', 'Original', 'Independent']
  },
  {
    id: 'pisces',
    name: 'Pisces',
    dates: 'Feb 19 - Mar 20',
    element: 'Water',
    symbol: '♓',
    icon: Droplets,
    traits: ['Compassionate', 'Artistic', 'Intuitive']
  }
];

export const getZodiacByDate = (day, month) => {
  // Simple logic to find sign based on day/month
  // Note: Month is 1-indexed (1=Jan, 12=Dec)
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return ZODIAC_SIGNS[0];
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return ZODIAC_SIGNS[1];
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return ZODIAC_SIGNS[2];
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return ZODIAC_SIGNS[3];
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return ZODIAC_SIGNS[4];
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return ZODIAC_SIGNS[5];
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return ZODIAC_SIGNS[6];
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return ZODIAC_SIGNS[7];
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return ZODIAC_SIGNS[8];
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return ZODIAC_SIGNS[9];
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return ZODIAC_SIGNS[10];
  return ZODIAC_SIGNS[11];
};
