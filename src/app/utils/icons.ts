export class IconUtils {

    static getFAIngredientIcon(ingredientType: string) : string {
        switch (ingredientType) {
            case "vegetable":
                return "fa-solid fa-carrot";
            case "fruit":
                return "fa-solid fa-apple-whole";
            case "meat":
                return "fa-solid fa-drumstick-bite";
            case "beef":
                return "fa-solid fa-cow";
            case "fish":
                return "fa-solid fa-fish-fins";
            case "dairy":
                return "fa-solid fa-cheese";
            case "grain":
                return "fa-solid fa-wheat-awn";
            case "spice":
                return "fa-solid fa-pepper-hot";
            case "nuts":
                return "fa-solid fa-seedling";
            case "herb":
                return "fa-solid fa-leaf";
            case "sauce":
                return "fa-solid fa-bottle-droplet";
            default:
                return "fa-solid fa-question";
        }
    }
}