// Main Controller for Tomato Leaf Disease Detection AI Studio
// Supports Real PlantVillage Leaf Photographs, Custom Uploads, and Webcam
import confetti from 'canvas-confetti';
import { CATEGORIES, DISEASE_INFO } from './diseaseData.js';
import { analyzeLeafImage } from './classifier.js';

// DOM Elements
const navScanner = document.getElementById('nav-scanner');
const navEncyclopedia = document.getElementById('nav-encyclopedia');
const navModel = document.getElementById('nav-model');

const viewScanner = document.getElementById('view-scanner');
const viewEncyclopedia = document.getElementById('view-encyclopedia');
const viewModel = document.getElementById('view-model');

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const dropzoneEmpty = document.getElementById('dropzone-empty');
const previewStage = document.getElementById('preview-stage');
const mainCanvas = document.getElementById('main-canvas');
const heatmapCanvas = document.getElementById('heatmap-canvas');
const toggleHeatmap = document.getElementById('toggle-heatmap');
const heatmapOpacitySlider = document.getElementById('heatmap-opacity');

const modeUploadBtn = document.getElementById('mode-upload-btn');
const modeCameraBtn = document.getElementById('mode-camera-btn');
const cameraStage = document.getElementById('camera-stage');
const cameraVideo = document.getElementById('camera-video');
const btnSnapCamera = document.getElementById('btn-snap-camera');
const btnCancelCamera = document.getElementById('btn-cancel-camera');

const presetsGrid = document.getElementById('presets-grid');
const btnQuickSample = document.getElementById('btn-quick-sample');
const btnPrintReport = document.getElementById('btn-print-report');
const currentPhotoIndicator = document.getElementById('current-photo-indicator');

// Results elements
const resultDiseaseName = document.getElementById('result-disease-name');
const resultDiseaseSci = document.getElementById('result-disease-sci');
const resultPathogenTag = document.getElementById('result-pathogen-tag');
const resultSeverityTag = document.getElementById('result-severity-tag');
const healthIndexBadge = document.getElementById('health-index-badge');
const statConfidence = document.getElementById('stat-confidence');
const statHealth = document.getElementById('stat-health');
const statNecrosis = document.getElementById('stat-necrosis');

const listSymptoms = document.getElementById('list-symptoms');
const listOrganic = document.getElementById('list-organic');
const listChemical = document.getElementById('list-chemical');
const listPrevention = document.getElementById('list-prevention');
const confidenceBars = document.getElementById('confidence-bars');

let activeMediaStream = null;
let currentDiagnosis = null;
let manifestData = {};
let selectedCategory = "Tomato___Early_blight";
let selectedPhotoIndex = 0; // 0, 1, or 2

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  setupNavigation();
  setupInputHandlers();
  setupPlanTabs();
  setupHeatmapControls();
  setupEncyclopedia();
  await loadManifestAndPresets();

  // Load an authentic real leaf photo on startup
  loadRealLeafSpecimen("Tomato___Early_blight", 0);
});

// 1. Load Real Leaf Manifest
async function loadManifestAndPresets() {
  try {
    const res = await fetch('/real_leaves/manifest.json');
    manifestData = await res.json();
  } catch (err) {
    console.warn('Could not load real leaves manifest:', err);
  }
  setupPresets();
}

// 2. Navigation Controller
function setupNavigation() {
  const tabs = [
    { btn: navScanner, view: viewScanner },
    { btn: navEncyclopedia, view: viewEncyclopedia },
    { btn: navModel, view: viewModel }
  ];

  tabs.forEach(({ btn, view }) => {
    btn.addEventListener('click', () => {
      tabs.forEach(t => {
        t.btn.classList.remove('active');
        t.view.classList.remove('active');
      });
      btn.classList.add('active');
      view.classList.add('active');
    });
  });

  btnQuickSample.addEventListener('click', () => {
    navScanner.click();
    const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const randomIdx = Math.floor(Math.random() * 3);
    loadRealLeafSpecimen(randomCategory, randomIdx);
  });

  btnPrintReport.addEventListener('click', () => {
    window.print();
  });
}

