/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import DatePicker from 'react-native-date-picker'

const TopBar = ({children}) => {//This creates the Top bar to the 
  //TODO Create TopBar with Drawer
  return(
    <View style = {styles.container}>
      <View style = {styles.topBarCon}>

      </View>
      {children}
    </View>
  )
};

function LogIn({ navigation }) {
  const [textUserName, changeTextUserName] = useState('');//For the Username Field
  const [textPassword, changeTextPassword] = useState('');//For the Password Field
  const [failed, changefailed] = useState(false);//Only sets to true when they failed once on account and sets feedback message
  /*const FirstUsers = database().ref("/Database/Users").push(); //First Account and is structure of how it should look
  FirstUsers.set({ 
    Username: "Fruit",
    Password: "Apple",
    Projects: [],
  });*/
  //This should work as intended, only one press is needed
  const samePassword = snapshot => {
    changefailed(true);
    changeTextPassword("");
    if(snapshot.val().Password === textPassword){
      changeTextUserName("");
      changefailed(false);
      navigation.navigate("ProjectList");
    }
    database().ref("/Database/Users").orderByChild("Username").equalTo(textUserName).off("child_added", samePassword); 
  };

  const isAccount = () => { //Checks if there is an account
    database().ref("/Database/Users").orderByChild("Username").equalTo(textUserName).on("child_added", samePassword);//Only works with on, not once
  };
  //TODO: Create better UI
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableHighlight
        onPress = {() => navigation.navigate("CreateAccount")}
      >
        <View
          style = {styles.buttonLogIn}
        >
          <Text>Create Account</Text>
        </View>
      </TouchableHighlight>
      <TextInput
        style = {styles.textInputLogIn}
        onChangeText = {text => changeTextUserName(text)}
        placeholder = "UserName"
        value = {textUserName}
      />
      <TextInput
        style = {styles.textInputLogIn}
        onChangeText = {text => changeTextPassword(text)}
        placeholder = "Password"
        value = {textPassword}
      />
      <TouchableHighlight
        onPress = {isAccount}
      >
        <View
          style = {styles.buttonLogIn}
        >
          <Text>Press to LogIn</Text>
        </View>
      </TouchableHighlight>
      {failed &&
        <View>
          <Text>You Have Failed</Text>
        </View>
      }
    </View>
  );
}

function CreateAccount({ navigation }) {
  const [textUserName, changeTextUserName] = useState('');//For the Username Field
  const [textPassword, changeTextPassword] = useState('');//For the Password Field
  const [failed, changefailed] = useState(false);//Only sets to true when they failed once on account and sets feedback message

  const anyPreviousUsernames = snapshot => {
    if(snapshot.val() !== null){
      changefailed(true);
    }
    else{
      changefailed(false);
      database().ref("/Database/Users").push({
        Username: textUserName,
        Password: textPassword,
        Reference: {
          theme: "light",
        },
      });
      navigation.navigate("LogIn");
    }
    database().ref("/Database/Users").orderByChild("Username").equalTo(textUserName).off("value", anyPreviousUsernames); 
  };
  
  const createNewAccount = () => {
    //TODO: Find out way so Users can not spam and by pass multiple Usernames
    //Tried: Async and Promises shallowly
    //TODO: Also for some Reason you have to press the button twice
    database().ref("/Database/Users").orderByChild("Username").equalTo(textUserName).on("value", anyPreviousUsernames);
  };
  //TODO: Create Better UI
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableHighlight
        onPress = {() => navigation.navigate("LogIn")}
      >
        <View
          style = {styles.buttonLogIn}
        >
          <Text>Go Back</Text>
        </View>
      </TouchableHighlight>
      <TextInput
        style = {styles.textInputLogIn}
        onChangeText = {text => changeTextUserName(text)}
        placeholder = "UserName"
        value = {textUserName}
      />
      <TextInput
        style = {styles.textInputLogIn}
        onChangeText = {text => changeTextPassword(text)}
        placeholder = "Password"
        value = {textPassword}
      />
      <TouchableHighlight
        onPress = {createNewAccount}
      >
        <View
          style = {styles.buttonLogIn}
        >
          <Text>Create Account</Text>
        </View>
      </TouchableHighlight>
      {failed && //TODO: Create new better message
        <View>
          <Text>You Have Failed</Text>
        </View>
      }
    </View>
  );
}

