import { useState } from 'react'

export default function useVisualMode (initial) {
  const [history, setHistory] = useState([initial])

  //this mode is not like const[mode] from above, this function
  //being exported
  // function transition (mode, replace = false) {
  //   const newHistory = [...history]

  //   if (replace) {
  //     newHistory.pop()
  //   }

  //   setHistory([...newHistory, mode])
  // }

function transition (mode, replace = false) {
  if (replace) {
    setHistory(prev => {
      return [...prev.slice(0, prev.length-1), mode]
    })
  } else {
    setHistory(prev => {
      return [...prev, mode]
    })
  }
}

  function back () {
    //has to be at least 2 items for this function to work to delete the lasts mode
    //could also be history.length = 1 but does not eliminate the chance of history.length = 0
    if (history.length < 2) {
      return
    }
    const newHistory = [...history]
    newHistory.pop()
    setHistory(newHistory)
  }

  const mode = history[history.length - 1]
  return { mode, transition, back }
}

//for the test case with (THIRD, replace = true) it will automatically
//setMode(mode) therefore THIRD, when you press function back which
//will use the history array instead.
