const time = 5
let time_index = 0
const merge = (array, low, mid, high, timeouts) => {
  let l = low, m = mid + 1, arr_sort = [], arr_sort_index = 0

  while (l <= mid || m <= high) {
    if ((array[l] <= array[m] && l <= mid) || m > high) {
      arr_sort[arr_sort_index++] = array[l++]
    } else if ((array[m] < array[l] && m <= high) || l > mid) {
      arr_sort[arr_sort_index++] = array[m++]
    }
  }

  for (let i = 0; i < arr_sort.length; i++) {
    array[low + i] = arr_sort[i]
    timeouts.push(
      setTimeout(() => {
        document.getElementById(
          `sort-${low + i}`,
        ).style.height = `${arr_sort[i]}px`
      }, time * time_index++)
    )
  }
}

const merge_sort = (array, low, high, timeouts) => {
  if (low < high) {
    const mid = parseInt((low + high) / 2)
    merge_sort(array, low, mid, timeouts)
    merge_sort(array, mid + 1, high, timeouts)
    merge(array, low, mid, high, timeouts)
  }
}

const start_merge_sort = (array, low, high, timeouts, cb) => {
  time_index = 0
  merge_sort(array, low, high, timeouts)
  timeouts.push(
    setTimeout(() => {
      cb(array)
    }, time * time_index++)
  )
  return timeouts
}

export default start_merge_sort