import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, StatusBar, FlatList, ScrollView } from 'react-native';
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
import NotifService from '../../notifier/newNotifier';
import { TopBar, DoneSlider, CompleteButton, TrashButton, NotificationTimes, Notes, ChildrenContainer } from '../../components'

var uuid = require('react-native-uuid');



const controller = new Controller;

const styles = require('./styles');

const empty = ""

const childTableName = Tasks.TABLE_NAME


var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var year = new Date().getFullYear(); //Current Year
const dateDisplayFormat = 'MMM Do'
const dateFormat = 'dd/mm/yy'
const dateToday = new Date(year, month, date);


export class ViewProject extends React.Component {
    constructor(props) {
        super(props);
        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );
        this.state = {
            // selectedItem: this.props.selectedItem,
            // items: [],
            // proj: null,
            // importance: this.props.selectedItem.importance,
            // showDate: false,
            // dueDate: '',
            // notificationTimesModal: false,
            // percentVal: this.props.selectedItem.percentage_done,
            // importanceVal: this.props.selectedItem.importance,
            // notesModalVisible: false,
            // itemNotificationTimes: this.props.selectedItem.notification_time,
            // childModalVisibility: false,
            // selectedChildItem: '',
            // relatedChildren: [],
            // tasksCreateModalVisible: false,
            relatedChildren: [],
            selectedItem: this.props.selectedItem,
            selectedChildItem: '',
            allPossibleChildren: [],
            dueDate: '',
            notificationTimes: "",
        };
    }

    componentDidMount() {
        _isMounted = true;
        controller.loadAllChildrenAndGetRelatedChildren(this, Tasks.TABLE_NAME, this.state.selectedItem.id, "project");
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


    getStyleIfDone() {
        if (this.props.selectedItem.completed == "true") {
            return styles.outerViewDone
        }
        return styles.outerView;
    }

    finishProject() {
        this.props.editCompleted("true")
    }
    /* #region  Top Bar Region */
    renderTopBar() {
        return <TopBar
            color={colorsProvider.projectsMainColor}
            fromCreate={false}
            hasParent={false}
            hasDueDate={true}
            hasImportance={true}
            dueDate={this.state.selectedItem.due_date}
            nameOfItem={this.state.selectedItem.name}
            importance={this.state.selectedItem.importance}
            allChildren={this.state.allPossibleChildren}
            closeModal={this.props.closeModal}
            selectDueDate={date => {
                this.props.editDueDate(date)
                this.setState({ dueDate: date })
                this.props.save();
            }}
            editName={item => {
                this.props.editName(item);
                this.props.save();
                this.notif.scheduleAllNotifications()
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

    /* #region  Done Slider Region */
    renderDoneSlider() {
        return (<DoneSlider
            percentageDone={this.state.selectedItem.percentage_done}
            onSlidingComplete={(value) => {
                this.props.editPercentageDone(value)
                if (value == 10) {
                    this.finishProject();
                }
                this.props.save();
            }}
            onValueChange={(value) => {
                Keyboard.dismiss()
                this.props.editPercentageDone(value);
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
                    this.props.editPercentageDone(0)
                    this.props.editFinishedDate("null")
                    this.props.save();

                }}
                onCompletePressed={() => {
                    Keyboard.dismiss();
                    this.setState({ percentVal: 10 })
                    this.props.editPercentageDone(10)
                    this.props.editCompleted("true")
                    this.props.editFinishedDate(new Date(Date.now()));
                    this.props.save();
                }}
            />
            <TrashButton
                delete={() => {
                    if (this.state.relatedChildren.length > 0) {
                        for (i = 0; i < this.state.relatedChildren.length; i++) {
                            this.state.relatedChildren[i].value.projectName = 'null'
                            this.state.relatedChildren[i].value.project = 'null'
                            Database.update('tasks', this.state.relatedChildren[i].value).then(() => {
                                this.notif.scheduleAllNotifications();
                                this.props.delete()
                            })
                        }
                    }
                    this.notif.scheduleAllNotifications();
                    this.props.delete()

                }} />
        </View>)
    }
    /* #endregion */


    /* #region  Notification Times Region */

    renderNotificationTimes() {
        return (<NotificationTimes
            color={colorsProvider.projectsMainColor}
            notificationTimes={this.props.selectedItem.notification_time}
            onPress={() => {
                this.setNotificationTimesVisibility(true);
            }}
            addNotificationTime={item => {
                this.props.editNotificationTime(item);
                this.setState({ notificationTimes: item })
                this.props.save();
                this.notif.scheduleAllNotifications();
            }}
        />
        )
    }
    /* #endregion */

    /* #region  Task Selection Region */

    setChildItemModalVisibility(visible, item) {
        // this.setState({ childModalVisibility: visible })
        this.props.goToChildItem(item)
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
            controller.loadAll(this, childTableName)
            controller.loadAllChildrenAndGetRelatedChildren(this, childTableName, this.state.selectedItem.id, "project");
            this.notif.scheduleAllNotifications()
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


    /* #region  Children Region */
    renderChildren() {
        return (<ChildrenContainer
            parentId={this.state.selectedItem.id}
            parentName={this.state.selectedItem.name}
            relatedChildren={this.state.relatedChildren}
            borderColor={colorsProvider.tasksMainColor}
            addButtonColor={colorsProvider.tasksMainColor}
            parentComplimentaryColor={colorsProvider.projectsComplimentaryColor}
            childType={'Tasks'}
            childTableName={childTableName}
            childUpdateCompleted={item => {
                controller.saveExisting(this, childTableName, item)
                controller.loadAllChildrenAndGetRelatedChildren(this, Tasks.TABLE_NAME, this.state.selectedItem.id, "project")
                this.props.save();
            }}
            saveItem={() => {
                controller.loadAllChildrenAndGetRelatedChildren(this, Tasks.TABLE_NAME, this.state.selectedItem.id, "project")
            }}
            deleteItem={item => {
                controller.delete(this, childTableName, item)
                controller.loadAllChildrenAndGetRelatedChildren(this, Tasks.TABLE_NAME, this.state.selectedItem.id, "project")
                this.props.save();
            }} />)
    }
    /* #endregion */


    // renderChildItemModal() {
    //     if (this.state.childModalVisibility) {
    //         if (this.state.selectedChildItem != '') {
    //             theTask = this.state.selectedChildItem
    //             return <ViewTask
    //                 animationType="slide"
    //                 transparent={false}
    //                 visible={this.state.childModalVisibility}
    //                 editName={(text) => {
    //                     theTask.name = text;
    //                     this.setState({ selectedTask: theTask })
    //                 }}
    //                 editDueDate={(text) => {
    //                     theTask.due_date = text;
    //                     this.setState({ selectedTask: theTask })
    //                 }}
    //                 editImportance={(text) => {
    //                     theTask.importance = text;
    //                     this.setState({ selectedTask: theTask })
    //                 }}
    //                 editPercentageDone={(text) => {
    //                     theTask.percentage_done = text;
    //                     this.setState({ selectedTask: theTask })
    //                 }}
    //                 editCompleted={(text) => {
    //                     theTask.completed = text;
    //                     this.setState({ selectedTask: theTask })
    //                 }}
    //                 editProject={(text) => {
    //                     theTask.project = text;
    //                     this.setState({ selectedTask: theTask })
    //                 }}
    //                 editTimeSpent={(text) => {
    //                     theTask.time_spent = text;
    //                     this.setState({ selectedTask: theTask })
    //                 }}
    //                 editNotes={(text) => {
    //                     theTask.notes = text;
    //                     this.setState({ selectedTask: theTask })
    //                 }}
    //                 editNotificationTime={(text) => {
    //                     if (text) {
    //                         var times = text.map(function (time) {
    //                             return JSON.stringify(time)
    //                         })
    //                         theTask.notification_time = times
    //                         this.setState({ selectedTask: theTask })
    //                     }
    //                 }}

    //                 save={() => { controller.saveExisting(this, childTableName, theTask) }}

    //                 selectedItem={theTask}

    //                 delete={() => {
    //                     controller.delete(this, childTableName, theTask)
    //                     controller.loadAllChildrenAndGetRelatedChildren(this, Tasks.TABLE_NAME, this.state.selectedItem.id, "project")
    //                     this.setCreateTaskModalVisibility(false)
    //                 }}

    //                 closeModal={() => { this.setCreateTaskModalVisibility(false) }}>
    //             </ViewTask>
    //         }
    //     }
    // }

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
                    this.notif.scheduleAllNotifications()
                })
            }
        }
    }

    getChecked(item) {
        if (item != null)
            return checked = item.value.completed === "true"
    }

    renderChildItem(item) {
        return (
            <TouchableWithoutFeedback onPress={() => { }}>
                <View>
                    <TouchableOpacity
                        style={styles.childContainer}
                        onPress={() => {
                            Keyboard.dismiss()
                            this.setState({ selectedChildItem: item.value }, () => {
                                this.setChildItemModalVisibility(true, item.value, this.state.selectedItem.id)
                                this.props.closeModal();
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
                            <TouchableOpacity
                                style={styles.childActionButton}
                                onPress={() => {
                                    controller.delete(this, childTableName, item.value)
                                    controller.loadAllChildrenAndGetRelatedChildren(this, Tasks.TABLE_NAME, this.state.selectedItem.id, "project")
                                    this.notif.scheduleAllNotifications();
                                }}>
                                <SIcon style={styles.childActionButtonText} name="trash" size={30} color={colorsProvider.redColor} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.childActionButton}
                                onPress={() => {
                                    this.setState({ selectedChildItem: item.value }, () => {
                                        this.setChildItemModalVisibility(true, item.value, this.state.selectedItem.id)
                                        this.props.closeModal();
                                    })
                                }}>
                                <SIcon style={styles.childActionButtonText} color={colorsProvider.tasksComplimentaryColor} name="arrow-right" size={30} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>

            </TouchableWithoutFeedback>
        )
    }

    renderAllChildrenSection() {
        if (this.state.relatedChildren.length > 0) {
            return (
                <View style={styles.childrenItemsContainer}>
                    {/* <View style={styles.childrenItemsTitleContainer}>
                        <View style={styles.childrenItemsTitleTextContainer}>
                            <Text numberOfLines={1} style={styles.childrenItemsTitleText}>
                                Tasks
                            </Text>
                        </View>
                        <PlusButton
                            iconSize={30}
                            iconName="ios-add"
                            iconColor={colorsProvider.projectsMainColor}
                            action={() => {
                                this.setCreateTaskModalVisibility(true)
                            }} />
                    </View> */}
                    <ScrollView>
                        <FlatList
                            data={this.state.relatedChildren}
                            // contentContainerStyle={{
                            //     flexGrow: 1,
                            //     }}
                            extraData={this.state}
                            horizontal={false}
                            renderItem={({ item }) =>
                                <TouchableWithoutFeedback onPress={() => { }}>
                                    {this.renderChildItem(item)}

                                    {/* 
                                    <View style={{ flex: 1 }}>

                                        <Text>BOBB</Text>
                                    </View> */}
                                </TouchableWithoutFeedback>
                            } />
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={styles.childrenItemsContainer}>
                    <View style={styles.childrenItemsTitleContainer}>
                        <View style={styles.childrenItemsTitleTextContainer}>
                            <Text style={styles.childrenItemsTitleText}>
                                Tasks
                            </Text>
                        </View>
                        <PlusButton
                            iconSize={30}
                            iconName="ios-add"
                            iconColor={colorsProvider.projectsMainColor}
                            action={() => {
                                this.setCreateTaskModalVisibility(true)
                            }} />
                    </View>
                    <Text style={styles.createProjectSelectionButtonText}>You don't have any tasks here</Text>
                </View>
            );
        }
    }
    /* #endregion */



    /* #region  Notes Region */

    renderNotesSection() {
        return <Notes
            color={colorsProvider.projectsMainColor}
            notes={this.state.selectedItem.notes}
            editNotes={value => {
                this.props.editNotes(value);
                this.props.save();
            }} />
    }
    /* #endregion */

    render() {
        if (this.props.selectedItem != {}) {
            return (
                <Modal
                    propagateSwipe={true}
                    backdropOpacity={0}
                    animationIn='slideInRight'
                    animationInTiming={400}
                    animationOut='slideOutRight'
                    animationOutTiming={400}
                    isVisible={this.props.visible}
                    style={{ margin: 0 }}
                    onSwipeComplete={this.props.closeModal}
                    swipeDirection={"right"}>

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                        <View style={styles.outerView}>
                            {this.renderTopBar()}

                            {this.renderDoneSlider()}

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