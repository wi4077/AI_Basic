const algorithms = {
  linear: { title: '선형 회귀', kicker: 'REGRESSION', summary: '연속적인 값을 가장 잘 설명하는 직선을 찾아 예측합니다.', core: '입력값과 목표값의 관계를 y = wx + b 형태의 직선으로 근사합니다. 오차 제곱의 합이 가장 작아지는 기울기와 절편을 찾습니다.', controls: '데이터 개수, 잡음 정도, 데이터 점의 위치를 조절할 수 있습니다.', observe: '점 하나의 위치가 회귀선과 평균제곱오차에 어떤 영향을 주는지 확인하세요.', formula: '공식은 MSE = 1/n Σ(yᵢ - ŷᵢ)²입니다. 가격, 온도, 수요처럼 연속적인 값을 예측할 때 활용합니다.' },
  logistic: { title: '로지스틱 회귀', kicker: 'CLASSIFICATION', summary: '확률을 계산해 두 클래스 중 어디에 속하는지 분류합니다.', core: '선형 결합값을 시그모이드 함수에 넣어 0과 1 사이의 확률로 변환하고 기준 확률에 따라 클래스를 결정합니다.', controls: '기울기, 절편, 분류 기준값을 조절하고 데이터 점을 이동할 수 있습니다.', observe: '결정 경계와 기준값이 바뀌면 분류 결과가 어떻게 달라지는지 확인하세요.', formula: '확률은 σ(z) = 1/(1+e⁻ᶻ)로 계산합니다. 스팸 판별, 합격 여부, 질병 위험처럼 두 결과를 분류하는 데 사용합니다.' },
  knn: { title: 'K-최근접 이웃', kicker: 'CLASSIFICATION', summary: '새로운 점 주변의 가까운 이웃을 보고 다수결로 분류합니다.', core: '새 점과 학습 데이터 사이의 거리를 계산한 뒤 가장 가까운 K개의 클래스 중 다수인 클래스를 선택합니다.', controls: 'K, 그룹 수, 그룹별 샘플 수를 조절하고 보라색 대상 점을 드래그할 수 있습니다.', observe: 'K가 작을 때와 클 때 결정 영역과 분류 결과가 어떻게 달라지는지 비교하세요.', formula: '거리는 d = √Σ(xᵢ-yᵢ)²로 계산합니다. 별도의 학습식 없이 데이터의 지역적 패턴을 이용하는 방식입니다.' },
  kmeans: { title: 'K-평균', kicker: 'CLUSTERING', summary: '정답 라벨 없이 비슷한 데이터끼리 K개의 그룹으로 묶습니다.', core: '각 점을 가장 가까운 중심에 할당하고 각 그룹의 평균 위치로 중심을 이동하는 과정을 반복합니다.', controls: '클러스터 수와 데이터 개수를 조절하고 한 단계씩 학습을 진행할 수 있습니다.', observe: '중심이 이동하고 그룹 색상이 안정되는 과정을 확인하세요.', formula: '목표는 각 점과 소속 중심 사이 거리의 제곱합을 줄이는 것입니다. 고객 유형, 이미지 색상, 문서 주제 분류에 활용합니다.' },
  tree: { title: '의사결정트리', kicker: 'CLASSIFICATION / REGRESSION', summary: '질문을 차례로 던져 데이터를 이해하기 쉬운 영역으로 나눕니다.', core: '특성의 기준값을 질문으로 사용해 데이터를 분할하고, 각 영역의 클래스가 최대한 순수해지도록 다음 질문을 선택합니다.', controls: '트리 깊이와 샘플 구성을 조절하고 지니 불순도 기반 분할선을 확인할 수 있습니다.', observe: '깊이가 커질수록 경계가 복잡해지고 과대적합 위험이 커지는 과정을 비교하세요.', formula: '지니 불순도는 Gini = 1 - Σpᵢ²입니다. 설명 가능한 규칙이 필요하거나 분류와 회귀를 함께 다룰 때 활용합니다.' },
  svm: { title: '서포트 벡터 머신', kicker: 'CLASSIFICATION', summary: '두 클래스 사이의 간격이 가장 넓어지는 경계면을 찾습니다.', core: '결정 경계와 가장 가까운 점인 서포트 벡터를 기준으로 마진을 최대화해 분류합니다.', controls: '마진 폭과 경계선 기울기를 조절하고 데이터 점을 직접 이동할 수 있습니다.', observe: '마진 안에 들어오는 점과 경계를 침범하는 점의 수가 어떻게 변하는지 확인하세요.', formula: '경계는 wᵀx+b=0이고 마진 폭은 2/||w||입니다. 특성이 많은 데이터나 명확한 경계가 있는 분류에 활용합니다.' }
};

