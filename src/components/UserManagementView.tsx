import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  ShieldCheck,
  Shield,
  KeyRound,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Copy,
  Check,
  RefreshCw,
  LogOut,
  Sparkles,
  AlertTriangle,
  Code,
  Building2,
  Clock,
  User,
  Mail,
  Phone,
  UserCheck,
  UserX,
  ChevronDown,
  ShieldAlert,
} from 'lucide-react';
import { UserRecord, UserRole, AdminAuthSession } from '../types';
import {
  getStoredUsers,
  saveStoredUsers,
  getActiveAdminSession,
  destroyAdminSession,
  DEFAULT_ADMIN_CREDENTIALS,
  isDefaultAdminAccount,
  approveUserRequest,
  rejectUserRequest,
} from '../utils/userStorage';

interface UserManagementViewProps {
  currentSession: AdminAuthSession;
  onLogout: () => void;
  onOpenCodeExport?: () => void;
}

const ROLES: UserRole[] = [
  'Admin',
  'Manager',
  'Housekeeping Supervisor',
  'Housekeeping Staff',
  'Maintenance',
];

export const UserManagementView: React.FC<UserManagementViewProps> = ({
  currentSession,
  onLogout,
}) => {
  // Session check verification: If sessionStorage is empty, instantly redirect back
  useEffect(() => {
    const session = getActiveAdminSession();
    if (!session || !session.token) {
      console.warn('No active session found in sessionStorage. Redirecting to login.');
      onLogout();
    }
  }, [onLogout]);

  const [users, setUsers] = useState<UserRecord[]>(() => getStoredUsers());
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | UserRole>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Approved' | 'Active' | 'Inactive'>('All');

  // Check if current logged in admin is the Default Admin (Mohit)
  const isCurrentSessionDefaultAdmin = useMemo(() => {
    return isDefaultAdminAccount(currentSession);
  }, [currentSession]);

  // Approval Modal State
  const [approvalTarget, setApprovalTarget] = useState<UserRecord | null>(null);
  const [selectedRoleForApproval, setSelectedRoleForApproval] = useState<UserRole>('Housekeeping Staff');

  // Rejection Modal State
  const [rejectionTarget, setRejectionTarget] = useState<UserRecord | null>(null);

  // Create / Edit User Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UserRecord | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState<UserRole>('Housekeeping Staff');
  const [formStatus, setFormStatus] = useState<'Approved' | 'Active' | 'Inactive'>('Approved');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [showFormPassword, setShowFormPassword] = useState(true);

  // Table password reveal state map
  const [visiblePasswords, setVisiblePasswords] = useState<{ [id: string]: boolean }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quick feedback alert
  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  // Separate Pending Requests vs Approved Users (Requirement 3)
  const pendingRequests = useMemo(() => {
    return users.filter((u) => u.status === 'Pending Approval');
  }, [users]);

  const approvedUsers = useMemo(() => {
    return users.filter((u) => u.status !== 'Pending Approval' && u.status !== 'Rejected');
  }, [users]);

  // Filtered Approved Users list
  const filteredApprovedUsers = useMemo(() => {
    return approvedUsers.filter((u) => {
      const matchesRole = roleFilter === 'All' || u.role === roleFilter;
      const matchesStatus =
        statusFilter === 'All' ||
        u.status === statusFilter ||
        (statusFilter === 'Active' && u.status === 'Approved') ||
        (statusFilter === 'Approved' && (u.status === 'Approved' || u.status === 'Active'));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        (u.email && u.email.toLowerCase().includes(q)) ||
        (u.phone && u.phone.toLowerCase().includes(q));

      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [approvedUsers, roleFilter, statusFilter, searchQuery]);

  // KPIs
  const pendingCount = pendingRequests.length;
  const approvedCount = approvedUsers.length;
  const adminCount = approvedUsers.filter((u) => u.role === 'Admin' || u.role === 'Super Admin' || u.role === 'Manager').length;
  const staffCount = approvedUsers.filter((u) => u.role.includes('Housekeeping')).length;

  // Handle Approve Click (Requirement 4)
  const handleOpenApproveModal = (user: UserRecord) => {
    setApprovalTarget(user);
    setSelectedRoleForApproval(user.role || 'Housekeeping Staff');
  };

  // Confirm Approval (Requirement 4)
  const handleConfirmApproval = () => {
    if (!approvalTarget) return;

    const res = approveUserRequest(approvalTarget.id, selectedRoleForApproval, currentSession.name);
    setUsers(res.users);
    showNotification(
      `Approved ${approvalTarget.name} as ${selectedRoleForApproval}. Account is now active!`
    );
    setApprovalTarget(null);
  };

  // Confirm Rejection (Requirement 4)
  const handleConfirmRejection = () => {
    if (!rejectionTarget) return;

    const res = rejectUserRequest(rejectionTarget.id);
    setUsers(res.users);
    showNotification(`Rejected registration request for ${rejectionTarget.name}.`, 'info');
    setRejectionTarget(null);
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setFormName('');
    setFormUsername('');
    setFormPassword(generateRandomPassword());
    setFormRole('Housekeeping Staff');
    setFormStatus('Approved');
    setFormEmail('');
    setFormPhone('');
    setFormError(null);
    setShowFormPassword(true);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (user: UserRecord) => {
    // If the account is Default Admin and current logged-in user is NOT Default Admin, block edit
    if (isDefaultAdminAccount(user) && !isCurrentSessionDefaultAdmin) {
      showNotification("Access Denied: No other user can edit the Default Admin's settings.", 'error');
      return;
    }

    setEditingUser(user);
    setFormName(user.name);
    setFormUsername(user.username);
    setFormPassword(user.password);
    setFormRole(user.role);
    setFormStatus(user.status === 'Inactive' ? 'Inactive' : 'Approved');
    setFormEmail(user.email || '');
    setFormPhone(user.phone || '');
    setFormError(null);
    setShowFormPassword(false);
    setIsModalOpen(true);
  };

  // Generate random strong password
  function generateRandomPassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${result}!`;
  }

  // Save Form (Create or Edit)
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const name = formName.trim();
    const username = formUsername.trim().toLowerCase().replace(/\s+/g, '_');
    const password = formPassword.trim();
    const email = formEmail.trim().toLowerCase();
    const phone = formPhone.trim();

    if (!name) {
      setFormError('Please enter the user full name.');
      return;
    }
    if (!username) {
      setFormError('Please enter a unique username or email.');
      return;
    }
    if (!password) {
      setFormError('Please enter a secure password.');
      return;
    }

    if (editingUser && isDefaultAdminAccount(editingUser) && !isCurrentSessionDefaultAdmin) {
      setFormError("Access Denied: No other user can edit the Default Admin's settings.");
      return;
    }

    // Check unique username / email
    const duplicate = users.find(
      (u) =>
        (u.username.toLowerCase() === username || (email && u.email?.toLowerCase() === email)) &&
        (!editingUser || u.id !== editingUser.id)
    );
    if (duplicate) {
      setFormError(`Account with username/email is already assigned to ${duplicate.name}.`);
      return;
    }

    if (editingUser) {
      // Update existing user
      const isTargetDefaultAdmin = isDefaultAdminAccount(editingUser);
      const updated = users.map((u) => {
        if (u.id === editingUser.id) {
          return {
            ...u,
            name,
            username: isTargetDefaultAdmin ? u.username : username,
            password,
            role: isTargetDefaultAdmin ? 'Admin' : formRole,
            status: isTargetDefaultAdmin ? 'Approved' : formStatus,
            email: email || u.email,
            phone: phone || u.phone,
          };
        }
        return u;
      });
      setUsers(updated);
      saveStoredUsers(updated);
      showNotification(`Updated profile for ${name}.`);
    } else {
      // Create new user
      const newId = `USR-${String(users.length + 1).padStart(3, '0')}`;
      const newUser: UserRecord = {
        id: newId,
        name,
        username,
        password,
        role: formRole,
        status: formStatus,
        email: email || `${username}@bunkhostel.in`,
        phone: phone || '+91 98765 00000',
        createdAt: new Date().toISOString().split('T')[0],
        approvedAt: new Date().toISOString().split('T')[0],
        approvedBy: currentSession.name,
      };
      const updated = [newUser, ...users];
      setUsers(updated);
      saveStoredUsers(updated);
      showNotification(`Created new user ID for ${name}.`);
    }

    setIsModalOpen(false);
  };

  // Toggle user status between Active/Approved and Inactive
  const handleToggleStatus = (userId: string) => {
    const targetUser = users.find((u) => u.id === userId);
    if (targetUser && isDefaultAdminAccount(targetUser)) {
      showNotification('Default Admin account is protected and cannot be deactivated.', 'error');
      return;
    }

    const updated = users.map((u) => {
      if (u.id === userId) {
        const newStatus = u.status === 'Inactive' ? 'Approved' : 'Inactive';
        return { ...u, status: newStatus as any };
      }
      return u;
    });
    setUsers(updated);
    saveStoredUsers(updated);
    showNotification('User status updated.');
  };

  // Change user role directly from table
  const handleChangeRole = (userId: string, newRole: UserRole) => {
    const targetUser = users.find((u) => u.id === userId);
    if (targetUser && isDefaultAdminAccount(targetUser)) {
      showNotification("Default Admin role is locked to Admin and cannot be changed.", 'error');
      return;
    }

    const updated = users.map((u) => {
      if (u.id === userId) {
        return { ...u, role: newRole };
      }
      return u;
    });
    setUsers(updated);
    saveStoredUsers(updated);
    showNotification(`Role updated to ${newRole}.`);
  };

  // Confirm delete user
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (isDefaultAdminAccount(deleteTarget)) {
      showNotification('Default Admin account is protected and cannot be deleted.', 'error');
      setDeleteTarget(null);
      return;
    }

    const updated = users.filter((u) => u.id !== deleteTarget.id);
    setUsers(updated);
    saveStoredUsers(updated);
    showNotification(`Deleted user ${deleteTarget.name}.`, 'info');
    setDeleteTarget(null);
  };

  // Toggle password view
  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Copy credentials to clipboard
  const handleCopyCredentials = (user: UserRecord) => {
    const credText = `Bunk Hostel Credentials:\nName: ${user.name}\nEmail/Username: ${user.email || user.username}\nPassword: ${user.password}\nRole: ${user.role}\nStatus: ${user.status}`;
    navigator.clipboard.writeText(credText);
    setCopiedId(user.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'Admin':
      case 'Super Admin':
        return 'bg-amber-500/20 text-amber-900 border-amber-500/40 font-black';
      case 'Manager':
        return 'bg-purple-100 text-purple-900 border-purple-300 font-bold';
      case 'Housekeeping Supervisor':
        return 'bg-blue-100 text-blue-900 border-blue-300 font-bold';
      case 'Housekeeping Staff':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
      case 'Maintenance':
        return 'bg-stone-200 text-stone-900 border-stone-300 font-bold';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-stone-100 min-h-screen">
      {/* Top Bar with Admin Session & Logout */}
      <div className="bg-stone-900 text-white px-6 py-4 border-b border-stone-800 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 font-black text-xl flex items-center justify-center shadow">
            {currentSession.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white">{currentSession.name}</h2>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-stone-950">
                {currentSession.role}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-medium flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Session active since {currentSession.loginTime} • Strict sessionStorage Security
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            id="btn-admin-logout"
            onClick={() => {
              destroyAdminSession();
              onLogout();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-black transition shadow-xs active:scale-95"
            title="Destroy session and return to login"
          >
            <LogOut className="w-4 h-4" />
            <span>End Session</span>
          </button>
        </div>
      </div>

      {/* Floating Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-bold animate-fadeIn ${
            notification.type === 'success'
              ? 'bg-emerald-900 text-emerald-100 border-emerald-600'
              : notification.type === 'info'
              ? 'bg-stone-900 text-stone-100 border-stone-700'
              : 'bg-red-900 text-red-100 border-red-600'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          <span>{notification.message}</span>
        </div>
      )}

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Header & Create Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight flex items-center gap-2.5">
              <Users className="w-7 h-7 text-amber-600" />
              <span>User Management Portal</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
              Approve pending user registrations, assign system roles, and manage hostel staff accounts.
            </p>
          </div>

          <button
            type="button"
            id="btn-create-user-modal"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-md hover:shadow-lg transition active:scale-95 shrink-0 ring-2 ring-amber-300"
          >
            <UserPlus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Create User ID Directly</span>
          </button>
        </div>

        {/* Top KPI Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Pending Approval Requests */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border shadow-xs space-y-1 transition ${
              pendingCount > 0
                ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/30'
                : 'bg-white border-stone-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Pending Requests</p>
              {pendingCount > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              )}
            </div>
            <p className="text-2xl sm:text-3xl font-black text-amber-600">{pendingCount}</p>
            <p className="text-[11px] text-amber-800 font-semibold">
              {pendingCount > 0 ? 'Action required: Approve/Reject' : 'All registrations processed'}
            </p>
          </div>

          {/* Approved Users */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Approved Users</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-600">{approvedCount}</p>
            <p className="text-[11px] text-stone-500 font-medium">Active in hostel system</p>
          </div>

          {/* Admins & Managers */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Admins & Managers</p>
            <p className="text-2xl sm:text-3xl font-black text-stone-900">{adminCount}</p>
            <p className="text-[11px] text-stone-500 font-medium">Portal access permissions</p>
          </div>

          {/* Housekeeping Staff */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Housekeeping Staff</p>
            <p className="text-2xl sm:text-3xl font-black text-stone-900">{staffCount}</p>
            <p className="text-[11px] text-stone-500 font-medium">Checklist App Users</p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: PENDING REGISTRATION REQUESTS (Requirement 3 & 4) */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-amber-200/80 shadow-md overflow-hidden space-y-0">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50 via-amber-50/50 to-white border-b border-amber-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 font-black flex items-center justify-center shadow-xs">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-stone-900">
                    Pending Registration Requests
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-stone-950 shadow-xs">
                    {pendingCount} Awaiting Review
                  </span>
                </div>
                <p className="text-xs text-stone-600">
                  New users waiting for administrator role assignment and portal/checklist approval.
                </p>
              </div>
            </div>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-black text-stone-800">No Pending Requests</p>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                All registration requests have been approved or rejected. New registrations from the login screen will appear here immediately.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-amber-50/50 border-b border-stone-200 text-stone-600 font-extrabold uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Applicant Name</th>
                    <th className="py-3 px-4">Email Address</th>
                    <th className="py-3 px-4">Phone Number</th>
                    <th className="py-3 px-4">Requested Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Approval Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {pendingRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-amber-50/30 transition">
                      {/* Name */}
                      <td className="py-3.5 px-4 font-bold text-stone-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-900 font-bold flex items-center justify-center">
                            {req.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-extrabold text-stone-900">{req.name}</div>
                            <span className="text-[10px] text-stone-400 font-mono">ID: {req.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-4 font-medium text-stone-700">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-stone-400" />
                          <span>{req.email}</span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4 font-medium text-stone-700">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-stone-400" />
                          <span>{req.phone || 'N/A'}</span>
                        </div>
                      </td>

                      {/* Requested Date */}
                      <td className="py-3.5 px-4 text-stone-500 font-mono text-xs">
                        {req.createdAt || 'Recent'}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Pending Approval
                        </span>
                      </td>

                      {/* Actions: Approve & Reject (Requirement 4) */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenApproveModal(req)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs inline-flex items-center gap-1.5 shadow-sm transition active:scale-95"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Approve & Assign Role</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setRejectionTarget(req)}
                            className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-red-100 text-stone-700 hover:text-red-700 font-bold text-xs inline-flex items-center gap-1 transition"
                          >
                            <UserX className="w-3.5 h-3.5 text-red-500" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: APPROVED USERS (Requirement 3 & 4) */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-stone-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Approved Users ({approvedUsers.length})</span>
              </h2>
              <p className="text-xs text-stone-600">
                Active staff, supervisors, and administrators authorized in the Bunk Hostel platform.
              </p>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="search-user-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, phone, role..."
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-500">Role:</span>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 text-xs font-bold text-stone-800 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="All">All Roles</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-500">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 text-xs font-bold text-stone-800 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Approved">Approved / Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Approved Users Table */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-extrabold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">User Details</th>
                    <th className="py-3.5 px-4">Contact Info</th>
                    <th className="py-3.5 px-4">Role & Permissions</th>
                    <th className="py-3.5 px-4">Password</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Approved By</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredApprovedUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-stone-500">
                        No approved user accounts match your search filter.
                      </td>
                    </tr>
                  ) : (
                    filteredApprovedUsers.map((user) => {
                      const isPasswordRevealed = visiblePasswords[user.id];
                      const isDefaultAdmin = isDefaultAdminAccount(user);
                      const canEditUser = !isDefaultAdmin || isCurrentSessionDefaultAdmin;

                      return (
                        <tr key={user.id} className="hover:bg-stone-50/80 transition">
                          {/* Name & Avatar */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-stone-900 text-white font-bold flex items-center justify-center shrink-0">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-extrabold text-stone-900 flex items-center gap-1.5">
                                  <span>{user.name}</span>
                                  {isDefaultAdmin && (
                                    <span
                                      className="inline-flex items-center gap-1 text-[10px] bg-amber-500/20 text-amber-900 font-black px-1.5 py-0.5 rounded border border-amber-500/40"
                                      title={
                                        isCurrentSessionDefaultAdmin
                                          ? 'Default Admin Account'
                                          : 'Protected Account: Only Default Admin can edit settings'
                                      }
                                    >
                                      <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" /> Default Admin
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-stone-500 font-mono">
                                  ID: {user.id}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Contact Info */}
                          <td className="py-3.5 px-4">
                            <div className="text-xs text-stone-800 font-medium">{user.email}</div>
                            {user.phone && (
                              <div className="text-[11px] text-stone-500 font-mono">{user.phone}</div>
                            )}
                          </td>

                          {/* Role Dropdown / Badge */}
                          <td className="py-3.5 px-4">
                            <select
                              value={user.role}
                              onChange={(e) => handleChangeRole(user.id, e.target.value as UserRole)}
                              disabled={isDefaultAdmin}
                              className={`px-2.5 py-1 rounded-xl text-xs border font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                                isDefaultAdmin ? 'opacity-80 cursor-not-allowed' : ''
                              } ${getRoleBadgeStyle(user.role)}`}
                              title={isDefaultAdmin ? 'Default Admin role is locked to Admin' : 'Change role'}
                            >
                              {ROLES.map((r) => (
                                <option key={r} value={r}>
                                  {r}
                                </option>
                              ))}
                            </select>
                          </td>

                          {/* Password with Reveal & Copy */}
                          <td className="py-3.5 px-4 font-mono">
                            <div className="flex items-center gap-1.5">
                              <span className="bg-stone-100 px-2 py-1 rounded-lg border border-stone-200 text-xs">
                                {isPasswordRevealed ? user.password : '••••••••••••'}
                              </span>
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility(user.id)}
                                className="p-1 text-stone-400 hover:text-stone-700 transition"
                                title={isPasswordRevealed ? 'Hide Password' : 'Show Password'}
                              >
                                {isPasswordRevealed ? (
                                  <EyeOff className="w-3.5 h-3.5" />
                                ) : (
                                  <Eye className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </td>

                          {/* Status Toggle */}
                          <td className="py-3.5 px-4">
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(user.id)}
                              disabled={isDefaultAdmin}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold transition ${
                                isDefaultAdmin ? 'opacity-85 cursor-not-allowed' : 'active:scale-95'
                              } ${
                                user.status === 'Inactive'
                                  ? 'bg-rose-100 text-rose-900 hover:bg-rose-200'
                                  : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                              }`}
                              title={
                                isDefaultAdmin
                                  ? 'Default Admin status is permanently active'
                                  : 'Click to toggle status'
                              }
                            >
                              {user.status === 'Inactive' ? (
                                <XCircle className="w-3 h-3 text-rose-600" />
                              ) : (
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              )}
                              <span>{user.status === 'Inactive' ? 'Inactive' : 'Approved'}</span>
                            </button>
                          </td>

                          {/* Approved By & Date */}
                          <td className="py-3.5 px-4 text-xs text-stone-500">
                            <div>{user.approvedBy ? `By ${user.approvedBy}` : 'Approved'}</div>
                            <div className="text-[10px] font-mono text-stone-400">{user.approvedAt || user.createdAt}</div>
                          </td>

                          {/* Action Buttons */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              {/* Copy Credentials */}
                              <button
                                type="button"
                                onClick={() => handleCopyCredentials(user)}
                                className="p-1.5 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-600 hover:text-amber-900 transition"
                                title="Copy Login Credentials"
                              >
                                {copiedId === user.id ? (
                                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>

                              {/* Edit User */}
                              <button
                                type="button"
                                onClick={() => handleOpenEditModal(user)}
                                disabled={!canEditUser}
                                className={`p-1.5 rounded-lg transition ${
                                  !canEditUser
                                    ? 'opacity-30 cursor-not-allowed bg-stone-100 text-stone-400'
                                    : 'bg-stone-100 hover:bg-amber-100 text-stone-600 hover:text-amber-900'
                                }`}
                                title={
                                  !canEditUser
                                    ? "Protected: Only Default Admin can edit Default Admin's settings"
                                    : 'Edit User'
                                }
                              >
                                <Edit className="w-4 h-4" />
                              </button>

                              {/* Delete User */}
                              <button
                                type="button"
                                onClick={() => setDeleteTarget(user)}
                                disabled={isDefaultAdmin}
                                className={`p-1.5 rounded-lg transition ${
                                  isDefaultAdmin
                                    ? 'opacity-30 cursor-not-allowed text-stone-400'
                                    : 'bg-stone-100 hover:bg-red-100 text-stone-600 hover:text-red-700'
                                }`}
                                title={isDefaultAdmin ? 'Default Admin cannot be deleted' : 'Delete User'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* APPROVAL & ROLE ASSIGNMENT MODAL (Requirement 4) */}
      {/* ========================================================================= */}
      {approvalTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">Approve User Registration</h3>
                  <p className="text-xs text-stone-500">Assign role and activate credentials</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setApprovalTarget(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* Candidate Details */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Applicant Name:</span>
                <span className="font-extrabold text-stone-900">{approvalTarget.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Email Address:</span>
                <span className="font-mono text-stone-900">{approvalTarget.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Phone:</span>
                <span className="font-mono text-stone-900">{approvalTarget.phone || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Requested On:</span>
                <span className="text-stone-700">{approvalTarget.createdAt}</span>
              </div>
            </div>

            {/* Role Selection Dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase text-stone-700">
                Select Assigned Role *
              </label>
              <select
                value={selectedRoleForApproval}
                onChange={(e) => setSelectedRoleForApproval(e.target.value as UserRole)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-3 text-sm text-stone-900 font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="Admin">Admin (Full Audit & Portal Access)</option>
                <option value="Manager">Manager (Audit Review & Shift Approvals)</option>
                <option value="Housekeeping Supervisor">Housekeeping Supervisor (Checklist & Staff Lead)</option>
                <option value="Housekeeping Staff">Housekeeping Staff (Mobile Checklist App)</option>
                <option value="Maintenance">Maintenance (Facility Upkeep)</option>
              </select>
              <p className="text-[11px] text-stone-500">
                Admins and Managers can sign in to the Admin Audit Portal. Staff roles will log in to the Mobile Checklist App.
              </p>
            </div>

            {/* Modal Buttons */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setApprovalTarget(null)}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmApproval}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition active:scale-95 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Confirm & Approve Access</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* REJECTION CONFIRMATION MODAL (Requirement 4) */}
      {/* ========================================================================= */}
      {rejectionTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4 animate-fadeIn">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <UserX className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-stone-900">Reject Registration Request?</h3>
              <p className="text-xs text-stone-600">
                Are you sure you want to reject the registration request from{' '}
                <strong className="text-stone-900">{rejectionTarget.name}</strong> ({rejectionTarget.email})?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRejectionTarget(null)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRejection}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md transition active:scale-95"
              >
                Yes, Reject Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CREATE / EDIT USER MODAL */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-900 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-black text-stone-900">
                  {editingUser ? `Edit User: ${editingUser.name}` : 'Create New User ID'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {editingUser && isDefaultAdminAccount(editingUser) && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 text-xs text-amber-900 font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Default Admin Profile: Role is permanently locked to Admin and status is locked to Approved.
                </span>
              </div>
            )}

            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-xs font-bold text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveUser} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-black uppercase text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Jasvir Singh"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none font-medium"
                />
              </div>

              {/* Email / Username */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="jasvir@bunkhostel.in"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-stone-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-stone-700 mb-1">
                  Username * (Unique ID)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 font-mono">
                    @
                  </span>
                  <input
                    type="text"
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    disabled={Boolean(editingUser && isDefaultAdminAccount(editingUser))}
                    placeholder="jasvir_hk"
                    className={`w-full pl-8 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                      editingUser && isDefaultAdminAccount(editingUser) ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Password with Generator */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-black uppercase text-stone-700">
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormPassword(generateRandomPassword())}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Generate Password</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showFormPassword ? 'text' : 'password'}
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-3.5 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowFormPassword(!showFormPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    {showFormPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Role Dropdown */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-black uppercase text-stone-700">
                    Assigned Role *
                  </label>
                  {editingUser && isDefaultAdminAccount(editingUser) && (
                    <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider">
                      Locked to Admin
                    </span>
                  )}
                </div>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as UserRole)}
                  disabled={Boolean(editingUser && isDefaultAdminAccount(editingUser))}
                  className={`w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                    editingUser && isDefaultAdminAccount(editingUser) ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs shadow-md transition active:scale-95"
                >
                  {editingUser ? 'Save Changes' : 'Create User ID'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION SAFETY MODAL */}
      {/* ========================================================================= */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4 animate-fadeIn">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-stone-900">Delete User Account?</h3>
              <p className="text-xs text-stone-600">
                Are you sure you want to permanently delete{' '}
                <strong className="text-stone-900">{deleteTarget.name}</strong> (
                {deleteTarget.email || deleteTarget.username})? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md transition active:scale-95"
              >
                Yes, Delete ID
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
