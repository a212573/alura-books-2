import Logo from '../Logo';
import OpcoesHeader from '../OpcoesHeader';
import IconesHeader from '../IconesHeader';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
    background-color:#FFFFFF;
    display: flex;
    justify-content: center
`

const StyledLink = styled(Link)`
    text-decoration: none;
`

function Header() {
    return ( 
        <HeaderContainer>
            <StyledLink to="/">
                <Logo/>
            </StyledLink>
            <OpcoesHeader/>
            <IconesHeader/>
        </HeaderContainer>
    )
}

export default Header