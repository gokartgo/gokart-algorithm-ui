const createGraph = graph => {
	const newGraph = []
	for (let i = 0; i < graph.length; i++) {
		newGraph[i] = []
		for (let j = 0; j < graph[0].length; j++) {
			newGraph[i][j] = []
			graph.forEach((rows, row_i) => {
				newGraph[i][j][row_i] = []
				rows.forEach((col, col_i) => {
					newGraph[i][j][row_i][col_i] = col
					if (j === col.col && i - 1 === col.row) {
						newGraph[i][j][row_i][col_i] = 1
					} else if (j - 1 === col.col && i === col.row) {
						newGraph[i][j][row_i][col_i] = 1
					} else if (j + 1 === col.col && i === col.row) {
						newGraph[i][j][row_i][col_i] = 1
					} else if (j === col.col && i + 1 === col.row) {
						newGraph[i][j][row_i][col_i] = 1
					} else if (j === col.col && i === col.row) {
						newGraph[i][j][row_i][col_i] = 0
					} else {
						newGraph[i][j][row_i][col_i] = Infinity
					}
				})
			})
		}
	}
	return newGraph
}

let find_path = null,
	travel = null

const dijkstra = (graph, startNode, endNode) => {
	const newGraph = createGraph(graph)
	console.log(newGraph)
	let select = [],
		min = Infinity,
		choose = startNode,
		u = [], // min value
		v = [], // all path of one point is we choose
		rowLength = graph.length,
		colLength = graph[0].length,
		isBreak = false,
		path = [], // use for contain travel shorest value
		find_path_index = 0

	travel = []
	find_path = []

	for (let i = 0; i < rowLength; i++) {
		select[i] = []
		path[i] = []
		u[i] = []
		v[i] = []
		for (let j = 0; j < colLength; j++) {
			select[i][j] = 0
			path[i][j] = choose
			v[i][j] = newGraph[choose[0]][choose[1]][i][j]
		}
	}

	select[choose[0]][choose[1]] = 1
	u[choose[0]][choose[1]] = 0

	for (let i = 0; i < rowLength; i++) {
		for (let j = 0; j < colLength; j++) {
			select[choose[0]][choose[1]] = 1
			min = Infinity

			for (let k = 0; k < rowLength; k++) {
				for (let l = 0; l < colLength; l++) {
					if (
						u[choose[0]][choose[1]] + newGraph[choose[0]][choose[1]][k][l] <
							v[k][l] &&
						(choose[0] !== k || choose[1] !== l)
					) {
						v[k][l] =
							u[choose[0]][choose[1]] + newGraph[choose[0]][choose[1]][k][l]
						path[k][l] = choose
					}
				}
			}

			for (let k = 0; k < rowLength; k++) {
				for (let l = 0; l < colLength; l++) {
					if (
						v[k][l] < min &&
						(choose[0] !== k || choose[1] !== l) &&
						select[k][l] === 0
					) {
						min = v[k][l]
						choose = [k, l]
						u[k][l] = min
					}
				}
			}
			find_path[find_path_index] = choose
			if (
				(find_path[find_path_index][1] + 1 === endNode[1] &&
					find_path[find_path_index][0] === endNode[0]) ||
				(find_path[find_path_index][1] - 1 === endNode[1] &&
					find_path[find_path_index][0] === endNode[0]) ||
				(find_path[find_path_index][1] === endNode[1] &&
					find_path[find_path_index][0] + 1 === endNode[0]) ||
				(find_path[find_path_index][1] === endNode[1] &&
					find_path[find_path_index][0] - 1 === endNode[0])
			) {
				path[endNode[0]][endNode[1]] = choose
				isBreak = true
				break
			}
			find_path_index++
		}
		if (isBreak) {
			break
		}
	}

	let from = endNode
	for (let j = 0; j < rowLength * colLength; j++) {
		travel[j] = path[from[0]][from[1]]
		from = path[from[0]][from[1]]
		if (from[0] === startNode[0] && from[1] === startNode[1]) {
			break
		}
	}

	return [find_path, travel]
}

export const findPathGraph = (graph, startNode, endNode) => {
	if (find_path === null) {
		dijkstra(graph, startNode, endNode)
	}
	return find_path
}

export const travelGraph = (graph, startNode, endNode) => {
	if (travel === null) {
		dijkstra(graph, startNode, endNode)
	}
	return travel
}

export default dijkstra
