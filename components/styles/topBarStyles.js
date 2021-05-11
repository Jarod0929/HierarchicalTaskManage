import {
  StyleSheet
} from 'react-native';

let spiroDiscoBall = '#19d9ff';

const topBarStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    zIndex: 0,
  },
  topBarContainer: {
    backgroundColor: "cyan",
    borderWidth: 2,
    height: 60,
    width: '100%',
    zIndex: 200,
  },
  openContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    height: '80%',
    width: 40,
  },  
  drawerContainer: {
    width: '30%',
    height: '90%',
    backgroundColor: spiroDiscoBall,
    position: 'absolute',
    flex:2,
    bottom: 0,
    left: 0,
    zIndex: 100,
  },
  navigationButtons:{
    padding: 0,
    backgroundColor: '#1974D3',
    borderWidth: 0,
  },
  openAndDrawerButton:{
    color: 'black',
    backgroundColor: "#ccffff",
    padding:1,
    borderWidth: 1,
    zIndex: 30,
  },

  
  buttonText: {
    color: 'black',
    fontSize: 15,
    
    zIndex: 30,
  },
});

module.exports = topBarStyles;