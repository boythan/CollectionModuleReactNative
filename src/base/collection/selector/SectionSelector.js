import Selector from './Selector';
import SingleSelector from './SingleSelector';
import MultipleSelector from './MultipleSelector';

class SectionSelector extends Selector {

  //<string, Selector>
  sectionSelectedMap = new Map();

  toggleSelected(id, data, sectionKey) {
    sectionSelector = this.sectionSelectedMap.get(sectionKey);
    sectionSelector.toggleSelected(id, data);
  }

  getSectionItemsSelected(sectionKey) {
    let result = [];
    this.sectionSelectedMap.forEach((value, key) => {
      if (key === sectionKey) {
        result = value.getSelected();
        return;
      }
    }, this);
    return result;
  }

  getSelected() {
    const result = new Map();
    this.sectionSelectedMap.forEach((value, key) => {
      result.set(key, value.getSelected());
    }, this);
    return result;
  }

  get(id, sectionKey) {
    return this.sectionSelectedMap.get(sectionKey).get(id);
  }

  setSelected(id, selected, data, sectionKey) {
    // We should not togge a selected item already.
    // Because if we have one selector, deselect make no item selected.
    selector = this.sectionSelectedMap.get(sectionKey);
    selector && selector.setSelected(id, selected, data);
  }

  clearSelected(sectionKey) {
    selector = this.sectionSelectedMap.get(sectionKey);
    selector && selector.clearSelected();
  }

  init(sections) {
    for (let index = 0; index < sections.length; index++) {
      const section = sections[index];
      if (!section.key) throw 'Section must have key';
      let selector = this.sectionSelectedMap.get(section.key);
      if (!selector) {
        selector = section.multipleSelection ? new MultipleSelector() : new SingleSelector();
      }
      this.sectionSelectedMap.set(section.key, selector);
    }
  }
}

export default SectionSelector;
