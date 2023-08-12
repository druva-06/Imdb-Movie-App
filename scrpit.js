
let searchBtn = document.getElementsByClassName('search-btn')[0]
let inputMveEle = document.querySelector('.search-div input')
let inputApiEle = document.querySelector('.api-div input')
let movieItems = document.getElementsByClassName('movie-items')[0]
let mainBdy = document.getElementsByTagName('main')
let noResDiv = document.getElementsByClassName('no-result-div')[0]
let loader = document.getElementsByClassName('loader')[0]

function validate(apiKey, mveName){
    return apiKey && mveName
}

function loadMveDetails(mveList){

    movieItems.querySelectorAll("*").forEach(element => {
        element.remove()
    })

    noResDiv.querySelectorAll("*").forEach(element => {
        element.remove()
    })
    noResDiv.style.visibility = 'visible'
    if(mveList === undefined){

        let noResPara = document.createElement('p')
        noResPara.className = 'no-result'
        noResPara.innerText = 'No Result Found'
        noResDiv.appendChild(noResPara)

        return
    }
    movieItems.style.visibility = 'visible'
    mveList.forEach(element => {

        let card = document.createElement('div')
        card.className = 'card'

        let cardInnerHtml = `
        <div class="card">
            <a href="https://www.imdb.com/title/${element.imdbID}/?ref_=hm_top_tt_i_1">
                <img src="${element.Poster}" alt="">
                <p>${element.Title}</p>
            </a>
        </div>
        `

        card.innerHTML = cardInnerHtml
        movieItems.appendChild(card)
       
    });

}

async function loadMveApi(apiKey, mveName){

    noResDiv.style.visibility = 'hidden'
    movieItems.style.visibility = 'hidden'
    loader.style.visibility = 'visible'
    
    let url = `https://www.omdbapi.com/?s=${mveName}&apikey=${apiKey}`
    let response = await fetch(url)
    console.log(response)
    let mveList = await response.json()

    loader.style.visibility = 'hidden'

    loadMveDetails(mveList.Search)
}

searchBtn.addEventListener('click',() => {
    const apiKey = inputApiEle.value
    const mveName = inputMveEle.value
    if(validate(apiKey,mveName)!==''){
        loadMveApi(apiKey,mveName)
    }
})

inputMveEle.addEventListener('keyup',(event) => {
    if(event.key === 'Enter'){
        const apiKey = inputApiEle.value
        const mveName = inputMveEle.value
        if(validate(apiKey,mveName)!==''){
            loadMveApi(apiKey,mveName)
        }
    }
})

