import { useState } from 'react'
import styled from 'styled-components'

const BotaoMais = styled.button`
   background: transparent;
   border: 2px solid #002F52;
   border-radius: 50%;
   cursor: pointer;
   padding: 0;
   font-size: 12px;
   color: #002F52;
   font-weight: bold;
   width: 20px;
   height: 20px;
   display: flex;
   align-items: center;
   justify-content: center;
   line-height: 0;
   &:hover {
       background-color: #002F52;
       color: #FFF;
   }
`

const BotaoSaibaMais = styled.button`
   background-color: #EB9B00;
   color: #FFF;
   padding: 10px 0px;
   font-size: 16px;
   border: none;
   font-weight: 900;
   display: block;
   text-align: center;
   width: 150px;
   margin-top: 5px;
   cursor: pointer;
   &:hover {
       background-color: #d88a00;
   }
`

const Overlay = styled.div`
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   top: 0;
   background-color: rgba(0, 0, 0, 0.5);
   z-index: 1000;
`

const CaixaDescricao = styled.div`
   position: fixed;
   bottom: 20px;
   left: 20px;
   right: 20px;
   background-color: #FFF;
   border: 2px solid #002F52;
   border-radius: 10px;
   box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.3);
   padding: 20px;
   padding-right: 40px;
   color: #002F52;
   font-size: 14px;
   line-height: 1.5;
   max-height: 50vh;
   overflow-y: auto;
   z-index: 1001;
   text-align: left;
`

const BotaoFechar = styled.button`
   position: absolute;
   top: 10px;
   right: 10px;
   background: transparent;
   border: none;
   font-size: 24px;
   color: #002F52;
   cursor: pointer;
   font-weight: bold;
   &:hover {
       color: #EB9B00;
   }
`

function BotaoDescricao({ descricao, botaoTexto, preco }) {
   const [mostrar, setMostrar] = useState(false)

   return (
       <>
           {botaoTexto ? (
               <BotaoSaibaMais onClick={(e) => { e.stopPropagation(); setMostrar(true); }}>
                   {botaoTexto}
               </BotaoSaibaMais>
           ) : (
               <BotaoMais onClick={(e) => { e.stopPropagation(); setMostrar(true); }} title="Ver descrição">
                   +
               </BotaoMais>
           )}
           {mostrar && (
               <>
                   <Overlay onClick={() => setMostrar(false)} />
                   <CaixaDescricao>
                       <BotaoFechar onClick={() => setMostrar(false)}>×</BotaoFechar>
                       {preco && <div style={{fontWeight: 'bold', marginBottom: '10px', fontSize: '16px'}}>Preço: R$ {preco}</div>}
                       {descricao || 'Descrição não disponível.'}
                   </CaixaDescricao>
               </>
           )}
       </>
   )
}

export default BotaoDescricao
