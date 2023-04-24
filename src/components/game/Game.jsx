import { useState, useEffect } from 'react'
import styles from './Game.module.css'

import GameInfo from '../gameInfo/GameInfo'
import GameOption from '../gameOption/GameOption'
import Score from '../score/Score'

const winnerTable=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]




function Game(){

    const[gameState, setGameState]= useState(Array(9).fill(0))
    const [currectPlayer, setCurrectPlayer]=useState(-1)
    const[winner, setWinner]= useState(0)
    const[winnerLine, setWinnerLine]=useState([])
    const[draw, setDraw]=useState(false)
    const[circleWin, setCircleWin]=useState(0)
    const[xWin, setXWin]=useState(0)

    const handleClick=(pos)=>{
        if(gameState[pos] === 0 && winner === 0){
          let newGameState=[...gameState]
          newGameState[pos]=currectPlayer
          setGameState(newGameState)
        }
        
    }

    const verifyGame=()=> {
        winnerTable.forEach((line)=>{
            const values=line.map((pos)=>gameState[pos])
            const sum=values.reduce((sum, value)=> sum +value)
            if(sum ===3 || sum ===-3) {
                setWinner(sum/3)
                setWinnerLine(line)
                if(sum > 0){
                  setCircleWin(circleWin +1)     
                }else {
                  setXWin(xWin + 1)
                }
            }
        })

    }
    const handleReset= ()=> {
        setGameState(Array(9).fill(0))
        setWinner(0)
        setWinnerLine([])
        setDraw(false)
    }

    const verifyDraw= ()=>{
        if(gameState.find((value)=>value === 0)=== undefined && winner ===0){
            setDraw(true)
        }
    }

    const verifyWinnerLine=(pos)=>
    winnerLine.find((value)=>value === pos) !== undefined

    //useEffect sempre tem dois parametros uma função e um array 
    useEffect(()=>{
        setCurrectPlayer(currectPlayer * -1)
        verifyGame()
        verifyDraw()
    }, [gameState])

    useEffect(()=>{
        if(winner !== 0) setDraw(false)

    },[winner])//verifica se houve algum vencedor para não entrar no empate

    return(
        <>
        <div className={styles.gameContent}>
            <div className={styles.game}>
            {
                gameState.map((value, pos)=> <GameOption
                key={`game-option-pos-${pos}`}
                status={value}
                onClick={()=>{handleClick(pos)}}
                isWinner={verifyWinnerLine(pos)}
                isDraw={draw}
                isCircleWin={circleWin}
                isXWin={xWin}
            />) 
            }
            </div>
            <GameInfo
                currectPlayer={currectPlayer}
                winner={winner}
                onReset={handleReset}
                isDraw={draw}
            />
        </div>
        <Score
          circleWin={circleWin}
          xWin={xWin}
        />
        </>
        
    )
}

export default Game