import React, { useState } from 'react';
import { Copy, Check, Download, Code, X, ShieldCheck } from 'lucide-react';

interface AdminSingleFileExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSingleFileExportModal: React.FC<AdminSingleFileExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const standaloneAdminHtmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bunk Hostel - Admin Housekeeping Audit Portal</title>
  <style>
    :root {
      --primary: #f59e0b;
      --primary-dark: #d97706;
      --success: #10b981;
      --success-light: #ecfdf5;
      --danger: #ef4444;
      --danger-light: #fef2f2;
      --warning: #f59e0b;
      --warning-light: #fffbeb;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --sidebar-bg: #0f172a;
      --text: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
      --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
      --shadow-lg: 0 12px 24px -4px rgba(0,0,0,0.12);
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      display: flex;
      min-height: 100vh;
    }

    /* Sidebar Navigation */
    aside {
      width: 260px;
      background: var(--sidebar-bg);
      color: #fff;
      display: flex;
      flex-direction: column;
      border-right: 1px solid #1e293b;
      flex-shrink: 0;
    }
    .brand-section {
      padding: 24px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid #1e293b;
    }
    .brand-logo {
      width: 40px;
      height: 40px;
      background: var(--primary);
      color: #000;
      font-weight: 900;
      font-size: 20px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .brand-text h1 {
      font-size: 16px;
      font-weight: 800;
      letter-spacing: -0.3px;
    }
    .brand-text p {
      font-size: 11px;
      color: #94a3b8;
      font-weight: 600;
    }
    .nav-list {
      padding: 20px 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      list-style: none;
      flex: 1;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 10px;
      color: #94a3b8;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .nav-item:hover, .nav-item.active {
      background: #1e293b;
      color: #fff;
    }
    .nav-item.active {
      border-left: 3px solid var(--primary);
      color: var(--primary);
    }
    .sidebar-footer {
      padding: 16px 20px;
      border-top: 1px solid #1e293b;
      font-size: 12px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .admin-avatar {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: #334155;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      color: #f8fafc;
    }

    /* Main Content Area */
    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }
    header {
      background: #fff;
      border-bottom: 1px solid var(--border);
      padding: 16px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: var(--shadow-sm);
    }
    .header-title h2 {
      font-size: 20px;
      font-weight: 900;
      color: #0f172a;
    }
    .header-title p {
      font-size: 12px;
      color: var(--text-muted);
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .btn-secondary {
      background: #f1f5f9;
      border: 1px solid var(--border);
      padding: 8px 14px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 700;
      color: #334155;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    .btn-secondary:hover {
      background: #e2e8f0;
    }
    .btn-primary {
      background: var(--primary);
      border: none;
      padding: 8px 16px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 800;
      color: #000;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
      box-shadow: var(--shadow-sm);
    }
    .btn-primary:hover {
      background: var(--primary-dark);
    }

    .content-body {
      padding: 28px 32px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* KPI Summary Stats Cards */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    .kpi-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 18px 20px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .kpi-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .kpi-val {
      font-size: 26px;
      font-weight: 900;
      color: #0f172a;
    }
    .kpi-sub {
      font-size: 12px;
      font-weight: 600;
    }

    /* Data Table Card */
    .table-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 18px;
      box-shadow: var(--shadow-sm);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .table-toolbar {
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .search-input {
      background: #f8fafc;
      border: 1px solid var(--border);
      padding: 8px 14px;
      border-radius: 10px;
      font-size: 13px;
      width: 280px;
      outline: none;
    }
    .search-input:focus {
      border-color: var(--primary);
      background: #fff;
    }
    .filter-chips {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .chip {
      background: #f1f5f9;
      border: 1px solid var(--border);
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      color: #475569;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .chip.active {
      background: #0f172a;
      color: #fff;
      border-color: #0f172a;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13px;
    }
    th {
      background: #f8fafc;
      padding: 12px 20px;
      font-size: 11px;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid var(--border);
    }
    td {
      padding: 14px 20px;
      border-bottom: 1px solid var(--border);
      color: #334155;
      font-weight: 500;
      vertical-align: middle;
    }
    tr:hover td {
      background: #f8fafc;
    }
    .row-clickable {
      cursor: pointer;
    }

    /* Status Badges */
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .status-pending {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
    }
    .status-verified {
      background: #dcfce7;
      color: #166534;
      border: 1px solid #bbf7d0;
    }
    .status-discrepancy {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }

    .btn-audit {
      background: #0f172a;
      color: #fff;
      border: none;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-audit:hover {
      background: #334155;
    }

    /* Modal / Inspection Drawer */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(4px);
      z-index: 999;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal-overlay.active {
      display: flex;
    }
    .modal-card {
      background: #fff;
      border-radius: 24px;
      width: 100%;
      max-width: 820px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border);
      overflow: hidden;
      animation: modalSlide 0.25s ease-out;
    }
    @keyframes modalSlide {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .modal-header {
      background: #0f172a;
      color: #fff;
      padding: 18px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .modal-body {
      padding: 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .modal-footer {
      background: #f8fafc;
      padding: 16px 24px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    /* Task Item Row in Modal */
    .audit-task-row {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      margin-bottom: 8px;
    }
    .audit-task-row.passed {
      background: #f0fdf4;
      border-color: #bbf7d0;
    }
    .audit-task-row.failed {
      background: #fef2f2;
      border-color: #fecaca;
    }
    .toggle-group {
      display: flex;
      background: #f1f5f9;
      padding: 2px;
      border-radius: 8px;
    }
    .toggle-btn {
      border: none;
      background: none;
      padding: 6px 12px;
      font-size: 11px;
      font-weight: 800;
      border-radius: 6px;
      cursor: pointer;
      color: #64748b;
    }
    .toggle-btn.active-pass {
      background: #16a34a;
      color: #fff;
    }
    .toggle-btn.active-fail {
      background: #dc2626;
      color: #fff;
    }
    .form-textarea {
      width: 100%;
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px;
      font-size: 13px;
      outline: none;
      resize: vertical;
      min-height: 70px;
    }
    .form-textarea:focus {
      background: #fff;
      border-color: var(--primary);
    }
  </style>
</head>
<body>

  <!-- Sidebar -->
  <aside>
    <div class="brand-section">
      <div class="brand-logo">B</div>
      <div class="brand-text">
        <h1>Bunk Hostel</h1>
        <p>Admin Audit Portal</p>
      </div>
    </div>

    <ul class="nav-list">
      <li class="nav-item active">📋 Daily Reports</li>
      <li class="nav-item">🛡️ Audit Logs</li>
      <li class="nav-item">📊 Quality Analytics</li>
      <li class="nav-item">⚙️ Settings</li>
    </ul>

    <div class="sidebar-footer">
      <div class="admin-avatar">R</div>
      <div>
        <div style="font-weight:800; color:#f8fafc;">Rohit V.</div>
        <div style="font-size:11px; color:#94a3b8;">Operations Lead</div>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <main>
    <header>
      <div class="header-title">
        <h2>Housekeeping Inspection Dashboard</h2>
        <p>Verify staff daily shifts, audit cleaning standards, and log discrepancies.</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" onclick="seedMockReport()">+ Simulate New Shift</button>
        <button class="btn-secondary" onclick="resetAllReports()">↻ Reset Demo Data</button>
      </div>
    </header>

    <div class="content-body">
      <!-- KPI Stats -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Submissions Today</span>
          <span class="kpi-val" id="stat-total">0</span>
          <span class="kpi-sub" style="color:var(--text-muted);">Across 7 areas</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Pending Review</span>
          <span class="kpi-val" id="stat-pending" style="color:#d97706;">0</span>
          <span class="kpi-sub" style="color:#d97706;">Needs manager walk-through</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Verified Clean</span>
          <span class="kpi-val" id="stat-verified" style="color:#16a34a;">0</span>
          <span class="kpi-sub" style="color:#16a34a;">Audited and approved</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Discrepancies</span>
          <span class="kpi-val" id="stat-discrepancy" style="color:#dc2626;">0</span>
          <span class="kpi-sub" style="color:#dc2626;">Action assigned to staff</span>
        </div>
      </div>

      <!-- Data Table Card -->
      <div class="table-card">
        <div class="table-toolbar">
          <input
            type="text"
            id="table-search"
            class="search-input"
            placeholder="Search by area, staff name or ID..."
            oninput="renderTable()"
          />
          <div class="filter-chips">
            <button class="chip active" id="chip-all" onclick="setFilter('All')">All Reports</button>
            <button class="chip" id="chip-pending" onclick="setFilter('Pending')">🟡 Pending</button>
            <button class="chip" id="chip-verified" onclick="setFilter('Verified')">🟢 Verified</button>
            <button class="chip" id="chip-discrepancy" onclick="setFilter('Discrepancy')">🔴 Discrepancy</button>
          </div>
        </div>

        <table id="reports-table">
          <thead>
            <tr>
              <th>ID & Date</th>
              <th>Location Cleaned</th>
              <th>Staff Member</th>
              <th>Shift</th>
              <th>Response</th>
              <th>Audit Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="table-body">
            <!-- Rows dynamically rendered -->
          </tbody>
        </table>
      </div>
    </div>
  </main>

  <!-- Report Detail & Audit Inspection Modal -->
  <div id="audit-modal" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <div>
          <h3 id="modal-title" style="font-size:16px; font-weight:800;">Audit Inspection</h3>
          <p id="modal-sub" style="font-size:12px; color:#94a3b8;">Submission review</p>
        </div>
        <button onclick="closeModal()" style="background:none; border:none; color:#fff; font-size:20px; cursor:pointer;">✕</button>
      </div>

      <div class="modal-body" id="modal-body-content">
        <!-- Injected via JavaScript -->
      </div>

      <div class="modal-footer">
        <button class="btn-secondary" onclick="closeModal()">Cancel</button>
        <div style="display:flex; gap:10px;">
          <button class="btn-secondary" style="background:#fee2e2; color:#991b1b; border-color:#fecaca; font-weight:800;" onclick="flagDiscrepancy()">
            ⚠️ Flag Discrepancy
          </button>
          <button class="btn-primary" style="background:#16a34a; color:#fff;" onclick="approveAudit()">
            ✓ Approve & Close Audit
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    const STORAGE_KEY = 'bunk_hostel_audit_reports_v1';
    let currentFilter = 'All';
    let activeAuditReport = null;

    const DEFAULT_REPORTS = [
      {
        id: 'RPT-2026-0801',
        date: '2026-08-21',
        time: '08:30 AM',
        locationName: '107, 207 & Dorm hall',
        formName: 'Dorm',
        staffName: 'Jasvir Singh',
        staffId: 'HK-001',
        shiftTiming: 'Morning',
        status: 'Pending',
        responseType: 'Cleaned',
        tasks: [
          { id: 'd1', tag: 'Bunk Bed', title: 'Bunk bed mattress, clean sheets, and pillow set neatly.', verified: 'pass' },
          { id: 'd2', tag: 'Drawers', title: 'Under-bed drawers dusted and emptied.', verified: 'pass' },
          { id: 'd3', tag: 'Floor', title: 'Dorm hall floor swept, mopped, and corners cleaned.', verified: 'unverified' },
          { id: 'd4', tag: 'Curtains', title: 'Bunk bed privacy curtains clean and washed.', verified: 'unverified' },
          { id: 'd5', tag: 'Dustbins', title: 'Dustbins emptied and fresh trash bags installed.', verified: 'unverified' },
          { id: 'd6', tag: 'Bathroom', title: 'Attached bathroom toilet, sink, and tiles sanitized.', verified: 'unverified' }
        ],
        section10: {
          issues: 'Bed 207-B pillow cover had slight laundry mark',
          action: 'Replaced immediately with fresh crisp linen',
          by: 'Jasvir',
          remarks: 'Dorm hall smells fresh; Air Conditioner set to 24°C.'
        },
        adminNotes: ''
      },
      {
        id: 'RPT-2026-0802',
        date: '2026-08-21',
        time: '07:15 AM',
        locationName: 'Yoga Hall',
        formName: 'Yoga Hall',
        staffName: 'Rajeshwari Sharma',
        staffId: 'HK-002',
        shiftTiming: 'Morning',
        status: 'Verified',
        responseType: 'Cleaned',
        tasks: [
          { id: 'y1', tag: 'Floor', title: 'Yoga hall wooden floor polished and dust-free.', verified: 'pass' },
          { id: 'y2', tag: 'Yoga Mats', title: 'All yoga mats sanitized and neatly rolled.', verified: 'pass' },
          { id: 'y3', tag: 'Mirrors', title: 'Wall mirrors cleaned with glass spray.', verified: 'pass' },
          { id: 'y4', tag: 'Cushions', title: 'Meditation cushions arranged in order.', verified: 'pass' },
          { id: 'y5', tag: 'Fragrance', title: 'Fresh ventilation and aromatic diffuser active.', verified: 'pass' }
        ],
        section10: {
          issues: 'Aroma diffuser water empty',
          action: 'Refilled with lemongrass essential oil and water',
          by: 'Rajeshwari',
          remarks: 'Ready for morning 8 AM guest meditation batch.'
        },
        adminNotes: 'Excellent inspection. Pleasant fragrance and spotless mats.'
      },
      {
        id: 'RPT-2026-0803',
        date: '2026-08-21',
        time: '06:00 AM',
        locationName: 'Cafe (Indoor or Outdoor)',
        formName: 'Cafe/Restaurant',
        staffName: 'Vikram Mehta',
        staffId: 'HK-004',
        shiftTiming: 'Morning',
        status: 'Discrepancy',
        responseType: 'Needs Cleaning',
        tasks: [
          { id: 'c1', tag: 'Dining Tables', title: 'All dining tables and chairs sanitized.', verified: 'fail' },
          { id: 'c2', tag: 'Counter', title: 'Beverage & coffee counter wiped dry and clean.', verified: 'pass' },
          { id: 'c3', tag: 'Floor', title: 'Cafe floor swept and mopped.', verified: 'pass' },
          { id: 'c4', tag: 'Outdoor Seating', title: 'Outdoor patio tables dusted and organized.', verified: 'fail' },
          { id: 'c5', tag: 'Fireplace', title: 'Fireplace and lounge area cleaned.', verified: 'pass' }
        ],
        section10: {
          issues: 'Spilled chai on outdoor table 3',
          action: 'Quick wipe done',
          by: 'Vikram',
          remarks: 'Outdoor patio chairs need deep scrub.'
        },
        adminNotes: 'Outdoor table 3 and chairs still sticky during walk-through. Reassigned to Vikram for re-wipe.'
      }
    ];

    function getReports() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_REPORTS));
        return DEFAULT_REPORTS;
      }
      try {
        return JSON.parse(raw);
      } catch {
        return DEFAULT_REPORTS;
      }
    }

    function saveReports(reports) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    }

    function updateKPIs(reports) {
      const total = reports.length;
      const pending = reports.filter(r => r.status === 'Pending').length;
      const verified = reports.filter(r => r.status === 'Verified').length;
      const discrepancy = reports.filter(r => r.status === 'Discrepancy').length;

      document.getElementById('stat-total').innerText = total;
      document.getElementById('stat-pending').innerText = pending;
      document.getElementById('stat-verified').innerText = verified;
      document.getElementById('stat-discrepancy').innerText = discrepancy;
    }

    function setFilter(filter) {
      currentFilter = filter;
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      const activeId = filter === 'All' ? 'chip-all' : filter === 'Pending' ? 'chip-pending' : filter === 'Verified' ? 'chip-verified' : 'chip-discrepancy';
      document.getElementById(activeId).classList.add('active');
      renderTable();
    }

    function renderTable() {
      const reports = getReports();
      updateKPIs(reports);

      const query = document.getElementById('table-search').value.toLowerCase().trim();
      const filtered = reports.filter(r => {
        const matchesFilter = currentFilter === 'All' || r.status === currentFilter;
        const matchesQuery = !query || 
          r.locationName.toLowerCase().includes(query) ||
          r.staffName.toLowerCase().includes(query) ||
          r.staffId.toLowerCase().includes(query) ||
          r.id.toLowerCase().includes(query);
        return matchesFilter && matchesQuery;
      });

      const tbody = document.getElementById('table-body');
      tbody.innerHTML = '';

      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px; color:#94a3b8;">No reports match the selected criteria.</td></tr>';
        return;
      }

      filtered.forEach(r => {
        const tr = document.createElement('tr');
        tr.className = 'row-clickable';
        tr.onclick = (e) => {
          if (e.target.tagName !== 'BUTTON') openModal(r.id);
        };

        const statusClass = r.status === 'Verified' ? 'status-verified' : r.status === 'Discrepancy' ? 'status-discrepancy' : 'status-pending';

        tr.innerHTML = \`
          <td>
            <div style="font-weight:800; color:#0f172a;">\${r.id}</div>
            <div style="font-size:11px; color:#64748b;">\${r.date} • \${r.time}</div>
          </td>
          <td>
            <div style="font-weight:800; color:#0f172a;">\${r.locationName}</div>
            <div style="font-size:11px; color:#64748b;">Form: \${r.formName}</div>
          </td>
          <td>
            <div style="font-weight:700; color:#0f172a;">\${r.staffName}</div>
            <div style="font-size:11px; color:#64748b;">\${r.staffId}</div>
          </td>
          <td>
            <span style="font-size:12px; font-weight:700; background:#f1f5f9; padding:2px 8px; border-radius:6px;">\${r.shiftTiming}</span>
          </td>
          <td>
            <span style="font-size:12px; font-weight:700; color:\${r.responseType === 'Cleaned' ? '#166534' : '#b45309'}">\${r.responseType}</span>
          </td>
          <td>
            <span class="status-badge \${statusClass}">● \${r.status}</span>
          </td>
          <td>
            <button class="btn-audit" onclick="openModal('\${r.id}')">Inspect ➜</button>
          </td>
        \`;
        tbody.appendChild(tr);
      });
    }

    function openModal(reportId) {
      const reports = getReports();
      activeAuditReport = reports.find(r => r.id === reportId);
      if (!activeAuditReport) return;

      document.getElementById('modal-title').innerText = 'Audit: ' + activeAuditReport.locationName;
      document.getElementById('modal-sub').innerText = activeAuditReport.id + ' • ' + activeAuditReport.staffName + ' (' + activeAuditReport.staffId + ') • ' + activeAuditReport.date;

      const container = document.getElementById('modal-body-content');
      container.innerHTML = \`
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:14px; display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; font-size:12px;">
          <div><strong style="color:#64748b;">Area:</strong> <div style="font-weight:800; color:#0f172a;">\${activeAuditReport.locationName}</div></div>
          <div><strong style="color:#64748b;">Shift:</strong> <div style="font-weight:800; color:#0f172a;">\${activeAuditReport.shiftTiming} Shift</div></div>
          <div><strong style="color:#64748b;">Status:</strong> <div style="font-weight:800;">\${activeAuditReport.status}</div></div>
        </div>

        <div>
          <h4 style="font-size:13px; font-weight:800; margin-bottom:10px; text-transform:uppercase; color:#475569;">Checklist Physical Verification</h4>
          <div id="modal-tasks-list"></div>
        </div>

        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:14px; font-size:12px;">
          <h4 style="font-size:12px; font-weight:800; text-transform:uppercase; color:#475569; margin-bottom:8px;">Section 10 Staff Report</h4>
          <p><strong>Issues:</strong> \${activeAuditReport.section10.issues || 'None'}</p>
          <p style="margin-top:4px;"><strong>Action Taken:</strong> \${activeAuditReport.section10.action || 'Standard clean'}</p>
          <p style="margin-top:4px;"><strong>Staff Remarks:</strong> <em>"\${activeAuditReport.section10.remarks || 'Area ready'}"</em></p>
        </div>

        <div>
          <label style="font-size:12px; font-weight:800; text-transform:uppercase; color:#475569; display:block; margin-bottom:6px;">Admin Audit Notes</label>
          <textarea id="modal-admin-notes" class="form-textarea" placeholder="Enter notes or feedback for staff...">\${activeAuditReport.adminNotes || ''}</textarea>
        </div>
      \`;

      renderModalTasks();
      document.getElementById('audit-modal').classList.add('active');
    }

    function renderModalTasks() {
      const list = document.getElementById('modal-tasks-list');
      if (!list || !activeAuditReport) return;
      list.innerHTML = '';

      activeAuditReport.tasks.forEach(t => {
        const div = document.createElement('div');
        const isPass = t.verified === 'pass';
        const isFail = t.verified === 'fail';
        div.className = 'audit-task-row ' + (isPass ? 'passed' : isFail ? 'failed' : '');

        div.innerHTML = \`
          <div>
            <span style="font-size:10px; font-weight:800; background:#e2e8f0; padding:2px 6px; border-radius:4px; text-transform:uppercase;">\${t.tag || 'Item'}</span>
            <div style="font-size:13px; font-weight:700; color:#0f172a; margin-top:3px;">\${t.title}</div>
          </div>
          <div class="toggle-group">
            <button class="toggle-btn \${isPass ? 'active-pass' : ''}" onclick="setTaskVerification('\${t.id}', 'pass')">✓ Pass</button>
            <button class="toggle-btn \${isFail ? 'active-fail' : ''}" onclick="setTaskVerification('\${t.id}', 'fail')">✗ Fail</button>
          </div>
        \`;
        list.appendChild(div);
      });
    }

    function setTaskVerification(taskId, status) {
      if (!activeAuditReport) return;
      activeAuditReport.tasks.forEach(t => {
        if (t.id === taskId) {
          t.verified = t.verified === status ? 'unverified' : status;
        }
      });
      renderModalTasks();
    }

    function approveAudit() {
      if (!activeAuditReport) return;
      const notes = document.getElementById('modal-admin-notes').value;
      activeAuditReport.status = 'Verified';
      activeAuditReport.adminNotes = notes;

      const reports = getReports().map(r => r.id === activeAuditReport.id ? activeAuditReport : r);
      saveReports(reports);
      closeModal();
      renderTable();
      alert('✓ Report ' + activeAuditReport.id + ' approved and marked as Verified!');
    }

    function flagDiscrepancy() {
      if (!activeAuditReport) return;
      const notes = document.getElementById('modal-admin-notes').value || 'Discrepancy flagged during manager inspection.';
      activeAuditReport.status = 'Discrepancy';
      activeAuditReport.adminNotes = notes;

      const reports = getReports().map(r => r.id === activeAuditReport.id ? activeAuditReport : r);
      saveReports(reports);
      closeModal();
      renderTable();
      alert('⚠️ Report ' + activeAuditReport.id + ' flagged as Discrepancy.');
    }

    function closeModal() {
      document.getElementById('audit-modal').classList.remove('active');
      activeAuditReport = null;
    }

    function seedMockReport() {
      const now = new Date();
      const areas = ['Common Washroom', 'Reception', 'Staircase', '107, 207 & Dorm hall', 'Floors or Terrace'];
      const staffList = [{ name: 'Sunita Devi', id: 'HK-003' }, { name: 'Jasvir Singh', id: 'HK-001' }, { name: 'Vikram Mehta', id: 'HK-004' }];
      const chosenArea = areas[Math.floor(Math.random() * areas.length)];
      const chosenStaff = staffList[Math.floor(Math.random() * staffList.length)];
      const id = 'RPT-' + now.getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

      const newRpt = {
        id: id,
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        locationName: chosenArea,
        formName: chosenArea.split(' ')[0],
        staffName: chosenStaff.name,
        staffId: chosenStaff.id,
        shiftTiming: 'Morning',
        status: 'Pending',
        responseType: 'Cleaned',
        tasks: [
          { id: 't1', tag: 'Floor', title: chosenArea + ' swept and mopped thoroughly.', verified: 'unverified' },
          { id: 't2', tag: 'Surfaces', title: 'High touch fixtures sanitized.', verified: 'unverified' },
          { id: 't3', tag: 'Trash', title: 'Dustbins emptied and wiped clean.', verified: 'unverified' }
        ],
        section10: {
          issues: 'None',
          action: 'Complete clean standard achieved',
          by: chosenStaff.name,
          remarks: 'Ready for guest check-in.'
        },
        adminNotes: ''
      };

      const reports = [newRpt, ...getReports()];
      saveReports(reports);
      renderTable();
    }

    function resetAllReports() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_REPORTS));
      renderTable();
    }

    // Initialize table on load
    renderTable();
  </script>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(standaloneAdminHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([standaloneAdminHtmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bunk-hostel-admin-audit-portal.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-black text-stone-900">
              Admin Portal Standalone Single-File HTML Code
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-600 font-medium">
          Self-contained desktop admin dashboard with sidebar, summary KPIs, dynamic data table with live filters, verification modal drawer with Pass/Fail toggles, and localStorage persistence.
        </p>

        {/* Code Box */}
        <div className="flex-1 overflow-hidden rounded-2xl border border-stone-300 bg-stone-900 text-stone-100 font-mono text-xs p-3">
          <pre className="h-64 overflow-y-auto whitespace-pre-wrap select-all">
            {standaloneAdminHtmlCode}
          </pre>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={handleDownload}
            className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Download className="w-4 h-4" />
            <span>Download admin-portal.html</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black flex items-center gap-1.5 transition shadow"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-900 stroke-[3]" />
                <span>Copied Code!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy HTML Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
