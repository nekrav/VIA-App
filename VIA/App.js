import React from 'react';
import { Text, View, Button, TouchableOpacity, FlatList, CheckBox } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Database, Habits } from './db'
import { HabitsScreen, ProjectsScreen, RoutinesScreen, TasksScreen, HomeScreen } from './screens'
import { CreateHabit } from './modals'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';

import { HomeButton } from '../VIA/components/homeButton'
var uuid = require('react-native-uuid');

const TabNavigator = createBottomTabNavigator({
  Habits: HabitsScreen,
  Routines: RoutinesScreen,
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "",
      tabBarIcon:
        <HomeButton
          nav={navigation} ></HomeButton> // Plus button component
    })
  },
  Projects: ProjectsScreen,
  Tasks: TasksScreen,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = SIcon;
        let iconName;
        if (routeName === 'Habits') {
          iconName = focused
            ? 'refresh'
            : 'refresh';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Routines') {
          // iconName = focused ? 'ios-list-box' : 'ios-list';
          iconName = focused ? 'reload' : 'reload';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
  {
    initialRouteName: 'Home'
  });

Database.init();

export default createAppContainer(TabNavigator);