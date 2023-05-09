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

/**
 Displays the items filters in the given category element.
 @param {HTMLElement | null} category - The category element where the items filters will be displayed.
 @param {string[]} array - The array of items to display as filters.
 @param {string} idGrid - The id of the grid element that will contain the filters.
 @returns {void}
 */
export function displayItemsFilters(category: HTMLElement | null, array: string[], idGrid: string): void {
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

/**
 Closes or opens a modal that displays category filters and updates the UI accordingly
 @param {string} idCategory - The ID of the category filter container element
 @param {string} idSvgPath - The ID of the SVG path element used for the modal button
 @param {boolean} closeModal - A boolean indicating whether the modal should be closed or opened
 @param {string} idGrid - The ID of the grid container element
 @param {string} idSearch - The ID of the search input element
 @returns {boolean} - The updated value of closeModal after the function has been called
 */
export function closeOpenModalCategoryFilters(idCategory: string, idSvgPath: string, closeModal: boolean, idGrid: string, idSearch: string): boolean {
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

/**
 Generates the HTML for a filter item with the provided name and color.
 @param {string} name - The name of the filter item.
 @param {string} color - The color of the filter item.
 @returns {string} - The HTML code for the filter item.
 */
function createFilterItem(name: string, color: string): string {
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

/**
 Updates the displayed filter items based on the current state of the recipes and search field, and updates the filter items based on whether or not a new filter-selected-item has been created.
 @param {Recipe[]} recipes - An array of recipes to use for updating the filter items
 @param {boolean} create - A flag indicating whether or not a new filter-selected-item has been created
 @returns {Object|null} - An object containing updated filter item arrays, or null if no filter-selected-item has been created
 */
function updateItems(recipes: Recipe[], create: boolean): object | null {
    const items = document.querySelectorAll('.filter-selected-item p')
    let arrayIngredients: string[] = []
    let arrayUstensils: string[] = []
    let arrayApplicance: string[] = []
    const ingredients: string[] = getArrayIngredients(recipes)
    const appliance: string[] = getArrayAppliance(recipes)
    const ustensils: string[] = getArrayUstensils(recipes)
    if (items.length !== 0 || search.value.length !== 0) {
        recipes.forEach((element) => {
            if (!document.getElementById(element.name)!.classList.contains("hidden")) {
                element.ingredients.forEach(ingredient => {
                    if (!belongsElementArray(arrayIngredients, ingredient.ingredient.toLowerCase())) {
                        arrayIngredients.push(ingredient.ingredient)
                    }
                })

                // ustensils
                element.ustensils.forEach(ustensil => {
                    if (!belongsElementArray(arrayUstensils, ustensil.toLowerCase())) {
                        arrayUstensils.push(ustensil)
                    }
                })

                // appliance
                if (!belongsElementArray(arrayApplicance, element.appliance.toLowerCase())) {
                    arrayApplicance.push(element.appliance)
                }
            }
        })
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

/**
 Adds a filter-selected-item to the DOM when a filter item is clicked, and then updates the displayed recipes and filter items.
 @param {Recipe[]} recipes - An array of recipes to update after adding the filter-selected-item
 @returns {void}
 */
export function addFilter(recipes: Recipe[]): void {
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

/**
 Deletes a filter-selected-item by removing its HTML element from the DOM, and then updates the displayed recipes and filter items.
 @param {Recipe[]} recipes - An array of recipes to update after deleting the filter-selected-item
 @returns {void}
 */
export function deleteFilter(recipes: Recipe[]): void {
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

/**
 Hides filter items that are not selected by adding the "hidden" class to elements in array1 that do not belong to array2.
 Also hides filter-selected-items by adding the "hidden" class to their respective elements.
 @param {string[] | null} array1 - An array of element IDs to hide
 @param {string[] | null} array2 - An array of selected element IDs
 @returns {void}
 */
export function hiddenFilterItems(array1: string[] | null, array2: string[] | null): void {
    if (array1 !== null && array2 !== null) {
        array1.forEach(element => {
            if (!belongsElementArray(array2, element)) {
                document.getElementById(element)!.classList.add("hidden")
            } else {
                document.getElementById(element)!.classList.remove("hidden")
            }
        })
    }

    const filterSelectedItems: NodeListOf<HTMLParagraphElement> = document.querySelectorAll('.filter-selected-item p')
    filterSelectedItems.forEach(filter => {
        const value = filter.textContent as string
        document.getElementById(value)!.classList.add("hidden")
    })
}

/**
 Displays filter items by removing the "hidden" class from elements in the array
 @param {string[]} array - An array of element IDs to display
 @returns {void}
 */
export function showFilterItems(array: string[]) {
    array.forEach((item) => {
        if (document.getElementById(item)!.classList.contains("hidden")) {
            document.getElementById(item)!.classList.remove("hidden");
        }
    });
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
                const newArrayRecipes: Recipe[] = recipes.filter(recipe => {
                    return !document.getElementById(recipe.name)!.classList.contains("hidden");
                });
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



