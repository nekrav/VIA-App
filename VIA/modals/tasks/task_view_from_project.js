import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import { Controller } from '../controller';
import { SelectionModal } from '../selectionModal/selectionModal'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
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
const timeDisplayFormat = 'hh:mm A'

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var year = new Date().getFullYear(); //Current Year
const dateDisplayFormat = 'MMM Do'
const todayDate = new Date();
const dateFormat = 'ddd, MMM Do, YY'
const dateToday = new Date(year, month, date);


export class ViewTaskFromProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: this.props.theChildItem,
            projectSelectionModalVisible: false,
            items: [],
            proj: null,
            projName: empty,
            theSelectedProject: empty,
            showDate: false,
            dueDate: '',
            notificationTimesModal: false,
            notesModalVisible: false,
        };
    }

    getStyleIfDone() {
        if (this.state.selectedItem.completed == "true") {
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
                <SIcon name="arrow-left" size={30} color={colorsProvider.tasksComplimentaryColor} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.trashButton}
                onPress={() => {
                    notifier.scheduleAllNotifications();
                    this.props.visible = false;
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
                value={this.state.selectedItem.name}
                onChangeText={this.props.editName}>
            </TextInput>
        </TouchableOpacity>)
    }

    /* #endregion */

    /* #region  Project Selection Region */
    setProjectSelectionModalVisibility(visible) {
        this.setState({ projectSelectionModalVisible: visible })
    }


    showProjectSelectionModal() {
        if (this.state.projectSelectionModalVisible) {
            return <SelectionModal
                animationType="fade"
                items={this.state.items}
                itemName="Project"
                titleTextColor={colorsProvider.projectsComplimentaryColor}
                titleContainerColor={colorsProvider.projectsMainColor}
                transparent={true}
                selectItem={(item) => {
                    this.props.editProject(item.value.id, item.value.name)
                    this.setState({ projName: item.value.name })
                    this.props.save();
                }}
                closeModal={() => { this.setProjectSelectionModalVisibility(false) }}>
            </SelectionModal>
        }
        return null;
    }

    renderProjectSection() {
        if (this.state.projName != empty) {
            this.props.project = this.state.theSelectedProject;
            return (
                <TouchableOpacity
                    style={styles.hasProjectSelectionContainer}
                    onPress={() => {
                        Keyboard.dismiss();
                        this.setProjectSelectionModalVisibility(true);
                    }}>
                    <Text style={styles.hasProjectSelectionButtonText}>
                        {this.state.projName}
                    </Text>
                    <Text style={styles.notificationTimeButtonText}>
                        <SIcon name="layers" size={20} color={colorsProvider.tasksComplimentaryColor} />
                    </Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={styles.createProjectSelectionContainer}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.setProjectSelectionModalVisibility(true)
                    }}>
                    <Text style={styles.createProjectSelectionButtonText}>
                        Is this part of a bigger project?
          </Text>
                    <Text style={styles.notificationTimeButtonText}>
                        <SIcon name="layers" size={20} color={colorsProvider.tasksPlaceholderColor} />
                    </Text>
                </TouchableOpacity>
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
                itemDate={this.state.selectedItem.due_date ? this.state.selectedItem.due_date : empty}
                itemName="Project"
                disabledSaveButtonBackgroundColor={colorsProvider.tasksMainColor}
                saveButtonBackgroundColor={colorsProvider.tasksMainColor}
                transparent={true}
                setDate={(item) => {
                    this.props.editDueDate(item)
                    this.props.save();
                }}
                onSubmit={item => {
                    this.props.editDueDate(item);
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
                        {Moment(new Date(this.state.selectedItem.due_date)).format(dateFormat)}
                    </Text>

                    <Text style={styles.createSelectedDateText}>
                        {Moment(new Date(this.state.selectedItem.due_date)).diff({ todayDate }, 'days') +
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

    /* #region  Slider Region */
    renderSliderSection() {
        return (
            <View style={styles.slidersSection}>
                <View style={styles.slidersTitlesContainer}>
                    <View style={styles.sliderTitleContainerLeft}>
                        <Text
                            style={
                                this.state.selectedItem.percentage_done > 0
                                    ? styles.sliderTitle
                                    : styles.sliderTitleNull
                            }>
                            % Done
                    </Text>
                    </View>
                    <View style={styles.sliderTitleContainerRight}>
                        <Text
                            style={
                                this.state.selectedItem.importance > 0
                                    ? styles.sliderTitle
                                    : styles.sliderTitleNull
                            }>
                            Importance
                    </Text>
                    </View>
                </View>
                <View style={styles.slidersContainer}>
                    <View style={styles.sliderContainerLeft}>
                        <Slider
                            style={{ width: 250, height: 1, transform: [{ rotate: '270deg' }] }}
                            minimumValue={0}
                            maximumValue={100}
                            thumbTintColor={this.state.selectedItem.percentage_done > 0 ? colorsProvider.projectsComplimentaryColor : colorsProvider.projectsPlaceholderColor}
                            minimumTrackTintColor={colorsProvider.tasksComplimentaryColor}
                            maximumTrackTintColor={colorsProvider.tasksPlaceholderColor}
                            value={parseInt(this.state.selectedItem.percentage_done)}
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
                    <View style={styles.sliderContainerRight}>
                        <Slider
                            style={{ width: 250, height: 1, transform: [{ rotate: '270deg' }] }}
                            minimumValue={0}
                            maximumValue={100}
                            thumbTintColor={this.state.selectedItem.importance > 0 ? colorsProvider.projectsComplimentaryColor : colorsProvider.projectsPlaceholderColor}
                            minimumTrackTintColor={colorsProvider.tasksComplimentaryColor}
                            maximumTrackTintColor={colorsProvider.tasksPlaceholderColor}
                            value={parseInt(this.state.selectedItem.importance)}
                            onValueChange={(value) => {
                                Keyboard.dismiss()
                                this.props.save();
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

    // /* #region  Complete Button Section */

    // renderCompleteButton() {
    //     return (<TouchableOpacity
    //         style={styles.completeButtonBody}
    //         onLongPress={() => {
    //             this.setState({ percentVal: 0 })
    //             this.props.editCompleted("false")
    //             this.props.editPercentageDone(0)
    //         }
    //         }
    //         onPress={() => {
    //             this.setState({ percentVal: 100 })
    //             this.props.editPercentageDone(100)
    //             this.props.editCompleted("true")

    //         }
    //         }>
    //         {this.renderCompleteButtonText()}
    //     </TouchableOpacity>)
    // }

    // renderCompleteButtonText() {
    //     if (this.state.selectedItem.completed == "true")
    //         return (<Text style={styles.completeButtonText}>Done</Text>)
    //     else
    //         return (<Text style={styles.completeButtonText}>Complete</Text>)
    // }
    // /* #endregion */

        /* #region  Complete Button Section */
        renderCompleteButton() {
            if (this.state.selectedItem.completed == "true") {
                if (this.state.selectedItem.finished_date == null) {
                    return (
                        <TouchableOpacity
                            style={styles.completeButtonBodyDone}
                            onLongPress={() => {
                                Keyboard.dismiss()
                                let temp = this.state.selectedItem
                                temp.percentage_done = 0
                                this.setState({ selectedItem: temp })
                                this.props.editCompleted("false")
                                this.props.editPercentageDone(0)
                                this.props.editFinishedDate("");
                            }}
                            onPress={() => {
                                Keyboard.dismiss();
                                let temp = this.state.selectedItem
                                temp.percentage_done = 100
                                this.setState({ selectedItem: temp })
                                this.props.editPercentageDone(100)
                                this.props.editCompleted("true")
                                this.props.editFinishedDate(new Date(Date.now()));
                            }}>
                            <Text style={styles.completeButtonText}>Done <Text style={{ fontSize: 10, }}>(finished on: no finished date info)</Text></Text>
                        </TouchableOpacity>
    
                    )
                }
                return (
                    <TouchableOpacity
                        style={styles.completeButtonBodyDone}
                        onLongPress={() => {
                            Keyboard.dismiss()
                            let temp = this.state.selectedItem
                            temp.percentage_done = 0
                            this.setState({ selectedItem: temp })
                            this.props.editCompleted("false")
                            this.props.editPercentageDone(0)
                            this.props.editFinishedDate("");
                        }}
                        onPress={() => {
                            Keyboard.dismiss();
                            let temp = this.state.selectedItem
                            temp.percentage_done = 100
                            this.setState({ percentVal: 100 })
                            this.props.editPercentageDone(100)
                            this.props.editCompleted("true")
                            this.props.editFinishedDate(new Date(Date.now()));
                        }}>
                        <Text style={styles.completeButtonText}>Done <Text style={{ fontSize: 14, }}>(finished on: {Moment(new Date(this.state.selectedItem.finished_date.toString())).format(dateDisplayFormat)})</Text></Text>
                    </TouchableOpacity>
    
                )
            }
            else
                return (
                    <TouchableOpacity
                        style={styles.completeButtonBody}
                        onLongPress={() => {
                            let temp = this.state.selectedItem
                            temp.percentage_done = 0
                            this.setState({ selectedItem: temp })
                            this.props.editCompleted("false")
                            this.props.editPercentageDone(0)
                        }
                        }
                        onPress={() => {
                            let temp = this.state.selectedItem
                            temp.percentage_done = 100
                            this.setState({ percentVal: 100 })
                            this.props.editPercentageDone(100)
                            this.props.editCompleted("true")
                            this.props.editFinishedDate(dateToday.toString());
                        }
                        }>
                        <Text style={styles.completeButtonText}>Complete</Text>
                    </TouchableOpacity >
                )
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
                    saveButtonBackgroundColor={colorsProvider.tasksComplimentaryColor}
                    disabledSaveButtonBackgroundColor={colorsProvider.tasksComplimentaryColor}
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
                            <SIcon name="bell" size={20} color={colorsProvider.tasksComplimentaryColor} />
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
                    <SIcon name="bell" size={20} color={colorsProvider.tasksPlaceholderColor} />
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
                    backgroundColor={colorsProvider.tasksMainColor}
                    buttonContainerNotChangedColor={colorsProvider.tasksPlaceholderColor}
                    buttonContainerTextNotChangedColor={colorsProvider.tasksMainColor}
                    textPlaceholderColor={colorsProvider.tasksPlaceholderColor}
                    textChangedColor={colorsProvider.tasksComplimentaryColor}
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
                {this.renderShowDate()}
                {this.showProjectSelectionModal()}
                {this.renderNotesModal()}
                {this.renderNotificationTimesModal()}

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <SafeAreaView style={this.getStyleIfDone()}>

                        {this.renderTopBar()}

                        {this.renderNameSection()}

                        {this.renderProjectSection()}

                        {this.renderDueDate()}

                        {this.renderSliderSection()}

                        {this.renderCompleteButton()}

                        {this.renderNotificationTimesSection()}

                        {this.renderNotesSection()}

                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}