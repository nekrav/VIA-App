import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, StatusBar, FlatList } from 'react-native';
import { Controller } from '../controller';
import { SelectionModal } from '../selectionModal/selectionModal'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { ViewTask } from '../'
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal';
import { Database, Projects, Tasks } from '../../db'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Slider from '@react-native-community/slider';
import Modal from "react-native-modal";
import Moment from 'moment';
import { Notifier } from '../../notifier/notifier'

const notifier = new Notifier;

const controller = new Controller;

const styles = require('./styles');

const empty = ""
const todayDate = new Date();
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
            relatedChildren: []
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

    /* #region  Task Selection Region */

    setChildItemModalVisibility(visible) {
        this.setState({ childModalVisibility: visible })

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
                        this.setChildItemModalVisibility(false)
                    }}

                    closeModal={() => { this.setChildItemModalVisibility(false) }}>
                </ViewTask>
            }
        }
    }

    showTasksSelectionModal() {
        if (this.state.tasksSelectionModalVisible) {
            return <MultipleSelectionModal
                animationType="fade"
                items={this.state.items}
                itemName="Tasks"
                transparent={true}
                selectItems={items => {
                    this.setState({ tasks: items })
                }}
                closeModal={() => { this.setTaskSelectionModalVisibility(false) }}>
            </MultipleSelectionModal>
        }
    }

    setTaskSelectionModalVisibility(visible) {
        this.setState({ tasksSelectionModalVisible: visible })
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
                        {/* <TouchableOpacity style={styles.addTimeButtonContainer}
                        onPress={() => {
                            this.setTaskSelectionModalVisibility(true)
                        }}>
                        <View style={styles.addTimeButtonContainerView}>
                            <SIcon style={{ marginLeft: 10, }} name="plus" size={16} color={colorsProvider.shadowColor} />
                            <Text style={styles.addTimeButtonText}> Add Habit</Text>
                        </View>
                    </TouchableOpacity> */}
                    </View>
                    <FlatList
                        data={this.state.relatedChildren}
                        extraData={this.state}
                        contentContainerStyle={styles.childrenContainer}
                        renderItem={({ item }) =>
                            <View style={styles.childContainer}>
                                <View style={styles.childTitleContainer}>
                                    <Text
                                        numberOfLines={1}
                                        multiline={false}
                                        style={styles.childTitleText}>{item.value.name} </Text>
                                </View>
                                <View style={styles.childActionButtonsContainer}>
                                    <TouchableOpacity
                                        style={styles.childActionButton}
                                        onPress={() => {
                                            controller.delete(this, childTableName, item.value)
                                            controller.loadAllChildrenAndGetRelatedChildren(this, Tasks.TABLE_NAME, this.state.selectedItem.id, "routine")
                                            notifier.scheduleAllNotifications();
                                        }}>
                                        <SIcon style={styles.childActionButtonText} name="trash" size={30} color={colorsProvider.redColor} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.childActionButton}
                                        onPress={() => {
                                            // this.setDateModalVisibility(true)
                                            this.setChildItemModalVisibility(true)
                                            this.setState({ selectedChildItem: item.value }, () => {
                                                this.setChildItemModalVisibility(true)
                                            })
                                        }}>
                                        <SIcon style={styles.childActionButtonText} name="arrow-right" size={30} color={colorsProvider.whiteColor} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        } />
                </View>
            );
        } else {
            return (
                <View style={styles.childrenItemsContainer}>
                    <View style={styles.childrenItemsTitleContainer}>
                        <Text style={styles.childrenItemsTitleText}>
                            Tasks in {this.state.selectedItem.name}
                        </Text>
                        {/* <TouchableOpacity style={styles.addTimeButtonContainer}
                        onPress={() => {
                            this.setState({ selectedDayToAddTimeTo: day.item.key }, () => {
                                this.toggleNotificationTimeSelectionModal(true)
                            })
                        }}>
                        <View style={styles.addTimeButtonContainerView}>
                            <SIcon style={{ marginLeft: 10, }} name="plus" size={16} color={colorsProvider.shadowColor} />
                            <Text style={styles.addTimeButtonText}> Add Task</Text>
                        </View>
                    </TouchableOpacity> */}
                    </View>
                    {/* <TouchableOpacity style={styles.createProjectSelectionContainer} onPress={this.setTaskSelectionModalVisibility.bind(this)}> */}
                    <Text style={styles.createProjectSelectionButtonText}>You don't have any tasks here</Text>
                </View>
            );
        }
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
                closeModal={() => { this.setDateModalVisibility() }}>
            </DateModal>
        }
        return null;
    }

    renderDueDate() {
        if (this.state.selectedItem.due_date != '') {
            return (
                <TouchableOpacity
                    style={styles.createDueDateContainer}
                    onPress={() => this.setDateModalVisibility(true)}>
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
            <TouchableOpacity style={styles.createNameContainer} onPress={() => this.setDateModalVisibility(true)}>
                <Text style={styles.createDateText}>
                    When do you want to finish this?
              </Text>
            </TouchableOpacity>
        );
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
                                this.state.selectedItem.percentage_done > 0
                                    ? styles.sliderTitleNull
                                    : styles.sliderTitle}>
                            % Done
                        </Text>
                    </View>
                    <View style={styles.sliderContainerLeft}>
                        <Slider
                            style={{ width: 350, height: 1, marginRight: 10, marginLeft: 10 }}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor={colorsProvider.homeComplimentaryColor}
                            maximumTrackTintColor={styles.placeholderColor}
                            value={parseInt(this.state.percentVal)}

                            onSlidingComplete={(value) => {
                                this.props.editPercentageDone(value)
                                if (value == 100) {
                                    this.finishTask();
                                }
                                this.props.save();
                            }}
                            onValueChange={(value) => {
                                this.props.editPercentageDone(value);
                            }}
                        />

                    </View>
                </View>
                <View style={styles.slidersTitlesContainer}>
                    <View style={styles.sliderTitleContainer}>
                        <Text
                            style={
                                this.state.selectedItem.percentage_done > 0
                                    ? styles.sliderTitleNull
                                    : styles.sliderTitle}>
                            Importance
                        </Text>
                    </View>
                    <View style={styles.sliderContainerLeft}>
                        <Slider
                            style={{ width: 350, height: 1, marginRight: 10, marginLeft: 10 }}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor={colorsProvider.homeComplimentaryColor}
                            maximumTrackTintColor={styles.placeholderColor}
                            value={parseInt(this.state.importanceVal)}

                            onValueChange={(value) => {
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
        return (<TouchableOpacity
            style={styles.completeButtonBody}
            onLongPress={() => {
                this.setState({ percentVal: 0 })
                this.props.editCompleted("false")
                this.props.editPercentageDone(0)
            }
            }
            onPress={() => {
                this.setState({ percentVal: 100 })
                this.props.editPercentageDone(100)
                this.props.editCompleted("true")

            }
            }>
            {this.renderCompleteButtonText()}
        </TouchableOpacity>)
    }

    renderCompleteButtonText() {
        if (this.state.selectedItem.completed == "true")
            return (<Text style={styles.completeButtonText}>Done</Text>)
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
                            <SIcon name="bell" size={20} color={colorsProvider.whiteColor} />
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