const pages = { home: document.querySelector('#home-page'), concept: document.querySelector('#concept-page'), simulator: document.querySelector('#simulator-page') };
let currentAlgorithm = 'linear';
let activeSimulation = null;
const get = id => document.getElementById(id);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function renderCards() {
  const groups = [
    { title: '예측', description: '연속적인 값을 예측하는 알고리즘', keys: ['linear'] },
    { title: '분류', description: '데이터를 기준에 따라 나누는 알고리즘', keys: ['logistic', 'knn', 'tree', 'svm'] },
    { title: '군집화', description: '비슷한 데이터끼리 묶는 알고리즘', keys: ['kmeans'] }
  ];
  let cardNumber = 0;
  get('algorithm-cards').innerHTML = groups.map(group => `<section class="algorithm-group"><div class="group-heading"><div><span class="eyebrow">ALGORITHM GROUP</span><h2>${group.title}</h2></div><p>${group.description}</p></div><div class="algorithm-grid">${group.keys.map(key => { const item = algorithms[key]; cardNumber += 1; return `<article class="algorithm-card algorithm-card--${key}" onclick="showConcept('${key}')"><div><span class="card-number">0${cardNumber} / ${item.kicker}</span><h2>${item.title}</h2><p>${item.summary}</p></div><span class="card-link">개념 카드 보기 -></span></article>`; }).join('')}</div></section>`).join('');
}

function hidePages() { Object.values(pages).forEach(page => page.classList.add('hidden')); }
function stopSimulation() { activeSimulation = null; }
function goHome() { hidePages(); pages.home.classList.remove('hidden'); stopSimulation(); }
function showConcept(type) {
  currentAlgorithm = type;
  const item = algorithms[type];
  get('concept-kicker').textContent = item.kicker;
  get('concept-title').textContent = item.title;
  get('concept-summary').textContent = item.summary;
  get('concept-core').textContent = item.core;
  get('concept-controls').textContent = item.controls;
  get('concept-observe').textContent = item.observe;
  get('concept-formula').textContent = item.formula;
  hidePages(); pages.concept.classList.remove('hidden'); stopSimulation();
}
function openCurrentSimulator() { openSimulator(currentAlgorithm); }
function openSimulator(type, data = '') {
  currentAlgorithm = type;
  const item = algorithms[type];
  get('sim-kicker').textContent = item.kicker;
  get('sim-title').textContent = item.title;
  get('simulator-content').innerHTML = simulatorTemplate(type);
  if (data) get(`${type}-data-input`).value = data;
  hidePages(); pages.simulator.classList.remove('hidden');
  startSimulation(type);
}

function control(label, output, input) { return `<div class="control"><label>${label} <output id="${output}"></output></label><input id="${input}" type="range"></div>`; }
function dataEntry(type, needsLabel) {
  const coordinateMax = type === 'linear' ? 10 : 100;
  const labelHeader = needsLabel ? '<th>그룹</th>' : '';
  const rows = Array.from({ length: 4 }, () => `<tr class="data-row"><td><input data-field="x" type="number" min="0" max="${coordinateMax}" placeholder="x"></td><td><input data-field="y" type="number" min="0" max="${coordinateMax}" placeholder="y"></td>${needsLabel ? '<td><input data-field="label" type="number" placeholder="0/1"></td>' : ''}</tr>`).join('');
  return `<div class="data-entry"><label>직접 데이터 입력 <span>X, Y 입력 범위: 0~${coordinateMax}</span></label><div class="data-table-wrap"><table><thead><tr><th>X</th><th>Y</th>${labelHeader}</tr></thead><tbody id="${type}-data-rows">${rows}</tbody></table></div><div class="data-actions"><button class="action-button" onclick="addDataRow('${type}', ${needsLabel})">행 추가</button><button class="action-button" onclick="applyInput('${type}')">입력 적용</button><button class="action-button" onclick="randomizeData('${type}')">랜덤 데이터</button></div></div>`;
}
function simulatorTemplate(type) {
  const controls = {
    linear: `${control('데이터 개수', 'linear-count-value', 'linear-count')}${control('잡음 정도', 'linear-noise-value', 'linear-noise')}${dataEntry('linear', false)}<div class="prediction-control"><label for="linear-predict">예측할 X</label><input id="linear-predict" type="number" min="0" max="10" step="0.1" value="5"><strong id="linear-prediction">-</strong></div><button class="action-button" onclick="resetLinear()">새 데이터 만들기</button>`,
    logistic: `${control('기울기', 'logistic-slope-value', 'logistic-slope')}${control('절편', 'logistic-bias-value', 'logistic-bias')}${control('분류 기준', 'logistic-threshold-value', 'logistic-threshold')}${dataEntry('logistic', true)}<button class="action-button" onclick="resetLogistic()">데이터 재생성</button>`,
    knn: `${control('K', 'knn-k-value', 'knn-k')}${control('그룹 수', 'knn-groups-value', 'knn-groups')}${control('그룹별 점', 'knn-count-value', 'knn-count')}${dataEntry('knn', true)}<button class="action-button" onclick="resetKnn()">데이터 재생성</button>`,
    kmeans: `${control('클러스터 수 K', 'kmeans-k-value', 'kmeans-k')}${control('데이터 개수', 'kmeans-count-value', 'kmeans-count')}${dataEntry('kmeans', false)}<button class="action-button" onclick="resetKmeans()">초기화</button><button class="primary-button" onclick="stepKmeans()">한 단계 학습</button>`,
    tree: `${control('최대 깊이', 'tree-depth-value', 'tree-depth')}${dataEntry('tree', true)}<button class="action-button" onclick="resetTree()">샘플 재생성</button>`,
    svm: `${control('마진 폭', 'svm-margin-value', 'svm-margin')}${control('경계 기울기', 'svm-angle-value', 'svm-angle')}${dataEntry('svm', true)}<button class="action-button" onclick="resetSvm()">점 초기화</button>`
  }[type];
  const metrics = { linear: ['회귀식|linear-equation', '평균제곱오차|linear-mse', '데이터 상태|linear-status'], logistic: ['결정 경계|logistic-boundary', '분류 정확도|logistic-accuracy', '선택 기준|logistic-result'], knn: ['가장 가까운 이웃|knn-neighbors', '분류 결과|knn-result', '득표|knn-votes'], kmeans: ['반복 단계|kmeans-step', '군집 수|kmeans-result', '상태|kmeans-status'], tree: ['트리 깊이|tree-depth-result', '분할선 수|tree-splits', '평균 지니|tree-gini'], svm: ['서포트 벡터|svm-support', '침범 오류|svm-errors', '마진 폭|svm-result'] }[type];
  const metricHtml = metrics.map(value => { const [label, id] = value.split('|'); return `<div class="metric"><small>${label}</small><strong id="${id}">-</strong></div>`; }).join('');
  return `<div class="simulator-grid"><aside class="control-panel"><h3>실험 조절판</h3>${controls}</aside><section><div class="canvas-wrap"><canvas id="${type}-canvas" aria-label="${algorithms[type].title} 시뮬레이터"></canvas><div class="canvas-note">캔버스의 점을 드래그하며 변화를 관찰하세요.</div></div><div class="metrics">${metricHtml}</div><div id="${type}-learning" class="learning-panel"></div></section></div>`;
}

