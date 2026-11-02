import { TaskItem } from '../types';

export const ROOM_AREAS = [
  { id: '101', name: 'Room 101', nameHi: 'कमरा 101', type: 'room' },
  { id: '102', name: 'Room 102', nameHi: 'कमरा 102', type: 'room' },
  { id: '103', name: 'Room 103', nameHi: 'कमरा 103', type: 'room' },
  { id: '104', name: 'Room 104', nameHi: 'कमरा 104', type: 'room' },
  { id: '105', name: 'Room 105', nameHi: 'कमरा 105', type: 'room' },
  { id: '106', name: 'Room 106', nameHi: 'कमरा 106', type: 'room' },
  { id: '107', name: 'Room 107', nameHi: 'कमरा 107', type: 'room' },
  { id: '201', name: 'Room 201', nameHi: 'कमरा 201', type: 'room' },
  { id: '202', name: 'Room 202', nameHi: 'कमरा 202', type: 'room' },
  { id: '203', name: 'Room 203', nameHi: 'कमरा 203', type: 'room' },
  { id: '204', name: 'Room 204', nameHi: 'कमरा 204', type: 'room' },
  { id: '205', name: 'Room 205', nameHi: 'कमरा 205', type: 'room' },
  { id: '206', name: 'Room 206', nameHi: 'कमरा 206', type: 'room' },
  { id: '207', name: 'Room 207', nameHi: 'कमरा 207', type: 'room' },
  { id: '301', name: 'Room 301', nameHi: 'कमरा 301', type: 'room' },
  { id: '302', name: 'Room 302', nameHi: 'कमरा 302', type: 'room' },
  { id: '303', name: 'Room 303', nameHi: 'कमरा 303', type: 'room' },
  { id: '304', name: 'Room 304', nameHi: 'कमरा 304', type: 'room' },
  { id: '305', name: 'Room 305', nameHi: 'कमरा 305', type: 'room' },
  { id: '306', name: 'Room 306', nameHi: 'कमरा 306', type: 'room' },
  { id: '307', name: 'Room 307', nameHi: 'कमरा 307', type: 'room' },
  { id: 'dorm_hall', name: 'Dorm Hall', nameHi: 'डॉर्म हॉल', type: 'dorm' },
  { id: 'floor_1', name: 'First Floor', nameHi: 'पहली मंज़िल', type: 'corridor' },
  { id: 'floor_2', name: 'Second Floor', nameHi: 'दूसरी मंज़िल', type: 'corridor' },
  { id: 'floor_3', name: 'Third Floor', nameHi: 'तीसरी मंज़िल', type: 'corridor' },
  { id: 'floor_4', name: 'Fourth Floor', nameHi: 'चौथी मंज़िल', type: 'corridor' },
  { id: 'terrace', name: 'Terrace', nameHi: 'छत', type: 'general' },
  { id: 'reception', name: 'Reception', nameHi: 'रिसेप्शन', type: 'reception' },
  { id: 'yoga_hall', name: 'Yoga Hall', nameHi: 'योग हॉल', type: 'yoga' },
  { id: 'cafe_outdoor', name: 'Cafe Outdoor', nameHi: 'कैफ़े आउटडोर', type: 'cafe' },
  { id: 'cafe_indoor', name: 'Cafe Indoor', nameHi: 'कैफ़े के अंदर', type: 'cafe' },
  { id: 'common_washroom', name: 'Common Washroom', nameHi: 'साझा वॉशरूम', type: 'washroom' },
  { id: 'staircase', name: 'Staircase', nameHi: 'सीढ़ी', type: 'staircase' },
];

export const STAFF_MEMBERS = [
  { id: 'subhash', name: 'Subhash', nameHi: 'सुभाष', avatar: '👨' },
  { id: 'ajeet', name: 'Ajeet', nameHi: 'अजीत', avatar: '👨‍🦱' },
  { id: 'mithun', name: 'Mithun', nameHi: 'मिथुन', avatar: '👨' },
  { id: 'karan', name: 'Karan', nameHi: 'करण', avatar: '👨' },
  { id: 'anand', name: 'Anand', nameHi: 'आनंद', avatar: '👨‍🦱' },
  { id: 'akash', name: 'Akash', nameHi: 'आकाश', avatar: '👨' },
];

