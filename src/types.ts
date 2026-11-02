export type Language = 'hi-IN' | 'en-IN';

export type AppMode = 'staff' | 'admin';

export type PropertyId = 'landlopers' | 'tapovan' | 'delhi' | 'rishikesh';

export type FormType =
  | 'dorm'
  | 'room'
  | 'reception'
  | 'staircase'
  | 'washroom'
  | 'terrace'
  | 'garden'
  | 'yoga_hall'
  | 'cafe';

export type AppScreen =
  | 'property_select'
  | 'staff_area_select'
  | 'area_checklist'
  | 'section_10';

export type AuditStatus = 'Pending' | 'Verified' | 'Discrepancy';

export interface PropertyDef {
  id: PropertyId;
  nameEn: string;
  nameHi: string;
  taglineEn: string;
  taglineHi: string;
  iconName: string;
  badgeColor: string;
  staff: string[];
  dorms?: string[];
  privateRooms: string[];
  commonAreas: Array<{
    id: string;
    nameEn: string;
    nameHi: string;
    formType: FormType;
    iconName?: string;
  }>;
}

export interface LocationOption {
  id: string;
  nameEn: string;
  nameHi: string;
  propertyId?: PropertyId;
  propertyNameEn?: string;
  propertyNameHi?: string;
  formType: FormType;
  mappedSectionId: number;
  formNameEn: string;
  formNameHi: string;
  iconName: string;
  descriptionEn: string;
  descriptionHi: string;
}

export interface TaskItem {
  id: string;
  category?: string;
  categoryHi?: string;
  subCategoryEn?: string;
  subCategoryHi?: string;
  titleEn: string;
  titleHi: string;
  completed: boolean;
  hasError?: boolean;
  iconName?: string;
  photoUrl?: string;
  statusCondition?: 'cleaned' | 'needs_cleaning' | 'deep_clean_required';
  adminVerification?: 'pass' | 'fail' | 'unverified';
}

export interface SectionDef {
  id: number;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  type?: 'meta' | 'checklist' | 'issues';
  iconName?: string;
  tasks?: TaskItem[];
  responseType?: 'Cleaned' | 'Needs Cleaning' | 'Deep Cleaning Required';
  photoUpload?: string;
  mediaUploads?: string[];
  hasPhotoError?: boolean;
}

export interface ShiftInfo {
  propertyId: PropertyId;
  propertyName: string;
  date: string;
  roomArea: string;
  shiftTiming: 'Morning' | 'Evening';
  checkedBy: string;
}

export interface IssueReport {
  issuesIdentified: string;
  correctiveAction: string;
  actionTakenBy: string;
  status: 'Completed' | 'Pending' | 'Follow-up Required';
  finalRemarks: string;
}

export interface AuditReportRecord {
  id: string;
  submittedAt: string;
  date: string;
  time: string;
  propertyId?: PropertyId;
  propertyName?: string;
  locationId: string;
  locationName: string;
  locationNameHi?: string;
  formName: string;
  staffName: string;
  staffId: string;
  shiftTiming: 'Morning' | 'Evening';
  status: AuditStatus;
  responseType: 'Cleaned' | 'Needs Cleaning' | 'Deep Cleaning Required';
  tasks: Array<{
    id: string;
    titleEn: string;
    titleHi?: string;
    tag?: string;
    completed: boolean;
    adminVerification: 'pass' | 'fail' | 'unverified';
  }>;
  section10: {
    issuesIdentified: string;
    correctiveAction: string;
    actionTakenBy: string;
    status: string;
    finalRemarks: string;
  };
  photoUpload?: string;
  adminNotes?: string;
  auditedBy?: string;
  auditedAt?: string;
}

export type UserRole =
  | 'Super Admin'
  | 'Admin'
  | 'Manager'
  | 'Housekeeping Supervisor'
  | 'Housekeeping Staff'
  | 'Maintenance';

export type UserStatus = 'Approved' | 'Pending Approval' | 'Rejected' | 'Active' | 'Inactive';

export interface UserRecord {
  id: string;
  name: string;
  username: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  email: string;
  phone?: string;
  createdAt: string;
  lastLogin?: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface AdminAuthSession {
  token: string;
  username: string;
  name: string;
  email?: string;
  role: UserRole;
  loginTime: string;
}


