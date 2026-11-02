import { TaskItem, SectionDef, LocationOption } from '../types';

export const LOCATION_OPTIONS: LocationOption[] = [
  {
    id: 'dorm_hall',
    nameEn: '107, 207 & Dorm hall',
    nameHi: '107, 207 और डॉर्म हॉल',
    formType: 'dorm',
    mappedSectionId: 3,
    formNameEn: 'Dorm (Section 3)',
    formNameHi: 'डॉर्म (खंड 3)',
    iconName: 'Bed',
    descriptionEn: 'Bunk beds, hallway, shoe rack, under-bed drawers, and bathroom',
    descriptionHi: 'बंक बेड, गलियारा, जूतों का रैक, दराज और वॉशरूम'
  },
  {
    id: 'floors_terrace',
    nameEn: 'Floors or Terrace',
    nameHi: 'Floors or Terrace (मंज़िलें या छत)',
    formType: 'terrace',
    mappedSectionId: 4,
    formNameEn: 'Corridors (Section 4)',
    formNameHi: 'गलियारे (खंड 4)',
    iconName: 'Layers',
    descriptionEn: 'Floor passages, railings, lights, dustbins, and terrace',
    descriptionHi: 'मंज़िल के गलियारे, रेलिंग, लाइटें और छत'
  },
  {
    id: 'reception',
    nameEn: 'Reception',
    nameHi: 'रिसेप्शन',
    formType: 'reception',
    mappedSectionId: 6,
    formNameEn: 'Reception (Section 6)',
    formNameHi: 'रिसेप्शन (खंड 6)',
    iconName: 'Store',
    descriptionEn: 'Front desk, computer, guest lounge, glass entrance, Wi-Fi',
    descriptionHi: 'रिसेप्शन डेस्क, कंप्यूटर, सोफा, कांच और वाई-फाई'
  },
  {
    id: 'yoga_hall',
    nameEn: 'Yoga Hall',
    nameHi: 'योग हॉल',
    formType: 'terrace',
    mappedSectionId: 7,
    formNameEn: 'Yoga Hall (Section 7)',
    formNameHi: 'योग हॉल (खंड 7)',
    iconName: 'Sparkles',
    descriptionEn: 'Yoga mats, wooden floor, cushions, mirrors, sound system',
    descriptionHi: 'योग मैट, लकड़ी का फर्श, तकिए, शीशे और साउंड सिस्टम'
  },
  {
    id: 'cafe',
    nameEn: 'Cafe (Indoor or Outdoor)',
    nameHi: 'कैफ़े (इनडोर या आउटडोर)',
    formType: 'garden',
    mappedSectionId: 5,
    formNameEn: 'Cafe/Restaurant (Section 5)',
    formNameHi: 'कैफ़े / रेस्तरां (खंड 5)',
    iconName: 'Utensils',
    descriptionEn: 'Dining tables, seating, beverage counter, outdoor area, fireplace',
    descriptionHi: 'डाइनिंग टेबल, काउंटर, आउटडोर और फायरप्लेस'
  },
  {
    id: 'common_washroom',
    nameEn: 'Common Washroom',
    nameHi: 'साझा वॉशरूम (Common Washroom)',
    formType: 'washroom',
    mappedSectionId: 9,
    formNameEn: 'Common Washroom (Section 9)',
    formNameHi: 'साझा वॉशरूम (खंड 9)',
    iconName: 'Bath',
    descriptionEn: 'Toilet seat, washbasin, mirror, soap dispenser, towels',
    descriptionHi: 'टॉयलेट सीट, वॉशबेसिन, शीशा, हैंडवाश और तौलिया'
  },
  {
    id: 'staircase',
    nameEn: 'Staircase',
    nameHi: 'सीढ़ी (Staircase)',
    formType: 'staircase',
    mappedSectionId: 8,
    formNameEn: 'Staircase (Section 8)',
    formNameHi: 'सीढ़ी (खंड 8)',
    iconName: 'Footprints',
    descriptionEn: 'Steps, handrails, corners, windows, lights, clutter-free passage',
    descriptionHi: 'सीढ़ियों के पायदान, रेलिंग, कोने और ग्रिल'
  }
];

