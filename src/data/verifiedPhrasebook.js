// Verified PALASH Tribal Classroom Phrasebook (Santali - Ol Chiki & Roman Transliteration)
// Grounded in Jharkhand State Primary Education Curriculum (JEPC & NCERT FLN)

export const CATEGORIES = [
  { id: 'all', label: 'सभी श्रेणियां (All)' },
  { id: 'basics', label: 'कक्षा निर्देश (Classroom Basics)' },
  { id: 'needs', label: 'विद्यार्थी की ज़रूरतें (Student Needs)' },
  { id: 'math', label: 'गिनती और गणित (Math & Counting)' },
  { id: 'nature', label: 'पेड़-पौधे व जानवर (Nature & Animals)' },
  { id: 'praise', label: 'प्रोत्साहन (Encouragement)' },
  { id: 'hygiene', label: 'स्वच्छता व स्वास्थ्य (Hygiene & Health)' }
];

export const VERIFIED_PHRASES = [
  // 1. Classroom Basics & Instructions
  {
    id: 'p1',
    category: 'basics',
    speaker: 'teacher',
    hindi: 'सभी बच्चे बैठ जाओ।',
    santali_olchiki: 'ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱫᱩᱲᱩᱵ ᱯᱮ᱾',
    santali_roman: 'Joto gidrạ durub pe.',
    confidence: 99,
    lesson_tag: 'Grade 1 FLN Routine'
  },
  {
    id: 'p2',
    category: 'basics',
    speaker: 'teacher',
    hindi: 'अपनी किताब खोलो।',
    santali_olchiki: 'ᱟᱢᱟᱜ ᱯᱩᱛᱷᱤ ᱠᱷᱩᱞᱟᱹᱣ ᱢᱮ᱾',
    santali_roman: 'Amag puthi khulạu me.',
    confidence: 98,
    lesson_tag: 'Grade 1 FLN Routine'
  },
  {
    id: 'p3',
    category: 'basics',
    speaker: 'teacher',
    hindi: 'ध्यान से सुनो और मेरे बाद बोलो।',
    santali_olchiki: 'ᱢᱚᱱᱮ ᱮᱢ ᱠᱟᱛᱮ ᱟᱧᱡᱚᱢ ᱢᱮ ᱟᱨ ᱤᱧ ᱛᱟᱭᱚᱢ ᱨᱚᱲ ᱢᱮ᱾',
    santali_roman: 'Mone em kate añjom me ar iñ tayom ror me.',
    confidence: 97,
    lesson_tag: 'Listening Skill'
  },
  {
    id: 'p4',
    category: 'basics',
    speaker: 'teacher',
    hindi: 'यहाँ देखो, ब्लैकबोर्ड पर।',
    santali_olchiki: 'ᱱᱚᱸᱰᱮ ᱧᱮᱞ ᱢᱮ, ᱵᱞᱮᱠᱵᱚᱨᱰ ᱨᱮ᱾',
    santali_roman: 'Nonde ñel me, blackboard re.',
    confidence: 96,
    lesson_tag: 'Visual Attention'
  },
  {
    id: 'p5',
    category: 'basics',
    speaker: 'teacher',
    hindi: 'हाथ ऊपर उठाओ।',
    santali_olchiki: 'ᱛᱤ ᱪᱮᱛᱟᱱ ᱛᱩᱞ ᱢᱮ᱾',
    santali_roman: 'Ti chetan tul me.',
    confidence: 98,
    lesson_tag: 'Physical Movement'
  },
  {
    id: 'p6',
    category: 'basics',
    speaker: 'teacher',
    hindi: 'ताली बजाओ!',
    santali_olchiki: 'ᱛᱷᱟᱹᱭᱟᱹ ᱛᱷᱟᱹᱭᱟᱹ ᱢᱮ! / ᱛᱟᱹᱞᱤ ᱨᱩ ᱢᱮ!',
    santali_roman: 'Thạyo thạyo me! / Tali ru me!',
    confidence: 99,
    lesson_tag: 'Warm-up Activity'
  },

  // 2. Student Needs (Two-Way Communication)
  {
    id: 'p7',
    category: 'needs',
    speaker: 'student',
    hindi: 'क्या मैं पानी पीने जा सकता हूँ?',
    santali_olchiki: 'ᱤᱧ ᱫᱟᱜ ᱧᱩ ᱤᱧ ᱪᱟᱞᱟᱜ-ᱟ?',
    santali_roman: 'Iñ dag ñu iñ chalag-a?',
    confidence: 99,
    suggested_reply: 'ᱦᱮᱸ, ᱪᱟᱞᱟᱜ ᱢᱮ (Heñ, chalag me — हाँ, जाओ)',
    lesson_tag: 'Classroom Sanitation'
  },
  {
    id: 'p8',
    category: 'needs',
    speaker: 'student',
    hindi: 'क्या मैं शौच/बाथरूम जा सकता हूँ?',
    santali_olchiki: 'ᱤᱧ ᱯᱟᱭᱠᱷᱟᱱᱟ ᱤᱧ ᱪᱟᱞᱟᱜ-ᱟ?',
    santali_roman: 'Iñ paikhana iñ chalag-a?',
    confidence: 99,
    suggested_reply: 'ᱦᱮᱸ, ᱩᱥᱟᱹᱨᱟ ᱪᱟᱞᱟᱜ ᱢᱮ (Heñ, usạra chalag me — हाँ, जल्दी जाओ)',
    lesson_tag: 'Classroom Sanitation'
  },
  {
    id: 'p9',
    category: 'needs',
    speaker: 'student',
    hindi: 'मेरी पेंसिल खो गई है।',
    santali_olchiki: 'ᱤᱧᱟᱜ ᱯᱮᱱᱥᱤᱞ ᱟᱫ ᱮᱱᱟ᱾',
    santali_roman: 'Iñag pencil ad ena.',
    confidence: 98,
    suggested_reply: 'ᱱᱚᱣᱟ ᱤᱫᱤ ᱢᱮ (Nowa idi me — यह ले लो)',
    lesson_tag: 'Classroom Supplies'
  },
  {
    id: 'p10',
    category: 'needs',
    speaker: 'student',
    hindi: 'मुझे समझ नहीं आया।',
    santali_olchiki: 'ᱤᱧ ᱵᱟᱹᱧ ᱵᱩᱡᱷᱟᱹᱣ ᱞᱮᱫᱟ᱾',
    santali_roman: 'Iñ bạñ bujhạu leda.',
    confidence: 98,
    suggested_reply: 'ᱟᱨᱦᱚᱸ ᱢᱤᱫᱫᱷᱟᱣ ᱞᱟᱹᱭ ᱟᱢ ᱠᱟᱱᱟ (Arhoñ middhao lạy am kana — फिर से समझाता हूँ)',
    lesson_tag: 'Comprehension Feedback'
  },
  {
    id: 'p11',
    category: 'needs',
    speaker: 'student',
    hindi: 'मुझे समझ आ गया!',
    santali_olchiki: 'ᱤᱧ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱮᱫᱟ!',
    santali_roman: 'Iñ bujhạu keda!',
    confidence: 99,
    suggested_reply: 'ᱟᱹᱰᱤ ᱵᱷᱟᱹᱜᱤ! (Adi bhạgi! — बहुत अच्छा!)',
    lesson_tag: 'Comprehension Feedback'
  },
  {
    id: 'p12',
    category: 'needs',
    speaker: 'student',
    hindi: 'मुझे भूख लगी है।',
    santali_olchiki: 'ᱤᱧ ᱨᱮᱸᱜᱮᱡ ᱠᱤᱫᱤᱧᱟ᱾',
    santali_roman: 'Iñ rengej kidiña.',
    confidence: 97,
    suggested_reply: 'ᱢᱤᱰ-ᱰᱮ ᱢᱤᱞ ᱚᱠᱛᱚ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ (Mid-day meal time is near)',
    lesson_tag: 'Health & Nutrition'
  },

  // 3. Math & Counting (NIPUN Bharat FLN Numeracy)
  {
    id: 'p13',
    category: 'math',
    speaker: 'teacher',
    hindi: 'एक, दो, तीन, चार, पांच।',
    santali_olchiki: 'ᱢᱤᱫ, ᱵᱟᱨ, ᱯᱮ, ᱯᱩᱱ, ᱢᱚᱬᱮ᱾',
    santali_roman: 'Mit, Bar, Pe, Pun, Monre.',
    confidence: 100,
    lesson_tag: 'NIPUN FLN Numeracy 1-5'
  },
  {
    id: 'p14',
    category: 'math',
    speaker: 'teacher',
    hindi: 'छह, सात, आठ, नौ, दस।',
    santali_olchiki: 'ᱛᱩᱨᱩᱭ, ᱮᱭᱟᱭ, ᱤᱨᱟᱹᱞ, ᱟᱨᱮ, ᱜᱮᱞ᱾',
    santali_roman: 'Turuy, Eyay, Irạl, Are, Gel.',
    confidence: 100,
    lesson_tag: 'NIPUN FLN Numeracy 6-10'
  },
  {
    id: 'p15',
    category: 'math',
    speaker: 'teacher',
    hindi: 'दो और तीन मिलकर कुल कितने हुए?',
    santali_olchiki: 'ᱵᱟᱨ ᱟᱨ ᱯᱮ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱡᱚᱛᱚ ᱛᱮ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭ ᱮᱱᱟ?',
    santali_roman: 'Bar ar pe mesa kate joto te tinạg hoy ena?',
    confidence: 96,
    lesson_tag: 'Basic Addition'
  },
  {
    id: 'p16',
    category: 'math',
    speaker: 'teacher',
    hindi: 'यह बड़ा है और यह छोटा है।',
    santali_olchiki: 'ᱱᱚᱣᱟ ᱫᱚ ᱢᱟᱨᱟᱝ-ᱟ ᱟᱨ ᱱᱚᱣᱟ ᱫᱚ ᱠᱟᱹᱴᱤᱡ-ᱟ᱾',
    santali_roman: 'Nowa do marang-a ar nowa do kạtij-a.',
    confidence: 98,
    lesson_tag: 'Pre-Math Concepts'
  },

  // 4. Nature, Birds & Animals (NCERT Rimjhim Theme)
  {
    id: 'p17',
    category: 'nature',
    speaker: 'teacher',
    hindi: 'चिड़िया पेड़ पर बैठकर गाना गाती है।',
    santali_olchiki: 'ᱪᱮᱬᱮ ᱫᱟᱨᱮ ᱨᱮ ᱫᱩᱲᱩᱵ ᱠᱟᱛᱮ ᱥᱮᱨᱮᱧ ᱮᱫᱟᱭ᱾',
    santali_roman: 'Chenre dare re durub kate seren edaya.',
    confidence: 99,
    lesson_tag: 'NCERT Rimjhim Nature Lesson'
  },
  {
    id: 'p18',
    category: 'nature',
    speaker: 'teacher',
    hindi: 'पेड़ हमें छाया और मीठे फल देते हैं।',
    santali_olchiki: 'ᱫᱟᱨᱮ ᱟᱵᱚ ᱩᱢᱩᱞ ᱟᱨ ᱥᱤᱵᱤᱞ ᱡᱚ ᱮᱢᱟᱵᱚᱱᱟ᱾',
    santali_roman: 'Dare abo umul ar sibil jo emabona.',
    confidence: 97,
    lesson_tag: 'Environmental Studies'
  },
  {
    id: 'p19',
    category: 'nature',
    speaker: 'teacher',
    hindi: 'पानी की बूँदें आसमान से गिर रही हैं, बारिश हो रही है।',
    santali_olchiki: 'ᱫᱟᱜ ᱴᱚᱯᱟᱜ ᱥᱮᱨᱢᱟ ᱠᱷᱚᱱ ᱧᱩᱨᱩᱜ ᱠᱟᱱᱟ, ᱫᱟᱜ ᱮᱫᱟᱭ᱾',
    santali_roman: 'Dag topag serma khon ñurug kana, dag edaya.',
    confidence: 98,
    lesson_tag: 'Seasons & Rain'
  },
  {
    id: 'p20',
    category: 'nature',
    speaker: 'teacher',
    hindi: 'कुत्ता घर की रखवाली करता है।',
    santali_olchiki: 'ᱥᱮᱛᱟ ᱚᱲᱟᱜ ᱮ ᱨᱩᱠᱷᱤᱭᱟᱹᱭᱟ᱾',
    santali_roman: 'Seta orag e rukhiyạya.',
    confidence: 98,
    lesson_tag: 'Domestic Animals'
  },

  // 5. Encouragement & Praise
  {
    id: 'p21',
    category: 'praise',
    speaker: 'teacher',
    hindi: 'शाबाश! बहुत अच्छा किया।',
    santali_olchiki: 'ᱥᱟᱨᱦᱟᱣ! ᱟᱹᱰᱤ ᱵᱷᱟᱹᱜᱤᱢ ᱠᱟᱹᱢᱤ ᱠᱮᱫᱟ᱾',
    santali_roman: 'Sarhao! Adi bhạgim kami keda.',
    confidence: 99,
    lesson_tag: 'Positive Reinforcement'
  },
  {
    id: 'p22',
    category: 'praise',
    speaker: 'teacher',
    hindi: 'तुम बहुत समझदार बच्चे हो।',
    santali_olchiki: 'ᱟᱢ ᱫᱚ ᱟᱹᱰᱤ ᱪᱟᱞᱟᱠ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱟᱱᱟᱢ᱾',
    santali_roman: 'Am do adi chalak gidrạ kanam.',
    confidence: 97,
    lesson_tag: 'Self-Esteem Building'
  },
  {
    id: 'p23',
    category: 'praise',
    speaker: 'teacher',
    hindi: 'डरो मत, फिर से कोशिश करो।',
    santali_olchiki: 'ᱟᱞᱚᱢ ᱵᱚᱛᱚᱨᱚᱜ-ᱟ, ᱟᱨᱦᱚᱸ ᱠᱩᱨᱩᱢᱩᱴᱩᱭ ᱢᱮ᱾',
    santali_roman: 'Alom botorog-a, arhoñ kurumuṭuy me.',
    confidence: 98,
    lesson_tag: 'Encouragement'
  },

  // 6. Health, Hygiene & Cleanliness
  {
    id: 'p24',
    category: 'hygiene',
    speaker: 'teacher',
    hindi: 'खाना खाने से पहले साबुन से हाथ धोना चाहिए।',
    santali_olchiki: 'ᱫᱟᱠᱟ ᱡᱚᱢ ᱢᱟᱲᱟᱝ ᱨᱮ ᱥᱟᱵᱚᱱ ᱛᱮ ᱛᱤ ᱟᱹᱨᱩᱵ ᱦᱩᱭᱩᱜ-ᱟ᱾',
    santali_roman: 'Daka jom marang re sabon te ti arub hoyug-a.',
    confidence: 98,
    lesson_tag: 'Cleanliness & Bal Sansad'
  },
  {
    id: 'p25',
    category: 'hygiene',
    speaker: 'teacher',
    hindi: 'साफ पानी पियो।',
    santali_olchiki: 'ᱥᱟᱯᱷᱟ ᱫᱟᱜ ᱧᱩᱭ ᱢᱮ᱾',
    santali_roman: 'Sapha dag ñuy me.',
    confidence: 99,
    lesson_tag: 'Health & Safe Water'
  }
];

