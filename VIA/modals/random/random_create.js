import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { DateModal } from '../dateModal/dateModal';
import { NotesModal } from '../notesModal/notesModal';
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal';
import { Projects } from '../../db';
import { Controller } from '../controller';
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import Slider from '@react-native-community/slider';
import { CheckBox } from 'react-native-elements'

const controller = new Controller();
const dateFormat = 'ddd, MMM Do, YY';
const todayDate = new Date();
const styles = require('./styles');


export class CreateRandom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newRandom: this.props.newRandom,
            items: [],
            theSelectedProject: '',
            showDate: false,
            itemDate: '',
            itemNotificationTimes: '',
            newRandomImportance: 0,
            notificationTimesModal: false,
            newRandomName: '',
            itemNotes: '',
            onlyTodayChecked: false,
        };
    }
    componentDidMount() {
        controller.loadAll(this, Projects.TABLE_NAME);
    }

    /* #region Top Bar Region */
    renderTopNavigation() {
        return (<View style={styles.topNav}>
            <TouchableOpacity
                style={styles.topNavBackButton}
                onPress={this.props.closeModal}>
                <SIcon
                    name="arrow-left"
                    size={30}
                    color={colorsProvider.homeTextColor}
                />
            </TouchableOpacity>
        </View>)
    }

    /* #endregion */

    /* #region  Name Input Section */
    renderNameInputSection() {
        return (<TouchableOpacity
            onPress={() => {
                this.nameTextInput.focus();
            }}
            style={
                this.state.newRandomName != ''
                    ? styles.hasNameTextInputContainer
                    : styles.createNameContainer
            }>
            <TextInput
                ref={input => {
                    this.nameTextInput = input;
                }}
                maxLength={40}
                style={styles.createNameText}
                multiline={true}
                placeholder={'Name'}
                onChangeText={value => {
                    this.setState({ newRandomName: value });
                    this.props.name(value);
                }}>
            </TextInput>
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
                    disabledSaveButtonBackgroundColor={colorsProvider.homeComplimentaryColor}
                    saveButtonBackgroundColor={colorsProvider.homeComplimentaryColor}
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
                    onPress={() => {
                        Keyboard.dismiss
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
    setNotificationTimesVisibility(visible) {
        this.setState({ notificationTimesModal: visible });
    }

    renderNotificationTimesModal() {
        if (this.state.notificationTimesModal) {
            return (
                <NotificationTimesModal
                    animationType="fade"
                    transparent={true}
                    saveButtonBackgroundColor={colorsProvider.homeComplimentaryColor}
                    disabledSaveButtonBackgroundColor={colorsProvider.homePlaceholderColor}
                    saveButtonTextColor={colorsProvider.homeComplimentaryColor}
                    disabledSaveButtonTextColor={colorsProvider.homeComplimentaryColor}
                    saveButtonBackgroundColor={colorsProvider.homeComplimentaryColor}
                    disabledSaveButtonBackgroundColor={colorsProvider.homeComplimentaryColor}
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
                        Keyboard.dismiss()
                        this.setNotificationTimesVisibility(true);
                    }}>
                    <Text style={styles.hasNotificationTimeButtonText}>
                        {daysWithNotifications}
                    </Text>

                    <Text style={styles.notificationTimeButtonText}>
                        <SIcon name="bell" size={20} color={colorsProvider.homeComplimentaryColor} />
                    </Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity
                style={styles.notificationTimesButtonContainer}
                onPress={() => {
                    Keyboard.dismiss()
                    this.setNotificationTimesVisibility(true);
                }}>
                <Text style={styles.notificationTimeButtonText}>
                    When would you like to be notified?
        </Text>

                <Text style={styles.notificationTimeButtonText}>
                    <SIcon name="bell" size={20} color={colorsProvider.whitePlaceholderColor} />
                </Text>
            </TouchableOpacity>
        );
    }
    /* #endregion */

    /* #region  Only For Today Modal */
    renderOnlyForToday() {
        return (<CheckBox
            center
            title={"Do you want this task to be removed after today?"}
            checkedIcon={colorsProvider.checkboxIcon}
            uncheckedIcon={colorsProvider.checkboxIcon}
            checkedColor={colorsProvider.homeComplimentaryColor}
            uncheckedColor={colorsProvider.whitePlaceholderColor}
            checked={this.state.onlyTodayChecked}
            textStyle={this.state.onlyTodayChecked ? styles.onlyForTodayCheckboxTextChecked : styles.onlyForTodayCheckboxText}
            containerStyle={styles.onlyForTodayContainer}
            onPress={() => {
                Keyboard.dismiss()
                var checked = this.state.onlyTodayChecked;
                this.setState({ onlyTodayChecked: !checked }, () => {
                    this.props.only_today(this.state.onlyTodayChecked)
                })
            }}
        />)
    }

    /* #endregion */

    /* #region  Slider Section */
    renderSliderSection() {
        return (<View style={styles.slidersSection}>
            <View style={styles.slidersTitlesContainer}>
                <View style={styles.sliderTitleContainerCenter}>
                    <Text
                        style={
                            this.state.newRandomImportance > 0
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
                        thumbTintColor={this.state.newRandomImportance > 0 ? colorsProvider.homeComplimentaryColor : colorsProvider.whitePlaceholderColor}
                        minimumTrackTintColor={colorsProvider.homeComplimentaryColor}
                        maximumTrackTintColor={styles.placeholderColor}
                        onSlidingComplete={value => {
                            this.setState({ newRandomImportance: value });
                            this.props.importance(value);
                        }}
                        onValueChange={value => {
                            Keyboard.dismiss()
                            this.setState({ newRandomImportance: value });
                            this.props.importance(value);
                        }}
                    />
                </View>
            </View>
        </View>)
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
                    backgroundColor={colorsProvider.whiteColor}
                    buttonContainerNotChangedColor={colorsProvider.whiteColor}
                    buttonContainerTextNotChangedColor={colorsProvider.whitePlaceholderColor}
                    textPlaceholderColor={colorsProvider.whitePlaceholderColor}
                    textChangedColor={colorsProvider.homeComplimentaryColor}
                    buttonContainerTextNotChangedColor={colorsProvider.whitePlaceholderColor}
                    buttonTextPlaceholderColor={colorsProvider.homePlaceholderColor}
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

    /* #region  Bottom Buttons Region */
    renderBottomButtons() {
        return (
            // <View style={styles.bottomButtonsContainer}>
            //     <TouchableOpacity
            //         disabled={this.state.newRandomName != '' ? false : true}
            //         style={
            //             this.state.newRandomName != ''
            //                 ? styles.bottomButtonLeft
            //                 : styles.bottomButtonLeftDisabled
            //         }
            //         onPress={() => {
            //             // notifier.scheduleAllNotifications() 
            //             this.props.save()
            //         }}>
            //         <Text
            //             style={
            //                 this.state.newRandomName != ''
            //                     ? styles.bottomButtonTextDisabled
            //                     : styles.bottomButtonText
            //             }>
            //             Save</Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity
            //         style={styles.bottomButtonRight}
            //         onPress={this.props.closeModal}>
            //         <Text style={styles.bottomButtonText}>Close</Text>
            //     </TouchableOpacity>
            // </View>
            <View style={styles.bottomButtonsContainer}>
                <TouchableOpacity
                    style={styles.bottomButtonLeftClose}
                    onPress={this.props.closeModal}>
                    <Text style={styles.bottomButtonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={this.state.newRandomName != '' ? false : true}
                    style={
                        this.state.newRandomName != ''
                            ? styles.bottomButtonRight
                            : styles.bottomButtonRightDisabled
                    }
                    onPress={() => {
                        notifier.scheduleAllNotifications();
                        this.props.save()
                    }}>
                    <Text style={this.state.newRandomName != '' ? styles.bottomButtonTextDisabled : styles.bottomButtonText}> Save</Text>
                </TouchableOpacity>
            </View >
        )
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
                    <SafeAreaView style={styles.outerView}>

                        {/* {TOP NAVIGATION REGION} */}
                        {this.renderTopNavigation()}

                        {/* {NAME CONTAINER} */}
                        {this.renderNameInputSection()}

                        {this.renderDueDate()}
                        {this.renderNotificationTimesModal()}
                        {this.renderNotesModal()}

                        {/* {SLIDER SECTION} */}
                        {this.renderSliderSection()}
                        {this.renderOnlyForToday()}
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
