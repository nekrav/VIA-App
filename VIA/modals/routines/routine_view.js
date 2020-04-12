import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, StatusBar } from 'react-native'; // Version can be specified in package.json
import { MultipleSelectionModal } from '../selectionModal/multipleSelectionModal'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { ViewHabit, CreateHabit } from '../'
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal'
import { Database, Habits, Routines } from '../../db'
import { CheckBox } from 'react-native-elements'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import Slider from '@react-native-community/slider';
import { Notifier } from '../../notifier/notifier'

const notifier = new Notifier;
const controller = new Controller;
const timeDisplayFormat = 'hh:mm A'
const dateDisplayFormat = 'MMM Do'
const styles = require('./styles');
var uuid = require('react-native-uuid');
const childTableName = Habits.TABLE_NAME


export class ViewRoutine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canEdit: false,
            selectedItem: this.props.selectedItem,
            tasksSelectionModalVisible: false,
            childModalVisibility: false,
            items: [],
            relatedChildren: [],
            children: [],
            showStartDate: false,
            showEndDate: false,
            itemStartDate: '',
            itemEndDate: '',
            itemNotificationTimes: '',
            newProjectImportance: 0,
            notificationTimesModal: false,
            newRoutineName: '',
            itemNotes: '',
            numberOfTasks: '',
            tasks: [],
            projectId: uuid.v4(),
            selectedChildItem: '',
        };
    }

    componentDidMount() {
        notifier.scheduleAllNotifications();
        controller.loadAllChildrenAndGetRelatedChildren(this, Habits.TABLE_NAME, this.state.selectedItem.id, "routine");
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

    getHabits() {
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
                    children: itemsArr
                })
            })

    }

    /* #region  Top Bar Region */
    renderTopBar() {
        return (<View style={styles.topNav}>
            <TouchableOpacity style={styles.topNavBackButton}
                onPress={this.props.closeModal}>
                <SIcon name="arrow-left" size={30} color={colorsProvider.routinesComplimentaryColor} />
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
            style={this.state.newTaskName != "" ? styles.hasNameTextInputContainer : styles.createNameContainer}>
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

    /* #region  Habit Selection Region */
    setChildItemModalVisibility(visible) {
        this.setState({ childModalVisibility: visible })
    }

    renderChildItemModal() {
        if (this.state.childModalVisibility) {
            if (this.state.selectedChildItem != {}) {
                theHabit = this.state.selectedChildItem
                return <ViewHabit
                    animationType="slide"
                    transparent={false}
                    editName={(text) => {
                        theHabit.name = text;
                        this.setState({ selectedChildItem: theHabit })
                    }}
                    editStartTime={(text) => {
                        theHabit.start_time = text;
                        this.setState({ selectedChildItem: theHabit })
                    }}
                    editEndTime={(text) => {
                        theHabit.end_time = text;
                        this.setState({ selectedChildItem: theHabit })
                    }}
                    editImportance={(text) => {
                        theHabit.importance = text;
                        this.setState({ selectedChildItem: theHabit })
                    }}
                    editPercentageDone={(text) => {
                        theHabit.percentage_done = text;
                        this.setState({ selectedChildItem: theHabit })
                    }}
                    editCompleted={(text) => {
                        theHabit.completed = text;
                        this.setState({ selectedChildItem: theHabit })
                    }}
                    editFinishedDate={(text) => {
                        theHabit.finished_date = text;
                        this.setState({ selectedChildItem: theHabit })
                    }}
                    editTimeToSpend={(text) => {
                        theHabit.time_to_spend = text;
                        this.setState({ selectedChildItem: theHabit })
                    }}
                    editNotificationTime={(text) => {
                        var times = text.map(function (time) {
                            return JSON.stringify(time)
                        })
                        theHabit.notification_time = times
                        this.setState({ selectedChildItem: theHabit })
                    }}
                    editRoutine={(text) => {
                        theHabit.routine = text;
                        this.setState({ selectedChildItem: theHabit })
                    }}
                    editDaysToDo={(text) => {
                        theHabit.days_to_do = text;
                        this.setState({ selectedChildItem: theHabit })
                    }}

                    save={() => { controller.saveExisting(this, childTableName, theHabit) }}

                    selectedItem={theHabit}

                    delete={() => {
                        controller.delete(this, childTableName, theHabit)
                        controller.loadAllChildrenAndGetRelatedChildren(this, Habits.TABLE_NAME, this.state.selectedItem.id, "routine")
                        this.setChildItemModalVisibility(false)
                    }}

                    closeModal={() => { this.setChildItemModalVisibility(false) }}>
                </ViewHabit>
            }
        }
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
        newHabit.completed = "false"
        newHabit.time_to_spend = habit.time_to_spend ? habit.time_to_spend : ''
        newHabit.notification_time = habit.notification_time ? habit.notification_time : ''
        newHabit.days_to_do = habit.days_to_do ? habit.days_to_do : ''

        // Database.save(childTableName, newHabit).then(() => {
        //     this.setState({ tasksSelectionModalVisible: false })            // controller.loadAll(this, childTableName)
        //     controller.loadAllChildrenAndGetRelatedChildren(this, Habits.TABLE_NAME, this.state.selectedItem.id, "routine");
        //     notifier.scheduleAllNotifications()
        // })
    }

    showTasksSelectionModal() {
        if (newHabit != {}) {
            var newHabit = {};
        }
        var newHabit = {};
        // let newHabit = {};
        if (this.state.tasksSelectionModalVisible) {
            return <CreateHabit
                animationType="slide"
                transparent={false}
                id={(text) => { newHabit.id = text }}
                name={(text) => { newHabit.name = text }}
                importance={(text) => { newHabit.importance = text }}
                time_to_spend={(text) => { newHabit.time_to_spend = text }}
                start_time={(text) => { newHabit.start_time = text }}
                end_time={(text) => { newHabit.end_time = text }}
                notification_time={(text) => {
                    if (text) {
                        var times = text.map(function (time) {
                            return JSON.stringify(time)
                        })
                        newHabit.notification_time = times
                    }
                }}
                routine={(text) => { newHabit.routine = text }}
                days_to_do={(text) => { newHabit.days_to_do = text }}
                closeModal={() => { this.setState({ tasksSelectionModalVisible: false }) }}
                save={() => { this.saveNewHabit(newHabit) }}
            ></CreateHabit>
        }
        // let newHabit = {};
        // if (this.state.tasksSelectionModalVisible) {
        //     return <CreateHabit
        //         animationType="slide"
        //         transparent={false}
        //         fromRoutine={this.state.selectedItem.id}
        //         id={(text) => { newHabit.id = text }}
        //         name={(text) => { newHabit.name = text }}
        //         importance={(text) => { newHabit.importance = text }}
        //         time_to_spend={(text) => { newHabit.time_to_spend = text }}
        //         start_time={(text) => { newHabit.start_time = text }}
        //         end_time={(text) => { newHabit.end_time = text }}
        //         notification_time={(text) => {
        //             if (text) {
        //                 var times = text.map(function (time) {
        //                     return JSON.stringify(time)
        //                 })
        //                 newHabit.notification_time = times
        //             }
        //         }}
        //         routine={(text) => { newHabit.routine = text }}
        //         days_to_do={(text) => { newHabit.days_to_do = text }}
        //         closeModal={() => { this.setState({ tasksSelectionModalVisible: false }) }}
        //         save={() => { this.saveNewHabit(newHabit) }}
        //     ></CreateHabit>
        // }
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
                Database.update(Habits.TABLE_NAME, this.state.tasks[i].item.value).then(() => {
                    controller.loadAll(this, Habits.TABLE_NAME);
                    notifier.scheduleAllNotifications()
                })
            }
        }
    }

    getChecked(item) {
        if (item != null)
            var checked = false
        return checked = item.value.completed === "true"
    }

    renderAllChildrenSection() {
        // if (this.state.relatedChildren.length > 0) {
        return (
            <View style={styles.childrenItemsContainer}>
                <View style={styles.childrenItemsTitleContainer}>
                    <View style={styles.childrenItemsTitleTextContainer}>
                        <Text numberOfLines={1} style={styles.childrenItemsTitleText}>
                            Habits in {this.state.selectedItem.name}
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
                                        uncheckedColor={colorsProvider.habitsPlaceholderColor}
                                        size={colorsProvider.checkboxIconSize}
                                        onPress={() => {
                                            item.value.completed = !this.getChecked(item)
                                            if (item.value.completed == true) {
                                                item.value.finished_date = new Date(Date.now())
                                            } else {
                                                item.value.finished_date == ""
                                            }
                                            controller.saveExisting(this, childTableName, item.value)
                                            controller.loadAllChildrenAndGetRelatedChildren(this, Habits.TABLE_NAME, this.state.selectedItem.id, "routine");
                                            controller.loadAll(this, Habits.TABLE_NAME)
                                        }}
                                        checked={this.getChecked(item)} />
                                    <Text
                                        numberOfLines={1}
                                        multiline={false}
                                        style={styles.childTitleText}>{item.value.name} </Text>
                                </View>
                                {/* <TouchableOpacity style={styles.childActionButtonsContainer}> */}
                                {/* <TouchableOpacity
                                            style={styles.childActionButton}
                                            onPress={() => {
                                                controller.delete(this, childTableName, item.value)
                                                controller.loadAllChildrenAndGetRelatedChildren(this, Habits.TABLE_NAME, this.state.selectedItem.id, "routine")
                                                notifier.scheduleAllNotifications();
                                            }}>
                                            <SIcon style={styles.childActionButtonText} name="trash" size={30} color={colorsProvider.redColor} />
                                        </TouchableOpacity> */}

                                <TouchableOpacity
                                    style={styles.childActionButtonsContainer}
                                    onPress={() => {
                                        this.setState({ selectedChildItem: item.value }, () => {
                                            this.setChildItemModalVisibility(true)
                                        })
                                    }}>
                                    <SIcon style={styles.childActionButtonText} name="arrow-right" size={30} color={colorsProvider.habitsComplimentaryColor} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                            {/* </TouchableOpacity> */}
                        </TouchableWithoutFeedback>
                    } />
                {/* <View style={{ alignItems: 'center', marginTop: 5, marginBottom: 10 }}>
                    <TouchableOpacity style={styles.addTimeButtonContainer}
                        onPress={() => {
                            this.setTaskSelectionModalVisibility(true)
                        }}>
                        <View style={styles.addTimeButtonContainerView}>
                            <SIcon style={{ marginLeft: 10, }} name="plus" size={16} color={colorsProvider.shadowColor} />
                            <Text style={styles.addTimeButtonText}> Add Habit</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
            </View>
        );
    }
    /* #endregion */

    /* #region  Start Date Region */
    setStartDateModalVisibility(visible) {
        this.setState({ showStartDate: visible });
    }

    renderStartDateModal() {
        if (this.state.showStartDate) {
            return (
                <DateModal
                    pickerMode="time"
                    animationType="fade"
                    disabledSaveButtonBackgroundColor={colorsProvider.routinesMainColor}
                    saveButtonBackgroundColor={colorsProvider.routinesMainColor}
                    transparent={true}
                    setDate={item => {
                        this.props.editStartTime(item);
                        this.setState({ itemStartDate: item });
                    }}
                    onSubmit={item => {
                        this.props.editStartTime(item);
                        this.setState({ itemStartDate: item });
                        this.setStartDateModalVisibility(false);
                    }}
                    closeModal={() => {
                        this.setStartDateModalVisibility(false);
                    }}
                ></DateModal>
            );
        }
        return null;
    }

    renderStartDate() {
        if (this.state.selectedItem.start_time != '') {
            return (<TouchableOpacity
                style={styles.createDueDateContainer}
                onPress={() => {
                    Keyboard.dismiss()
                    this.setStartDateModalVisibility(true)
                }}>
                <Text style={styles.createSelectedDateText}>
                    {Moment(new Date(this.state.selectedItem.start_time)).format(timeDisplayFormat)}
                </Text>
            </TouchableOpacity>
            );
        }
        return (<TouchableOpacity style={styles.createNameContainer}
            onPress={() => {
                Keyboard.dismiss()
                this.setStartDateModalVisibility(true)
            }}>
            <Text style={styles.createDateText}>
                When do you want this routine to start?
          </Text>
        </TouchableOpacity>
        );
    }

    /* #endregion */

    /* #region  End Date Region */
    setEndDateModalVisibility(visible) {
        this.setState({ showEndDate: visible });
    }

    renderEndDateModal() {
        if (this.state.showEndDate) {
            return (
                <DateModal
                    pickerMode="time"
                    animationType="fade"
                    disabledSaveButtonBackgroundColor={colorsProvider.routinesMainColor}
                    saveButtonBackgroundColor={colorsProvider.routinesMainColor}
                    transparent={true}
                    setDate={item => {
                        this.props.editEndTime(item);
                        this.setState({ itemEndDate: item });
                    }}
                    onSubmit={item => {
                        this.props.editEndTime(item);
                        this.setState({ itemEndDate: item });
                        this.setEndDateModalVisibility(false);
                    }}
                    closeModal={() => {
                        this.setEndDateModalVisibility(false);
                    }}
                ></DateModal>
            );
        }
        return null;
    }

    renderEndDate() {
        if (this.state.selectedItem.end_time != '') {
            return (<TouchableOpacity
                style={styles.createDueDateContainer}
                onPress={() => {
                    Keyboard.dismiss()
                    this.setEndDateModalVisibility(true)
                }}>
                <Text style={styles.createSelectedDateText}>
                    {Moment(new Date(this.state.selectedItem.end_time)).format(timeDisplayFormat)}
                </Text>
            </TouchableOpacity>
            );
        }
        return (<TouchableOpacity style={styles.createNameContainer}
            onPress={() => {
                Keyboard.dismiss()
                this.setEndDateModalVisibility(true)
            }}>
            <Text style={styles.createDateText}>
                When do you want this routine to end?
          </Text>
        </TouchableOpacity>
        );
    }

    /* #endregion */

    /* #region  Complete Button Section */

    renderCompleteButton() {
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
        this.setState({ notificationTimesModal: visible });
    }

    renderNotificationTimesModal() {
        if (this.state.notificationTimesModal) {
            return (
                <NotificationTimesModal
                    animationType="fade"
                    transparent={true}
                    saveButtonBackgroundColor={colorsProvider.routinesMainColor}
                    disabledSaveButtonBackgroundColor={colorsProvider.routinesMainColor}
                    times={this.state.selectedItem.notification_time ? JSON.parse('[' + this.state.selectedItem.notification_time + ']') : ''}
                    setDate={item => {
                        this.props.editNotificationTime(item);
                        this.setState({ itemNotificationTimes: item });
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

    renderNotificationTimes() {
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
                        <SIcon name="bell" size={20} color={colorsProvider.routinesComplimentaryColor} />
                    </Text>
                </TouchableOpacity>
            );
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
                    <SIcon name="bell" size={20} color={colorsProvider.routinesPlaceholderColor} />
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
                    existingNotes={this.state.itemNotes}
                    placeholder={'Notes...'}
                    setNotes={item => {
                        this.props.notes(item);
                        this.setState({ itemNotes: item });
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
        if (this.state.itemNotes != '') {
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
                        {this.state.itemNotes}
                    </Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity
                style={styles.createNotesContainer}
                onPress={() => {
                    this.setNotesModalVisibility(true);
                }}>
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
                    style={{ margin: 0 }}
                    onSwipeComplete={this.props.closeModal}
                    swipeDirection={"right"}>

                    {this.renderStartDateModal()}
                    {this.renderEndDateModal()}
                    {this.showTasksSelectionModal()}
                    {this.renderChildItemModal()}
                    {this.renderNotificationTimesModal()}

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <SafeAreaView style={this.getStyleIfDone()}>

                            {/* Top Bar Section */}
                            {this.renderTopBar()}

                            {/* Name Section */}
                            {this.renderNameSection()}

                            {/* Start Date Section*/}
                            {this.renderStartDate()}

                            {/* End Date Section*/}
                            {this.renderEndDate()}

                            {/* Sliders Section*/}
                            {/* {this.renderSliderSection()} */}
                            {this.renderAllChildrenSection()}

                            {/* Complete Button Section */}
                            {this.renderCompleteButton()}

                            {/* Notification Times Section */}
                            {this.renderNotificationTimes()}

                        </SafeAreaView>
                    </TouchableWithoutFeedback>
                </Modal>
            );
        }
    }
}