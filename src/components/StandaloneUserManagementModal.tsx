import React, { useState } from 'react';
import { Code, Copy, Check, Download, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface StandaloneUserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandaloneUserManagementModal: React.FC<StandaloneUserManagementModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const standaloneCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bunk Hostel - Secure Admin & User Management System</title>
  <!-- Tailwind CSS CDN for instant clean styling -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn { animation: fadeIn 0.25s ease-out forwards; }
  </style>
</head>
<body class="bg-stone-100 text-stone-900 min-h-screen font-sans antialiased">

  <!-- 1. ADMIN LOGIN VIEW -->
  <div id="login-view" class="min-h-screen bg-stone-950 flex flex-col justify-center items-center px-4 py-8 text-stone-100">
    <div class="w-full max-w-md space-y-5 animate-fadeIn">
      <div class="text-center space-y-2">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500 text-stone-950 font-black text-2xl shadow-lg">B</div>
        <h1 class="text-2xl font-black text-white">Bunk Hostel Portal</h1>
        <p class="text-xs text-stone-400">Super Admin Authentication & User Management</p>
      </div>

      <div class="bg-stone-900 rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-2xl space-y-5">
        <div id="login-error" class="hidden bg-red-950/60 border border-red-500/40 rounded-2xl p-3 text-red-200 text-xs font-semibold"></div>

        <form onsubmit="handleLogin(event)" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-stone-300 uppercase mb-1">Username</label>
            <input type="text" id="login-username" placeholder="mohit_admin" required class="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-amber-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-stone-300 uppercase mb-1">Password</label>
            <input type="password" id="login-password" placeholder="••••••••••••" required class="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-amber-500 focus:outline-none" />
          </div>
          <div class="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400">
            🔒 <strong>Strict Single-Session:</strong> Stored strictly in <code>sessionStorage</code> and auto-destroys when the browser tab is closed.
          </div>
          <button type="submit" class="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm transition active:scale-95">Sign In as Admin ➔</button>
        </form>
      </div>
    </div>
  </div>

  <!-- 2. PROTECTED ADMIN DASHBOARD -->
  <div id="dashboard-view" class="hidden min-h-screen flex flex-col bg-stone-100">
    <header class="bg-stone-900 text-white px-6 py-4 border-b border-stone-800 flex items-center justify-between sticky top-0 z-30">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center">M</div>
        <div>
          <h2 id="dash-user-name" class="text-sm font-black text-white">Mohit Gupta</h2>
          <p class="text-xs text-stone-400">Super Admin (sessionStorage Active)</p>
        </div>
      </div>
      <button onclick="handleLogout()" class="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black transition">Logout</button>
    </header>

    <main class="p-6 max-w-7xl mx-auto w-full space-y-6 flex-1">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-black text-stone-950">User Management System</h1>
          <p class="text-xs text-stone-600">Full Access CRUD for Super Admin Mohit Gupta</p>
        </div>
        <button onclick="openCreateModal()" class="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs shadow transition">+ Create New User</button>
      </div>

      <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <table class="w-full text-left text-xs sm:text-sm">
          <thead class="bg-stone-50 border-b border-stone-200 text-stone-600 font-extrabold uppercase text-[11px]">
            <tr>
              <th class="py-3 px-4">Name</th>
              <th class="py-3 px-4">Username</th>
              <th class="py-3 px-4">Role</th>
              <th class="py-3 px-4">Password</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="table-body" class="divide-y divide-stone-100"></tbody>
        </table>
      </div>
    </main>
  </div>

  <!-- 3. CRUD MODAL -->
  <div id="user-modal" class="hidden fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
    <div class="bg-white max-w-md w-full rounded-2xl p-6 space-y-4">
      <h3 id="modal-title" class="text-base font-black text-stone-900">Create User</h3>
      <form onsubmit="saveUser(event)" class="space-y-3 text-xs">
        <input type="hidden" id="modal-id" />
        <div>
          <label class="block font-bold text-stone-700 mb-1">Full Name</label>
          <input type="text" id="modal-name" required class="w-full px-3 py-2 bg-stone-50 border rounded-lg" />
        </div>
        <div>
          <label class="block font-bold text-stone-700 mb-1">Username</label>
          <input type="text" id="modal-username" required class="w-full px-3 py-2 bg-stone-50 border rounded-lg font-mono" />
        </div>
        <div>
          <label class="block font-bold text-stone-700 mb-1">Password</label>
          <input type="text" id="modal-password" required class="w-full px-3 py-2 bg-stone-50 border rounded-lg font-mono" />
        </div>
        <div>
          <label class="block font-bold text-stone-700 mb-1">Role</label>
          <select id="modal-role" class="w-full px-3 py-2 bg-stone-50 border rounded-lg font-bold">
            <option>Super Admin</option>
            <option>Manager</option>
            <option>Housekeeping Supervisor</option>
            <option selected>Housekeeping Staff</option>
            <option>Maintenance</option>
          </select>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" onclick="closeModal()" class="px-3 py-1.5 rounded-lg bg-stone-100">Cancel</button>
          <button type="submit" class="px-4 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-black">Save</button>
        </div>
      </form>
    </div>
  </div>

  <script>
    const SUPER_ADMIN = { name: "Mohit Gupta", username: "mohit_admin", password: "Mohit@Secure2026!", role: "Super Admin" };
    let users = [
      { id: "1", name: "Mohit Gupta", username: "mohit_admin", password: "Mohit@Secure2026!", role: "Super Admin", status: "Active" },
      { id: "2", name: "Subhash Sharma", username: "subhash_mgr", password: "Subhash@2026!", role: "Manager", status: "Active" },
      { id: "3", name: "Jasvir Singh", username: "jasvir_hk", password: "Jasvir@2026!", role: "Housekeeping Supervisor", status: "Active" },
      { id: "4", name: "Rajeshwari Sharma", username: "rajeshwari_hk", password: "Rajeshwari@2026!", role: "Housekeeping Staff", status: "Active" }
    ];

    function checkSession() {
      const token = sessionStorage.getItem("admin_token");
      if (!token) {
        document.getElementById('login-view').classList.remove('hidden');
        document.getElementById('dashboard-view').classList.add('hidden');
      } else {
        document.getElementById('login-view').classList.add('hidden');
        document.getElementById('dashboard-view').classList.remove('hidden');
        renderTable();
      }
    }

    function handleLogin(e) {
      e.preventDefault();
      const u = document.getElementById('login-username').value.trim();
      const p = document.getElementById('login-password').value.trim();

      if ((u === SUPER_ADMIN.username && p === SUPER_ADMIN.password) || users.some(x => x.username === u && x.password === p)) {
        sessionStorage.setItem("admin_token", "AUTH_" + Date.now());
        checkSession();
      } else {
        const err = document.getElementById('login-error');
        err.innerText = "Invalid credentials. Use mohit_admin / Mohit@Secure2026!";
        err.classList.remove('hidden');
      }
    }

    function handleLogout() {
      sessionStorage.clear();
      checkSession();
    }

    function renderTable() {
      const tbody = document.getElementById('table-body');
      tbody.innerHTML = users.map(u => \`
        <tr class="hover:bg-stone-50">
          <td class="py-3 px-4 font-bold">\${u.name}</td>
          <td class="py-3 px-4 font-mono">@\${u.username}</td>
          <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">\${u.role}</span></td>
          <td class="py-3 px-4 font-mono text-xs">\${u.password}</td>
          <td class="py-3 px-4 font-bold text-emerald-600">\${u.status}</td>
          <td class="py-3 px-4 text-right">
            <button onclick="editUser('\${u.id}')" class="px-2 py-1 bg-stone-100 rounded mr-1">Edit</button>
            <button onclick="deleteUser('\${u.id}')" class="px-2 py-1 bg-stone-100 text-red-600 rounded">Delete</button>
          </td>
        </tr>
      \`).join('');
    }

    function openCreateModal() {
      document.getElementById('modal-id').value = "";
      document.getElementById('modal-name').value = "";
      document.getElementById('modal-username').value = "";
      document.getElementById('modal-password').value = "Pass" + Math.floor(1000 + Math.random()*9000) + "!";
      document.getElementById('user-modal').classList.remove('hidden');
    }

    function editUser(id) {
      const u = users.find(x => x.id === id);
      if (!u) return;
      document.getElementById('modal-id').value = u.id;
      document.getElementById('modal-name').value = u.name;
      document.getElementById('modal-username').value = u.username;
      document.getElementById('modal-password').value = u.password;
      document.getElementById('modal-role').value = u.role;
      document.getElementById('user-modal').classList.remove('hidden');
    }

    function closeModal() { document.getElementById('user-modal').classList.add('hidden'); }

    function saveUser(e) {
      e.preventDefault();
      const id = document.getElementById('modal-id').value;
      const name = document.getElementById('modal-name').value;
      const username = document.getElementById('modal-username').value;
      const password = document.getElementById('modal-password').value;
      const role = document.getElementById('modal-role').value;

      if (id) {
        const u = users.find(x => x.id === id);
        if (u) { u.name = name; u.username = username; u.password = password; u.role = role; }
      } else {
        users.unshift({ id: String(Date.now()), name, username, password, role, status: 'Active' });
      }
      closeModal();
      renderTable();
    }

    function deleteUser(id) {
      const u = users.find(x => x.id === id);
      if (u && u.username === SUPER_ADMIN.username) { alert("Super Admin cannot be deleted."); return; }
      if (confirm("Delete user?")) {
        users = users.filter(x => x.id !== id);
        renderTable();
      }
    }

    window.onload = checkSession;
  </script>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(standaloneCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([standaloneCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-management-system.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-stone-900 text-stone-100 w-full max-w-4xl max-h-[90vh] rounded-3xl border border-stone-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Standalone Single-File User Management System
              </h2>
              <p className="text-xs text-stone-400 font-medium">
                Complete HTML + Embedded CSS + Embedded JavaScript Code
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="px-5 py-3 bg-stone-950 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Super Admin: <strong className="text-amber-300 font-mono">mohit_admin</strong> / <strong className="text-amber-300 font-mono">Mohit@Secure2026!</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black transition active:scale-95 shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-stone-950 stroke-[3]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Complete HTML Code'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold transition active:scale-95"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download .html</span>
            </button>
          </div>
        </div>

        {/* Code Preview Viewport */}
        <div className="flex-1 p-4 overflow-auto font-mono text-xs text-stone-300 bg-stone-950/90 leading-relaxed selection:bg-amber-500 selection:text-stone-950">
          <pre className="whitespace-pre-wrap">{standaloneCode}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between text-xs text-stone-400">
          <span>Single standalone file with zero build tools needed.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
