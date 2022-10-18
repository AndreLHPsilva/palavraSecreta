import "./GameOver.css"

const GameOver = ({retry, pontos}) => {
  return (
    <div>
      <h1>Fim de Jogo</h1>
      <h2> A sua pontuação foi: <span>{pontos}</span></h2>
      <button onClick={retry}>Recomeçar o jogo</button>
    </div>
  )
}

export default GameOver