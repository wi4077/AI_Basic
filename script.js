const algorithms = {
  linear: { title: '선형 회귀', kicker: 'REGRESSION', summary: '연속적인 값을 가장 잘 설명하는 직선을 찾아 예측합니다.', core: '입력값과 목표값의 관계를 y = wx + b 형태의 직선으로 근사합니다. 오차 제곱의 합이 가장 작아지는 기울기와 절편을 찾습니다.', controls: '데이터 개수, 잡음 정도, 데이터 점의 위치를 조절할 수 있습니다.', observe: '점 하나의 위치가 회귀선과 평균제곱오차에 어떤 영향을 주는지 확인하세요.', formula: '공식은 MSE = 1/n Σ(yᵢ - ŷᵢ)²입니다. 가격, 온도, 수요처럼 연속적인 값을 예측할 때 활용합니다.', theory: '선형 회귀는 “종속 변수와 설명 변수 사이의 관계를 직선으로 가정한다”는 핵심 전제를 사용합니다. 실제 데이터는 잡음이 섞여 있지만, 잔차의 제곱합을 최소화하는 방식으로 직선을 가장 잘 맞추는 기울기와 절편을 찾습니다. 이 방법은 단순하지만 해석이 쉽고, 추정된 계수의 의미를 직관적으로 이해할 수 있다는 장점이 있습니다. 다만, 관계가 비선형적이면 직선만으로는 충분하지 않을 수 있습니다.' },
  logistic: { title: '로지스틱 회귀', kicker: 'CLASSIFICATION', summary: '확률을 계산해 두 클래스 중 어디에 속하는지 분류합니다.', core: '선형 결합값을 시그모이드 함수에 넣어 0과 1 사이의 확률로 변환하고 기준 확률에 따라 클래스를 결정합니다.', controls: '기울기, 절편, 분류 기준값을 조절하고 데이터 점을 이동할 수 있습니다.', observe: '결정 경계와 기준값이 바뀌면 분류 결과가 어떻게 달라지는지 확인하세요.', formula: '확률은 σ(z) = 1/(1+e⁻ᶻ)로 계산합니다. 스팸 판별, 합격 여부, 질병 위험처럼 두 결과를 분류하는 데 사용합니다.', theory: '로지스틱 회귀는 출력값을 확률로 바꾸기 위해 시그모이드 함수를 사용합니다. 선형 결합 z = wx + b를 입력으로 받아 0~1 범위의 확률을 만들고, 기준값인 0.5나 사용자가 설정한 임계값을 넘느냐에 따라 클래스가 결정됩니다. 학습은 손실 함수인 교차엔트로피를 줄이는 방향으로 이루어지며, 클래스 간 경계가 명확하고 해석 가능한 모델로 널리 쓰입니다. 다만, 복잡한 비선형 경계는 다른 모델이 더 적합할 수 있습니다.' },
  knn: { title: 'K-최근접 이웃', kicker: 'CLASSIFICATION', summary: '새로운 점 주변의 가까운 이웃을 보고 다수결로 분류합니다.', core: '새 점과 학습 데이터 사이의 거리를 계산한 뒤 가장 가까운 K개의 클래스 중 다수인 클래스를 선택합니다.', controls: 'K, 그룹 수, 그룹별 샘플 수를 조절하고 보라색 대상 점을 드래그할 수 있습니다.', observe: 'K가 작을 때와 클 때 결정 영역과 분류 결과가 어떻게 달라지는지 비교하세요.', formula: '거리는 d = √Σ(xᵢ-yᵢ)²로 계산합니다. 별도의 학습식 없이 데이터의 지역적 패턴을 이용하는 방식입니다.', theory: 'KNN은 “비슷한 데이터는 비슷한 클래스를 가질 가능성이 높다”는 직관을 바탕으로 동작합니다. 새로운 점에서 가장 가까운 K개의 학습 샘플을 찾고, 그들 중 다수가 속한 클래스로 예측합니다. 따라서 K의 크기는 모델의 민감도를 결정하며, K가 작으면 경계가 복잡해지고 K가 크면 부드러운 경계가 됩니다. 학습 단계가 거의 없다는 점이 장점이지만, 차원이 커지면 거리 계산이 비효율적이어서 대규모 데이터에는 부담이 됩니다.' },
  kmeans: { title: 'K-평균', kicker: 'CLUSTERING', summary: '정답 라벨 없이 비슷한 데이터끼리 K개의 그룹으로 묶습니다.', core: '각 점을 가장 가까운 중심에 할당하고 각 그룹의 평균 위치로 중심을 이동하는 과정을 반복합니다.', controls: '클러스터 수와 데이터 개수를 조절하고 한 단계씩 학습을 진행할 수 있습니다.', observe: '중심이 이동하고 그룹 색상이 안정되는 과정을 확인하세요.', formula: '목표는 각 점과 소속 중심 사이 거리의 제곱합을 줄이는 것입니다. 고객 유형, 이미지 색상, 문서 주제 분류에 활용합니다.', theory: 'K-평균은 비지도 학습의 대표 예시로, 라벨이 없는 데이터에서 유사한 샘플들을 묶는 데 사용됩니다. 각 반복에서 점을 가장 가까운 중심에 할당하고, 각 군집의 평균 위치로 중심을 다시 잡아 내부 거리 제곱합을 줄이는 방식입니다. 이 과정은 중심이 안정될 때까지 반복되며, 군집 수 K를 정하는 것이 중요한 설계 요소입니다. 초기 중심 위치가 다르면 최종 결과도 달라질 수 있어서, 보통 여러 번 초기화를 시도합니다.' },
  tree: { title: '의사결정트리', kicker: 'CLASSIFICATION / REGRESSION', summary: '질문을 차례로 던져 데이터를 이해하기 쉬운 영역으로 나눕니다.', core: '특성의 기준값을 질문으로 사용해 데이터를 분할하고, 각 영역의 클래스가 최대한 순수해지도록 다음 질문을 선택합니다.', controls: '트리 깊이와 샘플 구성을 조절하고 지니 불순도 기반 분할선을 확인할 수 있습니다.', observe: '깊이가 커질수록 경계가 복잡해지고 과대적합 위험이 커지는 과정을 비교하세요.', formula: '지니 불순도는 Gini = 1 - Σpᵢ²입니다. 설명 가능한 규칙이 필요하거나 분류와 회귀를 함께 다룰 때 활용합니다.', theory: '의사결정트리는 데이터를 여러 질문으로 나누어 규칙 기반의 분류를 만드는 알고리즘입니다. 각 분할은 불순도를 줄이는 방향으로 선택되며, 깊이가 깊어질수록 더 정교한 규칙을 만들 수 있지만 훈련 데이터에 대한 적합도는 상승하고 일반화 성능은 떨어질 수 있습니다. 이런 이유로 트리를 제한하는 가지치기(pruning)가 자주 사용됩니다. 트리는 모델의 의사결정 과정을 사람이 읽기 쉬워 설명 가능성이 높다는 점이 큰 장점입니다.' },
  svm: { title: '서포트 벡터 머신', kicker: 'CLASSIFICATION', summary: '두 클래스 사이의 간격이 가장 넓어지는 경계면을 찾습니다.', core: '결정 경계와 가장 가까운 점인 서포트 벡터를 기준으로 마진을 최대화해 분류합니다.', controls: '마진 폭과 경계선 기울기를 조절하고 데이터 점을 직접 이동할 수 있습니다.', observe: '마진 안에 들어오는 점과 경계를 침범하는 점의 수가 어떻게 변하는지 확인하세요.', formula: '경계는 wᵀx+b=0이고 마진 폭은 2/||w||입니다. 특성이 많은 데이터나 명확한 경계가 있는 분류에 활용합니다.', theory: 'SVM은 클래스 사이의 경계면을 최대 마진으로 결정하는 방식입니다. 경계에서 가장 가까운 샘플들인 서포트 벡터가 마진을 형성하고, 이들을 기준으로 모델이 최적 경계를 찾습니다. 마진이 넓을수록 새로운 데이터에 대해 더 안정적으로 분류할 가능성이 높아지며, 일반화 성능이 좋다는 이유로 널리 사용됩니다. 커널 트릭을 이용하면 비선형 경계도 표현할 수 있어 고차원 분류 문제에서 강력한 성능을 발휘합니다.' }
};

