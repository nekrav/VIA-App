import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { CheckBox, colors } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback, SafeAreaView, Keyboard, TextInput, ScrollView } from 'react-native';
import { Database, Routines, Habits, Projects, Tasks, Home, Random } from '../../db'
import { CreateProject, ViewProject, CreateRandom, ViewRandom } from '../../modals'
import { Controller } from '../controller'
import ActionButton from 'react-native-action-button';
import { NotesModal } from '../../modals/notesModal/notesModal'

import { Notifier } from '../../notifier/notifier'
import NotifService from '../../notifier/newNotifier';

import { SelectionModal } from '../../modals/selectionModal/selectionModal';
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/Feather';
import { TopBar, NotificationTimes, Notes, CompleteButton, TrashButton, StartEndTime, ChildrenContainer, ChildItem } from '../../components'

const notifier = new Notifier;
var uuid = require('react-native-uuid');
const styles = require('./styles');
const todayDate = new Date();
const emptyTimes = [
    {
        key: "1",
        name: "Monday",
        checked: false,
        times: []
    },
    {
        key: "2",
        name: "Tuesday",
        checked: false,
        times: []
    },
    {
        key: "3",
        name: "Wednesday",
        checked: false,
        times: []
    },
    {
        key: "4",
        name: "Thursday",
        checked: false,
        times: []
    },
    {
        key: "5",
        name: "Friday",
        checked: false,
        times: []
    },
    {
        key: "6",
        name: "Saturday",
        checked: false,
        times: []
    },
    {
        key: "7",
        name: "Sunday",
        checked: false,
        times: []
    },
]
const newHomeObject = {
    id: 'homeID1',
    main_goal_1: '',
    main_goal_2: '',
    main_goal_3: '',
    main_goal_1_date: '',
    main_goal_2_date: '',
    main_goal_3_date: '',
    main_goal: '',
    main_goal_date: '',
    quote: '',
    notes: ''
}

var uuid = require('react-native-uuid');

const childDBTableName = Random.TABLE_NAME

