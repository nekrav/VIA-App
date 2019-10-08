import React from 'react';
import { Text, View, Button, TouchableOpacity, FlatList, CheckBox } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Database, Habits } from './db'
import { HabitsScreen, ProjectsScreen, HabitView } from './screens'
import { CreateHabit } from './modals'
var uuid = require('react-native-uuid');

const HabitStack = createStackNavigator({
  AllHabits: HabitsScreen,
  ViewHabit: HabitView,
}, {
  initialRouteName: 'AllHabits',
    // header: null,
    // headerMode: 'float',
    // navigationOptions: {
    //   header: null
    // }
  });


const TabNavigator = createBottomTabNavigator({
  Home: HabitStack,
  Settings: ProjectsScreen,
});






Database.init();

export default createAppContainer(TabNavigator);