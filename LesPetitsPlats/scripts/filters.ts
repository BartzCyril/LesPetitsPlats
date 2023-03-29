import {Recipe} from "./interface/Recipe";
import {
    belongsElementArray,
    getArrayAppliance,
    getArrayIngredients, getArrayUstensils,
    getColorElement,
} from "./functions";
import {updateRecipes} from "./recipes";

declare global {
    interface Window {
        deleteFilterSelectedItem: () => void;
    }
}

interface RemovableElement extends HTMLElement {
    remove(): void;
}

const search: HTMLInputElement = document.getElementById("search") as HTMLInputElement

export function displayItemsFilters(category: HTMLElement | null, array: string[], idGrid: string) {
    let itemsCategory: string = ""
    for (let i = 0; i < array.length; i++) {
        itemsCategory += `<p id="${array[i]}">${array[i]}</p>`
    }
    category!.insertAdjacentHTML('beforeend', `
        <div id="${idGrid}" class="filters-items-grid hidden">
            ${itemsCategory}
        </div>
    `)
}

export function closeOpenModalCategoryFilters(idCategory: string, idSvgPath: string, closeModal: boolean, idGrid: string, idSearch: string) {
    const svgPathModalOpen: string = "M1.88 10.5466L8 4.43996L14.12 10.5466L16 8.66663L8 0.66663L1.64355e-07 8.66663L1.88 10.5466Z"
    const svgPathModelClose: string = "M14.12 0.453369L8 6.56004L1.88 0.453369L0 2.33337L8 10.3334L16 2.33337L14.12 0.453369Z"
    const pathSvg: HTMLElement = document.getElementById(idSvgPath) as HTMLElement
    const title: HTMLElement = document.querySelector(`#${idCategory} p`) as HTMLElement
    const category: HTMLElement = document.getElementById(idCategory) as HTMLElement
    if (!closeModal) {
        document.getElementById(idGrid)!.classList.add("hidden")
        document.getElementById(idSearch)!.classList.add("hidden")
        category.classList.add("filters-items-size")
        category.style.padding = "23px 15px 24px 15px"
        title.classList.remove("hidden")
        closeModal = true
        pathSvg.setAttribute("d", svgPathModelClose)
    } else {
        document.getElementById(idGrid)!.classList.remove("hidden")
        document.getElementById(idSearch)!.classList.remove("hidden")
        category.classList.remove("filters-items-size")
        category.style.padding = "22px 19px 16px 19px"
        title.classList.add("hidden")
        closeModal = false
        pathSvg.setAttribute("d", svgPathModalOpen)
    }
    return closeModal
}

function createFilterItem(name: string, color: string) {
    return `
        <div style="background-color: ${color}" class="filter-selected-item">
            <p>${name}</p>
            <button onclick='deleteFilterSelectedItem.bind(this)()' data-name="${name}">
                   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                   </svg>
            </button>
        </div>
    `
}

function updateItems(recipes: Recipe[], create: boolean) {
    const items = document.querySelectorAll('.filter-selected-item p')
    let arrayIngredients: string[] = []
    let arrayUstensils: string[] = []
    let arrayApplicance: string[] = []
    const ingredients: string[] = getArrayIngredients(recipes)
    const appliance: string[] = getArrayAppliance(recipes)
    const ustensils: string[] = getArrayUstensils(recipes)
    if (items.length !== 0 || search.value.length !== 0) {
        for (let j = 0; j < recipes.length; j++) {
            if (!document.getElementById(recipes[j].name)!.classList.contains("hidden")) {
                // ingredients
                for (let k = 0; k < recipes[j].ingredients.length; k++) {
                    if (!belongsElementArray(arrayIngredients, recipes[j].ingredients[k].ingredient.toLowerCase())) {
                        arrayIngredients.push(recipes[j].ingredients[k].ingredient)
                    }
                }
                // ustensils
                for (let k = 0; k < recipes[j].ustensils.length; k++) {
                    if (!belongsElementArray(arrayUstensils, recipes[j].ustensils[k].toLowerCase())) {
                        arrayUstensils.push(recipes[j].ustensils[k])
                    }
                }
                // appliance
                if (!belongsElementArray(arrayApplicance, recipes[j].appliance.toLowerCase())) {
                    arrayApplicance.push(recipes[j].appliance)
                }
            }
        }
        hiddenFilterItems(ingredients, arrayIngredients)
        hiddenFilterItems(ustensils, arrayUstensils)
        hiddenFilterItems(appliance, arrayApplicance)
    } else {
        showFilterItems(ingredients)
        showFilterItems(ustensils)
        showFilterItems(appliance)
    }
    if (create) {
        return {
            "ingredients": arrayIngredients,
            "ustensils": arrayUstensils,
            "appliance": arrayApplicance
        }
    }
    return null
}

