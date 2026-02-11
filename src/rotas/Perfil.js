import styled from 'styled-components'

const AppContainer = styled.div`
   width: 100vw;
   height: 100vh;
   background-image: linear-gradient(90deg,#002F52 35%,#326589 165%);
`

const PerfilContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 50px 20px;
`

const Card = styled.div`
   background-color: #FFF;
   border-radius: 10px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   padding: 40px;
   max-width: 500px;
   width: 100%;
   margin-top: 20px;
`

const Titulo = styled.h2`
   color: #FFF;
   font-size: 36px;
   text-align: center;
   margin-bottom: 20px;
`

const InfoLabel = styled.p`
   color: #002F52;
   font-weight: bold;
   margin: 15px 0 5px 0;
`

const InfoValue = styled.p`
   color: #326589;
   margin: 0 0 15px 0;
   padding: 10px;
   background-color: #f5f5f5;
   border-radius: 5px;
`

function Perfil() {
  return (
   <AppContainer>
     <PerfilContainer>
       <Titulo>Meu Perfil</Titulo>
       <Card>
         <InfoLabel>Nome:</InfoLabel>
         <InfoValue>Usuário</InfoValue>
         
         <InfoLabel>Email:</InfoLabel>
         <InfoValue>usuario@email.com</InfoValue>
         
         <InfoLabel>Membro desde:</InfoLabel>
         <InfoValue>Janeiro 2024</InfoValue>
       </Card>
     </PerfilContainer>
   </AppContainer>
 )
}

export default Perfil
