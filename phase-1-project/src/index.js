document.addEventListener("DOMContentLoaded",fetching(display))

//HTML ELEMENTS
const displayContainer = document.getElementById("displayContainer")
const displayContainer2 = document.getElementById("noDisplayContainer2")
const ingridientSelection = document.getElementById("ingridientSelection")
const alcoholicSelection = document.getElementById("alcoholicSelection")
const typeSelection = document.getElementById("typeSelection")
const applyButton = document.getElementById("apply")
const resetButton = document.getElementById("reset")
const titleAlternative = document.getElementById("titleAlternative")
const createContainer = document.getElementById("createContainer")

//OBJECTS
const inridientsObj = {}
const filterArray = {}

//FUNCTIONS

function fetching(cb){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s')
    .then((res)=>res.json())
    .then((object)=> cb(object))
    .catch(console.log('failed to load the API'))
}

function filterByName(e){
    for(let coctailCard of displayContainer.childNodes){
        if(coctailCard.id != e.target.value){
            coctailCard.style = 'display: none'
        }else if(coctailCard.id == e.target.value){
            coctailCard.style = 'display: block'
        }
    }
}

function display(object){
    console.log(object)
    const array = object['drinks']
    for(let coctail of array){
        
        creatingCoctailCard(coctail,displayContainer)

        //names
       

        //inridients
        inridientsObj[`${coctail.strIngredient1}`] = true
    }
    appendIngridientOptions()

    //EVENT LISTENERS
    ingridientSelection.addEventListener("change", (e)=>filterByIngridient(e))
    alcoholicSelection.addEventListener("change",(e)=>filterByAlcohol(e))
    typeSelection.addEventListener("change",(e)=>filterByType(e))
    applyButton.addEventListener("click",()=>apply(object))
    resetButton.addEventListener("click",()=>reset())
}

function appendIngridientOptions(){
    const inridientsObjArray = Object.keys(inridientsObj)
    inridientsObjArray.map((ingridientName)=>{
        const ingridientOption = document.createElement('option')
        ingridientSelection.append(ingridientOption)
        ingridientOption.textContent = ingridientName
})
}

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
        card.setAttribute('class', 'card col-lg-3 col-md-4 col--12 m-3')
        const header = document.createElement('div')
        card.append(header)
        header.setAttribute('class','card-header')
        const title = document.createElement('h3')
        header.append(title)
        title.setAttribute('class','text-center mt-2')
        title.textContent = coctail.strDrink
        const body = document.createElement('div')
        card.append(body)
        body.setAttribute('class','card-body')
        const image = document.createElement('img')
        body.append(image)
        image.setAttribute('class','img-on-card')
        
        image.setAttribute('src',coctail.strDrinkThumb)
        const ingridientsTitle = document.createElement('h5')
        body.append(ingridientsTitle)
        ingridientsTitle.setAttribute('class','mt-3 fst-italic fw-light text-muted')
        ingridientsTitle.textContent = "INGRIDIENTS"
        const ul = document.createElement('ul')
        body.append(ul)
        const ingridient1 = document.createElement('li')
        ul.append(ingridient1)
        ul.setAttribute('class','text-muted fst-italic')
        ingridient1.setAttribute('id',coctail.strIngredient1)
        ingridient1.textContent = coctail.strIngredient1

        const ingridient2 = document.createElement('li')
        ul.append(ingridient2)
        ingridient2.setAttribute('id',coctail.strIngredient2)
        ingridient2.textContent = coctail.strIngredient2

        const ingridient3 = document.createElement('li')
        if(coctail.strIngredient3  != null){
            ul.append(ingridient3)
            ingridient3.setAttribute('id',coctail.strIngredient3)
            ingridient3.textContent = coctail.strIngredient3
        }

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

function filterByIngridient(e){
    filterArray['ingridient'] = e.target.value
}

function filterByAlcohol(e){
    filterArray['alcohol'] = e.target.value
   
}

function filterByType(e){
    filterArray['type'] = e.target.value
}

function removinChildren(containerId){
    let displayContainer = document.getElementById(containerId);
    console.log(displayContainer)
    while (displayContainer.firstChild) {
        displayContainer.removeChild(displayContainer.firstChild);
    }
}

function apply(object){
    removinChildren("noDisplayContainer2")
    removinChildren("displayContainer")
    fetching(filterDisplay)
}

function reset(){
    document.location.reload(true)
}

function filterDisplay(object){
    const drinks = object['drinks']
    for(let drink of drinks){
        if((drink.strIngredient1 == filterArray.ingridient || drink.strIngredient2 == filterArray.ingridient 
            || drink.strIngredient3 == filterArray.ingridient || drink.strIngredient4 == filterArray.ingridient 
            || drink.strIngredient5 == filterArray.ingridient || drink.strIngredient6 == filterArray.ingridient
        )&& drink.strAlcoholic == filterArray.alcohol && drink.strCategory == filterArray.type){
            creatingCoctailCard(drink, displayContainer2)

        }else if((drink.strIngredient1 == filterArray.ingridient || drink.strIngredient2 == filterArray.ingridient 
            || drink.strIngredient3 == filterArray.ingridient || drink.strIngredient4 == filterArray.ingridient 
            || drink.strIngredient5 == filterArray.ingridient || drink.strIngredient6 == filterArray.ingridient
        )&& null == filterArray.alcohol && filterArray.type == null){
            creatingCoctailCard(drink, displayContainer2)
        }else if((drink.strIngredient1 == filterArray.ingridient || drink.strIngredient2 == filterArray.ingridient 
            || drink.strIngredient3 == filterArray.ingridient || drink.strIngredient4 == filterArray.ingridient 
            || drink.strIngredient5 == filterArray.ingridient || drink.strIngredient6 == filterArray.ingridient
        )&& drink.strAlcoholic == filterArray.alcohol && filterArray.type == null){
            creatingCoctailCard(drink, displayContainer2)
        }else if((drink.strIngredient1 == filterArray.ingridient || drink.strIngredient2 == filterArray.ingridient 
            || drink.strIngredient3 == filterArray.ingridient || drink.strIngredient4 == filterArray.ingridient 
            || drink.strIngredient5 == filterArray.ingridient || drink.strIngredient6 == filterArray.ingridient
        )&& null == filterArray.alcohol && filterArray.type == drink.strCategory){
            creatingCoctailCard(drink, displayContainer2)
        }
    }
    if(displayContainer2.childElementCount == 0){
        const noDrinkMessage = document.createElement('div')
        displayContainer.append(noDrinkMessage)
        noDrinkMessage.textContent = 'Unfortunantely, there is no drink that fits your description :('
        noDrinkMessage.setAttribute('class','text-center display-5 mt-5 text-muted')
    }
}

function removeChildren(container){
    let children = container.children
    if(children.length > 0){
        for(let child of children){
            child.remove()
        }
    }
}