import { useState, useRef } from "react"
import "./Game.css"

const Game = ({verifyLetter,palavraEscolhida, categoriaEscolhida,letras,letrasAdivinhadas,letrasErradas,tentativas,pontos}) => {
  const [letra, setLetra] = useState("");
  const letraInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    verifyLetter(letra);
    setLetra("");

    letraInputRef.current.focus();
  }
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {pontos}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{categoriaEscolhida}</span>
      </h3>
      <p>Você ainda tem {tentativas} tentativa(s).</p>
      <div className="wordContainer">
        {/* metodo map para percorrer o state de letras e verificar se tem letra dentro das alternativas, se tiver vai ser impressa, se nao vai criar os quadros brancos com quantidade referente as letras */}
        {letras.map((letra, index) => (
          letrasAdivinhadas.includes(letra) ? 
          (
            <span key={index} className="letter">{letra}</span>
          ) : 
            (
              <span key={index} className="blankSquare"></span>
            )
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" maxLength="1" required onChange={(event) => setLetra(event.target.value)} value={letra} ref={letraInputRef}/>
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {/* metodo map que percorre o array de letras erradas e as imprime na tela */}
        {letrasErradas.map((letra, index) => (
          <span key={index}>{letra},</span>
        ))}
      </div>
    </div>
    
  )
}

export default Game