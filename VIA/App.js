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
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={"#D6A2AD"}
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
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={"#E5C797"}
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
      tabBarIcon:
        <HomeButton
          nav={navigation} ></HomeButton>
    })
  },
  Projects: {
    screen: ProjectsScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={"#4585C1"}
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
        activeTintColor: "#00bbb1",
        inactiveTintColor: "#00bbb1",   
        style: {
         height: 55,
         backgroundColor: '#8e7e7e'
        }
      },
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={"#319BF7"}
          tintColor={{ tintColor }}
          routeName={'Tasks'}
          iconName={'refresh'}
          elementName={'Tasks'}
          nav={navigation} ></TabButton>
      ),})
  },
},
  {
    initialRouteName: 'Home',
    // tabBarOptions: {
    //   activeTintColor: "#00bbb1",
    //   inactiveTintColor: "#00bbb1",   
    //   style: {
    //    height: 55,
    //    backgroundColor: '#8e7e7e'
    //   }
    // }
  },
  
);

const tabBarConfiguration = {
	tabBarOptions: {
		activeTintColor: "#00bbb1",
		inactiveTintColor: "#00bbb1",
	
		style: {
			backgroundColor: "#00bbb1",
			borderTopWidth: 1,
			borderTopColor: "#00bbb1"
		},
	}
};

Database.init();

export default createAppContainer(TabNavigator);
