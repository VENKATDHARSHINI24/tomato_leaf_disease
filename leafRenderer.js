// Procedural Botanical Leaf Renderer for Tomato Leaf Specimens
// Generates realistic botanical leaf canvases for the 10 disease categories

export function createProceduralLeaf(categoryKey, width = 480, height = 480) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Background - soft natural studio garden backdrop
  const bgGrad = ctx.createRadialGradient(width/2, height/2, 20, width/2, height/2, width*0.7);
  bgGrad.addColorStop(0, '#1c2822');
  bgGrad.addColorStop(1, '#0e1713');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.translate(width / 2, height / 2);

  // Apply subtle random tilt
  ctx.rotate(-0.05);

  const scale = width / 440;
  ctx.scale(scale, scale);

  drawTomatoLeaf(ctx, categoryKey);

  ctx.restore();
  return canvas;
}

function drawTomatoLeaf(ctx, disease) {
  const isYellowCurl = disease === "Tomato___Tomato_Yellow_Leaf_Curl_Virus";
  const isHealthy = disease === "Tomato___healthy";
  const isMosaic = disease === "Tomato___Tomato_mosaic_virus";

  // Base Leaf Silhouette Path
  ctx.save();

  // Draw main stem/petiole
  ctx.beginPath();
  ctx.moveTo(0, 190);
  ctx.quadraticCurveTo(5, 100, 0, -180);
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.strokeStyle = isYellowCurl ? '#c5cf61' : '#3f6838';
  ctx.stroke();

  // Stem highlight
  ctx.beginPath();
  ctx.moveTo(-2, 185);
  ctx.quadraticCurveTo(3, 100, -1, -170);
  ctx.lineWidth = 4;
  ctx.strokeStyle = isYellowCurl ? '#e5f28a' : '#5f9953';
  ctx.stroke();

  // Create leaf path with serrated lobes
  ctx.beginPath();
  ctx.moveTo(0, -170); // Leaf tip

  // Right half with realistic tomato leaflet lobes & serrations
  drawLeafSide(ctx, 1, isYellowCurl);

  // Bottom stem junction
  ctx.lineTo(0, 130);

  // Left half mirrored with slight natural asymmetry
  drawLeafSide(ctx, -1, isYellowCurl);

  ctx.closePath();

  // Fill Base Leaf Color Gradient
  let baseColor1, baseColor2;
  if (isYellowCurl) {
    baseColor1 = '#d6e655';
    baseColor2 = '#9ab829';
  } else if (disease === 'Tomato___Late_blight') {
    baseColor1 = '#3a5933';
    baseColor2 = '#233720';
  } else if (disease === 'Tomato___Leaf_Mold') {
    baseColor1 = '#647e33';
    baseColor2 = '#3f5621';
  } else {
    baseColor1 = '#3e7c37';
    baseColor2 = '#265121';
  }

  const leafGrad = ctx.createLinearGradient(0, -170, 0, 130);
  leafGrad.addColorStop(0, baseColor1);
  leafGrad.addColorStop(1, baseColor2);
  ctx.fillStyle = leafGrad;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 10;
  ctx.fill();
  ctx.shadowColor = 'transparent';

  // Clip to leaf body for internal details & pathological lesions
  ctx.clip();

  // Add natural leaf lamina texture (fine cellular noise/grain)
  drawLeafTexture(ctx, isYellowCurl);

  // Draw main secondary veins
  drawVeinSystem(ctx, isYellowCurl);

  // Add specific pathological disease signatures
  switch(disease) {
    case 'Tomato___Bacterial_spot':
      drawBacterialSpots(ctx);
      break;
    case 'Tomato___Early_blight':
      drawEarlyBlight(ctx);
      break;
    case 'Tomato___Late_blight':
      drawLateBlight(ctx);
      break;
    case 'Tomato___Leaf_Mold':
      drawLeafMold(ctx);
      break;
    case 'Tomato___Septoria_leaf_spot':
      drawSeptoriaSpots(ctx);
      break;
    case 'Tomato___Spider_mites Two-spotted_spider_mite':
      drawSpiderMiteDamage(ctx);
      break;
    case 'Tomato___Target_Spot':
      drawTargetSpots(ctx);
      break;
    case 'Tomato___Tomato_mosaic_virus':
      drawMosaicVirus(ctx);
      break;
    case 'Tomato___Tomato_Yellow_Leaf_Curl_Virus':
      drawYellowLeafCurlDetails(ctx);
      break;
    case 'Tomato___healthy':
    default:
      drawHealthyHighlights(ctx);
      break;
  }

  ctx.restore();

  // Add curled/crinkled edge shading for Yellow Leaf Curl
  if (isYellowCurl) {
    drawCurledLeafEdges(ctx);
  }
}

