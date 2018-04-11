import Selector from './Selector';

class MultipleSelector extends Selector {

  setSelected(id, selected, data) {
    if (!selected) {
      this.selectedMap.delete(id);
    } else {
      this.selectedMap.set(id, { selected: true, item: data });
    }
  }
}

export default MultipleSelector;
