// import React from 'react';
// import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, BackHandler, TouchableWithoutFeedback, Keyboard, SafeAreaView} from 'react-native'; // Version can be specified in package.json
// import { Controller } from '../controller';

// import { SelectionModal } from '../selectionModal/selectionModal'
// import { Database, Routines, Habits } from '../../db'

// const controller = new Controller;

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
export class ViewHabit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canEdit: false,
            selectedItem: this.props.selectedItem,
            routineSelectionModalVisible: false,
            items: [],
            routine: null,
            routineName: "",
            theSelectedRoutine: "",
        };
    }

    componentDidMount() {
        controller.loadAll(this, Routines.TABLE_NAME);
        if (this.state.selectedItem.routine != "") {
            Database.getOne(Routines.TABLE_NAME, this.state.selectedItem.routine).then((res) => {
                this.setState({ routine: res.rows.item(0), routineName: res.rows.item(0).name })
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

    /* #region  Routine Selection Section */
    showRoutineSelectionModal() {
        if (this.state.routineSelectionModalVisible) {
            return <SelectionModal
                animationType="fade"
                items={this.state.items}
                itemName="Routine"
                transparent={true}
                selectItem={(item) => {
                    this.props.editRoutine(item.value.id)
                    this.setState({ routineName: item.value.name })
                }}
                closeModal={() => { this.setRoutineSelectionModalVisibility(false) }}>
            </SelectionModal>
        }
    }

    setRoutineSelectionModalVisibility(visible) {
        this.setState({ routineSelectionModalVisible: visible });
    }
    renderRoutineSection() {
        if (this.state.routineName != '') {
            this.props.routine = this.state.theSelectedRoutine;
            return (
                <TouchableOpacity
                    style={styles.hasProjectSelectionContainer}
                    onPress={() => {
                        this.setRoutineSelectionModalVisibility(true);
                    }}
                >
                    <Text style={styles.hasProjectSelectionButtonText}>
                        {this.state.routineName}
                    </Text>
                    <Text style={styles.notificationTimeButtonText}>
                        <SIcon name="refresh" size={20} color="#ffffff" />
                    </Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={styles.createProjectSelectionContainer}
                    onPress={this.setRoutineSelectionModalVisibility.bind(this)}
                >
                    <Text style={styles.createProjectSelectionButtonText}>
                        Is this part of a bigger routine?
          </Text>
                    <Text style={styles.notificationTimeButtonText}>
                        <SIcon name="refresh" size={20} color="#ABABAB" />
                    </Text>
                </TouchableOpacity>
            );
        }
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
                    onPress={() => this.setStartDateModalVisibility(true)}>
                    <Text style={styles.createSelectedDateText}>
                        {Moment(new Date(this.state.selectedItem.start_time)).format(dateFormat)}
                    </Text>
                    <Text style={styles.notificationTimeButtonText}>
                        <SIcon name="control-play" size={20} color="#fff" />
                    </Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity style={styles.createNameContainer} onPress={() => this.setStartDateModalVisibility(true)}>
                <Text style={styles.createDateText}>
                    When do you want this habit to start?
                </Text>
                <Text style={styles.notificationTimeButtonText}>
                        <SIcon name="control-play" size={20} color="#fff" />
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
                    }}
                ></DateModal>
            );
        }
        return null;
    }

    renderEndDate() {
        if (this.state.selectedItem.end_time != '') {
            return (
                <TouchableOpacity
                    style={styles.createDueDateContainer}
                    onPress={() => this.setEndDateModalVisibility(true)}>
                    <Text style={styles.createSelectedDateText}>
                        {Moment(new Date(this.state.selectedItem.end_time)).format(dateFormat)}
                    </Text>
                    <Text style={styles.notificationTimeButtonText}>
                        <SIcon name="control-end" size={20} color="#fff" />
                    </Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity style={styles.createNameContainer} onPress={() => this.setEndDateModalVisibility(true)}>
                <Text style={styles.createDateText}>
                    When do you want this habit to end?
          </Text>
                <Text style={styles.notificationTimeButtonText}>
                    <SIcon name="control-end" size={20} color="#fff" />
                </Text>
            </TouchableOpacity>

        );
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
        this.setState({ notificationTimesModal: visible });
    }

    renderNotificationTimesModal() {
        if (this.state.notificationTimesModal) {
            return (
                <NotificationTimesModal
                    animationType="fade"
                    transparent={true}
                    setDate={item => {
                        this.props.editNotificationTime(item);
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
                }}>
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
                {this.renderStartDateModal()}
                {this.renderEndDateModal()}
                {this.showRoutineSelectionModal()}
                {this.renderNotificationTimesModal()}

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <SafeAreaView style={this.getStyleIfDone()}>

                        {/* Top Bar Section */}
                        {this.renderTopBar()}

                        {/* Name Section */}
                        {this.renderNameSection()}

                        {/* Routine Section*/}
                        {this.renderRoutineSection()}

                        {/* Start Date Section*/}
                        {this.renderStartDate()}

                        {/* End Date Section*/}
                        {this.renderEndDate()}

                        {/* Sliders Section*/}
                        {/* {this.renderSliderSection()} */}

                        {/* Complete Button Section */}
                        {this.renderCompleteButton()}

                        {/* Notification Times Section */}
                        {this.renderNotificationTimesSection()}

                        {/* {NOTES SECTION} */}
                        {/* {this.renderNotesSection()} */}

                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}
//         if (this.props.selectedItem != {}) {
//             return (
//                 <Modal
//                     animationType={this.props.animationType}
//                     transparent={this.props.transparent}
//                     visible={this.props.visible}
//                     onRequestClose={this.props.onRequestClose}>
//                     {this.showRoutineSelectionModal()}
//                     <View style={{ marginTop: 22, alignItems: "center" }}>
//                         <Text>View Habit</Text>
//                     </View>
//                     <View>
//                         <Text>Name</Text>
//                         <TextInput
//                             editable={this.state.canEdit}
//                             value={this.props.selectedItem.name}
//                             onChangeText={this.props.editName}>
//                         </TextInput>
//                     </View>
//                     <View>
//                         <Text>Created Date</Text>
//                         <TextInput
//                             editable={false}
//                             value={this.props.selectedItem.created_date}>
//                         </TextInput>
//                     </View>
//                     <View>
//                         <Text>Due Time</Text>
//                         <TextInput
//                             editable={this.state.canEdit}
//                             value={this.props.selectedItem.due_time}
//                             onChangeText={this.props.editDueTime}>
//                         </TextInput>
//                     </View>
//                     <View>
//                         <Text>Importance</Text>
//                         <TextInput
//                             editable={this.state.canEdit}
//                             value={this.props.selectedItem.importance}
//                             onChangeText={this.props.editImportance}>
//                         </TextInput>
//                     </View>
//                     <View>
//                         <Text>Time to Spend</Text>
//                         <TextInput
//                             editable={this.state.canEdit}
//                             value={this.props.selectedItem.time_to_spend}
//                             onChangeText={this.props.editTimeToSpend}>
//                         </TextInput>
//                     </View>
//                     <View>
//                         <Text>Notification Time</Text>
//                         <TextInput
//                             editable={this.state.canEdit}
//                             value={this.props.selectedItem.notification_time}
//                             onChangeText={this.props.editNotificationTime}>
//                         </TextInput>
//                     </View>
//                     {this.renderRoutineSection()}
//                     <View>
//                         <Text>Days to do</Text>
//                         <TextInput
//                             editable={this.state.canEdit}
//                             value={this.props.selectedItem.days_to_do}
//                             onChangeText={this.props.editDaysToDo}>
//                         </TextInput>
//                     </View>
//                     <View>
//                         <TouchableOpacity onPress={this.props.closeModal}>
//                             <Text>Close</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={this.props.save}>
//                             <Text>Save</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={this.props.delete}>
//                             <Text>Delete</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => this.canEdit()}>
//                             <Text>Edit</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </Modal>
//             );
//         }
//     }
// }