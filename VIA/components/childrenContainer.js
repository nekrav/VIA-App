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
import { CreateHabit, ViewHabit } from '../modals'
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
            allChildren: this.props.allChildren,
            addModalVisible: false,
            viewChildModalVisible: false,
            selectedChild: '',
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps != null)
            this.setState({ allChildren: this.props.allChildren });
    }

    deleteItem(item) {
        var array = this.state.allChildren
        var index = array.indexOf(item)
        this.state.allChildren.splice(index, 1)

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

        // parentTypeCapitalized = this.props.parentType.charAt(0).toUpperCase() + this.props.parentType.slice(1)

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
                data={this.state.allChildren}
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

    renderParentText() {
        if (this.state.name == null || this.state.name == "null") {
            return (
                <TouchableOpacity
                    style={{ marginLeft: "14%", flexDirection: 'row', marginBottom: '3%' }}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.RBSheet.open()
                    }}>
                    <Text style={{ marginRight: 5 }}>
                        <SIcon name="layers" size={20} color={colorsProvider.whiteColor} />
                    </Text>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>
                        Is this part of a bigger ?
                    </Text>

                </TouchableOpacity>
            );
        }
        else if (this.state.name != "") {
            return (
                <TouchableOpacity
                    style={{ marginLeft: "14%", flexDirection: 'row', marginBottom: '3%' }}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.RBSheet.open()
                    }}>
                    <Text style={{ marginRight: 5 }}>
                        <SIcon name="layers" size={20} color={colorsProvider.whiteColor} />
                    </Text>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>
                        {this.state.name}
                    </Text>

                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={{ marginLeft: "14%", flexDirection: 'row', marginBottom: '3%' }}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.RBSheet.open()
                    }}>
                    <Text style={{ marginRight: 5 }}>
                        <SIcon name="layers" size={20} color={colorsProvider.whiteColor} />
                    </Text>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>Is this part of a bigger ?
          </Text>
                </TouchableOpacity>
            );
        }
    }

    saveNew(habit) {
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
            // controller.setAddModalVisible(this, false)
            this.setState({ addModalVisible: false })
            controller.loadAll(this, 'habits')
            // notifier.scheduleAllNotifications()
        })
    }

    showAddModal() {
        let newHabit = {};
        if (this.state.addModalVisible) {
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
                    this.saveNew(newHabit)
                }}
            ></CreateHabit>
        }
    }

    showViewModal() {
        if (this.state.viewChildModalVisible) {
            if (this.state.selectedChild) {
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

                        save={() => {controller.saveExisting(this, 'habits', theHabit) }}

                        selectedItem={theHabit}

                        delete={() => { controller.delete(this, 'habits', theHabit) }}

                        closeModal={() => { this.setState({viewChildModalVisible: false})}}>
                    </ViewHabit>
            }
        }
    }

    render() {
        if (this.state.allChildren.length > 0) {
            return (
                <View style={{ flex: 1, borderWidth: 2, borderRadius: 20, borderColor: this.props.borderColor, marginRight: 5, marginLeft: 5, marginBottom: 10, }}>
                    {this.renderBottomSlidingPane()}
                    {this.showAddModal()}
                    {this.showViewModal()}
                    <ScrollView >
                        <View style={{}}>
                            <FlatList
                                horizontal={false}
                                scrollEnabled={true}
                                data={this.state.allChildren}
                                style={{ flex: 1 }}
                                renderItem={({ item }) => {
                                    return <ChildItem
                                        itemKey={item.value.id}
                                        name={item.value.name}
                                        item={item.value}
                                        completed={item.value.completed}
                                        childItemTableName={this.props.childItemTableName}
                                        deleteItem={item => {
                                            this.props.deleteItem(item)
                                        }}
                                        childUpdateCompleted={item => {
                                            // var index = this.state.allChildren.indexOf(item)
                                            // if (index !== -1) {
                                            //     var oldArr = this.state.allChildren
                                            //     oldArr.splice(index, 1)
                                            //     this.setState({ allChildren: oldArr })
                                            // }
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
                        buttonColor={colorsProvider.habitsMainColor}
                        onPress={() => {
                            this.setState({ addModalVisible: true })
                            // this.RBSheet.open()
                        }}
                    />
                </View>
            )
        } else {
            return (<Text>No Children</Text>)
            // return (
            //     // <ScrollView style={{ flex: 1, borderWidth: 2, borderRadius: 20, borderColor: this.props.borderColor, marginRight: 5, marginLeft: 5, }}>
            //     <TouchableWithoutFeedback onPress={() => { }}>

            //         <FlatList
            //             horizontal={false}
            //             scrollEnabled={true}
            //             data={this.state.allChildren}
            //             contentContainerStyle={{  borderWidth: 1, borderColor: colorsProvider.habitsMainColor, borderRadius: 10,  marginLeft: 2, marginRight: 2, marginBottom: 3, marginTop: 10, }}
            //             renderItem={({ item }) => { return <TouchableOpacity style={{flex: 1, backgroundColor: colorsProvider.habitsMainColor, margin: 10, }}><Text>{item.value.name}</Text></TouchableOpacity> }}
            //         />
            //     {/* // </ScrollView> */}
            //     </TouchableWithoutFeedback>
            // )
        }

    }
}