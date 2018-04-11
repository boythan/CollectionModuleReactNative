type ItemWrapper<Item> = { selected: boolean, item: Item };

interface ISelector<Item> {
  selectedMap: Map<string, ItemWrapper<Item>>;
  setSelected(id: string, selected: boolean, data: Item): void;
  getSelected(): Item[];
  toggleSelected(id: string, data: Item): void;
  get(id: string): boolean;
}

class Selector implements ISelector {

  selectedMap = new Map();

  toggleSelected(id, data) {
    const itemWrapper = this.selectedMap.get(id);
    let selected = false;
    if (!itemWrapper) {
      selected = true;
    } else {
      selected = !itemWrapper.selected;
    }
    this.setSelected(id, selected, data);
  }

  getSelected() {
    const result = [];
    this.selectedMap.forEach((element) => {
      if (element.selected) {
        result.push(element.item);
      }
    }, this);
    return result;
  }

  get(id) {
    const itemWrapper = this.selectedMap.get(id);
    if (!itemWrapper) return false;
    return itemWrapper.selected;
  }

  clearSelected() {
    this.selectedMap.clear();
  }
}

export default Selector;
