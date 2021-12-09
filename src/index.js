import React from 'react'
import ReactDOM from 'react-dom'
import MyReactDom from './MyReact15/react-dom'
import './index.css'

function App() {
  return (
    <div className="nanjing">
      <h2>测试</h2>
    </div>
  )
}
MyReactDom.render(<App />, document.getElementById('root'))
