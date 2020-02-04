import React from 'react';
import { CheckBox } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback, SafeAreaView, Keyboard, TextInput } from 'react-native';
import { Database, Routines, Habits, Projects, Tasks, Home, Random } from '../../db'
import { CreateProject, ViewProject, CreateRandom, ViewRandom, NotesModal } from '../../modals'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/Feather';

var uuid = require('react-native-uuid');
const styles = require('./styles');

const newHomeObject={
    id: 'homeID1',
    three_main_goals: '',
    main_goal: '',
    quote: '',
    notes: ''
}

var uuid = require('react-native-uuid');

const controller = new Controller;

const childDBTableName = Random.TABLE_NAME

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalVisible: false,
            viewModalVisible: false,
            items: [],
            homeObject: {},
            numberOfItems: 0,
            numberOfFinishedItems: 0,
            selectedItem: {},
            createRandomModalVisibility: false,
            viewRandomModalVisibility: false,
            homeNotesModalVisibility: false,
            homeNotes: '',
        };
    }

    componentDidMount() {
        this.getHomeData();

    }

    getHomeData() {
        if (Object.keys(this.state.homeObject).length == 0) {
            this.setState({homeObject: newHomeObject})

        } else {
            console.warn("bobo")
            Database.getFromHome(Home.TABLE_NAME)
            .then((res) => {
                const len = res.rows.length;
                let item = {}
                for (let i = 0; i < len; i++) {
                 
                    item = res.rows.item(i)
                    console.warn(item)
                    itemsArr.push({ key: JSON.stringify(item.id), value: item })
                }
                object.setState({
                    homeObject: item
                })
            })
        }
       
    }

    saveNewRandom(random) {
        let newRandom = {}
        newRandom.id = random.id;
        newRandom.name = random.name;
        newRandom.created_date = new Date().getDate();
        newRandom.due_date = random.due_date ? random.due_date : '';
        newRandom.importance = random.importance ? random.importance : '';
        newRandom.percentage_done = 0;
        newRandom.completed = "false";
        newRandom.time_spent = 0;
        newRandom.notes = random.notes ? random.notes : '';
        newRandom.notification_time = random.notification_time ? random.notification_time : ''
        newRandom.only_today = random.only_today ? random.only_today : ''
        Database.save(childDBTableName, newRandom).then(() => {
            this.setCreateRandomModalVisibility(false)
            controller.loadAll(this, childDBTableName)
        })
    }


    setCreateRandomModalVisibility(visible) {
        this.setState({ createRandomModalVisibility: visible })
    }


    setViewRandomModalVisibility(visible) {
        this.setState({ viewRandomModalVisibility: visible })
    }


    setNotesModalVisibility(visible) {
        this.setState({ homeNotesModalVisibility: visible })
    }

    renderCreateNewRandomModal() {
        let newRandom = {};
        if (this.state.createRandomModalVisibility) {
            return <CreateRandom
                animationType="slide"
                transparent={false}
                id={(text) => { newRandom.id = text }}
                name={(text) => { newRandom.name = text }}
                due_date={(text) => { newRandom.due_date = text }}
                importance={(text) => { newRandom.importance = text }}
                time_spent={(text) => { newRandom.time_spent = text }}
                notes={(text) => { newRandom.notes = text }}
                notification_time={(text) => {
                    if (text) {
                        var times = text.map(function (time) {
                            return JSON.stringify(time)
                        })
                        newRandom.notification_time = times
                    }
                }}
                only_today={(text) => { newRandom.only_today = text }}
                closeModal={() => { this.setCreateRandomModalVisibility(false)}}
                save={() => { this.saveNew(newRandom) }}
            ></CreateRandom>
        }
    }

    renderViewRandomModal() {
        if (this.state.viewRandomModalVisibility) {
            if (this.state.selectedItem != {}) {
                theRandom = this.state.selectedItem
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
                    editImportance={(text) => {
                        theRandom.importance = text;
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
                            this.setState({ selectedRandom: theTask })
                        }
                    }}
                    save={() => { controller.saveExisting(this, childDBTableName, theRandom) }}

                    selectedItem={theRandom}

                    delete={() => { controller.delete(this, childDBTableName, theRandom) }}

                    closeModal={() => { this.setViewRandomModalVisibility(false) }}>
                </ViewRandom>
            }
        }
    }

     /* #region  Notes Region */
     setHomeNotesModalVisibility(visible) {
        this.setState({ homeNotesModalVisibility: visible });
    }

    saveHomeObject(homeObject) {
        Database.update(Home.TABLE_NAME, homeObject).then(() => {
            Database.getFromHome();
        })

        // controller.saveExisting(this, Home.TABLE_NAME, theTask)
        // Database.save(Home.TABLE_NAME, this.state.homeObject)
    }

    renderNotesModal() {
        if (this.state.homeNotesModalVisibility) {
            console.warn(this.state.homeObject)
            let homeObject = this.state.homeObject
            return (
                <NotesModal
                    animationType="slide"
                    transparent={true}
                    existingNotes={this.state.homeObject.notes}
                    placeholder={'Notes...'}
                    setNotes={item => {
                        homeNotes = item
                        homeObject.notes = item
                        this.saveHomeObject(homeObject)
                        // this.setState({ homeNotes: item });

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
                        style={styles.hasNotesText}
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
                }}
            >
                <Text
                    style={styles.createNotesText}
                    multiline={true}
                    onChangeText={this.props.notes}
                >
                    Notes ...
        </Text>
            </TouchableOpacity>
        );
    }
    /* #endregion */

    getChecked(item) {
        if (item != null)
            var checked = false
        {
            return checked = item.value.completed === "true"
        }

    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={styles.outerView}>
                    {/* Modals Region */}
                    {this.renderCreateNewRandomModal()}
                    {this.renderViewRandomModal()}
                    {this.renderNotesModal()}

                    {/* /* #region Top Navigation Section  */}
                    <View style={styles.topNav}>
                        <View style={styles.centerTitleContainer}><Text style={styles.topNavLeftTitleText}>Home</Text></View>
                        <Text style={styles.topNavCenterTitleText}>{this.state.numberOfItems}</Text>
                        <TouchableOpacity style={styles.addItemButtonContainer}
                            onPress={() => {
                                controller.setAddModalVisible(this, true);
                            }}>
                            <FIcon style={styles.addItemButtonText} name="plus" />
                        </TouchableOpacity>
                    </View>

                    {/* List Region */}

                    {this.renderNotesSection()}
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}