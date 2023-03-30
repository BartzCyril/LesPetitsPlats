import {Recipe} from "./interface/Recipe";

/**
 * Displays the recipes on the webpage.
 *
 * @param {Recipe[]} recipes - An array of recipe objects.
 * @returns {void}
 */
export function displayRecipes(recipes: Recipe[]): void {
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

/**
 * Determines if a recipe can be made based on selected ingredients, appliances and ustensils.
 *
 * @param {Recipe[]} recipes - An array of recipe objects.
 * @param {number} key - The index of the recipe object to check.
 * @returns {boolean} - Returns true if the recipe can be made with the selected ingredients, appliances and ustensils, otherwise false.
 */
function canMakeRecipes(recipes: Recipe[], key: number): boolean {
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

/**
 * Displays an error message if no recipes match the search criteria.
 * @param {number} count - The number of recipes that do not match the search criteria.
 * @param {number} countMax - The number of recipes
 * @returns {void}
 */
function displayRecipesError(count: number, countMax: number) : void{
    const sectionRecipes = document.querySelector('.recipes')
    const recipesError = document.getElementById('recipesError')
    if (count === countMax) {
        if (recipesError === null) {
            const p = document.createElement('p')
            p.id = "recipesError"
            p.style.position = "absolute"
            p.textContent = "Aucune recette ne correspond à votre critère... vous pouvez\n" +
                "chercher « tarte aux pommes », « poisson », etc."
            sectionRecipes!.appendChild(p)
        }
    } else {
        if (recipesError !== null) {
            recipesError.remove()
        }
    }
}

/**
 * Updates the displayed recipes based on the user input and selected ingredients, appliances and ustensils.
 *
 * @param {Recipe[]} recipes - An array of recipe objects.
 * @param {HTMLInputElement} input - The input element that contains the user's search query.
 * @returns {void}
 */
export function updateRecipes(recipes: Recipe[], input: HTMLInputElement): void {
    let counter: number = 0
    for (let i = 0; i < recipes.length; i++) {
        if (!recipes[i].name.toLowerCase().includes(input.value.toLowerCase().trim()) || !canMakeRecipes(recipes, i)) {
            document.getElementById(recipes[i].name)!.classList.add("hidden")
            counter++
        }
        else
            document.getElementById(recipes[i].name)!.classList.remove("hidden")
    }
    displayRecipesError(counter, recipes.length)
}

