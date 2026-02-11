import { useEffect, useState } from 'react'
import styled from 'styled-components'
import livroImg from '../imagens/livro.png'
import { deleteFavorito, getFavoritos } from '../servicos/favoritos'
import { postSacola } from '../servicos/sacola'
import sacolaIcon from '../imagens/sacola.svg'
import BotaoDescricao from '../componentes/BotaoDescricao'


const AppContainer = styled.div`
   width: 100vw;
   height: 100vh;
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
   margin-top: 1px;
   align-items: center;
`

const IconesGrupo = styled.div`
   display: flex;
   gap: 10px;
   align-items: center;
   margin-left: 30px;
`

const IconeBtn = styled.button`
   background: transparent;
   border: none;
   cursor: pointer;
   padding: 5px;
   display: flex;
   align-items: center;
   img {
       width: 20px;
       height: 20px;
   }
   &:hover {
       transform: scale(1.2);
   }
`

const BotaoRemover = styled.button`
   background-color: #EB9B00;
   color: #FFF;
   border: none;
   padding: 8px 16px;
   border-radius: 5px;
   cursor: pointer;
   margin-top: 10px;
   font-weight: bold;
   &:hover {
       background-color: #d88a00;
   }
`

const Titulo = styled.h2`
   color: #FFF;
   font-size: 36px;
   text-align: center;
   width: 100%;
   padding-top: 35px;
`

function Favoritos() {
  const [favoritos, setFavoritos] = useState([])
  
  async function fetchFavoritos() {
  const favoritosDaAPI = await getFavoritos()
  setFavoritos(favoritosDaAPI)
  }

  async function deletarFavorito(id) {
    await deleteFavorito(id)
    alert(`Livro de id: ${id} deletado!`)
    window.location.reload()
  }

  async function insertSacola(id) {
    await postSacola(id)
    alert(`Livro de id: ${id} inserido na sacola!`)
  }
  
  useEffect(() => {
  fetchFavoritos()
  }, [])
  
  return (
   <AppContainer>
     <div>
       <Titulo>Aqui estão seus livros favoritos:</Titulo>
       <ResultadoContainer>
         {
           favoritos.length !== 0 ? favoritos.map(favorito => (
             <Resultado key={favorito.id}>
               <img src={livroImg}/>
               <p>{favorito.nome}</p>
               <IconesContainer>
                 <BotaoRemover onClick={() => deletarFavorito(favorito.id)}>Remover</BotaoRemover>
                 <IconesGrupo>
                   <IconeBtn onClick={() => insertSacola(favorito.id)} title="Adicionar à sacola">
                     <img src={sacolaIcon} alt="Sacola"/>
                   </IconeBtn>
                   <BotaoDescricao descricao={favorito.descricao} preco={favorito.preco} />
                 </IconesGrupo>
               </IconesContainer>
             </Resultado>
           )) : null
         }
       </ResultadoContainer>
     </div>
   </AppContainer>
 );
}


export default Favoritos