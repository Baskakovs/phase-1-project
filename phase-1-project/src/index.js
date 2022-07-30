fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s')
.then((res)=>res.json())
.then((object)=> display(object))
.catch(console.log('failed to load the API'))

const displayContainer = document.getElementById("displayContainer")
const drinkNameSelection = document.getElementById("drinkNameSelection")

function display(object){
    console.log(object)
    const array = object['drinks']
    for(let coctail of array){
        const card = document.createElement('div')
        card.setAttribute('id', `${coctail.strDrink}`)
        card.setAttribute('style', ``)
        displayContainer.append(card)
        card.setAttribute('class', 'card col-lg-3 col-12')
        const header = document.createElement('div')
        card.append(header)
        header.setAttribute('class','card-header')
        const title = document.createElement('h3')
        header.append(title)
        title.setAttribute('class','text-center')
        title.textContent = coctail.strDrink

        const body = document.createElement('div')
        card.append(body)
        body.setAttribute('class','card-body')
        const ingridientsTitle = document.createElement('h5')
        body.append(ingridientsTitle)
        ingridientsTitle.textContent = "INGRIDIENTS"
        const ul = document.createElement('ul')
        body.append(ul)
        const ingridient1 = document.createElement('li')
        ul.append(ingridient1)
        ingridient1.textContent = coctail.strIngredient1

        const ingridient2 = document.createElement('li')
        ul.append(ingridient2)
        ingridient2.textContent = coctail.strIngredient2

        const ingridient3 = document.createElement('li')
        ul.append(ingridient3)
        ingridient3.textContent = coctail.strIngredient3

        const ingridient4 = document.createElement('li')
        if(coctail.strIngredient4  != null){
            ul.append(ingridient4)
            ingridient4.textContent = coctail.strIngredient4
        }
        const ingridient5 = document.createElement('li')
        if(coctail.strIngredient5  != null){
            ul.append(ingridient5)
            ingridient5.textContent = coctail.strIngredient5 
        }

        const ingridient6 = document.createElement('li')
        if(coctail.strIngredient6  != null){
            ul.append(ingridient6)
            ingridient6.textContent = coctail.strIngredient6
        }

        //APPENDING THE SELECTORS

        const drinkNameOption = document.createElement('option')
        drinkNameSelection.append(drinkNameOption)
        drinkNameOption.textContent = coctail.strDrink
        drinkNameOption.setAttribute('value', coctail.strDrink)
        
    }
}

drinkNameSelection.addEventListener("change", (e)=>filterByName(e))


function filterByName(e){
    console.log(e.target.value)
    console.log(displayContainer.children)
    for(let coctailCard of displayContainer.childNodes){
        if(coctailCard.id != e.target.value){
            coctailCard.style = 'display: none'
        }else if(coctailCard.id == e.target.value){
            coctailCard.style = 'display: block'
        }
    }
}
/*unction display(object){
    object.map((coctail)=>{
    const card = document.createElement('div').setAttribute('class','card')
    displayContainer.append(card)
    const title = document.createElement('div').setAttribute('class','card header')
    title.textContent = coctail.strDrink
    })   
}*/strIngredient1