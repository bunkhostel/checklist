import { AuditReportRecord, ShiftInfo, LocationOption, SectionDef, IssueReport } from '../types';

const STORAGE_KEY = 'bunk_hostel_audit_reports_v1';

export const INITIAL_MOCK_REPORTS: AuditReportRecord[] = [
  {
    id: 'RPT-2026-0801',
    submittedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    date: '2026-08-21',
    time: '08:30 AM',
    locationId: 'dorm_hall',
    locationName: '107, 207 & Dorm hall',
    locationNameHi: '107, 207 और डॉर्म हॉल',
    formName: 'Dorm',
    staffName: 'Jasvir Singh',
    staffId: 'HK-001',
    shiftTiming: 'Morning',
    status: 'Pending',
    responseType: 'Cleaned',
    photoUpload: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    tasks: [
      { id: 'd1', tag: 'Bunk Bed', titleEn: 'Bunk bed mattress, clean sheets, and pillow set neatly.', titleHi: 'बंक बेड गद्दे, साफ चादर और तकिया करीने से बिछाया गया।', completed: true, adminVerification: 'pass' },
      { id: 'd2', tag: 'Drawers', titleEn: 'Under-bed drawers dusted and emptied.', titleHi: 'बिस्तर के नीचे की दराजें झाड़ी और साफ की गईं।', completed: true, adminVerification: 'pass' },
      { id: 'd3', tag: 'Floor', titleEn: 'Dorm hall floor swept, mopped, and corners cleaned.', titleHi: 'डॉर्म हॉल के फर्श पर झाड़ू, पोंछा और कोनों की सफाई की गई।', completed: true, adminVerification: 'unverified' },
      { id: 'd4', tag: 'Curtains', titleEn: 'Bunk bed privacy curtains clean and washed.', titleHi: 'बंक बेड के पर्दे साफ और धुले हुए हैं।', completed: true, adminVerification: 'unverified' },
      { id: 'd5', tag: 'Dustbins', titleEn: 'Dustbins emptied and fresh trash bags installed.', titleHi: 'कूड़ेदान खाली किए गए और नई थैली लगाई गई।', completed: true, adminVerification: 'unverified' },
      { id: 'd6', tag: 'Bathroom', titleEn: 'Attached bathroom toilet, sink, and tiles sanitized.', titleHi: 'अटैच्ड बाथरूम टॉयलेट, सिंक और टाइलें सैनिटाइज की गईं।', completed: true, adminVerification: 'unverified' }
    ],
    section10: {
      issuesIdentified: 'Bed 207-B pillow cover had slight laundry mark',
      correctiveAction: 'Replaced immediately with fresh crisp linen from linen room',
      actionTakenBy: 'Jasvir',
      status: 'Completed',
      finalRemarks: 'Dorm hall smells fresh; Air Conditioner set to 24°C.'
    },
    adminNotes: ''
  },
  {
    id: 'RPT-2026-0802',
    submittedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    date: '2026-08-21',
    time: '07:15 AM',
    locationId: 'yoga_hall',
    locationName: 'Yoga Hall',
    locationNameHi: 'योग हॉल',
    formName: 'Yoga Hall',
    staffName: 'Rajeshwari Sharma',
    staffId: 'HK-002',
    shiftTiming: 'Morning',
    status: 'Verified',
    responseType: 'Cleaned',
    photoUpload: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    tasks: [
      { id: 'y1', tag: 'Floor', titleEn: 'Yoga hall wooden floor polished and dust-free.', completed: true, adminVerification: 'pass' },
      { id: 'y2', tag: 'Yoga Mats', titleEn: 'All yoga mats sanitized and neatly rolled.', completed: true, adminVerification: 'pass' },
      { id: 'y3', tag: 'Mirrors', titleEn: 'Wall mirrors cleaned with glass spray.', completed: true, adminVerification: 'pass' },
      { id: 'y4', tag: 'Cushions', titleEn: 'Meditation cushions arranged in order.', completed: true, adminVerification: 'pass' },
      { id: 'y5', tag: 'Fragrance', titleEn: 'Fresh ventilation and aromatic diffuser active.', completed: true, adminVerification: 'pass' }
    ],
    section10: {
      issuesIdentified: 'Aroma diffuser water empty',
      correctiveAction: 'Refilled with lemongrass essential oil and purified water',
      actionTakenBy: 'Rajeshwari',
      status: 'Completed',
      finalRemarks: 'Ready for morning 8 AM guest meditation batch.'
    },
    adminNotes: 'Excellent work. Floor spotless and pleasant scent.',
    auditedBy: 'Rohit (Operations Lead)',
    auditedAt: '07:45 AM'
  },
  {
    id: 'RPT-2026-0803',
    submittedAt: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    date: '2026-08-21',
    time: '06:00 AM',
    locationId: 'cafe',
    locationName: 'Cafe (Indoor or Outdoor)',
    locationNameHi: 'कैफ़े (इनडोर या आउटडोर)',
    formName: 'Cafe/Restaurant',
    staffName: 'Vikram Mehta',
    staffId: 'HK-004',
    shiftTiming: 'Morning',
    status: 'Discrepancy',
    responseType: 'Needs Cleaning',
    photoUpload: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    tasks: [
      { id: 'c1', tag: 'Dining Tables', titleEn: 'All dining tables and chairs sanitized.', completed: true, adminVerification: 'fail' },
      { id: 'c2', tag: 'Counter', titleEn: 'Beverage & coffee counter wiped dry and clean.', completed: true, adminVerification: 'pass' },
      { id: 'c3', tag: 'Floor', titleEn: 'Cafe floor swept and mopped.', completed: true, adminVerification: 'pass' },
      { id: 'c4', tag: 'Outdoor Seating', titleEn: 'Outdoor patio tables dusted and organized.', completed: true, adminVerification: 'fail' },
      { id: 'c5', tag: 'Fireplace', titleEn: 'Fireplace and lounge area cleaned.', completed: true, adminVerification: 'pass' }
    ],
    section10: {
      issuesIdentified: 'Spilled chai residue on outdoor table 3',
      correctiveAction: 'Quick wipe done',
      actionTakenBy: 'Vikram',
      status: 'Pending',
      finalRemarks: 'Outdoor patio chairs need deep scrub before lunch service.'
    },
    adminNotes: 'Outdoor table 3 and patio chairs still had sticky spots during manager walkthrough. Re-assigned to Vikram for immediate re-wipe.',
    auditedBy: 'Rohit (Operations Lead)',
    auditedAt: '06:40 AM'
  },
  {
    id: 'RPT-2026-0804',
    submittedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    date: '2026-08-20',
    time: '08:45 PM',
    locationId: 'common_washroom',
    locationName: 'Common Washroom',
    locationNameHi: 'साझा वॉशरूम (Common Washroom)',
    formName: 'Common Washroom',
    staffName: 'Sunita Devi',
    staffId: 'HK-003',
    shiftTiming: 'Evening',
    status: 'Verified',
    responseType: 'Cleaned',
    tasks: [
      { id: 'w1', tag: 'Toilet Seat', titleEn: 'Toilet bowl and seat sanitized with disinfectant.', completed: true, adminVerification: 'pass' },
      { id: 'w2', tag: 'Washbasin', titleEn: 'Washbasin and water taps cleaned and shiny.', completed: true, adminVerification: 'pass' },
      { id: 'w3', tag: 'Mirror', titleEn: 'Washroom mirror cleaned without water spots.', completed: true, adminVerification: 'pass' },
      { id: 'w4', tag: 'Soap Refill', titleEn: 'Hand soap dispenser filled and working.', completed: true, adminVerification: 'pass' },
      { id: 'w5', tag: 'Paper & Towels', titleEn: 'Toilet paper and clean hand towels stocked.', completed: true, adminVerification: 'pass' },
      { id: 'w6', tag: 'Exhaust', titleEn: 'Exhaust fan operational and no bad odor.', completed: true, adminVerification: 'pass' }
    ],
    section10: {
      issuesIdentified: 'Handwash bottle had 10% soap left',
      correctiveAction: 'Topped up with lemon antibacterial liquid refill',
      actionTakenBy: 'Sunita',
      status: 'Completed',
      finalRemarks: 'Night shift washroom prep completed.'
    },
    adminNotes: 'Clean, dry and pleasant.',
    auditedBy: 'Neha (Night Duty Mgr)',
    auditedAt: '09:15 PM'
  }
];