// 3. Input Handlers
function setupInputHandlers() {
  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  });

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  });

  window.addEventListener('paste', (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let item of items) {
      if (item.type.indexOf('image') === 0) {
        const blob = item.getAsFile();
        handleImageFile(blob);
        break;
      }
    }
  });

  modeUploadBtn.addEventListener('click', () => {
    stopCamera();
    modeUploadBtn.classList.add('active');
    modeCameraBtn.classList.remove('active');
    cameraStage.classList.remove('active');
    if (mainCanvas.width > 0) {
      previewStage.classList.add('active');
      dropzoneEmpty.style.display = 'none';
    } else {
      dropzoneEmpty.style.display = 'flex';
    }
  });

  modeCameraBtn.addEventListener('click', () => {
    startCamera();
  });

  btnSnapCamera.addEventListener('click', () => {
    snapCameraFrame();
  });

  btnCancelCamera.addEventListener('click', () => {
    modeUploadBtn.click();
  });
}

function handleImageFile(file) {
  if (!file.type.startsWith('image/')) return;
  stopCamera();

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      renderImageToMainCanvas(img);
      triggerDiagnosticPipeline(img, null, "Custom Uploaded Real Leaf");
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

// 4. Live Camera
async function startCamera() {
  try {
    modeCameraBtn.classList.add('active');
    modeUploadBtn.classList.remove('active');
    dropzoneEmpty.style.display = 'none';
    previewStage.classList.remove('active');
    cameraStage.classList.add('active');

    activeMediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 720 }, height: { ideal: 720 } },
      audio: false
    });
    cameraVideo.srcObject = activeMediaStream;
  } catch (err) {
    console.warn('Camera access unavailable:', err);
    alert('Unable to access camera. Please allow camera permissions or upload an image file instead.');
    modeUploadBtn.click();
  }
}

function stopCamera() {
  if (activeMediaStream) {
    activeMediaStream.getTracks().forEach(track => track.stop());
    activeMediaStream = null;
  }
  cameraStage.classList.remove('active');
}

function snapCameraFrame() {
  if (!cameraVideo.videoWidth) return;

  const width = cameraVideo.videoWidth;
  const height = cameraVideo.videoHeight;
  mainCanvas.width = width;
  mainCanvas.height = height;
  const ctx = mainCanvas.getContext('2d');
  ctx.drawImage(cameraVideo, 0, 0, width, height);

  stopCamera();
  modeUploadBtn.classList.add('active');
  modeCameraBtn.classList.remove('active');
  previewStage.classList.add('active');

  triggerDiagnosticPipeline(mainCanvas, null, "Live Camera Real Capture");
}

// 5. Presets Library with Authentic Real Leaf Photos
function setupPresets() {
  presetsGrid.innerHTML = '';

  CATEGORIES.forEach(categoryKey => {
    const info = DISEASE_INFO[categoryKey];
    const chip = document.createElement('div');
    chip.className = 'preset-chip';
    chip.dataset.key = categoryKey;

    const thumb = document.createElement('div');
    thumb.className = 'preset-thumb';

    // Real photograph thumbnail from manifest
    const img = document.createElement('img');
    const realPhotos = manifestData[categoryKey] || [];
    img.src = realPhotos[0] || `/real_leaves/${categoryKey}/leaf_1.jpg`;
    img.alt = info.name;
    img.loading = 'lazy';
    thumb.appendChild(img);

    const nameSpan = document.createElement('span');
    nameSpan.textContent = info.name;
    nameSpan.title = `${info.name} (Real Field Leaf)`;

    chip.appendChild(thumb);
    chip.appendChild(nameSpan);

    chip.addEventListener('click', () => {
      selectedCategory = categoryKey;
      loadRealLeafSpecimen(categoryKey, selectedPhotoIndex);
    });

    presetsGrid.appendChild(chip);
  });

  // Setup variation buttons [Leaf #1] [Leaf #2] [Leaf #3]
  setupVariationButtons();
}

function setupVariationButtons() {
  const variationContainer = document.getElementById('photo-variation-controls');
  if (!variationContainer) return;

  variationContainer.querySelectorAll('.btn-var').forEach(btn => {
    btn.addEventListener('click', () => {
      variationContainer.querySelectorAll('.btn-var').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPhotoIndex = parseInt(btn.dataset.idx, 10);
      loadRealLeafSpecimen(selectedCategory, selectedPhotoIndex);
    });
  });
}

