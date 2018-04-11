import PagingListComponent from './PagingListComponent';

class ListComponent extends PagingListComponent {
  noMoreData = () => {
    return true;
  }
}
export default ListComponent;
