import { StyleSheet, Platform, StatusBar } from 'react-native';

const paddingTopAndroid = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: paddingTopAndroid,
    paddingBottom: 5,
    paddingHorizontal: 20,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  logoTexto: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: "rgba(31, 41, 55, 1)", 
    letterSpacing: 1, 
  },
  
  botaoSair: {
    padding: 5,
    position: 'relative', 
  },
});

