import {Recipe} from "./interface/Recipe";

export function displayRecipes(recipes: Recipe[]) {
    for (let i=0; i < recipes.length; i++) {
        let ingredients: string = ""
        for (let j=0; j < recipes[i].ingredients.length; j++) {
            ingredients += `<li><strong>${recipes[i].ingredients[j].ingredient}</strong>${recipes[i].ingredients[j].quantity ? ': ' : ''}${recipes[i].ingredients[j].quantity || ''} ${recipes[i].ingredients[j].unit || ''}</li>`
        }
        document.querySelector<HTMLElement>('.recipes')!.insertAdjacentHTML('beforeend',`
            <div class="recipes-item" id="${recipes[i].name}">
                <div class="recipes-item-img"></div>
                <div class="recipes-item-informations">
                    <header>
                        <h2>${recipes[i].name}</h2>
                        <div class="recipes-item-informations-time">
                            <i class="fa-regular fa-clock"></i>
                            <p>${recipes[i].time} min</p>
                        </div>
                    </header>
                    <div>
                        <div class="recipes-item-information-ingredients">
                            <ul>
                                ${ingredients}
                            </ul>
                        </div>
                        <p>${recipes[i].description.slice(0, 200)}...</p>
                    </div>
                </div>
            </div>
        `)
    }
}

export function canMakeRecipes(recipes: Recipe[], key: number) {
    const items: NodeListOf<HTMLParagraphElement> = document.querySelectorAll('.filter-selected-item p')
    if (items.length === 0) {
        return true
    }
    let counter: number = 0
    for (let i = 0; i < recipes[key].ingredients.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (items[j]!.textContent!.toLowerCase() === recipes[key].ingredients[i].ingredient.toLowerCase())
                counter++
        }
    }
    for (let j = 0; j < items.length; j++) {
        if (items[j]!.textContent!.toLowerCase() === recipes[key].appliance.toLowerCase())
            counter++
    }

    for (let i = 0; i < recipes[key].ustensils.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (items[j]!.textContent!.toLowerCase() === recipes[key].ustensils[i].toLowerCase())
                counter++
        }
    }
    return counter === items.length;
}

export function updateRecipes(array: Recipe[], input: HTMLInputElement) {
    for (let i = 0; i < array.length; i++) {
        if (!array[i].name.toLowerCase().includes(input.value.toLowerCase().trim()))
            document.getElementById(array[i].name)!.classList.add("hidden")
        else
            document.getElementById(array[i].name)!.classList.remove("hidden")
    }
}

