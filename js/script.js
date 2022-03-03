const qs = (e)=>{
    return document.querySelector(e)
}

const qsall = (e)=>{
    return document.querySelectorAll(e)
}

const infoClimate ={
    search(e){
        e.preventDefault()

        let valueInput = qs('form input[type="search"]').value
        
        if(valueInput.length > 0){
            qs('.result .title').innerHTML = valueInput
            infoClimate.showWarnig('carregando...')
        }
    },


    showWarnig(msg){
        qs('.warning').innerHTML = msg
    }
}

qs('.search').addEventListener('submit',infoClimate.search)

