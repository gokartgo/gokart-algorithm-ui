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

const dijkstra = () => {}

const path = new Array()

let select = [],
	answer = [],
	min = Infinity,
	choose = 7,
	start = choose,
	u = [],
	v = [],
	V = graph.length,
	show_index = 0

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