export function getStoredAuditReports(): AuditReportRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_REPORTS));
      return INITIAL_MOCK_REPORTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_REPORTS));
      return INITIAL_MOCK_REPORTS;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to load audit reports from localStorage', err);
    return INITIAL_MOCK_REPORTS;
  }
}

export function saveAuditReports(reports: AuditReportRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (err) {
    console.error('Failed to save audit reports to localStorage', err);
  }
}

export function createAuditReportFromStaffSubmission(
  shiftInfo: ShiftInfo,
  location: LocationOption | null,
  section: SectionDef | null,
  report: IssueReport
): AuditReportRecord {
  const now = new Date();
  const reportId = `RPT-${now.getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;
  const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const tasks = section?.tasks?.map((t) => ({
    id: t.id,
    titleEn: t.titleEn,
    titleHi: t.titleHi,
    tag: t.category || t.subCategoryEn || 'Task',
    completed: t.completed,
    adminVerification: 'unverified' as const,
  })) || [];

  const newRecord: AuditReportRecord = {
    id: reportId,
    submittedAt: now.toISOString(),
    date: shiftInfo.date,
    time: timeFormatted,
    locationId: location?.id || 'general',
    locationName: location?.nameEn || shiftInfo.roomArea,
    locationNameHi: location?.nameHi,
    formName: location?.formNameEn || 'Housekeeping',
    staffName: shiftInfo.checkedBy,
    staffId: `HK-00${Math.floor(1 + Math.random() * 5)}`,
    shiftTiming: shiftInfo.shiftTiming,
    status: 'Pending',
    responseType: section?.responseType || 'Cleaned',
    photoUpload: section?.photoUpload,
    tasks,
    section10: {
      issuesIdentified: report.issuesIdentified,
      correctiveAction: report.correctiveAction,
      actionTakenBy: report.actionTakenBy,
      status: report.status,
      finalRemarks: report.finalRemarks,
    },
    adminNotes: '',
  };

  const existing = getStoredAuditReports();
  const updated = [newRecord, ...existing];
  saveAuditReports(updated);
  return newRecord;
}