const comparisonRows = [
  { name: '선형 회귀', task: '예측', data: '연속형 입력, 연속형 타깃', feature: '직선 형태의 관계', strength: '해석이 쉽고 계산이 단순함', weakness: '비선형 구조를 잘 못 표현함', use: '주가, 온도, 수요 예측' },
  { name: '로지스틱 회귀', task: '분류', data: '연속형 입력, 이진 타깃', feature: '시그모이드 확률화', strength: '확률 해석이 가능함', weakness: '복잡한 경계는 표현 제한', use: '스팸 판별, 합격 여부' },
  { name: 'KNN', task: '분류', data: '라벨이 있는 특징 벡터', feature: '가까운 이웃의 다수결', strength: '직관적이고 학습이 간단함', weakness: '데이터가 많으면 느림', use: '추천, 이상 탐지' },
  { name: 'K-평균', task: '군집화', data: '라벨이 없는 특징 벡터', feature: '중심 이동 기반 군집', strength: '비지도 학습에 적합함', weakness: 'K를 직접 정해야 함', use: '고객 세그먼트, 문서 분류' },
  { name: '의사결정트리', task: '분류/회귀', data: '범주형 또는 연속형 특성', feature: '질문 기반 분할', strength: '결과를 쉽게 설명 가능', weakness: '과대적합되기 쉬움', use: '대출 심사, 고객 분류' },
  { name: 'SVM', task: '분류', data: '고차원 특징 벡터', feature: '최대 마진 경계', strength: '일반화 성능이 좋음', weakness: '대규모 데이터에 비용이 큼', use: '이미지 분류, 텍스트 분류' }
];

