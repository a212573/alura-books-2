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

const Titulo = styled.h2`
   color: #FFF;
   font-size: 36px;
   text-align: center;
   width: 100%;
   padding-top: 35px;
`

const BotoesContainer = styled.div`
   display: flex;
   justify-content: center;
   gap: 15px;
   margin: 30px 0;
   flex-wrap: wrap;
`

const BotaoCategoria = styled.button`
   background-color: ${props => props.ativo ? '#EB9B00' : '#FFF'};
   color: ${props => props.ativo ? '#FFF' : '#002F52'};
   border: 2px solid #EB9B00;
   padding: 10px 20px;
   border-radius: 5px;
   font-size: 16px;
   font-weight: bold;
   cursor: pointer;
   transition: all 0.3s;
   
   &:hover {
       background-color: #EB9B00;
       color: #FFF;
   }
`

const ResultadoContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   padding-bottom: 40px;
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

function Categorias() {
  const [livros, setLivros] = useState([])
  const [livrosFiltrados, setLivrosFiltrados] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  
  async function fetchLivros() {
    const livrosDaAPI = await getLivros()
    setLivros(livrosDaAPI)
    setLivrosFiltrados(livrosDaAPI)
    
    const categoriasUnicas = [...new Set(livrosDaAPI.map(livro => livro.categoria))]
    setCategorias(categoriasUnicas)
  }
  
  async function insertFavorito(id) {
    await postFavorito(id)
    alert(`Livro de id: ${id} inserido nos favoritos!`)
  }

  async function insertSacola(id) {
    await postSacola(id)
    alert(`Livro de id: ${id} inserido na sacola!`)
  }
  
  function filtrarPorCategoria(categoria) {
    setCategoriaAtiva(categoria)
    if (categoria === 'todos') {
      setLivrosFiltrados(livros)
    } else {
      setLivrosFiltrados(livros.filter(livro => livro.categoria === categoria))
    }
  }
  
  useEffect(() => {
    fetchLivros()
  }, [])
  
  return (
   <AppContainer>
     <div>
       <Titulo>Livros por Categoria:</Titulo>
       <BotoesContainer>
         <BotaoCategoria 
           ativo={categoriaAtiva === 'todos'}
           onClick={() => filtrarPorCategoria('todos')}
         >
           Todos
         </BotaoCategoria>
         {categorias.map(categoria => (
           <BotaoCategoria 
             key={categoria}
             ativo={categoriaAtiva === categoria}
             onClick={() => filtrarPorCategoria(categoria)}
           >
             {categoria}
           </BotaoCategoria>
         ))}
       </BotoesContainer>
       <ResultadoContainer>
         {
           livrosFiltrados.length !== 0 ? livrosFiltrados.map(livro => (
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

export default Categorias
