import logo from '../../imagens/logo.svg'
import styled from 'styled-components'

const LogoContainer = styled.div`
    display: flex;
    font-size: 30px;
    align-items: center; // Centraliza verticalmente o logo e o texto
    white-space: nowrap; // Garante que o texto fique em uma linha só
    color: #002F52;
`

const LogoImage = styled.img`
    margin-right: 10px;
    width: 40px; // Define uma largura menor para o logo
    height: auto; // Mantém a proporção da imagem
`

function Logo() {
    return (
        <LogoContainer>
          <LogoImage src={logo} alt="logo"/>
          <p><strong>Alura</strong> Books</p>
        </LogoContainer>
    )
}

export default Logo