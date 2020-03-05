import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { CheckBox, colors } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback, SafeAreaView, Keyboard, TextInput } from 'react-native';
import { Database, Routines } from '../../db'
import { CreateRoutine, ViewRoutine } from '../../modals'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/Feather';
import { Notifier } from '../../notifier/notifier'

const notifier = new Notifier;


const styles = require('./styles');

var uuid = require('react-native-uuid');

const controller = new Controller;

const dbTableName = Routines.TABLE_NAME

export class RoutinesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalVisible: false,
            viewModalVisible: false,
            items: [],
            numberOfItems: 0,
            numberOfFinishedItems: 0,
            selectedItem: {}
        };
    }

    componentDidMount() {
        controller.loadAll(this, dbTableName)
        notifier.scheduleAllNotifications() 
    }

    saveNew(routine) {
        let newRoutine = {}
        newRoutine.id = routine.id;
        newRoutine.name = routine.name;
        newRoutine.created_date = new Date().getDate();
        newRoutine.start_time = routine.start_time ? routine.start_time : "";
        newRoutine.end_time = routine.end_time ? routine.end_time : "";
        newRoutine.notification_time = routine.notification_time ? routine.notification_time : "";
        Database.save(dbTableName, newRoutine).then(() => {
            controller.setAddModalVisible(this, false)
            controller.loadAll(this, dbTableName)
            notifier.scheduleAllNotifications() 
        })
    }

    showAddModal() {
        let newRoutine = {};
        if (this.state.addModalVisible) {
            return <CreateRoutine
                animationType="slide"
                transparent={false}
                id={(text) => { newRoutine.id = text}}
                name={(text) => { newRoutine.name = text }}
                start_time={(text) => { newRoutine.start_time = text }}
                end_time={(text) => { newRoutine.end_time = text }}
                notification_time={(text) => { 
                    if (text) {
                        var times = text.map(function (time) {
                            return JSON.stringify(time)
                        })
                        newRoutine.notification_time = times
                    }
                }}
                closeModal={() => { controller.setAddModalVisible(this, false) }}
                save={() => { this.saveNew(newRoutine) }}
            ></CreateRoutine>
        }
    }

    showViewRoutine() {
        if (this.state.viewModalVisible) {
            if (this.state.selectedItem != {}) {
                theRoutine = this.state.selectedItem
                return <ViewRoutine
                    animationType="slide"
                    transparent={false}
                    editName={(text) => {
                        theRoutine.name = text;
                        this.setState({ selectedRoutine: theRoutine })
                    }}
                    editStartTime={(text) => {
                        theRoutine.start_time = text;
                        this.setState({ selectedRoutine: theRoutine })
                    }}
                    editEndTime={(text) => {
                        theRoutine.end_time = text;
                        this.setState({ selectedRoutine: theRoutine })
                    }}
                    editCompleted={(text) => {
                        theRoutine.completed = text;
                        this.setState({ selectedRoutine: theRoutine })
                    }}
                    editNotificationTime={(text) => {
                        var times = text.map(function (time) {
                            return JSON.stringify(time)
                        })
                        theRoutine.notification_time = times
                        this.setState({ selectedRoutine: theRoutine })

                    }}


                    save={() => { controller.saveExisting(this, dbTableName, theRoutine) }}

                    selectedItem={theRoutine}

                    delete={() => { controller.delete(this, dbTableName, theRoutine) }}

                    closeModal={() => { controller.setViewModalVisible(this, false) }}>
                </ViewRoutine>
            }
        }
    }


    getChecked(item) {
        if (item != null)
            var checked = false
        return checked = item.value.completed === "true"
    }



    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={styles.outerView}>

                    {/* Modals Region */}
                    {this.showAddModal()}
                    {this.showViewRoutine()}

                    {/* /* #region Top Navigation Section  */}
                    <View style={styles.topNav}>
                        <View style={styles.centerTitleContainer}><Text style={styles.topNavLeftTitleText}>Routines</Text></View>
                        <Text style={styles.topNavCenterTitleText}>{this.state.numberOfItems}</Text>
                        <TouchableOpacity style={styles.addItemButtonContainer}
                            onPress={() => {
                                controller.setAddModalVisible(this, true);
                            }}>
                            <FIcon style={styles.addItemButtonText} name="plus" />
                        </TouchableOpacity>
                    </View>

                    {/* List Region */}
                    <FlatList
                        data={this.state.items}
                        renderItem={({ item }) =>
                            <View style={item.value.completed == 'true' ? styles.listItemContainerFinished : styles.listItemContainer}>
                                <View style={styles.checkboxAndNameContainer}>
                                    <CheckBox
                                        center
                                        checkedIcon='check-square'
                                        uncheckedIcon='check-square'
                                        checkedColor={colorsProvider.finishedBackgroundColor}
                                        uncheckedColor={colorsProvider.routinesComplimentaryColor}
                                        size={35}
                                        onPress={() => {
                                            item.value.completed = !this.getChecked(item)
                                            controller.saveExisting(this, dbTableName, item.value)
                                        }}
                                        checked={this.getChecked(item)}/>
                                    <View style={styles.listItemTextContainer}>
                                        <Text
                                            numberOfLines={1}
                                            multiline={false}
                                            style={styles.listItemText}>{item.value.name} </Text></View>
                                </View>
                                <View style={styles.listItemActionButtonsContainer}>
                                    <TouchableOpacity
                                        style={styles.listItemActionButton}
                                        onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }}>
                                        <SIcon style={styles.listItemActionButton} name="arrow-right" size={30} color={colorsProvider.shadowColor} />
                                    </TouchableOpacity>
                                </View>
                            </View>} />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}