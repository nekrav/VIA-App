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
const dateFormat = 'hh:mm'
const todayDate = new Date();
const styles = require('./styles');
var uuid = require('react-native-uuid');
export class CreateRoutine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newRoutine: this.props.newRoutine,
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

	saveProjectInSelectedTask(projectID)
	{
		if (this.state.tasks.length > 0) {
			for (var i = 0; i < this.state.tasks.length; i++) {
				this.state.tasks[i].item.value.routine  = projectID
				Database.update(Habits.TABLE_NAME, this.state.tasks[i].item.value).then(() => {
					controller.loadAll(this, Habits.TABLE_NAME);
				})
			}
		}
	}

	renderTaskSelection() {
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
				<TouchableOpacity style={styles.createProjectSelectionContainer} onPress={this.setTaskSelectionModalVisibility.bind(this)}>
					<Text style={styles.createProjectSelectionButtonText}>Do you have any habits that go here?</Text>
					<Text style={styles.notificationTimeButtonText}>
						<SIcon name="list" size={20} color="#ABABAB" />
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
		if (this.state.itemStartDate != '') {
			return (
				<View style={styles.createDueDateContainer}>
					<TouchableOpacity
						onPress={() => this.setStartDateModalVisibility(true)}
					>
						<Text style={styles.createSelectedDateText}>
							{Moment(new Date(this.state.itemStartDate)).format(dateFormat)}
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
		if (this.state.itemEndDate != '') {
			return (
				<View style={styles.createDueDateContainer}>
					<TouchableOpacity
						onPress={() => this.setEndDateModalVisibility(true)}
					>
						<Text style={styles.createSelectedDateText}>
							{Moment(new Date(this.state.itemEndDate)).format(dateFormat)}
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
						this.setNotificationTimesVisibility(true);
					}}
				>
					<Text style={styles.hasNotificationTimeButtonText}>
						{daysWithNotifications}
					</Text>

					<Text style={styles.notificationTimeButtonText}>
						<SIcon name="clock" size={20} color="#ffffff" />
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
					<SIcon name="clock" size={20} color="#ABABAB" />
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



    render() {
        return (
            <Modal
				animationType={this.props.animationType}
				transparent={this.props.transparent}
				visible={this.props.visible}
				onRequestClose={this.props.onRequestClose}
			>
				{this.showTasksSelectionModal()}
                {this.renderEndDateModal()}
                {this.renderStartDateModal()}

				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<SafeAreaView style={styles.outerView}>

						{/* {TOP NAVIGATION REGION} */}
						<View style={styles.topNav}>
							<TouchableOpacity
								style={styles.topNavBackButton}
								onPress={this.props.closeModal}>
								<SIcon
									style={{
										shadowColor: '#ABABAB',
										shadowOpacity: 0.8,
										shadowRadius: 1.5,
										shadowOffset: {
											height: 1,
											width: 0,
										},
									}}
									name="arrow-left"
									size={30}
									color="#2d3142"
								/>
							</TouchableOpacity>
						</View>


						{/* {NAME CONTAINER} */}
						<TouchableOpacity
							onPress={() => {
								this.nameTextInput.focus();
							}}
							style={
                                this.state.newRoutineName != ''
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
									this.setState({ newRoutineName: value });
									this.props.name(value);
									this.props.id(this.state.projectId);
								}}
							></TextInput>
						</TouchableOpacity>

                     
						{this.renderNotificationTimesModal()}
						{this.renderNotesModal()}

                        {this.renderStartDate()}
                        {this.renderEndDate()}

						{/* {PROJECT SELECTION SECTION} */}
						<View style={styles.projectSectionContainer}>
							{this.renderTaskSelection()}
						</View>


						{/* {NOTIFICATION TIMES SECTION} */}
						{this.renderNotificationTimes()}


						{/* {NOTES SECTION} */}
						{/* {this.renderNotesSection()} */}


						{/* {BOTTOM BUTTONS SECTION} */}
						<View style={styles.bottomButtonsContainer}>
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
									}
								>
									Save
					</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.bottomButtonRight}
								onPress={this.props.closeModal}
							>
								<Text style={styles.bottomButtonText}>Close</Text>
							</TouchableOpacity>
						</View>
					</SafeAreaView>
				</TouchableWithoutFeedback>
			</Modal>
        );
    }
}