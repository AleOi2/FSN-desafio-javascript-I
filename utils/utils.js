const convertJsonToObj = (json) =>{
    return JSON.parse(json)
}

const media = (array) =>{
    let sum = array.reduce((accumulator, currentValue) => accumulator + currentValue);
    return sum/array.length;
}

const addId = (alunosDaEscola) =>{
    return alunosDaEscola.map((element, index)=>{
        return {...element, id: index + 1};
    })
}

module.exports = { convertJsonToObj, media, addId }