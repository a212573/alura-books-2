import { useEffect, useState } from 'react'
import styled from 'styled-components'
import livroImg from '../imagens/livro.png'
import { deleteSacola, getSacola } from '../servicos/sacola'
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

const IconesContainer = styled.div`
   display: flex;
   gap: 40px;
   margin-top: 5px;
   align-items: center;
   justify-content: center;
`

const Titulo = styled.h2`
   color: #FFF;
   font-size: 36px;
   text-align: center;
   width: 100%;
   padding-top: 35px;
`

function Sacola() {
  const [sacola, setSacola] = useState([])
  
  async function fetchSacola() {
    const sacolaDaAPI = await getSacola()
    setSacola(sacolaDaAPI)
  }

  async function deletarSacola(id) {
    await deleteSacola(id)
    alert(`Livro de id: ${id} deletado!`)
    window.location.reload()
  }
  
  useEffect(() => {
    fetchSacola()
  }, [])
  
  return (
   <AppContainer>
     <div>
       <Titulo>Aqui estão os livros da sua sacola:</Titulo>
       <ResultadoContainer>
         {
           sacola.length !== 0 ? sacola.map(item => (
             <Resultado key={item.id}>
               <img src={livroImg}/>
               <p>{item.nome}</p>
               <IconesContainer>
                 <BotaoRemover onClick={() => deletarSacola(item.id)}>Remover</BotaoRemover>
                 <BotaoDescricao descricao={item.descricao} preco={item.preco} />
               </IconesContainer>
             </Resultado>
           )) : null
         }
       </ResultadoContainer>
     </div>
   </AppContainer>
 );
}

export default Sacola
