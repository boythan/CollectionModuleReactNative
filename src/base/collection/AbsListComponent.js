import { Component, PureComponent } from 'react';
import CollectionMode from './CollectionMode';
import CollectionUtils from './CollectionUtils';
import Selector from './selector/Selector';
import SingleSelector from './selector/SingleSelector';
import MultipleSelector from './selector/MultipleSelector';
import Filter from './filter/Filter';

// var reactMixin = require('react-mixin');
// var TimerMixin = require('react-timer-mixin');

interface PagingInterface<Response, Item, PagingData, Section> {
  source(pagingData: PagingData): Promise<Response>;

  /**
   * Transform response to item list, you can apply sort or whatever you want.
   * In all case for FlatList or SectionList this method declare how a response
   * return a list of item to display
   */
  transformer(response: Response): Item[];

  createSections(items: Item[]): Section[];
  /**
   * Method to tell when all data is loaded, and no need to load anymore.
   */
  noMoreData(response: Response, pagingData: PagingData): boolean;

  /**
   * Create first PagingData
   */
  firstPagingData(): PagingData;

  /**
   * Method to calculate next paging data
   */
  pagingFunction(response: Response, oldPagingData: PagingData): PagingData;
  pagingData: PagingData;

  beforeDataChanged({ response: Response, items: Item[], sections: Section[] }): void;
  afterDataChanged({ response: Response, items: Item[], sections: Section[] }): void;
  getOriginalItems(): Array<Item>;
  afterCalculateFilter({ items: Item[], sections: Section[] }): void;
}