const glossaryTerms = [
  { term: '오차', category: '기초', definition: '모델이 예측한 값과 실제 값 사이의 차이입니다.', details: '오차는 한 개인 데이터에 대한 차이이며, 전체 성능을 보려면 평균 오차나 제곱오차를 함께 보는 경우가 많습니다.', example: '예측한 집값이 3천만 원인데 실제값이 3천 5백만 원이면 오차는 5백만 원입니다.' },
  { term: '잔차', category: '회귀', definition: '회귀 모델에서 실제값에서 예측값을 뺀 차이입니다.', details: '선형 회귀는 잔차의 제곱합을 최소화하는 직선을 찾는 방식으로 학습합니다. 잔차가 작을수록 모델이 실제 패턴을 잘 따라간다고 이해할 수 있습니다.', example: '실제값 8, 예측값 7.2이면 잔차는 0.8입니다.' },
  { term: '시그모이드', category: '분류', definition: '입력을 0과 1 사이의 확률로 바꾸는 함수입니다.', details: '로지스틱 회귀에서 널리 쓰며, 입력값이 매우 커지거나 작아져도 확률 형태로 안정적으로 표현할 수 있습니다.', example: 'z = 2일 때 sigmoid(z) ≈ 0.88로, 높은 확률을 의미합니다.' },
  { term: 'K', category: '분류', definition: 'KNN에서 이웃의 수를 뜻하는 값입니다.', details: 'K가 작으면 경계가 복잡해지고, K가 크면 더 부드러운 경계가 됩니다. 따라서 K는 모델의 민감도를 조절하는 중요한 하이퍼파라미터입니다.', example: 'K = 3이면 가장 가까운 3개 이웃의 다수결로 분류합니다.' },
  { term: '마진', category: 'SVM', definition: '두 클래스 경계와 가장 가까운 점 사이의 거리입니다.', details: '마진이 넓을수록 새로운 데이터에 대해 더 안정적인 분류를 기대할 수 있습니다. SVM은 이 마진을 최대화하는 방향으로 경계를 찾습니다.', example: '경계에서 클래스 A와 B의 점이 각각 1칸, 1칸 떨어져 있으면 마진은 2입니다.' },
  { term: '군집', category: '비지도 학습', definition: '비슷한 특성을 가진 데이터들이 묶인 집단입니다.', details: 'K-평균은 이런 군집을 찾아 데이터 구조를 이해하는 데 사용합니다. 정답 라벨이 없을 때 특히 유용합니다.', example: '고객 데이터를 보고 쇼핑 성향이 비슷한 고객들을 한 그룹으로 묶는 것과 같습니다.' },
  { term: '결정 경계', category: '분류', definition: '두 클래스를 나누는 경계선입니다.', details: '로지스틱 회귀, SVM, 의사결정트리 모두 결정 경계를 통해 결과를 나눕니다. 경계가 어떻게 생기느냐에 따라 분류 결과가 달라집니다.', example: '고양이와 강아지를 분류할 때, 특정 특징 값이 경계보다 큰지 작은지를 기준으로 나눕니다.' },
  { term: '지니 불순도', category: '트리', definition: '분할이 얼마나 순수하게 되었는지를 측정하는 값입니다.', details: '값이 낮을수록 한 영역 안에 같은 클래스가 더 많이 모여 있다는 뜻입니다. 의사결정트리는 이를 줄이는 방향으로 분할을 선택합니다.', example: '한 노드 안에 9개가 A, 1개가 B이면 불순도가 낮습니다.' },
  { term: '과대적합', category: '기초', definition: '훈련 데이터는 잘 맞지만 새로운 데이터에는 잘 맞지 않는 상태입니다.', details: '깊은 트리나 과도한 파라미터는 훈련 데이터에 과하게 맞춰 버릴 수 있어요. 일반화 성능을 떨어뜨리는 대표적인 문제입니다.', example: '시험 문제를 외워서 비슷한 문제는 잘 맞히지만 다른 유형은 틀리는 경우가 과대적합입니다.' },
  { term: '과소적합', category: '기초', definition: '모델이 데이터의 패턴을 충분히 표현하지 못해 학습이 부족한 상태입니다.', details: '모델이 너무 단순하거나 특징을 충분히 반영하지 못하면 발생합니다. 보통 직선 모델이 복잡한 패턴을 못 잡을 때 볼 수 있습니다.', example: '비선형 데이터를 직선 하나로만 설명하려는 상황입니다.' }
];

const quizQuestions = [
  { question: '선형 회귀가 가장 잘 맞추려고 하는 것은 무엇인가?', options: ['오차 제곱합을 최소화하는 직선', '데이터를 가장 많은 그룹으로 나누는 경계', '중심을 무작위로 이동시키는 과정', '레이블 없이 분류하는 방식'], answer: 0, explanation: '선형 회귀는 잔차의 제곱합을 줄이는 직선을 찾는 것이 핵심입니다.' },
  { question: '로지스틱 회귀에서 출력값을 왜 확률처럼 해석하나?', options: ['시그모이드가 0~1 사이의 값을 만들기 때문', '무조건 100% 확실한 값이 나오기 때문', '거리 계산을 기반으로 하기 때문', '데이터를 무작위로 섞기 때문'], answer: 0, explanation: '시그모이드 함수가 0과 1 사이의 확률값을 출력해 분류 기준으로 사용합니다.' },
  { question: 'KNN에서 K 값이 작아지면 어떤 변화가 생기나?', options: ['결정 경계가 더 복잡해진다', '데이터가 항상 더 많이 묶인다', '모든 값이 같은 클래스로 분류된다', '모델이 자동으로 학습된다'], answer: 0, explanation: 'K가 작을수록 가까운 이웃만 보고 판별하므로 경계가 세밀하고 민감해집니다.' },
  { question: 'K-평균의 핵심 동작은 무엇인가?', options: ['점들을 가장 가까운 중심에 할당하고 중심을 다시 계산한다', '모든 점을 레이블로 분류한다', '직선을 외삽해 예측한다', '결정 경계를 마진으로 넓힌다'], answer: 0, explanation: 'K-평균은 점 할당과 중심 이동을 반복해 군집을 찾는 알고리즘입니다.' },
  { question: '의사결정트리의 장점으로 가장 적절한 것은?', options: ['결정 과정을 사람이 읽기 쉽게 이해할 수 있다', '항상 모든 데이터를 완벽히 분류한다', '학습 데이터가 없어도 동작한다', '특성 간 상관관계를 무시한다'], answer: 0, explanation: '트리는 질문 기반으로 규칙을 만들기 때문에 설명 가능성이 높습니다.' },
  { question: 'SVM이 중요하게 보는 것은 무엇인가?', options: ['각 클래스 사이의 마진을 최대화하는 경계', '데이터가 몇 개 있는지의 총합', '결정 경계의 색상', '중심 좌표의 평균값'], answer: 0, explanation: 'SVM은 분류 경계와 가장 가까운 샘플 사이의 간격인 마진을 최대화합니다.' }
];

const pages = { home: document.querySelector('#home-page'), concept: document.querySelector('#concept-page'), simulator: document.querySelector('#simulator-page') };
let currentAlgorithm = 'linear';
let activeSimulation = null;
const get = id => document.getElementById(id);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const randomBetween = (min, max) => min + Math.random() * (max - min);
const randomChoice = values => values[Math.floor(Math.random() * values.length)];
const randomNormal = (mean = 0, deviation = 1) => { let first = 0; let second = 0; while (!first) first = Math.random(); while (!second) second = Math.random(); return mean + deviation * Math.sqrt(-2 * Math.log(first)) * Math.cos(Math.PI * 2 * second); };

