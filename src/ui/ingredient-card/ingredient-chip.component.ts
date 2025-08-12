import { Component, Input, OnChanges } from '@angular/core';
import { Card, CardModule } from 'primeng/card';
import { Ingredient, IngredientCategory } from '../../app/model/ingredient';
import { IconUtils } from '../../app/utils/icons';
import { Chip, ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ingredient-chip',
  imports: [Chip, ChipModule, CommonModule],
  templateUrl: './ingredient-chip.component.html',
  styleUrl: './ingredient-chip.component.scss'
})
export class IngredientChipComponent implements OnChanges {

  @Input() ingredient!: Ingredient;

  label: string;
  icon: string;

  classes: string[] = ['prime-pill'];

  constructor() {
    // super();

    this.ingredient = { id: 'Unknown', category: IngredientCategory.other, optional: true };
    this.label = this.ingredient.id;
    this.icon = this.getIcon(this.ingredient.category);
  }
  
  ngOnChanges() {
    if (this.ingredient.id !== 'Unknown') {
      this.label = this.ingredient.id;
      this.icon = this.getIcon(this.ingredient.category);
      this.classes = [...this.classes, this.ingredient.category];
    }
  }


  getIcon(category: string) : string {
    return IconUtils.getFAIngredientIcon(category);
  }
}
