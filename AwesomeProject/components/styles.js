import {
    StyleSheet
  } from 'react-native';
  
const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: "black",
      zIndex: 0,
    },
    flexAlignContainer: {
      flex: 1,
      alignItems: "center",
      zIndex: 30,
    }, 
    titleContainer: {
      position: 'relative',
      top: 10,
      paddingBottom: 30,
      zIndex: 30,
    },
    titleText: {
      color: 'white',
      fontSize: 28,
      zIndex: 30,
    },
    textInputContainer: {
      borderWidth: 5,
      height: 50,
      width: 150,
      backgroundColor:'white',
      zIndex: 30,
    },
    textAreaContainer: {
      paddingBottom: 30,
      zIndex: 30,
    },
    defaultText: {
      color: 'white',
      fontSize: 16,
      zIndex: 30,
    },
    buttonContainer: {
      backgroundColor: 'cyan',
      borderWidth: 5,
      borderRadius: 10,
      width: 175,
      height: 60,
      marginBottom: 15,
      marginTop: 15,
      zIndex: 30,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 30,
    },
    buttonText: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
      zIndex: 30,
    },
    failedContainer: {
      //flex: 1,
      //justifyContent: 'center',
      //alignItems: 'center',
      zIndex: 30,
    },
    failedText: {
      color: 'red',
      fontSize: 16,
      zIndex: 30,
    },
    topBarContainer: {
      backgroundColor: "cyan",
      borderBottomRightRadius: 20,
      borderWidth: 5,
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
      backgroundColor: 'green',
      position: 'absolute',
      bottom: 0,
      left: 0,
      zIndex: 100,
    },
    drawerContainerOther: {
      width: '70%',
      height: '90%',
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 100,
    },

    Drawercont:{
      width:"100%",
      height:"100%",
      top:0,
      left:0,
      position: "absolute",
      backgroundColor: "#FFF7D9",
      flexDirection:"row",
      borderWidth:1

    },
    navigationButtons:{
      padding:1,
      backgroundColor: '#1974D3',
      borderWidth: 1,
    },
    textInputFPCh:{
      backgroundColor:"white",
      borderWidth:1,
      width: "50%"

    },
    enterBt:{
      backgroundColor:"yellow",
      borderWidth:1,
      width:"50%",

    },
    settingsPage:{
      backgroundColor:'white',
      width: "100%",
      height: "100%",
    }
});

module.exports = styles;