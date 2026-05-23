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
        { itemName: 'Apples', quantity: '5', productData: null },
        { itemName: 'Milk', quantity: '1 gallon', productData: null }
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

  addGrocery(itemName, quantity, productData = null) {
    const newGrocery = { itemName: itemName, quantity: quantity, productData: productData };
    this.commit([...this.groceries, newGrocery]);
  }

  deleteGrocery(index) {
    this.commit(this.groceries.filter((_, groceryIndex) => groceryIndex !== index));
  }

  updateGroceryProductData(index, productData) {
    const updatedGroceries = [...this.groceries];
    if (updatedGroceries[index]) {
      updatedGroceries[index].productData = productData;
      this.commit(updatedGroceries);
    }
  }
}