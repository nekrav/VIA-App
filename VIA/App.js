import React from 'react';
import { Text, View, Button, TouchableOpacity, FlatList, CheckBox } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Database, Habits } from './db'
import { HabitsScreen, ProjectsScreen, RoutinesScreen, TasksScreen, HomeScreen } from './screens'
import { CreateHabit } from './modals'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { TabButton } from '../VIA/components/tabButton'
import { HomeButton } from '../VIA/components/homeButton'
var uuid = require('react-native-uuid');

const defaultNavigationOptions = ({ navigation }) => ({
  initialRouteName: 'Home',
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
    }  else if (routeName === 'Projects') {
      // iconName = focused ? 'ios-list-box' : 'ios-list';
      iconName = focused ? 'layers' : 'layers';
    }  else if (routeName === 'Tasks') {
      // iconName = focused ? 'ios-list-box' : 'ios-list';
      iconName = focused ? 'list' : 'list';
    } 
    else if (routeName === 'Home') {
      // iconName = focused ? 'ios-list-box' : 'ios-list';
      // iconName = focused ? 'reload' : 'reload';
    } 

    // You can return any component that you like here!
    return <IconComponent name={iconName} size={25} color={tintColor} />;
  },
});

const TabNavigator = createBottomTabNavigator({
  Habits: {
    screen: HabitsScreen,
    navigationOptions: ({ navigation }) => ({
      title: "",
      tabBarIcon:
        <TabButton
        currentRoute={navigation.state.routeName}
        iconName={'reload'}
        elementName={'Habits'}
          nav={navigation} ></TabButton> // Plus button component
    })
  },
  Routines: {
    screen: RoutinesScreen,
    navigationOptions: ({ navigation }) => ({
      title: "",
      tabBarIcon:
        <TabButton
        iconName={'refresh'}
        elementName={'Routines'}
        icon={'layers'}
          nav={navigation} ></TabButton> // Plus button component
    })
  },
  // Home: HomeScreen,
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
// {
//   initialRouteName: "Home"
// },
// {defaultNavigationOptions},
  // {
    
  //   tabBarOptions: {
  //     activeTintColor: 'tomato',
  //     inactiveTintColor: 'gray',
  //     initialRouteName: 'Home'
  //   },
  // },
  {
    initialRouteName: 'Home'
  },
  // {
  //   initialRouteName: "Home"
  // }
);

Database.init();

export default createAppContainer(TabNavigator);

// import React from 'react';
// import { Text, View, Button, TouchableOpacity, FlatList, CheckBox } from 'react-native';
// import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
// import { Database, Habits } from './db'
// import { HabitsScreen, ProjectsScreen, RoutinesScreen, TasksScreen, HomeScreen } from './screens'
// import { CreateHabit } from './modals'
// import { HomeButton} from '../VIA/components/homeButton'
// var uuid = require('react-native-uuid');

// const TabNavigator = createBottomTabNavigator({
//   Habits: HabitsScreen,
//   Routines: RoutinesScreen,
//   // Home: HomeScreen ,
//   Home: {
//     screen: HomeScreen,
//     navigationOptions: ({ navigation }) => ({
//       title: "",
//       tabBarIcon: 
//       <HomeButton
//        nav = {navigation} ></HomeButton> // Plus button component
//   })
//   },
//   Projects: ProjectsScreen,
//   Tasks: TasksScreen,
// },
// {
//   initialRouteName: 'Home'
// });

// Database.init();

// export default createAppContainer(TabNavigator);