import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import { Controller } from '../controller';
import { SelectionModal } from '../selectionModal/selectionModal'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal';
import { Database, Random } from '../../db'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Slider from '@react-native-community/slider';
import Modal from "react-native-modal";
import Moment from 'moment';
import { Notifier } from '../../notifier/notifier'
import { CheckBox } from 'react-native-elements'
import { TopBar, DoneSlider, CompleteButton, TrashButton, NotificationTimes, Notes } from '../../components'


const notifier = new Notifier;

const controller = new Controller;

const styles = require('./styles');
const emptyTimes = [
    {
        key: "1",
        name: "Monday",
        checked: false,
        times: []
    },
    {
        key: "2",
        name: "Tuesday",
        checked: false,
        times: []
    },
    {
        key: "3",
        name: "Wednesday",
        checked: false,
        times: []
    },
    {
        key: "4",
        name: "Thursday",
        checked: false,
        times: []
    },
    {
        key: "5",
        name: "Friday",
        checked: false,
        times: []
    },
    {
        key: "6",
        name: "Saturday",
        checked: false,
        times: []
    },
    {
        key: "7",
        name: "Sunday",
        checked: false,
        times: []
    },
]
const empty = ""
const todayDate = new Date();
const dateFormat = 'ddd, MMM Do, YY'

export class ViewRandom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: this.props.selectedItem,
            dueDate: '',
            notificationTimes: "",
        };
    }

    componentDidMount() {
        notifier.scheduleAllNotifications()
    }

    finishTask() {
        this.props.editCompleted("true")
    }

    /* #region  Top Bar Region */
    renderTopBar() {
        return <TopBar
            fromCreate={false}
            color={colorsProvider.randomMainColor}
            parentColor={null}
            nameOfItem={this.state.selectedItem.name}
            hasDueDate={true}
            dueDate={this.state.selectedItem.due_date}
            importance={this.state.selectedItem.importance}
            parentType={null}
            parent={null}
            parentName={null}
            setParent={(id, name) => {

            }}
            removeParent={() => {

            }}
            hasParent={false}
            closeModal={this.props.closeModal}
            editName={item => {
                this.props.editName(item);
                this.props.save();
                notifier.scheduleAllNotifications()
            }}
            hasImportance={true}
            selectDueDate={date => {
                this.props.editDueDate(date)
                this.setState({ dueDate: date })
                this.props.save();
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
                    this.finishTask();
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
                    notifier.scheduleAllNotifications();
                    this.props.delete()
                }} />
        </View>)
    }
    /* #endregion */


    /* #region  Complete Button Section */
    // renderCompleteButton() {
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
    // }

    renderCompleteButton() {
        if (this.state.selectedItem.completed == "true")
            return (<TouchableOpacity
                style={styles.completeButtonBodyDone}
                onLongPress={() => {
                    Keyboard.dismiss()
                    this.setState({ percentVal: 0 })
                    this.props.editCompleted("false")
                    this.props.editPercentageDone(0)
                }}
                onPress={() => {
                    Keyboard.dismiss()
                    this.setState({ percentVal: 100 })
                    this.props.editPercentageDone(100)
                    this.props.editCompleted("true")
                }}>
                <Text style={styles.completeButtonTextDone}>Done</Text>
            </TouchableOpacity>)
        else
            return (<TouchableOpacity
                style={styles.completeButtonBody}
                onLongPress={() => {
                    Keyboard.dismiss()
                    this.setState({ percentVal: 0 })
                    this.props.editCompleted("false")
                    this.props.editPercentageDone(0)
                }}
                onPress={() => {
                    Keyboard.dismiss()
                    this.setState({ percentVal: 100 })
                    this.props.editPercentageDone(100)
                    this.props.editCompleted("true")
                }}>
                <Text style={styles.completeButtonText}>Complete</Text>
            </TouchableOpacity>)
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
                    saveButtonBackgroundColor={colorsProvider.homeComplimentaryColor}
                    disabledSaveButtonBackgroundColor={colorsProvider.homePlaceholderColor}
                    saveButtonTextColor={colorsProvider.homeComplimentaryColor}
                    disabledSaveButtonTextColor={colorsProvider.homeComplimentaryColor}
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
                            Keyboard.dismiss()
                            this.setNotificationTimesVisibility(true);
                        }}>
                        <Text style={styles.hasNotificationTimeButtonText}>
                            {daysWithNotifications}
                        </Text>

                        <Text style={styles.notificationTimeButtonText}>
                            <SIcon name="bell" size={20} color={colorsProvider.homeMainColor} />
                        </Text>
                    </TouchableOpacity>
                );
            }
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

    /* #region  Only for Today Section */
    getChecked(item) {
        if (item != null)
            return this.state.selectedItem.only_today === "true"
    }

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
                    this.props.editOnlyToday(this.state.onlyTodayChecked)
                })
            }}
        />)
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
                    backgroundColor={colorsProvider.whiteColor}
                    buttonContainerNotChangedColor={colorsProvider.whiteColor}
                    buttonContainerTextNotChangedColor={colorsProvider.whitePlaceholderColor}
                    textPlaceholderColor={colorsProvider.whitePlaceholderColor}
                    textChangedColor={colorsProvider.homeComplimentaryColor}
                    buttonContainerTextNotChangedColor={colorsProvider.whitePlaceholderColor}
                    buttonTextPlaceholderColor={colorsProvider.homePlaceholderColor}
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
                        Keyboard.dismiss()
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
                    Keyboard.dismiss()
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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.outerView}>

                        {this.renderTopBar()}

                        {/* {this.renderOnlyForToday()} */}

                        {this.renderDoneSlider()}

                        {this.renderCompleteAndTrashButton()}

                        {/* {this.renderNotificationTimesSection()} */}

                        {/* {this.renderNotesSection()} */}

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}