import {Recipe} from "./interface/Recipe";

export function belongsElementArray(array: string[], element: string) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].toLowerCase() === element.toLowerCase())
            return true
    }
    return false
}

export function getArrayIngredients(recipe: Recipe[]) {
    let array: string[] = []
    for (let i = 0; i < recipe.length; i++) {
        for (let j = 0; j < recipe[i].ingredients.length; j++) {
            if (!belongsElementArray(array, recipe[i].ingredients[j].ingredient.toLowerCase()))
                array.push(recipe[i].ingredients[j].ingredient)
        }
    }
    return array
}

export function getArrayAppliance(recipe: Recipe[]) {
    let array: string[] = []
    for (let i = 0; i < recipe.length; i++) {
        if (!belongsElementArray(array, recipe[i].appliance.toLowerCase()))
            array.push(recipe[i].appliance)
    }
    return array
}

export function getArrayUstensils(recipe: Recipe[]) {
    let array: string[] = []
    for (let i = 0; i < recipe.length; i++) {
        for (let j = 0; j < recipe[i].ustensils.length; j++) {
            if (!belongsElementArray(array, recipe[i].ustensils[j].toLowerCase()))
                array.push(recipe[i].ustensils[j])
        }
    }
    return array
}

export function getColorElement(element: string, recipe: Recipe[]) {
    let color: string = "";
    const ingredients: string[] = getArrayIngredients(recipe)
    const appliance: string[] = getArrayAppliance(recipe)
    const ustensils: string[] = getArrayUstensils(recipe)
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i] === element) {
            color = "#3282F7"
        }
    }
    if (!color) {
        for (let i = 0; i < appliance.length; i++) {
            if (appliance[i] === element) {
                color = "#68D9A4"
            }
        }
    }
    if (!color) {
        for (let i = 0; i < ustensils.length; i++) {
            if (ustensils[i] === element) {
                color = "#ED6454"
            }
        }
    }
    return color;
}

export function hiddenItems(array1: string[], array2: string[]) {
    for (let i = 0; i < array1.length; i++) {
        if (!belongsElementArray(array2, array1[i])) {
            document.getElementById(array1[i])!.classList.add("hidden")
        } else {
            document.getElementById(array1[i])!.classList.remove("hidden")
        }
    }
}

export function showItems(array: string[]) {
    for (let i = 0; i < array.length; i++) {
        if (document.getElementById(array[i])!.classList.contains("hidden")) {
            document.getElementById(array[i])!.classList.remove("hidden")
        }
    }
}