export function loadRealLeafSpecimen(categoryKey, photoIndex = 0) {
  selectedCategory = categoryKey;
  stopCamera();

  // Highlight selected chip
  document.querySelectorAll('.preset-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.key === categoryKey);
  });

  // Get image path from manifest
  const realPhotos = manifestData[categoryKey] || [
    `/real_leaves/${categoryKey}/leaf_1.jpg`,
    `/real_leaves/${categoryKey}/leaf_2.jpg`,
    `/real_leaves/${categoryKey}/leaf_3.jpg`
  ];
  const photoPath = realPhotos[photoIndex] || realPhotos[0];

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    renderImageToMainCanvas(img);
    triggerDiagnosticPipeline(img, categoryKey, `Real Field Specimen #${photoIndex + 1}`);
  };
  img.src = photoPath;
}

function renderImageToMainCanvas(imgOrCanvas) {
  const width = imgOrCanvas.naturalWidth || imgOrCanvas.width || 300;
  const height = imgOrCanvas.naturalHeight || imgOrCanvas.height || 300;
  mainCanvas.width = width;
  mainCanvas.height = height;
  const ctx = mainCanvas.getContext('2d');
  ctx.drawImage(imgOrCanvas, 0, 0, width, height);

  dropzoneEmpty.style.display = 'none';
  previewStage.classList.add('active');
}

// 6. Diagnostic Pipeline
async function triggerDiagnosticPipeline(sourceImage, forcedCategory = null, sourceLabel = "Real Field Leaf") {
  previewStage.classList.add('scanning');
  document.getElementById('input-status-badge').textContent = 'Analyzing Real Leaf...';
  document.getElementById('input-status-badge').style.color = '#38bdf8';
  if (currentPhotoIndicator) {
    currentPhotoIndicator.textContent = sourceLabel;
  }

  // Brief latency for scanner line animation
  await new Promise(r => setTimeout(r, 550));

  const result = await analyzeLeafImage(sourceImage, forcedCategory);
  currentDiagnosis = result;

  previewStage.classList.remove('scanning');
  document.getElementById('input-status-badge').textContent = 'Identified';
  document.getElementById('input-status-badge').style.color = '#34d399';

  renderHeatmap(result.saliencyCanvas);
  renderDiagnosisUI(result);

  if (result.topPrediction.id === 'Tomato___healthy' && result.topPrediction.probability > 0.8) {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#6ee7b7']
    });
  }
}

function renderHeatmap(saliencyCanvas) {
  heatmapCanvas.width = saliencyCanvas.width;
  heatmapCanvas.height = saliencyCanvas.height;
  const ctx = heatmapCanvas.getContext('2d');
  ctx.clearRect(0, 0, heatmapCanvas.width, heatmapCanvas.height);
  ctx.drawImage(saliencyCanvas, 0, 0);

  updateHeatmapVisibility();
}

function setupHeatmapControls() {
  toggleHeatmap.addEventListener('change', updateHeatmapVisibility);
  heatmapOpacitySlider.addEventListener('input', updateHeatmapVisibility);
}

function updateHeatmapVisibility() {
  if (toggleHeatmap.checked) {
    heatmapCanvas.style.opacity = heatmapOpacitySlider.value;
  } else {
    heatmapCanvas.style.opacity = '0';
  }
}

