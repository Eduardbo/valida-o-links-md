import chalk from "chalk";
//loop para percorrer a lista de links e extrai o link dos objetos
function extraiLinks (arrLinks) {
   const listaArray = arrLinks.map((objetoLink) => Object.values(objetoLink).join())
   return listaArray;
}

async function checaStatus (listaURLs) {
    const arrStatus = Promise
    .all (
        listaURLs.map( async (url) => {
            try {
                const response = await fetch(url)
            return response.status;

            } catch (erro) {
                return manejaErro(erro);
            }   
  } )
  )
  return arrStatus;
}


function manejaErro (erro){
    if (erro.cause === 'ENOTFOUND') {
        return `Link não encontratado;`
    } else {
        return `Houve algum erro`;
    }
}


export default async function listaValidada (listaDeLinks) {
   const links = extraiLinks(listaDeLinks);
   const status = await checaStatus(links);
   
    return listaDeLinks.map((objeto, indice) => ({ 
        ...objeto, 
        status: status[indice] 
    }))


}

