import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from '/containers/Main/Main'
import PathfindingVisualizer from '/containers/PathfindingVisualizer/PathfindingVisualizer'
import SortVisualizer from '/containers/SortVisualizer/SortVisualizer'
import '/App.css'

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route path='/shorest-path'>
					<PathfindingVisualizer />
				</Route>
				<Route path='/sort'>
					<SortVisualizer />
				</Route>
				<Route path='/'>
					<Main />
				</Route>
			</Switch>
		</div>
	)
}

export default App
