import Filter from './Filter';
import CollectionUtils from '../CollectionUtils';

class ItemFilter<Item> extends Filter<Item> {
  filterFunction: (item: Item) => boolean;
  constructor(func: (item: Item) => boolean) {
    super(items => {
      if (CollectionUtils.arrayIsEmpty(items)) return items;
      const result = [];
      for (let i = 0; i < items.length; i += 1) {
        if (func(items[i])) {
          result.push(items[i]);
        }
      }
      return result;
    })
  }
}
export default ItemFilter;