function setupCanvas(id, height = 430) {
  const canvas = get(id); const rect = canvas.getBoundingClientRect(); const ratio = window.devicePixelRatio || 1;
  canvas.width = rect.width * ratio; canvas.height = height * ratio;
  const ctx = canvas.getContext('2d'); ctx.scale(ratio, ratio);
  return { canvas, ctx, width: rect.width, height };
}
function configureSlider(id, min, max, value, step, output, formatter, callback) {
  const input = get(id); input.min = min; input.max = max; input.step = step; input.value = value;
  const update = () => { get(output).textContent = formatter(input.value); callback(); };
  input.addEventListener('input', update); update();
}
function parseInput(type, width, height, needsLabel) {
  const coordinateMax = type === 'linear' ? 10 : 100;
  const rows = [...document.querySelectorAll(`#${type}-data-rows .data-row`)].map(row => [...row.querySelectorAll('input')].map(input => input.value.trim() === '' ? null : Number(input.value)));
  const filled = rows.filter(values => values.some(value => value !== null));
  if (!filled.length) return null;
  const valid = filled.filter(values => Number.isFinite(values[0]) && Number.isFinite(values[1]) && (!needsLabel || Number.isFinite(values[2])));
  if (valid.length !== filled.length || valid.length < 2) { showToast('X, Y와 필요한 그룹 값을 모두 입력하세요.'); return null; }
  return valid.map(values => ({ x: clamp(values[0], 0, coordinateMax) / coordinateMax * width, y: type === 'linear' ? height - clamp(values[1], 0, coordinateMax) / coordinateMax * height : clamp(values[1], 0, coordinateMax) / coordinateMax * height, ...(needsLabel ? { label: values[2] > 0 ? 1 : 0, group: Math.max(0, Math.round(values[2])) } : {}) }));
}
function addDataRow(type, needsLabel) { const coordinateMax = type === 'linear' ? 10 : 100; const row = document.createElement('tr'); row.className = 'data-row'; row.innerHTML = `<td><input data-field="x" type="number" min="0" max="${coordinateMax}" placeholder="x"></td><td><input data-field="y" type="number" min="0" max="${coordinateMax}" placeholder="y"></td>${needsLabel ? '<td><input data-field="label" type="number" placeholder="0/1"></td>' : ''}`; get(`${type}-data-rows`).appendChild(row); }
function applyInput(type) { const data = parseInput(type, 100, 100, ['logistic', 'knn', 'tree', 'svm'].includes(type)); if (!data) { showToast('입력할 데이터를 먼저 작성하세요.'); return; } startSimulation(type); }
function randomizeData(type) { openSimulator(type); }
function showToast(message) { const toast = get('toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200); }
function drawGrid(ctx, width, height) { ctx.strokeStyle = '#e5e1d8'; ctx.lineWidth = 1; for (let x = 0; x <= width; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); } for (let y = 0; y <= height; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); } }
function eventPoint(canvas, event) { const rect = canvas.getBoundingClientRect(); const source = event.touches ? event.touches[0] : event; return { x: clamp(source.clientX - rect.left, 8, rect.width - 8), y: clamp(source.clientY - rect.top, 8, rect.height - 8) }; }
function draggable(canvas, points, draw, radius = 18) { let index = -1; const start = event => { const point = eventPoint(canvas, event); index = points.findIndex(item => Math.hypot(item.x - point.x, item.y - point.y) < radius); if (index >= 0) event.preventDefault(); }; const move = event => { if (index < 0) return; const point = eventPoint(canvas, event); points[index].x = point.x; points[index].y = point.y; draw(); }; canvas.addEventListener('mousedown', start); canvas.addEventListener('mousemove', move); canvas.addEventListener('touchstart', start, { passive: false }); canvas.addEventListener('touchmove', move, { passive: false }); window.addEventListener('mouseup', () => { index = -1; }); window.addEventListener('touchend', () => { index = -1; }); }
function startSimulation(type) { stopSimulation(); activeSimulation = type; ({ linear: initLinear, logistic: initLogistic, knn: initKnn, kmeans: initKmeans, tree: initTree, svm: initSvm }[type])(); }

