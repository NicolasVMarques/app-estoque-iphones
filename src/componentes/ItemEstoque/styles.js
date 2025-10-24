import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  itemModelo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  itemDescricao: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },
});