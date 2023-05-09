import {Recipe} from "./interface/Recipe";

/**
 Check if an element belongs to an array.
 @param {string[]} array - The array to check.
 @param {string} element - The element to check for.
 @returns {boolean} - True if the element is in the array, false otherwise.
 */
export function belongsElementArray(array: string[], element: string): boolean {
    return array.map(item => item.toLowerCase()).includes(element.toLowerCase())
}

/**
 * Get an array of unique ingredients from an array of recipes
 * @param {Recipe[]} recipe - An array of recipes
 * @returns {string[]} An array of unique ingredients
 */
export function getArrayIngredients(recipe: Recipe[]): string[] {
    let array: string[] = []
    for (let i = 0; i < recipe.length; i++) {
        for (let j = 0; j < recipe[i].ingredients.length; j++) {
            if (!belongsElementArray(array, recipe[i].ingredients[j].ingredient.toLowerCase()))
                array.push(recipe[i].ingredients[j].ingredient)
        }
    }
    return array
}

/**
 Returns an array containing all unique appliance names in the provided recipes
 @param {Recipe[]} recipe - An array of recipe objects
 @returns {string[]} An array of unique appliance names
 */
export function getArrayAppliance(recipe: Recipe[]): string[] {
    let array: string[] = []
    for (let i = 0; i < recipe.length; i++) {
        if (!belongsElementArray(array, recipe[i].appliance.toLowerCase()))
            array.push(recipe[i].appliance)
    }
    return array
}

/**
 * Get an array with all the unique ustensils from an array of recipes
 * @param {Recipe[]} recipe - An array of Recipe objects
 * @returns {string[]} An array with all the unique ustensils from the recipes
 */
export function getArrayUstensils(recipe: Recipe[]): string[] {
    let array: string[] = []
    for (let i = 0; i < recipe.length; i++) {
        for (let j = 0; j < recipe[i].ustensils.length; j++) {
            if (!belongsElementArray(array, recipe[i].ustensils[j].toLowerCase()))
                array.push(recipe[i].ustensils[j])
        }
    }
    return array
}

/**
 Get the color for an element based on its presence in the given recipe
 @param {string} element - The element for which to get the color
 @param {Recipe[]} recipe - An array of Recipe objects
 @returns {string} - The color code for the given element
 */
export function getColorElement(element: string, recipe: Recipe[]): string {
    let color: string = "";
    const ingredients: string[] = getArrayIngredients(recipe)
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i] === element) {
            color = "#3282F7"
        }
    }
    if (!color) {
        const appliance: string[] = getArrayAppliance(recipe)
        for (let i = 0; i < appliance.length; i++) {
            if (appliance[i] === element) {
                color = "#68D9A4"
            }
        }
    }
    if (!color) {
        const ustensils: string[] = getArrayUstensils(recipe)
        for (let i = 0; i < ustensils.length; i++) {
            if (ustensils[i] === element) {
                color = "#ED6454"
            }
        }
    }
    return color;
}
