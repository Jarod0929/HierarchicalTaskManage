import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import database from '@react-native-firebase/database';
import * as styles from './styles.js';

const TopBar = ({children}) => {
  const [drawer, changeDrawer] = useState(false);
  return (
    <View style = {styles.container}>
      <View style = {styles.topBarContainer}>
        <View>
          <TouchableHighlight
            onPress = {() => {
              changeDrawer(!drawer);
            }}
          >
            <Text style = {styles.logInTextAbove}>Open</Text>
          </TouchableHighlight>
        </View>
      </View>
      {drawer &&
      <View style = {{width: '100%', height: '100%'}}>
        <View style = {styles.drawerContainer}>

        </View>
        <View style = {styles.drawerContainerOther}>
          <TouchableHighlight
            onPress = {() => {
              changeDrawer(false);
            }}
          >
            <View></View>
          </TouchableHighlight>
        </View>
      </View>
      }
      {children}
    </View>
  )
};


export function LogIn({ navigation }){
    const [textUserName, changeTextUserName] = useState('');//For the Username Field
    const [textPassword, changeTextPassword] = useState('');//For the Password Field
    const [failed, changefailed] = useState(false);//Only sets to true when they failed once on account and sets feedback message
    //const FirstUsers = database().ref("/Database/Users").push(); //First Account and is structure of how it should look
    //FirstUsers.set({ 
    //  Username: "Fruit",
    //  Password: "Apple",
    //  Projects: [""],
    //});
    //This should work as intended, only one press is needed
    const samePassword = snapshot => { 
      console.log(snapshot.val());
      if(snapshot.val() != null && snapshot.val().Password === textPassword){//Checks if the Password is the same
        changeTextUserName(""); //Resets Username if goes onto next screen
        changefailed(false); //Resets failed message
        //GLOBALUSERID=snapshot.val().ID;
        navigation.navigate("Main",{screen: 'ProjectList', params: {user: snapshot.val().ID }});
  
      }
      database().ref("/Database/Users").orderByChild("Username").equalTo(textUserName).off("child_added", samePassword); 
    };
  
    const isAccount = () => { //Checks if there is an account
      changefailed(true); //Outside because the function above does not go, unless there is a username in the database
      changeTextPassword("");
      database().ref("/Database/Users").orderByChild("Username").equalTo(textUserName).on("child_added", samePassword);//Only works with on, not once
    };  
    
    const goToCreateAccount = () => { //Goes to CreateAccount Screen
      changeTextUserName(""); //Resets all changes made
      changeTextPassword("");
      changefailed(false);
      navigation.navigate("CreateAccount");
    };
    
    return(
      <TopBar>
        <View style = {styles.logInContainer}>
          <View style = {styles.logInSignInTitleContainer}>
            <Text style = {styles.logInSignInTitleText}>Sign In</Text>
          </View>
          <View style = {styles.logInTextAreaContainer}>
            <Text style = {styles.logInTextAbove}>Username</Text>
            <View style = {styles.logInTextInputContainer}>
              <TextInput
                onChangeText = {text => changeTextUserName(text)}
                placeholder = "UserName"
                value = {textUserName}
              />
            </View>
          </View>
          <View style = {styles.logInTextAreaContainer}>
            <Text style = {styles.logInTextAbove}>Password</Text>
            <View style = {styles.logInTextInputContainer}>
              <TextInput
                onChangeText = {text => changeTextPassword(text)}
                placeholder = "Password"
                value = {textPassword}
              />
            </View>
          </View>
          <View style = {styles.logInButtonContainer}>
            <TouchableHighlight 
              style = {styles.logInButton}
              onPress = {isAccount}
            >
              <Text style = {styles.logInButtonText}>Log In</Text>
            </TouchableHighlight>
          </View>
          {failed &&
          <View style = {styles.logInRedFailedContainer}>
            <Text style = {styles.logInRedFailedText}>Username does not exist or Password is false</Text>
          </View>
          }
          <View style = {styles.logInButtonContainer}>
            <TouchableHighlight 
              style = {styles.logInButton}
              onPress = {goToCreateAccount}
            >
              <Text style = {styles.logInButtonText}>Sign Up</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TopBar>
    );
}


