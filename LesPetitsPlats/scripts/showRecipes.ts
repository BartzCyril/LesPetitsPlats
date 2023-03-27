import {Recipe} from "./interface/Recipe";

export function displayRecipes(recipes: Recipe[]) {
    for (let i=0; i < recipes.length; i++) {
        let ingredients: string = ""
        for (let j=0; j < recipes[i].ingredients.length; j++) {
            ingredients += `<li><strong>${recipes[i].ingredients[j].ingredient}</strong>${recipes[i].ingredients[j].quantity ? ': ' : ''}${recipes[i].ingredients[j].quantity || ''} ${recipes[i].ingredients[j].unit || ''}</li>`
        }
        document.querySelector<HTMLElement>('.recipes')!.insertAdjacentHTML('beforeend',`
            <div class="recipes-item">
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

export function displayItems(category: HTMLElement | null, array: string[], idGrid: string) {
    let itemsCategory: string = ""
    for (let i=0; i < array.length; i++) {
        itemsCategory += `<p id="${array[i]}">${array[i]}</p>`
    }
    category!.insertAdjacentHTML('beforeend', `
        <div id="${idGrid}" class="filters-items-grid hidden">
            ${itemsCategory}
        </div>
    `)
}
export function closeOpenModal(idCategory: string, idSvgPath: string, closeModal: boolean, idGrid: string, idSearch: string) {
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