import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import { Controller } from '../controller';
import { SelectionModal } from '../selectionModal/selectionModal'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal';
import { Database, Projects } from '../../db'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Slider from '@react-native-community/slider';
import Modal from "react-native-modal";
import Moment from 'moment';
import { Notifier } from '../../notifier/notifier'
import { TopBar, DoneSlider, ParentSelection } from '../../components'

const notifier = new Notifier;

const controller = new Controller;

const styles = require('./styles');

const empty = ""
const timeDisplayFormat = 'hh:mm A'

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var year = new Date().getFullYear(); //Current Year
const dateDisplayFormat = 'MMM Do'
const todayDate = new Date();
const dateFormat = 'dd/mm/yy'
const dateToday = new Date(year, month, date);


export class ViewTask extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: this.props.selectedItem,
            projectSelectionModalVisible: false,
            items: [],
            proj: null,
            projName: empty,
            theSelectedProject: empty,
            // importance: this.props.selectedItem.importance? this.props.selectedItem.importance : "",
            showDate: false,
            dueDate: '',
            notificationTimesModal: false,
            // percentVal: this.props.selectedItem.percentage_done,
            // importanceVal: this.props.selectedItem.importance ? this.props.selectedItem.importance : "",
            notesModalVisible: false,
            // itemNotificationTimes: this.props.selectedItem.notification_time
        };
    }

    componentDidMount() {
        _isMounted = true;
        controller.loadAll(this, Projects.TABLE_NAME);
        notifier.scheduleAllNotifications()
        if (this.state.selectedItem.project != empty) {
            Database.getOne(Projects.TABLE_NAME, this.state.selectedItem.project).then((res) => {
                this.setState({ proj: res.rows.item(0), projName: res.rows.item(0).name })
            })
        }
    }

    componentWillUnmount() {
        _isMounted = false;
        // controller.loadAllChildrenAndGetRelatedChildren(this, Tasks.TABLE_NAME, this.state.selectedItem.id, "project");
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
            nameOfItem={this.state.selectedItem.name}
            dueDate={this.state.selectedItem.due_date}
            importance={this.state.selectedItem.importance}
            parent={this.state.selectedItem.parent}
            closeModal={this.props.closeModal}
            editName={this.props.editName}
            hasImportance={true}
            hasParent={true}
            editName={this.props.editName}
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

    /* #region  Project Selection Region */
    setProjectSelectionModalVisibility(visible) {
        this.setState({ projectSelectionModalVisible: visible })
    }


    showProjectSelectionModal() {
        if (this.state.projectSelectionModalVisible) {
            return <SelectionModal
                animationType="fade"
                items={this.state.items}
                itemName="Project"
                titleTextColor={colorsProvider.projectsComplimentaryColor}
                titleContainerColor={colorsProvider.projectsMainColor}
                transparent={true}
                selectItem={(item) => {
                    this.props.editProject(item.value.id)
                    this.setState({ projName: item.value.name })
                    this.props.save();
                }}
                closeModal={() => { this.setProjectSelectionModalVisibility(false) }}>
            </SelectionModal>
        }
        return null;
    }

    renderProjectSection() {
        <ParentSelection
            parent={this.state.selectedItem.project}
            selectParent={() => {
                Keyboard.dismiss();
                this.setProjectSelectionModalVisibility(true);
            }}
        />
        // if (this.state.projName != empty) {
        //     this.props.project = this.state.theSelectedProject;
        //     return (
        //         <TouchableOpacity
        //             style={styles.hasProjectSelectionContainer}
        //             onPress={() => {
        //                 Keyboard.dismiss();
        //                 this.setProjectSelectionModalVisibility(true);
        //             }}>
        //             <Text style={styles.hasProjectSelectionButtonText}>
        //                 {this.state.projName}
        //             </Text>
        //             <Text style={styles.notificationTimeButtonText}>
        //                 <SIcon name="layers" size={20} color={colorsProvider.tasksComplimentaryColor} />
        //             </Text>
        //         </TouchableOpacity>
        //     );
        // } else {
        //     return (
        //         <TouchableOpacity
        //             style={styles.createProjectSelectionContainer}
        //             onPress={() => {
        //                 Keyboard.dismiss()
        //                 this.setProjectSelectionModalVisibility(true)
        //             }}>
        //             <Text style={styles.createProjectSelectionButtonText}>
        //                 Is this part of a bigger project?
        //   </Text>
        //             <Text style={styles.notificationTimeButtonText}>
        //                 <SIcon name="layers" size={20} color={colorsProvider.tasksPlaceholderColor} />
        //             </Text>
        //         </TouchableOpacity>
        //     );
        // }
    }


    /* #endregion */

    /* #region  Due Date Region */
    setDateModalVisibility(visible) {
        this.setState({ showDate: visible })
    }

    renderShowDate() {
        if (this.state.showDate) {
            return <DateModal
                animationType="fade"
                itemDate={this.props.selectedItem.due_date ? this.props.selectedItem.due_date : empty}
                itemName="Project"
                disabledSaveButtonBackgroundColor={colorsProvider.tasksMainColor}
                saveButtonBackgroundColor={colorsProvider.tasksMainColor}
                transparent={true}
                setDate={(item) => {
                    this.props.editDueDate(item)
                    this.setState({ dueDate: item })
                    this.props.save();
                }}
                onSubmit={item => {
                    this.props.editDueDate(item);
                    this.setState({ dueDate: item });
                    this.setDateModalVisibility(false);
                }}
                closeModal={() => { this.setDateModalVisibility(false) }}>
            </DateModal>
        }
        return null;
    }
    /* #endregion */

    /* #region  Slider Region */
    renderSliderSection() {
        return (
            <View style={styles.slidersSection}>
                <View style={styles.slidersTitlesContainer}>
                    <View style={styles.sliderTitleContainerLeft}>
                        <Text
                            style={
                                this.state.selectedItem.percentage_done > 0
                                    ? styles.sliderTitle
                                    : styles.sliderTitleNull
                            }>
                            % Done
                    </Text>
                    </View>
                    <View style={styles.sliderTitleContainerRight}>
                        <Text
                            style={
                                this.state.selectedItem.importance > 0
                                    ? styles.sliderTitle
                                    : styles.sliderTitleNull
                            }>
                            Importance
                    </Text>
                    </View>
                </View>
                <View style={styles.slidersContainer}>
                    <View style={styles.sliderContainerLeft}>
                        <Slider
                            style={{ width: 250, height: 1, transform: [{ rotate: '270deg' }] }}
                            minimumValue={0}
                            maximumValue={100}
                            thumbTintColor={this.state.selectedItem.percentage_done > 0 ? colorsProvider.projectsComplimentaryColor : colorsProvider.projectsPlaceholderColor}
                            minimumTrackTintColor={colorsProvider.tasksComplimentaryColor}
                            maximumTrackTintColor={colorsProvider.tasksPlaceholderColor}
                            value={parseInt(this.state.selectedItem.percentage_done)}

                            onSlidingComplete={(value) => {
                                this.props.editPercentageDone(value)
                                if (value == 100) {
                                    this.finishTask();
                                }
                                this.props.save();
                            }}
                            onValueChange={(value) => {
                                Keyboard.dismiss()
                                this.props.editPercentageDone(value);
                            }}
                        />

                    </View>
                    <View style={styles.sliderContainerRight}>
                        <Slider
                            style={{ width: 250, height: 1, transform: [{ rotate: '270deg' }] }}
                            minimumValue={0}
                            maximumValue={100}
                            thumbTintColor={this.state.selectedItem.importance > 0 ? colorsProvider.projectsComplimentaryColor : colorsProvider.projectsPlaceholderColor}
                            minimumTrackTintColor={colorsProvider.tasksComplimentaryColor}
                            maximumTrackTintColor={colorsProvider.tasksPlaceholderColor}
                            value={parseInt(this.state.selectedItem.importance)}
                            onValueChange={(value) => {
                                Keyboard.dismiss()
                                this.props.save();
                                this.props.editImportance(value);
                            }}
                            onSlidingComplete={(value) => {
                                this.props.editImportance(value)
                            }}
                        />
                    </View>
                </View>
            </View>
        )

    }

    /* #endregion */

    // /* #region  Complete Button Section */

    // renderCompleteButton() {
    //     return (<TouchableOpacity
    //         style={styles.completeButtonBody}
    //         onLongPress={() => {
    //             this.setState({ percentVal: 0 })
    //             this.props.editCompleted("false")
    //             this.props.editPercentageDone(0)
    //         }
    //         }
    //         onPress={() => {
    //             this.setState({ percentVal: 100 })
    //             this.props.editPercentageDone(100)
    //             this.props.editCompleted("true")

    //         }
    //         }>
    //         {this.renderCompleteButtonText()}
    //     </TouchableOpacity>)
    // }

    // renderCompleteButtonText() {
    //     if (this.state.selectedItem.completed == "true")
    //         return (<Text style={styles.completeButtonText}>Done</Text>)
    //     else
    //         return (<Text style={styles.completeButtonText}>Complete</Text>)
    // }
    // /* #endregion */

    /* #region  Complete Button Section */
    renderCompleteButton() {
        if (this.state.selectedItem.completed == "true") {
            if (this.state.selectedItem.finished_date == null) {
                return (
                    <TouchableOpacity
                        style={styles.completeButtonBodyDone}
                        onLongPress={() => {
                            Keyboard.dismiss()
                            this.setState({ percentVal: 0 })
                            this.props.editCompleted("false")
                            this.props.editPercentageDone(0)
                            this.props.editFinishedDate("");
                        }}
                        onPress={() => {
                            Keyboard.dismiss();
                            this.setState({ percentVal: 100 })
                            this.props.editPercentageDone(100)
                            this.props.editCompleted("true")
                            this.props.editFinishedDate(new Date(Date.now()));
                        }}>
                        <Text style={styles.completeButtonText}>Done <Text style={{ fontSize: 10, }}>(finished on: no finished date info)</Text></Text>
                    </TouchableOpacity>

                )
            }
            return (
                <TouchableOpacity
                    style={styles.completeButtonBodyDone}
                    onLongPress={() => {
                        Keyboard.dismiss()
                        this.setState({ percentVal: 0 })
                        this.props.editCompleted("false")
                        this.props.editPercentageDone(0)
                        this.props.editFinishedDate("");
                    }}
                    onPress={() => {
                        Keyboard.dismiss();
                        this.setState({ percentVal: 100 })
                        this.props.editPercentageDone(100)
                        this.props.editCompleted("true")
                        this.props.editFinishedDate(new Date(Date.now()));
                    }}>
                    <Text style={styles.completeButtonText}>Done <Text style={{ fontSize: 14, }}>(finished on: {Moment(new Date(this.state.selectedItem.finished_date.toString())).format(dateDisplayFormat)})</Text></Text>
                </TouchableOpacity>

            )
        }
        else
            return (
                <TouchableOpacity
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
                        this.props.editFinishedDate(dateToday.toString());
                    }
                    }>
                    <Text style={styles.completeButtonText}>Complete</Text>
                </TouchableOpacity >
            )
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
                    saveButtonBackgroundColor={colorsProvider.tasksComplimentaryColor}
                    disabledSaveButtonBackgroundColor={colorsProvider.tasksComplimentaryColor}
                    times={this.state.selectedItem.notification_time ? JSON.parse('[' + this.state.selectedItem.notification_time + ']') : ''}
                    setDate={item => {
                        this.props.editNotificationTime(item);
                        // this.setState({ itemNotificationTimes: item });
                    }}
                    closeModal={() => {
                        notifier.scheduleAllNotifications();
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
                            <SIcon name="bell" size={20} color={colorsProvider.tasksComplimentaryColor} />
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
                    existingNotes={this.state.selectedItem.notes}
                    backgroundColor={colorsProvider.tasksMainColor}
                    buttonContainerNotChangedColor={colorsProvider.tasksPlaceholderColor}
                    buttonContainerTextNotChangedColor={colorsProvider.tasksMainColor}
                    textPlaceholderColor={colorsProvider.tasksPlaceholderColor}
                    textChangedColor={colorsProvider.tasksComplimentaryColor}
                    buttonContainerTextNotChangedColor={colorsProvider.whitePlaceholderColor}
                    buttonTextPlaceholderColor={colorsProvider.whiteColor}
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
                style={{ margin: 0, }}
                onSwipeComplete={this.props.closeModal}
                swipeDirection={"right"}>
                {this.renderShowDate()}
                {this.showProjectSelectionModal()}
                {this.renderNotesModal()}
                {this.renderNotificationTimesModal()}

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <SafeAreaView style={this.getStyleIfDone()}>

                        {/* Top Bar Section */}
                        {this.renderTopBar()}

                        {this.renderDoneSlider()}
                        {/* Name Section */}
                        {/* {this.renderNameSection()} */}

                        {/* Project Section*/}
                        {/* {this.renderProjectSection()} */}

                        {/* Complete Button Section */}
                        {this.renderCompleteButton()}

                        {/* Notification Times Section */}
                        {this.renderNotificationTimesSection()}

                        {/* {NOTES SECTION} */}
                        {this.renderNotesSection()}

                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}