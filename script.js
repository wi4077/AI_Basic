// Navigation
const pages = {
  home: document.getElementById('home-page'),
  regression: document.getElementById('sim-regression-page'),
  knn: document.getElementById('sim-knn-page'),
  dt: document.getElementById('sim-dt-page'),
  svm: document.getElementById('sim-svm-page')
};

function goHome() {
  Object.values(pages).forEach(p => p.classList.add('hidden'));
  pages.home.classList.remove('hidden');
}

function openSim(type) {
  Object.values(pages).forEach(p => p.classList.add('hidden'));
  pages[type].classList.remove('hidden');

  if (type === 'regression') initRegCanvas();
  else if (type === 'knn') initKnnCanvas();
  else if (type === 'dt') initDtCanvas();
  else if (type === 'svm') initSvmCanvas();
}

// Modal Controls
const mathModal = document.getElementById('mathModal');
const modalTitle = document.getElementById('modal-title');
const modalBodyText = document.getElementById('modal-body-text');

const mathInfo = {
  regression: {
    title: "선형 회귀 & 최소제곱법 수식",
    body: `
      <p>선형 회귀는 데이터의 경향성을 나타내는 직선 <b>y = wx + b</b>를 찾는 알고리즘입니다.</p>
      <div class="math-formula">Cost(w, b) = Σ (y_i - (w * x_i + b))^2</div>
      <p>실제 값과 모델 예측값 간 차이(오차)의 제곱합(MSE)을 최소화하는 기울기 <b>w</b>와 절편 <b>b</b>를 구합니다. 이상치는 제곱 오차 값을 크게 만드므로 회귀선을 크게 왜곡시킵니다.</p>
    `
  },
  knn: {
    title: "K-NN 유클리드 거리 및 다수결 원리",
    body: `
      <p>새로운 데이터 점과 기존 샘플 데이터 점들 사이의 2차원 유클리드 거리를 측정합니다.</p>
      <div class="math-formula">Distance = √((x_2 - x_1)² + (y_2 - y_1)²)</div>
      <p>가장 가까운 거리 상위 K개 점의 클래스 중 <b>다수결(Majority Voting)</b>로 새로운 데이터의 분류를 최종 확정합니다.</p>
    `
  },
  dt: {
    title: "결정 트리 & 지니 불순도 (Gini Impurity)",
    body: `
      <p>결정 트리는 데이터 집단이 얼마나 섞여 있는지를 측정하는 <b>지니 불순도</b>를 최소화하도록 영역을 분할합니다.</p>
      <div class="math-formula">Gini = 1 - Σ (p_i)²</div>
      <p>한 영역 안에 단 하나의 클래스만 모여 완벽히 순수해지면 Gini 값은 0이 됩니다.</p>
    `
  },
  svm: {
    title: "SVM 마진(Margin) 및 하이퍼플레인",
    body: `
      <p>SVM은 두 클래스 간의 최단 거리를 나타내는 **마진(Margin)**을 최대화하는 경계선을 찾습니다.</p>
      <div class="math-formula">Hyperplane: wᵀx + b = 0 <br> Margin Width = 2 / ||w||</div>
      <p>경계 영역 경선 상에 딱 걸쳐서 결정 경계의 위치를 결정하는 데이터 점들을 <b>서포트 벡터(Support Vector)</b>라고 부릅니다.</p>
    `
  }
};

function showMathModal(type) {
  modalTitle.innerText = mathInfo[type].title;
  modalBodyText.innerHTML = mathInfo[type].body;
  mathModal.classList.remove('hidden');
}

function closeMathModal() {
  mathModal.classList.add('hidden');
}

mathModal.addEventListener('click', (e) => {
  if (e.target === mathModal) closeMathModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !mathModal.classList.contains('hidden')) closeMathModal();
});

// Canvas Utility Helpers
function getPos(c, e) {
  const rect = c.getBoundingClientRect();
  const cx = e.touches ? e.touches[0].clientX : e.clientX;
  const cy = e.touches ? e.touches[0].clientY : e.clientY;
  return { x: cx - rect.left, y: cy - rect.top };
}

function preventTouchScroll(canvas) {
  canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
  canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
}


/* ========================================================
   1. REGRESSION SIMULATOR
   ======================================================== */
