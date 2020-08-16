import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider, colors } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, ScrollView, FlatList, Dimensions } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/Feather';
import ActionButton from 'react-native-action-button';
import RBSheet from "react-native-raw-bottom-sheet";
import { Database } from '../db'
import { Controller } from '../screens/controller'

import Moment from 'moment';
import { CreateHabit, ViewHabit, ViewTask, CreateTask } from '../modals'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ChildItem } from '../components'
const todayDate = new Date();
const screenHeight = Math.round(Dimensions.get('window').height);
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

const controller = new Controller;
var uuid = require('react-native-uuid');

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class ChildrenContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            percentageDone: this.props.percentageDone,
            completed: this.props.completed,
            finishedDate: this.props.finishedDate,
            relatedChildren: this.props.relatedChildren,
            addModalVisible: false,
            viewChildModalVisible: false,
            selectedChild: '',
            isFetching: true,
            childCreateComponentName: 'CreateHabit'
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.relatedChildren !== this.props.relatedChildren) {
            this.fetch();
        }
    }

    async fetch() {
        this.setState({ isFetching: true });
        this.setState({ relatedChildren: this.props.relatedChildren, isFetching: false });
    }


    componentDidMount() {
        this.fetch();
    }

    deleteItem(item) {
        var array = this.state.relatedChildren
        var index = array.indexOf(item)
        this.state.relatedChildren.splice(index, 1)

        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ allChildren: array });
            this.props.deleteItem(item)
        }
    }

    goToItem(item) {
        this.setState({ viewChildModalVisible: true, selectedChild: item })
    }

    renderBottomSlidingPane() {
        return (<RBSheet
            ref={ref => {
                this.RBSheet = ref;
            }}
            closeOnPressMask={true}
            dragFromTopOnly={true}
            height={screenHeight / 1.36}
            openDuration={250}>
            <View style={{
                marginTop: 10,
                marginLeft: 20,
            }}>
                <TouchableOpacity onPress={() => {
                    this.RBSheet.close();
                    this.setState({ addModalVisible: true })
                }}>
                    <FIcon name="plus" color={colorsProvider.habitsMainColor} size={colorsProvider.fontSizeAddButton} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={this.state.relatedChildren}
                contentContainerStyle={{ marginLeft: 10, marginRight: 10, alignContent: 'center' }}
                style={{ marginLeft: 10, marginRight: 10 }}
                renderItem={({ item }) =>
                    <View style={{
                        flex: 1,
                        borderRadius: 10,
                        backgroundColor: this.props.color,
                        marginTop: 10,
                        marginBottom: 10,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                // this.props.addParent(item.value.id, item.value.name);
                                this.RBSheet.close()
                            }}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{
                                marginRight: 5,
                                marginLeft: 10,
                                marginTop: 10,
                                marginBottom: 10,
                                fontSize: colorsProvider.fontSizeChildren,
                                fontFamily: colorsProvider.fontFamily,
                                color: colorsProvider.whiteColor
                            }}>{item.value.name}</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 50, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colorsProvider.redColor,
                        margin: 10,
                        borderRadius: 10,
                        alignContent: 'center',
                    }}
                    onPress={() => {
                        // this.props.removeParent();
                        this.RBSheet.close()
                    }}>
                    <Text style={{
                        marginRight: 10,
                        marginLeft: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        fontSize: colorsProvider.fontSizeChildren,
                        fontFamily: colorsProvider.fontFamily,
                        color: colorsProvider.whiteColor
                    }}>Remove From </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        backgroundColor: colorsProvider.closeButtonColor,
                        margin: 10,
                        borderRadius: 10,
                    }}
                    onPress={() => {
                        this.RBSheet.close()
                    }}>
                    <Text style={{
                        marginRight: 10,
                        marginLeft: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        fontSize: colorsProvider.fontSizeChildren,
                        fontFamily: colorsProvider.fontFamily,
                        color: colorsProvider.whiteColor
                    }}>Close</Text>
                </TouchableOpacity>

            </View>
        </RBSheet>)
    }

    saveNewHabit(habit) {
        let newHabit = {}
        newHabit.id = uuid.v4();
        newHabit.name = habit.name;
        newHabit.created_date = new Date().getDate();
        newHabit.start_time = habit.start_time ? habit.start_time : ''
        newHabit.end_time = habit.end_time ? habit.end_time : ''
        newHabit.importance = habit.importance ? habit.importance : ''
        newHabit.percentage_done = 0
        newHabit.routine = habit.routine ? habit.routine : '';
        newHabit.routineName = habit.routineName ? habit.routineName : '';
        newHabit.completed = "false"
        newHabit.notes = habit.notes ? habit.notes : '',
            newHabit.time_to_spend = habit.time_to_spend ? habit.time_to_spend : ''
        newHabit.notification_time = habit.notification_time ? habit.notification_time : ''
        newHabit.days_to_do = habit.days_to_do ? habit.days_to_do : ''

        Database.save('habits', newHabit).then(() => {
            this.setState({ addModalVisible: false })
            controller.loadAll(this, 'habits')
            this.props.saveItem();
        })
    }

    saveNewTask(task) {
        let newTask = {}
        newTask.id = uuid.v4();
        newTask.name = task.name;
        newTask.created_date = new Date().getDate();
        newTask.due_date = task.due_date ? task.due_date : "";
        newTask.importance = task.importance ? task.importance : 0;
        newTask.percentage_done = 0;
        newTask.completed = "false";
        newTask.project = task.project ? task.project : "";
        newTask.projectName = task.projectName ? task.projectName : "";
        newTask.time_spent = 0;
        newTask.notes = task.notes ? task.notes : "";
        newTask.notification_time = task.notification_time ? task.notification_time : ''
        Database.save(dbTableName, newTask).then(() => {
            controller.setAddModalVisible(this, false)
            controller.loadAll(this, dbTableName)
            notifier.scheduleAllNotifications()
        })

        Database.save('tasks', newTask).then(() => {
            this.setState({ addModalVisible: false })
            controller.loadAll(this, 'tasks')
            this.props.saveItem();
        })
    }

    showAddModal() {
        let newHabit = {};
        if (this.state.addModalVisible) {
            if (this.props.childType == 'Habits') {
                return <CreateHabit
                    animationType="slide"
                    transparent={false}
                    parentId={this.props.parentId}
                    parentName={this.props.parentName}
                    id={(text) => { newHabit.id = text }}
                    name={(text) => { newHabit.name = text }}
                    setImportanceNN={(text) => {
                        newHabit.importance = 1;
                    }}
                    setImportanceNU={(text) => {
                        newHabit.importance = 2;
                    }}
                    setImportanceIN={(text) => {
                        newHabit.importance = 3;
                    }}
                    setImportanceIU={(text) => {
                        newHabit.importance = 4;
                    }}
                    time_to_spend={(text) => { newHabit.time_to_spend = text }}
                    start_time={(text) => { newHabit.start_time = text }}
                    end_time={(text) => { newHabit.end_time = text }}
                    notification_time={(times) => {
                        if (times) {
                            newHabit.notification_time = times
                        } else {
                            newHabit.notification_time = JSON.stringify(emptyTimes)
                        }
                    }}
                    routine={(text) => { newHabit.routine = text }}
                    days_to_do={(text) => { newHabit.days_to_do = text }}
                    notes={(text) => { newHabit.notes = text }}
                    closeModal={() => {
                        this.setState({ addModalVisible: false })
                    }}
                    save={() => {
                        if (!newHabit.routine) {
                            newHabit.routine = this.props.parentId
                            newHabit.routineName = this.props.parentName
                        }
                        this.saveNewHabit(newHabit)
                    }}
                />
            }
            if (this.props.childType == 'Tasks') {
                return <CreateTask
                    animationType="slide"
                    transparent={false}
                    name={(text) => { newTask.name = text }}
                    due_date={(text) => {
                        newTask.due_date = text
                    }}
                    setImportanceNN={(text) => {
                        newTask.importance = 1;
                    }}
                    setImportanceNU={(text) => {
                        newTask.importance = 2;
                    }}
                    setImportanceIN={(text) => {
                        newTask.importance = 3;
                    }}
                    setImportanceIU={(text) => {
                        newTask.importance = 4;
                    }}
                    importance={(text) => { newTask.importance = text }}
                    project={(id, name) => {
                        newTask.projectName = name;
                        newTask.project = id
                    }}
                    time_spent={(text) => { newTask.time_spent = text }}
                    notes={(text) => { newTask.notes = text }}
                    notification_time={(times) => {
                        if (times) {
                            newTask.notification_time = times
                        } else {
                            newTask.notification_time = JSON.stringify(emptyTimes)
                        }
                    }}
                    closeModal={() => { controller.setAddModalVisible(this, false) }}
                    save={() => {
                        if (!newTask.notification_time) {
                            newTask.notification_time = emptyTimes
                        }
                        this.saveNew(newTask)
                    }}
                ></CreateTask>
            }
        }
    }

    showViewModal() {
        if (this.state.viewChildModalVisible) {
            if (this.state.selectedChild) {
                if (this.props.childType == 'Habits') {
                    theHabit = this.state.selectedChild
                    return <ViewHabit
                        animationType="slide"
                        transparent={false}
                        editName={(text) => {
                            theHabit.name = text;
                            // this.setState({ selectedItem: theHabit })
                        }}
                        setImportanceNN={(text) => {
                            theHabit.importance = 1;
                        }}
                        setImportanceNU={(text) => {
                            theHabit.importance = 2;
                        }}
                        setImportanceIN={(text) => {
                            theHabit.importance = 3;
                        }}
                        setImportanceIU={(text) => {
                            theHabit.importance = 4;
                        }}
                        editStartTime={(text) => {
                            theHabit.start_time = text;
                            // this.setState({ selectedItem: theHabit })
                        }}
                        editEndTime={(text) => {
                            theHabit.end_time = text;
                            // this.setState({ selectedItem: theHabit })
                        }}
                        editImportance={(text) => {
                            theHabit.importance = text;
                            // this.setState({ selectedItem: theHabit })
                        }}
                        editPercentageDone={(text) => {
                            theHabit.percentage_done = text;
                            // this.setState({ selectedItem: theHabit })
                        }}
                        editCompleted={(text) => {
                            theHabit.completed = text;
                            // this.setState({ selectedItem: theHabit })
                        }}
                        editFinishedDate={(text) => {
                            theHabit.finished_date = text;
                            // this.setState({ selectedItem: theHabit })
                        }}
                        editTimeToSpend={(text) => {
                            theHabit.time_to_spend = text;
                            // this.setState({ selectedItem: theHabit })
                        }}
                        editNotificationTime={(times) => {
                            if (times) {
                                theHabit.notification_time = times
                            } else {
                                theHabit.notification_time = JSON.stringify(emptyTimes)
                            }
                            // this.setState({ selectedItem: theHabit })
                        }}
                        editNotes={(text) => {
                            theHabit.notes = text;
                            // this.setState({ selectedItem: theHabit })
                        }}
                        editRoutine={(text, name) => {
                            theHabit.routineName = name;
                            theHabit.routine = text;
                            // this.setState({ selectedItem: theHabit })
                        }}
                        editDaysToDo={(text) => {
                            theHabit.days_to_do = text;
                            // this.setState({ selectedItem: theHabit })
                        }}

                        save={() => { controller.saveExisting(this, 'habits', theHabit) }}

                        selectedItem={theHabit}

                        delete={() => {
                            // this.setState({ viewChildModalVisible: false })
                            // controller.delete(this, 'habits', theHabit);
                            // controller.loadAll(this, 'habits')
                            this.props.deleteItem(theHabit)
                            Database.deleteOne('habits', theHabit.id).then(() => {
                                controller.loadAll(this, 'habits')
                                this.setState({ viewChildModalVisible: false })
                                controller.loadAll(this, 'habits')
                            })
                        }}

                        closeModal={() => {
                            this.setState({ viewChildModalVisible: false })
                            this.fetch();
                        }}>
                    </ViewHabit>
                }
                if (this.props.childType == 'Tasks') {
                    theTask = this.state.selectedItem
                    console.warn(theTask)

                    // return <ViewTask
                    //     animationType="slide"
                    //     visible={this.state.viewModalVisible}
                    //     transparent={false}
                    //     editName={(text) => {
                    //         theTask.name = text;
                    //         this.setState({ selectedTask: theTask })
                    //     }}
                    //     editDueDate={(text) => {
                    //         theTask.due_date = text;
                    //         this.setState({ selectedTask: theTask })
                    //     }}
                    //     setImportanceNN={(text) => {
                    //         theTask.importance = 1;
                    //         this.setState({ selectedTask: theTask })
                    //     }}
                    //     setImportanceNU={(text) => {
                    //         theTask.importance = 2;
                    //         this.setState({ selectedTask: theTask })
                    //     }}
                    //     setImportanceIN={(text) => {
                    //         theTask.importance = 3;
                    //         this.setState({ selectedTask: theTask })
                    //     }}
                    //     setImportanceIU={(text) => {
                    //         theTask.importance = 4;
                    //         this.setState({ selectedTask: theTask })
                    //     }}
                    //     editPercentageDone={(text) => {
                    //         theTask.percentage_done = text;
                    //         this.setState({ selectedTask: theTask })
                    //     }}
                    //     editCompleted={(text) => {
                    //         theTask.completed = text;
                    //         this.setState({ selectedTask: theTask })
                    //     }}
                    //     editFinishedDate={(text) => {
                    //         theTask.finished_date = text;
                    //         this.setState({ selectedTask: theTask })
                    //     }}
                    //     editProject={(text, name) => {
                    //         theTask.projectName = name
                    //         theTask.project = text;
                    //         this.setState({ selectedTask: theTask })
                    //     }}
                    //     editTimeSpent={(text) => {
                    //         theTask.time_spent = text;
                    //         this.setState({ selectedTask: theTask })
                    //     }}
                    //     editNotes={(text) => {
                    //         theTask.notes = text;
                    //         this.setState({ selectedTask: theTask })
                    //     }}
                    //     editNotificationTime={(text) => {
                    //         if (text) {
                    //             theTask.notification_time = text
                    //             this.setState({ selectedTask: theTask })
                    //         }
                    //     }}

                    //     save={() => {
                    //         controller.saveExisting(this, dbTableName, theTask)
                    //     }}

                    //     selectedItem={theTask}

                    //     delete={() => { controller.delete(this, dbTableName, theTask) }}

                    //     closeModal={() => { controller.setViewModalVisible(this, false) }}>
                    // </ViewTask>
                }
            }
        }
    }

    render() {
        if (this.state.relatedChildren.length > 0) {
            return (
                <View style={{ flex: 1, borderWidth: 2, borderRadius: 20, borderColor: this.props.borderColor, marginRight: 5, marginLeft: 5, marginBottom: 10, }}>
                    {this.renderBottomSlidingPane()}
                    {this.showAddModal()}
                    {this.showViewModal()}
                    <ScrollView>
                        <View style={{}}>
                            <FlatList
                                horizontal={false}
                                scrollEnabled={true}
                                data={this.state.relatedChildren}
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
                                            this.goToItem(item)
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
                        buttonColor={this.props.addButtonColor}
                        onPress={() => {
                            console.warn("aweiofg")
                            this.setState({ addModalVisible: true })
                        }}
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, borderWidth: 2, borderRadius: 20, borderColor: this.props.borderColor, marginRight: 5, marginLeft: 5, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                    {this.showAddModal()}
                    <Text style={{ fontFamily: colorsProvider.font, color: this.props.borderColor }}>No {this.props.childType}</Text>
                    <ActionButton
                        size={45}
                        hideShadow={false}
                        offsetY={5}
                        offsetX={10}
                        buttonColor={colorsProvider.habitsMainColor}
                        onPress={() => {
                            console.warn("aweiofg")
                            this.setState({ addModalVisible: true })
                        }}
                    />
                </View>
            )
        }
    }
}