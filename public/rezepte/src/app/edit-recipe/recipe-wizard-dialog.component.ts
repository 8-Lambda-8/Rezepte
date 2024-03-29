import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import "ts-replace-all";
import { IngredientEntry } from '../models/ingredientEntry';
import { IngredientsService } from '../service/ingredients.service';

@Component({
    selector: 'recipe-wizard-dialog',
    templateUrl: './recipe-wizard-dialog.component.html',
    styleUrls: ['./edit-recipe.component.scss']
})
export class RecipeWizardComponent {

    ingredients: Ingredient[];
    recipe: Recipe;
    parsingErrors: string[] = [];

    displayedColumns = ["name", "amount", "unit", "knownIngredient"];

    constructor(
        public dialogRef: MatDialogRef<RecipeWizardComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Recipe,
        private ingredientsService: IngredientsService
    ) {
        this.recipe = Object.assign({}, data);
        ingredientsService.getIngredients().subscribe(item => this.ingredients = item);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addIngredient(ing: IngredientEntry) {
        console.log("create " + ing.name);
        let units: string[] = [];
        if (ing.unit != "-") {
            units.push(ing.unit);
        }
        this.ingredientsService.addIngredient({ id: "", name: ing.name, possibleUnits: units })
        setTimeout(this.onTextChanged, 2000);
    }

    onTextChanged() {

        this.parsingErrors = [];
        console.log("onTextChanged");

        let arr = this.recipe.originalText.split("Zubereitung: ");
        this.recipe.text = arr[1];
        let ingredientText = arr[0];

        arr = ingredientText.split("Zutaten: ");

        ingredientText = arr[1];
        this.recipe.name = arr[0].replaceAll("\n", "");


        if (ingredientText == undefined) return;

        ingredientText = ingredientText.replaceAll("\n", " ");
        ingredientText = ingredientText.replaceAll("  ", " ");
        ingredientText = ingredientText.replaceAll(" und ", ", ");
        ingredientText = ingredientText.replaceAll(" oder ", ", ");
        ingredientText = ingredientText.replaceAll(" Sauce: ", ", Sauce:, ");
        ingredientText = ingredientText.replaceAll(" Creme: ", ", Creme:, ");
        ingredientText = ingredientText.replaceAll(" Teig: ", ", Teig:, ");

        console.log(ingredientText);
        if (ingredientText.endsWith(" "))
            ingredientText = ingredientText.slice(0, -1);
        if (ingredientText.endsWith("."))
            ingredientText = ingredientText.slice(0, -1);

        this.recipe.ingredients = [];

        ingredientText.split(', ').forEach(entry => {
            console.log(entry)
            let words = entry.split(' ');
            let ingredient: IngredientEntry = { id: "", name: "", amount: 0, unit: "" };

            //Interpret entrys
            if (words.length == 1) { // Unitless
                ingredient.name = words[0];
                ingredient.unit = "-";
            } else if (words.length == 2 && words[0][1] == "/" &&
                !isNaN(+words[0][0]) && !isNaN(+words[0][2])) { // fractional numbers "1/8l Milch"

                ingredient.amount = (+words[0][0]) / (+words[0][2]);
                ingredient.name = words[1];
                ingredient.unit = words[0][3].toUpperCase();
            } else if (words.length == 2 && !isNaN(+words[0])) { // "1 Ei"
                if (words[1] == "Ei") words[1] = "Eier";
                ingredient.amount = +words[0];
                ingredient.name = words[1];
                ingredient.unit = "Stk"
            } else if (words.length == 3 && !isNaN(+words[0])) { // "4 dag Walnüsse"
                ingredient.amount = (+words[0]);
                ingredient.name = words[2];
                ingredient.unit = words[1];
                if (ingredient.unit.toLowerCase() == "kleine") { // "2 kleine Eier"
                    ingredient.unit = "-"
                }
            } else if (words.length == 4 && !isNaN(+words[0])) { // "25 dag Topfen (20%)"
                ingredient.amount = (+words[0])
                ingredient.name = words[2] + " " + words[3];
                ingredient.unit = words[1];
            } else {
                console.error(words)
                this.parsingErrors.push(words.join(" "));
                return
            }

            //Unit postprocessing
            if (ingredient.unit == "dag") {
                ingredient.unit = "g";
                ingredient.amount = ingredient.amount * 10
            } else if (["TI", "KL", "KI"].some(x => x == ingredient.unit.toUpperCase())) {
                ingredient.unit = "TL";
            } else if (ingredient.unit.toUpperCase() == "EI") {
                ingredient.unit = "EL";
            }

            if (ingredient.name.endsWith("."))
                ingredient.name = ingredient.name.slice(0, -1);
            if (ingredient.name.endsWith(","))
                ingredient.name = ingredient.name.slice(0, -1);

            if (ingredient.unit.endsWith("."))
                ingredient.unit = ingredient.unit.slice(0, -1);

            // get id

            let index = this.ingredients.findIndex(ing => ing.name == ingredient.name);
            if (index != -1) {
                ingredient.id = this.ingredients[index].id;
            } else if (ingredient.name == "Sauce:") {
                ingredient.id = "sauceSeperator";
            } else if (ingredient.name == "Teig:") {
                ingredient.id = "doughSeperator";
            } else if (ingredient.name == "Creme:") {
                ingredient.id = "cremeSeperator";
            }

            console.log(ingredient);
            if (!this.recipe.ingredients.find(ing => ing.id == ingredient.id && ing.amount == ingredient.amount)) {
                this.recipe.ingredients.push(ingredient);
            }

        });
        console.log(this.recipe.ingredients);
        console.log("#######");

        //*/

    }

}