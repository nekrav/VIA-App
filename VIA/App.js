import React from 'react';
import * as colorsProvider from './components/colorsProvider';
import { Text, View, Button, TouchableOpacity, FlatList, CheckBox } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Database, Habits } from './db'
import { HabitsScreen, ProjectsScreen, RoutinesScreen, TasksScreen, HomeScreen } from './screens'
import { CreateHabit } from './modals'
import { Controller } from './screens/controller'

import { Notifier } from './notifier/notifier'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { TabButton } from '../VIA/components/tabButton'
import { TabBar } from '../VIA/components/tabBar'
import { HomeButton } from '../VIA/components/homeButton'

const notifier = new Notifier;
const controller = new Controller;

console.disableYellowBox = false;

notifier.registerNotificationService();

const TabNavigator = createBottomTabNavigator({
  Habits: {
    screen: HabitsScreen,
    
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarOptions: {
        style: {
         height: 55,
         backgroundColor: colorsProvider.habitsMainColor
        }
      },
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          // loadElements={Database.init()}
          activeColor={colorsProvider.habitsComplimentaryColor}
          inactiveColor={colorsProvider.whiteColor}
          tintColor={ tintColor }
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
         backgroundColor: colorsProvider.routinesMainColor
        }
      },
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={colorsProvider.routinesBottomTabHighlightColor}
          inactiveColor={colorsProvider.whiteColor}
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
         backgroundColor: colorsProvider.homeComplimentaryColor
        }
      },
      tabBarIcon:({ focused, tintColor }) => (
        <HomeButton
        focused={focused}
        activeColor={colorsProvider.homePlaceholderColor}
          nav={navigation} ></HomeButton>  ),})
    
  },
  Projects: {
    screen: ProjectsScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarOptions: {
        style: {
         height: 55,
         backgroundColor: colorsProvider.projectsMainColor
        }
      },
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={colorsProvider.projectsComplimentaryColor}
          inactiveColor={colorsProvider.whiteColor}
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
         backgroundColor: colorsProvider.tasksMainColor
        }
      },
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={colorsProvider.tasksPlaceholderColor}
          inactiveColor={colorsProvider.whiteColor}
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

// Database.updateTablesWithNewVariable(Habits.TABLE_NAME, 'finished_date')

export default createAppContainer(TabNavigator);
