export interface Recipe {
    id: number;
    name: string;
    servings: number;
    description: string;
    time:number
    ingredients: {
        ingredient: string;
        quantity?: number | string;
        unit?: string;
        unite?: string;
    }[];

    appliance: string;
    ustensils: string[];
}