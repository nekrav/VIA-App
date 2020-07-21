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
import { Notifier } from '../../notifier/notifier'
import { TopBar, DoneSlider, CompleteButton, TrashButton, NotificationTimes, Notes, StartEndTime } from '../../components'


const notifier = new Notifier;
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
        notifier.scheduleAllNotifications()
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
                    this.setState({ selectedItem })
                    this.props.save();

                }}
                onCompletePressed={() => {
                    Keyboard.dismiss();
                    this.setState({ percentVal: 10 })
                    this.props.editPercentageDone(10)
                    this.props.editCompleted("true")
                    this.props.editFinishedDate(new Date(Date.now()));
                    this.props.save();
                    this.setState({ selectedItem })
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
                notifier.scheduleAllNotifications();            }}
        />
        )
    }
    /* #endregion */

     /* #region  Notes Region */

     renderNotesSection() {
        return <Notes
            color={colorsProvider.habitsMainColor}
            notes={this.state.notes}
            editNotes={value => {
                this.props.editNotes(value);
            }} />
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
                    disabledSaveButtonBackgroundColor={colorsProvider.habitsMainColor}
                    saveButtonBackgroundColor={colorsProvider.habitsMainColor}
                    transparent={true}
                    setDate={item => {
                        this.props.editStartTime(item);
                        this.setState({ itemStartDate: item });
                    }}
                    onSubmit={item => {
                        this.props.editStartTime(item);
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
        if (this.state.selectedItem.start_time != '') {
            return (
                <TouchableOpacity
                    style={styles.createDueDateContainer}
                    onPress={() => {
                        Keyboard.dismiss();
                        this.setStartDateModalVisibility(true)
                    }}>
                    <Text style={styles.createSelectedDateText}>
                        {Moment(new Date(this.state.selectedItem.start_time)).format(timeDisplayFormat)}
                    </Text>
                    <Text style={styles.notificationTimeButtonText}>
                        <SIcon name="control-play" size={20} color={colorsProvider.habitsComplimentaryColor} />
                    </Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity style={styles.createNameContainer} onPress={() => {
                Keyboard.dismiss();
                this.setStartDateModalVisibility(true)
            }}>
                <Text style={styles.createDateText}>
                    When do you want this habit to start?
                </Text>
                <Text style={styles.notificationTimeButtonText}>
                    <SIcon name="control-play" size={20} color={colorsProvider.habitsPlaceholderColor} />
                </Text>
            </TouchableOpacity>
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
                    disabledSaveButtonBackgroundColor={colorsProvider.habitsMainColor}
                    saveButtonBackgroundColor={colorsProvider.habitsMainColor}
                    transparent={true}
                    setDate={item => {
                        this.props.editEndTime(item);
                        this.setState({ itemEndDate: item });
                    }}
                    onSubmit={item => {
                        this.props.editEndTime(item);
                        this.setState({ itemEndDate: item });
                        this.setEndDateModalVisibility(false);
                    }}
                    closeModal={() => {
                        this.setEndDateModalVisibility(false);
                    }}>
                </DateModal>
            );
        }
        return null;
    }

    renderEndDate() {
        if (this.state.selectedItem.end_time != '') {
            return (
                <TouchableOpacity
                    style={styles.createDueDateContainer}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.setEndDateModalVisibility(true)
                    }}>
                    <Text style={styles.createSelectedDateText}>
                        {Moment(new Date(this.state.selectedItem.end_time)).format(timeDisplayFormat)}
                    </Text>
                    <Text style={styles.notificationTimeButtonText}>
                        <SIcon name="control-end" size={20} color={colorsProvider.habitsComplimentaryColor} />
                    </Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity style={styles.createNameContainer} onPress={() => {
                Keyboard.dismiss()
                this.setEndDateModalVisibility(true)
            }}>
                <Text style={styles.createDateText}>
                    When do you want this habit to end?
          </Text>
                <Text style={styles.notificationTimeButtonText}>
                    <SIcon name="control-end" size={20} color={colorsProvider.habitsPlaceholderColor} />
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
                            {/* Top Bar Section */}
                            {this.renderTopBar()}
                            {this.renderStartEndTime()}

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