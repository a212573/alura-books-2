import perfil from '../../imagens/perfil.svg'
import sacola from '../../imagens/sacola.svg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Icone = styled.li`
    margin-right: 40px;
    width: 25px;
    cursor: pointer;
`
const Icones = styled.ul`
    display: flex;
    align-items: center;
`

const icones = [perfil, sacola]
const rotas = ['/perfil', '/sacola']

function IconesHeader() {
    return (
        <Icones>
            {icones.map((icone, index) => 
                <Link to={rotas[index]} key={index}>
                    <Icone><img src={icone} alt={`Imagem de ${icone}`}></img></Icone>
                </Link>
            )}
        </Icones>
    )
}

export default IconesHeader