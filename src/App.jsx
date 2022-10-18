//React
import { useCallback, useEffect, useState } from 'react'

//data
import {wordsList} from "./data/words";


//CSS
import './App.css'

//components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

let stages = [{id: 1, name:"start"},{id: 2, name: "game"},{id: 3, name:"end"}]


function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [palavraEscolhida, setPalavraEscolhida] = useState("");
  const [categoriaEscolhida, setCategoriaEscolhida] = useState("");
  const [letras, setLetras] = useState([]);

  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([])
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [tentativas, setTentativas] = useState(3);
  const [pontos, setPontos] = useState(0);

  const escolhendoPalavraECategoria = useCallback(() => {

    //pegando categoria aleatoria
    const categorias = Object.keys(words);
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)];

    //pegando palavra aleatoria
    const word = words[categoria][Math.floor(Math.random() * words[categoria].length)];

    return {word,categoria}
  },[words]);

  //função para inicar o jogo após clicar no button
  const startGame = useCallback(() => {
    //limpar todas letras
    clearEstadoLetras();
 

    //pegando categoria e palavra
    const {word, categoria} = escolhendoPalavraECategoria();
    console.log(word)
    //criando array com as letras
    let palavraLetra = word.split("");
    palavraLetra = palavraLetra.map((letra) => (letra.toLowerCase()));

    //setar os estados com valores das palavras, categoria
    setCategoriaEscolhida(categoria);
    setPalavraEscolhida(word);
    setLetras(palavraLetra);

    //inicia o jogo mudando o estado
    setGameStage(stages[1].name);
  },[escolhendoPalavraECategoria]);

  //processar a letra do input
  const verifyLetter = (letra) => {
    const normalizacaoLetra = letra.toLowerCase();

    // validacao se a letra ja foi utilizada de alguma maneira

    if(letrasAdivinhadas.includes(normalizacaoLetra) || letrasErradas.includes(normalizacaoLetra)){
      return;
    }
    // incluir as letras que o usuario digitar em letrasAdivinhadas ou letrasErradas
    if(letras.includes(normalizacaoLetra)){
      setLetrasAdivinhadas((actualLetrasAdivinhadas) =>[...actualLetrasAdivinhadas,normalizacaoLetra,]);//pega os itens atuais do array e adiciona a letra que esta no normalizacaoLetra
    }else{
      setLetrasErradas((actualLetrasErradas) => [...actualLetrasErradas, normalizacaoLetra,]);//pega os itens atuais do array e adiciona a letra que esta no normalizacaoLetra
      setTentativas((actualTentativas) => actualTentativas -1)
    }
  };

  const clearEstadoLetras = () => {
    setLetrasAdivinhadas([]);
    setLetrasErradas([]);
  }

    useEffect(() => {
      if(tentativas <=0){
        //apagar tudo para começar jogo zerado
        clearEstadoLetras();
        setGameStage(stages[2].name);
      }
    }, [tentativas])
    //checando condição de win
    //useEffect vai monitorar a cada mudança do letrasAdivinhadas e criar um novo array com letras unicas, para nao repetir letras.
    useEffect(() => {
      const letrasUnicas = [...new Set(letras)];

      //condição de vitoria
      if(letrasAdivinhadas.length === letrasUnicas.length){
        //adiciona pontuação
        setPontos((actualPontos) => actualPontos +=100);
        //reseta o jogo com tudo novo
        startGame();
      }
    },[letrasAdivinhadas, letras, startGame]);

    //recomeçar o jogo
  const retry = () => {
    setPontos(0);
    setTentativas(3);
    setGameStage(stages[1].name)
  }

  return (
    <div className='App'>
      <StartScreen />
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} palavraEscolhida={palavraEscolhida} categoriaEscolhida={categoriaEscolhida} letras={letras} letrasAdivinhadas={letrasAdivinhadas} letrasErradas={letrasErradas} tentativas={tentativas} pontos={pontos} />}
      {gameStage === "end" && <GameOver retry={retry} pontos={pontos}/>}
    </div>
  )
}

export default App
