import React from 'react';
import { Text, View, Button, TouchableOpacity, FlatList, CheckBox } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Database, Habits } from './db'
import { HabitsScreen, ProjectsScreen } from './screens'
import { CreateHabit } from './modals'
var uuid = require('react-native-uuid');

const TabNavigator = createBottomTabNavigator({
  Habits: HabitsScreen,
  Projects: ProjectsScreen,
});

Database.init();

export default createAppContainer(TabNavigator);