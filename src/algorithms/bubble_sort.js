const time = 10
let delay = 0


const swap = (array, index_before, index_after) => {
  let temp = array[index_before]
  array[index_before] = array[index_after]
  array[index_after] = temp
  document.getElementById(
    `sort-${index_before}`,
  ).style.height = `${array[index_before]}px`
  document.getElementById(
    `sort-${index_after}`,
  ).style.height = `${array[index_after]}px`
}

const bubble_sort = (array, timeouts) => {
  delay = 0
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      timeouts.push(
        setTimeout(() => {
          if (j > 0) {
            document
              .getElementById(`sort-${j - 1}`)
              .classList.remove('bar-select')
          }
          document.getElementById(`sort-${j}`).classList.add('bar-select')
          document.getElementById(`sort-${j + 1}`).classList.add('bar-select')
          if (array[j] > array[j + 1]) {
            swap(array, j, j + 1)
          }
        }, delay++ * time),
      )
    }
  }
  let start_time = delay++ * time
  delay = 0
  for (let i = 0; i < array.length; i++) {
    timeouts.push(
      setTimeout(() => {
        document.getElementById(`sort-${i}`).classList.remove('bar-select')
      }, delay++ * time + start_time),
    )
  }
  return timeouts
}

export default bubble_sort
