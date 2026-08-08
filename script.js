// script.js - Lady P - Theme + Big Photo Upload
const root = document.documentElement;
const themePanel = document.getElementById('themePanel');
const themeToggle = document.getElementById('themeToggle');
const closeTheme = document.getElementById('closeTheme');
const colorDots = document.querySelectorAll('.color-dot');
const customPicker = document.getElementById('customColorPicker');

// Photo elements
const photoInput = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');
const photoPlaceholder = document.getElementById('photoPlaceholder');
const photoFrame = document.getElementById('photoFrame');
const removeBtn = document.getElementById('removePhoto');

function applyTheme(color) {
  const isWhite = color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#fff';
  const textColor = isWhite ? '#111111' : '#ffffff';
  root.style.setProperty('--primary', color);
  root.style.setProperty('--primary-text', textColor);
  if (isWhite) document.body.style.background = '#f5f5f5';
  else document.body.style.background = '';
  localStorage.setItem('ladyP-theme', color);
  colorDots.forEach(dot => {
    dot.classList.remove('active');
    if (dot.dataset.color.toLowerCase() === color.toLowerCase()) dot.classList.add('active');
  });
}

const savedTheme = localStorage.getItem('ladyP-theme');
if (savedTheme) {
  applyTheme(savedTheme);
  customPicker.value = savedTheme;
}

colorDots.forEach(dot => {
  dot.addEventListener('click', () => {
    applyTheme(dot.dataset.color);
    customPicker.value = dot.dataset.color;
  });
});
customPicker.addEventListener('input', e => applyTheme(e.target.value));
themeToggle.addEventListener('click', () => themePanel.classList.toggle('hidden'));
closeTheme.addEventListener('click', () => themePanel.classList.add('hidden'));

// BIG PHOTO UPLOAD LOGIC
function showPhoto(src) {
  photoPreview.src = src;
  photoPreview.classList.remove('hidden');
  photoPlaceholder.classList.add('hidden');
  removeBtn.classList.remove('hidden');
  photoFrame.style.borderStyle = 'solid';
}

function clearPhoto() {
  photoPreview.src = '';
  photoPreview.classList.add('hidden');
  photoPlaceholder.classList.remove('hidden');
  removeBtn.classList.add('hidden');
  photoFrame.style.borderStyle = 'dashed';
  localStorage.removeItem('ladyP-photo');
  photoInput.value = '';
}

// Load saved photo
const savedPhoto = localStorage.getItem('ladyP-photo');
if (savedPhoto) showPhoto(savedPhoto);

photoInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { alert('Please choose an image file'); return; }
  const reader = new FileReader();
  reader.onload = ev => {
    const dataUrl = ev.target.result;
    showPhoto(dataUrl);
    localStorage.setItem('ladyP-photo', dataUrl);
  };
  reader.readAsDataURL(file);
});

photoFrame.addEventListener('click', () => photoInput.click());

photoFrame.addEventListener('dragover', e => {
  e.preventDefault();
  photoFrame.classList.add('dragover');
});
photoFrame.addEventListener('dragleave', () => photoFrame.classList.remove('dragover'));
photoFrame.addEventListener('drop', e => {
  e.preventDefault();
  photoFrame.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = ev => {
      showPhoto(ev.target.result);
      localStorage.setItem('ladyP-photo', ev.target.result);
    };
    reader.readAsDataURL(file);
  }
});

removeBtn.addEventListener('click', e => {
  e.stopPropagation();
  clearPhoto();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const t=document.querySelector(a.getAttribute('href'));
    if(t) t.scrollIntoView({behavior:'smooth'});
  });
});

console.log("Lady P site loaded - Theme + Big Photo Upload ready");
  