function initLinear() {
  const sim = setupCanvas('linear-canvas'); const points = [];
  const drawLinearGrid = () => { drawGrid(sim.ctx, sim.width, sim.height); sim.ctx.fillStyle = '#6b7684'; sim.ctx.font = '12px sans-serif'; for (let index = 0; index <= 10; index++) { const x = index / 10 * sim.width; const y = sim.height - index / 10 * sim.height; sim.ctx.fillText(index, Math.min(x + 4, sim.width - 18), sim.height - 8); sim.ctx.fillText(index, 8, Math.max(y - 4, 14)); } };
  const draw = () => {
    sim.ctx.clearRect(0, 0, sim.width, sim.height); drawLinearGrid();
    const dataPoints = points.map(point => ({ x: point.x / sim.width * 10, y: (sim.height - point.y) / sim.height * 10 }));
    const count = dataPoints.length; const meanX = dataPoints.reduce((sum, point) => sum + point.x, 0) / count; const meanY = dataPoints.reduce((sum, point) => sum + point.y, 0) / count;
    const denominator = dataPoints.reduce((sum, point) => sum + (point.x - meanX) ** 2, 0) || 1;
    const slope = dataPoints.reduce((sum, point) => sum + (point.x - meanX) * (point.y - meanY), 0) / denominator; const intercept = meanY - slope * meanX;
    const screenY = dataY => sim.height - dataY / 10 * sim.height;
    sim.ctx.strokeStyle = '#2563eb'; sim.ctx.lineWidth = 3; sim.ctx.beginPath(); sim.ctx.moveTo(0, screenY(intercept)); sim.ctx.lineTo(sim.width, screenY(slope * 10 + intercept)); sim.ctx.stroke();
    let mse = 0; points.forEach((point, index) => { const dataPoint = dataPoints[index]; const predicted = slope * dataPoint.x + intercept; const predictedY = screenY(predicted); mse += (dataPoint.y - predicted) ** 2; sim.ctx.strokeStyle = '#aeb8c4'; sim.ctx.lineWidth = 1; sim.ctx.setLineDash([4, 4]); sim.ctx.beginPath(); sim.ctx.moveTo(point.x, point.y); sim.ctx.lineTo(point.x, predictedY); sim.ctx.stroke(); sim.ctx.setLineDash([]); sim.ctx.fillStyle = '#17202a'; sim.ctx.beginPath(); sim.ctx.arc(point.x, point.y, 6, 0, Math.PI * 2); sim.ctx.fill(); });
    const predictionX = +get('linear-predict').value; const predictionY = slope * predictionX + intercept; get('linear-prediction').textContent = Number.isFinite(predictionX) ? `예측 Y = ${predictionY.toFixed(2)}` : 'X값을 입력하세요'; get('linear-equation').textContent = `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`; get('linear-mse').textContent = (mse / count).toFixed(2); get('linear-status').textContent = `${count}개 데이터`; get('linear-learning').innerHTML = `<strong>계산 과정</strong><span>기울기 ${slope.toFixed(2)} · 절편 ${intercept.toFixed(2)} · 평균제곱오차 ${ (mse / count).toFixed(2) }</span><span>점선은 각 데이터와 회귀선 사이의 잔차입니다.</span>`;
  };
  const generate = () => { points.length = 0; const entered = parseInput('linear', sim.width, sim.height, false); if (entered) { points.push(...entered); draw(); return; } const count = +get('linear-count').value; const noise = +get('linear-noise').value; for (let index = 0; index < count; index++) points.push({ x: 35 + index / (count - 1) * (sim.width - 70), y: sim.height - 45 - index / (count - 1) * 260 + (Math.random() - .5) * noise }); draw(); };
  get('linear-predict').addEventListener('input', draw); configureSlider('linear-count', 6, 40, 18, 1, 'linear-count-value', value => value, generate); configureSlider('linear-noise', 0, 60, 18, 1, 'linear-noise-value', value => value, generate); draggable(sim.canvas, points, draw); generate();
}

