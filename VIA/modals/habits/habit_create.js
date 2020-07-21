import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'; // Version can be specified in package.json
import { Database, Routines, Tasks } from '../../db'
import { Controller } from '../controller'
import { TopBar, NotificationTimes, Notes, StartEndTime } from '../../components'

import { Notifier } from '../../notifier/notifier'
const controller = new Controller;
const dateFormat = 'hh:mm A'
const todayDate = new Date();
const styles = require('./styles');
var uuid = require('react-native-uuid');

const empty = ""
var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var year = new Date().getFullYear(); //Current Year
const timeDisplayFormat = 'hh:mm A'
const dateToday = new Date(year, month, date);

const notifier = new Notifier;

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

export class CreateHabit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allPossibleParents: [],
            name: '',
            routine: this.props.parentId ? this.props.parentId : null,
            routineName: this.props.parentName ? this.props.parentName : null,
            importance: 0,
            startTime: '',
            endTime: '',
            notificationTimes: "",
            notes: "",
            fromRoutineID: this.props.fromRoutine ? this.props.fromRoutine : '',
            fromRoutineName: this.props.fromRoutineName ? this.props.fromRoutineName : '',
            newHabitFromRoutine: {},
        };
    }

    getFromRoutine(routineID) {
        if (routineID) {
            Database.getOne(Routines.TABLE_NAME, routineID).then((res) => {
                this.setState({ routineID: res.rows.item(0), routineName: res.rows.item(0).name })
            })
        }
    }


    componentDidMount() {
        this.getFromRoutine(this.props.fromRoutine)
        controller.getParents(this, Routines.TABLE_NAME);
    }

    /* #region  Top Bar Region */
    renderTopBar() {
        console.warn(this.state.routineName)
        return <TopBar
            color={colorsProvider.habitsMainColor}
            parentColor={colorsProvider.routinesMainColor}
            fromCreate={true}
            nameOfItem={this.state.name}
            hasDueDate={false}
            dueDate={this.state.dueDate}
            importance={this.state.importance}
            parentType={"routine"}
            parent={this.state.routine}
            parentName={this.state.routineName}
            allParents={this.state.allPossibleParents}
            setParent={(id, name) => {
                this.props.routine(id, name);
                this.setState({ routineName: name, routine: id });
            }}
            removeParent={() => {
                this.props.routine(null, null)
                this.setState({ routineName: null, routine: null });
            }}
            closeModal={this.props.closeModal}
            editName={item => {
                this.setState({ name: item });
                this.props.name(item);
                this.state.newHabitFromRoutine.name = item;
                this.setState({ newHabitFromRoutine: this.state.newHabitFromRoutine })
            }}
            hasImportance={true}
            hasParent={true}
            setImportanceNN={() => {
                Keyboard.dismiss()
                this.props.setImportanceNN(1)
            }}
            setImportanceNU={() => {
                Keyboard.dismiss()
                this.props.setImportanceNU(2)
            }}
            setImportanceIN={() => {
                Keyboard.dismiss()
                this.props.setImportanceIN(3)
            }}
            setImportanceIU={() => {
                Keyboard.dismiss()
                this.props.setImportanceIU(4)
            }}
            selectParent={() => {
                Keyboard.dismiss();
            }}
            selectDueDate={date => {
            }}
        />
    }
    /* #endregion */

    /* #region  StartEndTime */
    renderStartEndTime() {
        return (<StartEndTime
            startTime={this.state.startTime}
            endTime={this.state.endTime}
            color={colorsProvider.habitsMainColor}
            setStartTime={item => {
                this.props.start_time(item);
                this.setState({ startTime: item });
            }}
            setEndTime={item => {
                this.props.end_time(item);
                this.setState({ endTime: item });
            }}
        />)

    }

    /* #endregion */

    /* #region  Notification Times Region */
    renderNotificationTimes() {
        return (<NotificationTimes
            color={colorsProvider.habitsMainColor}
            notificationTimes={this.state.notificationTimes}
            addNotificationTime={item => {
                this.setState({ notificationTimes: item })
            }}
        />
        )
    }
    /* #endregion */

    /* #region  Notes Region */
    renderNotesSection() {
        return <Notes
            color={colorsProvider.habitsMainColor}
            notes={this.state.notes}
            editNotes={value => {
                this.props.notes(value);
            }} />
    }
    /* #endregion */

    /* #region  Bottom Buttons Section */
    renderBottomButtons() {
        return (<View style={{
            // paddingTop: 18,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 50,
        }}>
            <TouchableOpacity
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 20,
                    backgroundColor: colorsProvider.closeButtonColor
                }}
                onPress={this.props.closeModal}>
                <Text style={{
                    fontSize: 18,
                    textAlign: 'center',
                    fontFamily: colorsProvider.font,
                    color: colorsProvider.whiteColor,
                    margin: 10,
                }}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                disabled={this.state.name != '' ? false : true}
                style={
                    this.state.name != ''
                        ? {
                            flex: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            borderRadius: 20,
                            borderWidth: 2,
                            borderColor: colorsProvider.setButtonColor,
                            backgroundColor: colorsProvider.completeButtonColor
                        }
                        : {
                            flex: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            borderWidth: 2,
                            borderRadius: 20,
                            borderColor: colorsProvider.completeButtonColor,
                        }
                }
                onPress={() => {
                    notifier.scheduleAllNotifications();
                    this.props.notification_time(this.state.notificationTimes);

                    if (this.props.fromProject)
                        this.props.saveFromProject(this.state.newTaskFromProject)
                    else
                        this.props.save()
                }}>
                <Text style={this.state.name != '' ? {
                    fontSize: colorsProvider.fontButtonSize,
                    textAlign: 'center',
                    fontFamily: colorsProvider.font,
                    color: colorsProvider.homeTextColor,
                } : {
                        fontSize: colorsProvider.fontButtonSize,
                        textAlign: 'center',
                        fontFamily: colorsProvider.font,
                        color: colorsProvider.homeTextColor,
                    }}> Save</Text>
            </TouchableOpacity>
        </View>)
    }
    /* #endregion */

    render() {
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={this.props.transparent}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.outerView}>
                        {this.renderTopBar()}

                        {this.renderStartEndTime()}

                        {this.renderNotificationTimes()}

                        {this.renderNotesSection()}

                        {this.renderBottomButtons()}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}