function drawLeafSide(ctx, sign, isCurled) {
  // Generates organic tomato lobe serrations
  const pts = [
    { cp1x: 18 * sign, cp1y: -150, cp2x: 45 * sign, cp2y: -125, x: 50 * sign, y: -105 },
    { cp1x: 40 * sign, cp1y: -100, cp2x: 35 * sign, cp2y: -95,  x: 58 * sign, y: -80 },
    { cp1x: 75 * sign, cp1y: -65,  cp2x: 115 * sign, cp2y: -30, x: 110 * sign, y: 10 },
    { cp1x: 95 * sign, cp1y: 20,   cp2x: 75 * sign, cp2y: 28,   x: 95 * sign, y: 45 },
    { cp1x: 105 * sign, cp1y: 65,  cp2x: 65 * sign, cp2y: 95,   x: 35 * sign, y: 115 },
    { cp1x: 20 * sign, cp1y: 122,  cp2x: 10 * sign, cp2y: 126,  x: 0, y: 130 }
  ];

  if (isCurled) {
    // Squeeze width inward to simulate cupped leaf
    for (let p of pts) {
      ctx.bezierCurveTo(p.cp1x * 0.72, p.cp1y, p.cp2x * 0.72, p.cp2y, p.x * 0.72, p.y);
    }
  } else {
    for (let p of pts) {
      ctx.bezierCurveTo(p.cp1x, p.cp1y, p.cp2x, p.cp2y, p.x, p.y);
    }
  }
}

function drawVeinSystem(ctx, isYellow) {
  ctx.save();
  ctx.strokeStyle = isYellow ? 'rgba(235, 255, 140, 0.45)' : 'rgba(115, 185, 95, 0.45)';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';

  const veinPairs = [
    { y: -110, len: 45, ang: -0.45 },
    { y: -70, len: 75, ang: -0.42 },
    { y: -25, len: 98, ang: -0.35 },
    { y: 20, len: 85, ang: -0.28 },
    { y: 65, len: 60, ang: -0.20 },
    { y: 100, len: 35, ang: -0.15 }
  ];

  veinPairs.forEach(vp => {
    // Right side vein
    ctx.beginPath();
    ctx.moveTo(0, vp.y);
    ctx.quadraticCurveTo(vp.len * 0.6, vp.y + Math.sin(vp.ang) * vp.len * 0.8, vp.len, vp.y + Math.sin(vp.ang) * vp.len);
    ctx.stroke();

    // Left side vein
    ctx.beginPath();
    ctx.moveTo(0, vp.y + 4);
    ctx.quadraticCurveTo(-vp.len * 0.6, vp.y + Math.sin(vp.ang) * vp.len * 0.8 + 4, -vp.len, vp.y + Math.sin(vp.ang) * vp.len + 4);
    ctx.stroke();
  });
  ctx.restore();
}

function drawLeafTexture(ctx, isYellow) {
  // Micro-cellular gradient overlay
  const grad = ctx.createLinearGradient(-100, 0, 100, 0);
  grad.addColorStop(0, 'rgba(0,0,0,0.18)');
  grad.addColorStop(0.5, isYellow ? 'rgba(255,255,200,0.12)' : 'rgba(200,255,180,0.12)');
  grad.addColorStop(1, 'rgba(0,0,0,0.18)');
  ctx.fillStyle = grad;
  ctx.fillRect(-150, -180, 300, 320);
}

function drawHealthyHighlights(ctx) {
  // Rich velvety gloss
  const gloss = ctx.createRadialGradient(-30, -50, 10, -30, -50, 120);
  gloss.addColorStop(0, 'rgba(170, 245, 140, 0.25)');
  gloss.addColorStop(1, 'rgba(170, 245, 140, 0)');
  ctx.fillStyle = gloss;
  ctx.fillRect(-120, -150, 240, 260);
}

