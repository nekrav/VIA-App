import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView, StatusBar } from 'react-native'; // Version can be specified in package.json
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { ViewHabit, CreateHabit } from '../'
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal'
import { Database, Habits, Routines } from '../../db'
import { CheckBox } from 'react-native-elements'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import { Notifier } from '../../notifier/notifier'
import { TopBar, NotificationTimes, Notes, CompleteButton, TrashButton, StartEndTime, ChildrenContainer } from '../../components'


const notifier = new Notifier;
const controller = new Controller;
const timeDisplayFormat = 'hh:mm A'
const dateDisplayFormat = 'MMM Do'
const styles = require('./styles');
var uuid = require('react-native-uuid');
const childTableName = Habits.TABLE_NAME
let numberOfChildren = 0;


export class ViewRoutine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: this.props.selectedItem,
            items: [],
            relatedChildren: [],
            children: [],
            showStartDate: false,
            showEndDate: false,
            itemStartDate: '',
            itemEndDate: '',
            selectedChildItem: '',
            allPossibleChildren: [],
            notificationTimes: "",
        };
    }

    // componentDidMount() {
    //     notifier.scheduleAllNotifications();
    //     // controller.loadAllChildrenAndGetRelatedChildren(this, Habits.TABLE_NAME, this.state.selectedItem.id, "routine");
    // }

    getChildren(childTableName, selectedParent, parentType) {
        const itemsArr = []
        const relatedChildren = []
        Database.getAll(childTableName)
            .then((res) => {
                const len = res.rows.length;
                let item = {}
                for (let i = 0; i < len; i++) {
                    item = res.rows.item(i)
                    itemParentId = res.rows.item(i)[parentType].replace(/\\/g, '')
                    itemParentId = itemParentId.replace(/['"]+/g, "")
                    itemsArr.push({ key: JSON.stringify(item.id), value: item })
                    if (itemParentId == selectedParent) {
                        relatedChildren.push({ key: JSON.stringify(item.id), value: item })
                        numberOfChildren = numberOfChildren++
                    }

                }
                this.setState({ relatedChildren: relatedChildren })
            })

    }

    async fetch() {
        this.setState({ isFetching: true });
        this.setState({ relatedChildren: b, isFetching: false });
    }


    componentDidMount() {
        notifier.scheduleAllNotifications();
        this.getChildren(Habits.TABLE_NAME, this.state.selectedItem.id, "routine")
    }

    componentDidUpdate(prevProps) {
        if (prevProps.relatedChildren !== this.props.relatedChildren) {
            this.fetch();
        }
    }

    /* #region  Top Bar Region */
    renderTopBar() {
        return <TopBar
            color={colorsProvider.routinesMainColor}
            fromCreate={false}
            hasParent={false}
            hasDueDate={false}
            hasImportance={true}
            nameOfItem={this.state.selectedItem.name}
            importance={this.state.selectedItem.importance}
            allChildren={this.state.relatedChildren}
            closeModal={this.props.closeModal}
            editName={item => {
                this.props.editName(item);
                this.props.save();
                notifier.scheduleAllNotifications()
            }}
            setImportanceNN={() => {
                Keyboard.dismiss()
                this.props.setImportanceNN(1)
                this.props.save();
            }}
            setImportanceNU={() => {
                Keyboard.dismiss()
                this.props.setImportanceNU(2)
                this.props.save();
            }}
            setImportanceIN={() => {
                Keyboard.dismiss()
                this.props.setImportanceIN(3)
                this.props.save();
            }}
            setImportanceIU={() => {
                Keyboard.dismiss()
                this.props.setImportanceIU(4)
                this.props.save();
            }}
        />
    }
    /* #endregion */

    /* #region  StartEndTime */
    renderStartEndTime() {
        return (<StartEndTime
            startTime={this.state.selectedItem.start_time}
            endTime={this.state.selectedItem.end_time}
            color={colorsProvider.routinesMainColor}
            setStartTime={item => {
                this.props.editStartTime(item);
                this.setState({ startTime: item });
                this.props.save();
            }}
            setEndTime={item => {
                this.props.editEndTime(item);
                this.setState({ endTime: item });
                this.props.save();
            }}
        />)

    }

    /* #endregion */

    /* #region  Complete Button and Trash Button Section */
    renderCompleteAndTrashButton() {
        return (<View style={{ flexDirection: 'row' }}>
            <CompleteButton
                percentageDone={this.state.selectedItem.percentage_done}
                completed={this.state.selectedItem.completed}
                // finishedDate={this.state.selectedItem.finished_date}
                onUnCompletePressed={() => {
                    Keyboard.dismiss()
                    this.setState({ percentVal: 0 })
                    this.props.editCompleted("false")
                    this.props.editFinishedDate("null")
                    this.props.save();

                }}
                onCompletePressed={() => {
                    Keyboard.dismiss();
                    this.setState({ percentVal: 10 })
                    this.props.editCompleted("true")
                    this.props.editFinishedDate(new Date(Date.now()));
                    this.props.save();
                }}
            />
            <TrashButton
                delete={() => {
                    if (this.state.relatedChildren.length > 0) {
                        for (i = 0; i < this.state.relatedChildren.length; i++) {
                            this.state.relatedChildren[i].value.routineName = null
                            this.state.relatedChildren[i].value.routine = null
                            Database.update('habits', this.state.relatedChildren[i].value).then(() => {
                                notifier.scheduleAllNotifications();
                                this.props.delete()
                            })
                        }
                    }
                    notifier.scheduleAllNotifications();
                    this.props.delete()

                }} />
        </View>)
    }
    /* #endregion */

    /* #region  Children Region */
    renderChildren() {
        return (<ChildrenContainer
            parentId={this.state.selectedItem.id}
            parentName={this.state.selectedItem.name}
            relatedChildren={this.state.relatedChildren}
            borderColor={colorsProvider.habitsMainColor}
            addButtonColor={colorsProvider.habitsMainColor}
            parentComplimentaryColor={colorsProvider.routinesComplimentaryColor}
            childType={'Habits'}
            childTableName={childTableName}
            childUpdateCompleted={item => {
                controller.saveExisting(this, childTableName, item)
                controller.loadAllChildrenAndGetRelatedChildren(this, Habits.TABLE_NAME, this.state.selectedItem.id, "routine")
                this.props.save();
            }}
            saveItem={() => {
                controller.loadAllChildrenAndGetRelatedChildren(this, Habits.TABLE_NAME, this.state.selectedItem.id, "routine")
            }}
            deleteItem={item => {
                controller.delete(this, childTableName, item)
                controller.loadAllChildrenAndGetRelatedChildren(this, Habits.TABLE_NAME, this.state.selectedItem.id, "routine")
                this.props.save();
            }} />)
    }
    /* #endregion */

    /* #region  Notification Times Region */

    renderNotificationTimes() {
        return (<NotificationTimes
            color={colorsProvider.routinesMainColor}
            notificationTimes={this.state.selectedItem.notification_time}
            onPress={() => {
                this.setNotificationTimesVisibility(true);
            }}
            addNotificationTime={item => {
                this.props.editNotificationTime(item);
                this.setState({ notificationTimes: item })
                this.props.save();
                notifier.scheduleAllNotifications();
            }}
        />
        )
    }
    /* #endregion */

    /* #region  Notes Region */

    renderNotesSection() {
        return <Notes
            color={colorsProvider.routinesMainColor}
            notes={this.state.selectedItem.notes}
            editNotes={value => {
                this.props.editNotes(value);
                this.props.save();
            }} />
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
                    editRoutine={(text, name) => {
                        theHabit.routineName = name
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

        Database.save(childTableName, newHabit).then(() => {
            this.setState({ tasksSelectionModalVisible: false })            // controller.loadAll(this, childTableName)
            controller.loadAllChildrenAndGetRelatedChildren(this, Habits.TABLE_NAME, this.state.selectedItem.id, "routine");
            notifier.scheduleAllNotifications()
        })
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
                fromRoutine={this.props.selectedItem.id}
                fromRoutineName={this.props.selectedItem.name}
                closeModal={() => { this.setState({ tasksSelectionModalVisible: false }) }}
                save={() => { this.saveNewHabit(newHabit) }}
            ></CreateHabit>
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
        if (this.state.relatedChildren.length > 0) {
            return (
                <View style={styles.childrenItemsContainer}>
                    <View style={styles.childrenItemsTitleContainer}>
                        <View style={styles.childrenItemsTitleTextContainer}>
                            <Text numberOfLines={1} style={styles.childrenItemsTitleText}>
                                Habits in {this.state.selectedItem.name}
                            </Text>
                        </View>
                    </View>
                    <ScrollView>
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
                                                Keyboard.dismiss()
                                                this.setState({ selectedChildItem: item.value }, () => {
                                                    this.setChildItemModalVisibility(true)
                                                })
                                            }}>
                                            <SIcon style={styles.childActionButtonText} name="arrow-right" size={30} color={colorsProvider.habitsComplimentaryColor} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    {/* </TouchableOpacity> */}
                                </TouchableWithoutFeedback>
                            } /></ScrollView>
                    <View style={{ alignItems: 'center', marginTop: 5, marginBottom: 10 }}>
                        <TouchableOpacity style={styles.addTimeButtonContainer}
                            onPress={() => {
                                this.setTaskSelectionModalVisibility(true)
                            }}>
                            <View style={styles.addTimeButtonContainerView}>
                                <SIcon style={{ marginLeft: 10, }} name="plus" size={16} color={colorsProvider.shadowColor} />
                                <Text style={styles.addTimeButtonText}> Add Habit</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        else {
            return (
                <View style={styles.childrenItemsContainer}>
                    <View style={styles.childrenItemsTitleContainer}>
                        <Text style={styles.childrenItemsTitleText}>
                            Habits in {this.state.selectedItem.name}
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
                    <Text style={styles.createProjectSelectionButtonText}>You don't have any habits in this routine</Text>
                </View>
            );
        }
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

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={styles.outerView}>
                            {this.renderTopBar()}

                            {/* {this.renderStartEndTime()} */}

                            {this.renderCompleteAndTrashButton()}

                            {this.renderChildren()}

                            {this.renderNotificationTimes()}

                            {this.renderNotesSection()}

                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            );
        }
    }
}