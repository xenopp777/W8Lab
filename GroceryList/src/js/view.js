// Edited by Zoie D 4/23/26

/* ========== View ========== */

export class GroceryView {
  constructor() {
    this.app = document.querySelector('.grocery-list');
    this.form = document.querySelector('.grocery-form');
    this.itemNameInput = document.getElementById('itemName');
    this.quantityInput = document.getElementById('quantity');
  }

  get itemName() {
    return this.itemNameInput.value.trim();
  }

  get quantity() {
    return this.quantityInput.value.trim();
  }

  resetForm() {
    this.form.reset();
  }

  displayGroceries(groceries) {
    let html = '';
    for (let i = 0; i < groceries.length; i++) {
      const grocery = groceries[i];
      html += `
      <div class="list-group-item d-flex justify-content-between align-items-center" data-index="${i}">
        <div>
          <h5 class="mb-1">${grocery.itemName}</h5>
          <small class="text-muted">Quantity: ${grocery.quantity}</small>
        </div>
        <button name="deleteGrocery" type="button" class="btn btn-danger btn-sm" aria-label="Delete item">
          <i class="bi-trash"></i>
        </button>
      </div>`;
    }
    this.app.innerHTML = html;
  }

  onAddGrocery(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!this.form.checkValidity()) {
        this.form.reportValidity();
        return;
      }

      handler(this.itemName, this.quantity);
      this.resetForm();
    });
  }

  onDeleteGrocery(handler) {
    this.app.addEventListener('click', (event) => {
      const deleteButton = event.target.closest('button[name="deleteGrocery"]');
      if (!deleteButton) {
        return;
      }

      const itemEl = deleteButton.closest('[data-index]');
      const index = parseInt(itemEl.getAttribute('data-index'), 10);
      handler(index);
    });
  }
}