import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'; // Version can be specified in package.json
import { DateModal } from '../dateModal/dateModal'
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal'
import { Database, Routines, Tasks } from '../../db'
import { SelectionModal } from '../selectionModal/selectionModal';
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import NotifService from '../../notifier/newNotifier';
import { TopBar, DoneSlider, CompleteButton, TrashButton, NotificationTimes, Notes, StartEndTime } from '../../components'



const controller = new Controller;
const timeDisplayFormat = 'hh:mm A'
const dateDisplayFormat = 'MMM Do'
const styles = require('./styles');
const empty = ""

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var year = new Date().getFullYear(); //Current Year
const todaysDate = year + '-' + month + '-' + date;
const dateToday = new Date(year, month, date);

export class ViewHabit extends React.Component {

    constructor(props) {
        super(props);
        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );
        this.state = {
            selectedItem: this.props.selectedItem,
            routineSelectionModalVisible: false,
            allPossibleParents: [],
            routine: null,
            routineName: empty,
            showDate: false,
            dueDate: '',
            notificationTimes: "",
            startTime: '',
            endTime: '',
            notesModalVisible: false,
        };
    }

    componentDidMount() {
        controller.getParents(this, Routines.TABLE_NAME);
        if (this.state.selectedItem.routine != "") {
            Database.getOne(Routines.TABLE_NAME, this.state.selectedItem.routine).then((res) => {
                this.setState({ routine: res.rows.item(0), routineName: res.rows.item(0).name })
            })
        }
        this.notif.scheduleAllNotifications()
    }

    onRegister(token) {
        this.setState({registerToken: token.token, fcmRegistered: true});
      }
    
      onNotif(notif) {
        Alert.alert(notif.title, notif.message);
      }
    
      handlePerm(perms) {
        Alert.alert('Permissions', JSON.stringify(perms));
      }


    getStyleIfDone() {
        if (this.props.selectedItem.completed == "true") {
            return styles.outerViewDone
        }
        return styles.outerView;
    }

    finishTask() {
        this.props.editCompleted("true")
    }

    /* #region  Top Bar Region */
    renderTopBar() {
        return <TopBar
            color={colorsProvider.habitsMainColor}
            parentColor={colorsProvider.routinesMainColor}
            fromCreate={false}
            nameOfItem={this.state.selectedItem.name}
            hasDueDate={false}
            importance={this.state.selectedItem.importance}
            parentType={"routine"}
            parent={this.state.selectedItem.routine}
            parentName={this.state.selectedItem.routineName}
            allParents={this.state.allPossibleParents}
            setParent={(id, name) => {
                this.props.editRoutine(id, name);
                this.setState({ routineName: name, routine: id });
                this.props.save();
            }}
            removeParent={() => {
                this.props.editRoutine(null, null)
                this.setState({ routineName: null, routine: null });
                this.props.save();
            }}
            closeModal={this.props.closeModal}
            editName={item => {
                this.setState({ name: item });
                this.props.editName(item);
                this.props.save();
            }}
            hasImportance={true}
            hasParent={true}
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
            selectParent={() => {
                Keyboard.dismiss();
                this.props.save();
            }}
            selectDueDate={date => {
            }}
        />
    }
    /* #endregion */

    /* #region  StartEndTime */
    renderStartEndTime() {
        return (<StartEndTime
            startTime={this.state.selectedItem.start_time}
            endTime={this.state.selectedItem.end_time}
            color={colorsProvider.habitsMainColor}
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
                    this.notif.scheduleAllNotifications();
                    this.props.delete()
                }} />
        </View>)
    }
    /* #endregion */


    /* #region  Notification Times Region */
    renderNotificationTimes() {
        return (<NotificationTimes
            color={colorsProvider.habitsMainColor}
            notificationTimes={this.state.selectedItem.notification_time}
            onPress={() => {
                this.setNotificationTimesVisibility(true);
            }}
            addNotificationTime={item => {
                this.props.editNotificationTime(item);
                this.setState({ notificationTimes: item })
                this.props.save();
                this.notif.scheduleAllNotifications();            }}
        />
        )
    }
    /* #endregion */

     /* #region  Notes Region */

     renderNotesSection() {
        return <Notes
            color={colorsProvider.habitsMainColor}
            notes={this.state.selectedItem.notes}
            editNotes={value => {
                this.props.editNotes(value);
                this.props.save();
            }} />
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
                            {/* Top Bar Section */}
                            {this.renderTopBar()}
                            {/* {this.renderStartEndTime()} */}

                            {this.renderCompleteAndTrashButton()}

                            {/* Sliders Section*/}
                            {/* {this.renderSliderSection()} */}

                            {/* Complete Button Section */}
                            {this.renderNotificationTimes()}

                            {/* Notification Times Section */}
                            {this.renderNotesSection()}

                            {/* {NOTES SECTION} */}
                            {/* {this.renderNotesSection()} */}

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}