import Input from '../Input'
import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { getLivros } from '../../servicos/livros'
import { postFavorito } from '../../servicos/favoritos'
import { postSacola } from '../../servicos/sacola'
import livroImg from '../../imagens/livro.png'
import estrela from '../../imagens/estrela.svg'
import sacolaIcon from '../../imagens/sacola.svg'
import lupaIcon from '../../imagens/lupa.svg'
import BotaoDescricao from '../BotaoDescricao'

const PesquisaContainer = styled.section`
        background-image: linear-gradient(90deg, #002F52 35%, #326589 165%);
        color: #FFF;
        text-align: center;
        padding: 85px 0;
        min-height: 270px;
        width: 100%;
`

const Titulo = styled.h2`
        color: #FFF;
        font-size: 36px;
        text-align: center;
        width: 100%;
`

const Subtitulo = styled.h3`
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 40px;
`

const Resultado = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    background-color: #FFF;
    border-radius: 10px;
    padding: 20px;
    max-width: 600px;
    margin: 20px auto;
`

const LivroInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    p {
        width: 200px;
        margin-left: 20px;
        color: #002F52;
    }
    img {
        width: 100px;
    }
`

const IconesContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-left: 20px;
    align-items: center;
`

const InputContainer = styled.div`
    position: relative;
    display: inline-block;
`

const LupaBtn = styled.button`
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    img {
        width: 30px;
        height: 30px;
    }
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

function Pesquisa() {

    const [livrosPesquisados, setLivrosPesquisados] = useState([])
    const [livros, setLivros] = useState([])
    const inputRef = useRef(null)

    useEffect(() => {
        fetchLivros()
    }, [])

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

    function realizarPesquisa(textoDigitado) {
        const resultadoPesquisa = livros.filter( livro => livro.nome.toLowerCase().includes(textoDigitado.toLowerCase()))
        setLivrosPesquisados(resultadoPesquisa)
    }

    function handleLupaClick() {
        if (inputRef.current) {
            realizarPesquisa(inputRef.current.value)
        }
    }

    return (
        <PesquisaContainer>
            <Titulo>Já sabe por onde começar?</Titulo>
            <Subtitulo>Encontre seu livro em nossa estante.</Subtitulo>
            <InputContainer>
                <LupaBtn onClick={handleLupaClick} title="Pesquisar">
                    <img src={lupaIcon} alt="Pesquisar"/>
                </LupaBtn>
                <Input
                    ref={inputRef}
                    placeholder="Escreva sua próxima leitura"
                    onBlur={(evento) => realizarPesquisa(evento.target.value)}
                    onKeyDown={(evento) => {
                        if (evento.key === 'Enter') {
                            realizarPesquisa(evento.target.value)
                        }
                    }}
                />
            </InputContainer>
            { livrosPesquisados.map( livro => (
                <Resultado key={livro.id}>
                    <LivroInfo>
                        <img src={livroImg}/>
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
                    </LivroInfo>
                </Resultado>
            )) }
        </PesquisaContainer>
    )
}

export default Pesquisa
