import { PropertyDef, PropertyId, TaskItem, FormType } from '../types';

export const PROPERTIES: Record<PropertyId, PropertyDef> = {
  landlopers: {
    id: 'landlopers',
    nameEn: 'Landlopers',
    nameHi: 'लैंडलोपर्स',
    taglineEn: 'Riverside & Hill View Hub',
    taglineHi: 'रिवरसाइड एवं हिल व्यू प्रॉपर्टी',
    iconName: 'Compass',
    badgeColor: 'bg-emerald-500 text-white border-emerald-600',
    staff: ['Jasvir', 'Rajeshwari', 'Yashodha', 'Jubin'],
    dorms: ['D1', 'D2', 'D3', 'D4'],
    privateRooms: ['R1', 'R2', 'R3', 'R4'],
    commonAreas: [
      { id: 'terrace', nameEn: 'Terrace', nameHi: 'छत (टेरेस)', formType: 'terrace', iconName: 'Sun' },
      { id: 'reception', nameEn: 'Reception', nameHi: 'रिसेप्शन', formType: 'reception', iconName: 'Store' },
      { id: 'common_washroom', nameEn: 'Common Washroom', nameHi: 'साझा वॉशरूम', formType: 'washroom', iconName: 'Bath' },
      { id: 'garden', nameEn: 'Garden', nameHi: 'बगीचा (गार्डन)', formType: 'garden', iconName: 'Trees' },
    ],
  },
  tapovan: {
    id: 'tapovan',
    nameEn: 'Tapovan',
    nameHi: 'तपोवन',
    taglineEn: 'Yoga & Mountain Valley',
    taglineHi: 'योग एवं माउंटेन वैली स्टे',
    iconName: 'Mountain',
    badgeColor: 'bg-amber-500 text-white border-amber-600',
    staff: ['Jasvir', 'Rajeshwari', 'Yashodha', 'Jubin', 'Ajay'],
    privateRooms: [
      '101', '102', '103',
      '201', '202', '203',
      '301', '302', '303',
      '401', '402', '403',
      '501', '502', '503',
      '601'
    ],
    commonAreas: [
      { id: 'floor_1', nameEn: 'First Floor', nameHi: 'पहली मंज़िल', formType: 'staircase', iconName: 'Layers' },
      { id: 'floor_2', nameEn: 'Second Floor', nameHi: 'दूसरी मंज़िल', formType: 'staircase', iconName: 'Layers' },
      { id: 'floor_3', nameEn: 'Third Floor', nameHi: 'तीसरी मंज़िल', formType: 'staircase', iconName: 'Layers' },
      { id: 'floor_4', nameEn: 'Fourth Floor', nameHi: 'चौथी मंज़िल', formType: 'staircase', iconName: 'Layers' },
      { id: 'floor_5', nameEn: 'Fifth Floor', nameHi: 'पांचवीं मंज़िल', formType: 'staircase', iconName: 'Layers' },
      { id: 'floor_6', nameEn: 'Sixth Floor', nameHi: 'छठी मंज़िल', formType: 'staircase', iconName: 'Layers' },
      { id: 'terrace', nameEn: 'Terrace', nameHi: 'छत (टेरेस)', formType: 'terrace', iconName: 'Sun' },
      { id: 'reception', nameEn: 'Reception', nameHi: 'रिसेप्शन', formType: 'reception', iconName: 'Store' },
      { id: 'common_washroom', nameEn: 'Common Washroom', nameHi: 'साझा वॉशरूम', formType: 'washroom', iconName: 'Bath' },
      { id: 'staircase', nameEn: 'Staircase', nameHi: 'सीढ़ी (स्टेयरकेस)', formType: 'staircase', iconName: 'Footprints' },
    ],
  },
  delhi: {
    id: 'delhi',
    nameEn: 'Delhi',
    nameHi: 'दिल्ली',
    taglineEn: 'Capital City Bunk Center',
    taglineHi: 'कैपिटल सिटी बंक सेंटर',
    iconName: 'Building',
    badgeColor: 'bg-indigo-500 text-white border-indigo-600',
    staff: ['Shouaib', 'Rohit', 'Sureandar'],
    dorms: ['B1', 'B2', 'B3', 'B4', 'B6', 'B7'],
    privateRooms: ['D1', 'D2', 'D3', 'D4', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    commonAreas: [
      { id: 'floor_1', nameEn: 'First Floor', nameHi: 'पहली मंज़िल', formType: 'staircase', iconName: 'Layers' },
      { id: 'floor_2', nameEn: 'Second Floor', nameHi: 'दूसरी मंज़िल', formType: 'staircase', iconName: 'Layers' },
      { id: 'terrace', nameEn: 'Terrace', nameHi: 'छत (टेरेस)', formType: 'terrace', iconName: 'Sun' },
      { id: 'reception', nameEn: 'Reception', nameHi: 'रिसेप्शन', formType: 'reception', iconName: 'Store' },
      { id: 'common_washroom', nameEn: 'Common Washroom', nameHi: 'साझा वॉशरूम', formType: 'washroom', iconName: 'Bath' },
      { id: 'staircase', nameEn: 'Staircase', nameHi: 'सीढ़ी (स्टेयरकेस)', formType: 'staircase', iconName: 'Footprints' },
    ],
  },
  rishikesh: {
    id: 'rishikesh',
    nameEn: 'Rishikesh',
    nameHi: 'ऋषिकेश',
    taglineEn: 'Holy Ganga & Serene Bunk',
    taglineHi: 'पवित्र गंगा एवं शांत बंक प्रवास',
    iconName: 'Palmtree',
    badgeColor: 'bg-teal-500 text-white border-teal-600',
    staff: ['Jasvir', 'Rajeshwari', 'Yashodha', 'Jubin'],
    dorms: ['107', '207', 'Dorm Hall'],
    privateRooms: [
      '101', '102', '103', '104', '105', '106',
      '201', '202', '203', '204', '205', '206',
      '301', '302', '303', '304', '305', '306', '307'
    ],
    commonAreas: [
      { id: 'floor_1', nameEn: 'First Floor', nameHi: 'पहली मंज़िल', formType: 'staircase', iconName: 'Layers' },
      { id: 'floor_2', nameEn: 'Second Floor', nameHi: 'दूसरी मंज़िल', formType: 'staircase', iconName: 'Layers' },
      { id: 'floor_3', nameEn: 'Third Floor', nameHi: 'तीसरी मंज़िल', formType: 'staircase', iconName: 'Layers' },
      { id: 'floor_4', nameEn: 'Fourth Floor', nameHi: 'चौथी मंज़िल', formType: 'staircase', iconName: 'Layers' },
      { id: 'terrace', nameEn: 'Terrace', nameHi: 'छत (टेरेस)', formType: 'terrace', iconName: 'Sun' },
      { id: 'reception', nameEn: 'Reception', nameHi: 'रिसेप्शन', formType: 'reception', iconName: 'Store' },
      { id: 'yoga_hall', nameEn: 'Yoga Hall', nameHi: 'योग हॉल', formType: 'yoga_hall', iconName: 'Sparkles' },
      { id: 'cafe_outdoor', nameEn: 'Cafe Outdoor', nameHi: 'कैफ़े आउटडोर', formType: 'cafe', iconName: 'Coffee' },
      { id: 'cafe_indoor', nameEn: 'Cafe Indoor', nameHi: 'कैफ़े इनडोर', formType: 'cafe', iconName: 'Coffee' },
      { id: 'common_washroom', nameEn: 'Common Washroom', nameHi: 'साझा वॉशरूम', formType: 'washroom', iconName: 'Bath' },
      { id: 'staircase', nameEn: 'Staircase', nameHi: 'सीढ़ी (स्टेयरकेस)', formType: 'staircase', iconName: 'Footprints' },
    ],
  },
};

// Base Bathroom Task List (16 items)
export const BATHROOM_TASKS: TaskItem[] = [
  {
    id: 'bath_floor_wall',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'Floor/Wall/Ceiling clean',
    titleHi: 'फर्श/दीवार/छत साफ है',
    iconName: 'Sparkles',
    completed: false,
  },
  {
    id: 'bath_seat_sanitized',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'Toilet seat sanitized',
    titleHi: 'टॉयलेट सीट सैनिटाइज्ड है',
    iconName: 'ShieldCheck',
    completed: false,
  },
  {
    id: 'bath_bowl_clean',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'Bowl clean',
    titleHi: 'टॉयलेट बाउल साफ है',
    iconName: 'Sparkles',
    completed: false,
  },
  {
    id: 'bath_basin_mirror',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'Wash basin & mirror clean',
    titleHi: 'वॉश बेसिन और शीशा साफ है',
    iconName: 'Sparkles',
    completed: false,
  },
  {
    id: 'bath_faucets',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'Faucets clean',
    titleHi: 'नल साफ की गई हैं',
    iconName: 'Droplet',
    completed: false,
  },
  {
    id: 'bath_drain_covers',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'Drain covers clean',
    titleHi: 'नाली के कवर साफ हैं',
    iconName: 'CheckCircle2',
    completed: false,
  },
  {
    id: 'bath_no_smell',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'No foul smell',
    titleHi: 'कोई बदबू नहीं है',
    iconName: 'Wind',
    completed: false,
  },
  {
    id: 'bath_no_hair',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'No hair',
    titleHi: 'बाल जमा नहीं हैं',
    iconName: 'Check',
    completed: false,
  },
  {
    id: 'bath_no_mold',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'No mold',
    titleHi: 'कोई काई नहीं',
    iconName: 'ShieldAlert',
    completed: false,
  },
  {
    id: 'bath_mat_clean',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'Mat clean',
    titleHi: 'चटाई साफ है',
    iconName: 'Layers',
    completed: false,
  },
  {
    id: 'bath_handwash_refilled',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'Handwash refilled',
    titleHi: 'हैंडवाश भरा गया',
    iconName: 'Droplet',
    completed: false,
  },
  {
    id: 'bath_bucket_mug',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'Bucket/Mug clean',
    titleHi: 'बाल्टी/मग साफ है',
    iconName: 'Sparkles',
    completed: false,
  },
  {
    id: 'bath_brush_wiper',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'Pot brush/Wiper available',
    titleHi: 'ब्रश/वाइपर उपलब्ध है',
    iconName: 'CheckCircle2',
    completed: false,
  },
  {
    id: 'bath_dustbin_clean',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'Dustbin clean',
    titleHi: 'कूड़ेदान साफ है',
    iconName: 'Trash2',
    completed: false,
  },
  {
    id: 'bath_toilet_paper',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'Toilet paper available',
    titleHi: 'टॉयलेट पेपर उपलब्ध है',
    iconName: 'FileText',
    completed: false,
  },
  {
    id: 'bath_exhaust_geyser',
    category: 'Bathroom',
    categoryHi: 'बाथरूम',
    titleEn: 'Exhaust fan/Geyser working and clean',
    titleHi: 'एग्जॉस्ट फैन/गीजर चालू और साफ है',
    iconName: 'Power',
    completed: false,
  },
];

// General Cleaning Tasks (5 items)
export const GENERAL_CLEANING_TASKS: TaskItem[] = [
  {
    id: 'gen_floor_mopped',
    category: 'General Cleaning',
    categoryHi: 'साधारण सफाई',
    titleEn: 'Floor swept and mopped',
    titleHi: 'कमरे के फ़र्श पर झाड़ू और पोंछा लगाया गया',
    iconName: 'Sparkles',
    completed: false,
  },
  {
    id: 'gen_corners_cleaned',
    category: 'General Cleaning',
    categoryHi: 'साधारण सफाई',
    titleEn: 'Corners cleaned',
    titleHi: 'कोनों की ठीक से सफाई की गई',
    iconName: 'CornerDownRight',
    completed: false,
  },
  {
    id: 'gen_walls_clean',
    category: 'General Cleaning',
    categoryHi: 'साधारण सफाई',
    titleEn: 'Walls are clean',
    titleHi: 'दीवारें साफ़ हैं',
    iconName: 'ShieldCheck',
    completed: false,
  },
  {
    id: 'gen_no_cobwebs',
    category: 'General Cleaning',
    categoryHi: 'साधारण सफाई',
    titleEn: 'No cobwebs',
    titleHi: 'कहीं भी मकड़ी के जाले नहीं हैं',
    iconName: 'ShieldCheck',
    completed: false,
  },
  {
    id: 'gen_room_smells_fresh',
    category: 'General Cleaning',
    categoryHi: 'साधारण सफाई',
    titleEn: 'Room smells fresh',
    titleHi: 'कमरे में ताज़ी महक आ रही है',
    iconName: 'Wind',
    completed: false,
  },
];

// Windows Tasks (3 items)
export const WINDOWS_TASKS: TaskItem[] = [
  {
    id: 'win_glass_clean',
    category: 'Windows',
    categoryHi: 'खिड़कियां',
    titleEn: 'Glass clean',
    titleHi: 'खिड़की का कांच साफ है',
    iconName: 'Eye',
    completed: false,
  },
  {
    id: 'win_tracks_clean',
    category: 'Windows',
    categoryHi: 'खिड़कियां',
    titleEn: 'Tracks clean',
    titleHi: 'खिड़की के ट्रैक/फ्रेम साफ हैं',
    iconName: 'Grid',
    completed: false,
  },
  {
    id: 'win_curtains_clean',
    category: 'Windows',
    categoryHi: 'खिड़कियां',
    titleEn: 'Curtains clean',
    titleHi: 'खिड़की के पर्दे साफ हैं',
    iconName: 'Layers',
    completed: false,
  },
];

// Doors Tasks (3 items)
export const DOORS_TASKS: TaskItem[] = [
  {
    id: 'door_entrance_clean',
    category: 'Doors',
    categoryHi: 'दरवाजे',
    titleEn: 'Entrance clean',
    titleHi: 'कमरे का मुख्य दरवाजा साफ है',
    iconName: 'DoorOpen',
    completed: false,
  },
  {
    id: 'door_bath_clean',
    category: 'Doors',
    categoryHi: 'दरवाजे',
    titleEn: 'Bathroom door clean',
    titleHi: 'बाथरूम का दरवाजा साफ है',
    iconName: 'DoorOpen',
    completed: false,
  },
  {
    id: 'door_frames_clean',
    category: 'Doors',
    categoryHi: 'दरवाजे',
    titleEn: 'Frames clean',
    titleHi: 'दरवाजे के फ्रेम साफ हैं',
    iconName: 'CheckCircle2',
    completed: false,
  },
];

// Furniture Tasks (9 items)
export const FURNITURE_TASKS: TaskItem[] = [
  {
    id: 'furn_tables_clean',
    category: 'Furniture',
    categoryHi: 'फर्नीचर',
    titleEn: 'Tables clean',
    titleHi: 'मेजें साफ हैं',
    iconName: 'Archive',
    completed: false,
  },
  {
    id: 'furn_chairs_clean',
    category: 'Furniture',
    categoryHi: 'फर्नीचर',
    titleEn: 'Chairs clean',
    titleHi: 'कुर्सियां साफ हैं',
    iconName: 'Armchair',
    completed: false,
  },
  {
    id: 'furn_side_tables',
    category: 'Furniture',
    categoryHi: 'फर्नीचर',
    titleEn: 'Side tables clean',
    titleHi: 'साइड टेबल साफ हैं',
    iconName: 'Box',
    completed: false,
  },
  {
    id: 'furn_cupboards_clean',
    category: 'Furniture',
    categoryHi: 'फर्नीचर',
    titleEn: 'Cupboards clean',
    titleHi: 'अलमारियां साफ की गई हैं',
    iconName: 'Folder',
    completed: false,
  },
  {
    id: 'furn_shelves_clean',
    category: 'Furniture',
    categoryHi: 'फर्नीचर',
    titleEn: 'Shelves clean',
    titleHi: 'शेल्फ साफ किए गए हैं',
    iconName: 'Layers',
    completed: false,
  },
  {
    id: 'furn_mirrors_clean',
    category: 'Furniture',
    categoryHi: 'फर्नीचर',
    titleEn: 'Mirrors clean',
    titleHi: 'शीशे साफ किए गए हैं',
    iconName: 'Sparkles',
    completed: false,
  },
  {
    id: 'furn_dustbins_liners',
    category: 'Furniture',
    categoryHi: 'फर्नीचर',
    titleEn: 'Dustbins emptied and liners replaced',
    titleHi: 'कूड़ेदान साफ किए गए और थैलियां बदली गईं',
    iconName: 'Trash2',
    completed: false,
  },
  {
    id: 'furn_ac_cleaned',
    category: 'Furniture',
    categoryHi: 'फर्नीचर',
    titleEn: 'Air Conditioner cleaned',
    titleHi: 'एयर कंडीशनर (AC) साफ किया गया है',
    iconName: 'Fan',
    completed: false,
  },
  {
    id: 'furn_ceiling_fans',
    category: 'Furniture',
    categoryHi: 'फर्नीचर',
    titleEn: 'Ceiling Fans cleaned',
    titleHi: 'छत के पंखे साफ किए गए हैं',
    iconName: 'Wind',
    completed: false,
  },
];

// Bed Base Tasks (6 items)
export const BED_BASE_TASKS: TaskItem[] = [
  {
    id: 'bed_frame_clean',
    category: 'Bed',
    categoryHi: 'बिस्तर',
    titleEn: 'Frame clean',
    titleHi: 'बेड फ्रेम साफ है',
    iconName: 'Bed',
    completed: false,
  },
  {
    id: 'bed_pillow_cover',
    category: 'Bed',
    categoryHi: 'बिस्तर',
    titleEn: 'Pillow/Cover clean',
    titleHi: 'तकिया/कवर साफ है',
    iconName: 'Sparkles',
    completed: false,
  },
  {
    id: 'bed_bedsheet_clean',
    category: 'Bed',
    categoryHi: 'बिस्तर',
    titleEn: 'Bedsheet clean',
    titleHi: 'बेडशीट साफ है',
    iconName: 'Layers',
    completed: false,
  },
  {
    id: 'bed_blanket_clean',
    category: 'Bed',
    categoryHi: 'बिस्तर',
    titleEn: 'Blanket clean',
    titleHi: 'कंबल साफ़ है',
    iconName: 'Layers',
    completed: false,
  },
  {
    id: 'bed_reading_light',
    category: 'Bed',
    categoryHi: 'बिस्तर',
    titleEn: 'Reading light clean',
    titleHi: 'रीडिंग लाइट साफ है',
    iconName: 'Lamp',
    completed: false,
  },
  {
    id: 'bed_no_stains',
    category: 'Bed',
    categoryHi: 'बिस्तर',
    titleEn: 'No stains',
    titleHi: 'कोई दाग-धब्बे नहीं दिखे',
    iconName: 'CheckCircle2',
    completed: false,
  },
];

// Dorm Specific Bed Additions (3 items)
export const DORM_EXTRA_BED_TASKS: TaskItem[] = [
  {
    id: 'dorm_charging_station',
    category: 'Bed',
    categoryHi: 'बिस्तर',
    titleEn: 'Charging station clean',
    titleHi: 'चार्जिंग स्टेशन साफ है',
    iconName: 'Zap',
    completed: false,
  },
  {
    id: 'dorm_privacy_curtain',
    category: 'Bed',
    categoryHi: 'बिस्तर',
    titleEn: 'Privacy curtain clean',
    titleHi: 'गोपनीयता का पर्दा साफ है',
    iconName: 'Layers',
    completed: false,
  },
  {
    id: 'dorm_drawer_clean',
    category: 'Bed',
    categoryHi: 'बिस्तर',
    titleEn: 'Under bed drawer clean',
    titleHi: 'बेड के नीचे की दराज साफ है',
    iconName: 'Archive',
    completed: false,
  },
];

// Corridors / Staircase / Floors Tasks
export const CORRIDOR_STAIRCASE_TASKS: TaskItem[] = [
  {
    id: 'corr_floors_stairs',
    category: 'Corridors & Stairs',
    categoryHi: 'गलियारे एवं सीढ़ियां',
    titleEn: 'Floors/Stairs clean',
    titleHi: 'गलियारे/सीढ़ियां साफ हैं',
    iconName: 'Footprints',
    completed: false,
  },
  {
    id: 'corr_walls_clean',
    category: 'Corridors & Stairs',
    categoryHi: 'गलियारे एवं सीढ़ियां',
    titleEn: 'Walls clean',
    titleHi: 'दीवारें साफ हैं',
    iconName: 'ShieldCheck',
    completed: false,
  },
  {
    id: 'corr_railings_clean',
    category: 'Corridors & Stairs',
    categoryHi: 'गलियारे एवं सीढ़ियां',
    titleEn: 'Railings clean',
    titleHi: 'रेलिंग साफ की गईं',
    iconName: 'CheckCircle2',
    completed: false,
  },
  {
    id: 'corr_no_cobwebs',
    category: 'Corridors & Stairs',
    categoryHi: 'गलियारे एवं सीढ़ियां',
    titleEn: 'No cobwebs',
    titleHi: 'मकड़ी के जाले मौजूद नहीं हैं',
    iconName: 'ShieldCheck',
    completed: false,
  },
  {
    id: 'corr_dustbins_emptied',
    category: 'Corridors & Stairs',
    categoryHi: 'गलियारे एवं सीढ़ियां',
    titleEn: 'Dustbins emptied',
    titleHi: 'कूड़ेदान खाली कर दिए गए हैं',
    iconName: 'Trash2',
    completed: false,
  },
  {
    id: 'corr_floor_mopped',
    category: 'Corridors & Stairs',
    categoryHi: 'गलियारे एवं सीढ़ियां',
    titleEn: 'Floor swept and mopped',
    titleHi: 'फ़र्श पर झाड़ू और पोंछा लगाया गया',
    iconName: 'Sparkles',
    completed: false,
  },
  {
    id: 'corr_lights_checked',
    category: 'Corridors & Stairs',
    categoryHi: 'गलियारे एवं सीढ़ियां',
    titleEn: 'Lights checked and clean',
    titleHi: 'लाइटें चालू और साफ हैं',
    iconName: 'Lamp',
    completed: false,
  },
];

// Reception Tasks
export const RECEPTION_TASKS: TaskItem[] = [
  {
    id: 'rec_desk_clean',
    category: 'Reception Area',
    categoryHi: 'रिसेप्शन क्षेत्र',
    titleEn: 'Desk clean',
    titleHi: 'रिसेप्शन डेस्क साफ किया गया',
    iconName: 'Archive',
    completed: false,
  },
  {
    id: 'rec_seating_clean',
    category: 'Reception Area',
    categoryHi: 'रिसेप्शन क्षेत्र',
    titleEn: 'Guest seating clean',
    titleHi: 'मेहमानों के बैठने की जगह साफ की गई',
    iconName: 'Armchair',
    completed: false,
  },
  {
    id: 'rec_computer_clean',
    category: 'Reception Area',
    categoryHi: 'रिसेप्शन क्षेत्र',
    titleEn: 'Computer area dust-free',
    titleHi: 'कंप्यूटर क्षेत्र धूल मुक्त है',
    iconName: 'Monitor',
    completed: false,
  },
  {
    id: 'rec_entrance_glass',
    category: 'Reception Area',
    categoryHi: 'रिसेप्शन क्षेत्र',
    titleEn: 'Entrance glass clean',
    titleHi: 'प्रवेश द्वार का कांच साफ किया गया',
    iconName: 'Eye',
    completed: false,
  },
  {
    id: 'rec_floor_mats',
    category: 'Reception Area',
    categoryHi: 'रिसेप्शन क्षेत्र',
    titleEn: 'Floor mats clean',
    titleHi: 'मैट्स साफ किए गए',
    iconName: 'Layers',
    completed: false,
  },
  {
    id: 'rec_wifi_camera',
    category: 'Reception Area',
    categoryHi: 'रिसेप्शन क्षेत्र',
    titleEn: 'Wifi & Camera area clean',
    titleHi: 'वाई-फाई और कैमरा क्षेत्र साफ है',
    iconName: 'Wifi',
    completed: false,
  },
  {
    id: 'rec_racks_organized',
    category: 'Reception Area',
    categoryHi: 'रिसेप्शन क्षेत्र',
    titleEn: 'Racks organized',
    titleHi: 'रैक व्यवस्थित और साफ किए गए',
    iconName: 'Folder',
    completed: false,
  },
  {
    id: 'rec_floor_mopped',
    category: 'Reception Area',
    categoryHi: 'रिसेप्शन क्षेत्र',
    titleEn: 'Floor swept and mopped',
    titleHi: 'फ़र्श पर झाड़ू और पोंछा लगाया गया',
    iconName: 'Sparkles',
    completed: false,
  },
  {
    id: 'rec_dustbins_emptied',
    category: 'Reception Area',
    categoryHi: 'रिसेप्शन क्षेत्र',
    titleEn: 'Dustbins emptied and liners replaced',
    titleHi: 'कूड़ेदान साफ किए गए और थैलियां बदली गईं',
    iconName: 'Trash2',
    completed: false,
  },
];

// Terrace & Garden Tasks
export const TERRACE_GARDEN_TASKS: TaskItem[] = [
  {
    id: 'out_floors_swept',
    category: 'Outdoor & Common Area',
    categoryHi: 'आउटडोर एवं साझा क्षेत्र',
    titleEn: 'Floors/Ground swept & clean',
    titleHi: 'छत और ज़मीन साफ है',
    iconName: 'Sparkles',
    completed: false,
  },
  {
    id: 'out_dustbins_emptied',
    category: 'Outdoor & Common Area',
    categoryHi: 'आउटडोर एवं साझा क्षेत्र',
    titleEn: 'Dustbins emptied',
    titleHi: 'कूड़ेदान खाली किए गए',
    iconName: 'Trash2',
    completed: false,
  },
  {
    id: 'out_plants_maintained',
    category: 'Outdoor & Common Area',
    categoryHi: 'आउटडोर एवं साझा क्षेत्र',
    titleEn: 'Plants & Area maintained',
    titleHi: 'पौधे और क्षेत्र व्यवस्थित हैं',
    iconName: 'Trees',
    completed: false,
  },
  {
    id: 'out_furniture_wiped',
    category: 'Outdoor & Common Area',
    categoryHi: 'आउटडोर एवं साझा क्षेत्र',
    titleEn: 'Railings / Outdoor furniture wiped',
    titleHi: 'रेलिंग और फ़र्नीचर साफ है',
    iconName: 'Armchair',
    completed: false,
  },
  {
    id: 'out_lights_checked',
    category: 'Outdoor & Common Area',
    categoryHi: 'आउटडोर एवं साझा क्षेत्र',
    titleEn: 'Lights checked & clean',
    titleHi: 'लाइटें चालू और साफ हैं',
    iconName: 'Sun',
    completed: false,
  },
];

// Yoga Hall Tasks
export const YOGA_HALL_TASKS: TaskItem[] = [
  {
    id: 'yoga_floor_clean',
    category: 'Yoga Hall',
    categoryHi: 'योग हॉल',
    titleEn: 'Floor cleaned',
    titleHi: 'योग हॉल का फर्श साफ किया गया',
    iconName: 'Sparkles',
    completed: false,
  },
  {
    id: 'yoga_mats_arranged',
    category: 'Yoga Hall',
    categoryHi: 'योग हॉल',
    titleEn: 'Mats cleaned/arranged',
    titleHi: 'योग मैट साफ किए गए और व्यवस्थित किए गए',
    iconName: 'Layers',
    completed: false,
  },
  {
    id: 'yoga_cushions_org',
    category: 'Yoga Hall',
    categoryHi: 'योग हॉल',
    titleEn: 'Cushions organized',
    titleHi: 'तकिए व्यवस्थित किए गए',
    iconName: 'Armchair',
    completed: false,
  },
  {
    id: 'yoga_mirrors_clean',
    category: 'Yoga Hall',
    categoryHi: 'योग हॉल',
    titleEn: 'Mirrors clean',
    titleHi: 'शीशे साफ किए गए',
    iconName: 'Eye',
    completed: false,
  },
  {
    id: 'yoga_sound_clean',
    category: 'Yoga Hall',
    categoryHi: 'योग हॉल',
    titleEn: 'Sound system clean',
    titleHi: 'साउंड सिस्टम साफ है',
    iconName: 'Volume2',
    completed: false,
  },
];

// Cafe (Indoor/Outdoor) Tasks
export const CAFE_TASKS: TaskItem[] = [
  {
    id: 'cafe_seating_clean',
    category: 'Cafe Area',
    categoryHi: 'कैफ़े क्षेत्र',
    titleEn: 'Common seating clean',
    titleHi: 'आम बैठने की जगह साफ की गई',
    iconName: 'Armchair',
    completed: false,
  },
  {
    id: 'cafe_tables_clean',
    category: 'Cafe Area',
    categoryHi: 'कैफ़े क्षेत्र',
    titleEn: 'Tables clean',
    titleHi: 'मेजें साफ की गईं',
    iconName: 'Archive',
    completed: false,
  },
  {
    id: 'cafe_racks_clean',
    category: 'Cafe Area',
    categoryHi: 'कैफ़े क्षेत्र',
    titleEn: 'Racks clean',
    titleHi: 'रैक साफ किया गया',
    iconName: 'Folder',
    completed: false,
  },
  {
    id: 'cafe_plants_clean',
    category: 'Cafe Area',
    categoryHi: 'कैफ़े क्षेत्र',
    titleEn: 'Indoor plants clean',
    titleHi: 'इनडोर पौधे साफ किए गए',
    iconName: 'Trees',
    completed: false,
  },
  {
    id: 'cafe_floor_clean',
    category: 'Cafe Area',
    categoryHi: 'कैफ़े क्षेत्र',
    titleEn: 'Floor clean',
    titleHi: 'फर्श साफ किए गए',
    iconName: 'Sparkles',
    completed: false,
  },
];

/**
 * Generate tasks according to formType
 */
export function getTasksForFormType(formType: FormType): TaskItem[] {
  switch (formType) {
    case 'dorm':
      return [
        ...GENERAL_CLEANING_TASKS.map((t) => ({ ...t, id: `dorm_${t.id}` })),
        ...WINDOWS_TASKS.map((t) => ({ ...t, id: `dorm_${t.id}` })),
        ...DOORS_TASKS.map((t) => ({ ...t, id: `dorm_${t.id}` })),
        ...FURNITURE_TASKS.map((t) => ({ ...t, id: `dorm_${t.id}` })),
        ...BED_BASE_TASKS.map((t) => ({ ...t, id: `dorm_${t.id}` })),
        ...DORM_EXTRA_BED_TASKS.map((t) => ({ ...t, id: `dorm_${t.id}` })),
        ...BATHROOM_TASKS.map((t) => ({ ...t, id: `dorm_${t.id}` })),
      ];

    case 'room':
      return [
        ...GENERAL_CLEANING_TASKS.map((t) => ({ ...t, id: `room_${t.id}` })),
        ...WINDOWS_TASKS.map((t) => ({ ...t, id: `room_${t.id}` })),
        ...DOORS_TASKS.map((t) => ({ ...t, id: `room_${t.id}` })),
        ...FURNITURE_TASKS.map((t) => ({ ...t, id: `room_${t.id}` })),
        ...BED_BASE_TASKS.map((t) => ({ ...t, id: `room_${t.id}` })),
        ...BATHROOM_TASKS.map((t) => ({ ...t, id: `room_${t.id}` })),
      ];

    case 'reception':
      return RECEPTION_TASKS.map((t) => ({ ...t, id: `rec_${t.id}` }));

    case 'staircase':
      return CORRIDOR_STAIRCASE_TASKS.map((t) => ({ ...t, id: `stair_${t.id}` }));

    case 'washroom':
      return BATHROOM_TASKS.map((t) => ({ ...t, id: `wash_${t.id}` }));

    case 'yoga_hall':
      return YOGA_HALL_TASKS.map((t) => ({ ...t, id: `yoga_${t.id}` }));

    case 'cafe':
      return CAFE_TASKS.map((t) => ({ ...t, id: `cafe_${t.id}` }));

    case 'terrace':
    case 'garden':
      return TERRACE_GARDEN_TASKS.map((t) => ({ ...t, id: `out_${t.id}` }));

    default:
      return GENERAL_CLEANING_TASKS;
  }
}
