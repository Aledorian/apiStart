let url = "https://restcountries.com/v3.1/all";
let cardList = document.getElementById('cardList')
let region
let data
let name

const body = document.querySelector('body');
let select = document.getElementById('filterRegion').value


let changeMode = () =>{
    body.classList.toggle('dark')
}

let regionUrl = (region) => {
    select = document.getElementById('filterRegion').value
    
    if (select == "all") {
        url = "https://restcountries.com/v3.1/all"
    }else{
        url = "https://restcountries.com/v3.1/region/" + region.toLowerCase()
    }

    document.getElementById('search').value = ""

    getData(url)
}

let nameUrl = (name) => {
    let search = document.getElementById('search').value

    if (search == "") {
        url = "https://restcountries.com/v3.1/all"
    }
    else{
        url = "https://restcountries.com/v3.1/name/" + name.toLowerCase()
    }    

    getData(url)
}


async function getData(url) {
    
    let response = await fetch(url)
    let data = await response.json()    

    cardList.innerHTML = ""

    data.forEach(element => {
        
        let card = document.createElement('div')
        let flag = document.createElement('img')
        let countryName = document.createElement('h3')
        let counrtyInfo = document.createElement('ul')
        let pops = document.createElement("li")
        let region = document.createElement("li")
        let capital = document.createElement("li")

        pops.textContent = "Population : "
        region.textContent = "Region : "
        capital.textContent = "Capital : "

        pops.append(new Intl.NumberFormat().format(element.population )+ " " + element.demonyms.eng.f )
        region.append(element.region)
        capital.append(element.capital)


        counrtyInfo.append(pops, region, capital)
        
        card.classList.add("card")

        flag.setAttribute("src", element.flags.png)
        countryName.textContent = element.name.common

        cardList.append(card)

        card.append(flag)
        
        card.append(countryName)

        card.append(counrtyInfo)
        
    });
}

getData(url)    