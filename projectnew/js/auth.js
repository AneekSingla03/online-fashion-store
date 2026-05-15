/* ============================================================
   StyleHub — auth.js
   Login, signup, profile management (localStorage-based)
   ============================================================ */

function getUser() {
  try { return JSON.parse(localStorage.getItem('sh_user') || 'null'); } catch { return null; }
}
function saveUser(user) { localStorage.setItem('sh_user', JSON.stringify(user)); }
function logoutUser() {
  localStorage.removeItem('sh_user');
  showToast('Logged out successfully.');
  setTimeout(() => window.location.href = 'login.html', 800);
}
function isLoggedIn() { return !!getUser(); }

/* ── LOGIN ── */
function handleLogin(e) {
  e.preventDefault();
  clearErrors();
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  let valid = true;

  if (!email || !email.includes('@')) { setError('login-email', 'Enter a valid email.'); valid = false; }
  if (!pass || pass.length < 6) { setError('login-pass', 'Password must be 6+ characters.'); valid = false; }
  if (!valid) return;

  // Simulate auth (in real app: API call)
  const stored = getUser();
  if (stored && stored.email === email) {
    showToast('Welcome back, ' + stored.name + '!', 'success');
    setTimeout(() => window.location.href = 'profile.html', 900);
  } else {
    // Demo: create new session
    saveUser({ email, name: email.split('@')[0], joined: new Date().toLocaleDateString() });
    showToast('Logged in successfully!', 'success');
    setTimeout(() => window.location.href = 'index.html', 900);
  }
}

/* ── SIGNUP ── */
function handleSignup(e) {
  e.preventDefault();
  clearErrors();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const pass = document.getElementById('signup-pass').value;
  const confirm = document.getElementById('signup-confirm').value;
  let valid = true;

  if (!name || name.length < 2) { setError('signup-name', 'Enter your full name.'); valid = false; }
  if (!email || !email.includes('@')) { setError('signup-email', 'Enter a valid email.'); valid = false; }
  if (!pass || pass.length < 6) { setError('signup-pass', 'Password must be 6+ characters.'); valid = false; }
  if (pass !== confirm) { setError('signup-confirm', 'Passwords do not match.'); valid = false; }
  if (!valid) return;

  saveUser({ name, email, joined: new Date().toLocaleDateString(), phone: '', address: '' });
  showToast('Account created! Welcome to StyleHub!', 'success');
  setTimeout(() => window.location.href = 'index.html', 900);
}

/* ── PROFILE PAGE ── */
function renderProfile() {
  const user = getUser();
  if (!user) { window.location.href = 'login.html'; return; }

  // Fill form fields
  const fields = { 'profile-name': user.name, 'profile-email': user.email, 'profile-phone': user.phone || '', 'profile-address': user.address || '' };
  Object.entries(fields).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  });

  // Fill display info
  const nameDisplay = document.getElementById('profile-name-display');
  if (nameDisplay) nameDisplay.textContent = user.name;
  const emailDisplay = document.getElementById('profile-email-display');
  if (emailDisplay) emailDisplay.textContent = user.email;
  const joinedDisplay = document.getElementById('profile-joined');
  if (joinedDisplay) joinedDisplay.textContent = 'Member since ' + (user.joined || 'recently');
  const avatarEl = document.getElementById('profile-avatar-letter');
  if (avatarEl) avatarEl.textContent = user.name.charAt(0).toUpperCase();
}

function handleProfileUpdate(e) {
  e.preventDefault();
  const user = getUser();
  user.name = document.getElementById('profile-name').value.trim();
  user.phone = document.getElementById('profile-phone').value.trim();
  user.address = document.getElementById('profile-address').value.trim();
  saveUser(user);
  showToast('Profile updated successfully!', 'success');
  renderProfile();
}

/* ── HELPERS ── */
function setError(inputId, msg) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.style.borderColor = '#d32f2f';
  let err = input.parentNode.querySelector('.form-error');
  if (!err) { err = document.createElement('div'); err.className = 'form-error'; input.parentNode.appendChild(err); }
  err.textContent = msg;
}
function clearErrors() {
  document.querySelectorAll('.form-error').forEach(el => el.remove());
  document.querySelectorAll('.form-input, .form-textarea').forEach(el => el.style.borderColor = '');
}
