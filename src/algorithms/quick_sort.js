const time = 5
let delay = 0

const setSelectFrontBar = (index, timeouts) => {
  timeouts.push(
    setTimeout(() => {
      if (index > 0) {
        document
          .getElementById(`sort-${index - 1}`)
          .classList.remove('bar-select')
      }
      document.getElementById(`sort-${index}`).classList.add('bar-select')
    }, delay++ * time),
    10,
  )
}

const setSelectBackBar = (index, back, timeouts) => {
  timeouts.push(
    setTimeout(() => {
      if (index < back) {
        document
          .getElementById(`sort-${index + 1}`)
          .classList.remove('bar-select')
      }
      document.getElementById(`sort-${index}`).classList.add('bar-select')
    }, delay++ * time),
    10,
  )
}

const swap = (array, index_before, index_after, timeouts) => {
  let temp = array[index_before]
  array[index_before] = array[index_after]
  array[index_after] = temp
  timeouts.push(
    setTimeout(() => {
      document.getElementById(
        `sort-${index_before}`,
      ).style.height = `${array[index_before]}px`
      document.getElementById(
        `sort-${index_after}`,
      ).style.height = `${array[index_after]}px`
    }, delay++ * time),
    10,
  )
}

const quicksort = (arr, start, end, timeouts) => {
  if (start >= end) {
    return
  }
  let i = start,
    j = end
  let pivot = arr[start]
  while (i < j) {
    while (pivot >= arr[i] && i < j) {
      setSelectFrontBar(i, timeouts)
      i++
    }
    while (pivot < arr[j] && i <= j) {
      setSelectBackBar(j, arr.length - 1, timeouts)
      j--
    }
    if (i < j) {
      swap(arr, i, j, timeouts)
      j--
    }
  }
  swap(arr, start, j, timeouts)
  quicksort(arr, start, j - 1, timeouts)
  quicksort(arr, j + 1, end, timeouts)
}

const startQuickSort = (arr, start, end, timeouts, cb) => {
  delay = 0
  quicksort(arr, start, end, timeouts)
  for (let i = 0; i < arr.length; i++) {
    timeouts.push(
      setTimeout(() => {
        document.getElementById(`sort-${i}`).classList.remove('bar-select')
      }, delay * time + 10 * i),
    )
  }
  timeouts.push(
    setTimeout(() => {
      cb(arr)
    }, delay * time + 10 * arr.length),
  )
  return timeouts
}

export default startQuickSort