export const INITIAL_ROOM_TASKS: TaskItem[] = [
  // General Cleaning
  {
    id: 'room_floor',
    category: 'General Cleaning',
    categoryHi: 'साधारण सफाई',
    titleEn: 'Room floor swept and mopped properly',
    titleHi: 'कमरे के फर्श पर झाड़ू और पोंछा लगाया गया',
    iconName: 'Sparkles',
    completed: false,
  },
  {
    id: 'room_corners',
    category: 'General Cleaning',
    categoryHi: 'साधारण सफाई',
    titleEn: 'Corners and under furniture cleaned thoroughly',
    titleHi: 'कोनों की ठीक से सफाई की गई',
    iconName: 'CornerDownRight',
    completed: false,
  },
  {
    id: 'room_walls_cobwebs',
    category: 'General Cleaning',
    categoryHi: 'साधारण सफाई',
    titleEn: 'Walls clean & no cobwebs present anywhere',
    titleHi: 'दीवारें साफ हैं और कहीं भी मकड़ी के जाले नहीं हैं',
    iconName: 'ShieldCheck',
    completed: false,
  },
  {
    id: 'room_fragrance',
    category: 'General Cleaning',
    categoryHi: 'साधारण सफाई',
    titleEn: 'Room smells fresh and ventilated',
    titleHi: 'कमरे में ताज़ा महक आ रही है',
    iconName: 'Wind',
    completed: false,
  },

  // Bed Cleanliness
  {
    id: 'bed_linen',
    category: 'Bed Cleanliness',
    categoryHi: 'बिस्तर की सफाई',
    titleEn: 'Fresh bedsheet & pillow covers changed properly',
    titleHi: 'साफ बेडशीट और तकिये का कवर बदला गया',
    iconName: 'BedDouble',
    completed: false,
  },
  {
    id: 'bed_blanket',
    category: 'Bed Cleanliness',
    categoryHi: 'बिस्तर की सफाई',
    titleEn: 'Blanket / Duvet is neat, folded, and clean',
    titleHi: 'कंबल या रजाई साफ है और अच्छी तरह तह की गई है',
    iconName: 'Layers',
    completed: false,
  },
  {
    id: 'bed_frame_lights',
    category: 'Bed Cleanliness',
    categoryHi: 'बिस्तर की सफाई',
    titleEn: 'Bed frame, charging station & reading light wiped',
    titleHi: 'बेड फ्रेम, चार्जिंग स्टेशन और रीडिंग लाइट साफ है',
    iconName: 'Lamp',
    completed: false,
  },

  // Bathroom Cleanliness
  {
    id: 'bath_toilet',
    category: 'Bathroom Cleanliness',
    categoryHi: 'बाथरूम की सफाई',
    titleEn: 'Toilet bowl, seat and lid thoroughly sanitized',
    titleHi: 'टॉयलेट सीट और बाउल सैनिटाइज किया गया',
    iconName: 'Bath',
    completed: false,
  },
  {
    id: 'bath_basin_mirror',
    category: 'Bathroom Cleanliness',
    categoryHi: 'बाथरूम की सफाई',
    titleEn: 'Wash basin, faucets & mirror wiped spotless',
    titleHi: 'वॉश बेसिन, नल और शीशा साफ किया गया',
    iconName: 'Droplets',
    completed: false,
  },
  {
    id: 'bath_floor_dry',
    category: 'Bathroom Cleanliness',
    categoryHi: 'बाथरूम की सफाई',
    titleEn: 'Bathroom floor cleaned and wiped dry with wiper',
    titleHi: 'बाथरूम का फर्श साफ और सूखा है',
    iconName: 'Flame',
    completed: false,
  },
  {
    id: 'bath_supplies',
    category: 'Bathroom Cleanliness',
    categoryHi: 'बाथरूम की सफाई',
    titleEn: 'Handwash refilled & fresh toilet paper stocked',
    titleHi: 'हैंडवॉश भरा गया और टॉयलेट पेपर उपलब्ध है',
    iconName: 'PackageCheck',
    completed: false,
  },

  // Dustbins & Fixtures
  {
    id: 'dustbin_empty',
    category: 'Waste & Windows',
    categoryHi: 'कूड़ेदान और खिड़कियां',
    titleEn: 'Dustbins emptied, washed, and new liner replaced',
    titleHi: 'कूड़ेदान खाली किए गए और नई थैली लगाई गई',
    iconName: 'Trash2',
    completed: false,
  },
  {
    id: 'windows_glass',
    category: 'Waste & Windows',
    categoryHi: 'कूड़ेदान और खिड़कियां',
    titleEn: 'Window glass, frames, and curtains clean',
    titleHi: 'खिड़की का कांच, फ्रेम और पर्दे साफ हैं',
    iconName: 'SunMedium',
    completed: false,
  },
  {
    id: 'ac_fans',
    category: 'Appliances',
    categoryHi: 'उपकरण',
    titleEn: 'Ceiling fan & Air Conditioner filter wiped clean and tested',
    titleHi: 'छत के पंखे और एयर कंडीशनर (AC) साफ किए गए और चालू हैं',
    iconName: 'Fan',
    completed: false,
  },
];

