import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
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
import { TopBar, NotificationTimes, Notes } from '../../components'

import { Notifier } from '../../notifier/notifier'
const controller = new Controller;
const dateFormat = 'hh:mm A'
const todayDate = new Date();
const styles = require('./styles');
var uuid = require('react-native-uuid');

const empty = ""
var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var year = new Date().getFullYear(); //Current Year
const timeDisplayFormat = 'hh:mm A'
const dateToday = new Date(year, month, date);

const notifier = new Notifier;

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





export class CreateHabit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // newHabit: this.props.newHabit,
            // newHabitName: '',
            // routineSelectionModalVisible: false,
            // showStartDate: false,
            // showEndDate: false,
            // items: [],
            // theSelectedRoutine: "",
            // habitId: uuid.v4(),
            // itemDate: '',
            // itemNotificationTimes: '',
            // notificationTimesModal: false,
            // itemStartDate: '',
            // itemEndDate: '',
            // fromRoutineID: this.props.fromRoutine ? this.props.fromRoutine : '',
            // fromRoutineName: this.props.fromRoutineName ? this.props.fromRoutineName : ''


            allPossibleParents: [],
            name: '',
            routine: null,
            routineName: null,
            importance: 0,
            dueDate: '',
            notificationTimes: "",
            notes: "",
            fromRoutineID: this.props.fromRoutine ? this.props.fromRoutine : '',
            fromRoutineName: this.props.fromRoutineName ? this.props.fromRoutineName : '',
            newHabitFromRoutine: {},
        };
    }

    getFromRoutine(routineID) {
        if (routineID) {
            Database.getOne(Routines.TABLE_NAME, routineID).then((res) => {
                this.setState({ routineID: res.rows.item(0), routineName: res.rows.item(0).name })
            })
        }
    }


    componentDidMount() {
        this.getFromRoutine(this.props.fromRoutine)
        controller.getParents(this, Routines.TABLE_NAME);
    }

    /* #region  Top Bar Region */
    renderTopBar() {
        return <TopBar
            color={colorsProvider.habitsMainColor}
            parentColor={colorsProvider.routinesMainColor}
            fromCreate={true}
            nameOfItem={this.state.name}
            hasDueDate={false}
            dueDate={this.state.dueDate}
            importance={this.state.importance}
            parentType={"routine"}
            parent={this.state.routine}
            parentName={this.state.routineName}
            allParents={this.state.allPossibleParents}
            setParent={(id, name) => {
                this.props.routine(id, name);
                this.setState({ routineName: name, routine: id });
            }}
            removeParent={() => {
                this.props.routine(null, null)
                this.setState({ routineName: null, routine: null });
            }}
            closeModal={this.props.closeModal}
            editName={item => {
                this.setState({ name: item });
                this.props.name(item);
                this.state.newHabitFromRoutine.name = item;
                this.setState({ newHabitFromRoutine: this.state.newHabitFromRoutine })
            }}
            hasImportance={true}
            hasParent={true}
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
            }}
            selectDueDate={date => {
            }}
        />
    }
    /* #endregion */


    /* #region  Top Bar Region */
    // renderTopBar() {
    //     return (<View style={styles.topNav}>
    //         <TouchableOpacity
    //             style={styles.topNavBackButton}
    //             onPress={this.props.closeModal}>
    //             <SIcon
    //                 name="arrow-left"
    //                 size={30}
    //                 color={colorsProvider.habitsComplimentaryColor}
    //             />
    //         </TouchableOpacity>
    //     </View>)
    // }
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
    // setStartDateModalVisibility(visible) {
    //     this.setState({ showStartDate: visible });
    // }

    // renderStartDateModal() {
    //     if (this.state.showStartDate) {
    //         return (
    //             <DateModal
    //                 pickerMode="time"
    //                 animationType="fade"
    //                 disabledSaveButtonBackgroundColor={colorsProvider.habitsMainColor}
    //                 saveButtonBackgroundColor={colorsProvider.habitsMainColor}
    //                 transparent={true}
    //                 setDate={item => {
    //                     this.props.start_time(item);
    //                     this.setState({ itemStartDate: item });
    //                 }}
    //                 onSubmit={item => {
    //                     this.props.start_time(item);
    //                     this.setState({ itemStartDate: item });
    //                     this.setStartDateModalVisibility(false);
    //                 }}
    //                 closeModal={() => {
    //                     this.setStartDateModalVisibility(false);
    //                 }}
    //             ></DateModal>
    //         );
    //     }
    //     return null;
    // }

    // renderStartDate() {
    //     if (this.state.itemStartDate != '') {
    //         return (
    //             <TouchableOpacity
    //                 style={styles.createNameContainer}
    //                 onPress={() => {
    //                     Keyboard.dismiss();
    //                     this.setStartDateModalVisibility(true)
    //                 }}>
    //                 <Text style={styles.hasDateText}>
    //                     {Moment(new Date(this.state.itemStartDate)).format(dateFormat)}
    //                 </Text>
    //                 <Text style={styles.notificationTimeButtonText}>
    //                     <SIcon name="control-play" size={20} color={colorsProvider.habitsComplimentaryColor} />
    //                 </Text>
    //             </TouchableOpacity>
    //         );
    //     }
    //     return (
    //         <TouchableOpacity style={styles.createNameContainer} onPress={() => {
    //             Keyboard.dismiss();
    //             this.setStartDateModalVisibility(true)
    //         }}>
    //             <Text style={styles.createDateText}>
    //                 When do you want this habit to start?
    //       </Text>
    //             <Text style={styles.notificationTimeButtonText}>
    //                 <SIcon name="control-play" size={20} color={colorsProvider.habitsPlaceholderColor} />
    //             </Text>
    //         </TouchableOpacity>
    //     );
    // }

    /* #endregion */

    /* #region  End Date Region */
    // setEndDateModalVisibility(visible) {
    //     this.setState({ showEndDate: visible });
    // }

    // renderEndDateModal() {
    //     if (this.state.showEndDate) {
    //         return (
    //             <DateModal
    //                 pickerMode="time"
    //                 animationType="fade"
    //                 disabledSaveButtonBackgroundColor={colorsProvider.habitsMainColor}
    //                 saveButtonBackgroundColor={colorsProvider.habitsMainColor}
    //                 transparent={true}
    //                 setDate={item => {
    //                     this.props.end_time(item);
    //                     this.setState({ itemEndDate: item });
    //                 }}
    //                 onSubmit={item => {
    //                     this.props.end_time(item);
    //                     this.setState({ itemEndDate: item });
    //                     this.setEndDateModalVisibility(false);
    //                 }}
    //                 closeModal={() => {
    //                     this.setEndDateModalVisibility(false);
    //                 }}
    //             ></DateModal>
    //         );
    //     }
    //     return null;
    // }

    // renderEndDate() {
    //     if (this.state.itemEndDate != '') {
    //         return (
    //             <TouchableOpacity
    //                 style={styles.createNameContainer}
    //                 onPress={() => {
    //                     Keyboard.dismiss();
    //                     this.setEndDateModalVisibility(true)
    //                 }}>
    //                 <Text style={styles.hasDateText}>
    //                     {Moment(new Date(this.state.itemEndDate)).format(dateFormat)}
    //                 </Text>
    //                 <Text style={styles.notificationTimeButtonText}>
    //                     <SIcon name="control-end" size={20} color={colorsProvider.habitsComplimentaryColor} />
    //                 </Text>
    //                 {/* <Text style={styles.createSelectedDateText}>
    //                     {Moment(new Date(this.state.itemEndDate)).diff({ todayDate }, 'days') +
    //                         ' days left'}
    //                 </Text> */}
    //             </TouchableOpacity>
    //         );
    //     }
    //     return (
    //         <TouchableOpacity style={styles.createNameContainer} onPress={() => {
    //             Keyboard.dismiss();
    //             this.setEndDateModalVisibility(true)
    //         }}>
    //             <Text style={styles.createDateText}>
    //                 When do you want this habit to end?
    //       </Text>
    //             <Text style={styles.notificationTimeButtonText}>
    //                 <SIcon name="control-end" size={20} color={colorsProvider.habitsPlaceholderColor} />
    //             </Text>
    //         </TouchableOpacity>
    //     );
    // }

    /* #endregion */

    /* #region  Routine Selection Region */
    // showRoutineSelectionModal() {
    //     if (this.state.routineSelectionModalVisible) {
    //         return (
    //             <SelectionModal
    //                 animationType="fade"
    //                 items={this.state.items}
    //                 itemName="Routine"
    //                 titleTextColor={colorsProvider.routinesComplimentaryColor}
    //                 titleContainerColor={colorsProvider.routinesMainColor}
    //                 transparent={true}
    //                 selectItem={item => {
    //                     this.props.routine(item.key);
    //                     this.setState({ theSelectedRoutine: item.value.name, fromRoutineName: item.value.name }, () => { });
    //                 }}
    //                 closeModal={() => {
    //                     this.setRoutineSelectionModalVisibility(false);
    //                 }}
    //             ></SelectionModal>
    //         );
    //     }
    // }

    // setRoutineSelectionModalVisibility(visible) {
    //     this.setState({ routineSelectionModalVisible: visible });
    // }

    // renderRoutineSelection() {
    //     if (this.state.fromRoutineName != '') {
    //         if (this.state.theSelectedRoutine != '') {
    //             this.props.routine = this.state.theSelectedRoutine;
    //             return (
    //                 <View style={styles.routineSectionContainer}>
    //                     <TouchableOpacity
    //                         style={styles.hasProjectSelectionContainer}
    //                         onPress={() => {
    //                             Keyboard.dismiss()
    //                             this.setState({ routineSelectionModalVisible: true })
    //                         }}>
    //                         <Text style={styles.hasProjectSelectionButtonText}>
    //                             {this.state.fromRoutineName ? this.state.fromRoutineName : this.state.theSelectedRoutine}
    //                         </Text>
    //                         <Text style={styles.notificationTimeButtonText}>
    //                             <SIcon name="refresh" size={20} color={colorsProvider.habitsComplimentaryColor} />
    //                         </Text>
    //                     </TouchableOpacity></View>
    //             );
    //         }
    //         this.props.routine = this.state.theSelectedRoutine;
    //         return (
    //             <View style={styles.routineSectionContainer}>
    //                 <TouchableOpacity
    //                     style={styles.hasProjectSelectionContainer}
    //                     onPress={() => {
    //                         Keyboard.dismiss()
    //                         this.setState({ routineSelectionModalVisible: true })
    //                     }}>
    //                     <Text style={styles.hasProjectSelectionButtonText}>
    //                         {this.state.fromRoutineName}
    //                     </Text>
    //                     <Text style={styles.notificationTimeButtonText}>
    //                         <SIcon name="refresh" size={20} color={colorsProvider.habitsComplimentaryColor} />
    //                     </Text>
    //                 </TouchableOpacity></View>
    //         );
    //     }
    //     else {
    //         return (
    //             <View style={styles.routineSectionContainer}>
    //                 <TouchableOpacity
    //                     style={styles.createProjectSelectionContainer}
    //                     onPress={() => {
    //                         Keyboard.dismiss()
    //                         this.setState({ routineSelectionModalVisible: true })
    //                     }}>
    //                     <Text style={styles.createProjectSelectionButtonText}>
    //                         Is this part of a bigger routine?</Text>
    //                     <Text style={styles.notificationTimeButtonText}>
    //                         <SIcon name="refresh" size={20} color={colorsProvider.habitsPlaceholderColor} />
    //                     </Text>
    //                 </TouchableOpacity></View>
    //         );
    //     }
    // }
    /* #endregion */

    /* #region  Notification Times Region */
    // setNotificationTimesVisibility(visible) {
    //     this.setState({ notificationTimesModal: visible });
    // }

    // renderNotificationTimesModal() {
    //     if (this.state.notificationTimesModal) {
    //         return (
    //             <NotificationTimesModal
    //                 animationType="fade"
    //                 transparent={true}
    //                 saveButtonBackgroundColor={colorsProvider.habitsMainColor}
    //                 disabledSaveButtonBackgroundColor={colorsProvider.habitsPlaceholderColor}
    //                 saveButtonTextColor={colorsProvider.habitsComplimentaryColor}
    //                 disabledSaveButtonTextColor={colorsProvider.habitsComplimentaryColor}
    //                 setDate={item => {
    //                     this.props.notification_time(item);
    //                     this.setState({ itemNotificationTimes: item });
    //                 }}
    //                 closeModal={() => {
    //                     this.setNotificationTimesVisibility(false);
    //                 }}
    //             ></NotificationTimesModal>
    //         );
    //     }
    //     return null;
    // }

    // renderNotificationTimes() {
    //     var daysWithNotifications = '';
    //     var arr = this.state.itemNotificationTimes;

    //     Object.keys(arr).map(key => {
    //         if (arr[key].times.length > 0 && arr[key].checked == true) {
    //             daysWithNotifications = daysWithNotifications.concat(
    //                 arr[key].name + ', '
    //             );
    //         }
    //     });
    //     if (daysWithNotifications != '') {
    //         return (
    //             <TouchableOpacity
    //                 style={styles.hasNotificationTimesButtonContainer}
    //                 onPress={() => {
    //                     Keyboard.dismiss();
    //                     this.setNotificationTimesVisibility(true);
    //                 }}>
    //                 <Text style={styles.hasNotificationTimeButtonText}>
    //                     {daysWithNotifications}
    //                 </Text>

    //                 <Text style={styles.notificationTimeButtonText}>
    //                     <SIcon name="bell" size={20} color={colorsProvider.habitsComplimentaryColor} />
    //                 </Text>
    //             </TouchableOpacity>
    //         );
    //     }
    //     return (
    //         <TouchableOpacity
    //             style={styles.notificationTimesButtonContainer}
    //             onPress={() => {
    //                 Keyboard.dismiss();
    //                 this.setNotificationTimesVisibility(true);
    //             }}
    //         >
    //             <Text style={styles.notificationTimeButtonText}>
    //                 When would you like to be notified?
    //     </Text>

    //             <Text style={styles.notificationTimeButtonText}>
    //                 <SIcon name="bell" size={20} color={colorsProvider.habitsPlaceholderColor} />
    //             </Text>
    //         </TouchableOpacity>
    //     );
    // }
    /* #endregion */

    /* #region  Bottom Buttons Region */
    // renderBottomButtons() {
    //     return (
    //         <View style={styles.bottomButtonsContainer}>
    //             <TouchableOpacity
    //                 style={styles.bottomButtonLeftClose}
    //                 onPress={this.props.closeModal}>
    //                 <Text style={styles.bottomButtonText}>Close</Text>
    //             </TouchableOpacity>
    //             {/* <TouchableOpacity
    //                 style={styles.bottomButtonLeftClose}
    //                 onPress={() => {
    //                 }}>
    //                 <Text style={styles.bottomButtonText}>Close</Text>
    //             </TouchableOpacity> */}
    //             <TouchableOpacity
    //                 disabled={this.state.newHabitName != '' ? false : true}
    //                 style={
    //                     this.state.newHabitName != ''
    //                         ? styles.bottomButtonRight
    //                         : styles.bottomButtonRightDisabled
    //                 }
    //                 onPress={() => {
    //                     notifier.scheduleAllNotifications();
    //                     this.props.save()
    //                 }}>
    //                 <Text style={this.state.newHabitName != '' ? styles.bottomButtonTextDisabled : styles.bottomButtonText}> Save</Text>
    //             </TouchableOpacity>
    //         </View >
    //     )
    // }
    /* #endregion */

    /* #region  Notification Times Region */
    renderNotificationTimes() {
        return (<NotificationTimes
            color={colorsProvider.habitsMainColor}
            notificationTimes={this.state.notificationTimes}
            onPress={() => {
                this.setNotificationTimesVisibility(true);
            }}
            addNotificationTime={item => {
                this.setState({ notificationTimes: item })
            }}
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
                this.props.notes(value);
            }} />
    }
    /* #endregion */

    /* #region  Bottom Buttons Section */
    renderBottomButtons() {
        return (<View style={{
            // paddingTop: 18,
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
                            borderColor: colorsProvider.completeButtonColor,
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
                    notifier.scheduleAllNotifications();
                    this.props.notification_time(this.state.notificationTimes);

                    if (this.props.fromProject)
                        this.props.saveFromProject(this.state.newTaskFromProject)
                    else
                        this.props.save()
                }}>
                <Text style={this.state.name != '' ? {
                    fontSize: colorsProvider.fontButtonSize,
                    textAlign: 'center',
                    fontFamily: colorsProvider.font,
                    color: colorsProvider.homeTextColor,
                } : {
                        fontSize: colorsProvider.fontButtonSize,
                        textAlign: 'center',
                        fontFamily: colorsProvider.font,
                        color: colorsProvider.homeTextColor,
                    }}> Save</Text>
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
                {/* 
                {this.showRoutineSelectionModal()}
                {this.renderEndDateModal()}
                {this.renderStartDateModal()}
                {this.renderNotificationTimesModal()} */}

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.outerView}>
                        {this.renderTopBar()}
                        {/* {TOP NAVIGATION REGION} */}
                        {/* {this.renderTopBar()} */}

                        {/* {NAME CONTAINER} */}
                        {/* {this.renderNameInputSection()} */}

                        {/* {Start Date SECTION} */}
                        {/* {this.renderStartDate()} */}

                        {/* {End Date SECTION} */}
                        {/* {this.renderEndDate()} */}

                        {/* {PROJECT SELECTION SECTION} */}
                        {/* {this.renderRoutineSelection()} */}

                        {/* {NOTIFICATION TIMES SECTION} */}
                        {/* {this.renderNotificationTimes()} */}

                        {/* {NOTES SECTION} */}
                        {/* {this.renderNotesSection()} */}

                        {this.renderNotificationTimes()}


                        {/* {NOTES SECTION} */}
                        {this.renderNotesSection()}

                        {/* {BOTTOM BUTTONS SECTION} */}
                        {this.renderBottomButtons()}

                        {/* {BOTTOM BUTTONS SECTION} */}
                        {/* {this.renderBottomButtons()} */}

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}