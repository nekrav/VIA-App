import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import {
    Text,
    View,
    TouchableOpacity,
    Modal,
    TextInput,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'; // Version can be specified in package.json
import KeyboardListener from 'react-native-keyboard-listener';
import { SelectionModal } from '../selectionModal/selectionModal';
import { DateModal } from '../dateModal/dateModal';
import { NotesModal } from '../notesModal/notesModal';
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal';
import { Projects } from '../../db';
import { Controller } from '../controller';
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import Slider from '@react-native-community/slider';
import { TopBar, DoneSlider, CompleteButton, TrashButton, NotificationTimes, Notes } from '../../components'


import { Notifier } from '../../notifier/notifier'
const empty = ""
var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var year = new Date().getFullYear(); //Current Year
const timeDisplayFormat = 'hh:mm A'
const dateToday = new Date(year, month, date);

const notifier = new Notifier;
const controller = new Controller();
const dateFormat = 'dd/mm/yy'
const todayDate = new Date();
const styles = require('./styles');

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

export class CreateTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTask: this.props.newTask,
            projectSelectionModalVisible: false,
            items: [],
            theSelectedProject: '',
            itemDate: '',
            itemNotificationTimes: '',
            newTaskImportance: 0,
            notificationTimesModal: false,
            newTaskName: '',
            itemNotes: '',
            fromProjectID: this.props.fromProject ? this.props.fromProject : '',
            fromProjectName: this.props.fromProjectName ? this.props.fromProjectName : '',
            newTaskFromProject: {},
            proj: null,
            projName: null,
            showDate: false,
            dueDate: '',
            notificationTimes: "",
            notesModalVisible: false,
            notes: ""
        };
    }

    componentDidMount() {
        controller.loadAll(this, Projects.TABLE_NAME);
        if (this.state.fromProjectID) {
            this.state.newTaskFromProject.project = this.state.fromProjectID
            this.setState({ newTaskFromProject: this.state.newTaskFromProject })

        }

    }

    /* #region  Top Bar Region */
    renderTopBar() {
        return <TopBar
            fromCreate={true}
            nameOfItem={this.state.newTaskName}
            dueDate={this.state.dueDate}
            importance={this.state.newTaskImportance}
            parent={this.state.proj}
            parentName={this.state.projName}
            allParents={this.state.items}
            setParent={(id, name) => {
                this.props.project(id, name);
                this.setState({ projName: name, proj: id });
            }}
            removeParent={() => {
                this.props.project(null, null)
                this.setState({ projName: null, proj: null });
            }}
            closeModal={this.props.closeModal}
            editName={item => {
                this.setState({ newTaskName: item });
                this.props.name(item);
                this.state.newTaskFromProject.name = item;
                this.setState({ newTaskFromProject: this.state.newTaskFromProject })
            }}
            hasImportance={true}
            hasParent={true}
            editDueDate={() => {
                Keyboard.dismiss()
                this.setDateModalVisibility(true)
            }}
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
                this.setProjectSelectionModalVisibility(true);
            }}
            selectDueDate={date => {
                this.props.due_date(date);
                this.setState({ dueDate: date });
                this.state.newTaskFromProject.due_date = date
                this.setState({ newTaskFromProject: this.state.newTaskFromProject })
            }}
        />
    }
    /* #endregion */

    /* #region  Due Date Region */
    setDueDateModalVisibility(visible) {
        this.setState({ showDate: visible });
    }

    renderDueDateModal() {
        if (this.state.showDate) {
            return (
                <DateModal
                    pickerMode="date"
                    animationType="fade"
                    disabledSaveButtonBackgroundColor={colorsProvider.tasksComplimentaryColor}
                    saveButtonBackgroundColor={colorsProvider.tasksComplimentaryColor}
                    transparent={true}
                    setDate={item => {
                        this.props.due_date(item);
                        this.setState({ itemDate: item });
                        this.state.newTaskFromProject.due_date = item
                        this.setState({ newTaskFromProject: this.state.newTaskFromProject })

                    }}
                    onSubmit={item => {
                        this.props.due_date(item);
                        this.setState({ itemDate: item });
                        this.setDueDateModalVisibility(false);
                        this.state.newTaskFromProject.due_date = item
                        this.setState({ newTaskFromProject: this.state.newTaskFromProject })

                    }}
                    closeModal={() => {
                        this.setDueDateModalVisibility(false);
                    }}
                ></DateModal>
            );
        }
        return null;
    }

    renderDueDate() {
        if (this.state.itemDate != '') {
            return (
                <TouchableOpacity
                    style={styles.createDueDateContainer}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.setDueDateModalVisibility(true)
                    }}>
                    <Text style={styles.createSelectedDateText}>
                        {Moment(new Date(this.state.itemDate)).format(dateFormat)}
                    </Text>

                    <Text style={styles.createSelectedDateText}>
                        {Moment(new Date(this.state.itemDate)).diff({ todayDate }, 'days') +
                            ' days left'}
                    </Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity style={styles.createNameContainer} onPress={() => {
                Keyboard.dismiss()
                this.setDueDateModalVisibility(true)
            }}>
                <Text style={styles.createDateText}>
                    When do you want to finish this?
  </Text>
            </TouchableOpacity>
        );
    }
    /* #endregion */


    /* #region  Notification Times Region */
    renderNotificationTimes() {
        return (<NotificationTimes
            notificationTimes={this.state.notificationTimes}
            onPress={() => {
                this.setNotificationTimesVisibility(true);
            }}
            addNotificationTime={item => {
                // this.props.notification_time(item);
                this.setState({ notificationTimes: item })
                // this.props.save();
                // notifier.scheduleAllNotifications();
            }}
        />
        )
    }
    /* #endregion */

    /* #region  Notes Region */

    renderNotesSection() {
        return <Notes
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
                disabled={this.state.newTaskName != '' ? false : true}
                style={
                    this.state.newTaskName != ''
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
                            borderColor: colorsProvider.completeButtonColor,
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
                <Text style={this.state.newTaskName != '' ? styles.bottomButtonTextDisabled : styles.bottomButtonText}> Save</Text>
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

                        {/* {NOTIFICATION TIMES SECTION} */}
                        {this.renderNotificationTimes()}

                        {/* {NOTES SECTION} */}
                        {this.renderNotesSection()}

                        {/* {BOTTOM BUTTONS SECTION} */}
                        {this.renderBottomButtons()}

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}
