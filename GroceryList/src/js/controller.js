// Edited by Zoie D 4/23/26

/* ========== Controller ========== */

export class GroceryController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.subscribeGroceryListChanged(this.onGroceryListChanged);
    this.view.onAddGrocery(this.handleAddGrocery);
    this.view.onDeleteGrocery(this.handleDeleteGrocery);

    this.onGroceryListChanged(this.model.groceries);
  }

  onGroceryListChanged = (groceries) => {
    this.view.displayGroceries(groceries);
  };

  handleAddGrocery = (itemName, quantity) => {
    return this.model.addGrocery(itemName, quantity);
  };

  handleDeleteGrocery = (index) => {
    this.model.deleteGrocery(index);
  };
}