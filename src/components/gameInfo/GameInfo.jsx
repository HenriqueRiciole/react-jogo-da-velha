import styles from './GameInfo.module.css'

import Icon from '../icon/Icon'
import Button from '../button/Button'

function GameInfo({currectPlayer, winner, onReset,isDraw}){

    const shouldEnableButton=()=>winner !== 0 || isDraw
    
    return(
        
        <div className={styles.gameInfo}>
            {
                !isDraw && winner === 0 &&
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
                !isDraw && winner!== 0 &&
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
            {
                isDraw && <h4>Empatou!</h4>
                

            }
            <Button onClick={onReset}
                    disabled={!shouldEnableButton()} >
                Reiniciar
            </Button>
        </div>
    )

}

export default GameInfo