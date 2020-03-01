import React from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'; // Version can be specified in package.json
import { MultipleSelectionModal } from '../selectionModal/multipleSelectionModal'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal'
import { Database, Routines, Tasks } from '../../db'
import { SelectionModal } from '../selectionModal/selectionModal';
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import Slider from '@react-native-community/slider';
const controller = new Controller;
const dateFormat = 'hh:mm A'
const todayDate = new Date();
const styles = require('./styles');
var uuid = require('react-native-uuid');

import { Notifier } from '../../notifier/notifier'

const notifier = new Notifier;


export class CreateHabit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newHabit: this.props.newHabit,
            newHabitName: '',
            routineSelectionModalVisible: false,
            showStartDate: false,
            showEndDate: false,
            items: [],
            theSelectedRoutine: "",
            habitId: uuid.v4(),
            itemDate: '',
            itemNotificationTimes: '',
            notificationTimesModal: false,
            itemStartDate: '',
            itemEndDate: '',
        };
    }

    componentDidMount() {
        controller.loadAll(this, Routines.TABLE_NAME);
    }

    /* #region  Top Bar Region */
    renderTopBar() {
        return (<View style={styles.topNav}>
            <TouchableOpacity
                style={styles.topNavBackButton}
                onPress={this.props.closeModal}>
                <SIcon
                    style={{
                        shadowColor: '#ABABAB',
                        shadowOpacity: 0.8,
                        shadowRadius: 1.5,
                        shadowOffset: {
                            height: 1,
                            width: 0,
                        },
                    }}
                    name="arrow-left"
                    size={30}
                    color="#711E30"
                />
            </TouchableOpacity>
        </View>)
    }
    /* #endregion */

    /* #region  Name Input Region */
    renderNameInputSection() {
        return (<TouchableOpacity
            onPress={() => {
                this.nameTextInput.focus();
            }}
            style={
                this.state.newHabitName != ''
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
                    this.setState({ newHabitName: value });
                    this.props.name(value);
                    this.props.id(this.state.habitId);
                }}
            ></TextInput>
        </TouchableOpacity>)
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
                    disabledSaveButtonBackgroundColor="#D6A2AD"
                    saveButtonBackgroundColor="#D6A2AD"
                    transparent={true}
                    setDate={item => {
                        this.props.start_time(item);
                        this.setState({ itemStartDate: item });
                    }}
                    onSubmit={item => {
                        this.props.start_time(item);
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
        if (this.state.itemStartDate != '') {
            return (
                <View style={styles.createNameContainer}>
                    <TouchableOpacity
                        onPress={() => this.setStartDateModalVisibility(true)}
                    >
                        <Text style={styles.hasDateText}>
                            {Moment(new Date(this.state.itemStartDate)).format(dateFormat)}
                        </Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.createSelectedDateText}>
						{Moment(new Date(this.state.itemStartDate)).diff({ todayDate }, 'days') +
							' days left'}
					</Text> */}
                </View>
            );
        }
        return (
            <View style={styles.createNameContainer}>
                <TouchableOpacity onPress={() => this.setStartDateModalVisibility(true)}>
                    <Text style={styles.createDateText}>
                        When do you want this habit to start?
          </Text>
                </TouchableOpacity>
            </View>
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
                    disabledSaveButtonBackgroundColor="#D6A2AD"
                    saveButtonBackgroundColor="#D6A2AD"
                    transparent={true}
                    setDate={item => {
                        this.props.end_time(item);
                        this.setState({ itemEndDate: item });
                    }}
                    onSubmit={item => {
                        this.props.end_time(item);
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
        if (this.state.itemEndDate != '') {
            return (
                <View style={styles.createNameContainer}>
                    <TouchableOpacity
                        onPress={() => this.setEndDateModalVisibility(true)}
                    >
                        <Text style={styles.hasDateText}>
                            {Moment(new Date(this.state.itemEndDate)).format(dateFormat)}
                        </Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.createSelectedDateText}>
						{Moment(new Date(this.state.itemEndDate)).diff({ todayDate }, 'days') +
							' days left'}
					</Text> */}
                </View>
            );
        }
        return (
            <View style={styles.createNameContainer}>
                <TouchableOpacity onPress={() => this.setEndDateModalVisibility(true)}>
                    <Text style={styles.createDateText}>
                        When do you want this habit to end?
          </Text>
                </TouchableOpacity>
            </View>
        );
    }

    /* #endregion */

    /* #region  Routine Selection Region */
    showRoutineSelectionModal() {
        if (this.state.routineSelectionModalVisible) {
            return (
                <SelectionModal
                    animationType="fade"
                    items={this.state.items}
                    itemName="Routine"
                    titleTextColor="#9C7639"
                    titleContainerColor="#E5C797"
                    transparent={true}
                    selectItem={item => {
                        this.props.routine(item.key);
                        this.setState({ theSelectedRoutine: item.value.name }, () => { });
                    }}
                    closeModal={() => {
                        this.setRoutineSelectionModalVisibility(false);
                    }}
                ></SelectionModal>
            );
        }
    }

    setRoutineSelectionModalVisibility(visible) {
        this.setState({ routineSelectionModalVisible: visible });
    }

    renderRoutineSelection() {
        if (this.state.theSelectedRoutine != '') {
            this.props.routine = this.state.theSelectedRoutine;
            return (
                <View style={styles.routineSectionContainer}>
                    <TouchableOpacity
                        style={styles.hasProjectSelectionContainer}
                        onPress={() => {
                            this.setRoutineSelectionModalVisibility(true);
                        }}
                    >
                        <Text style={styles.hasProjectSelectionButtonText}>
                            {this.state.theSelectedRoutine}
                        </Text>
                        <Text style={styles.notificationTimeButtonText}>
                            <SIcon name="refresh" size={20} color="#711E30" />
                        </Text>
                    </TouchableOpacity></View>
            );
        } else {
            return (
                <View style={styles.routineSectionContainer}>
                    <TouchableOpacity
                        style={styles.createProjectSelectionContainer}
                        onPress={this.setRoutineSelectionModalVisibility.bind(this)}
                    >
                        <Text style={styles.createProjectSelectionButtonText}>
                            Is this part of a bigger routine?
          </Text>
                        <Text style={styles.notificationTimeButtonText}>
                            <SIcon name="refresh" size={20} color="#A77E8C" />
                        </Text>
                    </TouchableOpacity></View>
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
                    saveButtonBackgroundColor={"#D6A2AD"}
                    disabledSaveButtonBackgroundColor={"#A77E8C"}
                    saveButtonTextColor={"711E30"}
                    disabledSaveButtonTextColor={"#711E30"}
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
                        <SIcon name="bell" size={20} color="#711E30" />
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
                    <SIcon name="bell" size={20} color="#A77E8C" />
                </Text>
            </TouchableOpacity>
        );
    }
    /* #endregion */

    /* #region  Bottom Buttons Region */
    renderBottomButtons() {
        return (<View style={styles.bottomButtonsContainer}>
            <TouchableOpacity
                disabled={this.state.newHabitName != '' ? false : true}
                style={
                    this.state.newHabitName != ''
                        ? styles.bottomButtonLeft
                        : styles.bottomButtonLeftDisabled
                }
                onPress={() => {
                    notifier.scheduleAllNotifications()
                    this.props.save()
                }}>
                <Text
                    style={
                        this.state.newHabitName != ''
                            ? styles.bottomButtonTextDisabled
                            : styles.bottomButtonText
                    }>
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
                onRequestClose={this.props.onRequestClose}
            >
                {this.showRoutineSelectionModal()}
                {this.renderEndDateModal()}
                {this.renderStartDateModal()}
                {this.renderNotificationTimesModal()}

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <SafeAreaView style={styles.outerView}>

                        <View>
                            {/* {TOP NAVIGATION REGION} */}
                            {this.renderTopBar()}

                            {/* {NAME CONTAINER} */}
                            {this.renderNameInputSection()}

                            {/* {Start Date SECTION} */}
                            {this.renderStartDate()}

                            {/* {End Date SECTION} */}
                            {this.renderEndDate()}

                            {/* {PROJECT SELECTION SECTION} */}
                            {this.renderRoutineSelection()}

                            {/* {NOTIFICATION TIMES SECTION} */}
                            {this.renderNotificationTimes()}


                            {/* {NOTES SECTION} */}
                            {/* {this.renderNotesSection()} */}

                        </View>
                        {/* {BOTTOM BUTTONS SECTION} */}
                        {this.renderBottomButtons()}
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}