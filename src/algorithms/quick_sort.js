const time = 10
let delay = 0

const setSelectPivot = (index, timeouts) => {
  timeouts.push(
    setTimeout(() => {
      document.getElementById(`sort-${index}`).classList.add('bar-pivot')
    }, delay++ * time)
  )
}

const deSelectPivot = (index, timeouts) => {
  timeouts.push(
    setTimeout(() => {
      document.getElementById(`sort-${index}`).classList.remove('bar-pivot')
    }, delay * time)
  )
}

const setSelectFrontBar = (index, timeouts) => {
  timeouts.push(
    setTimeout(() => {
      if (index > 0) {
        document
          .getElementById(`sort-${index - 1}`)
          .classList.remove('bar-select')
      }
      document.getElementById(`sort-${index}`).classList.add('bar-select')
    }, delay++ * time)
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
    }, delay++ * time)
  )
}

const setSelect = (index, timeouts) => {
  timeouts.push(
    setTimeout(() => {
      document.getElementById(`sort-${index}`).classList.add('bar-select')
    }, delay++ * time)
  )
}

const swap = (array, index_before, index_after, timeouts) => {
  let temp = array[index_before]
  array[index_before] = array[index_after]
  array[index_after] = temp
  let before = array[index_before]
  let after = array[index_after]
  timeouts.push(
    setTimeout(() => {
      document.getElementById(
        `sort-${index_before}`,
      ).style.height = `${before}px`
      document.getElementById(`sort-${index_after}`).style.height = `${after}px`
    }, delay++ * time)
  )
}

const quicksort = (arr, start, end, timeouts) => {
  if (start >= end) {
    return
  }
  let i = start,
    j = end
  let pivot = arr[start]
  setSelectPivot(start, timeouts)
  while (i < j) {
    setSelectFrontBar(i, timeouts)
    while (pivot >= arr[i] && i < j) {
      i++
      setSelectFrontBar(i, timeouts)
    }
    setSelectBackBar(j, arr.length - 1, timeouts)
    while (pivot < arr[j] && i <= j) {
      j--
      setSelectBackBar(j, arr.length - 1, timeouts)
    }
    if (i < j) {
      swap(arr, i, j, timeouts)
    }
  }
  swap(arr, start, j, timeouts)
  deSelectPivot(start, timeouts)
  quicksort(arr, start, j - 1, timeouts)
  quicksort(arr, j + 1, end, timeouts)
  setSelect(j, timeouts)
}

const startQuickSort = (arr, start, end, timeouts, cb) => {
  delay = 0
  quicksort(arr, start, end, timeouts)
  for (let i = 0; i < arr.length; i++) {
    timeouts.push(
      setTimeout(() => {
        document.getElementById(`sort-${i}`).classList.remove('bar-select')
      }, delay * time + 10 * i)
    )
  }
  timeouts.push(
    setTimeout(() => {
      cb(arr)
    }, delay * time + 10 * arr.length)
  )
  return timeouts
}

export default startQuickSort
