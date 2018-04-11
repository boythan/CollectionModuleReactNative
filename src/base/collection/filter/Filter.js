class Filter<Item> {
  constructor(func: (items: Item[]) => Item[]) {
    this.filterFunction = func;
  }
  filter(items: Item[]): Item[] {
    return this.filterFunction(items);
  };
}

export default Filter;