function initLogistic() {
  get('logistic-learning').innerHTML = '<strong>시그모이드와 확률</strong><span id="logistic-learning-text"></span><canvas id="logistic-sigmoid" aria-label="시그모이드 함수 그래프"></canvas>';
  const sim = setupCanvas('logistic-canvas'); const sigmoid = setupCanvas('logistic-sigmoid', 150); const points = [];
  const drawSigmoid = (threshold) => { sigmoid.ctx.clearRect(0, 0, sigmoid.width, sigmoid.height); sigmoid.ctx.strokeStyle = '#e5e1d8'; sigmoid.ctx.beginPath(); sigmoid.ctx.moveTo(28, sigmoid.height - 24); sigmoid.ctx.lineTo(sigmoid.width - 8, sigmoid.height - 24); sigmoid.ctx.moveTo(28, 12); sigmoid.ctx.lineTo(28, sigmoid.height - 24); sigmoid.ctx.stroke(); sigmoid.ctx.strokeStyle = '#ea6048'; sigmoid.ctx.lineWidth = 3; sigmoid.ctx.beginPath(); for (let index = 0; index <= 100; index++) { const z = -6 + index / 100 * 12; const probability = 1 / (1 + Math.exp(-z)); const x = 28 + index / 100 * (sigmoid.width - 36); const y = sigmoid.height - 24 - probability * (sigmoid.height - 42); if (index === 0) sigmoid.ctx.moveTo(x, y); else sigmoid.ctx.lineTo(x, y); } sigmoid.ctx.stroke(); const thresholdY = sigmoid.height - 24 - threshold * (sigmoid.height - 42); sigmoid.ctx.strokeStyle = '#7357c8'; sigmoid.ctx.setLineDash([5, 4]); sigmoid.ctx.beginPath(); sigmoid.ctx.moveTo(28, thresholdY); sigmoid.ctx.lineTo(sigmoid.width - 8, thresholdY); sigmoid.ctx.stroke(); sigmoid.ctx.setLineDash([]); };
  const draw = () => { const slope = +get('logistic-slope').value; const bias = +get('logistic-bias').value; const threshold = +get('logistic-threshold').value; const logit = Math.log(threshold / (1 - threshold)); const boundary = Math.abs(slope) < 0.001 ? sim.height / 2 : sim.height - ((logit - bias) / slope) * sim.height; sim.ctx.clearRect(0, 0, sim.width, sim.height); drawGrid(sim.ctx, sim.width, sim.height); sim.ctx.strokeStyle = '#ea6048'; sim.ctx.setLineDash([7, 5]); sim.ctx.beginPath(); sim.ctx.moveTo(0, boundary); sim.ctx.lineTo(sim.width, boundary); sim.ctx.stroke(); sim.ctx.setLineDash([]); let correct = 0; let probabilityTotal = 0; points.forEach(point => { const probability = 1 / (1 + Math.exp(-(slope * (sim.height - point.y) / sim.height + bias))); probabilityTotal += probability; if ((probability >= threshold ? 1 : 0) === point.label) correct++; sim.ctx.fillStyle = point.label ? '#ea6048' : '#2563eb'; sim.ctx.beginPath(); sim.ctx.arc(point.x, point.y, 7, 0, Math.PI * 2); sim.ctx.fill(); }); drawSigmoid(threshold); get('logistic-boundary').textContent = `y = ${boundary.toFixed(0)}`; get('logistic-accuracy').textContent = `${Math.round(correct / points.length * 100)}%`; get('logistic-result').textContent = threshold.toFixed(2); get('logistic-learning-text').textContent = `기준 확률 ${threshold.toFixed(2)} · 평균 예측 확률 ${(probabilityTotal / points.length).toFixed(2)} · 점선은 결정 경계입니다.`; };
  const generate = () => { points.length = 0; const entered = parseInput('logistic', sim.width, sim.height, true); if (entered) { points.push(...entered); draw(); return; } for (let index = 0; index < 24; index++) points.push({ x: 50 + Math.random() * (sim.width - 100), y: index < 12 ? sim.height * .3 + Math.random() * 100 : sim.height * .6 + Math.random() * 100, label: index < 12 ? 1 : 0 }); draw(); };
  configureSlider('logistic-slope', -3, 3, 1.2, .1, 'logistic-slope-value', value => (+value).toFixed(1), draw); configureSlider('logistic-bias', -2, 2, 0, .1, 'logistic-bias-value', value => (+value).toFixed(1), draw); configureSlider('logistic-threshold', .1, .9, .5, .05, 'logistic-threshold-value', value => (+value).toFixed(2), draw); get('simulator-content').querySelector('.action-button').onclick = generate; draggable(sim.canvas, points, draw); generate();
}

