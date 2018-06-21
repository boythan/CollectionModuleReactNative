import AbsListComponent from './AbsListComponent';

class PagingListComponent<Response, Item, PagingData> extends AbsListComponent<Response, Item, PagingData> {

  static DefaultPagingData = {
    pageIndex: 1,
    pageSize: 20,
  };

  /**
  * Method to tell when all data is loaded, and no need to load anymore.
  */
  noMoreData(response: Response, pagingData: PagingData): boolean {
    if (!response.data || !response.data.responseData || !response.data.responseData) return true;
    return response.data.responseData.length < pagingData.pageSize;
  }

  /**
   * Create first PagingData like {pageIndex: 0, pageSize: 10}
   */
  firstPagingData(): PagingData {
    return PagingListComponent.DefaultPagingData;
  }

  /**
   * Method to calculate next paging data
   */
  pagingFunction(response: Response, oldPagingData: PagingData): PagingData {
    return { ...oldPagingData, pageIndex: oldPagingData.pageIndex + 1 };
  }

  transformer(response: Response): Item[] {
    if (!response.data.responseData) return [];
    return response.data.responseData;
  }
}

export default PagingListComponent;
