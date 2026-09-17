// Pre-designed FLN Worksheet Templates for Classroom Physical Printing
// Formatted for Standard A4 Paper with Ol Chiki Tracing & Bilingual Activities

export const WORKSHEET_TEMPLATES = [
  {
    id: 'tracing_olchiki',
    title: 'ओल चिकी वर्णमाला अनुरेखण (Ol Chiki Letter Tracing)',
    theme: 'Language & Letter Knowledge',
    grade: 'Balvatika & Grade 1',
    description: 'Dotted Ol Chiki characters for children to trace with pencil, paired with picture and Hindi word.',
    letter: 'ᱪ',
    letterName: 'UCH (ᱪ)',
    wordSantali: 'ᱪᱮᱬᱮ',
    wordRoman: 'Chenre',
    wordHindi: 'चिड़िया (Bird)',
    traceGrid: [
      ['ᱪ', 'ᱪ', 'ᱪ', 'ᱪ', 'ᱪ'],
      ['ᱪ', 'ᱪ', 'ᱪ', 'ᱪ', 'ᱪ'],
      ['ᱪᱮᱬᱮ', 'ᱪᱮᱬᱮ', 'ᱪᱮᱬᱮ']
    ],
    exerciseText: 'नीचे दिए गए संताली अक्षर "ᱪ" को पेंसिल से ट्रेस करो और चिड़िया के चित्र में रंग भरो।'
  },
  {
    id: 'counting_fln',
    title: 'गिनती और चित्र मिलान (Count & Match 1 to 5)',
    theme: 'FLN Numeracy',
    grade: 'Grade 1',
    description: 'Counting animal and bird icons, circling the correct Santali and Hindi numerals.',
    exerciseText: 'चित्रों को गिनो और सही संताली (Ol Chiki) संख्या पर गोला लगाओ:',
    items: [
      { count: 1, icons: '🐦', sa_num: '᱑ (Mit)', hi_num: '१ (एक)' },
      { count: 2, icons: '🐦 🐦', sa_num: '᱒ (Bar)', hi_num: '२ (दो)' },
      { count: 3, icons: '🌳 🌳 🌳', sa_num: '᱓ (Pe)', hi_num: '३ (तीन)' },
      { count: 4, icons: '🍎 🍎 🍎 🍎', sa_num: '᱔ (Pun)', hi_num: '४ (चार)' },
      { count: 5, icons: '⭐ ⭐ ⭐ ⭐ ⭐', sa_num: '᱕ (Monre)', hi_num: '५ (पांच)' }
    ]
  },
  {
    id: 'bilingual_match',
    title: 'द्विभाषी शब्द-चित्र मिलान (Bilingual Picture-Word Match)',
    theme: 'Bilingual Vocabulary',
    grade: 'Grade 1 & 2',
    description: 'Draw a line connecting the sketch, the Hindi word, and the Santali Ol Chiki name.',
    exerciseText: 'रेखा खींचकर सही चित्र, हिंदी नाम और संताली नाम का मिलान करो:',
    pairs: [
      { icon: '🐦', hindi: 'चिड़िया', santali: 'ᱪᱮᱬᱮ', roman: 'Chenre' },
      { icon: '🌳', hindi: 'पेड़', santali: 'ᱫᱟᱨᱮ', roman: 'Dare' },
      { icon: '🏠', hindi: 'घर', santali: 'ᱚᱲᱟᱜ', roman: 'Orag' },
      { icon: '🐕', hindi: 'कुत्ता', santali: 'ᱥᱮᱛᱟ', roman: 'Seta' }
    ]
  }
];