function renderCards() {
  const groups = [
    { title: '예측', description: '연속적인 값을 예측하는 알고리즘', keys: ['linear'] },
    { title: '분류', description: '데이터를 기준에 따라 나누는 알고리즘', keys: ['logistic', 'knn', 'tree', 'svm'] },
    { title: '군집화', description: '비슷한 데이터끼리 묶는 알고리즘', keys: ['kmeans'] }
  ];
  let cardNumber = 0;
  get('algorithm-cards').innerHTML = groups.map(group => `<section class="algorithm-group"><div class="group-heading"><div><span class="eyebrow">ALGORITHM GROUP</span><h2>${group.title}</h2></div><p>${group.description}</p></div><div class="algorithm-grid">${group.keys.map(key => { const item = algorithms[key]; cardNumber += 1; return `<article class="algorithm-card algorithm-card--${key}" onclick="showConcept('${key}')"><div><span class="card-number">0${cardNumber} / ${item.kicker}</span><h2>${item.title}</h2><p>${item.summary}</p></div><span class="card-link">개념 카드 보기 -></span></article>`; }).join('')}</div></section>`).join('');

  get('algorithm-comparison').innerHTML = `
    <table class="comparison-table">
      <thead>
        <tr>
          <th>알고리즘</th>
          <th>목적</th>
          <th>데이터 구조</th>
          <th>핵심 특징</th>
          <th>장점</th>
          <th>단점</th>
          <th>활용 예시</th>
        </tr>
      </thead>
      <tbody>
        ${comparisonRows.map(row => `
          <tr>
            <td class="compare-name">${row.name}</td>
            <td>${row.task}</td>
            <td>${row.data}</td>
            <td>${row.feature}</td>
            <td>${row.strength}</td>
            <td>${row.weakness}</td>
            <td>${row.use}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  get('quiz-container').innerHTML = quizQuestions.map((question, index) => `
    <article class="quiz-card" data-index="${index}">
      <h3>Q${index + 1}. ${question.question}</h3>
      <div class="quiz-options">
        ${question.options.map((option, optionIndex) => `
          <button class="option-button" type="button" data-index="${index}" data-option="${optionIndex}">${option}</button>
        `).join('')}
      </div>
      <p class="quiz-feedback"></p>
    </article>
  `).join('');

  const glossarySearch = get('glossary-search');
  const renderGlossary = (keyword = '') => {
    const filtered = glossaryTerms.filter(term => {
      const haystack = `${term.term} ${term.category} ${term.definition} ${term.details}`.toLowerCase();
      return haystack.includes(keyword.toLowerCase());
    });

    const list = get('glossary-list');
    if (!filtered.length) {
      list.innerHTML = '<div class="glossary-empty">검색 결과가 없어요. 다른 키워드를 입력해보세요.</div>';
      return;
    }

    list.innerHTML = filtered.map(term => `
      <article class="glossary-item">
        <header>
          <span class="glossary-term">${term.term}</span>
          <span class="glossary-tag">${term.category}</span>
        </header>
        <p>${term.definition}</p>
        <button class="glossary-toggle" type="button">설명 보기</button>
        <div class="glossary-answer">
          <p>${term.details}</p>
          <p><strong>예시:</strong> ${term.example}</p>
        </div>
      </article>
    `).join('');
  };

  if (glossarySearch) {
    glossarySearch.addEventListener('input', event => renderGlossary(event.target.value));
    renderGlossary();
  }
}

