const graph = [
	[0, 8, 2, 5, 0, 0, 0, 0],
	[8, 0, 0, 2, 0, 13, 0, 0],
	[2, 0, 0, 2, 5, 0, 0, 0],
	[5, 2, 2, 0, 1, 6, 3, 0],
	[0, 0, 5, 1, 0, 0, 1, 0],
	[0, 13, 0, 6, 0, 0, 2, 3],
	[0, 0, 0, 3, 1, 2, 0, 6],
	[0, 0, 0, 0, 0, 6, 3, 0],
]

const createGraph = graph => {
	const newGraph = []
	let newGraphIndexRow = 0
	for (let i = 0; i < graph[0].length; i++) {
		for (let j = 0; j < graph[0].length; j++) {
			newGraph[newGraphIndexRow] = []
			let newGraphIndexCol = 0
			graph.forEach((rows, row_i) => {
				rows.forEach((item, item_i) => {
					if (j === item.col && i - 1 === item.row) {
						newGraph[newGraphIndexRow][newGraphIndexCol] = 1
					} else if (j - 1 === item.col && i === item.row) {
						newGraph[newGraphIndexRow][newGraphIndexCol] = 1
					} else if (j + 1 === item.col && i === item.row) {
						newGraph[newGraphIndexRow][newGraphIndexCol] = 1
					} else if (j === item.col && i + 1 === item.row) {
						newGraph[newGraphIndexRow][newGraphIndexCol] = 1
					} else if (j === item.col && i === item.row) {
						newGraph[newGraphIndexRow][newGraphIndexCol] = 0
					} else {
						newGraph[newGraphIndexRow][newGraphIndexCol] = Infinity
					}
					newGraphIndexCol++
				})
			})
			newGraphIndexRow++
		}
	}
	return newGraph
}

const indexToRowColumn = (path, colLength) => {
	for (let i = 0; i < path.length; i++) {
		path[i] = {
			row: parseInt(path[i] / colLength),
			col: path[i] - parseInt(path[i] / colLength) * colLength,
		}
	}
	return path
}

let select = [],
	answer = [],
	min = Infinity,
	choose = 7,
	start = choose,
	u = [],
	v = [],
	V = graph.length,
	show_index = 0

const dijkstra = (graph, startNode, endNode) => {
	const newGraph = createGraph(graph)
	let select = [],
		min = Infinity,
		choose = startNode[0] * graph[0].length + startNode[1],
		start = choose,
		u = [],
		v = [],
		rowLength = graph.length,
		colLength = graph[0].length,
		sumLength = rowLength * colLength
	show_index = 0

	for (let i = 0; i < sumLength; i++) {
		select[i] = 0
		path[i] = choose
	}

	select[choose] = 1
	u[choose] = 0

	for (let i = 0; i < sumLength; i++) {
		v[i] = newGraph[choose][i]
	}

	for (let i = 0; i < sumLength; i++) {
		select[choose] = 1
		min = Infinity
		for (let j = 0; j < sumLength; j++) {
			if (u[choose] + newGraph[choose][j] < v[j] && choose != j) {
				v[j] = u[choose] + newGraph[choose][j]
				path[j] = choose
			}
		}

		for (let j = 0; j < sumLength; j++) {
			if (v[j] < min && choose !== j && select[j] === 0) {
				min = v[j]
				choose = j
				u[j] = min
			}
		}

		// if (choose === endNode[0] * graph[0].length + endNode[1]) {
		// 	break
		// }
	}

	let from = path[endNode[0] * graph[0].length + endNode[1]],
		show = []
	show[0] = from
	for (let j = 1; j < sumLength; j++) {
		if (from === start) {
			break
		}
		show[j] = path[from]
		from = path[from]
	}

	return indexToRowColumn(show, colLength)
}

const path = new Array()

for (let i = 0; i < V; i++) {
	select[i] = 0
	path[i] = choose
	for (let j = 0; j < V; j++) {
		if (i !== j && graph[i][j] === 0) {
			graph[i][j] = Infinity
		}
	}
}

select[choose] = 1
u[choose] = 0

for (let i = 0; i < V; i++) {
	v[i] = graph[choose][i]
}

for (let i = 0; i < V; i++) {
	select[choose] = 1
	min = Infinity
	for (let j = 0; j < V; j++) {
		if (u[choose] + graph[choose][j] < v[j] && choose != j) {
			v[j] = u[choose] + graph[choose][j]
			path[j] = choose
		}
	}

	for (let j = 0; j < V; j++) {
		if (v[j] < min && choose !== j && select[j] === 0) {
			min = v[j]
			choose = j
			u[j] = min
		}
	}
	console.log(v)
}
console.log('------------------')
console.log(path)
let show = []
for (let i = 0; i < V; i++) {
	show[i] = []
	show[i][0] = path[i]
	let from = path[i]
	for (let j = 1; j < V; j++) {
		if (from === start) {
			break
		}
		show[i][j] = path[from]
		from = path[from]
	}
}
console.log(show)

export default dijkstra
