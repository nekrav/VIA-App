import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { CheckBox } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback, SafeAreaView, Keyboard, TextInput } from 'react-native';
import { Database, Routines } from '../../db'
import { CreateRoutine, ViewRoutine } from '../../modals'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/Feather';
import NotifService from '../../notifier/newNotifier';
import ActionButton from 'react-native-action-button';
import { ListTopBar } from '../../components'





const styles = require('./styles');

var uuid = require('react-native-uuid');

const controller = new Controller;

const dbTableName = Routines.TABLE_NAME

export class RoutinesScreen extends React.Component {
    constructor(props) {
        super(props);
        global.notifier = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
          );
        global.notifier = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
          );
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
        const { navigation } = this.props;

        this.focusListener = navigation.addListener('didFocus', () => {
            controller.loadAll(this, dbTableName)
            this.setState({ count: 0 });
        });

        controller.loadAll(this, dbTableName)
        global.notifier.scheduleAllNotifications()
    }
    componentWillUnmount() {
        this.focusListener.remove();
        clearTimeout(this.t);
    }


    onRegister(token) {
        this.setState({registerToken: token.token, fcmRegistered: true});
      }
    
      onNotif(notif) {
        //Alert.alert(notif.title, notif.message);
      }
    
      handlePerm(perms) {
        //Alert.alert('Permissions', JSON.stringify(perms));
      }


    saveNew(routine) {
        let newRoutine = {}
        newRoutine.id = uuid.v4();
        newRoutine.name = routine.name;
        newRoutine.created_date = global.todayDate.toString();
        newRoutine.importance = routine.importance ? routine.importance : "";
        newRoutine.start_time = routine.start_time ? routine.start_time : "";
        newRoutine.end_time = routine.end_time ? routine.end_time : "";
        newRoutine.notification_time = routine.notification_time ? routine.notification_time : "";
        newRoutine.notes = routine.notes ? routine.notes : "";
        newRoutine.properties = routine.properties ? routine.properties : JSON.stringify({ specificNotificationDates: [] })
        Database.save(dbTableName, newRoutine).then(() => {
            controller.setAddModalVisible(this, false)
            controller.loadAll(this, dbTableName)
            global.notifier.scheduleAllNotifications()
        })
    }

    /* #region  Top Bar Region */
    renderTopBar() {
        return <ListTopBar
            typeOfItem={"Routines"}
            numberOfItems={this.state.numberOfItems}
            numberOfCompletedItems={this.state.numberOfFinishedItems}
            color={colorsProvider.routinesMainColor}
            secondaryColor={colorsProvider.routinesComplimentaryColor}
            onAddPress={() => {
                controller.setAddModalVisible(this, true);
            }}
        />
    }
    /* #endregion */

    showAddModal() {
        let newRoutine = {};
        if (this.state.addModalVisible) {
            return <CreateRoutine
                animationType="slide"
                transparent={false}
                id={(text) => { newRoutine.id = text }}
                name={(text) => { newRoutine.name = text }}
                setImportanceNN={(text) => {
                    newRoutine.importance = 1;
                }}
                setImportanceNU={(text) => {
                    newRoutine.importance = 2;
                }}
                setImportanceIN={(text) => {
                    newRoutine.importance = 3;
                }}
                setImportanceIU={(text) => {
                    newRoutine.importance = 4;
                }}
                start_time={(text) => { newRoutine.start_time = text }}
                end_time={(text) => { newRoutine.end_time = text }}
                notes={(text) => { newRoutine.notes = text }}
                notification_time={(times) => {
                    if (times) {
                        newRoutine.notification_time = times
                    } else {
                        newRoutine.notification_time = JSON.stringify(global.emptyTimes)
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
                    setImportanceNN={(text) => {
                        theRoutine.importance = 1;
                        this.setState({ selectedRoutine: theRoutine })
                    }}
                    setImportanceNU={(text) => {
                        theRoutine.importance = 2;
                        this.setState({ selectedRoutine: theRoutine })
                    }}
                    setImportanceIN={(text) => {
                        theRoutine.importance = 3;
                        this.setState({ selectedRoutine: theRoutine })
                    }}
                    setImportanceIU={(text) => {
                        theRoutine.importance = 4;
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
                    editFinishedDate={(text) => {
                        theRoutine.finished_date = text;
                        this.setState({ selectedRoutine: theRoutine })
                    }}
                    editNotes={(text) => {
                        theRoutine.notes = text;
                        this.setState({ selectedRoutine: theRoutine })
                    }}
                    editNotificationTime={(times) => {
                        if (times) {
                            theRoutine.notification_time = times
                        } else {
                            theRoutine.notification_time = JSON.stringify(global.emptyTimes)
                        }
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
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>

                    {/* Modals Region */}
                    {this.showAddModal()}
                    {this.showViewRoutine()}

                    {/* /* #region Top Navigation Section  */}
                    {/* <View style={styles.topNav}>
                        <View style={styles.centerTitleContainer}><Text style={styles.topNavLeftTitleText}>Routines</Text></View>
                        <Text style={styles.topNavCenterTitleText}>{this.state.numberOfItems}</Text>
                        <TouchableOpacity style={styles.addItemButtonContainer}
                            onPress={() => {
                                controller.setAddModalVisible(this, true);
                            }}>
                            <FIcon style={styles.addItemButtonText} name="plus" />
                        </TouchableOpacity>
                    </View> */}

                    {this.renderTopBar()}
                    {/* List Region */}
                    <FlatList
                        data={this.state.items}
                        renderItem={({ item }) =>
                            <TouchableWithoutFeedback onPress={() => { }}>
                                <TouchableOpacity onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }} style={item.value.completed == 'true' ? styles.listItemContainerFinished : styles.listItemContainer}>
                                    <View style={styles.checkboxAndNameContainer}>
                                        <CheckBox
                                            center
                                            checkedIcon={colorsProvider.checkboxIcon}
                                            uncheckedIcon={colorsProvider.checkboxIcon}
                                            checkedColor={colorsProvider.finishedBackgroundColor}
                                            uncheckedColor={colorsProvider.routinesComplimentaryColor}
                                            containerStyle={colorsProvider.checkboxContainerStyle}
                                            size={colorsProvider.checkboxIconSize}
                                            onPress={() => {
                                                item.value.completed = !this.getChecked(item)
                                                if (item.value.completed == true) {
                                                    item.value.finished_date = new Date(Date.now())
                                                } else {
                                                    item.value.finished_date == ""
                                                }
                                                controller.saveExisting(this, dbTableName, item.value)
                                            }}
                                            checked={this.getChecked(item)} />
                                        <View style={styles.listItemTextContainer}>
                                            <Text
                                                numberOfLines={1}
                                                multiline={false}
                                                style={{
                                                    color: colorsProvider.whiteColor,
                                                    fontFamily: colorsProvider.font,
                                                    fontSize: colorsProvider.fontSizeChildren,
                                                }}>{item.value.name} </Text></View>
                                    </View>
                                    <View style={styles.listItemActionButtonsContainer}>
                                        <TouchableOpacity
                                            style={{
                                                color: colorsProvider.whiteColor,
                                                fontFamily: colorsProvider.font,
                                                fontSize: colorsProvider.fontSizeChildren,
                                            }}
                                            onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }}>
                                            <SIcon style={styles.listItemActionButton} name="arrow-right" size={30} color={colorsProvider.whiteColor} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity></TouchableWithoutFeedback>} />
                    <ActionButton
                        size={65}
                        hideShadow={false}
                        offsetY={10}
                        offsetX={10}
                        buttonColor={colorsProvider.routinesMainColor}
                        onPress={() => {
                            controller.setAddModalVisible(this, true);
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}