document.addEventListener('click', event => {
  const glossaryToggle = event.target.closest('.glossary-toggle');
  if (glossaryToggle) {
    const item = glossaryToggle.closest('.glossary-item');
    item.classList.toggle('expanded');
    glossaryToggle.textContent = item.classList.contains('expanded') ? '설명 닫기' : '설명 보기';
    return;
  }

  const target = event.target.closest('.option-button');
  if (!target) return;

  const questionIndex = Number(target.dataset.index);
  const selectedOption = Number(target.dataset.option);
  const question = quizQuestions[questionIndex];
  const card = target.closest('.quiz-card');
  const feedback = card.querySelector('.quiz-feedback');
  const buttons = card.querySelectorAll('.option-button');

  buttons.forEach(button => {
    const isCorrect = Number(button.dataset.option) === question.answer;
    const isSelected = Number(button.dataset.option) === selectedOption;
    button.disabled = true;
    button.classList.toggle('correct', isCorrect);
    button.classList.toggle('wrong', isSelected && !isCorrect);
  });

  const isCorrectAnswer = selectedOption === question.answer;
  feedback.textContent = isCorrectAnswer ? `정답! ${question.explanation}` : `오답! ${question.explanation}`;
  feedback.classList.toggle('correct', isCorrectAnswer);
  feedback.classList.toggle('wrong', !isCorrectAnswer);
});

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
  get('concept-theory').textContent = item.theory;
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
  const plot = { left: 52, top: 18, right: sim.width - 18, bottom: sim.height - 30 };
  plot.width = plot.right - plot.left;
  plot.height = plot.bottom - plot.top;
  const toDataPoint = point => ({ x: ((point.x - plot.left) / plot.width) * 10, y: ((plot.bottom - point.y) / plot.height) * 10 });
  const drawLinearGrid = () => {
    sim.ctx.strokeStyle = '#e5e1d8';
    sim.ctx.lineWidth = 1;
    sim.ctx.font = '12px sans-serif';
    sim.ctx.fillStyle = '#6b7684';
    sim.ctx.textAlign = 'center';
    sim.ctx.textBaseline = 'middle';
    for (let index = 0; index <= 10; index++) {
      const x = plot.left + (index / 10) * plot.width;
      const y = plot.bottom - (index / 10) * plot.height;
      sim.ctx.beginPath();
      sim.ctx.moveTo(x, plot.top);
      sim.ctx.lineTo(x, plot.bottom);
      sim.ctx.stroke();
      sim.ctx.fillText(index, x, sim.height - 14);
      sim.ctx.textAlign = 'right';
      sim.ctx.fillText(index, plot.left - 10, y + 2);
      sim.ctx.textAlign = 'center';
    }
    sim.ctx.strokeStyle = '#9aa4b2';
    sim.ctx.lineWidth = 1.5;
    sim.ctx.beginPath();
    sim.ctx.moveTo(plot.left, plot.top);
    sim.ctx.lineTo(plot.left, plot.bottom);
    sim.ctx.lineTo(plot.right, plot.bottom);
    sim.ctx.stroke();
    sim.ctx.fillStyle = '#4b5563';
    sim.ctx.textAlign = 'center';
    sim.ctx.fillText('X', plot.right - 10, sim.height - 6);
    sim.ctx.textAlign = 'center';
    sim.ctx.fillText('Y', 18, plot.top + 8);
  };
  const draw = () => {
    sim.ctx.clearRect(0, 0, sim.width, sim.height); drawLinearGrid();
    const dataPoints = points.map(toDataPoint);
    const count = dataPoints.length; const meanX = dataPoints.reduce((sum, point) => sum + point.x, 0) / count; const meanY = dataPoints.reduce((sum, point) => sum + point.y, 0) / count;
    const denominator = dataPoints.reduce((sum, point) => sum + (point.x - meanX) ** 2, 0) || 1;
    const slope = dataPoints.reduce((sum, point) => sum + (point.x - meanX) * (point.y - meanY), 0) / denominator; const intercept = meanY - slope * meanX;
    const screenY = dataY => plot.bottom - (dataY / 10) * plot.height;
    sim.ctx.strokeStyle = '#2563eb'; sim.ctx.lineWidth = 3; sim.ctx.beginPath(); sim.ctx.moveTo(plot.left, screenY(intercept)); sim.ctx.lineTo(plot.right, screenY(slope * 10 + intercept)); sim.ctx.stroke();
    let mse = 0; points.forEach((point, index) => { const dataPoint = dataPoints[index]; const predicted = slope * dataPoint.x + intercept; const predictedY = screenY(predicted); mse += (dataPoint.y - predicted) ** 2; sim.ctx.strokeStyle = '#aeb8c4'; sim.ctx.lineWidth = 1; sim.ctx.setLineDash([4, 4]); sim.ctx.beginPath(); sim.ctx.moveTo(point.x, point.y); sim.ctx.lineTo(point.x, predictedY); sim.ctx.stroke(); sim.ctx.setLineDash([]); sim.ctx.fillStyle = '#17202a'; sim.ctx.beginPath(); sim.ctx.arc(point.x, point.y, 6, 0, Math.PI * 2); sim.ctx.fill(); });
    const predictionX = +get('linear-predict').value; const predictionY = slope * predictionX + intercept; get('linear-prediction').textContent = Number.isFinite(predictionX) ? `예측 Y = ${predictionY.toFixed(2)}` : 'X값을 입력하세요'; get('linear-equation').textContent = `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`; get('linear-mse').textContent = (mse / count).toFixed(2); get('linear-status').textContent = `${count}개 데이터`; get('linear-learning').innerHTML = `<strong>계산 과정</strong><span>기울기 ${slope.toFixed(2)} · 절편 ${intercept.toFixed(2)} · 평균제곱오차 ${(mse / count).toFixed(2)}</span><span>점선은 각 데이터와 회귀선 사이의 잔차입니다.</span><span id="linear-coordinate">점 위에 마우스를 올리면 정확한 좌표가 표시됩니다.</span>`;
  };
  const generate = () => { points.length = 0; const entered = parseInput('linear', sim.width, sim.height, false); if (entered) { points.push(...entered.map(point => ({ x: plot.left + (point.x / sim.width) * plot.width, y: plot.bottom - (point.y / sim.height) * plot.height }))); draw(); return; } const count = +get('linear-count').value; const noise = +get('linear-noise').value; const pattern = randomChoice(['up', 'down', 'curve', 'flat']); for (let index = 0; index < count; index++) { const xValue = randomBetween(.4, 9.6); const normalizedX = xValue / 10; let yValue = pattern === 'up' ? 1.2 + normalizedX * 6.6 : pattern === 'down' ? 8.8 - normalizedX * 6.2 : pattern === 'curve' ? 1.2 + normalizedX ** 2 * 6.8 : 5 + Math.sin(normalizedX * Math.PI * 2) * 1.5; yValue = clamp(yValue + randomNormal(0, noise / 60 * .8), .4, 9.6); points.push({ x: plot.left + (xValue / 10) * plot.width, y: plot.bottom - (yValue / 10) * plot.height }); } draw(); };
  get('linear-predict').addEventListener('input', draw); sim.canvas.addEventListener('mousemove', event => { const cursor = eventPoint(sim.canvas, event); const index = points.findIndex(point => Math.hypot(point.x - cursor.x, point.y - cursor.y) < 18); const coordinate = get('linear-coordinate'); if (coordinate && index >= 0) { const point = toDataPoint(points[index]); coordinate.textContent = `선택한 점 좌표: (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`; } }); configureSlider('linear-count', 6, 40, 18, 1, 'linear-count-value', value => value, generate); configureSlider('linear-noise', 0, 60, 18, 1, 'linear-noise-value', value => value, generate); draggable(sim.canvas, points, draw); generate();
}

