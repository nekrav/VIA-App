import React from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'; // Version can be specified in package.json
import { MultipleSelectionModal } from '../selectionModal/multipleSelectionModal'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal'
import { Database, Habits, Routines } from '../../db'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import Slider from '@react-native-community/slider';
const controller = new Controller;
const dateFormat = 'hh:mm A'
const todayDate = new Date();
const styles = require('./styles');
var uuid = require('react-native-uuid');

export class ViewRoutine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canEdit: false,
            selectedItem: this.props.selectedItem,
            tasksSelectionModalVisible: false,
			items: [],
            showStartDate: false,
            showEndDate: false,
            itemStartDate: '',
            itemEndDate: '',
			itemNotificationTimes: '',
			newProjectImportance: 0,
			notificationTimesModal: false,
			newRoutineName: '',
			itemNotes: '',
			numberOfTasks: '',
			tasks: [],
			projectId:  uuid.v4(),
        };
    }

	componentDidMount() {
		controller.loadAll(this, Habits.TABLE_NAME);
    }

    getHabitsInRoutine() {
        if (this.state.items != []) {
            console.warn("nbob")
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

	/* #region  Habit Selection Region */

	showTasksSelectionModal() {
		if (this.state.tasksSelectionModalVisible) {
			return <MultipleSelectionModal
				animationType="fade"
				items={this.state.items}
				itemName="Habits"
				transparent={true}
				selectItems={items => {
					this.setState({ tasks: items })
				}}
				closeModal={() => { this.setTaskSelectionModalVisibility(false) }}>
			</MultipleSelectionModal>
		}
	}

	setTaskSelectionModalVisibility(visible) {
		this.setState({ tasksSelectionModalVisible: visible })
	}

	renderSelectedTasksString() {
		var tasksString = "";
		if (this.state.tasks.length > 0) {
			for (var i = 0; i < this.state.tasks.length; i++) {
				tasksString = tasksString.concat(this.state.tasks[i].item.value.name + ", ")
			}
		}
		return tasksString;
	}

	saveProjectInSelectedTask(projectID) {
		if (this.state.tasks.length > 0) {
			for (var i = 0; i < this.state.tasks.length; i++) {
				this.state.tasks[i].item.value.routine = projectID
				Database.update(Habits.TABLE_NAME, this.state.tasks[i].item.value).then(() => {
					controller.loadAll(this, Habits.TABLE_NAME);
				})
			}
		}
	}

	renderAllChildrenSection() {
		if (this.state.tasks.length > 0) {
			return (
				<TouchableOpacity style={styles.hasProjectSelectionContainer} onPress={() => {
					this.setTaskSelectionModalVisibility(true);
				}}>
					<Text style={styles.hasProjectSelectionButtonText}>{this.renderSelectedTasksString()}</Text>
					<Text style={styles.notificationTimeButtonText}>

						<SIcon name="list" size={20} color="#ffffff" />
					</Text>
				</TouchableOpacity>
			);
		} else {
			return (
                <View>
                    <View><Text>Habits</Text></View>
				<TouchableOpacity style={styles.createProjectSelectionContainer} onPress={this.setTaskSelectionModalVisibility.bind(this)}>
					<Text style={styles.createProjectSelectionButtonText}>Do you have any habits that go here?</Text>
					<Text style={styles.notificationTimeButtonText}>
						<SIcon name="reload" size={20} color="#ABABAB" />
					</Text>
				</TouchableOpacity></View>
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
						this.props.start_time(item);
						this.setState({ itemStartDate: item });
					}}
					onSubmit={item => {
						this.props.start_time(item);
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
				<View style={styles.createDueDateContainer}>
					<TouchableOpacity
						onPress={() => this.setStartDateModalVisibility(true)}
					>
						<Text style={styles.createSelectedDateText}>
							{Moment(new Date(this.state.selectedItem.start_time)).format(dateFormat)}
						</Text>
					</TouchableOpacity>
				</View>
			);
		}
		return (
			<View style={styles.createNameContainer}>
				<TouchableOpacity onPress={() => this.setStartDateModalVisibility(true)}>
					<Text style={styles.createDateText}>
						When do you want this routine to start?
          </Text>
				</TouchableOpacity>
			</View>
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
						this.props.end_time(item);
						this.setState({ itemEndDate: item });
					}}
					onSubmit={item => {
						this.props.end_time(item);
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
				<View style={styles.createDueDateContainer}>
					<TouchableOpacity
						onPress={() => this.setEndDateModalVisibility(true)}
					>
						<Text style={styles.createSelectedDateText}>
							{Moment(new Date(this.state.selectedItem.end_time)).format(dateFormat)}
						</Text>
					</TouchableOpacity>
				</View>
			);
		}
		return (
			<View style={styles.createNameContainer}>
				<TouchableOpacity onPress={() => this.setEndDateModalVisibility(true)}>
					<Text style={styles.createDateText}>
						When do you want this routine to end?
          </Text>
				</TouchableOpacity>
			</View>
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
                    times={this.state.selectedItem.notification_time ? JSON.parse('[' + this.state.selectedItem.notification_time + ']') : ''}
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

	renderNotificationTimes() {
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
					<SIcon name="bell" size={20} color="#ABABAB" />
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
		return (<View style={styles.bottomButtonsContainer}>
			<TouchableOpacity
				disabled={this.state.newRoutineName != '' ? false : true}
				style={
					this.state.newRoutineName != ''
						? styles.bottomButtonLeft
						: styles.bottomButtonLeftDisabled
				}
				onPress={() => {
					this.saveProjectInSelectedTask(this.state.projectId)
					this.props.save()
				}}
			>
				<Text
					style={
						this.state.newRoutineName != ''
							? styles.bottomButtonTextDisabled
							: styles.bottomButtonText
					}>
					Save
		</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.bottomButtonRight}
				onPress={this.props.closeModal}>
				<Text style={styles.bottomButtonText}>Close</Text>
			</TouchableOpacity>
		</View>)
	}
	/* #endregion */








    canEdit() {
        this.setState({ canEdit: true })
    }

    render() {
        if (this.props.selectedItem != {}) {
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
                {/* {this.showRoutineSelectionModal()} */}
                {this.renderNotificationTimesModal()}

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <SafeAreaView style={this.getStyleIfDone()}>

                        {/* Top Bar Section */}
                        {this.renderTopBar()}

                        {/* Name Section */}
                        {this.renderNameSection()}

                        {/* Routine Section*/}
                        {/* {this.renderRoutineSection()} */}

                        {/* Start Date Section*/}
                        {this.renderStartDate()}

                        {/* End Date Section*/}
                        {this.renderEndDate()}

                        {/* Sliders Section*/}
                        {/* {this.renderSliderSection()} */}
                        {this.renderAllChildrenSection()}

                        {/* Complete Button Section */}
                        {this.renderCompleteButton()}

                        {/* Notification Times Section */}
                        {this.renderNotificationTimes()}

                        {/* {NOTES SECTION} */}
                        {/* {this.renderNotesSection()} */}

                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>




                // <Modal
                //     animationType={this.props.animationType}
                //     transparent={this.props.transparent}
                //     visible={this.props.visible}
                //     onRequestClose={this.props.onRequestClose}>
                //     <View style={{ marginTop: 22, alignItems: "center" }}>
                //         <Text>View Routine</Text>
                //     </View>
                //     <View>
                //         <Text>Name</Text>
                //         <TextInput
                //             editable={this.state.canEdit}
                //             value={this.props.selectedItem.name}
                //             onChangeText={this.props.editName}>
                //         </TextInput>
                //     </View>
                //     <View>
                //         <Text>Created Date</Text>
                //         <TextInput
                //             editable={false}
                //             value={this.props.selectedItem.created_date}>
                //         </TextInput>
                //     </View>
                //     <View>
                //         <Text>Start Time</Text>
                //         <TextInput
                //             editable={this.state.canEdit}
                //             value={this.props.selectedItem.start_time}
                //             onChangeText={this.props.editStartTime}>
                //         </TextInput>
                //     </View>
                //     <View>
                //         <Text>End Time</Text>
                //         <TextInput
                //             editable={this.state.canEdit}
                //             value={this.props.selectedItem.end_time}
                //             onChangeText={this.props.editEndTime}>
                //         </TextInput>
                //     </View>
                //     <View>
                //         <Text>Notification Time</Text>
                //         <TextInput
                //             editable={this.state.canEdit}
                //             value={this.props.selectedItem.notification_time}
                //             onChangeText={this.props.editNotificationTime}>
                //         </TextInput>
                //     </View>
                //     <View>
                //         <TouchableOpacity onPress={this.props.closeModal}>
                //             <Text>Close</Text>
                //         </TouchableOpacity>
                //         <TouchableOpacity onPress={this.props.save}>
                //             <Text>Save</Text>
                //         </TouchableOpacity>
                //         <TouchableOpacity onPress={this.props.delete}>
                //             <Text>Delete</Text>
                //         </TouchableOpacity>
                //         <TouchableOpacity onPress={() => this.canEdit()}>
                //             <Text>Edit</Text>
                //         </TouchableOpacity>
                //     </View>
                // </Modal>
            );
        }
    }
}