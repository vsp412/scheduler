//switching from one mode to another, to facilitate component switching i.e. transitioning between components
import React, {useState, useEffect} from "react"
export default function useVisualMode (m) {
  const [mode, setMode] = useState(m);
  const [history, setHistory] = useState([m]);
  const transition = function (nM, replace = false) {
    setMode(nM);
    if (replace) {
      setHistory(p => [...p])
    } else {
      setHistory(p => [...p, nM])
    }  
  }
  const back = function () {
    let mde;
    if (history.length === 1) {
      mde = history[0];
    }
    setHistory(p => [...p].slice(0, -1));
    mde = history.slice(-2)[0]
    setMode(mde);
  }
  return { mode, transition, back };
} 