function initLogistic() {
  get('logistic-learning').innerHTML = '<strong>시그모이드와 확률</strong><span id="logistic-learning-text"></span><canvas id="logistic-sigmoid" aria-label="시그모이드 함수 그래프"></canvas>';
  const sim = setupCanvas('logistic-canvas'); const sigmoid = setupCanvas('logistic-sigmoid', 150); const points = [];
  const drawSigmoid = (threshold) => { sigmoid.ctx.clearRect(0, 0, sigmoid.width, sigmoid.height); sigmoid.ctx.strokeStyle = '#e5e1d8'; sigmoid.ctx.beginPath(); sigmoid.ctx.moveTo(28, sigmoid.height - 24); sigmoid.ctx.lineTo(sigmoid.width - 8, sigmoid.height - 24); sigmoid.ctx.moveTo(28, 12); sigmoid.ctx.lineTo(28, sigmoid.height - 24); sigmoid.ctx.stroke(); sigmoid.ctx.strokeStyle = '#ea6048'; sigmoid.ctx.lineWidth = 3; sigmoid.ctx.beginPath(); for (let index = 0; index <= 100; index++) { const z = -6 + index / 100 * 12; const probability = 1 / (1 + Math.exp(-z)); const x = 28 + index / 100 * (sigmoid.width - 36); const y = sigmoid.height - 24 - probability * (sigmoid.height - 42); if (index === 0) sigmoid.ctx.moveTo(x, y); else sigmoid.ctx.lineTo(x, y); } sigmoid.ctx.stroke(); const thresholdY = sigmoid.height - 24 - threshold * (sigmoid.height - 42); sigmoid.ctx.strokeStyle = '#7357c8'; sigmoid.ctx.setLineDash([5, 4]); sigmoid.ctx.beginPath(); sigmoid.ctx.moveTo(28, thresholdY); sigmoid.ctx.lineTo(sigmoid.width - 8, thresholdY); sigmoid.ctx.stroke(); sigmoid.ctx.setLineDash([]); };
  const draw = () => { const slope = +get('logistic-slope').value; const bias = +get('logistic-bias').value; const threshold = +get('logistic-threshold').value; const logit = Math.log(threshold / (1 - threshold)); const boundary = Math.abs(slope) < 0.001 ? sim.height / 2 : sim.height - ((logit - bias) / slope) * sim.height; sim.ctx.clearRect(0, 0, sim.width, sim.height); drawGrid(sim.ctx, sim.width, sim.height); sim.ctx.strokeStyle = '#ea6048'; sim.ctx.setLineDash([7, 5]); sim.ctx.beginPath(); sim.ctx.moveTo(0, boundary); sim.ctx.lineTo(sim.width, boundary); sim.ctx.stroke(); sim.ctx.setLineDash([]); let correct = 0; let probabilityTotal = 0; points.forEach(point => { const probability = 1 / (1 + Math.exp(-(slope * (sim.height - point.y) / sim.height + bias))); probabilityTotal += probability; if ((probability >= threshold ? 1 : 0) === point.label) correct++; sim.ctx.fillStyle = point.label ? '#ea6048' : '#2563eb'; sim.ctx.beginPath(); sim.ctx.arc(point.x, point.y, 7, 0, Math.PI * 2); sim.ctx.fill(); }); drawSigmoid(threshold); get('logistic-boundary').textContent = `y = ${boundary.toFixed(0)}`; get('logistic-accuracy').textContent = `${Math.round(correct / points.length * 100)}%`; get('logistic-result').textContent = threshold.toFixed(2); get('logistic-learning-text').textContent = `기준 확률 ${threshold.toFixed(2)} · 평균 예측 확률 ${(probabilityTotal / points.length).toFixed(2)} · 점선은 결정 경계입니다.`; };
  const generate = () => { points.length = 0; const entered = parseInput('logistic', sim.width, sim.height, true); if (entered) { points.push(...entered); draw(); return; } const pattern = randomChoice(['balanced', 'upper-heavy', 'overlap']); const threshold = randomBetween(.38, .62); for (let index = 0; index < 24; index++) { const label = index % 2; const spread = pattern === 'overlap' ? .2 : pattern === 'upper-heavy' ? .12 : .08; const base = label ? threshold - .18 : threshold + .18; const yRatio = clamp(base + randomNormal(0, spread), .06, .94); points.push({ x: randomBetween(40, sim.width - 40), y: sim.height * yRatio, label }); } draw(); };
  configureSlider('logistic-slope', -3, 3, 1.2, .1, 'logistic-slope-value', value => (+value).toFixed(1), draw); configureSlider('logistic-bias', -2, 2, 0, .1, 'logistic-bias-value', value => (+value).toFixed(1), draw); configureSlider('logistic-threshold', .1, .9, .5, .05, 'logistic-threshold-value', value => (+value).toFixed(2), draw); draggable(sim.canvas, points, draw); generate();
}