// Area-specific checklist tasks generator
export function getTasksForArea(areaId: string): TaskItem[] {
  const area = ROOM_AREAS.find(a => a.id === areaId);
  const type = area ? area.type : 'room';

  if (type === 'dorm') {
    return [
      {
        id: 'dorm_floor',
        category: 'Dorm Hallway & Floor',
        categoryHi: 'डॉर्म का फर्श और गलियारा',
        titleEn: 'Dorm floor swept and mopped thoroughly',
        titleHi: 'डॉर्म के फर्श पर झाड़ू और पोंछा लगाया गया',
        iconName: 'Sparkles',
        completed: false,
      },
      {
        id: 'dorm_shoes',
        category: 'Dorm Hallway & Floor',
        categoryHi: 'डॉर्म का फर्श और गलियारा',
        titleEn: 'Shoe rack wiped clean and neatly arranged',
        titleHi: 'जूतों का रैक साफ है और व्यवस्थित है',
        iconName: 'Layers',
        completed: false,
      },
      {
        id: 'dorm_bunks',
        category: 'Bunk Beds',
        categoryHi: 'बंक बेड',
        titleEn: 'All bunk beds made with fresh linen & folded blankets',
        titleHi: 'सभी बंक बेड पर साफ चादर और कंबल लगाए गए',
        iconName: 'BedDouble',
        completed: false,
      },
      {
        id: 'dorm_curtains',
        category: 'Bunk Beds',
        categoryHi: 'बंक बेड',
        titleEn: 'Privacy curtains wiped and operating smoothly',
        titleHi: 'गोपनीयता का पर्दा (प्राइवेसी कर्टेन) साफ है',
        iconName: 'Layers',
        completed: false,
      },
      {
        id: 'dorm_drawers',
        category: 'Bunk Beds',
        categoryHi: 'बंक बेड',
        titleEn: 'Under-bed locker drawers cleaned and dusted',
        titleHi: 'बेड के नीचे की दराज साफ है',
        iconName: 'Archive',
        completed: false,
      },
      {
        id: 'dorm_dustbin',
        category: 'Cleanliness',
        categoryHi: 'सफाई',
        titleEn: 'Main dorm dustbins emptied and fresh liner placed',
        titleHi: 'कूड़ेदान खाली किए गए और नई थैली लगाई गई',
        iconName: 'Trash2',
        completed: false,
      },
      {
        id: 'dorm_smell',
        category: 'Cleanliness',
        categoryHi: 'सफाई',
        titleEn: 'Dorm smells fresh and Air Conditioner / exhaust running well',
        titleHi: 'डॉर्म में ताज़ा महक आ रही है और एयर कंडीशनर चालू है',
        iconName: 'Wind',
        completed: false,
      }
    ];
  }

  if (type === 'cafe') {
    return [
      {
        id: 'cafe_seating',
        category: 'Seating & Tables',
        categoryHi: 'बैठने की जगह और मेजें',
        titleEn: 'Common seating & dining chairs sanitized and wiped',
        titleHi: 'आम बैठने की जगह और कुर्सियां साफ की गईं',
        iconName: 'Armchair',
        completed: false,
      },
      {
        id: 'cafe_tables',
        category: 'Seating & Tables',
        categoryHi: 'बैठने की जगह और मेजें',
        titleEn: 'Tables wiped spotless with sanitizing spray',
        titleHi: 'मेजें अच्छी तरह साफ की गईं',
        iconName: 'Sparkles',
        completed: false,
      },
      {
        id: 'cafe_floor',
        category: 'Floor & Area',
        categoryHi: 'फर्श और क्षेत्र',
        titleEn: 'Cafe floor swept and mopped thoroughly',
        titleHi: 'कैफ़े के फर्श पर झाड़ू और पोंछा लगाया गया',
        iconName: 'Sparkles',
        completed: false,
      },
      {
        id: 'cafe_ashtray',
        category: 'Floor & Area',
        categoryHi: 'फर्श और क्षेत्र',
        titleEn: 'Ashtrays cleaned, washed, and placed back',
        titleHi: 'ऐश ट्रे साफ की गई',
        iconName: 'Flame',
        completed: false,
      },
      {
        id: 'cafe_plants',
        category: 'Decor & Plants',
        categoryHi: 'पौधे और सजावट',
        titleEn: 'Indoor plants dusted and surrounding area cleaned',
        titleHi: 'इंडोर पौधे साफ किए गए',
        iconName: 'Flower2',
        completed: false,
      },
      {
        id: 'cafe_dustbins',
        category: 'Waste Management',
        categoryHi: 'कूड़ा प्रबंधन',
        titleEn: 'All cafe dustbins emptied and replaced with clean bags',
        titleHi: 'कूड़ेदान खाली कर दिए गए और नई थैली लगाई गई',
        iconName: 'Trash2',
        completed: false,
      },
      {
        id: 'cafe_books',
        category: 'Shelves & Lights',
        categoryHi: 'शेल्फ और लाइटें',
        titleEn: 'Book shelves organized and dust-free',
        titleHi: 'किताबों के शेल्फ साफ और व्यवस्थित किए गए',
        iconName: 'BookOpen',
        completed: false,
      },
    ];
  }

  if (type === 'reception') {
    return [
      {
        id: 'rec_desk',
        category: 'Front Desk',
        categoryHi: 'फ्रंट डेस्क',
        titleEn: 'Reception desk and counter wiped spotless',
        titleHi: 'रिसेप्शन डेस्क और काउंटर साफ किया गया',
        iconName: 'Sparkles',
        completed: false,
      },
      {
        id: 'rec_computers',
        category: 'Front Desk',
        categoryHi: 'फ्रंट डेस्क',
        titleEn: 'Computer screen, keyboard, and cables dust-free',
        titleHi: 'कंप्यूटर क्षेत्र धूल मुक्त है',
        iconName: 'Monitor',
        completed: false,
      },
      {
        id: 'rec_seating',
        category: 'Lounge Area',
        categoryHi: 'लाउंज क्षेत्र',
        titleEn: 'Guest seating area arranged and vacuumed/wiped',
        titleHi: 'मेहमानों के बैठने की जगह साफ की गई',
        iconName: 'Armchair',
        completed: false,
      },
      {
        id: 'rec_glass',
        category: 'Entrance',
        categoryHi: 'प्रवेश द्वार',
        titleEn: 'Main entrance glass doors wiped crystal clear',
        titleHi: 'प्रवेश द्वार का कांच साफ किया गया',
        iconName: 'SunMedium',
        completed: false,
      },
      {
        id: 'rec_floor_mats',
        category: 'Entrance',
        categoryHi: 'प्रवेश द्वार',
        titleEn: 'Floor mopped and welcome mats dusted clean',
        titleHi: 'फर्श और पायदान (मैट्स) साफ किए गए',
        iconName: 'Sparkles',
        completed: false,
      },
      {
        id: 'rec_dustbin',
        category: 'Waste',
        categoryHi: 'कूड़ा',
        titleEn: 'Reception dustbin emptied and liner changed',
        titleHi: 'कूड़ेदान खाली कर दिए गए',
        iconName: 'Trash2',
        completed: false,
      }
    ];
  }

  if (type === 'yoga') {
    return [
      {
        id: 'yoga_floor',
        category: 'Yoga Floor',
        categoryHi: 'योग फर्श',
        titleEn: 'Yoga hall floor swept and mopped clean',
        titleHi: 'योग हॉल का फर्श साफ किया गया',
        iconName: 'Sparkles',
        completed: false,
      },
      {
        id: 'yoga_mats',
        category: 'Equipment',
        categoryHi: 'उपकरण',
        titleEn: 'Yoga mats wiped with disinfectant spray and rolled neatly',
        titleHi: 'योग मैट साफ किए गए और ठीक से व्यवस्थित किए गए',
        iconName: 'Layers',
        completed: false,
      },
      {
        id: 'yoga_cushions',
        category: 'Equipment',
        categoryHi: 'उपकरण',
        titleEn: 'Cushions and bolsters neatly stacked on shelves',
        titleHi: 'तकिये और बोल्स्टर व्यवस्थित किए गए',
        iconName: 'BedDouble',
        completed: false,
      },
      {
        id: 'yoga_mirrors',
        category: 'Hall Atmosphere',
        categoryHi: 'हॉल का वातावरण',
        titleEn: 'Wall mirrors cleaned with glass cleaner',
        titleHi: 'शीशे साफ किए गए',
        iconName: 'SunMedium',
        completed: false,
      },
      {
        id: 'yoga_music',
        category: 'Hall Atmosphere',
        categoryHi: 'हॉल का वातावरण',
        titleEn: 'Sound system area clean and hall smells calming & fresh',
        titleHi: 'साउंड सिस्टम क्षेत्र साफ है और हॉल में ताज़ा महक आ रही है',
        iconName: 'Music',
        completed: false,
      },
    ];
  }

  if (type === 'staircase') {
    return [
      {
        id: 'stair_floor',
        category: 'Staircase Steps',
        categoryHi: 'सीढ़ियों के कदम',
        titleEn: 'Staircase steps swept and mopped from top to bottom',
        titleHi: 'सीढ़ियों का फर्श साफ और पोंछा लगाया गया',
        iconName: 'Sparkles',
        completed: false,
      },
      {
        id: 'stair_handrail',
        category: 'Handrail',
        categoryHi: 'रेलिंग',
        titleEn: 'Staircase handrail / railing wiped clean and sanitized',
        titleHi: 'सीढ़ी की रेलिंग/हैंडरेल साफ की गई और पोंछी गई',
        iconName: 'ShieldCheck',
        completed: false,
      },
      {
        id: 'stair_corners',
        category: 'Corners & Walls',
        categoryHi: 'कोने और दीवारें',
        titleEn: 'Corners dust-free, no cobwebs or wall marks',
        titleHi: 'सीढ़ियों के कोने धूल-मुक्त हैं और कोई जाले नहीं हैं',
        iconName: 'CornerDownRight',
        completed: false,
      },
      {
        id: 'stair_no_clutter',
        category: 'Safety & Passage',
        categoryHi: 'सुरक्षा और मार्ग',
        titleEn: 'Passage completely clear of clutter, trash, or shoes',
        titleHi: 'कोई कबाड़ या सामान सीढ़ियों पर नहीं रखा है',
        iconName: 'PackageCheck',
        completed: false,
      },
    ];
  }

  if (type === 'washroom') {
    return [
      {
        id: 'comm_toilet',
        category: 'Sanitation',
        categoryHi: 'स्वच्छता',
        titleEn: 'Toilet bowl, seat and cover deeply sanitized with cleaner',
        titleHi: 'टॉयलेट बाउल और सीट सैनिटाइज की गई',
        iconName: 'Bath',
        completed: false,
      },
      {
        id: 'comm_basin',
        category: 'Sanitation',
        categoryHi: 'स्वच्छता',
        titleEn: 'Wash basins, faucets and mirrors wiped sparkling clean',
        titleHi: 'वॉश बेसिन, नल और शीशा साफ किए गए',
        iconName: 'Droplets',
        completed: false,
      },
      {
        id: 'comm_floor',
        category: 'Floors & Drains',
        categoryHi: 'फर्श और नाली',
        titleEn: 'Washroom floor washed, drained, and wiped dry',
        titleHi: 'साझा वॉशरूम का फर्श साफ और सूखा है',
        iconName: 'Sparkles',
        completed: false,
      },
      {
        id: 'comm_supplies',
        category: 'Restocking',
        categoryHi: 'सामग्री पूर्ति',
        titleEn: 'Soap / handwash dispenser refilled & toilet paper stocked',
        titleHi: 'साबुन/हैंडवॉश डिस्पेंसर भरा हुआ है और टॉयलेट पेपर उपलब्ध है',
        iconName: 'PackageCheck',
        completed: false,
      },
      {
        id: 'comm_towel_bin',
        category: 'Restocking',
        categoryHi: 'सामग्री पूर्ति',
        titleEn: 'Hand towel replaced & dustbin emptied with new liner',
        titleHi: 'तौलिया बदला गया और कूड़ेदान में नई थैली लगाई गई',
        iconName: 'Trash2',
        completed: false,
      },
      {
        id: 'comm_exhaust',
        category: 'Ventilation',
        categoryHi: 'वेंटिलेशन',
        titleEn: 'Exhaust fan running properly & room smells fresh',
        titleHi: 'एग्जॉस्ट फैन चालू है और वॉशरूम में कोई बदबू नहीं है',
        iconName: 'Wind',
        completed: false,
      },
    ];
  }

  // Default room checklist
  return INITIAL_ROOM_TASKS.map(t => ({ ...t, completed: false, hasError: false }));
}
