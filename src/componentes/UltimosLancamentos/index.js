import { useEffect, useState } from 'react'
import { Titulo } from '../Titulo'
import CardRecomenda from '../CardRecomenda'
import styled from 'styled-components'
import { postFavorito } from '../../servicos/favoritos'
import { postSacola } from '../../servicos/sacola'
import { getLivros } from '../../servicos/livros'
import estrela from '../../imagens/estrela.svg'
import sacolaIcon from '../../imagens/sacola.svg'
import BotaoDescricao from '../BotaoDescricao'
import livroImg from '../../imagens/livro.png'
import livro2Img from '../../imagens/livro2.png'

const UltimosLancamentosContainer = styled.section`
    background-color: #EBECEE;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
`


const NovosLivrosContainer = styled.div`
    margin-top: 30px;
    display: flex;
    width: 100%;
    justify-content: center;
    cursor: pointer;
`

const LivroItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
    position: relative;
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
        width: 18px;
        height: 18px;
    }
    &:hover {
        transform: scale(1.2);
    }
`

const NomeLivro = styled.p`
    color: #002F52;
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
    max-width: 150px;
`

function UltimosLancamentos() {
    const [livros, setLivros] = useState([])
    
    useEffect(() => {
        async function fetchLivros() {
            const livrosDaAPI = await getLivros()
            setLivros(livrosDaAPI)
        }
        fetchLivros()
    }, [])
    
    const lancamentos = livros.slice(0, 3)
    const recomendacoes = livros.slice(-2)
    
    async function insertFavorito(id) {
        await postFavorito(id)
        alert(`Livro de id: ${id} inserido nos favoritos!`)
    }

    async function insertSacola(id) {
        await postSacola(id)
        alert(`Livro de id: ${id} inserido na sacola!`)
    }
    
    return (
        <UltimosLancamentosContainer>
            <Titulo cor="#EB9B00" 
            tamanhoFonte= "36px">
                ÚLTIMOS LANÇAMENTOS
            </Titulo>
            <NovosLivrosContainer>
                { lancamentos.map( livro => (
                    <LivroItem key={livro.id}>
                        <img src={livroImg}/>
                        <NomeLivro>{livro.nome}</NomeLivro>
                        <IconesContainer>
                            <IconeBtn onClick={() => insertFavorito(livro.id)} title="Adicionar aos favoritos">
                                <img src={estrela} alt="Favorito"/>
                            </IconeBtn>
                            <IconeBtn onClick={() => insertSacola(livro.id)} title="Adicionar à sacola">
                                <img src={sacolaIcon} alt="Sacola"/>
                            </IconeBtn>
                            <BotaoDescricao descricao={livro.descricao} preco={livro.preco} />
                        </IconesContainer>
                    </LivroItem>
                ) ) }
            </NovosLivrosContainer>
            { recomendacoes.map( (livro, index) => (
                <CardRecomenda 
                    key={livro.id}
                    livroId={livro.id}
                    titulo = "Talvez você se interesse por:" 
                    subtitulo = {livro.nome}
                    descricao= {livro.descricao}
                    preco={livro.preco}
                    img={index === 0 ? livro2Img : livro2Img}
                />
            )) }
        </UltimosLancamentosContainer>
    )
}

export default UltimosLancamentos
