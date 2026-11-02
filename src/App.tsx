import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  SectionDef,
  ShiftInfo,
  IssueReport,
  Language,
  TaskItem,
  LocationOption,
  AppScreen,
  AppMode,
  PropertyId,
  AdminAuthSession,
} from './types';
import { PROPERTIES, getTasksForFormType } from './data/propertyData';
import {
  speakText,
  playAlertTone,
  playSuccessChime,
  subscribeSpeakingStatus,
  stopSpeaking,
} from './utils/speechUtils';
import { createAuditReportFromStaffSubmission } from './utils/auditStorage';
import { getActiveAdminSession, clearAdminSession } from './utils/userStorage';
import { Header } from './components/Header';
import { PropertySelectionView } from './components/PropertySelectionView';
import { StaffAreaSelectionView } from './components/StaffAreaSelectionView';
import { ChecklistSectionView } from './components/ChecklistSectionView';
import { IssuesAndRemarks } from './components/IssuesAndRemarks';
import { ShiftSuccessModal } from './components/ShiftSuccessModal';
import { SingleFileExportModal } from './components/SingleFileExportModal';
import { AdminAuditPortal } from './components/AdminAuditPortal';
import { AdminLoginScreen } from './components/AdminLoginScreen';

export default function App() {
  // App Mode: Staff Checklist vs Admin Audit Portal
  const [appMode, setAppMode] = useState<AppMode>('staff');
  const [adminSession, setAdminSession] = useState<AdminAuthSession | null>(() => getActiveAdminSession());

  const [language, setLanguage] = useState<Language>('hi-IN');
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.95);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Multi-Property Navigation Screens:
  // 'property_select' -> 'staff_area_select' -> 'area_checklist' -> 'section_10'
  const [screen, setScreen] = useState<AppScreen>('property_select');
  const [selectedPropertyId, setSelectedPropertyId] = useState<PropertyId | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);
  const [activeSection, setActiveSection] = useState<SectionDef | null>(null);
  const [hasValidationError, setHasValidationError] = useState<boolean>(false);

  // Shift Inspector Metadata
  const [shiftInfo, setShiftInfo] = useState<ShiftInfo>(() => {
    const today = new Date().toISOString().split('T')[0];
    return {
      propertyId: 'landlopers',
      propertyName: 'Landlopers',
      date: today,
      roomArea: '',
      shiftTiming: 'Morning',
      checkedBy: PROPERTIES.landlopers.staff[0] || 'Jasvir',
    };
  });

  // Section 10 Report
  const [report, setReport] = useState<IssueReport>({
    issuesIdentified: '',
    correctiveAction: '',
    actionTakenBy: PROPERTIES.landlopers.staff[0] || 'Jasvir',
    status: 'Completed',
    finalRemarks: '',
  });

  // Modals
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Speech status listener
  useEffect(() => {
    const unsubscribe = subscribeSpeakingStatus((id) => {
      setSpeakingId(id);
    });
    return () => unsubscribe();
  }, []);

  const isHindi = language === 'hi-IN';

  // Screen 1: User selects Property (Landlopers, Tapovan, Delhi)
  const handleSelectProperty = (propId: PropertyId) => {
    const prop = PROPERTIES[propId];
    setSelectedPropertyId(propId);

    const initialStaff = prop.staff[0] || 'Staff';
    setShiftInfo((prev) => ({
      ...prev,
      propertyId: propId,
      propertyName: isHindi ? prop.nameHi : prop.nameEn,
      checkedBy: initialStaff,
    }));
    setReport((prev) => ({
      ...prev,
      actionTakenBy: initialStaff,
    }));

    setScreen('staff_area_select');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const spokenText = isHindi
      ? `${prop.nameHi} का चयन किया गया। कृपया कर्मचारी और सफाई क्षेत्र चुनें।`
      : `${prop.nameEn} selected. Please select inspector and area.`;
    speakText(spokenText, language, `prop-chosen-${propId}`, speechSpeed);
  };

  // User returns to Property Selection
  const handleBackToPropertySelect = () => {
    stopSpeaking();
    setScreen('property_select');
    setSelectedLocation(null);
    setActiveSection(null);
    setHasValidationError(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Screen 2: User selects an area (Dorm, Private Room, Common Area)
  const handleSelectArea = (loc: LocationOption) => {
    setSelectedLocation(loc);

    // Generate dynamic tasks for this form type
    const initialTasks = getTasksForFormType(loc.formType);

    const newSection: SectionDef = {
      id: loc.mappedSectionId,
      titleEn: loc.formNameEn,
      titleHi: loc.formNameHi,
      descriptionEn: loc.descriptionEn,
      descriptionHi: loc.descriptionHi,
      iconName: loc.iconName,
      responseType: 'Cleaned',
      tasks: initialTasks,
      photoUpload: undefined,
      mediaUploads: [],
      hasPhotoError: false,
    };

    setActiveSection(newSection);
    setShiftInfo((prev) => ({
      ...prev,
      roomArea: isHindi ? loc.nameHi : loc.nameEn,
    }));
    setHasValidationError(false);
    setScreen('area_checklist');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const spokenText = isHindi
      ? `${loc.nameHi}। ${loc.formNameHi} शुरू किया गया।`
      : `${loc.nameEn}. Started ${loc.formNameEn}.`;
    speakText(spokenText, language, `select-area-${loc.id}`, speechSpeed);
  };

  // Return from Area Checklist to Staff & Area Selection
  const handleBackToStaffAreaSelect = () => {
    stopSpeaking();
    setHasValidationError(false);
    setScreen('staff_area_select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Task Checkbox Toggle
  const handleToggleTask = (taskId: string) => {
    if (!activeSection || !activeSection.tasks) return;

    const updatedTasks = activeSection.tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, completed: !t.completed, hasError: false };
      }
      return t;
    });

    const updatedSection = {
      ...activeSection,
      tasks: updatedTasks,
    };
    setActiveSection(updatedSection);

    const remainingUncompleted = updatedTasks.filter((t) => !t.completed).length;
    if (remainingUncompleted === 0) {
      setHasValidationError(false);
    }
  };

  // Update photo for task
  const handleUpdateTaskPhoto = (taskId: string, photoUrl?: string) => {
    if (!activeSection || !activeSection.tasks) return;
    setActiveSection({
      ...activeSection,
      tasks: activeSection.tasks.map((t) => (t.id === taskId ? { ...t, photoUrl } : t)),
    });
  };

  // Mark all tasks in current area as done
  const handleMarkAllSectionDone = () => {
    if (!activeSection || !activeSection.tasks) return;
    playSuccessChime();

    setActiveSection({
      ...activeSection,
      tasks: activeSection.tasks.map((t) => ({ ...t, completed: true, hasError: false })),
    });
    setHasValidationError(false);

    speakText(
      isHindi
        ? 'इस क्षेत्र के सभी कार्य पूर्ण चिह्नित किए गए।'
        : 'All tasks in this area marked completed.',
      language,
      'mark-section-done',
      speechSpeed
    );
  };

  // Reset tasks in current area
  const handleResetSection = () => {
    if (!selectedLocation) return;
    stopSpeaking();
    const freshTasks = getTasksForFormType(selectedLocation.formType);
    setActiveSection((prev) =>
      prev
        ? {
            ...prev,
            tasks: freshTasks,
            photoUpload: undefined,
            mediaUploads: [],
            hasPhotoError: false,
          }
        : null
    );
    setHasValidationError(false);
  };

  // Update Response Type ('Cleaned' | 'Needs Cleaning' | 'Deep Cleaning Required')
  const handleUpdateResponseType = (
    _secId: number,
    responseType: 'Cleaned' | 'Needs Cleaning' | 'Deep Cleaning Required'
  ) => {
    if (!activeSection) return;
    setActiveSection({
      ...activeSection,
      responseType,
    });
  };

  // Update Section Media Uploads (Photos/Videos)
  const handleUpdateSectionPhoto = (
    _secId: number,
    photoUpload?: string,
    mediaUploads?: string[]
  ) => {
    if (!activeSection) return;
    setActiveSection({
      ...activeSection,
      photoUpload,
      mediaUploads: mediaUploads || (photoUpload ? [photoUpload] : []),
      hasPhotoError: false,
    });
  };

  // Screen 3: User clicks "Proceed to Section 10"
  const handleNextStepToSection10 = () => {
    if (!activeSection || !activeSection.tasks) return;

    const uncheckedTasks = activeSection.tasks.filter((t) => !t.completed);

    // 1. Task Check Validation
    if (uncheckedTasks.length > 0) {
      setHasValidationError(true);
      playAlertTone();

      // Highlight unchecked tasks with bright RED in state
      setActiveSection({
        ...activeSection,
        tasks: activeSection.tasks.map((t) => ({
          ...t,
          hasError: !t.completed,
        })),
      });

      // Scroll smoothly to the first unchecked item
      const firstErrorTask = uncheckedTasks[0];
      const targetCard = document.getElementById(`task-item-${firstErrorTask.id}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const errorAlert = document.getElementById('validation-error-alert');
        if (errorAlert) {
          errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      // Audio warning requirement: "कृपया छूटे हुए काम पूरे करें और फोटो लें।"
      const warningSpeech = 'कृपया छूटे हुए काम पूरे करें और फोटो लें।';
      speakText(warningSpeech, 'hi-IN', 'validation-error-alert', speechSpeed);
      return;
    }

    // 2. Proof of Work (Photo / Video) Validation
    const hasMedia =
      (activeSection.mediaUploads && activeSection.mediaUploads.length > 0) ||
      Boolean(activeSection.photoUpload);

    if (!hasMedia) {
      setActiveSection({
        ...activeSection,
        hasPhotoError: true,
      });

      playAlertTone();

      // Scroll to media upload section
      const photoCard = document.getElementById('proof-of-work-upload-card');
      if (photoCard) {
        photoCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      const photoWarningSpeech = 'कृपया छूटे हुए काम पूरे करें और फोटो लें।';
      speakText(photoWarningSpeech, 'hi-IN', 'photo-warning-alert', speechSpeed);
      return;
    }

    // All tasks completed AND photo uploaded! Proceed to Section 10
    setHasValidationError(false);
    setActiveSection({
      ...activeSection,
      hasPhotoError: false,
    });
    playSuccessChime();
    setScreen('section_10');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const proceedSpeech = isHindi
      ? 'बहुत बढ़िया! अब खंड 10 में सफाई के मुद्दे और अंतिम टिप्पणियां दर्ज करें।'
      : 'Great job! Now enter any issues and final remarks in Section 10.';
    speakText(proceedSpeech, language, 'proceed-section-10', speechSpeed);
  };

  // Return from Section 10 back to Area Checklist
  const handleBackToChecklistFrom10 = () => {
    stopSpeaking();
    setScreen('area_checklist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Shift Submission
  const handleSubmitShift = () => {
    playSuccessChime();

    // Automatically register this report into the persistent Admin Audit Portal database
    if (selectedLocation && activeSection) {
      createAuditReportFromStaffSubmission(shiftInfo, selectedLocation, activeSection, report);
    }

    try {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'],
      });
    } catch {
      // Ignore
    }

    const locName = selectedLocation
      ? isHindi
        ? selectedLocation.nameHi
        : selectedLocation.nameEn
      : 'Housekeeping';

    const successSpeech = isHindi
      ? `शाबाश! ${locName} की सफाई शिफ्ट और ऑडिट रिपोर्ट सफलतापूर्वक सबमिट हो गई।`
      : `Congratulations! Housekeeping shift submitted successfully for ${locName}.`;
    speakText(successSpeech, language, 'final-submit-success', speechSpeed);

    setIsSuccessModalOpen(true);
  };

  // Reset for next area or shift
  const handleFullReset = () => {
    stopSpeaking();
    setSelectedLocation(null);
    setActiveSection(null);
    setHasValidationError(false);
    setReport({
      issuesIdentified: '',
      correctiveAction: '',
      actionTakenBy: shiftInfo.checkedBy,
      status: 'Completed',
      finalRemarks: '',
    });
    setIsSuccessModalOpen(false);
    setScreen('staff_area_select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If Admin Portal mode is active, check authentication session
  if (appMode === 'admin') {
    if (!adminSession) {
      return (
        <AdminLoginScreen
          onLoginSuccess={(session) => setAdminSession(session)}
          onSwitchToStaff={() => setAppMode('staff')}
        />
      );
    }

    return (
      <AdminAuditPortal
        onSwitchToStaffMode={() => setAppMode('staff')}
        currentSession={adminSession}
        onLogout={() => {
          clearAdminSession();
          setAdminSession(null);
        }}
      />
    );
  }

  // Calculate task counts
  const currentTasks = activeSection?.tasks || [];
  const currentDoneCount = currentTasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col selection:bg-amber-200">
      {/* Top Sticky Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        speechSpeed={speechSpeed}
        onSpeechSpeedChange={setSpeechSpeed}
        completedCount={currentDoneCount}
        totalCount={currentTasks.length}
        isSpeaking={speakingId !== null}
        onSwitchToAdmin={() => setAppMode('admin')}
        activePropertyId={selectedPropertyId}
        onChangeProperty={handleBackToPropertySelect}
      />

      {/* Main Multi-Screen Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-3 sm:px-4 py-4 space-y-4">
        {/* SCREEN 1: PROPERTY SELECTION */}
        {screen === 'property_select' && (
          <PropertySelectionView
            language={language}
            speechSpeed={speechSpeed}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {/* SCREEN 2: STAFF & AREA SELECTION */}
        {screen === 'staff_area_select' && selectedPropertyId && (
          <StaffAreaSelectionView
            propertyId={selectedPropertyId}
            shiftInfo={shiftInfo}
            onUpdateShiftInfo={setShiftInfo}
            language={language}
            speechSpeed={speechSpeed}
            onBackToPropertySelect={handleBackToPropertySelect}
            onSelectArea={handleSelectArea}
          />
        )}

        {/* SCREEN 3: CONDITIONAL ROUTING CHECKLIST FORM */}
        {screen === 'area_checklist' && activeSection && (
          <ChecklistSectionView
            section={activeSection}
            selectedLocation={selectedLocation}
            language={language}
            speechSpeed={speechSpeed}
            speakingId={speakingId}
            hasErrors={hasValidationError}
            hasPhotoError={Boolean(activeSection.hasPhotoError)}
            onToggleTask={handleToggleTask}
            onUpdatePhoto={handleUpdateTaskPhoto}
            onMarkAllSectionDone={handleMarkAllSectionDone}
            onResetSection={handleResetSection}
            onUpdateResponseType={handleUpdateResponseType}
            onUpdateSectionPhoto={handleUpdateSectionPhoto}
            onBackToLocationSelect={handleBackToStaffAreaSelect}
            onNextStepToSection10={handleNextStepToSection10}
          />
        )}

        {/* SCREEN 4: MANDATORY SECTION 10 (ISSUES & REMARKS) */}
        {screen === 'section_10' && (
          <IssuesAndRemarks
            report={report}
            selectedLocation={selectedLocation}
            onChange={setReport}
            language={language}
            speechSpeed={speechSpeed}
            onBackToChecklist={handleBackToChecklistFrom10}
            onSubmitShift={handleSubmitShift}
          />
        )}
      </main>

      {/* Shift Success Celebration & Summary Modal */}
      <ShiftSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onReset={handleFullReset}
        shiftInfo={shiftInfo}
        selectedLocation={selectedLocation}
        completedSection={activeSection}
        report={report}
        language={language}
      />

      {/* Standalone Single-File HTML Code Export Modal */}
      <SingleFileExportModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        language={language}
      />
    </div>
  );
}
