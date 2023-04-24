import {recipes} from "../data/recipes";
import {getArrayUstensils, getArrayAppliance, getArrayIngredients} from "./functions";
import {displayRecipes} from "./recipes";
import {
    displayItemsFilters,
    closeOpenModalCategoryFilters,
    filterRecipesBySearch,
    filterItemsBySearch
} from "./filters";
// @ts-ignore
import {addFilter, deleteFilter} from "./filters";

let ingredients: string[] = getArrayIngredients(recipes)
let appliance: string[] = getArrayAppliance(recipes)
let ustensils: string[] = getArrayUstensils(recipes)
let closeModalIngredients: boolean = true
let closeModalAppliance: boolean = true
let closeModalUstensils: boolean = true
const divIngredients: HTMLElement = document.getElementById('ingredients') as HTMLElement
const divApplicance: HTMLElement = document.getElementById('appliance') as HTMLElement
const divUstensils: HTMLElement = document.getElementById('ustensils') as HTMLElement

displayRecipes(recipes)
displayItemsFilters(divIngredients, ingredients, "gridIngredients")
displayItemsFilters(divApplicance, appliance, "gridAppliance")
displayItemsFilters(divUstensils, ustensils, "gridUstensils")

document.querySelector('#ingredients button')!.addEventListener('click', function () {
        if (!closeModalAppliance)
            closeModalAppliance = closeOpenModalCategoryFilters('appliance', "pathSvgAppliance", closeModalAppliance, "gridAppliance", "searchAppliance")
        if (!closeModalUstensils)
            closeModalUstensils = closeOpenModalCategoryFilters('ustensils', "pathSvgUstensils", closeModalUstensils, "gridUstensils", "searchUstensils")
        closeModalIngredients = closeOpenModalCategoryFilters('ingredients', "pathSvgIngredients", closeModalIngredients, "gridIngredients", "searchIngredients")
})
document.querySelector('#appliance button')!.addEventListener('click', function () {
        if (!closeModalIngredients)
            closeModalIngredients = closeOpenModalCategoryFilters('ingredients', "pathSvgIngredients", closeModalIngredients, "gridIngredients", "searchIngredients")
        if (!closeModalUstensils)
            closeModalUstensils = closeOpenModalCategoryFilters('ustensils', "pathSvgUstensils", closeModalUstensils, "gridUstensils", "searchUstensils")
        closeModalAppliance = closeOpenModalCategoryFilters('appliance', "pathSvgAppliance", closeModalAppliance, "gridAppliance", "searchAppliance")
})
document.querySelector('#ustensils button')!.addEventListener('click', function () {
        if (!closeModalAppliance)
            closeModalAppliance = closeOpenModalCategoryFilters('appliance', "pathSvgAppliance", closeModalAppliance, "gridAppliance", "searchAppliance")
        if (!closeModalIngredients)
            closeModalIngredients = closeOpenModalCategoryFilters('ingredients', "pathSvgIngredients", closeModalIngredients, "gridIngredients", "searchIngredients")
        closeModalUstensils = closeOpenModalCategoryFilters('ustensils', "pathSvgUstensils", closeModalUstensils, "gridUstensils", "searchUstensils")
})

addFilter(recipes)
deleteFilter(recipes)
filterRecipesBySearch(recipes)

document.getElementById('searchIngredients')!.addEventListener('input', function () {
    filterItemsBySearch(recipes, "searchIngredients")
})
document.getElementById('searchUstensils')!.addEventListener('input', function () {
    filterItemsBySearch(recipes, "searchUstensils")
})
document.getElementById('searchAppliance')!.addEventListener('input', function () {
    filterItemsBySearch(recipes, "searchAppliance")
})



