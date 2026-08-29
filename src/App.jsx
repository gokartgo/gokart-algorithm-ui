import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from '@/containers/Main/Main'
import PathfindingVisualizer from '@/containers/PathfindingVisualizer/PathfindingVisualizer'
import SortVisualizer from '@/containers/SortVisualizer/SortVisualizer'
import '@/App.css'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/shorest-path' element={<PathfindingVisualizer />} />
        <Route path='/sort' element={<SortVisualizer />} />
        <Route path='*' element={<Main />} />
      </Routes>
    </div>
  )
}

export default App
