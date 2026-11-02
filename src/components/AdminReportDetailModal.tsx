import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  Camera,
  FileText,
  ThumbsUp,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { AuditReportRecord, AuditStatus } from '../types';
import { VoiceTranscribeButton } from './VoiceTranscribeButton';

interface AdminReportDetailModalProps {
  report: AuditReportRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateReport: (updated: AuditReportRecord) => void;
}

export const AdminReportDetailModal: React.FC<AdminReportDetailModalProps> = ({
  report,
  isOpen,
  onClose,
  onUpdateReport,
}) => {
  if (!isOpen || !report) return null;

  const [currentReport, setCurrentReport] = useState<AuditReportRecord>(report);
  const [adminNotes, setAdminNotes] = useState<string>(report.adminNotes || '');
  const [adminAuditorName, setAdminAuditorName] = useState<string>(
    report.auditedBy || 'Rohit (Operations Lead)'
  );

  // Sync state if report changes
  React.useEffect(() => {
    setCurrentReport(report);
    setAdminNotes(report.adminNotes || '');
    setAdminAuditorName(report.auditedBy || 'Rohit (Operations Lead)');
  }, [report]);

  // Toggle individual task verification: pass <-> fail <-> unverified
  const handleToggleTaskVerification = (taskId: string, status: 'pass' | 'fail') => {
    setCurrentReport((prev) => {
      const updatedTasks = prev.tasks.map((t) => {
        if (t.id === taskId) {
          // If clicking already selected status, toggle to unverified; otherwise set to clicked status
          const newStatus = t.adminVerification === status ? 'unverified' : status;
          return { ...t, adminVerification: newStatus };
        }
        return t;
      });
      return { ...prev, tasks: updatedTasks };
    });
  };

  // Mark all tasks as Pass
  const handleMarkAllPass = () => {
    setCurrentReport((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => ({ ...t, adminVerification: 'pass' })),
    }));
  };

  // Calculate Verification Stats
  const totalTasks = currentReport.tasks.length;
  const passCount = currentReport.tasks.filter((t) => t.adminVerification === 'pass').length;
  const failCount = currentReport.tasks.filter((t) => t.adminVerification === 'fail').length;
  const unverifiedCount = currentReport.tasks.filter(
    (t) => !t.adminVerification || t.adminVerification === 'unverified'
  ).length;

  const auditScore = totalTasks > 0 ? Math.round((passCount / totalTasks) * 100) : 100;

  // Approve & Close Audit
  const handleApprove = () => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updated: AuditReportRecord = {
      ...currentReport,
      status: 'Verified',
      adminNotes: adminNotes.trim(),
      auditedBy: adminAuditorName,
      auditedAt: nowTime,
    };
    onUpdateReport(updated);
    onClose();
  };

  // Flag Discrepancy
  const handleFlagDiscrepancy = () => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const note = adminNotes.trim() || 'Discrepancy noted during physical manager inspection.';
    const updated: AuditReportRecord = {
      ...currentReport,
      status: 'Discrepancy',
      adminNotes: note,
      auditedBy: adminAuditorName,
      auditedAt: nowTime,
    };
    onUpdateReport(updated);
    onClose();
  };

  const addQuickAdminNote = (note: string) => {
    setAdminNotes((prev) => (prev ? `${prev}. ${note}` : note));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        id="admin-report-detail-modal"
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top Sticky Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 font-black flex items-center justify-center text-lg shadow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-white">
                  Audit Inspection: {currentReport.locationName}
                </h2>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-stone-800 text-amber-400 font-bold border border-stone-700">
                  {currentReport.id}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Submitted on {currentReport.date} at {currentReport.time} by {currentReport.staffName} ({currentReport.staffId})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                currentReport.status === 'Verified'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : currentReport.status === 'Discrepancy'
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}
            >
              ● {currentReport.status}
            </span>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-stone-800">
          {/* Metadata Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 flex flex-col gap-1">
              <span className="text-[11px] font-bold text-stone-500 uppercase flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" /> Area / Form
              </span>
              <span className="font-black text-stone-900 text-sm truncate">
                {currentReport.locationName}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Form: {currentReport.formName}
              </span>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 flex flex-col gap-1">
              <span className="text-[11px] font-bold text-stone-500 uppercase flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-stone-400" /> Staff Member
              </span>
              <span className="font-black text-stone-900 text-sm truncate">
                {currentReport.staffName}
              </span>
              <span className="text-xs text-stone-500 font-mono font-medium">
                ID: {currentReport.staffId} • {currentReport.shiftTiming} Shift
              </span>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 flex flex-col gap-1">
              <span className="text-[11px] font-bold text-stone-500 uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-stone-400" /> Response Condition
              </span>
              <span
                className={`font-black text-sm ${
                  currentReport.responseType === 'Cleaned'
                    ? 'text-emerald-700'
                    : currentReport.responseType === 'Needs Cleaning'
                    ? 'text-amber-700'
                    : 'text-red-700'
                }`}
              >
                {currentReport.responseType}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {currentReport.tasks.length} items audited
              </span>
            </div>

            <div className="bg-stone-900 text-white rounded-2xl p-3.5 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-stone-400 uppercase flex items-center justify-between">
                <span>Manager Audit Score</span>
                <span className="text-amber-400 font-black">{auditScore}%</span>
              </span>
              <div className="flex items-center gap-2 text-xs font-bold mt-1">
                <span className="text-emerald-400">✓ {passCount} Pass</span>
                <span className="text-red-400">✗ {failCount} Fail</span>
                {unverifiedCount > 0 && (
                  <span className="text-stone-400">? {unverifiedCount} Unchecked</span>
                )}
              </div>
            </div>
          </div>

          {/* Photo Proof Attachment (if any) */}
          {currentReport.photoUpload && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-amber-300 shrink-0 bg-amber-100">
                  <img
                    src={currentReport.photoUpload}
                    alt="Housekeeping Photo Proof"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                    <Camera className="w-4 h-4 text-amber-700" />
                    <span>Staff Photo Proof Attached</span>
                  </div>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Attached during shift completion to verify cleaned area cleanliness.
                  </p>
                </div>
              </div>

              <a
                href={currentReport.photoUpload}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-bold transition shadow-sm"
              >
                View Full Image ↗
              </a>
            </div>
          )}

          {/* Checklist Verification Section with Pass / Fail Toggles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                  <span>Physical Audit Verification: Area Checklist</span>
                  <span className="text-xs font-bold px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full border border-stone-200">
                    {passCount}/{totalTasks} Passed
                  </span>
                </h3>
                <p className="text-xs text-stone-500">
                  Review each item marked as cleaned by the staff member. Toggle <strong className="text-emerald-700">Pass</strong> or <strong className="text-red-700">Fail</strong> to audit room standards.
                </p>
              </div>

              <button
                type="button"
                onClick={handleMarkAllPass}
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 border border-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mark All as Pass</span>
              </button>
            </div>

            <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              {currentReport.tasks.map((task, idx) => {
                const isPass = task.adminVerification === 'pass';
                const isFail = task.adminVerification === 'fail';

                return (
                  <div
                    key={task.id || idx}
                    className={`p-3.5 flex items-center justify-between gap-4 transition ${
                      isFail ? 'bg-red-50/50' : isPass ? 'bg-emerald-50/30' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="mt-0.5 w-6 h-6 rounded-lg bg-stone-100 text-stone-700 text-xs font-black flex items-center justify-center shrink-0 border border-stone-200">
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 bg-stone-200/80 text-stone-700 rounded">
                            {task.tag || 'Item'}
                          </span>
                          <span className="text-xs font-bold text-stone-400">
                            Staff marked: <strong className="text-emerald-600 font-black">✓ Done</strong>
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-stone-900 mt-1 leading-snug">
                          {task.titleEn}
                        </p>
                        {task.titleHi && (
                          <p className="text-xs text-stone-500 mt-0.5">{task.titleHi}</p>
                        )}
                      </div>
                    </div>

                    {/* Admin Pass / Fail Action Toggles */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleTaskVerification(task.id, 'pass')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 border transition ${
                          isPass
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm ring-2 ring-emerald-400/30'
                            : 'bg-stone-50 hover:bg-emerald-50 text-stone-600 hover:text-emerald-700 border-stone-200'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Pass</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleTaskVerification(task.id, 'fail')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 border transition ${
                          isFail
                            ? 'bg-red-600 text-white border-red-700 shadow-sm ring-2 ring-red-400/30'
                            : 'bg-stone-50 hover:bg-red-50 text-stone-600 hover:text-red-700 border-stone-200'
                        }`}
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Fail</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 10: Staff Issues & Remarks Report */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4.5 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-2.5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs sm:text-sm font-black text-stone-900">
                  Section 10: Staff Cleanliness Issues & Corrective Report
                </h4>
              </div>
              <span className="text-[11px] font-bold text-stone-500">
                Action by: <strong>{currentReport.section10.actionTakenBy || currentReport.staffName}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-stone-200/80 space-y-1">
                <span className="font-bold text-stone-500 uppercase text-[10px]">
                  Issues Identified by Staff
                </span>
                <p className="font-semibold text-stone-800">
                  {currentReport.section10.issuesIdentified || 'None reported (Clean inspection)'}
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200/80 space-y-1">
                <span className="font-bold text-stone-500 uppercase text-[10px]">
                  Corrective Action Taken
                </span>
                <p className="font-semibold text-stone-800">
                  {currentReport.section10.correctiveAction || 'Standard housekeeping procedure completed'}
                </p>
              </div>
            </div>

            {currentReport.section10.finalRemarks && (
              <div className="bg-white p-3 rounded-xl border border-stone-200/80 space-y-1 text-xs">
                <span className="font-bold text-stone-500 uppercase text-[10px]">
                  Staff Final Remarks
                </span>
                <p className="font-medium text-stone-700 italic">
                  "{currentReport.section10.finalRemarks}"
                </p>
              </div>
            )}
          </div>

          {/* Admin Verification Notes & Auditor Identity */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4.5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-black text-stone-900 uppercase">
                Admin Audit Notes & Staff Feedback (Optional)
              </label>
              <div className="flex items-center gap-2">
                <VoiceTranscribeButton
                  fieldName="Admin Notes"
                  currentValue={adminNotes}
                  size="sm"
                  onTranscript={(transcribedText, mode) => {
                    const updated =
                      mode === 'append' && adminNotes
                        ? `${adminNotes} ${transcribedText}`
                        : transcribedText;
                    setAdminNotes(updated);
                  }}
                />
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <span>Audited By:</span>
                  <input
                    type="text"
                    value={adminAuditorName}
                    onChange={(e) => setAdminAuditorName(e.target.value)}
                    className="bg-white border border-stone-300 rounded-lg px-2 py-0.5 text-xs font-bold text-stone-800 w-36 outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="e.g. Room passed inspection with high marks. Replaced pillow was verified clean. No dust found on window ledges."
              className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs sm:text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 min-h-[70px]"
            />

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold text-stone-400 uppercase">Quick Notes:</span>
              <button
                type="button"
                onClick={() => addQuickAdminNote('All areas clean and passes inspection')}
                className="text-[11px] font-bold bg-white hover:bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1 text-stone-700 transition"
              >
                + Spotless clean
              </button>
              <button
                type="button"
                onClick={() => addQuickAdminNote('Bathroom mirror needs re-wipe without streaks')}
                className="text-[11px] font-bold bg-white hover:bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1 text-stone-700 transition"
              >
                + Mirror streak re-wipe
              </button>
              <button
                type="button"
                onClick={() => addQuickAdminNote('Restock hand towels and soap bottle')}
                className="text-[11px] font-bold bg-white hover:bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1 text-stone-700 transition"
              >
                + Restock towels/soap
              </button>
              <button
                type="button"
                onClick={() => addQuickAdminNote('Dust under-bed drawers properly next time')}
                className="text-[11px] font-bold bg-white hover:bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1 text-stone-700 transition"
              >
                + Check under bed
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Verification Workflow Actions */}
        <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500 font-medium">
            Audit Score: <strong className="text-stone-900">{auditScore}%</strong> ({passCount} Pass, {failCount} Fail)
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-200 text-stone-700 text-xs font-bold transition"
            >
              Cancel
            </button>

            <button
              type="button"
              id="btn-flag-discrepancy"
              onClick={handleFlagDiscrepancy}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Flag Discrepancy</span>
            </button>

            <button
              type="button"
              id="btn-approve-audit"
              onClick={handleApprove}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center justify-center gap-1.5 transition shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve & Close Audit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
