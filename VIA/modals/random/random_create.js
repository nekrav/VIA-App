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
import NotifService from '../../notifier/newNotifier';
import { TopBar, NotificationTimes, Notes, CompleteButton, TrashButton, StartEndTime, ChildrenContainer } from '../../components'



const controller = new Controller();

const dateFormat = 'ddd, MMM Do, YY';

const styles = require('./styles');


export class CreateRandom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            dueDate: '',
            importance: '',
            notificationTimes: "",
            notes: '',
            onlyTodayChecked: false,
            specificNotificationDates: [],
        };
    }

    onRegister(token) {
        this.setState({ registerToken: token.token, fcmRegistered: true });
    }

    onNotif(notif) {
        //Alert.alert(notif.title, notif.message);
    }

    handlePerm(perms) {
        //Alert.alert('Permissions', JSON.stringify(perms));
    }

    addToArray(arr, toAdd) {
        var newArr = arr.concat(toAdd)
        return newArr;
    }




    /* #region  Top Bar Region */
    renderTopBar() {
        return <TopBar
            color={colorsProvider.randomMainColor}
            fromCreate={true}
            nameOfItem={this.state.name}
            hasDueDate={true}
            dueDate={this.state.dueDate}
            importance={this.state.importance}
            parent={null}
            parentName={null}
            allParents={null}
            closeModal={this.props.closeModal}
            editName={item => {
                this.setState({ name: item });
                this.props.name(item);
            }}
            hasImportance={true}
            hasParent={false}
            setImportanceNN={() => {
                Keyboard.dismiss()
                this.props.setImportanceNN(1)
            }}
            setImportanceNU={() => {
                Keyboard.dismiss()
                this.props.setImportanceNU(2)
            }}
            setImportanceIN={() => {
                Keyboard.dismiss()
                this.props.setImportanceIN(3)
            }}
            setImportanceIU={() => {
                Keyboard.dismiss()
                this.props.setImportanceIU(4)
            }}
            selectParent={() => {
                Keyboard.dismiss();
                this.setProjectSelectionModalVisibility(true);
            }}
            selectDueDate={date => {
                this.props.due_date(date);
                this.setState({ dueDate: date });
            }}
        />
    }
    /* #endregion */

    /* #region  Notification Times Region */
    renderNotificationTimes() {
        return (<NotificationTimes
            color={colorsProvider.randomMainColor}
            notificationTimes={this.state.notificationTimes}
            specificNotificationDates={this.state.specificNotificationDates}
            saveSpecificNotificationDates={(dates) => {
                this.props.saveSpecificNotificationDates(dates);
            }}
            onPress={() => {
                this.setNotificationTimesVisibility(true);
            }}
            addNotificationTime={item => {
                this.setState({ notificationTimes: item, })
            }}
        />
        )
    }
    /* #endregion */

    /* #region Only For Today */
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

    /* #region  Notes Region */
    renderNotesSection() {
        return <Notes
            color={colorsProvider.randomMainColor}
            notes={this.state.notes}
            editNotes={value => {
                this.props.notes(value);
            }} />
    }
    /* #endregion */

    /* #region  Bottom Buttons Section */
    renderBottomButtons() {
        return (<View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 50,
        }}>
            <TouchableOpacity
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 20,
                    backgroundColor: colorsProvider.closeButtonColor
                }}
                onPress={this.props.closeModal}>
                <Text style={{
                    fontSize: 18,
                    textAlign: 'center',
                    fontFamily: colorsProvider.font,
                    color: colorsProvider.whiteColor,
                    margin: 10,
                }}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                disabled={this.state.name != '' ? false : true}
                style={
                    this.state.name != ''
                        ? {
                            flex: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            borderRadius: 20,
                            borderWidth: 2,
                            borderColor: colorsProvider.setButtonColor,
                            backgroundColor: colorsProvider.completeButtonColor
                        }
                        : {
                            flex: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            borderWidth: 2,
                            borderRadius: 20,
                            borderColor: colorsProvider.completeButtonColor,
                        }
                }
                onPress={() => {
                    global.notifier.scheduleAllNotifications();
                    this.props.notification_time(this.state.notificationTimes);
                    this.props.save()
                }}>
                <Text style={this.state.name != '' ? styles.bottomButtonTextDisabled : styles.bottomButtonText}> Save</Text>
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

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.outerView}>

                        {this.renderTopBar()}

                        {/* {this.renderOnlyForToday()} */}

                        {this.renderNotificationTimes()}

                        {this.renderNotesSection()}

                        {this.renderBottomButtons()}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}