function initKnn() {
  const sim = setupCanvas('knn-canvas'); const points = []; const target = { x: sim.width / 2, y: sim.height / 2 }; const colors = ['#0f8b8d', '#ea6048', '#7357c8', '#d28b2e'];
  get('knn-learning').innerHTML = '<strong>가까운 이웃 거리 순위</strong><ol id="knn-distance-list"></ol>';
  const draw = () => { const k = +get('knn-k').value; sim.ctx.clearRect(0, 0, sim.width, sim.height); drawGrid(sim.ctx, sim.width, sim.height); const neighbors = points.map(point => ({ ...point, distance: Math.hypot((point.x - target.x) / sim.width * 100, (point.y - target.y) / sim.height * 100) })).sort((a, b) => a.distance - b.distance).slice(0, k); const votes = {}; neighbors.forEach(point => { votes[point.group] = (votes[point.group] || 0) + 1; }); const winner = +(Object.keys(votes).sort((a, b) => votes[b] - votes[a])[0] || 0); points.forEach(point => { sim.ctx.fillStyle = colors[point.group]; sim.ctx.beginPath(); sim.ctx.arc(point.x, point.y, 6, 0, Math.PI * 2); sim.ctx.fill(); }); neighbors.forEach((point, index) => { sim.ctx.strokeStyle = '#7357c8'; sim.ctx.beginPath(); sim.ctx.moveTo(target.x, target.y); sim.ctx.lineTo(point.x, point.y); sim.ctx.stroke(); sim.ctx.fillStyle = '#7357c8'; sim.ctx.font = 'bold 12px sans-serif'; sim.ctx.fillText(`${index + 1}`, point.x + 8, point.y - 8); }); sim.ctx.fillStyle = '#17202a'; sim.ctx.beginPath(); sim.ctx.arc(target.x, target.y, 11, 0, Math.PI * 2); sim.ctx.fill(); get('knn-neighbors').textContent = `${k}개`; get('knn-result').textContent = `그룹 ${winner + 1}`; get('knn-votes').textContent = Object.entries(votes).map(([group, vote]) => `${+group + 1}번 ${vote}표`).join(' / '); get('knn-distance-list').innerHTML = neighbors.map((point, index) => `<li>${index + 1}위 · 그룹 ${point.group + 1} · 거리 ${point.distance.toFixed(1)}</li>`).join(''); };
  const generate = () => { points.length = 0; const entered = parseInput('knn', sim.width, sim.height, true); if (entered) { points.push(...entered); draw(); return; } const groups = +get('knn-groups').value; const count = +get('knn-count').value; const layout = randomChoice(['corners', 'diagonal', 'center']); const centers = Array.from({ length: groups }, (_, group) => layout === 'corners' ? { x: sim.width * (group % 2 ? .72 : .28), y: sim.height * (group < 2 ? .3 : .72) } : layout === 'diagonal' ? { x: sim.width * (.2 + group / Math.max(groups - 1, 1) * .6), y: sim.height * (.75 - group / Math.max(groups - 1, 1) * .5) } : { x: randomBetween(sim.width * .2, sim.width * .8), y: randomBetween(sim.height * .2, sim.height * .8) }); for (let group = 0; group < groups; group++) for (let index = 0; index < count; index++) points.push({ x: clamp(centers[group].x + randomNormal(0, 55), 12, sim.width - 12), y: clamp(centers[group].y + randomNormal(0, 48), 12, sim.height - 12), group }); draw(); };
  configureSlider('knn-k', 1, 15, 3, 2, 'knn-k-value', value => value, draw); configureSlider('knn-groups', 2, 4, 2, 1, 'knn-groups-value', value => value, generate); configureSlider('knn-count', 6, 24, 12, 1, 'knn-count-value', value => value, generate); draggable(sim.canvas, [target], draw); generate();
}

function initKmeans() {
  const sim = setupCanvas('kmeans-canvas'); const points = []; const centers = []; const colors = ['#d28b2e', '#0f8b8d', '#ea6048', '#7357c8', '#2563eb'];
  get('kmeans-learning').innerHTML = '<strong>학습 과정</strong><span id="kmeans-learning-text"></span><ul id="kmeans-cluster-list"></ul>';
  let previousCenters = [];
  const draw = () => { sim.ctx.clearRect(0, 0, sim.width, sim.height); drawGrid(sim.ctx, sim.width, sim.height); points.forEach(point => { sim.ctx.fillStyle = colors[point.cluster % colors.length]; sim.ctx.beginPath(); sim.ctx.arc(point.x, point.y, 6, 0, Math.PI * 2); sim.ctx.fill(); }); previousCenters.forEach((center, index) => { if (!centers[index]) return; sim.ctx.strokeStyle = colors[index]; sim.ctx.setLineDash([5, 4]); sim.ctx.beginPath(); sim.ctx.moveTo(center.x, center.y); sim.ctx.lineTo(centers[index].x, centers[index].y); sim.ctx.stroke(); sim.ctx.setLineDash([]); }); centers.forEach((center, index) => { sim.ctx.strokeStyle = colors[index]; sim.ctx.lineWidth = 4; sim.ctx.beginPath(); sim.ctx.arc(center.x, center.y, 12, 0, Math.PI * 2); sim.ctx.stroke(); }); const clusterStats = centers.map((center, index) => { const clusterPoints = points.filter(point => point.cluster === index); const error = clusterPoints.reduce((sum, point) => sum + Math.hypot(point.x - center.x, point.y - center.y) ** 2, 0); return { count: clusterPoints.length, error }; }); const totalError = clusterStats.reduce((sum, stat) => sum + stat.error, 0); get('kmeans-result').textContent = `${centers.length}개`; get('kmeans-learning-text').textContent = `점 할당 후 각 그룹의 평균 위치로 중심을 이동합니다. WCSS ${totalError.toFixed(0)}`; get('kmeans-cluster-list').innerHTML = clusterStats.map((stat, index) => `<li>클러스터 ${index + 1}: ${stat.count}개 · 오차 ${stat.error.toFixed(0)}</li>`).join(''); };
  const generate = () => { points.length = 0; centers.length = 0; previousCenters = []; const clusterCount = +get('kmeans-k').value; const entered = parseInput('kmeans', sim.width, sim.height, false); if (entered) points.push(...entered.map((point, index) => ({ ...point, cluster: index % clusterCount }))); else { const count = +get('kmeans-count').value; const layout = randomChoice(['spread', 'diagonal', 'compact']); const sourceCenters = Array.from({ length: clusterCount }, (_, cluster) => layout === 'spread' ? { x: sim.width * (.18 + cluster % 3 * .32), y: sim.height * (.25 + Math.floor(cluster / 3) * .45) } : layout === 'diagonal' ? { x: sim.width * (.18 + cluster / Math.max(clusterCount - 1, 1) * .64), y: sim.height * (.75 - cluster / Math.max(clusterCount - 1, 1) * .5) } : { x: randomBetween(sim.width * .3, sim.width * .7), y: randomBetween(sim.height * .3, sim.height * .7) }); for (let index = 0; index < count; index++) { const cluster = index % clusterCount; points.push({ x: clamp(sourceCenters[cluster].x + randomNormal(0, layout === 'compact' ? 75 : 45), 12, sim.width - 12), y: clamp(sourceCenters[cluster].y + randomNormal(0, layout === 'compact' ? 65 : 40), 12, sim.height - 12), cluster }); } } for (let index = 0; index < clusterCount; index++) centers.push({ x: randomBetween(50, sim.width - 50), y: randomBetween(50, sim.height - 50) }); get('kmeans-step').textContent = '0'; get('kmeans-status').textContent = '초기화됨'; draw(); };
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
  const generate = () => { points.length = 0; const entered = parseInput('tree', sim.width, sim.height, true); if (entered) { points.push(...entered); draw(); return; } const pattern = randomChoice(['quadrant', 'diagonal', 'horizontal', 'circle']); for (let index = 0; index < 36; index++) { const x = randomBetween(30, sim.width - 30); const y = randomBetween(30, sim.height - 30); const nx = x / sim.width; const ny = y / sim.height; const label = pattern === 'quadrant' ? (nx > .5) !== (ny > .5) ? 1 : 0 : pattern === 'diagonal' ? ny < nx ? 1 : 0 : pattern === 'horizontal' ? ny < .5 ? 1 : 0 : Math.hypot(nx - .5, ny - .5) < .28 ? 1 : 0; points.push({ x, y, label }); } draw(); };
  window.resetTree = generate;
  configureSlider('tree-depth', 1, 2, 2, 1, 'tree-depth-value', value => value, draw);
  draggable(sim.canvas, points, draw);
  generate();
}

