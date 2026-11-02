import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  ClipboardList,
  History,
  BarChart3,
  Settings,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  Users,
  Plus,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Code,
  Download,
  Eye,
  Building2,
  Calendar,
  Smartphone,
  LogOut,
} from 'lucide-react';
import { AuditReportRecord, AuditStatus, AppMode, AdminAuthSession } from '../types';
import {
  getStoredAuditReports,
  saveAuditReports,
  INITIAL_MOCK_REPORTS,
} from '../utils/auditStorage';
import { AdminReportDetailModal } from './AdminReportDetailModal';
import { AdminSingleFileExportModal } from './AdminSingleFileExportModal';
import { UserManagementView } from './UserManagementView';
import { StandaloneUserManagementModal } from './StandaloneUserManagementModal';

interface AdminAuditPortalProps {
  onSwitchToStaffMode: () => void;
  currentSession: AdminAuthSession;
  onLogout: () => void;
}

export const AdminAuditPortal: React.FC<AdminAuditPortalProps> = ({
  onSwitchToStaffMode,
  currentSession,
  onLogout,
}) => {
  const [reports, setReports] = useState<AuditReportRecord[]>(() => getStoredAuditReports());
  const [selectedReport, setSelectedReport] = useState<AuditReportRecord | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isUserExportModalOpen, setIsUserExportModalOpen] = useState<boolean>(false);

  // Filters & State
  const [activeTab, setActiveTab] = useState<'reports' | 'logs' | 'analytics' | 'users' | 'settings'>('reports');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'All' | AuditStatus>('All');
  const [shiftFilter, setShiftFilter] = useState<'All' | 'Morning' | 'Evening'>('All');

  // Sync to local storage
  const handleUpdateReport = (updated: AuditReportRecord) => {
    const updatedList = reports.map((r) => (r.id === updated.id ? updated : r));
    setReports(updatedList);
    saveAuditReports(updatedList);
  };

  // Generate random new shift submission
  const handleGenerateMockSubmission = () => {
    const now = new Date();
    const areas = [
      { name: '107, 207 & Dorm hall', form: 'Dorm', id: 'dorm_hall' },
      { name: 'Yoga Hall', form: 'Yoga Hall', id: 'yoga_hall' },
      { name: 'Cafe (Indoor or Outdoor)', form: 'Cafe/Restaurant', id: 'cafe' },
      { name: 'Reception', form: 'Reception', id: 'reception' },
      { name: 'Common Washroom', form: 'Common Washroom', id: 'common_washroom' },
      { name: 'Staircase', form: 'Staircase', id: 'staircase' },
    ];
    const staffList = [
      { name: 'Jasvir Singh', id: 'HK-001' },
      { name: 'Rajeshwari Sharma', id: 'HK-002' },
      { name: 'Sunita Devi', id: 'HK-003' },
      { name: 'Vikram Mehta', id: 'HK-004' },
    ];
    const chosenArea = areas[Math.floor(Math.random() * areas.length)];
    const chosenStaff = staffList[Math.floor(Math.random() * staffList.length)];
    const reportId = `RPT-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord: AuditReportRecord = {
      id: reportId,
      submittedAt: now.toISOString(),
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      locationId: chosenArea.id,
      locationName: chosenArea.name,
      formName: chosenArea.form,
      staffName: chosenStaff.name,
      staffId: chosenStaff.id,
      shiftTiming: Math.random() > 0.5 ? 'Morning' : 'Evening',
      status: 'Pending',
      responseType: 'Cleaned',
      photoUpload: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      tasks: [
        { id: 't1', tag: 'Area Clean', titleEn: `${chosenArea.name} deep swept and sanitized.`, completed: true, adminVerification: 'unverified' },
        { id: 't2', tag: 'Disinfection', titleEn: 'High contact touchpoints disinfected with hospital grade spray.', completed: true, adminVerification: 'unverified' },
        { id: 't3', tag: 'Trash', titleEn: 'Trash bins emptied and new liner installed.', completed: true, adminVerification: 'unverified' },
        { id: 't4', tag: 'Aroma', titleEn: 'Ventilation and pleasant room fragrance verified.', completed: true, adminVerification: 'unverified' }
      ],
      section10: {
        issuesIdentified: 'None (Standard cleaning completed)',
        correctiveAction: 'Full checklist protocol followed',
        actionTakenBy: chosenStaff.name,
        status: 'Completed',
        finalRemarks: 'Inspected and ready for guest use.',
      },
      adminNotes: '',
    };

    const updated = [newRecord, ...reports];
    setReports(updated);
    saveAuditReports(updated);
  };

  // Reset database back to default initial mock reports
  const handleResetDatabase = () => {
    if (window.confirm('Reset all audit logs and reports back to initial demo data?')) {
      setReports(INITIAL_MOCK_REPORTS);
      saveAuditReports(INITIAL_MOCK_REPORTS);
    }
  };

  // Open inspection modal
  const handleInspectRow = (report: AuditReportRecord) => {
    setSelectedReport(report);
    setIsDetailModalOpen(true);
  };

  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      const matchesShift = shiftFilter === 'All' || r.shiftTiming === shiftFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.locationName.toLowerCase().includes(q) ||
        r.staffName.toLowerCase().includes(q) ||
        r.staffId.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q);

      if (activeTab === 'logs') {
        // Logs view: show only verified or discrepancy
        return (r.status === 'Verified' || r.status === 'Discrepancy') && matchesStatus && matchesShift && matchesSearch;
      }
      return matchesStatus && matchesShift && matchesSearch;
    });
  }, [reports, statusFilter, shiftFilter, searchQuery, activeTab]);

  // KPI Calculations
  const totalCount = reports.length;
  const pendingCount = reports.filter((r) => r.status === 'Pending').length;
  const verifiedCount = reports.filter((r) => r.status === 'Verified').length;
  const discrepancyCount = reports.filter((r) => r.status === 'Discrepancy').length;
  const qualityRate = verifiedCount + discrepancyCount > 0
    ? Math.round((verifiedCount / (verifiedCount + discrepancyCount)) * 100)
    : 100;

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row text-stone-900 font-sans">
      {/* SIDEBAR NAVIGATION (Desktop-Optimized) */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-200 flex flex-col border-r border-stone-800 shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 font-black text-xl flex items-center justify-center shadow">
              B
            </div>
            <div>
              <h1 className="text-base font-black text-white tracking-tight leading-none">
                Bunk Hostel
              </h1>
              <p className="text-[11px] text-stone-400 font-bold uppercase tracking-wider mt-1">
                Admin Audit Portal
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 flex-1 space-y-1">
          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'reports'
                ? 'bg-amber-500 text-stone-950 shadow font-black'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Daily Reports</span>
            {pendingCount > 0 && (
              <span
                className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full ${
                  activeTab === 'reports'
                    ? 'bg-stone-950 text-amber-400'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}
              >
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'logs'
                ? 'bg-amber-500 text-stone-950 shadow font-black'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Audit History Logs</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'analytics'
                ? 'bg-amber-500 text-stone-950 shadow font-black'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Staff Quality Score</span>
          </button>

          <button
            id="tab-user-management-btn"
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'users'
                ? 'bg-amber-500 text-stone-950 shadow font-black'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Management</span>
            <span className="ml-auto text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
              CRUD
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-stone-950 shadow font-black'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Audit Settings</span>
          </button>
        </nav>

        {/* Switch to Staff Mobile App Action */}
        <div className="p-3 border-t border-stone-800 space-y-2">
          <button
            type="button"
            onClick={onSwitchToStaffMode}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition border border-stone-700 shadow-sm"
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Switch to Staff Checklist</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-stone-800/60 hover:bg-stone-800 text-stone-400 hover:text-amber-400 text-[11px] font-bold transition"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Export Portal HTML</span>
          </button>
        </div>

        {/* Current Auditor Profile */}
        <div className="p-4 border-t border-stone-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-black flex items-center justify-center text-sm shrink-0">
              {currentSession.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{currentSession.name}</div>
              <div className="text-[10px] text-amber-400 font-medium truncate">{currentSession.role}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-red-900/60 text-stone-400 hover:text-red-300 transition shrink-0"
            title="Logout and end session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT AREA */}
      {activeTab === 'users' ? (
        <UserManagementView
          currentSession={currentSession}
          onLogout={onLogout}
          onOpenCodeExport={() => setIsUserExportModalOpen(true)}
        />
      ) : (
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-stone-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-stone-900 tracking-tight">
                {activeTab === 'reports' && 'Daily Housekeeping Audit Portal'}
                {activeTab === 'logs' && 'Historical Verified Audits & Logs'}
                {activeTab === 'analytics' && 'Staff Quality & Inspection Analytics'}
                {activeTab === 'settings' && 'Hostel Area & Audit Configuration'}
              </h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Live Data
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Review staff submissions, physically verify area checklist items, and enforce hygiene standards.
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleGenerateMockSubmission}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-amber-50 hover:border-amber-300 border border-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition"
              title="Simulate a new staff submission coming in"
            >
              <Plus className="w-4 h-4 text-amber-600" />
              <span>Simulate Shift</span>
            </button>

            <button
              type="button"
              onClick={handleResetDatabase}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-600 hover:text-stone-900 transition"
              title="Reset to Initial Demo Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content Body Container */}
        <div className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          {/* Top KPI Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Total Reports Today */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">
                Total Submissions
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-black text-stone-900">{totalCount}</span>
                <span className="text-xs font-bold text-stone-500">7 Active Areas</span>
              </div>
            </div>

            {/* Pending Reviews (Yellow) */}
            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Pending Walkthrough
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-black text-amber-700">{pendingCount}</span>
                <span className="text-xs font-bold text-amber-800">Awaiting Pass/Fail</span>
              </div>
            </div>

            {/* Verified (Green) */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Clean
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-black text-emerald-700">{verifiedCount}</span>
                <span className="text-xs font-bold text-emerald-800">Approved by Lead</span>
              </div>
            </div>

            {/* Discrepancies (Red) */}
            <div className="bg-red-50/60 border border-red-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[11px] font-extrabold text-red-800 uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Discrepancies Flagged
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-black text-red-700">{discrepancyCount}</span>
                <span className="text-xs font-bold text-red-800">Action Assigned</span>
              </div>
            </div>

            {/* Quality Pass Rate */}
            <div className="bg-stone-900 text-white rounded-2xl p-4 shadow-sm flex flex-col justify-between col-span-2 lg:col-span-1">
              <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider">
                Hygiene Quality Score
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-black text-amber-400">{qualityRate}%</span>
                <span className="text-xs font-bold text-stone-300">Target ≥95%</span>
              </div>
            </div>
          </div>

          {/* MAIN TAB: Daily Reports & Data Table */}
          {(activeTab === 'reports' || activeTab === 'logs') && (
            <div className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
              {/* Toolbar with Search, Status Chips & Shift Selector */}
              <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-stone-50/60">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[220px] max-w-md">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by area, staff name, staff ID, or reference #..."
                    className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-stone-900 placeholder-stone-400 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Status Filter Chips */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-extrabold text-stone-400 uppercase mr-1">Status:</span>
                  {(['All', 'Pending', 'Verified', 'Discrepancy'] as const).map((st) => {
                    const isSelected = statusFilter === st;
                    return (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition border ${
                          isSelected
                            ? st === 'Pending'
                              ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-sm'
                              : st === 'Verified'
                              ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                              : st === 'Discrepancy'
                              ? 'bg-red-600 text-white border-red-700 shadow-sm'
                              : 'bg-stone-900 text-white border-stone-900 shadow-sm'
                            : 'bg-white hover:bg-stone-100 text-stone-600 border-stone-200'
                        }`}
                      >
                        {st === 'Pending' && '🟡 '}
                        {st === 'Verified' && '🟢 '}
                        {st === 'Discrepancy' && '🔴 '}
                        {st === 'All' ? 'All Reports' : st}
                      </button>
                    );
                  })}
                </div>

                {/* Shift Selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-extrabold text-stone-400 uppercase">Shift:</span>
                  <select
                    value={shiftFilter}
                    onChange={(e) => setShiftFilter(e.target.value as any)}
                    className="bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-stone-800 outline-none focus:border-amber-500"
                  >
                    <option value="All">All Shifts</option>
                    <option value="Morning">Morning Shift</option>
                    <option value="Evening">Evening Shift</option>
                  </select>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-black text-[11px] uppercase tracking-wider">
                      <th className="py-3.5 px-5">Report ID & Date</th>
                      <th className="py-3.5 px-5">Location Cleaned</th>
                      <th className="py-3.5 px-5">Staff Member</th>
                      <th className="py-3.5 px-5">Shift</th>
                      <th className="py-3.5 px-5">Condition</th>
                      <th className="py-3.5 px-5">Audit Status</th>
                      <th className="py-3.5 px-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200/80 font-medium text-stone-800">
                    {filteredReports.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-stone-400 text-xs">
                          No housekeeping reports match your selected criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredReports.map((item) => {
                        const isVerified = item.status === 'Verified';
                        const isDiscrepancy = item.status === 'Discrepancy';
                        const isPending = item.status === 'Pending';

                        return (
                          <tr
                            key={item.id}
                            onClick={() => handleInspectRow(item)}
                            className="hover:bg-amber-50/40 cursor-pointer transition"
                          >
                            {/* Report ID & Date */}
                            <td className="py-4 px-5">
                              <div className="font-mono font-black text-stone-900 text-xs">
                                {item.id}
                              </div>
                              <div className="text-[11px] text-stone-500 font-medium mt-0.5">
                                {item.date} • {item.time}
                              </div>
                            </td>

                            {/* Location Cleaned */}
                            <td className="py-4 px-5">
                              <div className="font-extrabold text-stone-900">
                                {item.locationName}
                              </div>
                              <div className="text-[11px] text-stone-500 font-medium">
                                Form: <span className="font-bold text-stone-700">{item.formName}</span>
                              </div>
                            </td>

                            {/* Staff Member */}
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-stone-200 text-stone-800 font-black text-xs flex items-center justify-center">
                                  {item.staffName[0]}
                                </div>
                                <div>
                                  <div className="font-bold text-stone-900">{item.staffName}</div>
                                  <div className="text-[11px] font-mono text-stone-500">{item.staffId}</div>
                                </div>
                              </div>
                            </td>

                            {/* Shift */}
                            <td className="py-4 px-5">
                              <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 font-bold text-xs border border-stone-200">
                                {item.shiftTiming}
                              </span>
                            </td>

                            {/* Staff Condition */}
                            <td className="py-4 px-5">
                              <span
                                className={`font-bold text-xs ${
                                  item.responseType === 'Cleaned'
                                    ? 'text-emerald-700'
                                    : item.responseType === 'Needs Cleaning'
                                    ? 'text-amber-700'
                                    : 'text-red-700'
                                }`}
                              >
                                {item.responseType}
                              </span>
                              {item.photoUpload && (
                                <span className="ml-1.5 text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-bold border border-stone-200">
                                  📷 Proof
                                </span>
                              )}
                            </td>

                            {/* Audit Status Tag */}
                            <td className="py-4 px-5">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                                  isVerified
                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                    : isDiscrepancy
                                    ? 'bg-red-100 text-red-800 border-red-300'
                                    : 'bg-amber-100 text-amber-800 border-amber-300'
                                }`}
                              >
                                <span>{isVerified ? '● Verified' : isDiscrepancy ? '● Discrepancy' : '● Pending'}</span>
                              </span>
                            </td>

                            {/* Action Button */}
                            <td className="py-4 px-5 text-right">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleInspectRow(item);
                                }}
                                className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white text-xs font-black inline-flex items-center gap-1 transition shadow-sm"
                              >
                                <span>Inspect</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                <span>
                  Showing <strong>{filteredReports.length}</strong> of <strong>{reports.length}</strong> total submissions
                </span>
                <span className="font-bold text-stone-700">
                  Click any row to open the full physical audit verification drawer
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: STAFF QUALITY ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Staff Leaderboard */}
                <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-amber-600" />
                    <span>Staff Housekeeping Performance</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Rajeshwari Sharma', id: 'HK-002', audits: 8, passRate: 100, area: 'Yoga Hall & Reception' },
                      { name: 'Jasvir Singh', id: 'HK-001', audits: 12, passRate: 94, area: '107, 207 & Dorm hall' },
                      { name: 'Sunita Devi', id: 'HK-003', audits: 9, passRate: 91, area: 'Common Washroom & Floors' },
                      { name: 'Vikram Mehta', id: 'HK-004', audits: 6, passRate: 83, area: 'Cafe & Outdoor Lounge' },
                    ].map((staff) => (
                      <div
                        key={staff.id}
                        className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center text-sm">
                            {staff.name[0]}
                          </div>
                          <div>
                            <div className="font-bold text-stone-900 text-xs sm:text-sm">
                              {staff.name} <span className="font-mono text-stone-400 text-xs">({staff.id})</span>
                            </div>
                            <div className="text-xs text-stone-500 font-medium">{staff.area}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-black text-emerald-700">{staff.passRate}% Pass</div>
                          <div className="text-[11px] text-stone-500 font-medium">{staff.audits} Shifts Audited</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Area Hygiene Compliance Breakdown */}
                <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-amber-600" />
                    <span>Hostel Area Compliance Score</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { area: 'Yoga Hall', score: 100, status: 'Flawless Standard' },
                      { area: '107, 207 & Dorm hall', score: 96, status: 'High Standard' },
                      { area: 'Reception & Guest Lounge', score: 95, status: 'High Standard' },
                      { area: 'Common Washrooms', score: 92, status: 'Needs Frequent Soap Check' },
                      { area: 'Cafe & Outdoor Patio', score: 85, status: 'Sticky Table Issues' },
                    ].map((loc) => (
                      <div key={loc.area} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-stone-800">{loc.area}</span>
                          <span className="text-amber-700 font-black">{loc.score}%</span>
                        </div>
                        <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-stone-200">
                          <div
                            className={`h-full rounded-full transition-all ${
                              loc.score >= 95
                                ? 'bg-emerald-500'
                                : loc.score >= 90
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${loc.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 max-w-2xl">
              <h3 className="text-base font-black text-stone-900">Hostel Audit Configuration</h3>
              <div className="space-y-4 text-xs font-medium text-stone-700">
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
                  <h4 className="font-bold text-stone-900 text-sm">Pass/Fail Inspection Rules</h4>
                  <p className="text-stone-600">
                    Staff checklists mandate 100% item completion prior to submitting Section 10. Managers must physically audit and verify at least 80% pass score to approve reports.
                  </p>
                </div>

                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
                  <h4 className="font-bold text-stone-900 text-sm">Assigned Lead Auditor</h4>
                  <p className="text-stone-600">Current Lead: <strong>{currentSession.name} ({currentSession.role})</strong></p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      )}

      {/* Report Inspection Modal Drawer */}
      <AdminReportDetailModal
        report={selectedReport}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedReport(null);
        }}
        onUpdateReport={handleUpdateReport}
      />

      {/* Standalone Admin Single File Export Modal */}
      <AdminSingleFileExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      {/* Standalone User Management Export Modal */}
      <StandaloneUserManagementModal
        isOpen={isUserExportModalOpen}
        onClose={() => setIsUserExportModalOpen(false)}
      />
    </div>
  );
};