const regCanvas = document.getElementById('regCanvas');
const regCtx = regCanvas.getContext('2d');
preventTouchScroll(regCanvas);

const regTypeSelect = document.getElementById('reg-type-select');
const regTypeDisplay = document.getElementById('reg-type-display');
const regCountSlider = document.getElementById('reg-count-slider');
const regCountDisplay = document.getElementById('reg-count-display');
const regWeightSlider = document.getElementById('reg-weight-slider');
const regWeightDisplay = document.getElementById('reg-weight-display');

let regW, regH, normalPts = [];
let regOutlier = { x: 0, y: 0, isPinned: false };
let baseSlope = 0, baseIntercept = 0, isDragReg = false;

function resizeRegCanvas() {
  const rect = regCanvas.parentElement.getBoundingClientRect();
  regCanvas.width = rect.width; regCanvas.height = 350;
  regW = regCanvas.width; regH = regCanvas.height;
}

function resetRegSim() {
  regWeightSlider.value = 1;
  regWeightDisplay.innerText = "1.0 배";
  regOutlier = { x: Math.round(regW * 0.75), y: 50, isPinned: false };
  generateRegData();
  drawReg();
}

function generateRegData() {
  normalPts = [];
  const count = parseInt(regCountSlider.value);
  const dataType = regTypeSelect.value;
  const span = regW - 160;

  for (let i = 0; i < count; i++) {
    let x, y;
    if (dataType === 'correlated') {
      let r = i / Math.max(1, count - 1);
      x = 80 + r * span;
      let basey = (regH - 80) - (x * 0.4);
      let noise = (Math.random() - 0.5) * 35;
      y = basey + noise;
    } else {
      x = 80 + Math.random() * span;
      y = 50 + Math.random() * (regH - 100);
    }
    normalPts.push({ x, y });
  }

  let sX = 0, sY = 0, sXY = 0, sXX = 0;
  normalPts.forEach(p => { sX += p.x; sY += p.y; sXY += p.x * p.y; sXX += p.x * p.x; });
  const n = normalPts.length;
  const mX = sX / n, mY = sY / n;
  baseSlope = (sXY - n * mX * mY) / (sXX - n * mX * mX);
  baseIntercept = mY - baseSlope * mX;
}

function drawReg() {
  regCtx.clearRect(0, 0, regW, regH);
  const weight = parseFloat(regWeightSlider.value);

  let totalW = normalPts.length + weight;
  let sX = 0, sY = 0, sXY = 0, sXX = 0;
  normalPts.forEach(p => { sX += p.x; sY += p.y; sXY += p.x * p.y; sXX += p.x * p.x; });
  sX += regOutlier.x * weight; sY += regOutlier.y * weight;
  sXY += regOutlier.x * regOutlier.y * weight; sXX += regOutlier.x * regOutlier.x * weight;

  const mX = sX / totalW, mY = sY / totalW;
  const den = sXX - totalW * mX * mX;
  const slope = den !== 0 ? (sXY - totalW * mX * mY) / den : 0;
  const intercept = mY - slope * mX;

  // Base Line
  regCtx.beginPath(); regCtx.strokeStyle = '#cbd5e1'; regCtx.lineWidth = 2; regCtx.setLineDash([5, 5]);
  regCtx.moveTo(0, baseIntercept); regCtx.lineTo(regW, baseSlope * regW + baseIntercept); regCtx.stroke(); regCtx.setLineDash([]);

  // Regression Line
  regCtx.beginPath(); regCtx.strokeStyle = '#2563eb'; regCtx.lineWidth = 3.5;
  regCtx.moveTo(0, intercept); regCtx.lineTo(regW, slope * regW + intercept); regCtx.stroke();

  // Normal Points
  normalPts.forEach(p => {
    regCtx.beginPath(); regCtx.arc(p.x, p.y, 5, 0, Math.PI * 2); regCtx.fillStyle = '#64748b'; regCtx.fill();
  });

  // Outlier Point Visuals
  const r = 10 + (weight - 1) * 1.2;
  regCtx.beginPath(); regCtx.arc(regOutlier.x, regOutlier.y, r, 0, Math.PI * 2);
  regCtx.fillStyle = '#ef4444'; regCtx.shadowColor = 'rgba(239, 68, 68, 0.5)'; regCtx.shadowBlur = 10; regCtx.fill(); regCtx.shadowBlur = 0;
  regCtx.strokeStyle = '#ffffff'; regCtx.lineWidth = 2; regCtx.stroke();

  regCtx.fillStyle = '#dc2626'; regCtx.font = 'bold 12px sans-serif';
  regCtx.fillText(`이상치 (드래그 가능)`, regOutlier.x - 45, regOutlier.y - r - 6);

  // HUD Metrics
  const diff = Math.abs((-slope) - (-baseSlope));
  const percent = Math.round((diff / Math.abs(-baseSlope || 0.001)) * 100);
  document.getElementById('reg-eq-val').innerText = `y = ${(-slope).toFixed(2)}x + ${(regH - intercept).toFixed(0)}`;
  document.getElementById('reg-slope-val').innerText = `${percent}%`;
  const st = document.getElementById('reg-status-val');
  if (percent > 100) {
    st.innerText = '🚨 회귀선 완전 붕괴!'; st.style.color = '#ef4444';
  } else if (percent > 35) {
    st.innerText = '⚠️ 강하게 편향됨'; st.style.color = '#f59e0b';
  } else {
    st.innerText = '안정적'; st.style.color = '#34d399';
  }
}

