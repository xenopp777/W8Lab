// Edited by Zoie D 4/23/26

/* ========== Model ========== */

export class GroceryModel {
  constructor() {
    try {
      const savedGroceries = JSON.parse(localStorage.getItem('groceries')); // array to hold groceries
      // retrieves groceries from local storage into savedGroceries
      if (!Array.isArray(savedGroceries) || !this.allValid(savedGroceries)) {
        throw new Error('Invalid grocery payload');
      }
      this.groceries = savedGroceries;
    } catch (e) {
      // Provide starter entries if local storage is empty/corrupt.
      this.groceries = [
        { itemName: 'Apples', quantity: '5' },
        { itemName: 'Milk', quantity: '1 gallon' }
      ];
    }
  }

  isValidItem(item) {
    return (
      typeof item === 'object' &&
      item !== null &&
      typeof item.itemName === 'string' &&
      typeof item.quantity === 'string'
    );
  }

  allValid(groceries) {
    for (let i = 0; i < groceries.length; i++) {
      if (!this.isValidItem(groceries[i])) {
        return false;
      }
    }
    return true;
  }

  commit(groceries) {
    this.groceries = groceries;
    localStorage.setItem('groceries', JSON.stringify(groceries));
    this.onGroceryListChanged(groceries);
  }

  subscribeGroceryListChanged(callback) {
    this.onGroceryListChanged = callback;
  }

  addGrocery(itemName, quantity) {
    const newGrocery = { itemName: itemName, quantity: quantity };
    this.commit([...this.groceries, newGrocery]);
  }

  deleteGrocery(index) {
    this.commit(this.groceries.filter((_, groceryIndex) => groceryIndex !== index));
  }
}