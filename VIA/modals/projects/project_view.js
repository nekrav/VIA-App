import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, StatusBar, FlatList } from 'react-native';
import { Controller } from '../controller';
import { CheckBox } from 'react-native-elements'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { ViewTask, CreateTask } from '../'
import { PlusButton } from '../../components/plusButton'
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal';
import { Database, Projects, Tasks } from '../../db'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Slider from '@react-native-community/slider';
import Modal from "react-native-modal";
import Moment from 'moment';
import { Notifier } from '../../notifier/notifier'
var uuid = require('react-native-uuid');

const notifier = new Notifier;

const controller = new Controller;

const styles = require('./styles');

const empty = ""
const todayDate = new Date();
const dateDisplayFormat = 'MMM Do'
const dateFormat = 'ddd, MMM Do, YY'
const childTableName = Tasks.TABLE_NAME



export class ViewProject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: this.props.selectedItem,
            items: [],
            proj: null,
            importance: this.props.selectedItem.importance,
            showDate: false,
            dueDate: '',
            notificationTimesModal: false,
            percentVal: this.props.selectedItem.percentage_done,
            importanceVal: this.props.selectedItem.importance,
            notesModalVisible: false,
            itemNotificationTimes: this.props.selectedItem.notification_time,
            childModalVisibility: false,
            selectedChildItem: '',
            relatedChildren: [],
            tasksCreateModalVisible: false,
        };
    }

    componentDidMount() {
        controller.loadAllChildrenAndGetRelatedChildren(this, Tasks.TABLE_NAME, this.state.selectedItem.id, "project");
    }


    getStyleIfDone() {
        if (this.props.selectedItem.completed == "true") {
            return styles.outerViewDone
        }
        return styles.outerView;
    }

    finishTask() {
        this.setState({ selectedItem })
        this.props.editCompleted("true")
    }


    /* #region  Top Bar Region */
    renderTopBar() {
        return (<View style={styles.topNav}>
            <TouchableOpacity style={styles.topNavBackButton}
                onPress={this.props.closeModal}>
                <SIcon name="arrow-left" size={30} color={colorsProvider.shadowColor} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.trashButton}
                onPress={() => {
                    notifier.scheduleAllNotifications();
                    this.props.delete()
                }}>
                <SIcon name="trash" size={30} color={colorsProvider.redColor} />
            </TouchableOpacity>
        </View>)
    }
    /* #endregion */

    /* #region  Name Region */
    renderNameSection() {
        return (<TouchableOpacity
            onPress={() => { this.nameTextInput.focus(); }}
            style={this.state.selectedItem.name != "" ? styles.hasNameTextInputContainer : styles.createNameContainer}>
            <TextInput
                ref={(input) => { this.nameTextInput = input; }}
                maxLength={40}
                onEndEditing={this.props.save()}
                style={styles.createNameText}
                multiline={true}
                value={this.props.selectedItem.name}
                onChangeText={this.props.editName}>
            </TextInput>
        </TouchableOpacity>)
    }

    /* #endregion */

    /* #region  Due Date Region */
    setDateModalVisibility(visible) {
        this.setState({ showDate: visible })
    }


    renderShowDate() {
        if (this.state.showDate) {
            return <DateModal
                animationType="fade"
                itemDate={this.props.selectedItem.due_date ? this.props.selectedItem.due_date : empty}
                itemName="Project"
                transparent={true}
                disabledSaveButtonBackgroundColor={colorsProvider.projectsMainColor}
                saveButtonBackgroundColor={colorsProvider.projectsMainColor}
                setDate={(item) => {
                    this.props.editDueDate(item)
                    this.setState({ dueDate: item })
                    this.props.save();
                }}
                onSubmit={item => {
                    this.props.editDueDate(item);
                    this.setState({ dueDate: item });
                    this.setDateModalVisibility(false);
                }}
                closeModal={() => { this.setDateModalVisibility(false) }}>
            </DateModal>
        }
        return null;
    }

    renderDueDate() {
        if (this.state.selectedItem.due_date != '') {
            return (
                <TouchableOpacity
                    style={styles.createDueDateContainer}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.setDateModalVisibility(true)
                    }}>
                    <Text style={styles.createSelectedDateText}>
                        {Moment(new Date(this.props.selectedItem.due_date)).format(dateFormat)}
                    </Text>

                    <Text style={styles.createSelectedDateText}>
                        {Moment(new Date(this.props.selectedItem.due_date)).diff({ todayDate }, 'days') +
                            ' days left'}
                    </Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity style={styles.createNameContainer} onPress={() => {
                Keyboard.dismiss()
                this.setDateModalVisibility(true)
            }}>
                <Text style={styles.createDateText}>
                    When do you want to finish this?
              </Text>
            </TouchableOpacity>
        );
    }


    /* #endregion */

    /* #region  Task Selection Region */

    setChildItemModalVisibility(visible) {
        this.setState({ childModalVisibility: visible })

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
        newTask.time_spent = 0;
        newTask.notes = task.notes ? task.notes : "";
        newTask.notification_time = task.notification_time ? task.notification_time : ''
        Database.save(childTableName, newTask).then(() => {
            this.setCreateTaskModalVisibility(false)
            // controller.setAddModalVisible(this, false)
            controller.loadAll(this, childTableName)
            controller.loadAllChildrenAndGetRelatedChildren(this, childTableName, this.state.selectedItem.id, "project");
            notifier.scheduleAllNotifications()
        })
    }

    showTaskAddModal() {
        let newTask = {};
        if (this.state.tasksCreateModalVisible) {
            return <CreateTask
                animationType="slide"
                transparent={false}
                name={(text) => { newTask.name = text }}
                due_date={(text) => {
                    newTask.due_date = text
                }}
                importance={(text) => { newTask.importance = text }}
                project={(text) => { newTask.project = text }}
                time_spent={(text) => { newTask.time_spent = text }}
                notes={(text) => { newTask.notes = text }}
                notification_time={(text) => {
                    if (text) {
                        var times = text.map(function (time) {
                            return JSON.stringify(time)
                        })
                        newTask.notification_time = times
                    }
                }}
                fromProject={this.props.selectedItem.id}
                fromProjectName={this.props.selectedItem.name}
                closeModal={() => {
                    this.setCreateTaskModalVisibility(false)
                    controller.setAddModalVisible(this, false)
                }}
                save={() => {
                    this.saveNewTask(newTask)
                }}
                saveFromProject={newTaskFromProject => {
                    this.saveNewTask(newTaskFromProject)
                }}
            ></CreateTask>
        }
    }

    renderChildItemModal() {
        if (this.state.childModalVisibility) {
            if (this.state.selectedChildItem != '') {
                theTask = this.state.selectedChildItem
                return <ViewTask
                    animationType="slide"
                    transparent={false}
                    visible={this.state.childModalVisibility}
                    editName={(text) => {
                        theTask.name = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editDueDate={(text) => {
                        theTask.due_date = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editImportance={(text) => {
                        theTask.importance = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editPercentageDone={(text) => {
                        theTask.percentage_done = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editCompleted={(text) => {
                        theTask.completed = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editProject={(text) => {
                        theTask.project = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editTimeSpent={(text) => {
                        theTask.time_spent = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editNotes={(text) => {
                        theTask.notes = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editNotificationTime={(text) => {
                        if (text) {
                            var times = text.map(function (time) {
                                return JSON.stringify(time)
                            })
                            theTask.notification_time = times
                            this.setState({ selectedTask: theTask })
                        }
                    }}

                    save={() => { controller.saveExisting(this, childTableName, theTask) }}

                    selectedItem={theTask}

                    delete={() => {
                        controller.delete(this, childTableName, theTask)
                        controller.loadAllChildrenAndGetRelatedChildren(this, Tasks.TABLE_NAME, this.state.selectedItem.id, "project")
                        this.setCreateTaskModalVisibility(false)
                    }}

                    closeModal={() => { this.setCreateTaskModalVisibility(false) }}>
                </ViewTask>
            }
        }
    }

    setCreateTaskModalVisibility(visible) {
        this.setState({ tasksCreateModalVisible: visible })
    }

    renderSelectedTasksString() {
        var tasksString = "";
        if (this.state.items.length > 0) {
            for (var i = 0; i < this.state.tasks.length; i++) {
                tasksString = tasksString.concat(this.state.items[i].value.name + ", ")
            }
        }
        return tasksString;
    }

    saveProjectInSelectedTask(projectID) {
        if (this.state.tasks.length > 0) {
            for (var i = 0; i < this.state.tasks.length; i++) {
                this.state.tasks[i].item.value.routine = projectID
                Database.update(Tasks.TABLE_NAME, this.state.tasks[i].item.value).then(() => {
                    controller.loadAll(this, Tasks.TABLE_NAME);
                    notifier.scheduleAllNotifications()
                })
            }
        }
    }

    getChecked(item) {
        if (item != null)
            return checked = item.value.completed === "true"
    }

    renderAllChildrenSection() {
        if (this.state.relatedChildren.length > 0) {
            return (
                <View style={styles.childrenItemsContainer}>
                    <View style={styles.childrenItemsTitleContainer}>
                        <View style={styles.childrenItemsTitleTextContainer}>
                            <Text numberOfLines={1} style={styles.childrenItemsTitleText}>
                                Tasks in {this.state.selectedItem.name}
                            </Text>
                        </View>
                    </View>
                    <FlatList
                        data={this.state.relatedChildren}
                        extraData={this.state}
                        contentContainerStyle={styles.childrenContainer}
                        renderItem={({ item }) =>
                            <TouchableWithoutFeedback onPress={() => { }}>
                                <TouchableOpacity style={styles.childContainer}
                                    onPress={() => {
                                        Keyboard.dismiss()
                                        this.setState({ selectedChildItem: item.value }, () => {
                                            this.setChildItemModalVisibility(true)
                                        })
                                    }}>
                                    <View style={styles.childTitleContainer}>
                                        <CheckBox
                                            center
                                            checkedIcon={colorsProvider.checkboxIcon}
                                            uncheckedIcon={colorsProvider.checkboxIcon}
                                            containerStyle={colorsProvider.checkboxContainerStyle}
                                            checkedColor={colorsProvider.finishedBackgroundColor}
                                            checkedColor={colorsProvider.finishedBackgroundColor}
                                            uncheckedColor={colorsProvider.tasksPlaceholderColor}
                                            size={25}
                                            onPress={() => {
                                                item.value.completed = !this.getChecked(item)
                                                if (item.value.completed == true) {
                                                    item.value.finished_date = new Date(Date.now())
                                                } else {
                                                    item.value.finished_date == ""
                                                }
                                                controller.saveExisting(this, Tasks.TABLE_NAME, item.value)
                                                controller.loadAllChildrenAndGetRelatedChildren(this, Tasks.TABLE_NAME, this.state.selectedItem.id, "project")
                                                controller.loadAll(this, Tasks.TABLE_NAME)
                                            }}
                                            checked={this.getChecked(item)} />
                                        <Text
                                            numberOfLines={1}
                                            multiline={false}
                                            style={styles.childTitleText}>{item.value.name} </Text>
                                    </View>
                                    <View style={styles.childActionButtonsContainer}>
                                        {/* <TouchableOpacity style={styles.childActionButtonsContainer}> */}
                                        {/* <TouchableOpacity
                                            style={styles.childActionButton}
                                            onPress={() => {
                                                controller.delete(this, childTableName, item.value)
                                                controller.loadAllChildrenAndGetRelatedChildren(this, Tasks.TABLE_NAME, this.state.selectedItem.id, "project")
                                                notifier.scheduleAllNotifications();
                                            }}>
                                            <SIcon style={styles.childActionButtonText} name="trash" size={30} color={colorsProvider.redColor} />
                                        </TouchableOpacity> */}

                                        <TouchableOpacity
                                            style={styles.childActionButton}
                                            onPress={() => {
                                                this.setChildItemModalVisibility(true)
                                                this.setState({ selectedChildItem: item.value }, () => {
                                                    this.setChildItemModalVisibility(true)
                                                })
                                            }}>
                                            <SIcon style={styles.childActionButtonText} color={colorsProvider.tasksComplimentaryColor} name="arrow-right" size={30} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </TouchableWithoutFeedback>

                        } />
                    <View style={{ alignItems: 'center', marginTop: 5, marginBottom: 10 }}>
                        <PlusButton action={() => {
                            this.setCreateTaskModalVisibility(true)
                        }} />
                        {/* <TouchableOpacity style={styles.addTimeButtonContainer}
                            onPress={() => {
                                this.setCreateTaskModalVisibility(true)
                            }}>
                            <View style={styles.addTimeButtonContainerView}>
                                <SIcon style={{ marginLeft: 10, }} name="plus" size={16} color={colorsProvider.shadowColor} />
                                <Text style={styles.addTimeButtonText}> Add Task</Text>
                            </View>
                        </TouchableOpacity> */}
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.childrenItemsContainer}>
                    <View style={styles.childrenItemsTitleContainer}>
                        <Text style={styles.childrenItemsTitleText}>
                            Tasks in {this.state.selectedItem.name}
                        </Text>

                    </View>

                    {/* <TouchableOpacity style={styles.createProjectSelectionContainer} onPress={this.setTaskSelectionModalVisibility.bind(this)}> */}
                    <Text style={styles.createProjectSelectionButtonText}>You don't have any tasks here</Text>
                    <TouchableOpacity style={styles.addTimeButtonContainerView}
                        onPress={() => {
                            this.setCreateTaskModalVisibility(true)
                        }}>
                        <SIcon style={{ marginLeft: 10, }} name="plus" size={16} color={colorsProvider.shadowColor} />
                        {/* <Text style={styles.addTimeButtonText}> Add Task</Text> */}
                    </TouchableOpacity>

                    {/* <View style={{ alignItems: 'center', marginTop: 5, marginBottom: 10 }}>
                        <TouchableOpacity style={styles.addTimeButtonContainer}
                            onPress={() => {
                                this.setCreateTaskModalVisibility(true)
                            }}>
                            <View style={styles.addTimeButtonContainerView}>
                                <SIcon style={{ marginLeft: 10, }} name="plus" size={16} color={colorsProvider.shadowColor} />
                                <Text style={styles.addTimeButtonText}> Add Task</Text>
                            </View>
                        </TouchableOpacity>
                    </View> */}
                </View>
            );
        }
    }
    /* #endregion */

    /* #region  Slider Region */
    renderSliderSection() {
        return (
            <View style={styles.slidersSection}>
                <View style={styles.slidersTitlesContainer}>
                    <View style={styles.sliderTitleContainer}>
                        <Text
                            style={
                                this.state.percentVal > 0
                                    ? styles.sliderTitle
                                    : styles.sliderTitleNull}>
                            % Done
                        </Text>
                    </View>
                    <View style={styles.sliderContainerLeft}>
                        <Slider
                            style={{ width: 350, height: 1, marginRight: 10, marginLeft: 10 }}
                            minimumValue={0}
                            maximumValue={100}
                            thumbTintColor={this.state.percentVal > 0 ? colorsProvider.projectsComplimentaryColor : colorsProvider.projectsPlaceholderColor}
                            minimumTrackTintColor={colorsProvider.projectsComplimentaryColor}
                            maximumTrackTintColor={colorsProvider.projectsPlaceholderColor}
                            value={parseInt(this.state.percentVal)}
                            onSlidingComplete={(value) => {
                                this.props.editPercentageDone(value)
                                if (value == 100) {
                                    this.finishTask();
                                }
                                this.props.save();
                            }}
                            onValueChange={(value) => {
                                Keyboard.dismiss()
                                this.props.editPercentageDone(value);
                            }}
                        />

                    </View>
                </View>
                <View style={styles.slidersTitlesContainer}>
                    <View style={styles.sliderTitleContainer}>
                        <Text
                            style={
                                this.state.selectedItem.importance > 0
                                    ? styles.sliderTitle
                                    : styles.sliderTitleNull}>
                            Importance
                        </Text>
                    </View>
                    <View style={styles.sliderContainerLeft}>
                        <Slider
                            style={{ width: 350, height: 1, marginRight: 10, marginLeft: 10 }}
                            minimumValue={0}
                            maximumValue={100}
                            thumbTintColor={this.state.selectedItem.importance > 0 ? colorsProvider.projectsComplimentaryColor : colorsProvider.projectsPlaceholderColor}
                            minimumTrackTintColor={colorsProvider.projectsComplimentaryColor}
                            maximumTrackTintColor={colorsProvider.projectsPlaceholderColor}
                            value={parseInt(this.state.importanceVal)}
                            onValueChange={(value) => {
                                Keyboard.dismiss()
                                this.props.save;
                                this.props.editImportance(value);
                            }}
                            onSlidingComplete={(value) => {
                                this.props.editImportance(value)
                            }}
                        />

                    </View>
                </View>
            </View>
        )

    }

    /* #endregion */

    /* #region  Complete Button Section */

    renderCompleteButton() {
        // return (<TouchableOpacity
        //     style={styles.completeButtonBody}
        //     onLongPress={() => {
        //         this.setState({ percentVal: 0 })
        //         this.props.editCompleted("false")
        //         this.props.editPercentageDone(0)
        //     }
        //     }
        //     onPress={() => {
        //         this.setState({ percentVal: 100 })
        //         this.props.editPercentageDone(100)
        //         this.props.editCompleted("true")

        //     }
        //     }>
        //     {this.renderCompleteButtonText()}
        // </TouchableOpacity>)
        if (this.state.selectedItem.completed == "true") {
            return (<TouchableOpacity
                style={styles.completeButtonBodyDone}
                onLongPress={() => {
                    Keyboard.dismiss()
                    this.setState({ percentVal: 0 })
                    this.props.editCompleted("false")
                }
                }
                onPress={() => {
                    Keyboard.dismiss()
                    this.setState({ percentVal: 100 })
                    this.props.editCompleted("true")
                    this.props.editFinishedDate(new Date(Date.now()));
                }
                }>
                {this.renderCompleteButtonText()}
            </TouchableOpacity>);
        } else {
            return (<TouchableOpacity
                style={styles.completeButtonBody}
                onLongPress={() => {
                    Keyboard.dismiss()
                    this.setState({ percentVal: 0 })
                    this.props.editCompleted("false")
                    this.props.editFinishedDate("");

                }
                }
                onPress={() => {
                    Keyboard.dismiss()
                    this.setState({ percentVal: 100 })
                    this.props.editCompleted("true")
                    this.props.editFinishedDate(new Date(Date.now()));
                }
                }>
                {this.renderCompleteButtonText()}
            </TouchableOpacity>);
        }
    }

    renderCompleteButtonText() {
        if (this.state.selectedItem.completed == "true")
            return (<Text style={styles.completeButtonText}>Done <Text style={{ fontSize: 14, fontFamily: colorsProvider.font }}>(finished on: {Moment(new Date(this.state.selectedItem.finished_date.toString())).format(dateDisplayFormat)})</Text></Text>
            )
        else
            return (<Text style={styles.completeButtonText}>Complete</Text>)
    }
    /* #endregion */

    /* #region  Notification Times Region */
    setNotificationTimesVisibility(visible) {
        this.setState({ notificationTimesModal: visible })
    }

    renderNotificationTimesModal() {
        if (this.state.notificationTimesModal) {
            return (
                <NotificationTimesModal
                    animationType="fade"
                    transparent={true}
                    saveButtonBackgroundColor={colorsProvider.projectsMainColor}
                    disabledSaveButtonBackgroundColor={colorsProvider.projectsMainColor}
                    times={this.state.selectedItem.notification_time ? JSON.parse('[' + this.state.selectedItem.notification_time + ']') : ''}
                    setDate={item => {
                        this.props.editNotificationTime(item);
                        // this.setState({ itemNotificationTimes: item });
                    }}
                    closeModal={() => {
                        notifier.scheduleAllNotifications();
                        this.setNotificationTimesVisibility(false);
                    }}
                ></NotificationTimesModal>
            );
        }
        return null;
    }


    renderNotificationTimesSection() {
        if (this.state.selectedItem.notification_time != '') {
            var daysWithNotifications = '';

            var jsonArr = JSON.parse("[" + this.state.selectedItem.notification_time + "]");

            Object.keys(jsonArr).map(key => {
                if (jsonArr[key].times.length > 0 && jsonArr[key].checked == true) {
                    daysWithNotifications = daysWithNotifications.concat(
                        jsonArr[key].name + ', '
                    );
                }
            });
            if (daysWithNotifications != '') {
                return (
                    <TouchableOpacity
                        style={styles.hasNotificationTimesButtonContainer}
                        onPress={() => {
                            this.setNotificationTimesVisibility(true);
                        }}
                    >
                        <Text style={styles.hasNotificationTimeButtonText}>
                            {daysWithNotifications}
                        </Text>

                        <Text style={styles.notificationTimeButtonText}>
                            <SIcon name="bell" size={20} color={colorsProvider.projectsComplimentaryColor} />
                        </Text>
                    </TouchableOpacity>
                );
            }
        }
        return (
            <TouchableOpacity
                style={styles.notificationTimesButtonContainer}
                onPress={() => {
                    this.setNotificationTimesVisibility(true);
                }}
            >
                <Text style={styles.notificationTimeButtonText}>
                    When would you like to be notified?
            </Text>

                <Text style={styles.notificationTimeButtonText}>
                    <SIcon name="bell" size={20} color={colorsProvider.homePlaceholderColor} />
                </Text>
            </TouchableOpacity>
        );
    }

    /* #endregion */

    /* #region  Notes Region */
    setNotesModalVisibility(visible) {
        this.setState({ notesModalVisible: visible });
    }

    renderNotesModal() {
        if (this.state.notesModalVisible) {
            return (
                <NotesModal
                    animationType="slide"
                    transparent={true}
                    existingNotes={this.state.selectedItem.notes}
                    backgroundColor={colorsProvider.projectsMainColor}
                    buttonContainerNotChangedColor={colorsProvider.projectsPlaceholderColor}
                    buttonContainerTextNotChangedColor={colorsProvider.projectsMainColor}
                    textPlaceholderColor={colorsProvider.projectsPlaceholderColor}
                    textChangedColor={colorsProvider.projectsComplimentaryColor}
                    buttonContainerTextNotChangedColor={colorsProvider.whitePlaceholderColor}
                    buttonTextPlaceholderColor={colorsProvider.whiteColor}
                    placeholder={'Notes...'}
                    setNotes={item => {
                        this.props.editNotes(item)
                    }}
                    closeModal={() => {
                        this.setNotesModalVisibility(false);
                    }}
                ></NotesModal>
            );
        }
        return null;
    }

    renderNotesSection() {
        if (this.state.selectedItem.notes != '') {
            return (
                <TouchableOpacity
                    style={styles.hasNotesContainer}
                    onPress={() => {
                        this.setNotesModalVisibility(true);
                    }}
                >
                    <Text
                        style={styles.hasNotesText}
                        multiline={true}
                        onChangeText={this.props.notes}
                    >
                        {this.state.selectedItem.notes}
                    </Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity
                style={styles.createNotesContainer}
                onPress={() => {
                    this.setNotesModalVisibility(true);
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

    render() {
        if (this.props.selectedItem != {}) {
            return (
                <Modal
                    backdropOpacity={0}
                    animationIn='slideInRight'
                    animationInTiming={400}
                    animationOut='slideOutRight'
                    animationOutTiming={400}
                    isVisible={this.props.visible}
                    style={{ margin: 0 }}
                    onSwipeComplete={this.props.closeModal}
                    swipeDirection={"right"}>

                    {this.renderChildItemModal()}
                    {this.renderShowDate()}
                    {/* {this.showTaskSelectionModal()} */}
                    {this.renderNotesModal()}
                    {this.renderNotificationTimesModal()}

                    {this.showTaskAddModal()}

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                        <SafeAreaView style={this.getStyleIfDone()}>
                            {/* Top Bar Section */}
                            {this.renderTopBar()}

                            {/* Name Section */}
                            {this.renderNameSection()}

                            {/* Project Section*/}
                            {this.renderAllChildrenSection()}

                            {/* Due Date Section*/}
                            {this.renderDueDate()}

                            {/* Sliders Section*/}
                            {this.renderSliderSection()}

                            {/* Complete Button Section */}
                            {this.renderCompleteButton()}

                            {/* Notification Times Section */}
                            {this.renderNotificationTimesSection()}

                            {/* {NOTES SECTION} */}
                            {this.renderNotesSection()}

                        </SafeAreaView>
                    </TouchableWithoutFeedback>
                </Modal>
            );
        }
    }
}