// Quick Tap Palette for Shy Students
export const STUDENT_TAP_PALETTE = [
  { id: 'tap_water', icon: '💧', label_hi: 'पानी चाहिए', label_sa: 'ᱫᱟᱜ ᱧᱩ (Dag ñu)', phonetic: 'Dag ñu sanayiñ kana', reply_hi: 'हाँ, पानी पी लो' },
  { id: 'tap_toilet', icon: '🚻', label_hi: 'शौचालय जाना है', label_sa: 'ᱯᱟᱭᱠᱷᱟᱱᱟ (Paikhana)', phonetic: 'Paikhana chalag-a', reply_hi: 'हाँ, जल्दी जाकर आओ' },
  { id: 'tap_pencil', icon: '✏️', label_hi: 'पेंसिल नहीं है', label_sa: 'ᱯᱮᱱᱥᱤᱞ ᱟᱫ ᱮᱱᱟ', phonetic: 'Pencil ad ena', reply_hi: 'यहाँ से पेंसिल ले लो' },
  { id: 'tap_repeat', icon: '🔄', label_hi: 'फिर से समझाइए', label_sa: 'ᱟᱨᱦᱚᱸ ᱞᱟᱹᱭ ᱢᱮ', phonetic: 'Arhoñ lạy me', reply_hi: 'दोबारा ध्यान से सुनो' },
  { id: 'tap_yes', icon: '👍', label_hi: 'समझ गया', label_sa: 'ᱵᱩᱡᱷᱟᱹᱣ ᱠᱮᱫᱟ', phonetic: 'Bujhạu keda', reply_hi: 'शाबाश!' },
  { id: 'tap_hungry', icon: '🍚', label_hi: 'भूख लगी है', label_sa: 'ᱨᱮᱸᱜᱮᱡ ᱠᱤᱫᱤᱧᱟ', phonetic: 'Rengej kidiña', reply_hi: 'थोड़ी देर में भोजन मिलेगा' }
];