function initKnn() {
  const sim = setupCanvas('knn-canvas'); const points = []; const target = { x: sim.width / 2, y: sim.height / 2 }; const colors = ['#0f8b8d', '#ea6048', '#7357c8', '#d28b2e'];
  get('knn-learning').innerHTML = '<strong>가까운 이웃 거리 순위</strong><ol id="knn-distance-list"></ol>';
  const draw = () => { const k = +get('knn-k').value; sim.ctx.clearRect(0, 0, sim.width, sim.height); drawGrid(sim.ctx, sim.width, sim.height); const neighbors = points.map(point => ({ ...point, distance: Math.hypot((point.x - target.x) / sim.width * 100, (point.y - target.y) / sim.height * 100) })).sort((a, b) => a.distance - b.distance).slice(0, k); const votes = {}; neighbors.forEach(point => { votes[point.group] = (votes[point.group] || 0) + 1; }); const winner = +(Object.keys(votes).sort((a, b) => votes[b] - votes[a])[0] || 0); points.forEach(point => { sim.ctx.fillStyle = colors[point.group]; sim.ctx.beginPath(); sim.ctx.arc(point.x, point.y, 6, 0, Math.PI * 2); sim.ctx.fill(); }); neighbors.forEach((point, index) => { sim.ctx.strokeStyle = '#7357c8'; sim.ctx.beginPath(); sim.ctx.moveTo(target.x, target.y); sim.ctx.lineTo(point.x, point.y); sim.ctx.stroke(); sim.ctx.fillStyle = '#7357c8'; sim.ctx.font = 'bold 12px sans-serif'; sim.ctx.fillText(`${index + 1}`, point.x + 8, point.y - 8); }); sim.ctx.fillStyle = '#17202a'; sim.ctx.beginPath(); sim.ctx.arc(target.x, target.y, 11, 0, Math.PI * 2); sim.ctx.fill(); get('knn-neighbors').textContent = `${k}개`; get('knn-result').textContent = `그룹 ${winner + 1}`; get('knn-votes').textContent = Object.entries(votes).map(([group, vote]) => `${+group + 1}번 ${vote}표`).join(' / '); get('knn-distance-list').innerHTML = neighbors.map((point, index) => `<li>${index + 1}위 · 그룹 ${point.group + 1} · 거리 ${point.distance.toFixed(1)}</li>`).join(''); };
  const generate = () => { points.length = 0; const entered = parseInput('knn', sim.width, sim.height, true); if (entered) { points.push(...entered); draw(); return; } const groups = +get('knn-groups').value; const count = +get('knn-count').value; for (let group = 0; group < groups; group++) { const center = { x: sim.width * (group % 2 ? .72 : .28), y: sim.height * (group < 2 ? .3 : .72) }; for (let index = 0; index < count; index++) points.push({ x: center.x + (Math.random() - .5) * 150, y: center.y + (Math.random() - .5) * 130, group }); } draw(); };
  configureSlider('knn-k', 1, 15, 3, 2, 'knn-k-value', value => value, draw); configureSlider('knn-groups', 2, 4, 2, 1, 'knn-groups-value', value => value, generate); configureSlider('knn-count', 6, 24, 12, 1, 'knn-count-value', value => value, generate); get('simulator-content').querySelector('.action-button').onclick = generate; draggable(sim.canvas, [target], draw); generate();
}

