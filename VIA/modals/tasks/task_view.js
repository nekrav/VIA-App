import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import { Controller } from '../controller';
import { SelectionModal } from '../selectionModal/selectionModal'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { Database, Projects } from '../../db'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Slider from '@react-native-community/slider';
import Modal from "react-native-modal";
import Moment from 'moment';
import NotifService from '../../notifier/newNotifier';
import { TopBar, DoneSlider, CompleteButton, TrashButton, NotificationTimes, Notes } from '../../components'




const controller = new Controller;

const styles = require('./styles');

const empty = ""
const timeDisplayFormat = 'hh:mm A'

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var year = new Date().getFullYear(); //Current Year
const dateDisplayFormat = 'MMM Do'

const dateFormat = 'dd/mm/yy'
const dateToday = new Date(year, month, date);


export class ViewTask extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        
        this.state = {
            selectedItem: this.props.selectedItem,
            allPossibleParents: [],
            proj: null,
            projName: empty,
            dueDate: '',
            notificationTimes: "",
        };
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


    componentDidMount() {
        _isMounted = true;
        controller.getParents(this, Projects.TABLE_NAME);
        global.notifier.scheduleAllNotifications()
        if (this.state.selectedItem.project != empty) {
            Database.getOne(Projects.TABLE_NAME, this.state.selectedItem.project).then((res) => {
                this.setState({ proj: res.rows.item(0), projName: res.rows.item(0).name })
            })
        }
    }

    componentWillUnmount() {
        _isMounted = false;
    }

    finishTask() {
        this.props.editCompleted("true")
    }

    /* #region  Top Bar Region */
    renderTopBar() {
        return <TopBar
            fromCreate={false}
            color={colorsProvider.tasksMainColor}
            parentColor={colorsProvider.projectsMainColor}
            nameOfItem={this.state.selectedItem.name}
            hasDueDate={true}
            dueDate={this.state.selectedItem.due_date}
            importance={this.state.selectedItem.importance}
            parentType={"project"}
            parent={this.state.selectedItem.project}
            parentName={this.state.selectedItem.projectName}
            setParent={(id, name) => {
                this.props.editProject(id, name)
                this.setState({ projName: name })
                this.props.save();
            }}
            removeParent={() => {
                this.props.editProject(null, null)
                this.setState({ projName: null })
                this.props.save();
            }}
            allParents={this.state.allPossibleParents}
            hasParent={true}
            closeModal={this.props.closeModal}
            editName={item => {
                this.props.editName(item);
                this.props.save();
                global.notifier.scheduleAllNotifications()
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
                    global.notifier.scheduleAllNotifications();
                    this.props.delete()
                }} />
        </View>)
    }
    /* #endregion */

    /* #region  Notification Times Region */

    renderNotificationTimes() {
        return (<NotificationTimes
            color={colorsProvider.tasksMainColor}
            notificationTimes={this.props.selectedItem.notification_time}
            onPress={() => {
                this.setNotificationTimesVisibility(true);
            }}
            addNotificationTime={item => {
                this.props.editNotificationTime(item);
                this.setState({ notificationTimes: item })
                this.props.save();
                global.notifier.scheduleAllNotifications();
            }}
        />
        )
    }
    /* #endregion */

    /* #region  Notes Region */

    renderNotesSection() {
        return <Notes
            color={colorsProvider.tasksMainColor}
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
                style={{ margin: 0, }}
                onSwipeComplete={this.props.closeModal}
                swipeDirection={"right"}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.outerView}>

                        {/* Top Bar Section */}
                        {this.renderTopBar()}

                        {this.renderDoneSlider()}

                        {/* Complete Button Section */}
                        {this.renderCompleteAndTrashButton()}

                        {/* Notification Times Section */}
                        {this.renderNotificationTimes()}

                        {/* {NOTES SECTION} */}
                        {this.renderNotesSection()}

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}