export const ALL_ROOM_AREAS = [
  { id: '101', name: '101', nameHi: '101' },
  { id: '102', name: '102', nameHi: '102' },
  { id: '103', name: '103', nameHi: '103' },
  { id: '104', name: '104', nameHi: '104' },
  { id: '105', name: '105', nameHi: '105' },
  { id: '106', name: '106', nameHi: '106' },
  { id: '107', name: '107', nameHi: '107' },
  { id: '201', name: '201', nameHi: '201' },
  { id: '202', name: '202', nameHi: '202' },
  { id: '203', name: '203', nameHi: '203' },
  { id: '204', name: '204', nameHi: '204' },
  { id: '205', name: '205', nameHi: '205' },
  { id: '206', name: '206', nameHi: '206' },
  { id: '207', name: '207', nameHi: '207' },
  { id: '301', name: '301', nameHi: '301' },
  { id: '302', name: '302', nameHi: '302' },
  { id: '303', name: '303', nameHi: '303' },
  { id: '304', name: '304', nameHi: '304' },
  { id: '305', name: '305', nameHi: '305' },
  { id: '306', name: '306', nameHi: '306' },
  { id: '307', name: '307', nameHi: '307' },
  { id: 'dorm_hall', name: 'Dorm Hall', nameHi: 'डॉर्म हॉल' },
  { id: 'floor_1', name: 'First Floor', nameHi: 'पहली मंज़िल' },
  { id: 'floor_2', name: 'Second Floor', nameHi: 'दूसरी मंज़िल' },
  { id: 'floor_3', name: 'Third Floor', nameHi: 'तीसरी मंज़िल' },
  { id: 'floor_4', name: 'Fourth Floor', nameHi: 'चौथी मंज़िल' },
  { id: 'terrace', name: 'Terrace', nameHi: 'छत' },
  { id: 'reception', name: 'Reception', nameHi: 'रिसेप्शन' },
  { id: 'yoga_hall', name: 'Yoga Hall', nameHi: 'योग हॉल' },
  { id: 'cafe_outdoor', name: 'Cafe Outdoor', nameHi: 'कैफ़े आउटडोर' },
  { id: 'cafe_indoor', name: 'Cafe Indoor', nameHi: 'कैफ़े के अंदर' },
  { id: 'common_washroom', name: 'Common Washroom', nameHi: 'साझा वॉशरूम' },
  { id: 'staircase', name: 'Staircase', nameHi: 'सीढ़ी' }
];

export const ALL_STAFF_MEMBERS = [
  { id: 'subhash', name: 'Subhash', nameHi: 'सुभाष', avatar: '👨' },
  { id: 'ajeet', name: 'Ajeet', nameHi: 'अजीत', avatar: '👨‍🦱' },
  { id: 'mithun', name: 'Mithun', nameHi: 'मिथुन', avatar: '👨' },
  { id: 'karan', name: 'Karan', nameHi: 'करण', avatar: '👨' },
  { id: 'anand', name: 'Anand', nameHi: 'आनंद', avatar: '👨‍🦱' },
  { id: 'akash', name: 'Akash', nameHi: 'आकाश', avatar: '👨' },
  { id: 'jubin', name: 'Jubin', nameHi: 'जुबिन', avatar: '👨' },
  { id: 'rajeshwari', name: 'Rajeshwari', nameHi: 'राजेश्वरी', avatar: '👩' },
  { id: 'yashodha', name: 'Yashodha', nameHi: 'यशोदा', avatar: '👩' },
  { id: 'jasvir', name: 'Jasvir', nameHi: 'जसवीर', avatar: '👨' },
];

