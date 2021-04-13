const time = 5
let time_index = 0

const get_swap_index = (arr_sort, arr_not_sort, index) => {
  for (let i = index; i < arr_sort.length; i++) {
    if (arr_sort[index] === arr_not_sort[i]) {
      return i
    }
  }
}

const select = (array_sort, array_not_sort, index_main, index) => {
  let swap_index = get_swap_index(array_sort, array_not_sort, index)
  document.getElementById(`sort-${index_main + index}`).classList.add('bar-select')
  document.getElementById(`sort-${index_main + swap_index}`).classList.add('bar-select')
}

const swap = (array_sort, array_not_sort, index_main, index) => {
  let swap_index = get_swap_index(array_sort, array_not_sort, index)
  let temp = array_not_sort[swap_index]
  array_not_sort[swap_index] = array_not_sort[index]
  array_not_sort[index] = temp

  document.getElementById(
    `sort-${index_main + index}`,
  ).style.height = `${array_not_sort[index]}px`
  document.getElementById(
    `sort-${index_main + swap_index}`,
  ).style.height = `${array_not_sort[swap_index]}px`
}

const unselect = (array_sort, array_not_sort, index_main, index) => {
  let swap_index = get_swap_index(array_sort, array_not_sort, index)
  document.getElementById(`sort-${index_main + index}`).classList.remove('bar-select')
  document.getElementById(`sort-${index_main + swap_index}`).classList.remove('bar-select')
}

const merge = (array, low, mid, high, timeouts) => {
  let l = low, m = mid + 1, arr_sort = [], arr_sort_index = 0

  while (l <= mid || m <= high) {
    if ((array[l] <= array[m] && l <= mid) || m > high) {
      arr_sort[arr_sort_index++] = array[l++]
    } else if ((array[m] < array[l] && m <= high) || l > mid) {
      arr_sort[arr_sort_index++] = array[m++]
    }
  }

  let arr_not_sort = array.slice(low, low + arr_sort.length)

  for (let i = 0; i < arr_sort.length; i++) {
    array[low + i] = arr_sort[i]

    timeouts.push(
      setTimeout(() => {
        select(arr_sort, arr_not_sort, low, i)
      }, time * time_index++)
    )
    timeouts.push(
      setTimeout(() => {
        swap(arr_sort, arr_not_sort, low, i)
      }, time * time_index++)
    )
    if (arr_sort.length !== array.length) {
      timeouts.push(
        setTimeout(() => {
          unselect(arr_sort, arr_not_sort, low, i)
        }, time * time_index++)
      )
    }
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
  for (let i = 0; i < array.length; i++) {
    timeouts.push(
      setTimeout(() => {
        document.getElementById(`sort-${i}`).classList.remove('bar-select')
      }, time * time_index++)
    )
  }
  timeouts.push(
    setTimeout(() => {
      cb(array)
    }, time * time_index++)
  )
  return timeouts
}

export default start_merge_sort