export function addFilter(recipes: Recipe[]) {
    const filteredElements: NodeListOf<HTMLElement> = document.querySelectorAll('.filters-items-grid p')
    let input: HTMLInputElement | null = null
    for (let i = 0; i < filteredElements.length; i++) {
        filteredElements[i].addEventListener('click', function () {
            const name: string = filteredElements[i].textContent as string
            const color: string = getColorElement(name, recipes)
            switch (color) {
                case "#3282F7":
                    input = document.getElementById('searchIngredients') as HTMLInputElement
                    input.value = ""
                    break
                case "#68D9A4":
                    input = document.getElementById('searchAppliance') as HTMLInputElement
                    input.value = ""
                    break
                case "#ED6454":
                    input = document.getElementById('searchUstensils') as HTMLInputElement
                    input.value = ""
                    break
            }
            document.querySelector('.parent-filter-selected-item')!.insertAdjacentHTML('beforeend', createFilterItem(name, color))
            updateRecipes(recipes, search)
            updateItems(recipes, false)
        })
    }
}

export function deleteFilter(recipes: Recipe[]) {
    window.deleteFilterSelectedItem = function (this: HTMLElement) {
        const name: string = this.dataset.name as string;
        if (!name) return;

        const element: HTMLElement = document.getElementById(name) as HTMLElement;
        if (element) {
            element.classList.remove("hidden");
        }
        const parentNode = this.parentNode as RemovableElement
        parentNode?.remove();

        updateRecipes(recipes, search)
        updateItems(recipes, false)
    };
}

export function hiddenFilterItems(array1: string[] | null, array2: string[] | null) {
    if (array1 !== null && array2 !== null) {
        for (let i = 0; i < array1.length; i++) {
            if (!belongsElementArray(array2, array1[i])) {
                document.getElementById(array1[i])!.classList.add("hidden")
            } else {
                document.getElementById(array1[i])!.classList.remove("hidden")
            }
        }
    }
    const filterSelectedItems: NodeListOf<HTMLParagraphElement> = document.querySelectorAll('.filter-selected-item p')
    for (let i = 0; i < filterSelectedItems.length; i++) {
        const value = filterSelectedItems[i].textContent as string
        document.getElementById(value)!.classList.add("hidden")
    }
}


export function showFilterItems(array: string[]) {
    for (let i = 0; i < array.length; i++) {
        if (document.getElementById(array[i])!.classList.contains("hidden")) {
            document.getElementById(array[i])!.classList.remove("hidden")
        }
    }
}

/**
 * Filters the recipes by search input.
 *
 * @param {Recipe[]} recipes - An array of recipe objects.
 * @param {string} idCategoryInput - The ID of the category input element.
 * @returns {void}
 */
export function filterRecipesBySearch(recipes: Recipe[]) {
    search.addEventListener('input', function () {
        if (search.value.length >= 3) {
            if (document.querySelectorAll('.filter-selected-item p').length > 0) {
                let newArrayRecipes: Recipe[] = []
                for (let i = 0; i < recipes.length; i++) {
                    if (!document.getElementById(recipes[i].name)!.classList.contains("hidden"))
                        newArrayRecipes.push(recipes[i])
                }
                updateRecipes(newArrayRecipes, this)
            } else {
                updateRecipes(recipes, this)
            }
        } else if (search.value.length === 0) {
            updateRecipes(recipes, this)
        }
        updateItems(recipes, false)
    })
}

/**
 * Filters the filters items by search input.
 *
 * @param {Recipe[]} recipes - An array of recipe objects.
 * @param {string} idCategoryInput - The ID of the category input element.
 * @returns {void}
 */
export function filterItemsBySearch(recipes: Recipe[], idCategoryInput: string): void {
    let array: string[]
    let value: string
    const objet = updateItems(recipes, true) as { ingredients: string[], ustensils: string[], appliance: string[] }
    const input = document.getElementById(idCategoryInput) as HTMLInputElement
    switch (idCategoryInput) {
        case "searchIngredients" :
            array = objet.ingredients.length === 0 ? getArrayIngredients(recipes) : objet.ingredients
            value = input!.value
            break
        case "searchAppliance" :
            array = objet.appliance.length === 0 ? getArrayAppliance(recipes) : objet.appliance
            value = input!.value
            break
        default:
            array = objet.ustensils.length === 0 ? getArrayUstensils(recipes) : objet.ustensils
            value = input!.value
            break
    }
    if (value.length === 0) {
        for (let i = 0; i < array.length; i++) {
            document.getElementById(array[i])!.classList.remove("hidden")
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            if (!array[i].toLowerCase().includes(value.toLowerCase().trim()))
                document.getElementById(array[i])!.classList.add("hidden")
            else
                document.getElementById(array[i])!.classList.remove("hidden")
        }
    }
    hiddenFilterItems(null, null)
}



