import React from 'react';
import * as colorsProvider from './components/colorsProvider';
import { Text, View, Button, TouchableOpacity, FlatList, CheckBox, PixelRatio} from 'react-native';
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

const BOTTOM_MARGIN = PixelRatio.get() < 3 ? 75 :55
const TabNavigator = createBottomTabNavigator({
  Habits: {
    screen: HabitsScreen,
    
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarOptions: {
        activeColor: colorsProvider.whiteColor,
        inactiveTintColor: colorsProvider.whiteColor,
        style: {
         height: 55,
        //  backgroundColor: colorsProvider.habitsMainColor
        }
      },
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={colorsProvider.habitsMainColor}
          inactiveColor={colorsProvider.inactiveTabColor}
          tintColor={ tintColor }
          routeName={'Habits'}
          getAllItems={() => {Database.getAll('habits')}}
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
        activeColor: colorsProvider.whiteColor,
        inactiveTintColor: colorsProvider.whiteColor,
        style: {
         height: 55,
        //  backgroundColor: colorsProvider.routinesMainColor
        }
      },
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={colorsProvider.routinesMainColor}
          inactiveColor={colorsProvider.inactiveTabColor}
          tintColor={{ tintColor }}
          getAllItems={() => {Database.getAll('routines')}}
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
        activeColor: colorsProvider.whiteColor,
        inactiveTintColor: colorsProvider.inactiveTabColor,
        style: {
         height: BOTTOM_MARGIN,
        //  marginBottom: "4%",
        }
      },
      tabBarIcon:({ focused, tintColor }) => (
        <HomeButton
        focused={focused}
        routeName={'Home'}
        getAllItems={() => {Database.getAll('random')}}
        activeColor={colorsProvider.homePlaceholderColor}
          nav={navigation} ></HomeButton>  ),})
    
  },
  Projects: {
    screen: ProjectsScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarOptions: {
        activeColor: colorsProvider.whiteColor,
        inactiveTintColor: colorsProvider.inactiveTabColor,
        style: {
         height: 55,
        }
      },
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={colorsProvider.projectsMainColor}
          inactiveColor={colorsProvider.inactiveTabColor}
          tintColor={{ tintColor }}
          routeName={'Projects'}
          iconName={'layers'}
          getAllItems={() => {Database.getAll('projects')}}
          elementName={'Projects'}
          nav={navigation} ></TabButton>
      ),})
  },
  Tasks: {
    screen: TasksScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarOptions: {
        activeColor: colorsProvider.whiteColor,
        inactiveTintColor: colorsProvider.whiteColor,
        style: {
         height: 55,
        }
      },
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          focused={focused}
          activeColor={colorsProvider.tasksMainColor}
          inactiveColor={colorsProvider.inactiveTabColor}
          tintColor={{ tintColor }}
          routeName={'Tasks'}
          getAllItems={() => {Database.getAll('tasks')}}
          iconName={'note'}
          elementName={'Tasks'}
          nav={navigation} ></TabButton>
      ),
    })
  },
},
  {
    // tabBarOptions: {
    //   // activeTintColor: colorsProvider.whiteColor,
    //   // inactiveTintColor: colorsProvider.whiteColor,
    //   // style: {
    //   //   // backgroundColor: colorsProvider.whiteColor,
    //   // },
    // },
    initialRouteName: 'Home',
  },
  
);

Database.init();

// Database.updateTablesWithNewVariable(Habits.TABLE_NAME, 'finished_date')

export default createAppContainer(TabNavigator);
