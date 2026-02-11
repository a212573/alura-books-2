import sacolaData from '../data/sacola.json'
import livrosData from '../data/livros.json'

let sacolaCache = [...sacolaData]

async function getSacola(){
    return new Promise((resolve) => {
        setTimeout(() => resolve([...sacolaCache]), 100)
    })
}

async function postSacola(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const livro = livrosData.find(l => l.id === id)
            if (livro && !sacolaCache.find(s => s.id === id)) {
                sacolaCache.push({...livro})
            }
            resolve()
        }, 100)
    })
}

async function deleteSacola(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            sacolaCache = sacolaCache.filter(s => s.id !== id)
            resolve()
        }, 100)
    })
}

export {
    getSacola,
    postSacola,
    deleteSacola
}
