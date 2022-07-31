fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s')
.then((res)=>res.json())
.then((object)=> display(object))
.catch(console.log('failed to load the API'))

const displayContainer = document.getElementById("displayContainer")
const displayContainer2 = document.getElementById("noDisplayContainer2")
const drinkNameSelection = document.getElementById("drinkNameSelection")
const ingridientSelection = document.getElementById("ingridientSelection")
const alcoholicSelection = document.getElementById("alcoholicSelection")
const typeSelection = document.getElementById("typeSelection")
const applyButton = document.getElementById("apply")

const inridientsObj = {}

function display(object){
    console.log(object)
    const array = object['drinks']
    for(let coctail of array){
        
        creatingCoctailCard(coctail,displayContainer)

        //APPENDING THE SELECTORS

        //names
        const drinkNameOption = document.createElement('option')
        drinkNameSelection.append(drinkNameOption)
        drinkNameOption.textContent = coctail.strDrink
        drinkNameOption.setAttribute('value', coctail.strDrink)

        //inridients
        inridientsObj[`${coctail.strIngredient1}`] = true
    }
    appendIngridientOptions()
    drinkNameSelection.addEventListener("change", (e)=>filterByName(e))
    ingridientSelection.addEventListener("change", (e)=>filterByIngridient(e))
    alcoholicSelection.addEventListener("change",(e)=>filterByAlcohol(e))
    typeSelection.addEventListener("change",(e)=>filterByType(e))
    applyButton.addEventListener("click",()=>apply(object))
}
function appendIngridientOptions(){
    const inridientsObjArray = Object.keys(inridientsObj)
    inridientsObjArray.map((ingridientName)=>{
        const ingridientOption = document.createElement('option')
        ingridientSelection.append(ingridientOption)
        ingridientOption.textContent = ingridientName
})
}

let filterArray = {}
let searchArray = {}

function filterByName(e){
    for(let coctailCard of displayContainer.childNodes){
        if(coctailCard.id != e.target.value){
            coctailCard.style = 'display: none'
        }else if(coctailCard.id == e.target.value){
            coctailCard.style = 'display: block'
        }
    }
}

function creatingCoctailCard(coctail, area){
    const card = document.createElement('div')
        card.setAttribute('id', `${coctail.strDrink}`)
        card.setAttribute('style', ``)
        area.append(card)
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
        const image = document.createElement('img')
        body.append(image)
        image.setAttribute('style','width: 100px; height: 50 px')
        image.setAttribute('src',coctail.strDrinkThumb)
        const ingridientsTitle = document.createElement('h5')
        body.append(ingridientsTitle)
        ingridientsTitle.textContent = "INGRIDIENTS"
        const ul = document.createElement('ul')
        body.append(ul)
        const ingridient1 = document.createElement('li')
        ul.append(ingridient1)
        ingridient1.setAttribute('id',coctail.strIngredient1)
        ingridient1.textContent = coctail.strIngredient1

        const ingridient2 = document.createElement('li')
        ul.append(ingridient2)
        ingridient2.setAttribute('id',coctail.strIngredient2)
        ingridient2.textContent = coctail.strIngredient2

        const ingridient3 = document.createElement('li')
        ul.append(ingridient3)
        ingridient3.setAttribute('id',coctail.strIngredient3)
        ingridient3.textContent = coctail.strIngredient3

        const ingridient4 = document.createElement('li')
        if(coctail.strIngredient4  != null){
            ul.append(ingridient4)
            ingridient4.setAttribute('id',coctail.strIngredient4)
            ingridient4.textContent = coctail.strIngredient4
        }
        const ingridient5 = document.createElement('li')
        if(coctail.strIngredient5  != null){
            ul.append(ingridient5)
            ingridient5.setAttribute('id',coctail.strIngredient5)
            ingridient5.textContent = coctail.strIngredient5 
        }

        const ingridient6 = document.createElement('li')
        if(coctail.strIngredient6  != null){
            ul.append(ingridient6)
            ingridient6.setAttribute('id',coctail.strIngredient6)
            ingridient6.textContent = coctail.strIngredient6
        }
}

/*function filterByIngridient(object, e){
   const entries =  Object.entries(object['drinks'])
   for(entry of entries){
    if(Object.values(entry[1]).indexOf(e.target.value) == -1){
        document.getElementById(entry[1].strDrink).remove
    }else if(Object.values(entry[1]).indexOf(e.target.value) != -1){
       const coctailCard = document.getElementById(entry[1].strDrink)
       displayContainer.append(coctailCard)
    }
   }
}*/

function filterByIngridient(e){
    filterArray['ingridient'] = e.target.value
}

function filterByAlcohol(e){
    filterArray['alcohol'] = e.target.value
   
}

function filterByType(e){
    filterArray['type'] = e.target.value
}

function apply(object){
    const drinks = object['drinks']
    for(let drink of drinks){
        if((drink.strIngredient1 == filterArray.ingridient || drink.strIngredient2 == filterArray.ingridient 
            || drink.strIngredient3 == filterArray.ingridient || drink.strIngredient4 == filterArray.ingridient 
            || drink.strIngredient5 == filterArray.ingridient || drink.strIngredient6 == filterArray.ingridient
        )&& drink.strAlcoholic == filterArray.alcohol && drink.strCategory == filterArray.type){

            const id = document.getElementById(`${drink.strDrink}`)
            id.remove()
            creatingCoctailCard(drink, displayContainer2)

        }else if((drink.strIngredient1 == filterArray.ingridient || drink.strIngredient2 == filterArray.ingridient 
            || drink.strIngredient3 == filterArray.ingridient || drink.strIngredient4 == filterArray.ingridient 
            || drink.strIngredient5 == filterArray.ingridient || drink.strIngredient6 == filterArray.ingridient
        )&& null == filterArray.alcohol && filterArray.type == null){
            const id = document.getElementById(`${drink.strDrink}`)
            id.remove()
            creatingCoctailCard(drink, displayContainer2)
        }else if((drink.strIngredient1 == filterArray.ingridient || drink.strIngredient2 == filterArray.ingridient 
            || drink.strIngredient3 == filterArray.ingridient || drink.strIngredient4 == filterArray.ingridient 
            || drink.strIngredient5 == filterArray.ingridient || drink.strIngredient6 == filterArray.ingridient
        )&& drink.strAlcoholic == filterArray.alcohol && filterArray.type == null){
            const id = document.getElementById(`${drink.strDrink}`)
            id.remove()
            creatingCoctailCard(drink, displayContainer2)
        }else if((drink.strIngredient1 == filterArray.ingridient || drink.strIngredient2 == filterArray.ingridient 
            || drink.strIngredient3 == filterArray.ingridient || drink.strIngredient4 == filterArray.ingridient 
            || drink.strIngredient5 == filterArray.ingridient || drink.strIngredient6 == filterArray.ingridient
        )&& null == filterArray.alcohol && filterArray.type == drink.strCategory){
            const id = document.getElementById(`${drink.strDrink}`)
            id.remove()
            creatingCoctailCard(drink, displayContainer2)
        }
    }
}
const indexOfIngridient = Object.values(object)
function reset(){
    const divs = document.querySelectorAll('.card')
    const arr = Array.prototype.slice.call(divs)
    console.log(arr)    
    let res = arr.map((coctailCards)=>{
        coctailCards.style = ''
    })
}

/*unction display(object){
    object.map((coctail)=>{
    const card = document.createElement('div').setAttribute('class','card')
    displayContainer.append(card)
    const title = document.createElement('div').setAttribute('class','card header')
    title.textContent = coctail.strDrink
    })   
}*/