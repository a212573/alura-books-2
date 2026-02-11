import livrosData from '../data/livros.json'

let livrosCache = [...livrosData]

async function getLivros(){
    return new Promise((resolve) => {
        setTimeout(() => resolve([...livrosCache]), 100)
    })
}

export {
    getLivros
}