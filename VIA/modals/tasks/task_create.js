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
import { SelectionModal } from '../selectionModal/selectionModal';
import { DateModal } from '../dateModal/dateModal';
import { NotesModal } from '../notesModal/notesModal';
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal';
import { Projects } from '../../db';
import { Controller } from '../controller';
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import Slider from '@react-native-community/slider';

import { Notifier } from '../../notifier/notifier'

const notifier = new Notifier;
const controller = new Controller();
const dateFormat = 'ddd, MMM Do, YY';
const todayDate = new Date();
const styles = require('./styles');

export class CreateTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTask: this.props.newTask,
            projectSelectionModalVisible: false,
            items: [],
            theSelectedProject: '',
            showDate: false,
            itemDate: '',
            itemNotificationTimes: '',
            newTaskImportance: 0,
            notificationTimesModal: false,
            newTaskName: '',
            itemNotes: '',
        };
    }

    componentDidMount() {
        controller.loadAll(this, Projects.TABLE_NAME);
    }

    /* #region  Top Bar Region */
    renderTopBarSection() {
        return (<View style={styles.topNav}>
            <TouchableOpacity
                style={styles.topNavBackButton}
                onPress={this.props.closeModal}>
                <SIcon
                    style={{
                        shadowColor: colorsProvider.homePlaceholderColor,
                        shadowOpacity: 0.8,
                        shadowRadius: 1.5,
                        shadowOffset: {
                            height: 1,
                            width: 0,
                        },
                    }}
                    name="arrow-left"
                    size={30}
                    color={colorsProvider.tasksComplimentaryColor}
                />
            </TouchableOpacity>
        </View>
        )
    }
    /* #endregion */

    /* #region  Name Section */
    renderNameSection() {
        return (<TouchableOpacity
            onPress={() => {
                this.nameTextInput.focus();
            }}
            style={
                this.state.newTaskName != ''
                    ? styles.hasNameTextInputContainer
                    : styles.createNameContainer
            }
        >
            <TextInput
                ref={input => {
                    this.nameTextInput = input;
                }}
                maxLength={40}
                style={styles.createNameText}
                multiline={true}
                placeholder={'Name'}
                onChangeText={value => {
                    this.setState({ newTaskName: value });
                    this.props.name(value);
                }}
            ></TextInput>
        </TouchableOpacity>)
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
                    }}
                    onSubmit={item => {
                        this.props.due_date(item);
                        this.setState({ itemDate: item });
                        this.setDueDateModalVisibility(false);
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
                    onPress={() => this.setDueDateModalVisibility(true)}>
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
            <TouchableOpacity style={styles.createNameContainer} onPress={() => this.setDueDateModalVisibility(true)}>
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
                    <View style={styles.sliderTitleContainerCenter}>
                        <Text
                            style={
                                this.state.newTaskImportance > 0
                                    ? styles.sliderTitle
                                    : styles.sliderTitleNull
                            }>
                            Importance
</Text>
                    </View>
                </View>

                <View style={styles.slidersContainer}>
                    {this.renderDueDateModal()}
                    <View style={styles.sliderContainerCenter}>
                        <Slider
                            style={styles.sliderSlider}
                            minimumValue={0}
                            maximumValue={100}
                            thumbTintColor={this.state.newTaskImportance > 0 ? colorsProvider.tasksComplimentaryColor : colorsProvider.tasksPlaceholderColor}
                            minimumTrackTintColor={colorsProvider.tasksComplimentaryColor}
                            maximumTrackTintColor={colorsProvider.tasksPlaceholderColor}
                            onSlidingComplete={value => {
                                this.setState({ newTaskImportance: value });
                                this.props.importance(value);
                            }}
                            onValueChange={value => {
                                this.setState({ newTaskImportance: value });
                                this.props.importance(value);
                            }}
                        />
                    </View>
                </View>
            </View>

        )

    }
    /* #endregion */

    /* #region  Project Selection Region */
    showProjectSelectionModal() {
        if (this.state.projectSelectionModalVisible) {
            return (
                <SelectionModal
                    animationType="fade"
                    items={this.state.items}
                    itemName="Project"
                    titleTextColor={colorsProvider.tasksComplimentaryColor}
                    titleContainerColor={colorsProvider.tasksMainColor}
                    transparent={true}
                    selectItem={item => {
                        this.props.project(item.key);
                        this.setState({ theSelectedProject: item.value.name }, () => { });
                    }}
                    closeModal={() => {
                        this.setProjectSelectionModalVisibility(false);
                    }}
                ></SelectionModal>
            );
        }
    }

    setProjectSelectionModalVisibility(visible) {
        this.setState({ projectSelectionModalVisible: visible });
    }

    renderProjectSelection() {
        if (this.state.theSelectedProject != '') {
            this.props.project = this.state.theSelectedProject;
            return (
                <View style={styles.projectSectionContainer}>
                    <TouchableOpacity
                        style={styles.hasProjectSelectionContainer}
                        onPress={() => {
                            this.setProjectSelectionModalVisibility(true);
                        }}
                    >
                        <Text style={styles.hasProjectSelectionButtonText}>
                            {this.state.theSelectedProject}
                        </Text>
                        <Text style={styles.notificationTimeButtonText}>
                            <SIcon name="layers" size={20} color={colorsProvider.tasksComplimentaryColor} />
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.projectSectionContainer}>
                    <TouchableOpacity
                        style={styles.createProjectSelectionContainer}
                        onPress={this.setProjectSelectionModalVisibility.bind(this)}
                    >
                        <Text style={styles.createProjectSelectionButtonText}>
                            Is this part of a bigger project?
          </Text>
                        <Text style={styles.notificationTimeButtonText}>
                            <SIcon name="layers" size={20} color={colorsProvider.tasksPlaceholderColor}/>
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
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
                    saveButtonBackgroundColor={colorsProvider.tasksComplimentaryColor}
					disabledSaveButtonBackgroundColor={colorsProvider.tasksComplimentaryColor}
                    setDate={item => {
                        this.props.notification_time(item);
                        this.setState({ itemNotificationTimes: item });
                    }}
                    closeModal={() => {
                        this.setNotificationTimesVisibility(false);
                    }}
                ></NotificationTimesModal>
            );
        }
        return null;
    }

    renderNotificationTimes() {
        var daysWithNotifications = '';
        var arr = this.state.itemNotificationTimes;

        Object.keys(arr).map(key => {
            if (arr[key].times.length > 0 && arr[key].checked == true) {
                daysWithNotifications = daysWithNotifications.concat(
                    arr[key].name + ', '
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
                    existingNotes={this.state.itemNotes}
                    backgroundColor={colorsProvider.tasksMainColor}
					buttonContainerNotChangedColor={colorsProvider.tasksPlaceholderColor}
					buttonContainerTextNotChangedColor={colorsProvider.tasksComplimentaryColor}
					textPlaceholderColor={colorsProvider.tasksPlaceholderColor}
					textChangedColor={colorsProvider.tasksComplimentaryColor}
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

    /* #region  Bottom Buttons Section */
    renderBottomButtons() {
        return (<View style={styles.bottomButtonsContainer}>
            <TouchableOpacity
                disabled={this.state.newTaskName != '' ? false : true}
                style={
                    this.state.newTaskName != ''
                        ? styles.bottomButtonLeft
                        : styles.bottomButtonLeftDisabled
                }
                onPress={() => {
                    notifier.scheduleAllNotifications();
                    this.props.save()
                }}
            >
                <Text
                    style={
                        this.state.newTaskName != ''
                            ? styles.bottomButtonTextDisabled
                            : styles.bottomButtonText
                    }
                >
                    Save
</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.bottomButtonRight}
                onPress={this.props.closeModal}
            >
                <Text style={styles.bottomButtonText}>Close</Text>
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

                {this.showProjectSelectionModal()}
                {this.renderNotificationTimesModal()}
                {this.renderNotesModal()}

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <SafeAreaView style={styles.outerView}>

                        {/* {TOP NAVIGATION SECTION} */}
                        {this.renderTopBarSection()}

                        {/* { NAME INPUT SECTION} */}
                        {this.renderNameSection()}

                        {/* { DUE DATE SECTION} */}
                        {this.renderDueDate()}

                        {/* { SLIDER SECTION} */}
                        {this.renderSliderSection()}

                        {/* {PROJECT SELECTION SECTION} */}
                        {this.renderProjectSelection()}

                        {/* {NOTIFICATION TIMES SECTION} */}
                        {this.renderNotificationTimes()}

                        {/* {NOTES SECTION} */}
                        {this.renderNotesSection()}

                        {/* {BOTTOM BUTTONS SECTION} */}
                        {this.renderBottomButtons()}

                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}
