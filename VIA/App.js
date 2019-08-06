
import React from 'react';
import { Text, View, Button, Modal, TouchableHighlight, TextInput } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Database, Projects, Habits } from './db'
import { ProjectsScreen } from './screens'
import { CreateHabit} from './modals'


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalVisible: true,
      numberOfHabits: 0,

    };
  }
  componentDidMount() {
    this.loadHabits();
  }

  loadHabits() {
    const habArr = []
    const finishedHabArr = []
    Database.getAll(Habits.TABLE_NAME)
      .then((res) => {
        const len = res.rows.length;
        console.warn(len)
        let h = {}
        for (let i = 0; i < len; i++) {
          h = res.rows.item(i)
          console.warn(h)
          habArr.push({ key: JSON.stringify(h.id), name: h.name, value: h })
          if (h.completed === 'true') {
            finishedHabArr.push({ key: JSON.stringify(h.id), name: h.name, value: h })
          }
        }
        this.setState({
          numberOfHabits: len,
          numberOfCompletedHabits: finishedHabArr.length
        })
      })
  }

  setModalVisible(visible) {
    this.setState({ addModalVisible: visible });
  }

  showAddModal() {
    return <CreateHabit
    
    ></CreateHabit>
    // return <Modal
    //   animationType="slide"
    //   transparent={false}
    //   visible={this.state.addModalVisible}
    //   onRequestClose={() => {
    //     alert('Modal has been closed.');
    //   }}>
    //   <View style={{ marginTop: 22, alignItems: "center" }}>
    //     <View>
    //       <Text>Hello World!</Text>

    //       <TextInput
    //         style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
    //         onChangeText={(text) =>
    //           this.setState({ text })
    //         }
    //         value={this.state.text}></TextInput>

    //       <View style={{ marginTop: 22, flexDirection: "row", alignItems: "center" }}>
    //         <TouchableHighlight
    //           onPress={() => {
    //             this.setModalVisible(!this.state.addModalVisible);
    //           }}>
    //           <Text>Save</Text>
    //         </TouchableHighlight>
    //         <TouchableHighlight
    //           onPress={() => {
    //             this.setModalVisible(!this.state.addModalVisible);
    //           }}>
    //           <Text>Close</Text>
    //         </TouchableHighlight>
    //       </View>
    //     </View>
    //   </View>
    // </Modal>
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this.showAddModal()}
        <Text>Home!</Text>
        <Text>{this.state.numberOfHabits}</Text>
        <Button
          title="Add Habit"
          onPress={() => {
            this.setModalVisible(true);
          }} />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}



const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
});

Database.init();

export default createAppContainer(TabNavigator);