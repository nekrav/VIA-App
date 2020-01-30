import React from 'react';
import { Text, View, Button, TouchableOpacity, FlatList, CheckBox } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Database, Habits } from './db'
import { HabitsScreen, ProjectsScreen, RoutinesScreen, TasksScreen, HomeScreen } from './screens'
import { CreateHabit } from './modals'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { TabButton } from '../VIA/components/tabButton'
import { HomeButton } from '../VIA/components/homeButton'

const TabNavigator = createBottomTabNavigator({
  Habits: {
    screen: RoutinesScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
          focused={focused}
          tintColor={{ tintColor }}
          routeName={'Habits'}
          iconName={'reload'}
          elementName={'Habits'}
          icon={'layers'}
          nav={navigation} ></TabButton>
      ),})
  },
  Routines: {
    screen: RoutinesScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
          focused={focused}
          tintColor={{ tintColor }}
          routeName={'Routines'}
          iconName={'refresh'}
          elementName={'Routines'}
          icon={'layers'}
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
    screen: RoutinesScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
          focused={focused}
          tintColor={{ tintColor }}
          routeName={'Projects'}
          iconName={'layers'}
          elementName={'Projects'}
          icon={'layers'}
          nav={navigation} ></TabButton>
      ),})
  },
  Tasks: {
    screen: TasksScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabButton
          name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
          focused={focused}
          tintColor={{ tintColor }}
          routeName={'Tasks'}
          iconName={'refresh'}
          elementName={'Tasks'}
          icon={'list'}
          nav={navigation} ></TabButton>
      ),})
  },
},
  {
    initialRouteName: 'Home',
  },
);

Database.init();

export default createAppContainer(TabNavigator);
