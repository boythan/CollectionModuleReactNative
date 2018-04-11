import Selector from './Selector';

class SingleSelector extends Selector {

  setSelected(id, selected, data) {
    // We should not togge a selected item already.
    // Because if we have one selector, deselect make no item selected.
    if (!selected) return;
    this.selectedMap.clear();
    this.selectedMap.set(id, { selected: true, item: data });
  }
}

export default SingleSelector;
