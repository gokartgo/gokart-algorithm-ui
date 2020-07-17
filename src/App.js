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
        <Route path='/shorest-path' component={PathfindingVisualizer} />
        <Route path='/sort' component={SortVisualizer} />
        <Route path='/' component={Main} />
      </Switch>
    </div>
  )
}

export default App
