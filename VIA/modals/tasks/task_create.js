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
import { TopBar, DoneSlider, CompleteButton, TrashButton, NotificationTimes, Notes } from '../../components'


import { Notifier } from '../../notifier/notifier'
const empty = ""
var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var year = new Date().getFullYear(); //Current Year
const timeDisplayFormat = 'hh:mm A'
const dateToday = new Date(year, month, date);

const notifier = new Notifier;
const controller = new Controller();
const dateFormat = 'dd/mm/yy'
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
            fromProjectID: this.props.fromProject ? this.props.fromProject : '',
            fromProjectName: this.props.fromProjectName ? this.props.fromProjectName : '',
            newTaskFromProject: {},
            items: [],
            proj: null,
            projName: empty,
            showDate: false,
            dueDate: '',
            notificationTimes: "",
            notesModalVisible: false,
        };
    }

    componentDidMount() {
        controller.loadAll(this, Projects.TABLE_NAME);
        if (this.state.fromProjectID) {
            this.state.newTaskFromProject.project = this.state.fromProjectID
            this.setState({ newTaskFromProject: this.state.newTaskFromProject })

        }

    }

    /* #region  Top Bar Region */
    renderTopBar() {
        return <TopBar
            nameOfItem={this.state.newTaskName}
            dueDate={this.state.dueDate}
            importance={this.state.newTaskImportance}
            parent={this.state.proj}
            parentName={this.state.projName}
            closeModal={this.props.closeModal}
            editName={item => {
                this.setState({ newTaskName: item });
                this.props.name(item);
                this.state.newTaskFromProject.name = item;
                this.setState({ newTaskFromProject: this.state.newTaskFromProject })
            }}
            hasImportance={true}
            hasParent={true}
            editDueDate={() => {
                Keyboard.dismiss()
                this.setDateModalVisibility(true)
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
            selectParent={() => {
                Keyboard.dismiss();
                this.setProjectSelectionModalVisibility(true);
            }}
        />
    }
    /* #endregion */

    /* #region  Top Bar Region */
    // renderTopBarSection() {
    //     return (<View style={styles.topNav}>
    //         <TouchableOpacity
    //             style={styles.topNavBackButton}
    //             onPress={this.props.closeModal}>
    //             <SIcon
    //                 style={{}}
    //                 name="arrow-left"
    //                 size={30}
    //                 color={colorsProvider.tasksComplimentaryColor}
    //             />
    //         </TouchableOpacity>
    //     </View>
    //     )
    // }
    /* #endregion */

    /* #region  Name Section */
    // renderNameSection() {
    //     return (<TouchableOpacity
    //         onPress={() => {
    //             this.nameTextInput.focus();
    //         }}
    //         style={
    //             this.state.newTaskName != ''
    //                 ? styles.hasNameTextInputContainer
    //                 : styles.createNameContainer
    //         }
    //     >
    //         <TextInput
    //             ref={input => {
    //                 this.nameTextInput = input;
    //             }}
    //             maxLength={40}
    //             style={styles.createNameText}
    //             multiline={true}
    //             placeholder={'Name'}
    //             onChangeText={value => {
    //                 this.setState({ newTaskName: value });
    //                 this.props.name(value);
    //                 this.state.newTaskFromProject.name = value;
    //                 this.setState({ newTaskFromProject: this.state.newTaskFromProject })
    //             }}
    //         ></TextInput>
    //     </TouchableOpacity>)
    // }
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
                        this.state.newTaskFromProject.due_date = item
                        this.setState({ newTaskFromProject: this.state.newTaskFromProject })

                    }}
                    onSubmit={item => {
                        this.props.due_date(item);
                        this.setState({ itemDate: item });
                        this.setDueDateModalVisibility(false);
                        this.state.newTaskFromProject.due_date = item
                        this.setState({ newTaskFromProject: this.state.newTaskFromProject })

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
                        Keyboard.dismiss()
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
                                this.state.newTaskFromProject.importance = value;
                                this.setState({ newTaskFromProject: this.state.newTaskFromProject })
                            }}
                            onValueChange={value => {
                                Keyboard.dismiss()
                                this.setState({ newTaskImportance: value });
                                this.props.importance(value);
                                this.state.newTaskFromProject.importance = value;
                                this.setState({ newTaskFromProject: this.state.newTaskFromProject })
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
                    titleTextColor={colorsProvider.projectsComplimentaryColor}
                    titleContainerColor={colorsProvider.projectsMainColor}
                    transparent={true}
                    selectItem={item => {
                        this.props.project(item.key);
                        this.setState({ theSelectedProject: item.value.name }, () => { });
                        this.state.newTaskFromProject.project = item.value.name;
                        this.setState({ newTaskFromProject: this.state.newTaskFromProject })
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
        if (this.state.fromProjectName != '') {
            if (this.state.theSelectedProject != '') {
                this.props.project = this.state.theSelectedProject;
                return (
                    <View style={styles.projectSectionContainer}>
                        <TouchableOpacity
                            style={styles.hasProjectSelectionContainer}
                            onPress={() => {
                                Keyboard.dismiss()
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
            }
            return (
                <View style={styles.projectSectionContainer}>
                    <TouchableOpacity
                        style={styles.hasProjectSelectionContainer}
                        onPress={() => {
                            Keyboard.dismiss()
                            this.setProjectSelectionModalVisibility(true);
                        }}>
                        <Text style={styles.hasProjectSelectionButtonText}>
                            {this.state.fromProjectName}
                        </Text>
                        <Text style={styles.notificationTimeButtonText}>
                            <SIcon name="layers" size={20} color={colorsProvider.tasksComplimentaryColor} />
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return (
                <View style={styles.projectSectionContainer}>
                    <TouchableOpacity
                        style={styles.createProjectSelectionContainer}
                        onPress={() => {
                            Keyboard.dismiss()
                            this.setProjectSelectionModalVisibility(true)
                        }}>
                        <Text style={styles.createProjectSelectionButtonText}>
                            Is this part of a bigger project?</Text>
                        <Text style={styles.notificationTimeButtonText}>
                            <SIcon name="layers" size={20} color={colorsProvider.tasksPlaceholderColor} />
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
                        Keyboard.dismiss()
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
                    Keyboard.dismiss()
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
                        this.state.newTaskFromProject.n
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
                    }}>
                    <Text
                        style={styles.hasNotesText}
                        multiline={true}
                        onChangeText={this.props.notes}>
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
                }}>
                <Text
                    style={styles.createNotesText}
                    multiline={true}
                    onChangeText={this.props.notes}>
                    Notes ...</Text>
            </TouchableOpacity>
        );
    }
    /* #endregion */

    /* #region  Bottom Buttons Section */
    renderBottomButtons() {
        return (<View style={styles.bottomButtonsContainer}>
            <TouchableOpacity
                style={styles.bottomButtonLeftClose}
                onPress={this.props.closeModal}>
                <Text style={styles.bottomButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                disabled={this.state.newTaskName != '' ? false : true}
                style={
                    this.state.newTaskName != ''
                        ? styles.bottomButtonRight
                        : styles.bottomButtonRightDisabled
                }
                onPress={() => {
                    notifier.scheduleAllNotifications();
                    if (this.props.fromProject)
                        this.props.saveFromProject(this.state.newTaskFromProject)
                    else
                        this.props.save()
                }}>
                <Text style={this.state.newTaskName != '' ? styles.bottomButtonTextDisabled : styles.bottomButtonText}> Save</Text>
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
                    <View style={styles.outerView}>

                        {this.renderTopBar()}

                        {/* {TOP NAVIGATION SECTION} */}
                        {/* {this.renderTopBarSection()} */}

                        {/* { NAME INPUT SECTION} */}
                        {/* {this.renderNameSection()} */}

                        {/* { DUE DATE SECTION} */}
                        {/* {this.renderDueDate()} */}

                        {/* { SLIDER SECTION} */}
                        {/* {this.renderSliderSection()} */}

                        {/* {PROJECT SELECTION SECTION} */}
                        {/* {this.renderProjectSelection()} */}

                        {/* {NOTIFICATION TIMES SECTION} */}
                        {this.renderNotificationTimes()}

                        {/* {NOTES SECTION} */}
                        {this.renderNotesSection()}

                        {/* {BOTTOM BUTTONS SECTION} */}
                        {this.renderBottomButtons()}

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}
