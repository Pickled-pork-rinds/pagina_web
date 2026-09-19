const visualizer = document.getElementById('visualizer');
const btnGenerate = document.getElementById('btn-generate');
const btnStart = document.getElementById('btn-start');
const btnReset = document.getElementById('btn-reset');
const arraySizeInput = document.getElementById('array-size');
const sizeValueSpan = document.getElementById('size-value');
const speedInput = document.getElementById('speed');
const algorithmSelect = document.getElementById('algorithm-select');

const metricComparisons = document.getElementById('metric-comparisons');
const metricSwaps = document.getElementById('metric-swaps');
const metricTime = document.getElementById('metric-time');
const metricComplexity = document.getElementById('metric-complexity');

let currentArray = [];
let comparisonsCount = 0;
let swapsCount = 0;
let isSorting = false;

const complejidades = {
  selection: 'O(n²)', bubble: 'O(n²)', exchange: 'O(n²)',
  gnome: 'O(n²)', insertion: 'O(n²)', stooge: 'O(n²·⁷)',
  merge: 'O(n log n)', quick: 'O(n log n)'
};

function generateRandomArray() {
  if (isSorting) return;
  const size = parseInt(arraySizeInput.value);
  sizeValueSpan.textContent = size;
  currentArray = [];
  for (let i = 0; i < size; i++) {
    currentArray.push(Math.floor(Math.random() * 280) + 20);
  }
  resetMetrics();
  renderBars();
}

function renderBars(activeIndices = [], state = '') {
  visualizer.innerHTML = '';
  currentArray.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value}px`;
    if (activeIndices.includes(index)) bar.classList.add(state);
    visualizer.appendChild(bar);
  });
}

async function updateUI(array, indices, state, isSwap = false) {
  if (isSwap) swapsCount++;
  else comparisonsCount++;
  metricComparisons.textContent = comparisonsCount;
  metricSwaps.textContent = swapsCount;
  renderBars(indices, state);
}

function resetMetrics() {
  comparisonsCount = 0;
  swapsCount = 0;
  metricComparisons.textContent = '0';
  metricSwaps.textContent = '0';
  metricTime.textContent = '0 ms';
  metricComplexity.textContent = complejidades[algorithmSelect.value] || 'O(n²)';
}

algorithmSelect.addEventListener('change', () => {
  metricComplexity.textContent = complejidades[algorithmSelect.value] || 'O(n²)';
});

btnGenerate.addEventListener('click', generateRandomArray);
arraySizeInput.addEventListener('input', generateRandomArray);
btnReset.addEventListener('click', generateRandomArray);

btnStart.addEventListener('click', async () => {
  if (isSorting) return;
  isSorting = true;
  resetMetrics();

  const algo = algorithmSelect.value;
  const getSpeed = () => parseInt(speedInput.value);
  const startTime = performance.now();

  if (algo === 'selection') await selectionSort(currentArray, updateUI, getSpeed);
  else if (algo === 'bubble') await bubbleSortBruteForce(currentArray, updateUI, getSpeed);
  else if (algo === 'exchange') await exchangeSort(currentArray, updateUI, getSpeed);
  else if (algo === 'gnome') await gnomeSort(currentArray, updateUI, getSpeed);
  else if (algo === 'insertion') await insertionSort(currentArray, updateUI, getSpeed);
  else if (algo === 'stooge') await stoogeSort(currentArray, updateUI, getSpeed);
  else if (algo === 'merge') await mergeSort(currentArray, updateUI, getSpeed);
  else if (algo === 'quick') await quickSort(currentArray, updateUI, getSpeed);

  const endTime = performance.now();
  metricTime.textContent = `${Math.round(endTime - startTime)} ms`;
  renderBars([], 'sorted');
  isSorting = false;
});

generateRandomArray();