const controller = new Controller;

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
          );
        
        this.state = {
            addModalVisible: false,
            viewModalVisible: false,
            randomTasks: [],
            homeObject: {},
            numberOfItems: 0,
            numberOfFinishedItems: 0,
            selectedItem: {},
            viewRandomModalVisibility: false,
            viewTaskSelectionVisible: false,
            homeNotesModalVisibility: false,
            homeNotes: '',
            items: [],
            selectedRandom: {},
            mainGoalSelected: '',
            mainGoalSaveAction: '',
            selectedChild: '',
        };
    }

    componentDidMount() {
        notifier.scheduleAllNotifications();
        this.getRandomTasks();
        this.getHomeData();
        controller.loadAll(this, Tasks.TABLE_NAME);
    }

    onRegister(token) {
        this.setState({registerToken: token.token, fcmRegistered: true});
      }
    
      onNotif(notif) {
        Alert.alert(notif.title, notif.message);
      }
    
      handlePerm(perms) {
        Alert.alert('Permissions', JSON.stringify(perms));
      }

    getRandomTasks() {
        const itemsArr = []
        Database.getAll(Random.TABLE_NAME)
            .then((res) => {
                const len = res.rows.length;
                let item = {}
                for (let i = 0; i < len; i++) {
                    item = res.rows.item(i)
                    itemsArr.push({ key: JSON.stringify(item.id), value: item })
                }
                this.setState({
                    randomTasks: itemsArr
                })
            })
    }

    getHomeData() {
        // Database.clearAll().then(() => {
        Database.getFromHome(Home.TABLE_NAME)
            .then((res) => {
                const len = res.rows.length;
                if (len == 0) {
                    Database.clear(Home.TABLE_NAME).then(() => {
                        this.setState({ homeObject: newHomeObject })
                        Database.save(Home.TABLE_NAME, newHomeObject)
                    });
                }
                else {
                    let item = {}
                    for (let i = 0; i < len; i++) {
                        item = res.rows.item(i)
                        this.setState({ homeObject: item })
                    }
                }
            // })
        });
    }

    /* #region  Top Bar Region */
    renderTopBar() {
        return (<View style={styles.topNav}>
        </View>)
    }
    /* #endregion */


    /* #region  Random Tasks Region */
    saveNewRandom(random) {
        let newRandom = {}
        newRandom.id = uuid.v4();
        newRandom.name = random.name;
        newRandom.created_date = new Date().getDate();
        newRandom.due_date = random.due_date ? random.due_date : '';
        newRandom.importance = random.importance ? random.importance : 0;
        newRandom.percentage_done = 0;
        newRandom.completed = "false";
        newRandom.time_spent = 0;
        newRandom.notes = random.notes ? random.notes : '';
        newRandom.notification_time = random.notification_time ? random.notification_time : ''
        newRandom.only_today = random.only_today ? random.only_today : "false"
        Database.save(childDBTableName, newRandom).then(() => {
            this.getRandomTasks();
        })
    }


    setViewRandomModalVisibility(visible) {
        this.setState({ viewRandomModalVisibility: visible })
    }

    renderCreateNewRandomModal() {
        let newRandom = {};
        if (this.state.addModalVisible) {
            return <CreateRandom
                animationType="slide"
                transparent={false}
                id={(text) => { newRandom.id = text }}
                name={(text) => { newRandom.name = text }}
                due_date={(text) => { newRandom.due_date = text }}
                setImportanceNN={(text) => {
                    newRandom.importance = 1;
                }}
                setImportanceNU={(text) => {
                    newRandom.importance = 2;
                }}
                setImportanceIN={(text) => {
                    newRandom.importance = 3;
                }}
                setImportanceIU={(text) => {
                    newRandom.importance = 4;
                }}
                time_spent={(text) => { newRandom.time_spent = text }}
                notes={(text) => { newRandom.notes = text }}
                notification_time={(times) => {
                    if (times) {
                        newRandom.notification_time = times
                    } else {
                        newRandom.notification_time = JSON.stringify(emptyTimes)
                    }
                }}
                only_today={(text) => { newRandom.only_today = JSON.stringify(text) }}
                closeModal={() => { this.setState({ addModalVisible: false }) }}
                save={() => {
                    this.saveNewRandom(newRandom);
                    notifier.scheduleAllNotifications();
                    this.setState({ addModalVisible: false })
                }}>
            </CreateRandom>
        }
    }

    renderViewRandomModal() {
        if (this.state.viewRandomModalVisibility) {
            if (this.state.selectedRandom != {}) {
                theRandom = this.state.selectedChild
                return <ViewRandom
                    animationType="slide"
                    visible={this.state.viewRandomModalVisibility}
                    transparent={false}
                    editName={(text) => {
                        theRandom.name = text;
                        this.setState({ selectedRandom: theRandom })
                    }}
                    editDueDate={(text) => {
                        theRandom.due_date = text;
                        this.setState({ selectedRandom: theRandom })
                    }}
                    setImportanceNN={(text) => {
                        theRandom.importance = 1;
                        this.setState({ selectedRandom: theRandom })
                    }}
                    setImportanceNU={(text) => {
                        theRandom.importance = 2;
                        this.setState({ selectedRandom: theRandom })
                    }}
                    setImportanceIN={(text) => {
                        theRandom.importance = 3;
                        this.setState({ selectedRandom: theRandom })
                    }}
                    setImportanceIU={(text) => {
                        theRandom.importance = 4;
                        this.setState({ selectedRandom: theRandom })
                    }}
                    editFinishedDate={(text) => {
                        theRandom.finished_date = text;
                        this.setState({ selectedRandom: theRandom })
                    }}
                    editTimeSpent={(text) => {
                        theRandom.time_spent = text;
                        this.setState({ selectedRandom: theRandom })
                    }}
                    editPercentageDone={(text) => {
                        theRandom.percentage_done = text;
                        this.setState({ selectedRandom: theRandom })
                    }}
                    editCompleted={(text) => {
                        theRandom.completed = text;
                        this.setState({ selectedRandom: theRandom })
                    }}
                    editNotes={(text) => {
                        theRandom.notes = text;
                        this.setState({ selectedRandom: theRandom })
                    }}
                    editOnlyToday={(text) => {
                        theRandom.only_today = text;
                        this.setState({ selectedRandom: theRandom })
                    }}
                    editNotificationTime={(text) => {
                        if (text) {
                            var times = text.map(function (time) {
                                return JSON.stringify(time)
                            })
                            theRandom.notification_time = times
                            this.setState({ selectedRandom: theRandom })
                        }
                    }}
                    save={() => { controller.saveExisting(this, childDBTableName, theRandom) }}

                    selectedItem={theRandom}

                    delete={() => {
                        this.setViewRandomModalVisibility(false)
                        controller.delete(this, childDBTableName, theRandom)
                        this.getRandomTasks()
                    }}

                    closeModal={() => { this.setViewRandomModalVisibility(false) }}>
                </ViewRandom>
            }
        }
    }

    getChecked(item) {
        if (item != null)
            return checked = item.value.completed === "true"
    }

    /* #region  Children Region */
    renderChildren() {
        return (<ChildrenContainer
            parentId={this.state.selectedItem.id}
            parentName={this.state.selectedItem.name}
            relatedChildren={this.state.relatedChildren}
            borderColor={colorsProvider.randomMain}
            addButtonColor={colorsProvider.habitsMainColor}
            parentComplimentaryColor={colorsProvider.routinesComplimentaryColor}
            childType={childDBTableName}
            childTableName={childTableName}
            childUpdateCompleted={item => {
                // controller.saveExisting(this, childTableName, item)
                // controller.loadAllChildrenAndGetRelatedChildren(this, Habits.TABLE_NAME, this.state.selectedItem.id, "routine")
                // this.props.save();

                item.value.completed = !this.getChecked(item)
                controller.saveExisting(this, childDBTableName, item.value)
                this.getRandomTasks();
            }}
            saveItem={() => {
                // controller.loadAllChildrenAndGetRelatedChildren(this, Habits.TABLE_NAME, this.state.selectedItem.id, "routine")
            }}
            deleteItem={item => {
                // controller.delete(this, childTableName, item)
                // controller.loadAllChildrenAndGetRelatedChildren(this, Habits.TABLE_NAME, this.state.selectedItem.id, "routine")
                // this.props.save();
            }} />)
    }
    /* #endregion */

    renderRandomTasksSection() {
        if (this.state.randomTasks.length > 0) {
            return (
                <View style={{ flex: 1, borderWidth: 2, borderRadius: 20, borderColor: colorsProvider.randomMainColor, marginRight: 5, marginLeft: 5, marginBottom: 10, }}>
                    <ScrollView>
                        <View style={{}}>
                            <FlatList
                                horizontal={false}
                                scrollEnabled={true}
                                data={this.state.randomTasks}
                                style={{ flex: 1 }}
                                renderItem={({ item }) => {
                                    return <ChildItem
                                        itemKey={item.value.id}
                                        name={item.value.name}
                                        childMainColor={this.props.addButtonColor}
                                        item={item.value}
                                        completed={item.value.completed}
                                        parentComplimentaryColor={this.props.parentComplimentaryColor}
                                        childItemTableName={this.props.childItemTableName}
                                        deleteItem={item => {
                                            this.props.deleteItem(item)
                                        }}
                                        childUpdateCompleted={item => {
                                            this.props.childUpdateCompleted(item);
                                        }}
                                        goToItem={item => {
                                            this.setState({ viewChildModalVisible: true, selectedChild: item, viewRandomModalVisibility: true })
                                        }}
                                    />
                                }}
                            />
                        </View>
                    </ScrollView>
                    <ActionButton
                        size={45}
                        hideShadow={false}
                        offsetY={5}
                        offsetX={10}
                        buttonColor={colorsProvider.randomMainColor}
                        onPress={() => {
                            this.setState({ addModalVisible: true })
                        }}
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, borderWidth: 2, borderRadius: 20, borderColor: colorsProvider.randomMainColor, marginRight: 5, marginLeft: 5, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                    {/* {this.showAddModal()} */}
                    <Text style={{ color: colorsProvider.randomMainColor, fontFamily: colorsProvider.font }}>Done all your popup tasks for the day!</Text>
                    <ActionButton
                        size={45}
                        hideShadow={false}
                        offsetY={5}
                        offsetX={10}
                        buttonColor={colorsProvider.randomMainColor}
                        onPress={() => {
                            this.setState({ addModalVisible: true })
                        }}
                    />
                </View>
            )
        }
    }
    /* #endregion */

    /* #region  Notes Region */
    setHomeNotesModalVisibility(visible) {
        this.setState({ homeNotesModalVisibility: visible });
    }

    saveHomeObject(homeObject) {
        Database.update(Home.TABLE_NAME, homeObject).then(() => {
            Database.getFromHome();
        })
    }

    renderNotesModal() {
        if (this.state.homeNotesModalVisibility) {
            let homeObject = this.state.homeObject
            return (
                <NotesModal
                    animationType="slide"
                    transparent={true}
                    existingNotes={this.state.homeObject.notes}
                    color={colorsProvider.randomMainColor}
                    placeholder={'Notes...'}
                    setNotes={item => {
                        homeNotes = item
                        homeObject.notes = item
                        this.saveHomeObject(homeObject)
                    }}
                    closeModal={() => {
                        this.setHomeNotesModalVisibility(false);
                    }}
                ></NotesModal>
            );
        }
        return null;
    }

    renderNotesSection() {
        if (this.state.homeObject.notes != '') {
            return (
                <TouchableOpacity
                    style={styles.hasNotesContainer}
                    onPress={() => {
                        this.setHomeNotesModalVisibility(true);
                    }}>
                    <Text
                        style={{
                            color: colorsProvider.randomMainColor,
                            marginTop: 5,
                            marginLeft: 7,
                            fontFamily: colorsProvider.font,
                            fontSize: colorsProvider.fontSizeChildren
                        }}
                        multiline={true}>
                        {this.state.homeObject.notes}
                    </Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity
                style={styles.createNotesContainer}
                onPress={() => {
                    this.setHomeNotesModalVisibility(true);
                }}>
                <Text
                    style={{
                        color: colorsProvider.randomMainColor,
                        marginTop: 5,
                        marginLeft: 7,
                        fontFamily: colorsProvider.font,
                        fontSize: colorsProvider.fontSizeChildren
                    }}
                    multiline={true}
                    onChangeText={this.props.notes}>
                    Notes ...
                </Text>
            </TouchableOpacity>
        );
    }
    /* #endregion */

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column', 
                }}>

                    {/* Modals Region */}
                    {this.renderCreateNewRandomModal()}
                    {this.renderViewRandomModal()}
                    {this.renderNotesModal()}
                    {/* {this.renderSelectTaskModal()} */}

                    {/* Tab Bar Region */}
                    {/* {this.renderTopBar()} */}

                    {/* List Region */}

                    {/* 3 Main Goals Region */}
                    {/* {this.render3MainGoalSection()} */}


                    {this.renderNotesSection()}
                    {/* {this.renderChildren()} */}
                    {this.renderRandomTasksSection()}

                    <TouchableOpacity onPress={() => this.notif.launchNotification()}><Text>NOTIFICATION PRESS</Text></TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>
        );
    }
}