// 1. Early Blight: Distinct Bullseye Concentric Rings + Yellow Chlorotic Halo
function drawEarlyBlight(ctx) {
  const spots = [
    { x: 38, y: -25, r: 34 },
    { x: -42, y: 35, r: 28 },
    { x: 25, y: 65, r: 22 },
    { x: -30, y: -80, r: 18 }
  ];

  spots.forEach(sp => {
    // 1. Broad yellow chlorotic halo
    const halo = ctx.createRadialGradient(sp.x, sp.y, sp.r * 0.4, sp.x, sp.y, sp.r * 1.55);
    halo.addColorStop(0, 'rgba(235, 195, 30, 0.95)');
    halo.addColorStop(0.5, 'rgba(215, 175, 20, 0.7)');
    halo.addColorStop(1, 'rgba(200, 160, 20, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(sp.x, sp.y, sp.r * 1.55, 0, Math.PI * 2);
    ctx.fill();

    // 2. Brown necrotic tissue
    const nec = ctx.createRadialGradient(sp.x, sp.y, 2, sp.x, sp.y, sp.r);
    nec.addColorStop(0, '#2c190d');
    nec.addColorStop(0.8, '#4a2c14');
    nec.addColorStop(1, '#663c19');
    ctx.fillStyle = nec;
    ctx.beginPath();
    ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
    ctx.fill();

    // 3. Concentric target rings (Bullseye effect)
    ctx.lineWidth = 1.8;
    for (let ring = 0.25; ring < 0.95; ring += 0.22) {
      ctx.strokeStyle = ring % 0.4 === 0 ? 'rgba(25, 12, 5, 0.75)' : 'rgba(85, 48, 22, 0.85)';
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r * ring, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
}

// 2. Bacterial Spot: Numerous small angular water-soaked dark lesions
function drawBacterialSpots(ctx) {
  const rnd = [
    [-35, -95], [20, -110], [-55, -45], [45, -50], [-25, -20], [60, -10],
    [-45, 15], [35, 25], [-15, 55], [40, 70], [-38, 85], [10, 95],
    [-10, -70], [15, -40], [-60, 20], [65, 35], [-20, 30], [25, 5]
  ];

  rnd.forEach(([x, y]) => {
    const size = 3 + (Math.abs(x * y) % 6);

    // Yellowish water-soaked edge
    ctx.fillStyle = 'rgba(220, 190, 45, 0.65)';
    ctx.beginPath();
    ctx.arc(x, y, size + 2, 0, Math.PI * 2);
    ctx.fill();

    // Dark brown/black angular spot
    ctx.fillStyle = '#1c120a';
    ctx.beginPath();
    ctx.moveTo(x - size, y - size/2);
    ctx.lineTo(x + size/2, y - size);
    ctx.lineTo(x + size, y + size/3);
    ctx.lineTo(x - size/3, y + size);
    ctx.closePath();
    ctx.fill();
  });
}

// 3. Late Blight: Large irregular dark water-soaked patches with grayish-white spores
function drawLateBlight(ctx) {
  // Big greasy grayish-brown lesions
  const patches = [
    { x: -40, y: -40, rx: 65, ry: 45, ang: 0.3 },
    { x: 35, y: 40, rx: 55, ry: 50, ang: -0.2 }
  ];

  patches.forEach(p => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.ang);

    const blotch = ctx.createRadialGradient(0, 0, 10, 0, 0, p.rx);
    blotch.addColorStop(0, '#1c221b');
    blotch.addColorStop(0.6, '#313c2c');
    blotch.addColorStop(0.85, '#566649');
    blotch.addColorStop(1, 'rgba(86, 102, 73, 0)');

    ctx.fillStyle = blotch;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.rx, p.ry, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cottony white/gray sporulation rim
    ctx.strokeStyle = 'rgba(235, 245, 235, 0.45)';
    ctx.lineWidth = 3;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.ellipse(0, 0, p.rx * 0.9, p.ry * 0.9, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  });
}

// 4. Leaf Mold: Olive chlorotic yellow spots with velvety mold
function drawLeafMold(ctx) {
  const patches = [
    { x: 30, y: -60, r: 35 },
    { x: -35, y: -10, r: 40 },
    { x: 25, y: 35, r: 32 }
  ];

  patches.forEach(p => {
    const mold = ctx.createRadialGradient(p.x, p.y, 5, p.x, p.y, p.r);
    mold.addColorStop(0, '#4a5423');
    mold.addColorStop(0.4, '#768531');
    mold.addColorStop(0.8, '#b3c44b');
    mold.addColorStop(1, 'rgba(179, 196, 75, 0)');
    ctx.fillStyle = mold;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

// 5. Septoria Leaf Spot: Small circular lesions with whitish-gray center & black dots
function drawSeptoriaSpots(ctx) {
  const spots = [
    [-45, -80], [30, -90], [-10, -50], [55, -40], [-60, -10],
    [15, -15], [-25, 20], [45, 15], [-50, 60], [25, 65], [-15, 90]
  ];

  spots.forEach(([x, y]) => {
    // Yellow halo
    ctx.fillStyle = 'rgba(230, 210, 60, 0.7)';
    ctx.beginPath();
    ctx.arc(x, y, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Dark ring
    ctx.fillStyle = '#2d180d';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();

    // Ash-gray center
    ctx.fillStyle = '#d5cebe';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();

    // Central black pepper pycnidia
    ctx.fillStyle = '#080808';
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2);
    ctx.fill();
  });
}

// 6. Spider Mites: Fine yellow stippling & fine white micro-webbing
function drawSpiderMiteDamage(ctx) {
  // Bronze / golden yellow discoloration
  const bronzing = ctx.createRadialGradient(0, 0, 20, 0, 0, 130);
  bronzing.addColorStop(0, 'rgba(215, 175, 50, 0.6)');
  bronzing.addColorStop(1, 'rgba(180, 135, 30, 0)');
  ctx.fillStyle = bronzing;
  ctx.fillRect(-120, -150, 240, 260);

  // High density stippling
  ctx.fillStyle = '#fffaaf';
  for (let i = 0; i < 220; i++) {
    const rx = (Math.sin(i * 12.3) * 85);
    const ry = (Math.cos(i * 7.1) * 110);
    ctx.fillRect(rx, ry, 1.8, 1.8);
  }

  // Silken web threads
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(-40 + i * 15, -60);
    ctx.bezierCurveTo(-10, -20 + i * 10, 30, 10 + i * 15, 50, 50);
    ctx.stroke();
  }
}

// 7. Target Spot: Circular brown lesions with target rings & dark center
function drawTargetSpots(ctx) {
  const spots = [
    { x: -35, y: -65, r: 16 },
    { x: 30, y: -40, r: 20 },
    { x: -45, y: 15, r: 18 },
    { x: 40, y: 35, r: 22 },
    { x: -15, y: 60, r: 14 }
  ];

  spots.forEach(sp => {
    const grad = ctx.createRadialGradient(sp.x, sp.y, 2, sp.x, sp.y, sp.r);
    grad.addColorStop(0, '#1a100a');
    grad.addColorStop(0.5, '#4e301d');
    grad.addColorStop(0.9, '#825537');
    grad.addColorStop(1, 'rgba(130, 85, 55, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(30, 15, 5, 0.7)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(sp.x, sp.y, sp.r * 0.55, 0, Math.PI * 2);
    ctx.stroke();
  });
}

// 8. Tomato Mosaic Virus: Mottling of alternating lime and dark green
function drawMosaicVirus(ctx) {
  ctx.save();
  const mottledPatches = [
    { x: -30, y: -70, r: 35, c: '#7eb644' },
    { x: 25, y: -50, r: 40, c: '#23441a' },
    { x: -40, y: -10, r: 38, c: '#89cb43' },
    { x: 35, y: 15, r: 45, c: '#1d3e18' },
    { x: -20, y: 55, r: 35, c: '#7eb644' },
    { x: 30, y: 70, r: 30, c: '#25491e' }
  ];

  mottledPatches.forEach(p => {
    const mg = ctx.createRadialGradient(p.x, p.y, 5, p.x, p.y, p.r);
    mg.addColorStop(0, p.c);
    mg.addColorStop(1, 'transparent');
    ctx.fillStyle = mg;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

// 9. Yellow Leaf Curl: Extreme yellow chlorosis
function drawYellowLeafCurlDetails(ctx) {
  // Vibrant yellow chlorosis filling
  const yellowField = ctx.createLinearGradient(0, -170, 0, 130);
  yellowField.addColorStop(0, 'rgba(240, 245, 90, 0.7)');
  yellowField.addColorStop(0.5, 'rgba(220, 235, 60, 0.5)');
  yellowField.addColorStop(1, 'rgba(190, 210, 45, 0.6)');
  ctx.fillStyle = yellowField;
  ctx.fillRect(-120, -170, 240, 310);
}

function drawCurledLeafEdges(ctx) {
  // Curled outer rim shadow effect
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 200, 0.55)';
  ctx.lineWidth = 4;
  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowBlur = 6;
  ctx.stroke();
  ctx.restore();
}
