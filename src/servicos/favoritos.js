import favoritosData from '../data/favoritos.json'
import livrosData from '../data/livros.json'

let favoritosCache = [...favoritosData]

async function getFavoritos(){
    return new Promise((resolve) => {
        setTimeout(() => resolve([...favoritosCache]), 100)
    })
}

async function postFavorito(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const livro = livrosData.find(l => l.id === id)
            if (livro && !favoritosCache.find(f => f.id === id)) {
                favoritosCache.push({...livro})
            }
            resolve()
        }, 100)
    })
}

async function deleteFavorito(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            favoritosCache = favoritosCache.filter(f => f.id !== id)
            resolve()
        }, 100)
    })
}

export {
    getFavoritos,
    postFavorito,
    deleteFavorito
}