function initKmeans() {
  const sim = setupCanvas('kmeans-canvas'); const points = []; const centers = []; const colors = ['#d28b2e', '#0f8b8d', '#ea6048', '#7357c8', '#2563eb'];
  get('kmeans-learning').innerHTML = '<strong>학습 과정</strong><span id="kmeans-learning-text"></span><ul id="kmeans-cluster-list"></ul>';
  let previousCenters = [];
  const draw = () => { sim.ctx.clearRect(0, 0, sim.width, sim.height); drawGrid(sim.ctx, sim.width, sim.height); points.forEach(point => { sim.ctx.fillStyle = colors[point.cluster % colors.length]; sim.ctx.beginPath(); sim.ctx.arc(point.x, point.y, 6, 0, Math.PI * 2); sim.ctx.fill(); }); previousCenters.forEach((center, index) => { if (!centers[index]) return; sim.ctx.strokeStyle = colors[index]; sim.ctx.setLineDash([5, 4]); sim.ctx.beginPath(); sim.ctx.moveTo(center.x, center.y); sim.ctx.lineTo(centers[index].x, centers[index].y); sim.ctx.stroke(); sim.ctx.setLineDash([]); }); centers.forEach((center, index) => { sim.ctx.strokeStyle = colors[index]; sim.ctx.lineWidth = 4; sim.ctx.beginPath(); sim.ctx.arc(center.x, center.y, 12, 0, Math.PI * 2); sim.ctx.stroke(); }); const clusterStats = centers.map((center, index) => { const clusterPoints = points.filter(point => point.cluster === index); const error = clusterPoints.reduce((sum, point) => sum + Math.hypot(point.x - center.x, point.y - center.y) ** 2, 0); return { count: clusterPoints.length, error }; }); const totalError = clusterStats.reduce((sum, stat) => sum + stat.error, 0); get('kmeans-result').textContent = `${centers.length}개`; get('kmeans-learning-text').textContent = `점 할당 후 각 그룹의 평균 위치로 중심을 이동합니다. WCSS ${totalError.toFixed(0)}`; get('kmeans-cluster-list').innerHTML = clusterStats.map((stat, index) => `<li>클러스터 ${index + 1}: ${stat.count}개 · 오차 ${stat.error.toFixed(0)}</li>`).join(''); };
  const generate = () => { points.length = 0; centers.length = 0; previousCenters = []; const clusterCount = +get('kmeans-k').value; const entered = parseInput('kmeans', sim.width, sim.height, false); if (entered) points.push(...entered.map((point, index) => ({ ...point, cluster: index % clusterCount }))); else { const count = +get('kmeans-count').value; for (let index = 0; index < count; index++) { const cluster = index % clusterCount; points.push({ x: sim.width * (.18 + cluster % 3 * .32) + (Math.random() - .5) * 100, y: sim.height * (.25 + Math.floor(cluster / 3) * .45) + (Math.random() - .5) * 90, cluster }); } } for (let index = 0; index < clusterCount; index++) centers.push({ x: 50 + Math.random() * (sim.width - 100), y: 50 + Math.random() * (sim.height - 100) }); get('kmeans-step').textContent = '0'; get('kmeans-status').textContent = '초기화됨'; draw(); };
  window.stepKmeans = () => { previousCenters = centers.map(center => ({ ...center })); points.forEach(point => { point.cluster = centers.reduce((best, center, index) => Math.hypot(center.x - point.x, center.y - point.y) < Math.hypot(centers[best].x - point.x, centers[best].y - point.y) ? index : best, 0); }); centers.forEach((center, index) => { const clusterPoints = points.filter(point => point.cluster === index); if (clusterPoints.length) { center.x = clusterPoints.reduce((sum, point) => sum + point.x, 0) / clusterPoints.length; center.y = clusterPoints.reduce((sum, point) => sum + point.y, 0) / clusterPoints.length; } }); get('kmeans-step').textContent = +get('kmeans-step').textContent + 1; get('kmeans-status').textContent = '중심 이동 완료'; draw(); };
  window.resetKmeans = generate; configureSlider('kmeans-k', 2, 5, 3, 1, 'kmeans-k-value', value => value, generate); configureSlider('kmeans-count', 12, 60, 30, 1, 'kmeans-count-value', value => value, generate); generate();
}

function initTree() {
  const sim = setupCanvas('tree-canvas');
  const points = [];
  const colors = ['#3182f6', '#ff6b6b'];
  get('tree-learning').innerHTML = '<strong>분할 규칙</strong><ul id="tree-rule-list"></ul>';
  const gini = items => {
    if (!items.length) return 0;
    const positive = items.filter(item => item.label === 1).length / items.length;
    return 1 - positive ** 2 - (1 - positive) ** 2;
  };
  const bestSplit = (items, axis) => {
    if (items.length < 2) return axis === 'x' ? sim.width / 2 : sim.height / 2;
    const sorted = [...items].sort((a, b) => a[axis] - b[axis]);
    let bestValue = sorted[Math.floor(sorted.length / 2)][axis];
    let bestScore = Infinity;
    for (let index = 0; index < sorted.length - 1; index++) {
      const value = (sorted[index][axis] + sorted[index + 1][axis]) / 2;
      const left = items.filter(item => item[axis] <= value);
      const right = items.filter(item => item[axis] > value);
      const score = left.length / items.length * gini(left) + right.length / items.length * gini(right);
      if (score < bestScore) { bestScore = score; bestValue = value; }
    }
    return bestValue;
  };
  const draw = () => {
    const depth = +get('tree-depth').value;
    sim.ctx.clearRect(0, 0, sim.width, sim.height);
    drawGrid(sim.ctx, sim.width, sim.height);
    const rootX = bestSplit(points, 'x');
    const rules = [`첫 질문: X ≤ ${(rootX / sim.width * 100).toFixed(1)}`];
    sim.ctx.strokeStyle = '#7357c8'; sim.ctx.lineWidth = 3;
    sim.ctx.beginPath(); sim.ctx.moveTo(rootX, 0); sim.ctx.lineTo(rootX, sim.height); sim.ctx.stroke();
    let splitCount = 1;
    if (depth >= 2) {
      const left = points.filter(point => point.x <= rootX);
      const right = points.filter(point => point.x > rootX);
      const leftY = bestSplit(left, 'y');
      const rightY = bestSplit(right, 'y');
      rules.push(`왼쪽 영역: Y ≤ ${(leftY / sim.height * 100).toFixed(1)}`); rules.push(`오른쪽 영역: Y ≤ ${(rightY / sim.height * 100).toFixed(1)}`);
      sim.ctx.strokeStyle = '#9b7be8'; sim.ctx.lineWidth = 2; sim.ctx.setLineDash([7, 5]);
      sim.ctx.beginPath(); sim.ctx.moveTo(0, leftY); sim.ctx.lineTo(rootX, leftY); sim.ctx.stroke();
      sim.ctx.beginPath(); sim.ctx.moveTo(rootX, rightY); sim.ctx.lineTo(sim.width, rightY); sim.ctx.stroke();
      sim.ctx.setLineDash([]); splitCount = 3;
    }
    points.forEach(point => { sim.ctx.fillStyle = colors[point.label]; sim.ctx.beginPath(); sim.ctx.arc(point.x, point.y, 7, 0, Math.PI * 2); sim.ctx.fill(); });
    get('tree-depth-result').textContent = `${depth}단계`;
    get('tree-splits').textContent = `${splitCount}개`;
    get('tree-gini').textContent = gini(points).toFixed(2);
    get('tree-rule-list').innerHTML = rules.map(rule => `<li>${rule}</li>`).join('');
  };
  const generate = () => { points.length = 0; const entered = parseInput('tree', sim.width, sim.height, true); if (entered) { points.push(...entered); draw(); return; } for (let index = 0; index < 36; index++) { const x = 30 + Math.random() * (sim.width - 60); const y = 30 + Math.random() * (sim.height - 60); points.push({ x, y, label: (x > sim.width * .52 && y < sim.height * .62) || (x < sim.width * .34 && y > sim.height * .56) ? 1 : 0 }); } draw(); };
  window.resetTree = generate;
  configureSlider('tree-depth', 1, 2, 2, 1, 'tree-depth-value', value => value, draw);
  draggable(sim.canvas, points, draw);
  generate();
}

