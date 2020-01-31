import React from 'react';
import { Text, View, TouchableOpacity, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import { Controller } from '../controller';
import { SelectionModal } from '../selectionModal/selectionModal'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal';
import { Database, Projects } from '../../db'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Slider from '@react-native-community/slider';
import Modal from "react-native-modal";
import Moment from 'moment';

const controller = new Controller;

const styles = require('./styles');

const empty = ""
const todayDate = new Date();
const dateFormat = 'ddd, MMM Do, YY'

export class ViewRandom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: this.props.selectedItem,
            projectSelectionModalVisible: false,
            items: [],
            proj: null,
            projName: empty,
            theSelectedProject: empty,
            importance: this.props.selectedItem.importance,
            showDate: false,
            dueDate: '',
            notificationTimesModal: false,
            percentVal: this.props.selectedItem.percentage_done,
            importanceVal: this.props.selectedItem.importance,
            notesModalVisible: false,
            itemNotificationTimes: this.props.selectedItem.notification_time
        };
    }

    componentDidMount() {
        controller.loadAll(this, Projects.TABLE_NAME);
        if (this.state.selectedItem.project != empty) {
            Database.getOne(Projects.TABLE_NAME, this.state.selectedItem.project).then((res) => {
                this.setState({ proj: res.rows.item(0), projName: res.rows.item(0).name })
            })
        }
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
                <SIcon name="arrow-left" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.trashButton}
                onPress={this.props.delete}>
                <SIcon name="trash" size={30} color="#f00" />
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
                transparent={true}
                selectItem={(item) => {
                    this.props.editProject(item.value.id)
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
                        this.setProjectSelectionModalVisibility(true);
                    }}
                >
                    <Text style={styles.hasProjectSelectionButtonText}>
                        {this.state.projName}
                    </Text>
                    <Text style={styles.notificationTimeButtonText}>
                        <SIcon name="layers" size={20} color="#ffffff" />
                    </Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={styles.createProjectSelectionContainer}
                    onPress={this.setProjectSelectionModalVisibility.bind(this)}
                >
                    <Text style={styles.createProjectSelectionButtonText}>
                        Is this part of a bigger project?
          </Text>
                    <Text style={styles.notificationTimeButtonText}>
                        <SIcon name="layers" size={20} color="#ABABAB" />
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
                itemDate={this.props.selectedItem.due_date ? this.props.selectedItem.due_date : empty}
                itemName="Project"
                transparent={true}
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
                    <View style={styles.sliderTitleContainerLeft}>
                        <Text
                            style={
                                this.state.selectedItem.percentage_done > 0
                                    ? styles.sliderTitleNull
                                    : styles.sliderTitle
                            }>
                            % Done
                    </Text>
                    </View>
                    <View style={styles.sliderTitleContainerRight}>
                        <Text
                            style={
                                this.state.selectedItem.importance > 0
                                    ? styles.sliderTitleNull
                                    : styles.sliderTitle
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
                            minimumTrackTintColor={styles.blueColor}
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
                    <View style={styles.sliderContainerRight}>
                        <Slider
                            style={{ width: 250, height: 1, transform: [{ rotate: '270deg' }] }}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor={styles.blueColor}
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
                        this.setNotificationTimesVisibility(false);
                    }}
                ></NotificationTimesModal>
            );
        }
        return null;
    }


    renderNotificationTimesSection() {
        // console.warn(this.state.selectedItem.notification_time)
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
                            <SIcon name="bell" size={20} color="#ffffff" />
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
                    <SIcon name="bell" size={20} color="#ABABAB" />
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

                        {/* Top Bar Section */}
                        {this.renderTopBar()}

                        {/* Name Section */}
                        {this.renderNameSection()}

                        {/* Project Section*/}
                        {this.renderProjectSection()}

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