import React from 'react';
import { Text, View, Button, TouchableOpacity, FlatList, CheckBox } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Database, Habits } from './db'
import { HabitsScreen, ProjectsScreen, RoutinesScreen, TasksScreen } from './screens'
import { CreateHabit } from './modals'
import { HomeButton} from '../VIA/components/homeButton'
var uuid = require('react-native-uuid');

const TabNavigator = createBottomTabNavigator({
  Habits: HabitsScreen,
  Routines: RoutinesScreen,
  Home: {
    screen: HabitsScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarIcon: 
      <HomeButton
       nav = {navigation} ></HomeButton> // Plus button component
  })
  },
  Projects: ProjectsScreen,
  Tasks: TasksScreen,
});

Database.init();

export default createAppContainer(TabNavigator);