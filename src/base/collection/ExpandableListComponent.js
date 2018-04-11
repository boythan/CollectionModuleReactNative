import ListComponent from './ListComponent';
import SectionSelector from './selector/SectionSelector';

class ExpandableListComponent extends ListComponent {

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      selected: new SectionSelector(),
    };
  }

  /**
   * Override from AbsListComponent
   * On this method our list has been updated and we can retrieve items and sections of list
   */
  _beforeDataChanged({ sections }) {
    const sectionSelector = this.state.selected;
    sectionSelector.init(sections);
  }

  toggleSection(sectionKey) {
    const sections = this.state.sections;
    for (let index = 0; index < sections.length; index++) {
      const section = sections[index];
      if (section.key === sectionKey) {
        section.collapse = !section.collapse;
        break;
      }
    }
    this.setState({ sections });
  }

  /**
   * We call this method to toogle selected state of an item.
   * @param {*} itemId unique key for an item
   * @param {*} item object data of an item
   * @param {*} sectionKey unique key for section
   */
  toggleSelect(itemId, item, sectionKey) {
    const stateSelected = this.state.selected;
    stateSelected.toggleSelected(itemId, item, sectionKey);
    this.setState({ selected: stateSelected });
  }

  /**
   * call to get selected state of an item
   * @param {*} itemId: get selected state of an item
   */
  getItemSelected(itemId, sectionKey) {
    return this.state.selected.get(itemId, sectionKey);
  }

  /**
   * Get all selected items in section
   */
  getSectionItemsSelected(sectionKey) {
    return this.state.selected.getSectionItemsSelected(sectionKey);
  }

  /**
   * Get all selected items in list
   */
  getSelected() {
    return this.state.selected.getSelected();
  }

  setSelected(itemId, item, sectionKey) {
    const stateSelected = this.state.selected;
    stateSelected.setSelected(itemId, true, item, sectionKey);
    this.setState({ selected: stateSelected });
  }

  clearSelected(sectionKey) {
    const stateSelected = this.state.selected;
    stateSelected.clearSelected(sectionKey);
    this.setState({ selected: stateSelected });
  }
}
export default ExpandableListComponent;