// 7. UI Diagnosis Rendering
function renderDiagnosisUI(result) {
  const { topPrediction, allPredictions, healthScore, metrics } = result;
  const info = topPrediction.info;

  resultDiseaseName.textContent = info.name;
  resultDiseaseSci.textContent = info.scientificName;
  resultPathogenTag.textContent = info.pathogenType;

  if (info.pathogenType === 'Bacterial') {
    resultPathogenTag.style.background = 'rgba(245, 158, 11, 0.2)';
    resultPathogenTag.style.color = '#fbbf24';
  } else if (info.pathogenType === 'Fungal') {
    resultPathogenTag.style.background = 'rgba(239, 68, 68, 0.2)';
    resultPathogenTag.style.color = '#f87171';
  } else if (info.pathogenType === 'Viral') {
    resultPathogenTag.style.background = 'rgba(168, 85, 247, 0.2)';
    resultPathogenTag.style.color = '#c084fc';
  } else {
    resultPathogenTag.style.background = 'rgba(16, 185, 129, 0.2)';
    resultPathogenTag.style.color = '#34d399';
  }

  resultSeverityTag.textContent = `Severity: ${info.severity}`;
  if (info.severity === 'None') {
    resultSeverityTag.className = 'severity-tag severity-healthy';
    healthIndexBadge.textContent = 'Plant Healthy';
    healthIndexBadge.className = 'badge-pill severity-healthy';
  } else if (info.severity === 'Moderate') {
    resultSeverityTag.className = 'severity-tag severity-moderate';
    healthIndexBadge.textContent = 'Moderate Pressure';
    healthIndexBadge.className = 'badge-pill severity-moderate';
  } else {
    resultSeverityTag.className = 'severity-tag severity-critical';
    healthIndexBadge.textContent = 'High Disease Risk';
    healthIndexBadge.className = 'badge-pill severity-critical';
  }

  const confidencePercent = Math.round(topPrediction.probability * 100);
  statConfidence.textContent = confidencePercent;
  statHealth.textContent = healthScore;
  statNecrosis.textContent = metrics.necrosisRatio;

  populateList(listSymptoms, info.symptoms, '🔍', 'amber');
  populateList(listOrganic, info.organicControl, '🌱', 'green');
  populateList(listChemical, info.chemicalControl, '🧪', 'blue');
  populateList(listPrevention, info.prevention, '🛡️', 'green');

  confidenceBars.innerHTML = '';
  document.getElementById('top-class-badge').textContent = `Top: ${info.name} (${confidencePercent}%)`;

  allPredictions.forEach(pred => {
    const pct = (pred.probability * 100).toFixed(1);
    const isTop = pred.id === topPrediction.id;

    const barItem = document.createElement('div');
    barItem.className = 'bar-item';

    barItem.innerHTML = `
      <div class="bar-header ${isTop ? 'highlight' : ''}">
        <span>${pred.name}</span>
        <span>${pct}%</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill ${pred.id !== 'Tomato___healthy' && isTop ? 'danger' : ''}" style="width: ${pct}%;"></div>
      </div>
    `;
    confidenceBars.appendChild(barItem);
  });
}

function populateList(container, items, icon, colorClass) {
  container.innerHTML = '';
  items.forEach(text => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="icon-badge ${colorClass}">${icon}</div>
      <span>${text}</span>
    `;
    container.appendChild(li);
  });
}

// 8. Action Plan Tabs Controller
function setupPlanTabs() {
  const planButtons = document.querySelectorAll('.plan-tab-btn');
  const planPanes = {
    symptoms: document.getElementById('pane-symptoms'),
    organic: document.getElementById('pane-organic'),
    chemical: document.getElementById('pane-chemical'),
    prevention: document.getElementById('pane-prevention')
  };

  planButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      planButtons.forEach(b => b.classList.remove('active'));
      Object.values(planPanes).forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const tabKey = btn.dataset.tab;
      if (planPanes[tabKey]) {
        planPanes[tabKey].classList.add('active');
      }
    });
  });
}

// 9. Disease Encyclopedia
function setupEncyclopedia() {
  const encyclopediaGrid = document.getElementById('encyclopedia-grid');
  const searchInput = document.getElementById('encyclopedia-search');

  function renderCards(filterText = '') {
    encyclopediaGrid.innerHTML = '';
    const query = filterText.toLowerCase();

    CATEGORIES.forEach(key => {
      const info = DISEASE_INFO[key];
      const match = !query || 
        info.name.toLowerCase().includes(query) ||
        info.scientificName.toLowerCase().includes(query) ||
        info.pathogenType.toLowerCase().includes(query) ||
        info.symptoms.some(s => s.toLowerCase().includes(query)) ||
        info.organicControl.some(o => o.toLowerCase().includes(query)) ||
        info.chemicalControl.some(c => c.toLowerCase().includes(query));

      if (match) {
        const card = document.createElement('div');
        card.className = 'encyclopedia-card';
        card.innerHTML = `
          <div class="enc-top-row">
            <h3>${info.name}</h3>
            <span class="pathogen-badge">${info.pathogenType}</span>
          </div>
          <div class="enc-sci">${info.scientificName}</div>
          <p class="enc-summary">${info.summary}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.06);">
            <span class="badge-pill" style="font-size: 0.7rem; background: rgba(255,255,255,0.06); color: #cbd5e1;">Severity: ${info.severity}</span>
            <button class="btn-secondary" style="font-size: 0.76rem; padding: 0.35rem 0.7rem;">Identify Real Leaf ➔</button>
          </div>
        `;

        card.addEventListener('click', () => {
          navScanner.click();
          loadRealLeafSpecimen(key, 0);
        });

        encyclopediaGrid.appendChild(card);
      }
    });
  }

  renderCards();

  searchInput.addEventListener('input', (e) => {
    renderCards(e.target.value);
  });
}