export const ALL_10_SECTIONS: SectionDef[] = [
  {
    id: 1,
    titleEn: 'Room / Area Information',
    titleHi: 'कमरे / क्षेत्र की जानकारी',
    descriptionEn: 'Select date, room/floor, shift timing, and staff name.',
    descriptionHi: 'तारीख, कमरे का नाम / मंज़िल, शिफ्ट का समय और जांचकर्ता चुनें।',
    type: 'meta'
  },
  {
    id: 2,
    titleEn: 'Room Cleanliness Check',
    titleHi: 'कमरे की सफ़ाई की जाँच',
    descriptionEn: 'General cleaning, windows, doors, furniture, bed, and bathroom checks.',
    descriptionHi: 'साधारण सफाई, खिड़कियां, दरवाजे, फर्नीचर, बिस्तर और बाथरूम की सफाई की जांच।',
    type: 'checklist',
    responseType: 'Cleaned',
    tasks: [
      // General Cleaning
      {
        id: 's2_1',
        subCategoryEn: 'General Cleaning',
        subCategoryHi: 'साधारण सफ़ाई',
        titleEn: 'Room floor swept and mopped.',
        titleHi: 'कमरे के फ़र्श पर झाड़ू और पोंछा लगाया गया।',
        completed: false
      },
      {
        id: 's2_2',
        subCategoryEn: 'General Cleaning',
        subCategoryHi: 'साधारण सफ़ाई',
        titleEn: 'Corners cleaned properly.',
        titleHi: 'कोनों की ठीक से सफाई की गई।',
        completed: false
      },
      {
        id: 's2_3',
        subCategoryEn: 'General Cleaning',
        subCategoryHi: 'साधारण सफ़ाई',
        titleEn: 'Walls are clean.',
        titleHi: 'दीवारें साफ़ हैं।',
        completed: false
      },
      {
        id: 's2_4',
        subCategoryEn: 'General Cleaning',
        subCategoryHi: 'साधारण सफ़ाई',
        titleEn: 'No cobwebs present.',
        titleHi: 'कहीं भी मकड़ी के जाले नहीं हैं।',
        completed: false
      },
      {
        id: 's2_5',
        subCategoryEn: 'General Cleaning',
        subCategoryHi: 'साधारण सफ़ाई',
        titleEn: 'Room smells fresh.',
        titleHi: 'कमरे में ताज़ी महक आ रही है।',
        completed: false
      },
      // Windows
      {
        id: 's2_6',
        subCategoryEn: 'Windows',
        subCategoryHi: 'खिड़कियां',
        titleEn: 'Window glass is clean.',
        titleHi: 'खिड़की का कांच साफ है।',
        completed: false
      },
      {
        id: 's2_7',
        subCategoryEn: 'Windows',
        subCategoryHi: 'खिड़कियां',
        titleEn: 'Window tracks/frames are clean.',
        titleHi: 'खिड़की के ट्रैक/फ्रेम साफ हैं।',
        completed: false
      },
      {
        id: 's2_8',
        subCategoryEn: 'Windows',
        subCategoryHi: 'खिड़कियां',
        titleEn: 'Window curtains are clean.',
        titleHi: 'खिड़की के पर्दे साफ हैं।',
        completed: false
      },
      // Doors
      {
        id: 's2_9',
        subCategoryEn: 'Doors',
        subCategoryHi: 'दरवाजे',
        titleEn: 'Room entrance door is clean.',
        titleHi: 'कमरे का मुख्य दरवाजा साफ है।',
        completed: false
      },
      {
        id: 's2_10',
        subCategoryEn: 'Doors',
        subCategoryHi: 'दरवाजे',
        titleEn: 'Bathroom door is clean.',
        titleHi: 'बाथरूम का दरवाजा साफ है।',
        completed: false
      },
      {
        id: 's2_11',
        subCategoryEn: 'Doors',
        subCategoryHi: 'दरवाजे',
        titleEn: 'Door frames are clean.',
        titleHi: 'दरवाजे के फ्रेम साफ हैं।',
        completed: false
      },
      // Furniture
      {
        id: 's2_12',
        subCategoryEn: 'Furniture',
        subCategoryHi: 'फर्नीचर',
        titleEn: 'Tables are clean.',
        titleHi: 'मेजें साफ हैं।',
        completed: false
      },
      {
        id: 's2_13',
        subCategoryEn: 'Furniture',
        subCategoryHi: 'फर्नीचर',
        titleEn: 'Chairs are clean.',
        titleHi: 'कुर्सियां साफ हैं।',
        completed: false
      },
      {
        id: 's2_14',
        subCategoryEn: 'Furniture',
        subCategoryHi: 'फर्नीचर',
        titleEn: 'Side tables are clean.',
        titleHi: 'साइड टेबल साफ हैं।',
        completed: false
      },
      {
        id: 's2_15',
        subCategoryEn: 'Furniture',
        subCategoryHi: 'फर्नीचर',
        titleEn: 'Cupboards are cleaned.',
        titleHi: 'अलमारियां साफ की गई हैं।',
        completed: false
      },
      {
        id: 's2_16',
        subCategoryEn: 'Furniture',
        subCategoryHi: 'फर्नीचर',
        titleEn: 'Shelves are cleaned.',
        titleHi: 'शेल्फ साफ किए गए हैं।',
        completed: false
      },
      {
        id: 's2_17',
        subCategoryEn: 'Furniture',
        subCategoryHi: 'फर्नीचर',
        titleEn: 'Mirrors are cleaned.',
        titleHi: 'शीशे साफ किए गए हैं।',
        completed: false
      },
      {
        id: 's2_18',
        subCategoryEn: 'Furniture',
        subCategoryHi: 'फर्नीचर',
        titleEn: 'Dustbins are cleaned and emptied.',
        titleHi: 'कूड़ेदान साफ किए गए और खाली किए गए हैं।',
        completed: false
      },
      {
        id: 's2_19',
        subCategoryEn: 'Furniture',
        subCategoryHi: 'फर्नीचर',
        titleEn: 'Dustbin liners replaced.',
        titleHi: 'कूड़ेदान की थैलियां बदली गईं।',
        completed: false
      },
      {
        id: 's2_20',
        subCategoryEn: 'Furniture',
        subCategoryHi: 'फर्नीचर',
        titleEn: 'Air Conditioner is cleaned.',
        titleHi: 'एयर कंडीशनर (AC) साफ किया गया है।',
        completed: false
      },
      {
        id: 's2_21',
        subCategoryEn: 'Furniture',
        subCategoryHi: 'फर्नीचर',
        titleEn: 'Ceiling Fans are cleaned.',
        titleHi: 'छत के पंखे साफ किए गए हैं।',
        completed: false
      },
      // Bed Cleanliness Check
      {
        id: 's2_22',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Bed frame is clean.',
        titleHi: 'बेड फ्रेम साफ है।',
        completed: false
      },
      {
        id: 's2_23',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Pillow is clean.',
        titleHi: 'तकिया साफ है।',
        completed: false
      },
      {
        id: 's2_24',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Pillow cover is clean.',
        titleHi: 'तकिए का कवर साफ है।',
        completed: false
      },
      {
        id: 's2_25',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Bedsheet is clean.',
        titleHi: 'बेडशीट साफ है।',
        completed: false
      },
      {
        id: 's2_26',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Blanket/Duvet is clean.',
        titleHi: 'कंबल/रजाई साफ़ है।',
        completed: false
      },
      {
        id: 's2_27',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Reading light is clean.',
        titleHi: 'रीडिंग लाइट साफ है।',
        completed: false
      },
      {
        id: 's2_28',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'No stains observed.',
        titleHi: 'कोई दाग-धब्बे नहीं दिखे।',
        completed: false
      },
      // Bathroom Cleanliness Check
      {
        id: 's2_29',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Bathroom floor is clean.',
        titleHi: 'बाथरूम का फर्श साफ है।',
        completed: false
      },
      {
        id: 's2_30',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Bathroom wall tiles are clean.',
        titleHi: 'बाथरूम की दीवार की टाइलें साफ हैं।',
        completed: false
      },
      {
        id: 's2_31',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Bathroom ceiling is clean.',
        titleHi: 'बाथरूम की छत साफ है।',
        completed: false
      },
      {
        id: 's2_32',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Toilet seat is sanitized.',
        titleHi: 'टॉयलेट सीट सैनिटाइज्ड है।',
        completed: false
      },
      {
        id: 's2_33',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Toilet lid is clean.',
        titleHi: 'टॉयलेट ढक्कन साफ है।',
        completed: false
      },
      {
        id: 's2_34',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Toilet bowl is clean.',
        titleHi: 'टॉयलेट बाउल साफ है।',
        completed: false
      },
      {
        id: 's2_35',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Wash basin is clean.',
        titleHi: 'वॉश बेसिन साफ है।',
        completed: false
      },
      {
        id: 's2_36',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Basin mirror is clean.',
        titleHi: 'बेसिन का शीशा साफ है।',
        completed: false
      },
      {
        id: 's2_37',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Faucets are cleaned.',
        titleHi: 'नल और नलसाजी की चीजें साफ की गई हैं।',
        completed: false
      },
      {
        id: 's2_38',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Drain covers are clean.',
        titleHi: 'नाली के कवर साफ हैं।',
        completed: false
      },
      {
        id: 's2_39',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'No foul smell present.',
        titleHi: 'कोई बदबू नहीं है।',
        completed: false
      },
      {
        id: 's2_40',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'No hair accumulation present.',
        titleHi: 'कहीं भी बाल जमा नहीं हैं।',
        completed: false
      },
      {
        id: 's2_41',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'No mold observed.',
        titleHi: 'कोई काई/उल्लू नहीं देखी गई।',
        completed: false
      },
      {
        id: 's2_42',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Bathroom mat is clean.',
        titleHi: 'बाथरूम की चटाई/मैट साफ है।',
        completed: false
      },
      {
        id: 's2_43',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Handwash refilled.',
        titleHi: 'हैंडवाश दोबारा भरा गया।',
        completed: false
      },
      {
        id: 's2_44',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Bucket is clean.',
        titleHi: 'बाल्टी साफ है।',
        completed: false
      },
      {
        id: 's2_45',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Mug is clean.',
        titleHi: 'मग साफ है।',
        completed: false
      },
      {
        id: 's2_46',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Pot brush is available.',
        titleHi: 'पॉट ब्रश उपलब्ध है।',
        completed: false
      },
      {
        id: 's2_47',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Wiper is available.',
        titleHi: 'वाइपर उपलब्ध है।',
        completed: false
      },
      {
        id: 's2_48',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Dustbin is clean.',
        titleHi: 'कूड़ेदान साफ है।',
        completed: false
      },
      {
        id: 's2_49',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Toilet paper available.',
        titleHi: 'टॉयलेट पेपर उपलब्ध है।',
        completed: false
      },
      {
        id: 's2_50',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Tissue holder is clean.',
        titleHi: 'टिश्यू होल्डर साफ है।',
        completed: false
      },
      {
        id: 's2_51',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Exhaust Fan is working & Cleaned.',
        titleHi: 'एग्जॉस्ट फैन चालू हालत में है और साफ किया गया है।',
        completed: false
      },
      {
        id: 's2_52',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Geyser is working & cleaned.',
        titleHi: 'गीजर चालू हालत में है और साफ किया गया है।',
        completed: false
      },
      {
        id: 's2_53',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Furniture & Fixture - Door handles clean.',
        titleHi: 'फर्नीचर और फिक्स्चर (दरवाजे के हैंडल) साफ हैं।',
        completed: false
      }
    ]
  },
  {
    id: 3,
    titleEn: '3. Dorm Cleanliness Check',
    titleHi: '3. डॉर्म की सफाई की जांच',
    descriptionEn: 'Dorm floors, shoe racks, bunk beds, privacy curtains, under-bed drawers, and bathroom.',
    descriptionHi: 'डॉर्म का गलियारा, जूतों का रैक, बंक बेड, प्राइवेसी पर्दा, बेड के नीचे की दराज और बाथरूम।',
    type: 'checklist',
    responseType: 'Cleaned',
    tasks: [
      // General Cleaning
      {
        id: 's3_1',
        subCategoryEn: 'General Cleaning',
        subCategoryHi: 'साधारण सफ़ाई',
        titleEn: 'Room floor swept and mopped.',
        titleHi: 'कमरे के फ़र्श पर झाड़ू और पोंछा लगाया गया।',
        completed: false
      },
      {
        id: 's3_2',
        subCategoryEn: 'General Cleaning',
        subCategoryHi: 'साधारण सफ़ाई',
        titleEn: 'Corners cleaned properly.',
        titleHi: 'कोनों की ठीक से सफाई की गई।',
        completed: false
      },
      {
        id: 's3_3',
        subCategoryEn: 'General Cleaning',
        subCategoryHi: 'साधारण सफ़ाई',
        titleEn: 'Walls are clean.',
        titleHi: 'दीवारें साफ़ हैं।',
        completed: false
      },
      {
        id: 's3_4',
        subCategoryEn: 'General Cleaning',
        subCategoryHi: 'साधारण सफ़ाई',
        titleEn: 'No cobwebs present.',
        titleHi: 'कहीं भी मकड़ी के जाले नहीं हैं।',
        completed: false
      },
      {
        id: 's3_5',
        subCategoryEn: 'General Cleaning',
        subCategoryHi: 'साधारण सफ़ाई',
        titleEn: 'Room smells fresh.',
        titleHi: 'कमरे में ताज़ी महक आ रही है।',
        completed: false
      },
      {
        id: 's3_6',
        subCategoryEn: 'General Cleaning',
        subCategoryHi: 'साधारण सफ़ाई',
        titleEn: 'Dorm hallway is clean.',
        titleHi: 'डॉर्म का गलियारा साफ है।',
        completed: false
      },
      {
        id: 's3_7',
        subCategoryEn: 'General Cleaning',
        subCategoryHi: 'साधारण सफ़ाई',
        titleEn: 'Shoe rack is clean.',
        titleHi: 'जूतों का रैक साफ है।',
        completed: false
      },
      // Windows
      {
        id: 's3_8',
        subCategoryEn: 'Windows',
        subCategoryHi: 'खिड़कियां',
        titleEn: 'Window glass is clean.',
        titleHi: 'खिड़की का कांच साफ है।',
        completed: false
      },
      {
        id: 's3_9',
        subCategoryEn: 'Windows',
        subCategoryHi: 'खिड़कियां',
        titleEn: 'Window tracks/frames are clean.',
        titleHi: 'खिड़की के ट्रैक/फ्रेम साफ हैं।',
        completed: false
      },
      {
        id: 's3_10',
        subCategoryEn: 'Windows',
        subCategoryHi: 'खिड़कियां',
        titleEn: 'Window curtains are clean.',
        titleHi: 'खिड़की के पर्दे साफ हैं।',
        completed: false
      },
      // Doors
      {
        id: 's3_11',
        subCategoryEn: 'Doors',
        subCategoryHi: 'दरवाजे',
        titleEn: 'Room entrance door is clean.',
        titleHi: 'कमरे का मुख्य दरवाजा साफ है।',
        completed: false
      },
      {
        id: 's3_12',
        subCategoryEn: 'Doors',
        subCategoryHi: 'दरवाजे',
        titleEn: 'Bathroom door is clean.',
        titleHi: 'बाथरूम का दरवाजा साफ है।',
        completed: false
      },
      {
        id: 's3_13',
        subCategoryEn: 'Doors',
        subCategoryHi: 'दरवाजे',
        titleEn: 'Door frames are clean.',
        titleHi: 'दरवाजे के फ्रेम साफ हैं।',
        completed: false
      },
      // Bed Cleanliness Check
      {
        id: 's3_14',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Bed frame is clean.',
        titleHi: 'बेड फ्रेम साफ है।',
        completed: false
      },
      {
        id: 's3_15',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Pillow is clean.',
        titleHi: 'तकिया साफ है।',
        completed: false
      },
      {
        id: 's3_16',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Pillow cover is clean.',
        titleHi: 'तकिए का कवर साफ है।',
        completed: false
      },
      {
        id: 's3_17',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Bedsheet is clean.',
        titleHi: 'बेडशीट साफ है।',
        completed: false
      },
      {
        id: 's3_18',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Blanket/Duvet is clean.',
        titleHi: 'कंबल/रजाई साफ़ है।',
        completed: false
      },
      {
        id: 's3_19',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Reading light is clean.',
        titleHi: 'रीडिंग लाइट साफ है।',
        completed: false
      },
      {
        id: 's3_20',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'No stains observed.',
        titleHi: 'कोई दाग-धब्बे नहीं दिखे।',
        completed: false
      },
      {
        id: 's3_21',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Charging station is clean.',
        titleHi: 'चार्जिंग स्टेशन साफ है।',
        completed: false
      },
      {
        id: 's3_22',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Privacy curtain is clean - Dorms.',
        titleHi: 'गोपनीयता का पर्दा (प्राइवेसी कर्टेन) साफ है (डॉर्म्स)।',
        completed: false
      },
      {
        id: 's3_23',
        subCategoryEn: 'Bed Cleanliness Check',
        subCategoryHi: 'बिस्तर की सफाई की जांच',
        titleEn: 'Under Bed Drawer is clean.',
        titleHi: 'बेड के नीचे की दराज साफ है।',
        completed: false
      },
      // Bathroom Cleanliness Check
      {
        id: 's3_24',
        subCategoryEn: 'Bathroom Cleanliness Check',
        subCategoryHi: 'बाथरूम की सफाई की जांच',
        titleEn: 'Bathroom floor is clean, wall tiles clean, toilet sanitized, wash basin clean, no smell, exhaust fan working.',
        titleHi: 'बाथरूम का फर्श साफ है, दीवार की टाइलें साफ हैं, टॉयलेट सैनिटाइज्ड है, वॉश बेसिन साफ है, कोई बदबू नहीं है और एग्जॉस्ट फैन चालू है।',
        completed: false
      }
    ]
  },
  {
    id: 4,
    titleEn: '4. Corridors Cleanliness',
    titleHi: '4. गलियारों की सफाई',
    descriptionEn: 'Corridor floors, walls, ceiling, windows, and dustbins.',
    descriptionHi: 'गलियारे के फर्श, दीवारें, छत, जाले, खिड़कियां और कूड़ेदान खाली किए गए।',
    type: 'checklist',
    responseType: 'Cleaned',
    tasks: [
      {
        id: 's4_1',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Corridor floors cleaned.',
        titleHi: 'गलियारे के फर्श साफ किए गए।',
        completed: false
      },
      {
        id: 's4_2',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Corridor walls are clean.',
        titleHi: 'गलियारे की दीवारें साफ हैं।',
        completed: false
      },
      {
        id: 's4_3',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Corridor ceiling is clean.',
        titleHi: 'गलियारे की छत साफ है।',
        completed: false
      },
      {
        id: 's4_4',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'No cobwebs present.',
        titleHi: 'मकड़ी के जाले मौजूद नहीं हैं।',
        completed: false
      },
      {
        id: 's4_5',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Windows are cleaned.',
        titleHi: 'खिड़कियां साफ की गई हैं।',
        completed: false
      },
      {
        id: 's4_6',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Dustbins emptied.',
        titleHi: 'कूड़ेदान खाली कर दिए गए हैं।',
        completed: false
      }
    ]
  },
  {
    id: 5,
    titleEn: '5. Restaurant / Cafe Cleanliness',
    titleHi: '5. रेस्तरां/कैफे की सफाई',
    descriptionEn: 'Seating, tables, racks, plants, book shelves, ceiling fans, outdoor area, and fireplace.',
    descriptionHi: 'आम बैठने की जगह, मेजें, रैक, इनडोर पौधे, कूड़ेदान, पंखे, लाइटें, आउटडोर और अंगीठी क्षेत्र।',
    type: 'checklist',
    responseType: 'Cleaned',
    tasks: [
      {
        id: 's5_1',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Common seating cleaned.',
        titleHi: 'आम बैठने की जगह साफ की गई।',
        completed: false
      },
      {
        id: 's5_2',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Tables cleaned.',
        titleHi: 'मेजें साफ की गईं।',
        completed: false
      },
      {
        id: 's5_3',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Racks cleaned.',
        titleHi: 'रैक साफ किया गया।',
        completed: false
      },
      {
        id: 's5_4',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Indoor plants cleaned.',
        titleHi: 'इनडोर पौधे साफ किए गए।',
        completed: false
      },
      {
        id: 's5_5',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Dustbins emptied.',
        titleHi: 'कूड़ेदान खाली कर दिए गए।',
        completed: false
      },
      {
        id: 's5_6',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Floors cleaned.',
        titleHi: 'फर्श साफ किए गए।',
        completed: false
      },
      {
        id: 's5_7',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Windows cleaned.',
        titleHi: 'खिड़कियां साफ की गईं।',
        completed: false
      },
      {
        id: 's5_8',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Curtains cleaned.',
        titleHi: 'पर्दे साफ किए गए।',
        completed: false
      },
      {
        id: 's5_9',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Common area smells fresh.',
        titleHi: 'आम क्षेत्र में ताजी महक आ रही है।',
        completed: false
      },
      {
        id: 's5_10',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Book Shelves Cleaned.',
        titleHi: 'किताबों के शेल्फ साफ किए गए।',
        completed: false
      },
      {
        id: 's5_11',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Ceiling Fan Cleaned.',
        titleHi: 'छत का पंखा साफ किया गया।',
        completed: false
      },
      {
        id: 's5_12',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Ceiling lights Cleaned.',
        titleHi: 'छत की लाइटें साफ की गईं।',
        completed: false
      },
      {
        id: 's5_13',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Cobwebs Cleaned.',
        titleHi: 'जाले साफ किए गए।',
        completed: false
      },
      {
        id: 's5_14',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Corner Shelves Cleaned.',
        titleHi: 'कोने के शेल्फ साफ किए गए।',
        completed: false
      },
      {
        id: 's5_15',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Reception Counter Clean.',
        titleHi: 'रिसेप्शन काउंटर साफ है।',
        completed: false
      },
      {
        id: 's5_16',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Outdoor Area Clean.',
        titleHi: 'बाहरी क्षेत्र (आउटडोर) साफ है।',
        completed: false
      },
      {
        id: 's5_17',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Fireplace Area Clean.',
        titleHi: 'फायरप्लेस (अंगीठी) क्षेत्र साफ है।',
        completed: false
      },
      {
        id: 's5_18',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Ash Tray Cleaned.',
        titleHi: 'ऐश ट्रे साफ की गई।',
        completed: false
      }
    ]
  },
  {
    id: 6,
    titleEn: '6. Reception Cleanliness',
    titleHi: '6. रिसेप्शन की सफाई',
    descriptionEn: 'Front desk, computer, guest seating, glass doors, floor mats, dustbins, Wi-Fi area, and racks.',
    descriptionHi: 'रिसेप्शन डेस्क, कंप्यूटर क्षेत्र, प्रवेश द्वार का कांच, पायदान, कूड़ेदान और वाई-फाई क्षेत्र।',
    type: 'checklist',
    responseType: 'Cleaned',
    tasks: [
      {
        id: 's6_1',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Reception desk cleaned.',
        titleHi: 'रिसेप्शन डेस्क साफ किया गया।',
        completed: false
      },
      {
        id: 's6_2',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Guest seating cleaned.',
        titleHi: 'मेहमानों के बैठने की जगह साफ की गई।',
        completed: false
      },
      {
        id: 's6_3',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Computer area dust-free.',
        titleHi: 'कंप्यूटर क्षेत्र धूल मुक्त है।',
        completed: false
      },
      {
        id: 's6_4',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Floor cleaned.',
        titleHi: 'फर्श साफ किया गया।',
        completed: false
      },
      {
        id: 's6_5',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Entrance glass cleaned.',
        titleHi: 'प्रवेश द्वार का कांच साफ किया गया।',
        completed: false
      },
      {
        id: 's6_6',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Floor mats cleaned.',
        titleHi: 'फर्श के पायदान (मैट्स) साफ किए गए।',
        completed: false
      },
      {
        id: 's6_7',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Dustbins emptied.',
        titleHi: 'कूड़ेदान खाली कर दिए गए।',
        completed: false
      },
      {
        id: 's6_8',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Wifi & Camera Area Clean.',
        titleHi: 'वाई-फाई और कैमरा क्षेत्र साफ है।',
        completed: false
      },
      {
        id: 's6_9',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Racks Organized & Cleaned.',
        titleHi: 'रैक व्यवस्थित और साफ किए गए।',
        completed: false
      }
    ]
  },
  {
    id: 7,
    titleEn: '7. Yoga Hall Cleanliness',
    titleHi: '7. योग हॉल की सफाई',
    descriptionEn: 'Yoga Hall floor, mats, cushions/bolsters, mirrors, windows, sound system, and fixtures.',
    descriptionHi: 'योग हॉल का फर्श, योग मैट, तकिये/बोल्स्टर, शीशे, खिड़कियां और साउंड सिस्टम।',
    type: 'checklist',
    responseType: 'Cleaned',
    tasks: [
      {
        id: 's7_1',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Yoga Hall floor cleaned.',
        titleHi: 'योग हॉल का फर्श साफ किया गया।',
        completed: false
      },
      {
        id: 's7_2',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Yoga mats cleaned and arranged properly.',
        titleHi: 'योग मैट साफ किए गए और ठीक से व्यवस्थित किए गए।',
        completed: false
      },
      {
        id: 's7_3',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Cushions/Bolsters organized.',
        titleHi: 'तकिए/बोल्स्टर व्यवस्थित किए गए।',
        completed: false
      },
      {
        id: 's7_4',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Mirrors cleaned.',
        titleHi: 'शीशे साफ किए गए।',
        completed: false
      },
      {
        id: 's7_5',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Windows cleaned.',
        titleHi: 'खिड़कियां साफ की गईं।',
        completed: false
      },
      {
        id: 's7_6',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Walls are dust-free.',
        titleHi: 'दीवारों पर धूल नहीं है।',
        completed: false
      },
      {
        id: 's7_7',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Sound system/Music area clean.',
        titleHi: 'साउंड सिस्टम/म्यूजिक एरिया साफ है।',
        completed: false
      },
      {
        id: 's7_8',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Hall smells fresh.',
        titleHi: 'हॉल में ताजी महक आ रही है।',
        completed: false
      },
      {
        id: 's7_9',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Fans / Air Conditioner cleaned.',
        titleHi: 'पंखे / एयर कंडीशनर साफ किए गए।',
        completed: false
      },
      {
        id: 's7_10',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Lights & fixtures clean.',
        titleHi: 'लाइट्स और फिक्स्चर साफ हैं।',
        completed: false
      }
    ]
  },
  {
    id: 8,
    titleEn: '8. Staircase & Handrail Cleanliness',
    titleHi: '8. सीढ़ियों और रेलिंग की सफाई',
    descriptionEn: 'Steps swept/mopped, handrails wiped, corners clear of clutter, marks, and clutter-free passage.',
    descriptionHi: 'सीढ़ियों का फर्श, रेलिंग/हैंडरेल, कोने, दीवारें, खिड़कियां, ग्रिल और कबाड़ मुक्त सीढ़ी।',
    type: 'checklist',
    responseType: 'Cleaned',
    tasks: [
      {
        id: 's8_1',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Staircase floor swept and mopped.',
        titleHi: 'सीढ़ियों का फर्श साफ और पोछा लगाया गया।',
        completed: false
      },
      {
        id: 's8_2',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Staircase handrail cleaned and wiped.',
        titleHi: 'सीढ़ी की रेलिंग/हैंडरेल साफ की गई और पोंछी गई।',
        completed: false
      },
      {
        id: 's8_3',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Staircase corners are dust-free.',
        titleHi: 'सीढ़ियों के कोने धूल-मुक्त हैं।',
        completed: false
      },
      {
        id: 's8_4',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'No stains or markings on staircase walls.',
        titleHi: 'सीढ़ियों की दीवारों पर कोई दाग या लिखावट नहीं है।',
        completed: false
      },
      {
        id: 's8_5',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Staircase windows and grills cleaned.',
        titleHi: 'सीढ़ियों की खिड़कियां और ग्रिल साफ किए गए।',
        completed: false
      },
      {
        id: 's8_6',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Staircase lights are clean.',
        titleHi: 'सीढ़ियों की लाइटें साफ हैं।',
        completed: false
      },
      {
        id: 's8_7',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'No clutter or items kept on the staircase.',
        titleHi: 'कोई कबाड़ या सामान सीढ़ियों पर नहीं रखा है।',
        completed: false
      }
    ]
  },
  {
    id: 9,
    titleEn: '9. Common Washroom Cleanliness',
    titleHi: '9. साझा वॉशरूम की सफाई',
    descriptionEn: 'Washroom floor, basins, toilet sanitized, soap dispenser, towels, and exhaust.',
    descriptionHi: 'साझा वॉशरूम फर्श, बेसिन, टॉयलेट सीट, साबुन/हैंडवाश, टॉयलेट पेपर, तौलिया और एग्जॉस्ट फैन।',
    type: 'checklist',
    responseType: 'Cleaned',
    tasks: [
      {
        id: 's9_1',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Common washroom floor is clean and dry.',
        titleHi: 'साझा वॉशरूम का फर्श साफ और सूखा है।',
        completed: false
      },
      {
        id: 's9_2',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Wash basin and faucets cleaned.',
        titleHi: 'वॉश बेसिन और नल साफ किए गए।',
        completed: false
      },
      {
        id: 's9_3',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Toilet bowl and seat sanitized.',
        titleHi: 'टॉयलेट बाउल और सीट सैनिटाइज की गई।',
        completed: false
      },
      {
        id: 's9_4',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Mirror cleaned.',
        titleHi: 'शीशा साफ किया गया।',
        completed: false
      },
      {
        id: 's9_5',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Soap/Handwash dispenser refilled.',
        titleHi: 'साबुन/हैंडवाश डिपेन्सर भरा हुआ है।',
        completed: false
      },
      {
        id: 's9_6',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Toilet paper/tissue available.',
        titleHi: 'टॉयलेट पेपर/टिश्यू उपलब्ध है।',
        completed: false
      },
      {
        id: 's9_7',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Hand towel clean or replaced.',
        titleHi: 'तौलिया/हैंड टॉवल साफ है या बदला गया।',
        completed: false
      },
      {
        id: 's9_8',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Dustbin emptied and liner replaced.',
        titleHi: 'कूड़ेदान खाली किया गया और नई थैली लगाई गई।',
        completed: false
      },
      {
        id: 's9_9',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'No foul smell in washroom.',
        titleHi: 'वॉशरूम में कोई बदबू नहीं है।',
        completed: false
      },
      {
        id: 's9_10',
        subCategoryEn: 'Check',
        subCategoryHi: 'जांच',
        titleEn: 'Exhaust fan working and clean.',
        titleHi: 'एग्जॉस्ट फैन चालू है और साफ है।',
        completed: false
      }
    ]
  },
  {
    id: 10,
    titleEn: '10. Cleanliness Issues & Corrective Actions',
    titleHi: '10. सफाई के मुद्दे और सुधारात्मक कार्रवाइयां',
    descriptionEn: 'Issues identified, corrective action taken, action assignee, status, and remarks.',
    descriptionHi: 'पहचाने गए सफाई के मुद्दे, की गई सुधारात्मक कार्रवाई, किसके द्वारा कार्रवाई की गई, स्थिति और अंतिम टिप्पणियां।',
    type: 'issues'
  }
];
