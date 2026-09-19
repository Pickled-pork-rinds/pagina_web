// Helper de pausa para la animación
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Resalta comparación (Amarillo)
async function comparar(array, i, j, updateUI, getSpeed) {
  await updateUI(array, [i, j], 'comparing');
  await sleep(101 - getSpeed());
}

// Resalta e intercambia valores (Rojo)
async function intercambiar(array, i, j, updateUI, getSpeed) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  await updateUI(array, [i, j], 'swapping', true);
  await sleep(101 - getSpeed());
}

// 1. Selection Sort
async function selectionSort(array, updateUI, getSpeed) {
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      await comparar(array, minIdx, j, updateUI, getSpeed);
      if (array[j] < array[minIdx]) minIdx = j;
    }
    if (minIdx !== i) await intercambiar(array, i, minIdx, updateUI, getSpeed);
  }
}

// 2. Bubble Sort Brute Force
async function bubbleSortBruteForce(array, updateUI, getSpeed) {
  let n = array.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1; j++) {
      await comparar(array, j, j + 1, updateUI, getSpeed);
      if (array[j] > array[j + 1]) await intercambiar(array, j, j + 1, updateUI, getSpeed);
    }
  }
}

// 3. Exchange Sort
async function exchangeSort(array, updateUI, getSpeed) {
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      await comparar(array, i, j, updateUI, getSpeed);
      if (array[j] < array[i]) await intercambiar(array, i, j, updateUI, getSpeed);
    }
  }
}

// 4. Gnome Sort
async function gnomeSort(array, updateUI, getSpeed) {
  let i = 0, n = array.length;
  while (i < n) {
    if (i === 0) i++;
    else {
      await comparar(array, i, i - 1, updateUI, getSpeed);
      if (array[i] >= array[i - 1]) i++;
      else {
        await intercambiar(array, i, i - 1, updateUI, getSpeed);
        i--;
      }
    }
  }
}

// 5. Insertion Sort
async function insertionSort(array, updateUI, getSpeed) {
  let n = array.length;
  for (let i = 1; i < n; i++) {
    let clave = array[i];
    let j = i - 1;
    while (j >= 0) {
      await comparar(array, j, j + 1, updateUI, getSpeed);
      if (array[j] > clave) {
        array[j + 1] = array[j];
        await updateUI(array, [j, j + 1], 'swapping', true);
        await sleep(101 - getSpeed());
        j--;
      } else break;
    }
    array[j + 1] = clave;
    await updateUI(array, [j + 1], 'swapping', true);
  }
}

// 6. Stooge Sort
async function stoogeSort(array, updateUI, getSpeed, l = 0, h = array.length - 1) {
  if (l >= h) return;
  await comparar(array, l, h, updateUI, getSpeed);
  if (array[l] > array[h]) await intercambiar(array, l, h, updateUI, getSpeed);

  if (h - l + 1 > 2) {
    let t = Math.floor((h - l + 1) / 3);
    await stoogeSort(array, updateUI, getSpeed, l, h - t);
    await stoogeSort(array, updateUI, getSpeed, l + t, h);
    await stoogeSort(array, updateUI, getSpeed, l, h - t);
  }
}

// 7. Merge Sort
async function mergeSort(array, updateUI, getSpeed, start = 0, end = array.length - 1) {
  if (start >= end) return;
  let mid = Math.floor((start + end) / 2);
  await mergeSort(array, updateUI, getSpeed, start, mid);
  await mergeSort(array, updateUI, getSpeed, mid + 1, end);

  let leftHalf = array.slice(start, mid + 1);
  let rightHalf = array.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;

  while (i < leftHalf.length && j < rightHalf.length) {
    await updateUI(array, [k], 'comparing');
    await sleep(101 - getSpeed());
    if (leftHalf[i] < rightHalf[j]) { array[k] = leftHalf[i]; i++; }
    else { array[k] = rightHalf[j]; j++; }
    await updateUI(array, [k], 'swapping', true);
    await sleep(101 - getSpeed());
    k++;
  }
  while (i < leftHalf.length) {
    array[k] = leftHalf[i]; i++;
    await updateUI(array, [k], 'swapping', true);
    await sleep(101 - getSpeed());
    k++;
  }
  while (j < rightHalf.length) {
    array[k] = rightHalf[j]; j++;
    await updateUI(array, [k], 'swapping', true);
    await sleep(101 - getSpeed());
    k++;
  }
}

// 8. Quick Sort
async function quickSort(array, updateUI, getSpeed, low = 0, high = array.length - 1) {
  if (low < high) {
    let pivotIdx = await partition(array, low, high, updateUI, getSpeed);
    await quickSort(array, updateUI, getSpeed, low, pivotIdx);
    await quickSort(array, updateUI, getSpeed, pivotIdx + 1, high);
  }
}

async function partition(array, low, high, updateUI, getSpeed) {
  let pivot = array[Math.floor((low + high) / 2)];
  let i = low - 1, j = high + 1;
  while (true) {
    do { i++; await comparar(array, i, Math.floor((low + high) / 2), updateUI, getSpeed); } while (array[i] < pivot);
    do { j--; await comparar(array, j, Math.floor((low + high) / 2), updateUI, getSpeed); } while (array[j] > pivot);
    if (i >= j) return j;
    await intercambiar(array, i, j, updateUI, getSpeed);
  }
}