import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  emptyContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    fontSize: 16,
    color: 'black',
  },
  textError: {
    fontSize: 16,
    color: 'black',
  },
  textButtonRetry: {
    fontSize: 16,
    color: 'red',
  },
  buttonRetry: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