function initSvm() {
  const sim = setupCanvas('svm-canvas'); const points = [];
  const draw = () => { const margin = +get('svm-margin').value; const slope = +get('svm-angle').value; const centerX = sim.width / 2; const centerY = sim.height / 2; const normal = Math.hypot(1, slope); const normalX = -slope / normal; const normalY = 1 / normal; sim.ctx.clearRect(0, 0, sim.width, sim.height); drawGrid(sim.ctx, sim.width, sim.height); sim.ctx.strokeStyle = '#7357c8'; sim.ctx.lineWidth = 3; sim.ctx.beginPath(); sim.ctx.moveTo(0, centerY + slope * -centerX); sim.ctx.lineTo(sim.width, centerY + slope * (sim.width - centerX)); sim.ctx.stroke(); sim.ctx.setLineDash([6, 5]); for (const sign of [-1, 1]) { sim.ctx.beginPath(); sim.ctx.moveTo(sign * normalX * margin, centerY + slope * -centerX + sign * normalY * margin); sim.ctx.lineTo(sim.width + sign * normalX * margin, centerY + slope * (sim.width - centerX) + sign * normalY * margin); sim.ctx.stroke(); } sim.ctx.setLineDash([]); let support = 0; let errors = 0; points.forEach(point => { const distance = (slope * point.x - point.y + centerY - slope * centerX) / normal; const isSupport = Math.abs(distance) <= margin + 8; if (isSupport) support++; if ((point.group === 1 && distance < 0) || (point.group === -1 && distance > 0)) errors++; sim.ctx.fillStyle = point.group === 1 ? '#2563eb' : '#ea6048'; sim.ctx.beginPath(); sim.ctx.arc(point.x, point.y, isSupport ? 10 : 7, 0, Math.PI * 2); sim.ctx.fill(); if (isSupport) { sim.ctx.strokeStyle = '#d28b2e'; sim.ctx.lineWidth = 3; sim.ctx.stroke(); } }); get('svm-support').textContent = `${support}개`; get('svm-errors').textContent = `${errors}개`; get('svm-result').textContent = `${margin}px`; };
  const reset = () => { points.length = 0; const entered = parseInput('svm', sim.width, sim.height, true); if (entered) { points.push(...entered.map(point => ({ ...point, group: point.label ? 1 : -1 }))); draw(); return; } for (let index = 0; index < 8; index++) points.push({ x: sim.width * (index < 4 ? .22 + .07 * index : .62 + .07 * (index - 4)), y: sim.height * (index < 4 ? .25 + .1 * (index % 2) : .65 + .1 * (index % 2)), group: index < 4 ? 1 : -1 }); draw(); };
  window.resetSvm = reset; configureSlider('svm-margin', 20, 90, 40, 1, 'svm-margin-value', value => value, draw); configureSlider('svm-angle', -2, 2, -.5, .1, 'svm-angle-value', value => (+value).toFixed(1), draw); draggable(sim.canvas, points, draw); reset();
}

window.resetLinear = () => openSimulator('linear');
window.resetLogistic = () => openSimulator('logistic');
window.resetKnn = () => openSimulator('knn');
renderCards();
