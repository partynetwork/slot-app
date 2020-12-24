import React, { useState } from 'react'
import './App.css'
import { MyBox } from './components/MyBox'
import shuffle from 'lodash/shuffle'
import sample from 'lodash/sample'

const slotItem = [
  5, 5, 5, 5, 5, 5, 5, 5, 5,
  10, 10, 10, 10, 10, 10, 10, 10, 10,
  25, 25, 25, 25, 25, 25, 25, 25, 25,
  50, 50, 50, 50, 50, 50, 50, 50,
  100, 100, 100, 100, 100, 100, 100, 100,
  500, 500,
  1000,
]
const motions = shuffle(slotItem).map((s, i) => {
  return {
    key: s,
    id: `slot-${i}-${s}`,
    className: `slot-${i}-${s}`,
    animate: null,
  }
})

function App() {
  const [state, setState] = useState({
    duration: 0,
    page: 0,
    action: 'pause',
    expectValue: sample(slotItem),
  })
  const handleSlowdown = () => {
    let nextPage = state.page + 1
    if (nextPage > motions.length - 1) {
      nextPage = 0
    }
    setState({
      ...state,
      action: 'slowdown',
      duration: state.duration + 0.005,
      page: nextPage,
    })
  }
  const handlePlay = (duration: number) => {
    let nextPage = state.page + 1
    if (nextPage > motions.length - 1) {
      nextPage = 0
    }
    setState({
      ...state,
      action: 'play',
      duration: duration,
      page: nextPage,
    })
  }
  const handleStop = () => {
    setState({
      ...state,
      action: 'stop',
      duration: 0,
    })
  }
  const animationEndFn = () => {
    if (state.action === 'play') {
      return handlePlay
    }
    if (state.action === 'slowdown') {
      return handleSlowdown
    }
    return () => null
  }
  return (
    <div className="App">
      <button onClick={() => handleStop()}>stop</button>
      <button onClick={() => handleSlowdown()}>slowdown</button>
      <button onClick={() => handlePlay(0.1)}>play</button>
      <span>Expect value: {state.expectValue}</span>
      <MyBox
        page={state.page}
        duration={state.duration}
        motions={motions}
        onItemCentered={(n) => {
          if (
            state.action === 'slowdown'
            && n.key === state.expectValue
          ) {
            handleStop()
          }
        }}
        onAnimationEnd={() => animationEndFn()(state.duration)}
      />
    </div>
  )
}

export default App