class AbsListComponent<Response, Item, PagingData> extends Component
  implements PagingInterface<Response, Item, PagingData> {

  /**
   * State of list, we seperate with component state because it does not affect directly to view.
   */
  listState = {
    noMoreData: false, /* if no more data, don't make a call to get more */
    loading: false, /* if(loading) we don't make more call to get data. */
    originalItems: [], /* list of item before apply filter. */
    filters: (new Map(): Map<string, Filter>), /* list filter of List */
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sections: [],
      refreshing: false,
      pagingMode: CollectionMode.HIDDEN,
      emptyMode: CollectionMode.HIDDEN,
      selected: new SingleSelector(),
    };
  }
  componentWillMount() {
    this._unmounted = false;
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  start() {
    if (this.listState.loading || this.listState.noMoreData) {
      // We currently loading data OR no more data, ignore it
      return;
    }

    // if pagingData is not initialized, mark it as first load
    const firstLoading = !this.pagingData;
    if (!this.pagingData) {
      this.pagingData = { ...this.firstPagingData() };
    }

    const itemCount = this.state.data.length;

    // setState refreshing is asynchronous so be careful to call your own start()
    if (this.state.refreshing) {
      this.setState({ pagingMode: CollectionMode.HIDDEN, emptyMode: CollectionMode.HIDDEN });
    } else if (firstLoading && itemCount === 0) {
      // If first load, and we dont have any preload data. Show progress of emptyview
      // for better look. Certainly we can show Paging progress, but it will display
      // at the top of List.
      this.setState({ pagingMode: CollectionMode.HIDDEN, emptyMode: CollectionMode.PROGRESS });
    } else {
      // We show Paging Progress, at bottom of list
      this.setState({ pagingMode: CollectionMode.PROGRESS, emptyMode: CollectionMode.HIDDEN });
    }

    // Mark as loading
    this.listState.loading = true;

    // Get next page data
    this.source({ ...this.pagingData }).then(
      (response) => {
        if (this._unmounted) return;
        const noMoreData = this.noMoreData(response, { ...this.pagingData });
        this.pagingData = this.pagingFunction(response, { ...this.pagingData });
        // TRANSFORMER
        const resItems = this.transformer(response);
        if (firstLoading) {
          this.listState.originalItems = resItems || [];
        } else {
          // add prev data to beginning of array
          this.listState.originalItems = this.listState.originalItems.concat(resItems);
        }
        // FILTER: If has filter, we run throught to filter items and sections.
        this.runAsync(this.calculateFilters.bind(this))
          .then(({ items, sections }) => {
            if (this._unmounted) return;
            // for CORE developer use to handle data before list load
            if (this._beforeDataChanged) {
              this._beforeDataChanged({ response, items, sections });
            }

            // for NORMAL developer use in his component
            if (this.beforeDataChanged) {
              this.beforeDataChanged({ response, items, sections });
            }
            // update noMoreData ASAP
            this.listState.noMoreData = noMoreData;

            this.setState({ refreshing: false, data: items, sections }, () => {
              this.listState.loading = false;

              // for CORE developer use to handle data before list load
              if (this._afterDataChanged) {
                this._afterDataChanged({ response, items, sections });
              }

              // for NORMAL developer use in his component
              if (this.afterDataChanged) {
                this.afterDataChanged({ response, items, sections });
              }
            });
            if (CollectionUtils.arrayIsEmpty(this.listState.originalItems)) {
              this.setState({ pagingMode: CollectionMode.HIDDEN, emptyMode: CollectionMode.EMPTY });
            } else if (!noMoreData) {
              this.setState({ pagingMode: CollectionMode.PROGRESS, emptyMode: CollectionMode.HIDDEN });
            } else {
              this.setState({ pagingMode: CollectionMode.HIDDEN, emptyMode: CollectionMode.HIDDEN });
            }
          })
      },
      (error) => { // use error later, so do not remove it.
        if (this._unmounted) return;
        const data = this.state.data;
        this.listState.loading = false;
        if (CollectionUtils.arrayIsEmpty(data)) {
          this.setState({ pagingMode: CollectionMode.HIDDEN, emptyMode: CollectionMode.ERROR });
        } else {
          this.setState({ pagingMode: CollectionMode.ERROR, emptyMode: CollectionMode.HIDDEN });
        }
        this.setState({ refreshing: false });
      });
  }

  /**
   * Should not override this method
   */
  onRefresh() {
    this.setState({ refreshing: true }, this.refresh());
  }

  refresh() {
    // Reset all paging data and state
    this.listState.noMoreData = false;
    this.listState.loading = false;
    // reset to first page. Important because it helps us know list is truly refresh or firs load
    this.pagingData = null;
    this.start();
  }

  /**
   * Should not override this method
   */
  onEndReached() {
    if (this.listState.noMoreData || (this.state.pagingMode === CollectionMode.ERROR ||
      this.state.emptyMode === CollectionMode.ERROR) || CollectionUtils.arrayIsEmpty(this.listState.originalItems)) {
      return;
    }
    this.start();
  }

  /**
   * We call this method to toogle selected state of an item.
   * @param {*} itemId unique key for an item
   * @param {*} item object data of an item
   */
  toggleSelect(itemId, item) {
    const stateSelected = this.state.selected;
    stateSelected.toggleSelected(itemId, item);
    this.setState({ selected: stateSelected });
  }

  /**
   * call to get selected state of an item
   * @param {*} itemId: get selected state of an item
   */
  getItemSelected(itemId) {
    return this.state.selected.get(itemId);
  }

  /**
   * Get all selected items in list
   */
  getSelected() {
    return this.state.selected.getSelected();
  }

  setSelected(itemId, item, bool) {
    const selected = bool || _.isUndefined(bool);
    const stateSelected = this.state.selected;
    stateSelected.setSelected(itemId, selected, item);
    this.setState({ selected: stateSelected });
  }

  clearSelected() {
    const stateSelected = this.state.selected;
    stateSelected.clearSelected();
    this.setState({ selected: stateSelected });
  }

  setMultiSelector(multi: boolean) {
    this.state.selected = multi ? new MultipleSelector() : new SingleSelector();
  }

  addFilter(key: string, filter: Filter) {
    this.listState.filters.set(key, filter);
    this._applyFilter();
  }

  removeFilter(key: string) {
    this.listState.filters.delete(key);
    this._applyFilter();
  }

  calculateFilters(): { items: Item[], sections: Section[] } {
    if (CollectionUtils.arrayIsEmpty(this.listState.originalItems)) {
      const filterList = { items: [], sections: [] };
      if (this.afterCalculateFilter) {
        this.afterCalculateFilter(filterList);
      }
      return filterList;
    }
    let items = this.listState.originalItems;
    this.listState.filters.forEach((filter) => {
      items = filter.filter(items);
    }, this);
    let sections = [];
    if (this.createSections) {
      sections = this.createSections(items);
    }

    if (this.afterCalculateFilter) {
      this.afterCalculateFilter({ items, sections });
    }

    let emptyMode = CollectionUtils.arrayIsEmpty(items) ? CollectionMode.FILTER_EMPTY : CollectionMode.HIDDEN;
    this.setState({ emptyMode: emptyMode });

    return { items, sections };
  }



  _applyFilter() {
    const { items, sections } = this.calculateFilters();
    this.setState({ data: items, sections });
  }

  clearFilter() {
    this.listState.filters.clear();
    this._applyFilter();
  }

  getOriginalItems() {
    return this.listState.originalItems;
  }

  runAsync(func, ...args) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(func(args));
        } catch (ex) {
          reject(ex);
        }
      }, 0);
    });
  }
}

// reactMixin(AbsListComponent.prototype, TimerMixin);
// reactMixin(AbsListComponent.prototype, {
//   componentWillMount: function () {
//     this._unmounted = false;
//   },

//   componentWillUnmount: function () {
//     this._unmounted = true;
//   }
// });

export default AbsListComponent;
