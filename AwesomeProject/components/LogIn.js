import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import database from '@react-native-firebase/database';
import * as styles from './styles.js';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/**
 * Creates the drawer with all the navigation
 * 
 * @param {object} props including navigation and children
 * @returns the bar under the topbar with navigation to CreateAccount
 */
const Drawer = (props)=>{
  const [drawer, changeDrawer] = useState(false);
  return(
    <View>
       <TouchableHighlight style={styles.navigationButtons}
          onPress = {() => {
            changeDrawer(!drawer);
          }}
        >
      <Text>Open Navigation Drawer</Text>
    </TouchableHighlight>
    {drawer &&
      <View style= {styles.Drawercont}>
        <TouchableHighlight onPress={()=> changeDrawer(!drawer)} style={styles.navigationButtons}><Text>Close</Text></TouchableHighlight>
        <TouchableHighlight onPress={()=>props.navigation.navigate("CreateAccount")} style={styles.navigationButtons}><Text>Create an Account</Text></TouchableHighlight>
      </View>
    }
    </View>
  );
}

/**
 * Establishes the entire container with all the children under the bar
 * 
 * @param {tag} {children} The rest of the tags of LogIn
 * @returns Top blue bar with all its children below it
 */
const TopBar = ({children}) => {
  const [drawer, changeDrawer] = useState(false);

  return (
    <View style = {styles.container}>
      <View style = {styles.topBarContainer}>
        <View style = {styles.openContainer}>
          <TouchableHighlight
            onPress = {() => {
              changeDrawer(!drawer);
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            }}
          >
            <Text style = {styles.textAbove}>Open</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style = {[styles.drawerContainer, drawer? undefined: {width: 1}]}>

      </View>
      {children}
    </View>
  )
};

/**
 * A page where the user logs in to their account.
 * 2 input boxes for username and password
 * 2 buttons for logging in and navigating to sign up
 * Once the user logs in, the user is forced into ProjectList
 * 
 * @param {object} navigation For the user to move between screens 
 * @returns {tag} The page of LogIn
 */
export function LogIn({ navigation }){
  const [username, changeUsername] = useState('');//For the Username Field
  const [password, changePassword] = useState('');//For the Password Field
  const [failed, changeFailed] = useState(false);//Only sets to true when they failed once on account and sets feedback message
  //const FirstUsers = database().ref("/Database/Users").push(); //First Account and is structure of how it should look
  //FirstUsers.set({ 
  //  Username: "Fruit",
  //  Password: "Apple",
  //  Projects: [""],
  //});
  
  /**
   * Checks if the password is the same.
   * If password is the same, resets the inputs and forces them to ProjectList
   * 
   * @param {object} snapshot User with the same username 
   */
  const isPassword = snapshot => { 
    if(snapshot.val() != null && snapshot.val().Password === password){
      changeUsername(""); 
      changeFailed(false); 
      navigation.navigate("Main",{screen: 'ProjectList', params: {user: snapshot.val().ID }});
    }
    database().ref("/Database/Users").orderByChild("Username").equalTo(username).off("child_added", isPassword); 
  };
  
  /**
   * Checks to see if the username is the same.
   * If username is the same, goes to the function isPassword
   * If wrong username or password, feedback is given through failed
   */
  const isUsername = () => { 
    database().ref("/Database/Users").orderByChild("Username").equalTo(username).on("child_added", isPassword);
    if(username != ""){
      changeFailed(true); 
      changePassword("");
    }
  };  

  /**
   * Clears all inputs of username, passord, and failed.
   * Navigates user to CreateAccount screen.
   */
  const goToCreateAccount = () => { //Goes to CreateAccount Screen
    changeUsername(""); //Resets all changes made
    changePassword("");
    changeFailed(false);
    navigation.navigate("CreateAccount");
  };
    
  return(
    <TopBar>
      <Drawer navigation={navigation}></Drawer>
      <View style = {styles.flexAlignContainer}>
        <View style = {styles.titleContainer}>
          <Text style = {styles.titleText}>Sign In</Text>
        </View>
        <View style = {styles.textAreaContainer}>
          <Text style = {styles.textAbove}>Username</Text>
          <View style = {styles.textInputContainer}>
            <TextInput
              onChangeText = {text => changeUsername(text)}
              placeholder = "UserName"
              value = {username}
            />
          </View>
        </View>
        <View style = {styles.textAreaContainer}>
          <Text style = {styles.textAbove}>Password</Text>
          <View style = {styles.textInputContainer}>
            <TextInput
              onChangeText = {text => changePassword(text)}
              placeholder = "Password"
              value = {password}
            />
          </View>
        </View>
        <View style = {styles.buttonContainer}>
          <TouchableHighlight 
            style = {styles.button}
            onPress = {isUsername}
          >
            <Text style = {styles.buttonText}>Log In</Text>
          </TouchableHighlight>
        </View>
        {failed &&
          <View style = {styles.failedContainer}>
            <Text style = {styles.failedText}>Username does not exist or Password is false</Text>
          </View>
        }
        <View style = {styles.buttonContainer}>
          <TouchableHighlight 
            style = {styles.button}
            onPress = {goToCreateAccount}
          >
            <Text style = {styles.buttonText}>Sign Up</Text>
          </TouchableHighlight>
        </View>
      </View>
    </TopBar>
  );
}


