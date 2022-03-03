
/*
API: https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(valueInput)}&appid=fc008fb8820b07de96392409bf104071&units=metric&lang=pt_br

Info climate

*/

const qs = (e)=>{
    return document.querySelector(e)
}

const qsall = (e)=>{
    return document.querySelectorAll(e)
}

const infoClimate = {

    async search(e){
        e.preventDefault()

        infoClimate.showWarnig('Carregando...')
        qs('.result').style.display = 'none'

        let valueInput = qs('form input[type="search"]').value
        
        if(valueInput.length > 0){
            let api = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(valueInput)}&appid=fc008fb8820b07de96392409bf104071&units=metric&lang=pt_br`

            let req = await fetch(api).then(response=>{
                return response.json()
            })

            if(req.cod == 404){
                infoClimate.showWarnig('Local não encontrado')
            }else{
                infoClimate.returnResults(req)
            }  
        }else{
            infoClimate.showWarnig('Insira um local no campo acima!')
        }
    },

    showWarnig(msg){
        qs('.warning').style.display = 'block'
        qs('.warning').innerHTML = msg
    },

    returnResults(data){
        qs('.result').style.display = 'flex'
        qs('.warning').style.display = 'none'

        qs(".title").innerHTML = `${data.name}, ${data.sys.country}`;

        qs('.temp-degrees').innerHTML = `${data.main.temp} ºC`

        qs('.wind-km').innerHTML = `${data.wind.speed} km/h`

        qs('.wind-pointer').style.transform = `rotate(${data.wind.deg - 90}deg)`

        let urlImg = `http://openweathermap.org/img/wn/${data.weather['0'].icon}@2x.png`

        qs('.temp-img span').innerHTML = data.weather['0'].description

        qs('.temp-img img').src = urlImg
    }
}

qs('.search').addEventListener('submit',infoClimate.search)
