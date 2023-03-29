import { useEffect, useState } from 'react'
import './App.scss'
import words from './names.json'

export default function App() {
  const aToZ = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')
  const startLife = 8
  const [gameOn, setgameOn] = useState(false)
  const [answer, setanswer] = useState('')
  const [selectedLetter, setselectedLetter] = useState([])
  const [life, setlife] = useState(0)
  const [gameWon, setgameWon] = useState(false)
  const [gameLost, setgameLost] = useState(false)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    function handleKeyPress(e) {
      const selectedKey = e.key.toUpperCase()
      if (aToZ.includes(selectedKey)) {
        haddleSelectedLetter(selectedKey)
      }
      if (selectedKey === 'ENTER' && (!gameOn || gameWon || gameLost)) {
        onClickNewGame()
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [selectedLetter])

  function onClickNewGame() {
    setgameOn(true)
    setgameWon(false)
    setgameLost(false)
    setselectedLetter([])
    setlife(startLife)
    setanswer(words[Math.floor(Math.random() * words.length)].toUpperCase())
  }

  function onClickLetter(e) {
    if (!e.target.disabled) {
      haddleSelectedLetter(e.target.value)
    }
  }

  function haddleSelectedLetter(x) {
    if (!selectedLetter.includes(x)) {
      setselectedLetter((pre) => {
        if (
          answer &&
          answer.split('').every((x2) => [...pre, x].includes(x2))
        ) {
          setgameWon(true)
          return []
        } else {
          return [...pre, x]
        }
      })
      if (!answer.includes(x)) {
        setlife((pre) => {
          if (pre > 1) {
            return pre - 1
          } else {
            setgameLost(true)
            return 0
          }
        })
      }
    }
  }

  return (
    <div className='App'>
      {gameOn && (
        <>
          <button className='game-start-btn' onClick={onClickNewGame}>
            Give up - New game
          </button>
        </>
      )}
      {/* <div className='hangman-container'>
        <div className='line-one'></div>
        <div className='line-two'></div>
        <div className='line-three'></div>
        <div className='line-four'></div>
        {['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'].map(
          (x, i) => {
            if (startLife - life > i) return <div className={x} key={i}></div>
          }
        )}
      </div> */}
      <div className='hangman-container'>
        <div className='line-one'></div>
        <div className='line-two'></div>
        {[
          'line-three',
          'line-four',
          'head',
          'body',
          'left-arm',
          'right-arm',
          'left-leg',
          'right-leg',
        ].map((x, i) => {
          if (startLife - life > i) return <div className={x} key={i}></div>
        })}
      </div>
      {!gameOn && (
        <>
          <h1>HANGMAN</h1>
          <button className='game-start-btn' onClick={onClickNewGame}>
            Game start
          </button>
        </>
      )}
      {gameOn && (
        <>
          <div className='countries'>Guess! Countries name.</div>
          <div className='remain-life'>Remain life: {life}</div>
          <div className='answer'>
            {answer.split('').map((x, i) => (
              <span key={i}>{selectedLetter.includes(x) ? x : ''}</span>
            ))}
          </div>
          <div className='alphabet-btn-box'>
            {aToZ.map((x, i) => (
              <button
                className='alphabet-btn'
                key={i}
                disabled={selectedLetter?.includes(x)}
                value={x}
                onClick={onClickLetter}
              >
                {x}
              </button>
            ))}
          </div>
        </>
      )}
      {(gameWon || gameLost) && (
        <div className='modal'>
          <div className='card'>
            {gameWon && (
              <h2>
                Congratulations <br />
                You won!
              </h2>
            )}
            {gameLost && (
              <>
                <h2>You lost!</h2>
              </>
            )}
            <div className='text1'>Answer was</div>
            <div className='text2'>{answer}</div>
            <button onClick={onClickNewGame}>New game</button>
          </div>
        </div>
      )}
    </div>
  )
}
