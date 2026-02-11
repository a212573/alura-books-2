import styled from "styled-components"
import { Titulo } from "../Titulo"
import { postFavorito } from '../../servicos/favoritos'
import { postSacola } from '../../servicos/sacola'
import estrela from '../../imagens/estrela.svg'
import sacolaIcon from '../../imagens/sacola.svg'
import BotaoDescricao from '../BotaoDescricao'

const Card = styled.div`
    align-items: center;
    background-color: #FFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    margin: 30px auto;
    max-width: 600px;
    padding: 25px 15px;
    justify-content: space-around;
    width: 100%;  
`

const Botao = styled.button`
    background-color: #EB9B00;
    color: #FFF;
    padding: 10px 0px;
    font-size: 16px;
    border: none;
    font-weight: 900;
    display: block;
    text-align: center;
    width: 150px;
    &:hover {
        cursor: pointer;
    }
`

const Descricao = styled.p`
    max-width: 300px;
    margin-bottom: 30px
`

const Subtitulo = styled.h4`
    color: #002F52;
    font-size: 18px;
    font-weight: bold;
    margin: 5px 0 50px 0;
`

const ImgLivro = styled.img`
    width: 150px;
`

const IconesContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 0;
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

function CardRecomenda({titulo, subtitulo, descricao, img, livroId, preco}) {
    async function insertFavorito() {
        await postFavorito(livroId)
        alert(`Livro de id: ${livroId} inserido nos favoritos!`)
    }

    async function insertSacola() {
        await postSacola(livroId)
        alert(`Livro de id: ${livroId} inserido na sacola!`)
    }
    
    return (
        <Card>
            <div>
                <Titulo tamanhoFonte="24px" cor="#EB9B00" alinhamento="left" style={{padding: '30px 0'}}>{titulo}</Titulo>
                <Subtitulo>{subtitulo}</Subtitulo>
            </div>
            <div>
                <ImgLivro src={img}/>
                <IconesContainer>
                    <IconeBtn onClick={insertFavorito} title="Adicionar aos favoritos">
                        <img src={estrela} alt="Favorito"/>
                    </IconeBtn>
                    <IconeBtn onClick={insertSacola} title="Adicionar à sacola">
                        <img src={sacolaIcon} alt="Sacola"/>
                    </IconeBtn>
                </IconesContainer>
                <BotaoDescricao descricao={descricao} botaoTexto="Saiba mais" preco={preco} />
            </div>
        </Card>  
    )
}

export default CardRecomenda