function ProjectList ({ navigation }) {
  return (// TopBar is supposed to handle the Drawer and don't forget about it
    <TopBar>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableHighlight style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center',
         padding: 10, borderRadius: 100, backgroundColor: "blue", left: 120, top: 270, zIndex: 1}}
         onPress={() => {
            navigation.navigate("ProjectCreation");
          }}
         >
         <View style={{zIndex: 0}}>
          <Text style={{color: "white", fontSize: 50}}>+</Text>
         </View> 
        </TouchableHighlight>
      </View>
    </TopBar>
  );
}
function ProjectCreation ({ navigation }) { 
  //Insert the Project Code here
  const [projectName, changeProjectName] = useState('');//For the projectName field
  const [invUsers, changeInvUsers] = useState('');//For the inviteUsers field
  const [invUsersList, addUsersList] = useState(["placeHolder"]);//For the inviteUsers button
  const [date, setDate] = useState(new Date())

  const createNewProject = () => {
    if(projectName != ""){
      database().ref("/Database/Projects").push({
        title: projectName,
        users: invUsersList,
        tasks: ["PlaceHolder"],
        dueDate: date.getMonth() + " " + date.getDate() + " " + date.getFullYear()
      });
      changeProjectName("");
      addUsersList(["placeHolder"]);
    }
    console.log(date.getMonth() + " " + date.getDate() + " " + date.getFullYear());
  };
  const addUsersToList = () =>{
    if(invUsers != ""){
      if(invUsersList[0] === "placeHolder" ){
        invUsersList.pop();
      }
      let list = invUsersList.slice();
      list.push(invUsers);
      addUsersList(list);
    }
    changeInvUsers("");
  };
  
  return (// TopBar is supposed to handle the Drawer and don't forget about it
    <TopBar> 
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style = {styles.textInputLogIn}
        placeholder = "Project Name"
        onChangeText = {text => changeProjectName(text)}
        value={projectName}
      />
      <DatePicker
      date={date}
      mode = "date"
      onDateChange={setDate}
    />
      <Text>Invite Users</Text>
      <TextInput
        style = {styles.textInputLogIn}
        placeholder = "Username"
        onChangeText = {text => changeInvUsers(text)}
        value={invUsers}
      />
      <TouchableHighlight onPress = {addUsersToList}>
        <View
          style = {styles.buttonLogIn}
        >
          <Text>Invite User</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress = {createNewProject}>
        <View
          style = {styles.buttonLogIn}
        >
          <Text>Creat Project</Text>
        </View>
      </TouchableHighlight>
      </View>
    </TopBar>
  );
}

function Project ({ navigation }) { 
  //Insert the Project Code here

  return (// TopBar is supposed to handle the Drawer and don't forget about it
    <TopBar> 
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello World</Text>
      </View>
    </TopBar>
  );
}


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="LogIn">
        <Drawer.Screen name="LogIn" component={LogIn} />
        <Drawer.Screen name="CreateAccount" component={CreateAccount} />
        <Drawer.Screen name="ProjectList" component={ProjectList}/>
        <Drawer.Screen name="Project" component={ProjectList}/>
        <Drawer.Screen name="ProjectCreation" component={ProjectCreation}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  buttonLogIn: {
    alignItems: "center",
    backgroundColor: "orange",
    marginTop: 50,
    marginBottom: 50,
  },
  textInputLogIn: {
    marginTop: 50,
    marginBottom: 50,
  },
  topBarCon: {
    position: "absolute",
    top:0,
    right:0,
    height: "15%",
    width: "100%",
    backgroundColor: "blue",
  }
});