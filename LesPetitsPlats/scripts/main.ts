import {recipes} from "../data/recipes";
import {getArrayUstensils, getArrayAppliance, getArrayIngredients} from "./functions";
import {displayRecipes, displayItems, closeOpenModal} from "./showRecipes";

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
displayItems(divIngredients, ingredients, "gridIngredients")
displayItems(divApplicance, appliance, "gridAppliance")
displayItems(divUstensils, ustensils, "gridUstensils")

document.querySelector('#ingredients button')!.addEventListener('click', function () {
    if (closeModalAppliance && closeModalUstensils)
        closeModalIngredients = closeOpenModal('ingredients', "pathSvgIngredients", closeModalIngredients, "gridIngredients", "searchIngredients")
})

document.querySelector('#appliance button')!.addEventListener('click', function () {
    if (closeModalIngredients && closeModalUstensils)
        closeModalAppliance = closeOpenModal('appliance', "pathSvgAppliance", closeModalAppliance, "gridAppliance", "searchAppliance")
})

document.querySelector('#ustensils button')!.addEventListener('click', function () {
    if (closeModalAppliance && closeModalIngredients)
        closeModalUstensils = closeOpenModal('ustensils', "pathSvgUstensils", closeModalUstensils, "gridUstensils", "searchUstensils")
})