function initRegCanvas() {
  resizeRegCanvas(); generateRegData(); resetRegSim();
}

regTypeSelect.onchange = (e) => {
  regTypeDisplay.innerText = e.target.value === 'correlated' ? '선형 경향' : '무작위';
  generateRegData(); drawReg();
};
regCountSlider.oninput = (e) => { regCountDisplay.innerText = `${e.target.value} 개`; generateRegData(); drawReg(); };
regWeightSlider.oninput = (e) => { regWeightDisplay.innerText = `${parseFloat(e.target.value).toFixed(1)} 배`; drawReg(); };

regCanvas.onmousedown = regCanvas.ontouchstart = (e) => {
  const p = getPos(regCanvas, e);
  if (Math.hypot(regOutlier.x - p.x, regOutlier.y - p.y) < 30) isDragReg = true;
};
regCanvas.onmousemove = regCanvas.ontouchmove = (e) => {
  if (!isDragReg) return;
  const p = getPos(regCanvas, e);
  regOutlier.x = Math.max(15, Math.min(regW - 15, p.x));
  regOutlier.y = Math.max(15, Math.min(regH - 15, p.y));
  drawReg();
};


/* ========================================================
   2. K-NN SIMULATOR
   ======================================================== */
const knnCanvas = document.getElementById('knnCanvas');
const knnCtx = knnCanvas.getContext('2d');
preventTouchScroll(knnCanvas);

const knnKSlider = document.getElementById('knn-k-slider');
const knnGroupsSlider = document.getElementById('knn-groups-slider');
const knnCountSlider = document.getElementById('knn-count-slider');

