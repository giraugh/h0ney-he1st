import { useState, useEffect } from 'react'
import { useCookieState } from 'use-cookie-state'

import { fetchBear } from 'services/bear'

const useCurrentBear = () => {
  const [bearName, setBearName] = useCookieState('honey-heist-bear', '')
  const [gamecode, setGamecode] = useCookieState('honey-heist-code', '')
  const [bear, setBear] = useState()

  useEffect(() => {
    if (bearName && gamecode) {
      fetchBear({ bear_name: bearName, gamecode })
        .then(bear => setBear(bear))
    }
  }, [bearName])

  const setCurrentBear = ({ gamecode, bear }) => {
    setBearName(bear?.bear_name)
    setGamecode(gamecode)
  }

  return [bear, setCurrentBear]
}

export default useCurrentBear
