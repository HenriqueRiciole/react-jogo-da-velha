import { useState, useEffect } from 'react'
import styles from './Game.module.css'

import GameInfo from '../gameInfo/GameInfo'
import GameOption from '../gameOption/GameOption'

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
            }
        })

    }
    const handleReset= ()=> {
        setGameState(Array(9).fill(0))
        setWinner(0)
    }
    //useEffect sempre tem dois parametros uma função e um array 
    useEffect(()=>{
        setCurrectPlayer(currectPlayer * -1)
        verifyGame()
    }, [gameState])

    return(
        <div className={styles.gameContent}>
            <div className={styles.game}>
            {
                gameState.map((value, pos)=> <GameOption
                key={`game-option-pos-${pos}`}
                status={value}
                onClick={()=>{handleClick(pos)}}
            />) 
            }
            </div>
            <GameInfo
                currectPlayer={currectPlayer}
                winner={winner}
                onReset={handleReset}
            />
        </div>
        
        
    )
}

export default Game