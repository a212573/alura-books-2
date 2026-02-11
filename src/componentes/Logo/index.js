import logo from '../../imagens/logo.svg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LogoContainer = styled.div`
    display: flex;
    font-size: 30px;
    align-items: center; // Centraliza verticalmente o logo e o texto
    white-space: nowrap; // Garante que o texto fique em uma linha só
    color: #002F52;
    cursor: pointer;
`

const LogoImage = styled.img`
    margin-right: 10px;
    width: 40px; // Define uma largura menor para o logo
    height: auto; // Mantém a proporção da imagem
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #002F52;
`

function Logo() {
    return (
        <StyledLink to="/home">
            <LogoContainer>
              <LogoImage src={logo} alt="logo"/>
              <p><strong>Alura</strong> Books</p>
            </LogoContainer>
        </StyledLink>
    )
}

export default Logo