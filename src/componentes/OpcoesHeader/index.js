import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Opcao = styled.li`
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0 5px;
    cursor: pointer;
    min-width: 120px;
`
const Opcoes = styled.ul`
    display: flex;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #002F52;
    
    &:visited {
        color: #002F52;
    }
    
    &:hover,
    &:active {
        font-weight: bold;
    }
`

const textoOpcoes = ['CATEGORIAS', 'FAVORITOS','ESTANTE']

function OpcoesHeader() {
    return(
        <Opcoes>
            { textoOpcoes.map( (texto) => (
                <StyledLink key={texto} to={`/${texto.toLowerCase()}`} ><Opcao><p>{texto}</p></Opcao></StyledLink>
            ) ) }
        </Opcoes>
    )
}

export default OpcoesHeader