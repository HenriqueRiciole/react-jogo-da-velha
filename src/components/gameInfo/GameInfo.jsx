import styles from './GameInfo.module.css'

import Icon from '../icon/Icon'
import Button from '../button/Button'

function GameInfo({currectPlayer, winner, onReset}){

    const shouldEnableButton=()=>{
        if(winner !== 0) return true
    }
    return(
        
        <div className={styles.gameInfo}>
            {
                winner === 0 &&
                <>
                  <h4>Próximo jogador</h4>
                  {
                  currectPlayer === 1 && <Icon iconName="circle"/>   
                  }    
                  {
                  currectPlayer === -1 && <Icon iconName="x"/>    
                  }
                </>
            }
            {
                winner!== 0 &&
                <>
                  <h4>Vencedor do Jogo</h4>
                  {
                  winner === 1 && <Icon iconName="circle"/>   
                  }    
                  {
                  winner === -1 && <Icon iconName="x"/>    
                  }
                </>
            } 
            <Button onClick={onReset}
                    disabled={!shouldEnableButton()} >
                Reiniciar
            </Button>
        </div>
    )

}

export default GameInfo