const groupColors = [
  { name: '파란색', main: '#2563eb', bg: 'rgba(37, 99, 235, 0.12)' },
  { name: '빨간색', main: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)' },
  { name: '초록색', main: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
  { name: '주황색', main: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' }
];

let knnW, knnH, knnData = [], knnTarget = { x: 0, y: 0 }, isDragKnn = false;

function resizeKnnCanvas() {
  const rect = knnCanvas.parentElement.getBoundingClientRect();
  knnCanvas.width = rect.width; knnCanvas.height = 350;
  knnW = knnCanvas.width; knnH = knnCanvas.height;
}

function resetKnnSim() {
  knnKSlider.value = 3;
  document.getElementById('knn-k-display').innerText = "K = 3";
  generateKnnData();
  drawKnn();
}

function generateKnnData() {
  knnData = [];
  const numGroups = parseInt(knnGroupsSlider.value);
  const countPerGroup = parseInt(knnCountSlider.value);

  const centers = [
    { x: knnW * 0.25, y: knnH * 0.7 },
    { x: knnW * 0.75, y: knnH * 0.3 },
    { x: knnW * 0.25, y: knnH * 0.3 },
    { x: knnW * 0.75, y: knnH * 0.7 }
  ];

  for (let g = 0; g < numGroups; g++) {
    const center = centers[g];
    for (let i = 0; i < countPerGroup; i++) {
      knnData.push({
        x: center.x + (Math.random() - 0.5) * 160,
        y: center.y + (Math.random() - 0.5) * 140,
        group: g
      });
    }
  }
  knnTarget = { x: knnW / 2, y: knnH / 2 };
}

function drawKnn() {
  knnCtx.clearRect(0, 0, knnW, knnH);
  const k = parseInt(knnKSlider.value);

  // Decision Boundary Heatmap
  const step = 20;
  for (let x = 0; x < knnW; x += step) {
    for (let y = 0; y < knnH; y += step) {
      let cx = x + step / 2, cy = y + step / 2;
      let dists = knnData.map(p => ({ g: p.group, d: Math.hypot(p.x - cx, p.y - cy) }));
      dists.sort((a, b) => a.d - b.d);

      let votes = {};
      for (let i = 0; i < k && i < dists.length; i++) votes[dists[i].g] = (votes[dists[i].g] || 0) + 1;
      let winner = 0, maxV = -1;
      Object.keys(votes).forEach(g => { if (votes[g] > maxV) { maxV = votes[g]; winner = g; } });

      knnCtx.fillStyle = groupColors[winner].bg;
      knnCtx.fillRect(x, y, step, step);
    }
  }

  // Distances
  knnData.forEach(p => p.dist = Math.hypot(p.x - knnTarget.x, p.y - knnTarget.y));
  const sorted = [...knnData].sort((a, b) => a.dist - b.dist);
  const neighbors = sorted.slice(0, k);

  neighbors.forEach(n => {
    knnCtx.beginPath(); knnCtx.strokeStyle = '#8b5cf6'; knnCtx.lineWidth = 2; knnCtx.setLineDash([4, 4]);
    knnCtx.moveTo(knnTarget.x, knnTarget.y); knnCtx.lineTo(n.x, n.y); knnCtx.stroke(); knnCtx.setLineDash([]);
  });

  // Data Points
  knnData.forEach(p => {
    knnCtx.beginPath(); knnCtx.arc(p.x, p.y, 6.5, 0, Math.PI * 2);
    knnCtx.fillStyle = groupColors[p.group].main; knnCtx.fill();
    knnCtx.strokeStyle = '#ffffff'; knnCtx.lineWidth = 1.5; knnCtx.stroke();
  });

  // Target Point
  const targetVotes = {};
  neighbors.forEach(n => targetVotes[n.group] = (targetVotes[n.group] || 0) + 1);
  let targetWinner = 0, maxV = -1;
  Object.keys(targetVotes).forEach(g => {
    if (targetVotes[g] > maxV) { maxV = targetVotes[g]; targetWinner = g; }
  });

  knnCtx.beginPath(); knnCtx.arc(knnTarget.x, knnTarget.y, 10, 0, Math.PI * 2);
  knnCtx.fillStyle = '#8b5cf6'; knnCtx.fill();
  knnCtx.strokeStyle = '#ffffff'; knnCtx.lineWidth = 3; knnCtx.stroke();

  const winnerInfo = groupColors[targetWinner];
  document.getElementById('knn-hud-k').innerText = `K=${k} / ${knnGroupsSlider.value}개 그룹`;
  const res = document.getElementById('knn-hud-result');
  res.innerText = `그룹 ${parseInt(targetWinner) + 1} (${winnerInfo.name}) - ${maxV}/${k} 표`;
  res.style.color = winnerInfo.main;
}

function initKnnCanvas() {
  resizeKnnCanvas(); generateKnnData(); drawKnn();
}

knnKSlider.oninput = (e) => { document.getElementById('knn-k-display').innerText = `K = ${e.target.value}`; drawKnn(); };
knnGroupsSlider.oninput = (e) => { document.getElementById('knn-groups-display').innerText = `${e.target.value} 개`; generateKnnData(); drawKnn(); };
knnCountSlider.oninput = (e) => { document.getElementById('knn-count-display').innerText = `${e.target.value} 개`; generateKnnData(); drawKnn(); };

knnCanvas.onmousedown = knnCanvas.ontouchstart = (e) => {
  const p = getPos(knnCanvas, e);
  if (Math.hypot(knnTarget.x - p.x, knnTarget.y - p.y) < 25) isDragKnn = true;
};
knnCanvas.onmousemove = knnCanvas.ontouchmove = (e) => {
  if (!isDragKnn) return;
  const p = getPos(knnCanvas, e);
  knnTarget.x = Math.max(10, Math.min(knnW - 10, p.x));
  knnTarget.y = Math.max(10, Math.min(knnH - 10, p.y));
  drawKnn();
};


/* ==========================================================
   3. DECISION TREE SIMULATOR
   ========================================================== */
const dtCanvas = document.getElementById('dtCanvas');
const dtCtx = dtCanvas.getContext('2d');
preventTouchScroll(dtCanvas);

const dtDepthSlider = document.getElementById('dt-depth-slider');
let dtW, dtH, dtPoints = [];

function resizeDtCanvas() {
  const rect = dtCanvas.parentElement.getBoundingClientRect();
  dtCanvas.width = rect.width; dtCanvas.height = 350;
  dtW = dtCanvas.width; dtH = dtCanvas.height;
}

function resetDtSim() {
  dtDepthSlider.value = 2;
  document.getElementById('dt-depth-display').innerText = "Depth = 2";
  generateDtData();
}

function generateDtData() {
  dtPoints = [];
  for (let i = 0; i < 40; i++) {
    let x = Math.random() * dtW;
    let y = Math.random() * dtH;
    let group = (x > dtW * 0.5 && y < dtH * 0.6) || (x < dtW * 0.35 && y > dtH * 0.5) ? 1 : 0;
    dtPoints.push({ x, y, group });
  }
  drawDt();
}

function calcGini(pts) {
  if (pts.length === 0) return 0;
  let g0 = pts.filter(p => p.group === 0).length / pts.length;
  let g1 = 1 - g0;
  return 1 - (g0 * g0 + g1 * g1);
}

function findBestXSplit(pts) {
  if (pts.length < 2) return dtW / 2;
  let sorted = [...pts].sort((a, b) => a.x - b.x);
  let bestX = dtW / 2, minImpurity = 1;

  for (let i = 0; i < sorted.length - 1; i++) {
    let xCut = (sorted[i].x + sorted[i + 1].x) / 2;
    let left = sorted.filter(p => p.x <= xCut);
    let right = sorted.filter(p => p.x > xCut);
    let impurity = (left.length / pts.length) * calcGini(left) + (right.length / pts.length) * calcGini(right);
    if (impurity < minImpurity) { minImpurity = impurity; bestX = xCut; }
  }
  return bestX;
}

function findBestYSplit(pts) {
  if (pts.length < 2) return dtH / 2;
  let sorted = [...pts].sort((a, b) => a.y - b.y);
  let bestY = dtH / 2, minImpurity = 1;

  for (let i = 0; i < sorted.length - 1; i++) {
    let yCut = (sorted[i].y + sorted[i + 1].y) / 2;
    let top = sorted.filter(p => p.y <= yCut);
    let bottom = sorted.filter(p => p.y > yCut);
    let impurity = (top.length / pts.length) * calcGini(top) + (bottom.length / pts.length) * calcGini(bottom);
    if (impurity < minImpurity) { minImpurity = impurity; bestY = yCut; }
  }
  return bestY;
}

function drawDt() {
  dtCtx.clearRect(0, 0, dtW, dtH);
  const depth = parseInt(dtDepthSlider.value);
  const treeDisplay = document.getElementById('tree-nodes-display');
  treeDisplay.innerHTML = '';

  if (depth >= 1) {
    const splitX1 = findBestXSplit(dtPoints);
    dtCtx.strokeStyle = '#7c3aed'; dtCtx.lineWidth = 3;
    dtCtx.beginPath(); dtCtx.moveTo(splitX1, 0); dtCtx.lineTo(splitX1, dtH); dtCtx.stroke();
    treeDisplay.innerHTML += `<div class="tree-node-badge">Root: [X > ${Math.round(splitX1)}?]</div>`;

    if (depth >= 2) {
      const leftPts = dtPoints.filter(p => p.x <= splitX1);
      const rightPts = dtPoints.filter(p => p.x > splitX1);
      const splitYLeft = findBestYSplit(leftPts);
      const splitYRight = findBestYSplit(rightPts);

      dtCtx.strokeStyle = '#a855f7'; dtCtx.lineWidth = 2; dtCtx.setLineDash([6, 6]);
      dtCtx.beginPath(); dtCtx.moveTo(0, splitYLeft); dtCtx.lineTo(splitX1, splitYLeft); dtCtx.stroke();
      dtCtx.beginPath(); dtCtx.moveTo(splitX1, splitYRight); dtCtx.lineTo(dtW, splitYRight); dtCtx.stroke();
      dtCtx.setLineDash([]);

      treeDisplay.innerHTML += `<div class="tree-node-badge" style="background:#9333ea;">L1: [Y > ${Math.round(splitYLeft)}?]</div>`;
      treeDisplay.innerHTML += `<div class="tree-node-badge" style="background:#9333ea;">R1: [Y > ${Math.round(splitYRight)}?]</div>`;

      if (depth >= 3) {
        const leftBottomPts = leftPts.filter(p => p.y > splitYLeft);
        const splitXSub = findBestXSplit(leftBottomPts);
        dtCtx.strokeStyle = '#c084fc'; dtCtx.lineWidth = 2; dtCtx.setLineDash([3, 3]);
        dtCtx.beginPath(); dtCtx.moveTo(splitXSub, splitYLeft); dtCtx.lineTo(splitXSub, dtH); dtCtx.stroke();
        dtCtx.setLineDash([]);
        treeDisplay.innerHTML += `<div class="tree-node-badge" style="background:#c084fc;">L2: [X > ${Math.round(splitXSub)}?]</div>`;
      }
    }
  }

  dtPoints.forEach(p => {
    dtCtx.beginPath(); dtCtx.arc(p.x, p.y, 6.5, 0, Math.PI * 2);
    dtCtx.fillStyle = p.group === 1 ? '#ef4444' : '#2563eb'; dtCtx.fill();
    dtCtx.strokeStyle = '#ffffff'; dtCtx.lineWidth = 1.5; dtCtx.stroke();
  });

  const splits = depth === 1 ? 1 : depth === 2 ? 3 : 4;
  document.getElementById('dt-hud-splits').innerText = `${splits} 개의 경계 질문`;
  const st = document.getElementById('dt-hud-status');
  if (depth === 1) { st.innerText = '과소적합 (Simple)'; st.style.color = '#f59e0b'; }
  else if (depth === 2) { st.innerText = '적정 분할 (Balanced)'; st.style.color = '#34d399'; }
  else { st.innerText = '과대적합 위험 (Complex)'; st.style.color = '#ef4444'; }
}

function initDtCanvas() {
  resizeDtCanvas(); generateDtData();
}
dtDepthSlider.oninput = (e) => {
  document.getElementById('dt-depth-display').innerText = `Depth = ${e.target.value}`;
  drawDt();
};


/* ==========================================================
   4. SUPPORT VECTOR MACHINE (SVM)
   ========================================================== */
const svmCanvas = document.getElementById('svmCanvas');
const svmCtx = svmCanvas.getContext('2d');
preventTouchScroll(svmCanvas);

const svmMarginSlider = document.getElementById('svm-margin-slider');
const svmAngleSlider = document.getElementById('svm-angle-slider');

let svmW, svmH, svmPoints = [], dragSvmIdx = -1;

function resizeSvmCanvas() {
  const rect = svmCanvas.parentElement.getBoundingClientRect();
  svmCanvas.width = rect.width; svmCanvas.height = 350;
  svmW = svmCanvas.width; svmH = svmCanvas.height;
}

function resetSvmSim() {
  svmMarginSlider.value = 40;
  svmAngleSlider.value = -0.5;
  document.getElementById('svm-margin-display').innerText = "40px";
  document.getElementById('svm-angle-display').innerText = "-0.5";
  initSvmData();
  drawSvm();
}

function initSvmData() {
  svmPoints = [
    { x: svmW * 0.2, y: svmH * 0.3, group: 1 },
    { x: svmW * 0.35, y: svmH * 0.2, group: 1 },
    { x: svmW * 0.25, y: svmH * 0.6, group: 1 },
    { x: svmW * 0.4, y: svmH * 0.45, group: 1 },
    { x: svmW * 0.65, y: svmH * 0.75, group: -1 },
    { x: svmW * 0.75, y: svmH * 0.5, group: -1 },
    { x: svmW * 0.8, y: svmH * 0.8, group: -1 },
    { x: svmW * 0.6, y: svmH * 0.9, group: -1 }
  ];
}

function drawSvm() {
  svmCtx.clearRect(0, 0, svmW, svmH);

  const margin = parseFloat(svmMarginSlider.value);
  const slope = parseFloat(svmAngleSlider.value);
  const cx = svmW / 2, cy = svmH / 2;

  const normLen = Math.hypot(1, slope);
  const nx = -slope / normLen;
  const ny = 1 / normLen;

  // Hyperplane
  svmCtx.beginPath(); svmCtx.strokeStyle = '#f59e0b'; svmCtx.lineWidth = 3;
  svmCtx.moveTo(0, cy + slope * (0 - cx));
  svmCtx.lineTo(svmW, cy + slope * (svmW - cx));
  svmCtx.stroke();

  // Margins
  svmCtx.strokeStyle = '#fbbf24'; svmCtx.lineWidth = 1.5; svmCtx.setLineDash([5, 5]);
  svmCtx.beginPath();
  svmCtx.moveTo(nx * margin, cy + slope * (0 - cx) + ny * margin);
  svmCtx.lineTo(svmW + nx * margin, cy + slope * (svmW - cx) + ny * margin);
  svmCtx.stroke();

  svmCtx.beginPath();
  svmCtx.moveTo(-nx * margin, cy + slope * (0 - cx) - ny * margin);
  svmCtx.lineTo(svmW - nx * margin, cy + slope * (svmW - cx) - ny * margin);
  svmCtx.stroke();
  svmCtx.setLineDash([]);

  let svCount = 0, errors = 0;

  svmPoints.forEach((p) => {
    const dist = (slope * p.x - p.y + (cy - slope * cx)) / normLen;
    const distAbs = Math.abs(dist);

    const isSV = distAbs <= margin + 8;
    if (isSV) svCount++;

    if ((p.group === 1 && dist < 0) || (p.group === -1 && dist > 0)) {
      errors++;
    }

    svmCtx.beginPath(); svmCtx.arc(p.x, p.y, isSV ? 9.5 : 6.5, 0, Math.PI * 2);
    svmCtx.fillStyle = p.group === 1 ? '#2563eb' : '#ef4444'; svmCtx.fill();

    if (isSV) {
      svmCtx.strokeStyle = '#f59e0b'; svmCtx.lineWidth = 3.5; svmCtx.stroke();
    } else {
      svmCtx.strokeStyle = '#ffffff'; svmCtx.lineWidth = 1.5; svmCtx.stroke();
    }
  });

  document.getElementById('svm-hud-sv').innerText = `${svCount} 개`;
  const errHud = document.getElementById('svm-hud-errors');
  errHud.innerText = `${errors} 개`;
  errHud.style.color = errors > 0 ? '#ef4444' : '#34d399';
}

function initSvmCanvas() {
  resizeSvmCanvas(); initSvmData(); drawSvm();
}

svmMarginSlider.oninput = (e) => { document.getElementById('svm-margin-display').innerText = `${e.target.value}px`; drawSvm(); };
svmAngleSlider.oninput = (e) => { document.getElementById('svm-angle-display').innerText = `${e.target.value}`; drawSvm(); };

svmCanvas.onmousedown = svmCanvas.ontouchstart = (e) => {
  const p = getPos(svmCanvas, e);
  dragSvmIdx = svmPoints.findIndex(pt => Math.hypot(pt.x - p.x, pt.y - p.y) < 20);
};
svmCanvas.onmousemove = svmCanvas.ontouchmove = (e) => {
  if (dragSvmIdx === -1) return;
  const p = getPos(svmCanvas, e);
  svmPoints[dragSvmIdx].x = Math.max(10, Math.min(svmW - 10, p.x));
  svmPoints[dragSvmIdx].y = Math.max(10, Math.min(svmH - 10, p.y));
  drawSvm();
};

// Global Release Handler
const releaseDrag = () => {
  isDragReg = false;
  isDragKnn = false;
  dragSvmIdx = -1;
};

window.onmouseup = window.ontouchend = window.onpointerup = window.onpointercancel = releaseDrag;

window.onresize = () => {
  if (!pages.regression.classList.contains('hidden')) { resizeRegCanvas(); drawReg(); }
  if (!pages.knn.classList.contains('hidden')) { resizeKnnCanvas(); drawKnn(); }
  if (!pages.dt.classList.contains('hidden')) { resizeDtCanvas(); drawDt(); }
  if (!pages.svm.classList.contains('hidden')) { resizeSvmCanvas(); drawSvm(); }
};
