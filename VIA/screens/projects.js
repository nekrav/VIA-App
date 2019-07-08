import React from 'react';
import { Text, View, FlatList, TouchableOpacity, Button, StatusBar, TouchableHighlight } from 'react-native';
import { Database, Projects } from '../db'
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Version can be specified in package.json
// import ActionButton from 'react-native-action-button';
// import { CreateProject } from '../modals'
// import { SwipeListView } from 'react-native-swipe-list-view';
const uuidv4 = require('uuid/v4');


// const styles = require('./styles');

export class ProjectsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPercentageCompleted: 0,
      numberOfFinishedProjects: 0,
      finishedProjects: [],
      numberOfProjects: 0,
      projects: this.loadProjects(),
      createProjectModal: false,
      slidOpenProject: false,
    };
  }

  componentDidMount() {
    this.loadProjects();
  }

  loadProjects() {
    const projArr = []
    const finishedProjArr = []
    Database.getAll(Projects.TABLE_NAME)
      .then((res) => {
        const len = res.rows.length;
        let p = {}
        for (let i = 0; i < len; i++) {
          p = res.rows.item(i)
          projArr.push({ key: JSON.stringify(p.id), name: p.name, value: p })
          if (p.completed === 'true') {
            finishedProjArr.push({ key: JSON.stringify(p.id), name: p.name, value: p })
          }
        }
        this.setState({
          projects: projArr,
          numberOfProjects: projArr.length,
          numberOfFinishedProjects: finishedProjArr.length,
          totalPercentageCompleted: ((finishedProjArr.length / len) * 100)
        })
        this.forceUpdate()
      })
  }

  goToProject(id) {
    global.selectedProject = id
    this.props.navigation.replace('ProjectView', { updateList: this.update })
  }

  setCreateModalVisible(visible) {
    this.setState({ createProjectModal: visible });
  }

  update = () => {
    this.loadProjects()
  }

  save(name, description, dueDate, weight, reminderDate, reminderTime, reminderDays, estimatedTime) {
    let newProj = {}
    newProj.id = uuidv4()
    newProj.name = name;
    newProj.description = description;
    newProj.weight = weight;
    newProj.date_reminder = reminderDate;
    newProj.date_due = dueDate;
    newProj.reminder_days = reminderDays;
    newProj.reminder_time = reminderTime;
    newProj.estimated_time = estimatedTime;
    newProj.completed = 'false';
    newProj.percentage = 0;
    newProj.date_completed = '';
    newProj.date_created = new Date().toString();

    Database.save(Projects.TABLE_NAME, newProj).then(() => {
      newProj = {}

      newProj.id = 0
      newProj.name = '';
      newProj.description = '';
      newProj.weight = weight;
      newProj.date_reminder = '';
      newProj.date_due = '';
      newProj.reminder_days = '';
      newProj.reminder_time = '';
      newProj.estimate_time = '';
      newProj.completed = 'false';
      newProj.percentage = 0;
      newProj.date_completed = '';
      newProj.date_created = new Date().toString();

      this.setState({ newName: '', newDescription: '' })
    })
  }

  render() {
    return (
        // <StatusBar
        //   backgroundColor="blue"
        //   barStyle="light-content" />
        // <CreateProject
        //   animationType="slide"
        //   transparent={false}
        //   visible={this.state.createProjectModal}
        //   name={newName => this.setState({ newName })}
        //   description={newDescription => this.setState({ newDescription })}
        //   dueDate ={newDueDate => this.setState({ newDueDate })}
        //   weight ={newWeight => this.setState({ newWeight })}
        //   reminderDate ={newReminderDate => this.setState({ newReminderDate })}
        //   reminderTime ={newReminderTime => this.setState({ newReminderTime })}
        //   reminderDays ={newReminderDays=> this.setState({ newReminderDays })}
        //   estimatedTime ={newEstimatedTime => this.setState({ newEstimatedTime })}
        //   save={() => { 
        //     this.save(
        //       this.state.newName,
        //       this.state.newDescription ? this.state.newDescription : '',
        //       this.state.newDueDate ? this.state.newDueDate : '',
        //       this.state.newWeight ? this.state.newWeight : '',
        //       this.state.newReminderDate ? this.state.newReminderDate : '',
        //       this.state.newReminderDays ? this.state.newReminderDays : '',
        //       this.state.newReminderTime ? this.state.newReminderTime : '',
        //       this.state.newEstimatedTime ? this.state.newEstimatedTime : '',
        //       ); 
              
        //       this.setCreateModalVisible(false); this.loadProjects(); }}
        //   closeModal={() => { this.setCreateModalVisible(false) }} />
        <View style={{paddingTop: 25,
            paddingBottom: 5,
            backgroundColor: '#0b132b',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',}}>
          <Text style={{  marginTop: 5,
        marginBottom: 5,
        fontFamily: 'Arial',
        fontSize: 24,
        color: '#effcff'}}>Projects</Text>

        
        </View>
        // <View style={styles.topBarView}>
        //   <Text style={styles.topBarText}>Projects: {this.state.numberOfProjects}</Text>
        //   <Text style={styles.topBarText}>Completed: {this.state.numberOfFinishedProjects}</Text>
        //   {/* <Text style={styles.topBarText}>%{this.state.totalPercentageCompleted}</Text> */}
        // </View>
        // <SwipeListView
        //   useFlatList
        //   onRowOpen={() => { this.setState({ slidOpenProject: true }) }}
        //   onRowClose={() => { this.setState({ slidOpenProject: false }) }}
        //   closeOnRowPress={true}
        //   style={styles.listView}
        //   data={this.state.projects}
        //   renderItem={(item, rowMap) =>
        //     <TouchableHighlight
        //       activeOpacity={1}
        //       onPress={() => {
        //         if (this.state.slidOpenProject) {
        //           rowMap[item.item.key].closeRow();
        //         } else {
        //           this.goToProject(item.item.key)
        //         }
        //       }}>
        //       <View style={styles.listItem}>
        //         <View
        //           style={{
        //             flex: 1,
        //             alignContent: 'center',
        //             justifyContent: 'center',
        //           }}>
        //           <Text style={{
        //             color: 'white',
        //             fontWeight: '500',
        //             fontSize: 16,
        //             marginLeft: 10,
        //           }}>
        //             {item.item.value.name}
        //           </Text></View>
        //       </View>
        //     </TouchableHighlight>
        //   }
        //   renderHiddenItem={(data, rowMap) => (
        //     <View style={{
        //       alignItems: 'center',
        //       flex: 1,
        //       flexDirection: 'row',
        //       justifyContent: 'flex-end',
        //     }}>
        //       <TouchableOpacity
        //         style={{
        //           backgroundColor: '#E00303',
        //           justifyContent: 'center',
        //           paddingLeft: '3%',
        //           paddingRight: '3%',
        //           height: '100%',
        //           borderBottomWidth: 1,
        //           borderTopWidth: 1,
        //           borderBottomColor: 'white',
        //           borderTopColor: 'white',

        //         }}
        //         onPress={_ => {
        //           rowMap[data.item.key].closeRow();
        //           Database.deleteOne(Projects.TABLE_NAME, data.item.key)
        //           this.loadProjects()
        //         }}>
        //         <Text style={{
        //           color: 'white',
        //           fontWeight: '500',
        //           fontSize: 16
        //         }}>Delete</Text>
        //       </TouchableOpacity>
        //     </View>
        //   )}

        //   rightOpenValue={-70}
        // />
        // {/* <FlatList
        //   style={styles.listView}
        //   data={this.state.projects}
        //   renderItem={({ item }) =>
        //     <View>
        //       <TouchableOpacity
        //         onPress={() => { this.goToProject(item.key) }}>
        //         <View style={styles.listItem}>
        //           <Text>{item.name}</Text>
        //         </View>
        //       </TouchableOpacity>
        //     </View>
        //   } /> */}
        // <ActionButton buttonColor='#effcff' buttonTextStyle={{ color: '#000' }}
        //   onPress={() => { this.setCreateModalVisible(true); }}>
        //   <Icon name="list" style={styles.actionButtonIcon} />
        // </ActionButton>

        // {/* </View> */}

    )
  }
}