import { addProduct, getInventory, resetInventory } from '../js/inventoryLogic.js';

describe('Inventory Logic', () => {
  beforeEach(() => {
    resetInventory();
  });

  test('adds a product', () => {
    addProduct('Widget', 10, 5.99);
    const inv = getInventory();
    expect(inv.length).toBe(1);
    expect(inv[0].name).toBe('Widget');
  });
});