function initSvm() {
  const sim = setupCanvas('svm-canvas'); const points = [];
  get('svm-learning').innerHTML = '<strong>마진 관찰</strong><span id="svm-learning-text"></span>';
  const draw = () => { const margin = +get('svm-margin').value; const slope = +get('svm-angle').value; const centerX = sim.width / 2; const centerY = sim.height / 2; const normal = Math.hypot(1, slope); const normalX = -slope / normal; const normalY = 1 / normal; sim.ctx.clearRect(0, 0, sim.width, sim.height); drawGrid(sim.ctx, sim.width, sim.height); sim.ctx.strokeStyle = '#7357c8'; sim.ctx.lineWidth = 3; sim.ctx.beginPath(); sim.ctx.moveTo(0, centerY + slope * -centerX); sim.ctx.lineTo(sim.width, centerY + slope * (sim.width - centerX)); sim.ctx.stroke(); sim.ctx.setLineDash([6, 5]); for (const sign of [-1, 1]) { sim.ctx.beginPath(); sim.ctx.moveTo(sign * normalX * margin, centerY + slope * -centerX + sign * normalY * margin); sim.ctx.lineTo(sim.width + sign * normalX * margin, centerY + slope * (sim.width - centerX) + sign * normalY * margin); sim.ctx.stroke(); } sim.ctx.setLineDash([]); let support = 0; let errors = 0; let violations = 0; points.forEach(point => { const distance = (slope * point.x - point.y + centerY - slope * centerX) / normal; const isSupport = Math.abs(distance) <= margin + 8; const isViolation = Math.abs(distance) <= margin; const isError = (point.group === 1 && distance < 0) || (point.group === -1 && distance > 0); if (isSupport) support++; if (isViolation) violations++; if (isError) errors++; sim.ctx.fillStyle = point.group === 1 ? '#2563eb' : '#ea6048'; sim.ctx.beginPath(); sim.ctx.arc(point.x, point.y, isSupport ? 10 : 7, 0, Math.PI * 2); sim.ctx.fill(); if (isError) { sim.ctx.strokeStyle = '#d93025'; sim.ctx.lineWidth = 4; sim.ctx.stroke(); } else if (isSupport) { sim.ctx.strokeStyle = '#d28b2e'; sim.ctx.lineWidth = 3; sim.ctx.stroke(); } }); get('svm-support').textContent = `${support}개`; get('svm-errors').textContent = `${errors}개`; get('svm-result').textContent = `${margin}px`; get('svm-learning-text').textContent = `마진 안쪽 ${violations}개 · 오분류 ${errors}개 · 금색은 경계에 가까운 점, 빨간 테두리는 오분류입니다.`; };
  const reset = () => { points.length = 0; const entered = parseInput('svm', sim.width, sim.height, true); if (entered) { points.push(...entered.map(point => ({ ...point, group: point.label ? 1 : -1 }))); draw(); return; } const pattern = randomChoice(['separated', 'diagonal', 'noisy']); const generatedSlope = pattern === 'diagonal' ? randomBetween(-1.1, 1.1) : +get('svm-angle').value; for (let index = 0; index < 12; index++) { const group = index % 2 ? -1 : 1; const x = randomBetween(sim.width * .12, sim.width * .88); const baseY = sim.height / 2 + generatedSlope * (x - sim.width / 2); const offset = -group * randomBetween(55, 110) + (pattern === 'noisy' ? randomNormal(0, 35) : 0); points.push({ x, y: clamp(baseY + offset, 14, sim.height - 14), group }); } draw(); };
  window.resetSvm = reset; configureSlider('svm-margin', 20, 90, 40, 1, 'svm-margin-value', value => value, draw); configureSlider('svm-angle', -2, 2, -.5, .1, 'svm-angle-value', value => (+value).toFixed(1), draw); draggable(sim.canvas, points, draw); reset();
}

window.resetLinear = () => openSimulator('linear');
window.resetLogistic = () => openSimulator('logistic');
window.resetKnn = () => openSimulator('knn');
renderCards();
