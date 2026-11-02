import React, { useState } from 'react';
import { Copy, Check, Download, Code, X } from 'lucide-react';
import { Language } from '../types';

interface SingleFileExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const SingleFileExportModal: React.FC<SingleFileExportModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [copied, setCopied] = useState(false);
  const isHindi = language === 'hi-IN';

  if (!isOpen) return null;

  const standaloneHtmlCode = `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Bunk Hostel - Housekeeping Checklist</title>
  <style>
    :root {
      --primary: #f59e0b;
      --primary-dark: #d97706;
      --success: #10b981;
      --success-light: #ecfdf5;
      --danger: #ef4444;
      --danger-light: #fef2f2;
      --bg: #f5f5f4;
      --card-bg: #ffffff;
      --text: #1c1917;
      --text-muted: #78716c;
      --border: #e7e5e4;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
      --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
      --shadow-lg: 0 10px 25px -5px rgba(0,0,0,0.1);
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      -webkit-tap-highlight-color: transparent;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      padding-bottom: 60px;
    }
    header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: #1c1917;
      color: #fff;
      padding: 14px 16px;
      box-shadow: var(--shadow-md);
    }
    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 680px;
      margin: 0 auto;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-badge {
      width: 38px;
      height: 38px;
      background: var(--primary);
      color: #000;
      font-weight: 900;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
    }
    .title h1 {
      font-size: 16px;
      font-weight: 800;
      line-height: 1.2;
    }
    .title p {
      font-size: 12px;
      color: #a8a29e;
    }
    .lang-toggle {
      display: flex;
      background: #292524;
      border-radius: 8px;
      padding: 2px;
      border: 1px solid #44403c;
    }
    .lang-btn {
      background: none;
      border: none;
      color: #d6d3d1;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
    }
    .lang-btn.active {
      background: var(--primary);
      color: #000;
    }
    .container {
      max-width: 680px;
      margin: 16px auto;
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    /* Screen Views */
    .screen-view {
      display: none;
      flex-direction: column;
      gap: 14px;
    }
    .screen-view.active {
      display: flex;
    }

    /* Cards */
    .banner-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 18px;
      box-shadow: var(--shadow-sm);
    }
    .banner-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 800;
      background: #fef3c7;
      color: #92400e;
      padding: 3px 10px;
      border-radius: 999px;
      margin-bottom: 6px;
    }
    .banner-card h2 {
      font-size: 20px;
      font-weight: 900;
      color: #0c0a09;
      margin-bottom: 4px;
    }
    .banner-card p {
      font-size: 13px;
      color: var(--text-muted);
    }

    /* Quick Rooms Grid */
    .quick-rooms-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-top: 10px;
    }
    @media (min-width: 500px) {
      .quick-rooms-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    .room-btn {
      background: #fef3c7;
      border: 2px solid #f59e0b;
      color: #78350f;
      padding: 12px 14px;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 900;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.2s;
    }
    .room-btn:active {
      transform: scale(0.95);
    }
    .room-btn.dorm {
      background: #1c1917;
      border-color: #292524;
      color: #f59e0b;
    }
    .room-btn.other {
      background: #f5f5f4;
      border-color: #d6d3d1;
      color: #44403c;
    }

    /* All Rooms Number Grid */
    .rooms-num-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-top: 8px;
    }
    @media (min-width: 500px) {
      .rooms-num-grid {
        grid-template-columns: repeat(7, 1fr);
      }
    }
    .num-btn {
      background: #fafaf9;
      border: 1.5px solid #e7e5e4;
      color: #1c1917;
      padding: 10px 4px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s;
    }
    .num-btn:hover, .num-btn:active {
      background: #fef3c7;
      border-color: #f59e0b;
      transform: scale(0.95);
    }

    /* Common Areas Grid */
    .locations-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }
    @media (min-width: 540px) {
      .locations-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    .location-btn-card {
      background: var(--card-bg);
      border: 2px solid var(--border);
      border-radius: 20px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
    }
    .location-btn-card:hover {
      border-color: var(--primary);
      box-shadow: var(--shadow-md);
    }
    .location-btn-card:active {
      transform: scale(0.98);
    }
    .loc-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .loc-icon-badge {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: #fafaf9;
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .loc-form-pill {
      font-size: 11px;
      font-weight: 800;
      background: #f5f5f4;
      color: var(--text-muted);
      padding: 3px 8px;
      border-radius: 6px;
    }
    .loc-title {
      font-size: 16px;
      font-weight: 800;
      color: #1c1917;
      line-height: 1.3;
    }
    .loc-desc {
      font-size: 12px;
      color: var(--text-muted);
    }
    .loc-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 800;
      color: var(--primary-dark);
      border-top: 1px solid rgba(0,0,0,0.06);
      padding-top: 8px;
    }

    /* Screen 2: Checklist Items */
    .nav-header-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: var(--shadow-sm);
    }
    .btn-nav {
      background: #1c1917;
      color: #fff;
      border: none;
      padding: 10px 16px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .task-card, .task-item {
      background: var(--card-bg);
      border: 2px solid var(--border);
      border-radius: 18px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
      transition: all 0.25s ease;
      user-select: none;
      box-shadow: var(--shadow-sm);
    }
    .task-card.checked, .task-item.checked {
      background-color: var(--success-light);
      border-color: var(--success);
    }
    .task-card.checked .task-title, .task-card.checked .task-text, .task-item.checked .task-text {
      text-decoration: line-through;
      color: #047857;
    }
    /* Validation Error: Unchecked task turned bright RED */
    .task-card.error, .task-item.error {
      background-color: var(--danger-light);
      border-color: var(--danger);
      animation: shake 0.4s ease-in-out;
    }
    .task-left, .task-label {
      display: flex;
      align-items: center;
      gap: 14px;
      flex: 1;
      cursor: pointer;
    }
    .custom-checkbox {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      border: 2px solid #d6d3d1;
      background: #fafaf9;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 900;
      color: transparent;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }
    .task-card.checked .custom-checkbox, .task-item.checked .custom-checkbox {
      background: var(--success);
      border-color: var(--success);
      color: #fff;
    }
    .task-card.error .custom-checkbox, .task-item.error .custom-checkbox {
      border-color: var(--danger);
      background: #fee2e2;
    }
    .task-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .task-tag {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--text-muted);
    }
    .task-title, .task-text {
      font-size: 14px;
      font-weight: 700;
      line-height: 1.35;
      color: var(--text);
    }
    .audio-btn {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      border: 1px solid #d6d3d1;
      background: #f5f5f4;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }
    .audio-btn:hover, .audio-btn:active {
      background: var(--primary);
      border-color: var(--primary-dark);
    }
    .audio-btn.speaking {
      background: var(--primary);
      animation: pulse 1s infinite alternate;
    }

    /* Proof of Work Media Upload Section */
    .photo-upload-card {
      background: #ffffff;
      border: 2px solid var(--border);
      border-radius: 20px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
    }
    .photo-upload-card.error {
      background: var(--danger-light);
      border-color: var(--danger);
      animation: shake 0.4s ease-in-out;
    }
    .media-previews-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    @media (min-width: 500px) {
      .media-previews-container {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .media-thumb-card {
      position: relative;
      border-radius: 14px;
      overflow: hidden;
      border: 2px solid var(--success);
      height: 110px;
      background: #1c1917;
    }
    .media-thumb-card img, .media-thumb-card video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .media-delete-btn {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #ef4444;
      color: #fff;
      border: none;
      font-size: 12px;
      font-weight: 900;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .camera-upload-btn {
      width: 100%;
      background: #1c1917;
      color: #f59e0b;
      border: 2px solid #f59e0b;
      padding: 16px 20px;
      border-radius: 16px;
      font-size: 15px;
      font-weight: 900;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.2s;
      box-shadow: var(--shadow-md);
    }
    .camera-upload-btn:active {
      transform: scale(0.98);
    }
    .photo-upload-card.error .camera-upload-btn {
      background: #ef4444;
      color: #fff;
      border-color: #b91c1c;
    }

    /* Buttons */
    .primary-btn {
      width: 100%;
      background: var(--primary);
      color: #000;
      border: none;
      padding: 16px 20px;
      border-radius: 18px;
      font-size: 16px;
      font-weight: 900;
      cursor: pointer;
      box-shadow: var(--shadow-md);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .primary-btn:active {
      transform: scale(0.98);
    }
    .submit-btn {
      background: var(--success);
      color: #fff;
    }

    /* Validation Alert Banner */
    .validation-alert {
      display: none;
      background: var(--danger);
      color: #fff;
      padding: 14px 18px;
      border-radius: 18px;
      font-size: 14px;
      font-weight: 800;
      animation: shake 0.4s ease-in-out;
    }

    /* Screen 3: Section 10 Inputs */
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .form-group label {
      font-size: 12px;
      font-weight: 800;
      color: #44403c;
    }
    .form-input, .form-textarea {
      width: 100%;
      background: #fafaf9;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 12px 14px;
      font-size: 14px;
      color: var(--text);
      outline: none;
    }
    .chips-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }
    .chip-btn {
      background: #f5f5f4;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 6px 10px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
    }

    @keyframes pulse {
      from { transform: scale(1); }
      to { transform: scale(1.08); }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-6px); }
      40%, 80% { transform: translateX(6px); }
    }
  </style>
</head>
<body>

  <header>
    <div class="header-top">
      <div class="brand">
        <div class="logo-badge">B</div>
        <div class="title">
          <h1>Bunk Hostel - Housekeeping</h1>
          <p id="header-sub">दैनिक हाउसकीपिंग चेकलिस्ट (Bilingual Audio)</p>
        </div>
      </div>
      <div class="lang-toggle">
        <button class="lang-btn active" id="btn-hi" onclick="setLanguage('hi-IN')">हिन्दी</button>
        <button class="lang-btn" id="btn-en" onclick="setLanguage('en-IN')">ENG</button>
      </div>
    </div>
  </header>

  <div class="container">

    <!-- Validation Error Alert Banner -->
    <div id="validation-alert" class="validation-alert">
      ⚠️ <span id="validation-alert-text">कृपया आगे बढ़ने से पहले लाल रंग वाले सभी कार्य पूरे करें।</span>
    </div>

    <!-- SCREEN 1: ROOM & AREA SELECTION -->
    <div id="screen-1" class="screen-view active">
      <div class="banner-card">
        <span class="banner-badge">Step 1: Room / Area Information</span>
        <h2 id="scr1-title">Which room or area are you cleaning?</h2>
        <p id="scr1-sub">Select specific room number (e.g. Room 107, Room 207, Dorm Hall) or common area below.</p>
      </div>

      <!-- Specific Rooms & Dorm Selection -->
      <div class="banner-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:16px; font-weight:900;">🛏️ Specific Rooms & Dorms</h3>
          <span style="font-size:10px; font-weight:800; background:#fef3c7; color:#92400e; padding:3px 8px; border-radius:6px;">Routes to Dorm Form</span>
        </div>
        
        <!-- Priority Quick Rooms -->
        <div class="quick-rooms-grid">
          <button class="room-btn" onclick="selectRoom('Room 107')">🚪 Room 107 ➜</button>
          <button class="room-btn" onclick="selectRoom('Room 207')">🚪 Room 207 ➜</button>
          <button class="room-btn dorm" onclick="selectRoom('Dorm Hall')">🛏️ Dorm Hall ➜</button>
          <button class="room-btn other" onclick="promptCustomRoom()">🔍 Other... ➜</button>
        </div>

        <!-- Floor 1 Rooms -->
        <div style="margin-top:14px;">
          <div style="font-size:11px; font-weight:800; color:#78716c; text-transform:uppercase;">First Floor (101 - 107):</div>
          <div class="rooms-num-grid">
            <button class="num-btn" onclick="selectRoom('101')">101</button>
            <button class="num-btn" onclick="selectRoom('102')">102</button>
            <button class="num-btn" onclick="selectRoom('103')">103</button>
            <button class="num-btn" onclick="selectRoom('104')">104</button>
            <button class="num-btn" onclick="selectRoom('105')">105</button>
            <button class="num-btn" onclick="selectRoom('106')">106</button>
            <button class="num-btn" style="background:#fef3c7; border-color:#f59e0b; font-weight:900;" onclick="selectRoom('107')">107 ⭐</button>
          </div>
        </div>

        <!-- Floor 2 Rooms -->
        <div style="margin-top:10px;">
          <div style="font-size:11px; font-weight:800; color:#78716c; text-transform:uppercase;">Second Floor (201 - 207):</div>
          <div class="rooms-num-grid">
            <button class="num-btn" onclick="selectRoom('201')">201</button>
            <button class="num-btn" onclick="selectRoom('202')">202</button>
            <button class="num-btn" onclick="selectRoom('203')">203</button>
            <button class="num-btn" onclick="selectRoom('204')">204</button>
            <button class="num-btn" onclick="selectRoom('205')">205</button>
            <button class="num-btn" onclick="selectRoom('206')">206</button>
            <button class="num-btn" style="background:#fef3c7; border-color:#f59e0b; font-weight:900;" onclick="selectRoom('207')">207 ⭐</button>
          </div>
        </div>

        <!-- Floor 3 Rooms -->
        <div style="margin-top:10px;">
          <div style="font-size:11px; font-weight:800; color:#78716c; text-transform:uppercase;">Third Floor (301 - 307):</div>
          <div class="rooms-num-grid">
            <button class="num-btn" onclick="selectRoom('301')">301</button>
            <button class="num-btn" onclick="selectRoom('302')">302</button>
            <button class="num-btn" onclick="selectRoom('303')">303</button>
            <button class="num-btn" onclick="selectRoom('304')">304</button>
            <button class="num-btn" onclick="selectRoom('305')">305</button>
            <button class="num-btn" onclick="selectRoom('306')">306</button>
            <button class="num-btn" onclick="selectRoom('307')">307</button>
          </div>
        </div>
      </div>

      <!-- Common Areas Section -->
      <div style="margin-top:4px;">
        <h3 style="font-size:13px; font-weight:800; text-transform:uppercase; color:#78716c; margin-bottom:8px;">🏢 Hostel Common Areas & Floors</h3>
        <div class="locations-grid" id="locations-container"></div>
      </div>
    </div>

    <!-- SCREEN 2: CONDITIONAL ROUTING CHECKLIST FORM -->
    <div id="screen-2" class="screen-view">
      <div class="nav-header-card">
        <button class="btn-nav" onclick="goToScreen1()">
          ⬅ <span id="btn-change-loc">Change Room</span>
        </button>
        <div id="scr2-progress-pill" class="loc-form-pill">0/0 Done</div>
      </div>

      <div class="banner-card">
        <span id="scr2-selected-pill" class="banner-badge">Area</span>
        <h2 id="scr2-area-title">Checklist Form</h2>
        <p id="scr2-area-desc">Please complete all tasks and upload photo proof before proceeding.</p>
      </div>

      <!-- Task Items List -->
      <div id="checklist-tasks-container" style="display: flex; flex-direction: column; gap: 10px;"></div>

      <!-- Proof of Work Media Upload Section -->
      <div id="photo-upload-box" class="photo-upload-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h3 style="font-size:15px; font-weight:900;">📸 Proof of Work (Mandatory)</h3>
            <p style="font-size:12px; color:var(--text-muted);">Take live photo or record video of the cleaned room.</p>
          </div>
          <button class="audio-btn" onclick="speakAlert(currentLanguage === 'hi-IN' ? 'कृपया साफ किए गए क्षेत्र का फोटो या वीडियो लें।' : 'Please take a photo or record video of the cleaned area.')" title="Listen">🔊</button>
        </div>

        <!-- Thumbnail Preview Container -->
        <div id="media-previews" class="media-previews-container" style="display:none;"></div>

        <!-- Hidden Native File Input (Direct Camera Capture) -->
        <input type="file" id="native-camera-input" accept="image/*,video/*" capture="environment" multiple style="display:none;" onchange="handleMediaCaptured(event)">

        <!-- Massive Camera Button -->
        <button type="button" class="camera-upload-btn" id="camera-btn" onclick="document.getElementById('native-camera-input').click()">
          <span style="font-size:20px;">📷</span>
          <span id="camera-btn-text">Take Photo / Record Video of Cleaned Area</span>
        </button>
      </div>

      <!-- Next Step Button with Strict Validation -->
      <button class="primary-btn" id="btn-next-step" onclick="handleNextStep()">
        <span id="btn-next-text">Next Step: Section 10 (Issues & Remarks)</span> ➜
      </button>
    </div>

    <!-- SCREEN 3: MANDATORY SECTION 10 (ISSUES & REMARKS) -->
    <div id="screen-3" class="screen-view">
      <div class="nav-header-card">
        <button class="btn-nav" onclick="goToScreen2()">
          ⬅ <span id="btn-back-form">Back to Checklist</span>
        </button>
        <span class="banner-badge" style="background:#d1fae5;color:#065f46;">Step 3: Final Report</span>
      </div>

      <div class="banner-card" style="display:flex; flex-direction:column; gap:12px;">
        <h2>10. Cleanliness Issues & Corrective Actions</h2>
        <p>Log identified issues, corrective actions taken, assignee, and final remarks.</p>

        <!-- Quick chips -->
        <div>
          <label style="font-size:11px;font-weight:800;color:#78716c;">Quick Options (Tap to add):</label>
          <div class="chips-row">
            <button class="chip-btn" onclick="addChip('Stained linen replaced / चादर बदली गई')">+ Stained linen replaced</button>
            <button class="chip-btn" onclick="addChip('Bathroom drain cleared / नाली साफ की')">+ Bathroom drain cleared</button>
            <button class="chip-btn" onclick="addChip('Air Conditioner filter dusted / एयर कंडीशनर साफ')">+ Air Conditioner filter dusted</button>
            <button class="chip-btn" onclick="addChip('All clean & inspected / सब साफ')">+ All clean & inspected</button>
          </div>
        </div>

        <div class="form-group">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <label style="margin:0;">Issues Identified / सफाई के मुद्दे:</label>
            <button type="button" class="chip-btn" onclick="startVoiceTranscribe('input-issues')" style="background:#fef3c7;color:#78350f;font-weight:bold;padding:4px 8px;">
              🎙️ बोलकर लिखें (Hindi Voice)
            </button>
          </div>
          <input type="text" id="input-issues" class="form-input" placeholder="e.g. Broken mirror, stained linen (or tap mic to speak)...">
        </div>

        <div class="form-group">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <label style="margin:0;">Corrective Action Taken / की गई कार्रवाई:</label>
            <button type="button" class="chip-btn" onclick="startVoiceTranscribe('input-action')" style="background:#fef3c7;color:#78350f;font-weight:bold;padding:4px 8px;">
              🎙️ बोलकर लिखें (Hindi Voice)
            </button>
          </div>
          <input type="text" id="input-action" class="form-input" placeholder="e.g. Replaced immediately with clean linen...">
        </div>

        <div class="form-group">
          <label>Action Taken By / किसके द्वारा कार्रवाई:</label>
          <input type="text" id="input-by" class="form-input" value="Jasvir">
        </div>

        <div class="form-group">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <label style="margin:0;">Final Remarks / अंतिम टिप्पणियां:</label>
            <button type="button" class="chip-btn" onclick="startVoiceTranscribe('input-remarks')" style="background:#fef3c7;color:#78350f;font-weight:bold;padding:4px 8px;">
              🎙️ बोलकर लिखें (Hindi Voice)
            </button>
          </div>
          <textarea id="input-remarks" class="form-textarea" rows="2" placeholder="Any final observations..."></textarea>
        </div>
      </div>

      <button class="primary-btn submit-btn" onclick="handleSubmitShift()">
        🚀 <span id="btn-submit-text">Submit Shift</span>
      </button>
    </div>

  </div>

  <script>
    let availableVoices = [];

    // Force voices to load asynchronously for mobile browsers
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        availableVoices = window.speechSynthesis.getVoices();
      };
    }

    let currentLanguage = 'hi-IN';
    let selectedLocation = null;
    let selectedStaff = 'Subhash';
    let hasValidationError = false;
    let uploadedMediaUrls = [];

    const STAFF_LIST = ['Subhash', 'Ajeet', 'Mithun', 'Karan', 'Anand', 'Akash'];

    // Specific Dorm Tasks for 107, 207, Dorm Hall (Section 3)
    const DORM_TASKS = [
      { id: 'd1', tag: 'Bunk Bed', titleEn: 'Bunk bed mattress, clean sheets, and pillow set neatly.', titleHi: 'बंक बेड गद्दे, साफ चादर और तकिया करीने से बिछाया गया।' },
      { id: 'd2', tag: 'Drawers', titleEn: 'Under-bed drawers dusted and emptied.', titleHi: 'बिस्तर के नीचे की दराजें झाड़ी और साफ की गईं।' },
      { id: 'd3', tag: 'Floor', titleEn: 'Dorm hall floor swept, mopped, and corners cleaned.', titleHi: 'डॉर्म हॉल के फर्श पर झाड़ू, पोंछा और कोनों की सफाई की गई।' },
      { id: 'd4', tag: 'Curtains', titleEn: 'Bunk bed privacy curtains clean and washed.', titleHi: 'बंक बेड के पर्दे साफ और धुले हुए हैं।' },
      { id: 'd5', tag: 'Dustbins', titleEn: 'Dustbins emptied and fresh trash bags installed.', titleHi: 'कूड़ेदान खाली किए गए और नई थैली लगाई गई।' },
      { id: 'd6', tag: 'Bathroom', titleEn: 'Attached bathroom toilet, sink, and tiles sanitized.', titleHi: 'अटैच्ड बाथरूम टॉयलेट, सिंक और टाइलें सैनिटाइज की गईं।' }
    ];

    // Specific Private Room Tasks for 101-106, 201-206, 301-307 (Section 2)
    const PRIVATE_ROOM_TASKS = [
      { id: 'pr1', tag: 'General', titleEn: 'Room floor swept and mopped properly.', titleHi: 'कमरे के फर्श पर झाड़ू और पोंछा लगाया गया।' },
      { id: 'pr2', tag: 'Corners', titleEn: 'Corners and walls clean; no cobwebs.', titleHi: 'कोनों की ठीक से सफाई की गई और जाले नहीं हैं।' },
      { id: 'pr3', tag: 'Bed', titleEn: 'Fresh bedsheet and pillow covers changed properly.', titleHi: 'साफ बेडशीट और तकिये का कवर बदला गया।' },
      { id: 'pr4', tag: 'Furniture', titleEn: 'Tables, chairs, and cupboards dusted and cleaned.', titleHi: 'मेज, कुर्सियां और अलमारियां साफ की गईं।' },
      { id: 'pr5', tag: 'Windows', titleEn: 'Window glass and curtains clean and neat.', titleHi: 'खिड़की का कांच और पर्दे साफ हैं।' },
      { id: 'pr6', tag: 'Bathroom', titleEn: 'Bathroom toilet, washbasin, and mirror sanitized.', titleHi: 'बाथरूम टॉयलेट, वॉशबेसिन और शीशा सैनिटाइज किया गया।' }
    ];

    // Common Area Definitions
    const COMMON_AREAS = [
      {
        id: 'floors_terrace',
        nameEn: 'Floors or Terrace',
        nameHi: 'Floors or Terrace (मंज़िलें या छत)',
        formNameEn: 'Corridors',
        formNameHi: 'गलियारे (Corridors)',
        icon: '🏢',
        descEn: 'Floor passages, railings, lights, dustbins, and terrace',
        descHi: 'मंज़िल के गलियारे, रेलिंग, लाइटें और छत',
        tasks: [
          { id: 'f1', tag: 'Passage', titleEn: 'Corridor passages swept and mopped thoroughly.', titleHi: 'गलियारे के रास्तों पर अच्छी तरह झाड़ू और पोंछा लगाया गया।' },
          { id: 'f2', tag: 'Railings', titleEn: 'Terrace and floor handrails wiped clean.', titleHi: 'छत और मंज़िल की रेलिंग पोंछकर साफ की गई।' },
          { id: 'f3', tag: 'Shoe Rack', titleEn: 'Shoe racks organized, dusted, and shoes aligned.', titleHi: 'शू रैक व्यवस्थित और साफ किया गया।' },
          { id: 'f4', tag: 'Dustbins', titleEn: 'Floor dustbins emptied and cleaned.', titleHi: 'मंज़िल के कूड़ेदान खाली और साफ किए गए।' },
          { id: 'f5', tag: 'Terrace', titleEn: 'Terrace open seating and floor spotless.', titleHi: 'छत का खुला बैठने का क्षेत्र और फर्श साफ है।' }
        ]
      },
      {
        id: 'reception',
        nameEn: 'Reception',
        nameHi: 'रिसेप्शन (Reception)',
        formNameEn: 'Reception',
        formNameHi: 'रिसेप्शन',
        icon: '🛎️',
        descEn: 'Front desk, computer, guest lounge, glass entrance, Wi-Fi',
        descHi: 'रिसेप्शन डेस्क, कंप्यूटर, सोफा, कांच और वाई-फाई',
        tasks: [
          { id: 'r1', tag: 'Front Desk', titleEn: 'Reception counter wiped and sanitised.', titleHi: 'रिसेप्शन काउंटर पोंछकर सैनिटाइज किया गया।' },
          { id: 'r2', tag: 'Guest Lounge', titleEn: 'Waiting sofa and cushions arranged neatly.', titleHi: 'वेटिंग सोफा और कुशन ठीक से लगाए गए।' },
          { id: 'r3', tag: 'Glass Doors', titleEn: 'Entrance glass doors cleaned without smudges.', titleHi: 'प्रवेश द्वार के कांच के दरवाजे बिना किसी दाग के साफ हैं।' },
          { id: 'r4', tag: 'Floor', titleEn: 'Reception entrance floor swept and mopped.', titleHi: 'रिसेप्शन प्रवेश फर्श पर झाड़ू और पोंछा लगाया गया।' },
          { id: 'r5', tag: 'Information', titleEn: 'Notice boards and pamphlets organized.', titleHi: 'सूचना बोर्ड और पर्चे व्यवस्थित किए गए।' }
        ]
      },
      {
        id: 'yoga_hall',
        nameEn: 'Yoga Hall',
        nameHi: 'योग हॉल (Yoga Hall)',
        formNameEn: 'Yoga Hall',
        formNameHi: 'योग हॉल',
        icon: '🧘',
        descEn: 'Yoga mats, wooden floor, cushions, mirrors, sound system',
        descHi: 'योग मैट, लकड़ी का फर्श, तकिए, शीशे और साउंड सिस्टम',
        tasks: [
          { id: 'y1', tag: 'Floor', titleEn: 'Yoga hall wooden floor polished and dust-free.', titleHi: 'योग हॉल का लकड़ी का फर्श साफ और धूल-मुक्त है।' },
          { id: 'y2', tag: 'Yoga Mats', titleEn: 'All yoga mats sanitized and neatly rolled.', titleHi: 'सभी योग मैट सैनिटाइज करके करीने से रोल किए गए।' },
          { id: 'y3', tag: 'Mirrors', titleEn: 'Wall mirrors cleaned with glass spray.', titleHi: 'दीवार के शीशे ग्लास स्प्रे से साफ किए गए।' },
          { id: 'y4', tag: 'Cushions', titleEn: 'Meditation cushions arranged in order.', titleHi: 'ध्यान कुशन क्रम से व्यवस्थित किए गए।' },
          { id: 'y5', tag: 'Fragrance', titleEn: 'Fresh ventilation and aromatic diffuser active.', titleHi: 'ताजी हवा और सुगंधित डिफ्यूज़र चालू है।' }
        ]
      },
      {
        id: 'cafe',
        nameEn: 'Cafe (Indoor or Outdoor)',
        nameHi: 'कैफ़े (इनडोर या आउटडोर)',
        formNameEn: 'Cafe/Restaurant',
        formNameHi: 'कैफ़े / रेस्तरां',
        icon: '☕',
        descEn: 'Dining tables, seating, beverage counter, outdoor area, fireplace',
        descHi: 'डाइनिंग टेबल, काउंटर, आउटडोर और फायरप्लेस',
        tasks: [
          { id: 'c1', tag: 'Dining Tables', titleEn: 'All dining tables and chairs sanitized.', titleHi: 'सभी डाइनिंग टेबल और कुर्सियां सैनिटाइज की गईं।' },
          { id: 'c2', tag: 'Counter', titleEn: 'Beverage & coffee counter wiped dry and clean.', titleHi: 'पेय और कॉफी काउंटर पोंछकर सूखा और साफ है।' },
          { id: 'c3', tag: 'Floor', titleEn: 'Cafe floor swept and mopped.', titleHi: 'कैफ़े के फर्श पर झाड़ू और पोंछा लगाया गया।' },
          { id: 'c4', tag: 'Outdoor Seating', titleEn: 'Outdoor patio tables dusted and organized.', titleHi: 'आउटडोर टेबल झाड़ी और व्यवस्थित की गईं।' },
          { id: 'c5', tag: 'Fireplace', titleEn: 'Fireplace and lounge area cleaned.', titleHi: 'फायरप्लेस और लाउंज क्षेत्र साफ किया गया।' }
        ]
      },
      {
        id: 'common_washroom',
        nameEn: 'Common Washroom',
        nameHi: 'साझा वॉशरूम (Common Washroom)',
        formNameEn: 'Common Washroom',
        formNameHi: 'साझा वॉशरूम',
        icon: '🚿',
        descEn: 'Toilet seat, washbasin, mirror, soap dispenser, towels',
        descHi: 'टॉयलेट सीट, वॉशबेसिन, शीशा, हैंडवाश और तौलिया',
        tasks: [
          { id: 'w1', tag: 'Toilet Seat', titleEn: 'Toilet bowl and seat sanitized with disinfectant.', titleHi: 'टॉयलेट बाउल और सीट कीटाणुनाशक से सैनिटाइज की गई।' },
          { id: 'w2', tag: 'Washbasin', titleEn: 'Washbasin and water taps cleaned and shiny.', titleHi: 'वॉशबेसिन और नल साफ और चमकदार हैं।' },
          { id: 'w3', tag: 'Mirror', titleEn: 'Washroom mirror cleaned without water spots.', titleHi: 'शीशा बिना पानी के धब्बों के साफ किया गया।' },
          { id: 'w4', tag: 'Soap Refill', titleEn: 'Hand soap dispenser filled and working.', titleHi: 'हैंड सोप डिस्पेंसर भरा हुआ और चालू है।' },
          { id: 'w5', tag: 'Paper & Towels', titleEn: 'Toilet paper and clean hand towels stocked.', titleHi: 'टॉयलेट पेपर और साफ हैंड टॉवल उपलब्ध हैं।' },
          { id: 'w6', tag: 'Exhaust', titleEn: 'Exhaust fan operational and no bad odor.', titleHi: 'एग्जॉस्ट फैन चालू है और कोई बदबू नहीं है।' }
        ]
      },
      {
        id: 'staircase',
        nameEn: 'Staircase',
        nameHi: 'सीढ़ी (Staircase)',
        formNameEn: 'Staircase',
        formNameHi: 'सीढ़ी',
        icon: '🪜',
        descEn: 'Steps, handrails, corners, windows, lights, clutter-free passage',
        descHi: 'सीढ़ियों के पायदान, रेलिंग, कोने और ग्रिल',
        tasks: [
          { id: 's1', tag: 'Steps', titleEn: 'All staircase steps swept and mopped.', titleHi: 'सीढ़ियों के सभी पायदान झाड़े और पोंछे गए।' },
          { id: 's2', tag: 'Handrails', titleEn: 'Staircase railings wiped and dust-free.', titleHi: 'सीढ़ियों की रेलिंग पोंछकर धूल-मुक्त की गई।' },
          { id: 's3', tag: 'Corners', titleEn: 'Staircase landing corners free of spiderwebs/dirt.', titleHi: 'कोने मकड़ी के जाले और गंदगी से मुक्त हैं।' },
          { id: 's4', tag: 'Windows', titleEn: 'Staircase windows and grills cleaned.', titleHi: 'सीढ़ियों की खिड़कियां और ग्रिल साफ किए गए।' },
          { id: 's5', tag: 'No Clutter', titleEn: 'Staircase passage completely clear of clutter.', titleHi: 'सीढ़ियों का रास्ता पूरी तरह साफ और खाली है।' }
        ]
      }
    ];

    const taskState = {};

    // Routine for Selecting ANY Room -> Routes 107, 207, Dorm Hall to Dorm Form (Sec 3); other rooms to Private Room (Sec 2)
    function selectRoom(roomName) {
      const isHi = currentLanguage === 'hi-IN';
      const cleanNum = roomName.replace(/\\D/g, '');
      const isDorm = cleanNum === '107' || cleanNum === '207' || roomName.toLowerCase().includes('dorm') || roomName.includes('डॉर्म');
      const cleanName = roomName.startsWith('Room') || roomName.includes('Dorm') ? roomName : 'Room ' + roomName;
      
      selectedLocation = {
        id: 'room_' + cleanName.toLowerCase().replace(/\\s+/g, '_'),
        nameEn: cleanName,
        nameHi: cleanName.includes('Dorm') ? 'डॉर्म हॉल' : 'कमरा ' + cleanName.replace('Room ', ''),
        formNameEn: isDorm ? 'Dorm Form (Sec 3)' : 'Private Room Form (Sec 2)',
        formNameHi: isDorm ? 'डॉर्म फ़ॉर्म (खंड 3)' : 'प्राइवेट रूम फ़ॉर्म (खंड 2)',
        icon: isDorm ? '🛏️' : '🚪',
        descEn: isDorm
          ? 'Bunk beds, hallway, shoe rack, drawers, and bathroom for ' + cleanName
          : 'Bed, linen, bathroom, windows, furniture for ' + cleanName,
        descHi: isDorm
          ? cleanName + ' की सफाई (बंक बेड, गलियारा, दराज और वॉशरूम)'
          : cleanName + ' की सफाई (बिस्तर, चादर, बाथरूम, खिड़की, फर्नीचर)',
        tasks: isDorm ? DORM_TASKS : PRIVATE_ROOM_TASKS
      };

      openChecklistScreen();
    }

    function promptCustomRoom() {
      const custom = prompt(currentLanguage === 'hi-IN' ? 'कमरे का नंबर या नाम दर्ज करें (e.g. 101, 107, 207):' : 'Enter Room Number or Name (e.g. 101, 107, 207):');
      if (custom && custom.trim()) {
        selectRoom(custom.trim());
      }
    }

    function selectCommonArea(areaId) {
      selectedLocation = COMMON_AREAS.find(a => a.id === areaId);
      if (!selectedLocation) return;
      openChecklistScreen();
    }

    function openChecklistScreen() {
      hasValidationError = false;
      document.getElementById('screen-1').classList.remove('active');
      document.getElementById('screen-2').classList.add('active');
      document.getElementById('screen-3').classList.remove('active');
      document.getElementById('validation-alert').style.display = 'none';
      document.getElementById('photo-upload-box').classList.remove('error');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      renderScreen2();
    }

    function renderScreen1() {
      const container = document.getElementById('locations-container');
      container.innerHTML = '';

      COMMON_AREAS.forEach(loc => {
        const isHi = currentLanguage === 'hi-IN';
        const card = document.createElement('div');
        card.className = 'location-btn-card';
        card.onclick = () => selectCommonArea(loc.id);

        card.innerHTML = \`
          <div class="loc-card-header">
            <div class="loc-icon-badge">\${loc.icon}</div>
            <span class="loc-form-pill">\${isHi ? 'फ़ॉर्म: ' + loc.formNameHi : 'Form: ' + loc.formNameEn}</span>
          </div>
          <div>
            <div class="loc-title">\${isHi ? loc.nameHi : loc.nameEn}</div>
            <div class="loc-desc">\${isHi ? loc.descHi : loc.descEn}</div>
          </div>
          <div class="loc-footer">
            <span>\${loc.tasks.length}\${isHi ? ' कार्य सूची' : ' tasks'}</span>
            <span>\${isHi ? 'चेकलिस्ट खोलें ➜' : 'Open Form ➜'}</span>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    function goToScreen1() {
      document.getElementById('screen-2').classList.remove('active');
      document.getElementById('screen-3').classList.remove('active');
      document.getElementById('screen-1').classList.add('active');
      document.getElementById('validation-alert').style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function goToScreen2() {
      document.getElementById('screen-3').classList.remove('active');
      document.getElementById('screen-2').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      renderScreen2();
    }

    function renderScreen2() {
      if (!selectedLocation) return;
      const isHi = currentLanguage === 'hi-IN';

      document.getElementById('scr2-selected-pill').innerText = isHi ? selectedLocation.nameHi : selectedLocation.nameEn;
      document.getElementById('scr2-area-title').innerText = (isHi ? selectedLocation.formNameHi : selectedLocation.formNameEn) + ' ' + (isHi ? 'चेकलिस्ट' : 'Checklist');
      document.getElementById('scr2-area-desc').innerText = isHi ? selectedLocation.descHi : selectedLocation.descEn;

      const doneCount = selectedLocation.tasks.filter(t => taskState[selectedLocation.id + '_' + t.id]).length;
      document.getElementById('scr2-progress-pill').innerText = doneCount + '/' + selectedLocation.tasks.length + (isHi ? ' पूर्ण' : ' Done');

      const tasksContainer = document.getElementById('checklist-tasks-container');
      tasksContainer.innerHTML = '';

      selectedLocation.tasks.forEach(task => {
        const isChecked = Boolean(taskState[selectedLocation.id + '_' + task.id]);
        const isError = hasValidationError && !isChecked;

        const card = document.createElement('div');
        card.id = 'task-row-' + task.id;
        card.className = 'task-item task-card' + (isChecked ? ' checked' : '') + (isError ? ' error' : '');

        card.innerHTML = \`
          <button class="audio-btn" onclick="event.stopPropagation(); speakText(this)" data-hindi="\${escapeHtml(task.titleHi)}" aria-label="Play Audio" title="Play Audio">
            🔊
          </button>
          <label class="custom-checkbox task-left" onclick="toggleTask('\${task.id}')">
            <input type="checkbox" name="task_\${task.id}" \${isChecked ? 'checked' : ''} style="display:none;" />
            <span class="custom-checkbox-box">\${isChecked ? '✓' : ''}</span>
            <div class="task-info">
              <span class="task-tag">\${task.tag}</span>
              <span class="task-text" data-hindi="\${escapeHtml(task.titleHi)}">
                \${escapeHtml(task.titleEn)} / \${escapeHtml(task.titleHi)}
              </span>
            </div>
          </label>
        \`;
        tasksContainer.appendChild(card);
      });
    }

    function toggleTask(taskId) {
      if (!selectedLocation) return;
      const key = selectedLocation.id + '_' + taskId;
      taskState[key] = !taskState[key];

      renderScreen2();
    }

    // Media Upload handling
    function handleMediaCaptured(e) {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      Array.from(files).forEach(f => {
        const url = URL.createObjectURL(f);
        uploadedMediaUrls.push(url);
      });

      document.getElementById('photo-upload-box').classList.remove('error');
      renderMediaPreviews();

      speakAlert(currentLanguage === 'hi-IN' ? 'फोटो सफलतापूर्वक संलग्न की गई।' : 'Proof photo attached successfully.');
    }

    function renderMediaPreviews() {
      const container = document.getElementById('media-previews');
      if (uploadedMediaUrls.length === 0) {
        container.style.display = 'none';
        return;
      }
      container.style.display = 'grid';
      container.innerHTML = '';

      uploadedMediaUrls.forEach((url, idx) => {
        const thumb = document.createElement('div');
        thumb.className = 'media-thumb-card';
        thumb.innerHTML = \`
          <img src="\${url}" alt="proof">
          <button class="media-delete-btn" onclick="removeMedia(\${idx})">✕</button>
        \`;
        container.appendChild(thumb);
      });

      document.getElementById('camera-btn-text').innerText = currentLanguage === 'hi-IN'
        ? '➕ और फोटो / वीडियो जोड़ें'
        : '➕ Add Another Photo / Video';
    }

    function removeMedia(idx) {
      uploadedMediaUrls.splice(idx, 1);
      renderMediaPreviews();
    }

    function speakText(buttonElement) {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel(); // Stop current audio

      // Grab text directly from the button clicked
      const textToSpeak = buttonElement.getAttribute('data-hindi');
      if (!textToSpeak) return; // Failsafe

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.85; // Slightly slower

      // Fallback if voices array is still empty
      if (availableVoices.length === 0) {
        availableVoices = window.speechSynthesis.getVoices();
      }

      // Find the best Hindi voice
      const hindiVoice = availableVoices.find(v => v.lang === 'hi-IN' || v.lang === 'hi_IN' || (v.lang && v.lang.includes('hi')));

      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }

      buttonElement.classList.add('speaking');
      utterance.onend = function() {
        buttonElement.classList.remove('speaking');
      };
      utterance.onerror = function() {
        buttonElement.classList.remove('speaking');
      };

      window.speechSynthesis.speak(utterance);
    }

    function speakTaskExact(taskId) {
      if (!selectedLocation) return;
      const task = selectedLocation.tasks.find(t => t.id === taskId);
      if (!task) return;
      speakAlert(task.titleHi, 'hi-IN');
    }

    function speakAlert(text, customLang) {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = customLang || currentLanguage;
      utterance.rate = 0.9;
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(voice => voice.lang === 'hi-IN' || voice.lang === 'hi_IN' || (voice.lang && voice.lang.toLowerCase().includes('hi')));
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }
      window.speechSynthesis.speak(utterance);
    }

    // Flow Validation: Checks all tasks completed AND at least 1 photo uploaded
    function handleNextStep() {
      if (!selectedLocation) return;

      const uncheckedTasks = selectedLocation.tasks.filter(t => !taskState[selectedLocation.id + '_' + t.id]);

      // 1. Task Check
      if (uncheckedTasks.length > 0) {
        hasValidationError = true;
        renderScreen2();

        const banner = document.getElementById('validation-alert');
        banner.style.display = 'block';
        document.getElementById('validation-alert-text').innerText = 'कृपया छूटे हुए काम पूरे करें और फोटो लें।';

        const firstErrorId = 'task-row-' + uncheckedTasks[0].id;
        const firstElem = document.getElementById(firstErrorId);
        if (firstElem) {
          firstElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        speakAlert('कृपया छूटे हुए काम पूरे करें और फोटो लें।', 'hi-IN');
        return;
      }

      // 2. Photo Proof Check
      if (uploadedMediaUrls.length === 0) {
        const photoBox = document.getElementById('photo-upload-box');
        photoBox.classList.add('error');
        photoBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const banner = document.getElementById('validation-alert');
        banner.style.display = 'block';
        document.getElementById('validation-alert-text').innerText = 'कृपया छूटे हुए काम पूरे करें और फोटो लें।';

        // Explicit audio warning requirement
        speakAlert('कृपया छूटे हुए काम पूरे करें और फोटो लें।', 'hi-IN');
        return;
      }

      // Validated! Proceed to Section 10
      hasValidationError = false;
      document.getElementById('validation-alert').style.display = 'none';

      document.getElementById('screen-2').classList.remove('active');
      document.getElementById('screen-3').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      speakAlert(currentLanguage === 'hi-IN'
        ? 'बहुत बढ़िया! अब खंड 10 में सफाई के मुद्दे और टिप्पणियां दर्ज करें।'
        : 'Great job! Now enter any issues and remarks in Section 10.');
    }

    function addChip(text) {
      const input = document.getElementById('input-issues');
      input.value = input.value ? input.value + ', ' + text : text;
    }

    function handleSubmitShift() {
      const locName = selectedLocation ? (currentLanguage === 'hi-IN' ? selectedLocation.nameHi : selectedLocation.nameEn) : 'Housekeeping';
      speakAlert(currentLanguage === 'hi-IN'
        ? locName + ' की सफाई शिफ्ट सफलतापूर्वक सबमिट हो गई।'
        : 'Shift submitted successfully for ' + locName);

      alert(currentLanguage === 'hi-IN'
        ? '🎉 ' + locName + ' की सफाई शिफ्ट सफलतापूर्वक सबमिट की गई!'
        : '🎉 Housekeeping shift submitted successfully for ' + locName + '!');

      uploadedMediaUrls = [];
      goToScreen1();
    }

    function startVoiceTranscribe(targetInputId) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert(currentLanguage === 'hi-IN'
          ? 'आपके ब्राउज़र में वॉइस ट्रांसक्रिप्शन सपोर्ट नहीं है। कृपया Google Chrome का उपयोग करें।'
          : 'Speech recognition is not supported in this browser. Please use Chrome.');
        return;
      }

      speakAlert(currentLanguage === 'hi-IN' ? 'माइक चालू है, हिंदी में बोलिए...' : 'Listening in Hindi...');

      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'hi-IN';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = function(event) {
          const text = event.results[0][0].transcript;
          const elem = document.getElementById(targetInputId);
          if (elem) {
            elem.value = elem.value ? elem.value + ', ' + text : text;
          }
          speakAlert(currentLanguage === 'hi-IN' ? 'जोड़ा गया: ' + text : 'Added: ' + text);
        };

        recognition.onerror = function(err) {
          console.warn('Speech recognition error:', err);
        };

        recognition.start();
      } catch (e) {
        console.error(e);
      }
    }

    function setLanguage(lang) {
      currentLanguage = lang;
      document.getElementById('btn-hi').classList.toggle('active', lang === 'hi-IN');
      document.getElementById('btn-en').classList.toggle('active', lang === 'en-IN');
      
      const isHi = lang === 'hi-IN';
      document.getElementById('header-sub').innerText = isHi ? 'दैनिक हाउसकीपिंग चेकलिस्ट (Bilingual Audio)' : 'Daily Housekeeping Checklist (Bilingual Audio)';
      document.getElementById('scr1-title').innerText = isHi ? 'आप किस कमरे या क्षेत्र की सफाई कर रहे हैं?' : 'Which room or area are you cleaning?';
      document.getElementById('scr1-sub').innerText = isHi ? 'विशिष्ट कमरे (जैसे 107, 207, डॉर्म हॉल) या अन्य क्षेत्र पर टैप करें।' : 'Select specific room number or common area below.';
      document.getElementById('btn-change-loc').innerText = isHi ? 'कमरा बदलें' : 'Change Room';
      document.getElementById('btn-next-text').innerText = isHi ? 'अगला कदम: खंड 10 (मुद्दे और टिप्पणियां)' : 'Next Step: Section 10 (Issues & Remarks)';
      document.getElementById('btn-back-form').innerText = isHi ? 'चेकलिस्ट पर वापस जाएं' : 'Back to Checklist';
      document.getElementById('btn-submit-text').innerText = isHi ? 'पूरी शिफ्ट सबमिट करें' : 'Submit Shift';

      if (document.getElementById('screen-2').classList.contains('active')) {
        renderScreen2();
      } else {
        renderScreen1();
      }
    }

    // Initial render
    renderScreen1();
  </script>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(standaloneHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([standaloneHtmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bunk-hostel-housekeeping-checklist.html';
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
            <Code className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-black text-stone-900">
              {isHindi ? 'सिंगल-फाइल HTML कोड (Room Selection + Photo Proof Flow)' : 'Single-File HTML Code Export'}
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
          {isHindi
            ? 'यह पूरी तरह से स्टैंडअलोन HTML, CSS और Vanilla JS कोड है जिसमें विशिष्ट कमरे (107, 207, डॉर्म हॉल आदि) से डॉर्म फॉर्म रूटिंग, मोबाइल कैमरा फोटो/वीडियो अपलोड और ऑडियो चेतावनियों के साथ खंड 10 फ्लो शामिल है।'
            : 'Complete self-contained HTML/CSS/Vanilla JS file featuring Room routing (107, 207, Dorm Hall -> Dorm Form), mobile-first camera upload proof, red visual validation, and mandatory Section 10 flow.'}
        </p>

        {/* Code Snippet Box */}
        <div className="flex-1 overflow-hidden rounded-2xl border border-stone-300 bg-stone-900 text-stone-100 font-mono text-xs p-3">
          <pre className="h-64 overflow-y-auto whitespace-pre-wrap select-all">
            {standaloneHtmlCode}
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
            <span>{isHindi ? 'डाउनलोड HTML' : 'Download .html'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black flex items-center gap-1.5 transition shadow"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-900 stroke-[3]" />
                <span>{isHindi ? 'कॉपी हो गया!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{isHindi ? 'कोड कॉपी करें' : 'Copy Code'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
