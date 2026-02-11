import { useEffect, useState } from 'react'
import styled from 'styled-components'
import livroImg from '../imagens/livro.png'
import { getLivros } from '../servicos/livros'
import { postFavorito } from '../servicos/favoritos'
import { postSacola } from '../servicos/sacola'
import estrela from '../imagens/estrela.svg'
import sacolaIcon from '../imagens/sacola.svg'
import BotaoDescricao from '../componentes/BotaoDescricao'


const AppContainer = styled.div`
   width: 100vw;
   min-height: 100vh;
   background-image: linear-gradient(90deg,#002F52 35%,#326589 165%);
`

const ResultadoContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
`

const Resultado = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   background-color: #FFF;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   border-radius: 10px;
   margin: 20px;
   padding: 20px;
   text-align: center;
   p {
       width: 200px;
       color: #EB9B00;
       font-weight: bold;
   }
   img {
       width: 100px;
   }
   &:hover {
       border: 1px solid #326589;
   }
`

const IconesContainer = styled.div`
   display: flex;
   gap: 10px;
   margin-top: 0;
   align-items: center;
`

const IconeBtn = styled.button`
   background: transparent;
   border: none;
   cursor: pointer;
   padding: 5px;
   img {
       width: 20px;
       height: 20px;
   }
   &:hover {
       transform: scale(1.2);
   }
`

const Titulo = styled.h2`
   color: #FFF;
   font-size: 36px;
   text-align: center;
   width: 100%;
   padding-top: 35px;
`

function Estante() {
  const [livros, setLivros] = useState([])
  
  async function fetchLivros() {
    const livrosDaAPI = await getLivros()
    setLivros(livrosDaAPI)
  }

  async function insertFavorito(id) {
    await postFavorito(id)
    alert(`Livro de id: ${id} inserido nos favoritos!`)
  }

  async function insertSacola(id) {
    await postSacola(id)
    alert(`Livro de id: ${id} inserido na sacola!`)
  }
  
  useEffect(() => {
    fetchLivros()
  }, [])
  
  return (
   <AppContainer>
     <div>
       <Titulo>Aqui estão todos os livros:</Titulo>
       <ResultadoContainer>
         {
           livros.length !== 0 ? livros.map(livro => (
             <Resultado key={livro.id}>
               <img src={livroImg} alt={livro.nome}/>
               <p>{livro.nome}</p>
               <IconesContainer>
                 <IconeBtn onClick={() => insertFavorito(livro.id)} title="Adicionar aos favoritos">
                   <img src={estrela} alt="Favorito"/>
                 </IconeBtn>
                 <IconeBtn onClick={() => insertSacola(livro.id)} title="Adicionar à sacola">
                   <img src={sacolaIcon} alt="Sacola"/>
                 </IconeBtn>
                 <BotaoDescricao descricao={livro.descricao} preco={livro.preco} />
               </IconesContainer>
             </Resultado>
           )) : null
         }
       </ResultadoContainer>
     </div>
   </AppContainer>
 );
}


export default Estante
