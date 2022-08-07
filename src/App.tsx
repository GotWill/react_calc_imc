import { useState } from "react";
import styles from "./App.module.css";
import powerredImage from './assets/powered.png'
import { levels, calculateImc, level } from "./helpers/imc";
import { GridItem } from "./components/GridItem";
import leftArrowImage from  './assets/leftarrow.png'


const App = () => {

  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0)
  const [showItem, setShowItem] = useState<level | null>(null)

  const handleClick = () => {
    if (heightField && weightField) {
      setShowItem(calculateImc(heightField, weightField))
    } else {
      alert("Digite todos os campos")
    }
  }

  const handleBackButton = () => {
    setShowItem(null)
    setHeightField(0)
    setWeightField(0)

  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.hedaerContainer}>
          <img src={powerredImage} alt="powered" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu Imc.</h1>
          <p>MC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input
            type="number"
            placeholder="Digite a sua altura Ex: 1.5 (em métros)"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={showItem ? true : false}
          />

          <input
            type="number"
            placeholder="Digite o seu peso Ex: 55.3 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={showItem ? true : false}
          />

          <button onClick={handleClick}  disabled={showItem ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>

          {!showItem &&

            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          }
          
          {showItem && 
          
          <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25}/>
              </div>
              <GridItem item={showItem}/>
          </div>
          
          }

        </div>
      </div>
    </div>
  )
}


export default App;