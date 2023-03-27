import {Recipe} from "./interface/Recipe";
export function belongsElementArray(array: string[], element: string) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].toLowerCase() === element)
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