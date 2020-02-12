import React from 'react';
import { Text, View, Button, TouchableOpacity, FlatList, CheckBox } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Database, Habits } from './db'
import { HabitsScreen, ProjectsScreen, RoutinesScreen, TasksScreen, HomeScreen } from './screens'
import { CreateHabit } from './modals'
import { Notifier } from './notifier/notifier'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { TabButton } from '../VIA/components/tabButton'
import { TabBar } from '../VIA/components/tabBar'
import { HomeButton } from '../VIA/components/homeButton'

const notifier = new Notifier;

notifier.registerNotificationService();

const TabNavigator = createBottomTabNavigator({
  Habits: {
    screen: HabitsScreen,
    
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarOptions: {
        style: {
         height: 55,
         backgroundColor: "#D6A2AD"
        }
      },
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={"#984A5A"}
          inactiveColor={"#ffffff"}
          tintColor={{ tintColor }}
          routeName={'Habits'}
          iconName={'reload'}
          elementName={'Habits'}
          nav={navigation} ></TabButton>
      ),})
  },
  Routines: {
    screen: RoutinesScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarOptions: {
        style: {
         height: 55,
         backgroundColor: "#E5C797"
        }
      },
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={"#9C7639"}
          inactiveColor={"#ffffff"}
          tintColor={{ tintColor }}
          routeName={'Routines'}
          iconName={'refresh'}
          elementName={'Routines'}
          nav={navigation} ></TabButton>
      ),})
  },
  Home:
  {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "",
      tabBarOptions: {
        style: {
         height: 55,
         backgroundColor: "#00bbb1"
        }
      },
      tabBarIcon:({ focused, tintColor }) => (
        <HomeButton
        focused={focused}
        activeColor={"006F6B"}
          nav={navigation} ></HomeButton>  ),})
    
  },
  Projects: {
    screen: ProjectsScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarOptions: {
        style: {
         height: 55,
         backgroundColor: "#4585C1"
        }
      },
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={"#21F2FF"}
          inactiveColor={"#ffffff"}
          tintColor={{ tintColor }}
          routeName={'Projects'}
          iconName={'layers'}
          elementName={'Projects'}
          nav={navigation} ></TabButton>
      ),})
  },
  Tasks: {
    screen: TasksScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarOptions: {
        style: {
         height: 55,
         backgroundColor: "#58AAF9"
        }
      },
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={"#0F7EE9"}
          inactiveColor={"#ffffff"}
          tintColor={{ tintColor }}
          routeName={'Tasks'}
          iconName={'refresh'}
          elementName={'Tasks'}
          nav={navigation} ></TabButton>
      ),
    })
  },
},
  {
    initialRouteName: 'Home',
  },
  
);

Database.init();

export default createAppContainer(TabNavigator);
