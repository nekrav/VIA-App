import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { CheckBox, colors } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback, SafeAreaView, Keyboard, TextInput, ScrollView, TouchableHighlightBase } from 'react-native';
import { Database, Routines, Habits, Projects, Tasks, Home, Random } from '../../db'
import { CreateProject, ViewProject, CreateRandom, ViewRandom } from '../../modals'
import { Controller } from '../controller'
import ActionButton from 'react-native-action-button';
import { NotesModal } from '../../modals/notesModal/notesModal'

import NotifService from '../../notifier/newNotifier';

import { SelectionModal } from '../../modals/selectionModal/selectionModal';
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/Feather';
import { TopBar, NotificationTimes, Notes, CompleteButton, TrashButton, StartEndTime, ChildrenContainer, ChildItem } from '../../components'
import { createIconSetFromFontello } from 'react-native-vector-icons';

var uuid = require('react-native-uuid');
const styles = require('./styles');


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
    notes: '',
}

var uuid = require('react-native-uuid');

const childDBTableName = Random.TABLE_NAME

const controller = new Controller;

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);



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
            habits: [],
            routines: [],
            projects: [],
            tasks: [],
            projectsDueToday: [],
            tasksDueToday: [],
        };
    }

    componentDidMount() {
        global.notifier.scheduleAllNotifications();
        this.getRandomTasks();
        this.getAllHabits();
        this.getAllRoutines();
        this.getAllProjects();
        this.getAllTasks();
        this.getHomeData();
        controller.loadAll(this, Tasks.TABLE_NAME);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.addModalVisible) {
            if (prevState.projectsDueToday != this.state.projectsDueToday) {
                this.getAllProjects();
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // if (this.state.projectsDueToday)
        // this.setState({projectsDueToday: prevState.projectsDueToday})
        return {
            projectsDueToday: prevState.projectsDueToday,
            // ... other derived state properties
        };
    }

    onRegister(token) {
        this.setState({ registerToken: token.token, fcmRegistered: true });
    }

    onNotif(notif) {
        //Alert.alert(notif.title, notif.message);
    }

    handlePerm(perms) {
        //Alert.alert('Permissions', JSON.stringify(perms));
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

    getAllHabits() {
        const itemsArr = []
        Database.getAll(Habits.TABLE_NAME)
            .then((res) => {
                const len = res.rows.length;
                let item = {}
                for (let i = 0; i < len; i++) {
                    item = res.rows.item(i)
                    itemsArr.push({ key: JSON.stringify(item.id), value: item })
                }
                this.setState({
                    habits: itemsArr
                })
            })
    }

    getAllRoutines() {
        const itemsArr = []
        Database.getAll(Routines.TABLE_NAME)
            .then((res) => {
                const len = res.rows.length;
                let item = {}
                for (let i = 0; i < len; i++) {
                    item = res.rows.item(i)
                    itemsArr.push({ key: JSON.stringify(item.id), value: item })
                }
                this.setState({
                    routines: itemsArr
                })
            })
    }

    getAllProjects() {
        const itemsArr = []
        const dueToday = []
        Database.getAll(Projects.TABLE_NAME)
            .then((res) => {
                const len = res.rows.length;
                let item = {}
                for (let i = 0; i < len; i++) {
                    item = res.rows.item(i)
                    itemsArr.push({ key: JSON.stringify(item.id), value: item })
                    if (this.isDueToday(item.due_date))
                        dueToday.push(item)
                }
                this.setState({
                    projects: itemsArr,
                    projectsDueToday: dueToday
                })
            })
    }

    getAllTasks() {
        const itemsArr = []
        Database.getAll(Tasks.TABLE_NAME)
            .then((res) => {
                const len = res.rows.length;
                let item = {}
                for (let i = 0; i < len; i++) {
                    item = res.rows.item(i)
                    itemsArr.push({ key: JSON.stringify(item.id), value: item })
                }
                this.setState({
                    tasks: itemsArr
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
        newRandom.created_date = global.todayDate.toString();
        newRandom.due_date = random.due_date ? random.due_date : '';
        newRandom.importance = random.importance ? random.importance : 0;
        newRandom.percentage_done = 0;
        newRandom.completed = "false";
        newRandom.time_spent = 0;
        newRandom.notes = random.notes ? random.notes : '';
        newRandom.notification_time = random.notification_time ? random.notification_time : ''
        newRandom.only_today = random.only_today ? random.only_today : "false"
        newRandom.properties = random.properties ? JSON.stringify(random.properties) : JSON.stringify({ specificNotificationDates: [] })
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
                        newRandom.notification_time = JSON.stringify(global.emptyTimes)
                    }
                }}
                saveSpecificNotificationDates={(text) => {
                    newRandom.properties = {specificNotificationDates: text ? text : []} 
                }}
                only_today={(text) => { newRandom.only_today = JSON.stringify(text) }}
                closeModal={() => { this.setState({ addModalVisible: false }) }}
                save={() => {
                    this.saveNewRandom(newRandom);
                    global.notifier.scheduleAllNotifications();
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
                    saveSpecificNotificationDates={(text) => {
                        theRandom.properties = JSON.stringify({specificNotificationDates: text ? text : []}) 
                        this.setState({ selectedRandom: theRandom })
                    }}
                    editNotificationTime={(times) => {
                        if (times) {
                            theRandom.notification_time = times
                        } else {
                            theRandom.notification_time = JSON.stringify(global.emptyTimes)
                        }
                        this.setState({ selectedRandom: theRandom })
                    }}
                    save={() => {
                        controller.saveExisting(this, childDBTableName, theRandom)
                    }}

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

                item.value.completed = !controller.getChecked(item)
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
                                        deleteItem={ () => {
                                            // var arr = this.state.randomTasks
                                            var index = this.state.randomTasks.indexOf(item)
                                            controller.delete(this, "random", item.value)
                                            if (index !== -1) {
                                                var newArr = this.state.randomTasks
                                                newArr.splice(index, 1)
                                                this.setState({ randomTasks: newArr })
                                            }
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

    isDueToday(date) {
        if (date != null) {
            var dueDate = new Date(date)
            if (dueDate.getDate() == global.todayDate.getDate())
                return true
        }

        return false
    }

    renderDueProjectsSection() {
        const fakeTasks = [{ key: 1, name: "Task 1" }, { key: 2, name: "Task 2" }, { key: 3, name: "Task 3" }, { key: 3, name: "Task 3" }, { key: 3, name: "Task 3" }, { key: 3, name: "Task 3" }, { key: 3, name: "Task 3" }, { key: 3, name: "Task 3" }, { key: 3, name: "Task 3" }, { key: 3, name: "Task 3" }, { key: 3, name: "Task 3" }, { key: 3, name: "Task 3" }, { key: 3, name: "Task 3" }, { key: 3, name: "Task 3" }];
        const double = this.state.projectsDueToday

        return <View style={{ flex: 1, backgroundColor: colorsProvider.whiteColor, margin: 5, borderWidth: 1, borderRadius: 5, borderColor: colorsProvider.projectsMainColor }}>
            <Text>Projects due today: </Text>
            <FlatList
                horizontal={false}
                scrollEnabled={true}
                data={double}
                horizontal={true}
                // style={{ marginBottom: 1 }}
                // contentContainerStyle={{flex: 0, margin: 5, borderRadius: 5, borderColor: colorsProvider.habitsMainColor, borderWidth: 0, }}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={{ margin: 5, borderRadius: 5, borderColor: colorsProvider.habitsComplimentaryColor, borderWidth: 2 }}>
                            <Text style={{ backgroundColor: colorsProvider.projectsMainColor }}>{item.name}</Text>
                            <FlatList
                                horizontal={false}
                                scrollEnabled={true}
                                data={fakeTasks}
                                style={{}}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => {
                                    return <View style={{ flex: 0, flexGrow: 1, }}>
                                        <View style={{}}>
                                            <Text style={{}}>{item.name}</Text>
                                        </View>
                                    </View>
                                }}
                            />
                        </View>)
                }}
            />

        </View>
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

    scrollToBottom() {
        this.ScrollView.scrollToEnd({ animated: true })
    }

    render() {
        // return (
        // <View onPress={Keyboard.dismiss} accessible={false}>
        return (<View style={{
            flex: 1,
            // flexGrow: 2,
            // flexDirection: 'column',
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colorsProvider.randomMainColor }}>
                <View style={{ flex: 1, marginRight: 5 }}></View>
                <TouchableOpacity><SIcon style={{ marginRight: 25, marginTop: 30 }} color={colorsProvider.whiteColor} size={35} name="options" /></TouchableOpacity>
            </View>
            <View
                ref={ref => {
                    this.ScrollView = ref;
                }}
                scrollEnabled={false}
                // contentContainerStyle={{ flex: 1, flexGrow: 1 }}
                style={{
                    flex: 1,
                    // flexGrow: 2,
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
                {this.renderDueProjectsSection()}
                {/* <View style={{ height: '100%' }}> */}

                {this.renderNotesSection()}
                {/* {this.renderChildren()} */}
                {this.renderRandomTasksSection()}
                {/* <TouchableOpacity style={{ margin: 10 }} onPress={() => {
                                global.notifier.launchNotification();
                                this.ScrollView.scrollToEnd({ animated: true })
                            }}>
                                <Text>NOTIFICATION PRESS</Text>
                            </TouchableOpacity> */}
                {/* </View> */}
                {/* <View style={{ height: '100%' }}>
                            {this.renderNotesSection()}
                            {this.renderChildren()}
                            {this.renderRandomTasksSection()}
                        </View> */}


            </View>
        </View>
            // </View>
        );
    }
}