import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'; // Version can be specified in package.json
import { MultipleSelectionModal } from '../selectionModal/multipleSelectionModal'
import { DateModal } from '../dateModal/dateModal'
import { SelectionModal } from '../selectionModal/selectionModal';

import { NotesModal } from '../notesModal/notesModal';
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal'
import { Database, Habits, Routines } from '../../db'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import Slider from '@react-native-community/slider';

import { Notifier } from '../../notifier/notifier'

const notifier = new Notifier;
const controller = new Controller;
const dateFormat = 'hh:mm A'
const todayDate = new Date();
const styles = require('./styles');
var uuid = require('react-native-uuid');

export class CreateRoutine extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			newRoutine: this.props.newRoutine,
			habitsSelectionModalVisibility: false,
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
			projectId: uuid.v4(),
		};
	}

	componentDidMount() {
		controller.loadAll(this, Habits.TABLE_NAME);
	}

	/* #region  Top bar Region */
	renderTopBar() {
		return (<View style={styles.topNav}>
			<TouchableOpacity
				style={styles.topNavBackButton}
				onPress={this.props.closeModal}>
				<SIcon
					name="arrow-left"
					size={30}
					color={colorsProvider.routinesComplimentaryColor}
				/>
			</TouchableOpacity>
		</View>

		)
	}
	/* #endregion */

	/* #region  Name Input Region */
	renderNameInputSection() {
		return (<TouchableOpacity
			onPress={() => {
				this.nameTextInput.focus();
			}}
			style={
				this.state.newRoutineName != '' ? styles.hasNameTextInputContainer : styles.createNameContainer}>
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
		</TouchableOpacity>)
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
					disabledSaveButtonBackgroundColor={colorsProvider.routinesMainColor}
					saveButtonBackgroundColor={colorsProvider.routinesMainColor}
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
						onPress={() => {
							Keyboard.dismiss()
							this.setStartDateModalVisibility(true)
						}}
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
				<TouchableOpacity onPress={() => {
					Keyboard.dismiss()
					this.setStartDateModalVisibility(true)
				}}>
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
					disabledSaveButtonBackgroundColor={colorsProvider.routinesMainColor}
					saveButtonBackgroundColor={colorsProvider.routinesMainColor}
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
						onPress={() => {
							Keyboard.dismiss()
							this.setEndDateModalVisibility(true)
						}}>
						<Text style={styles.createSelectedDateText}>
							{Moment(new Date(this.state.itemEndDate)).format(dateFormat)}
						</Text>
					</TouchableOpacity>
				</View>
			);
		}
		return (
			<View style={styles.createNameContainer}>
				<TouchableOpacity onPress={() => {
					Keyboard.dismiss()
					this.setEndDateModalVisibility(true)
				}}>
					<Text style={styles.createDateText}>
						When do you want this routine to end?
			  </Text>
				</TouchableOpacity>
			</View>
		);
	}

	/* #endregion */

	/* #region  Habit Selection Region */
	showTasksSelectionModal() {
		if (this.state.habitsSelectionModalVisibility) {
			return <MultipleSelectionModal
				animationType="fade"
				items={this.state.items}
				titleTextColor={colorsProvider.habitsComplimentaryColor}
				titleContainerColor={colorsProvider.habitsMainColor}
				itemName="Habits"
				checkBoxColor={colorsProvider.habitsComplimentaryColor}
				transparent={true}
				selectItems={items => {
					this.setState({ tasks: items })
				}}
				closeModal={() => { this.setHabitsSelectionModalVisibility(false) }}>
			</MultipleSelectionModal>
		}
	}

	setHabitsSelectionModalVisibility(visible) {
		this.setState({ habitsSelectionModalVisibility: visible })
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
					notifier.scheduleAllNotifications()
				})
			}
		}
	}

	renderTaskSelection() {
		if (this.state.tasks.length > 0) {
			return (
				<TouchableOpacity
					style={styles.hasProjectSelectionContainer}
					onPress={() => {
						Keyboard.dismiss();
						this.setHabitsSelectionModalVisibility(true);
					}}>
					<Text maxLines={2} style={styles.hasProjectSelectionButtonText}>{this.renderSelectedTasksString()}</Text>
					<Text style={styles.notificationTimeButtonText}>

						<SIcon name="reload" size={20} color={colorsProvider.routinesComplimentaryColor} />
					</Text>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity
					style={styles.createProjectSelectionContainer}
					onPress={() => {
						Keyboard.dismiss();
						this.setHabitsSelectionModalVisibility(true);
					}}>
					<Text style={styles.createProjectSelectionButtonText}>Do you have any habits that go here?</Text>
					<Text style={styles.notificationTimeButtonText}>
						<SIcon name="reload" size={20} color={colorsProvider.routinesPlaceholderColor} />
					</Text>
				</TouchableOpacity>
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
					saveButtonBackgroundColor={colorsProvider.routinesMainColor}
					disabledSaveButtonBackgroundColor={colorsProvider.routinesMainColor}
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
						Keyboard.dismiss();
						this.setNotificationTimesVisibility(true);
					}}>
					<Text style={styles.hasNotificationTimeButtonText}>
						{daysWithNotifications}
					</Text>
					<Text style={styles.notificationTimeButtonText}>
						<SIcon name="bell" size={20} color={colorsProvider.routinesComplimentaryColor} />
					</Text>
				</TouchableOpacity>
			);
		}
		return (
			<TouchableOpacity
				style={styles.notificationTimesButtonContainer}
				onPress={() => {
					Keyboard.dismiss();
					this.setNotificationTimesVisibility(true);
				}}>
				<Text style={styles.notificationTimeButtonText}>
					When would you like to be notified?</Text>
				<Text style={styles.notificationTimeButtonText}>
					<SIcon name="bell" size={20} color={colorsProvider.routinesPlaceholderColor} />
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
					notesBackgroundColor={colorsProvider.routinesMainColor}
					notesButtonNoNotesTextColor={colorsProvider.routinesPlaceholderColor}
					notesButtonNotesTextColor={colorsProvider.routinesMainColor}
					notesButtonContainerNoNotesText={colorsProvider.routinesMainColor}
					notesButtonContainerNotesText={colorsProvider.routinesComplimentaryColor}

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
		return (
			// <View><View style={styles.bottomButtonsContainer}>
			// 	<TouchableOpacity
			// 		disabled={this.state.newRoutineName != '' ? false : true}
			// 		style={
			// 			this.state.newRoutineName != ''
			// 				? styles.bottomButtonLeft
			// 				: styles.bottomButtonLeftDisabled
			// 		}
			// 		onPress={() => {
			// 			this.saveProjectInSelectedTask(this.state.projectId)
			// 			this.props.save()
			// 		}}
			// 	>
			// 		<Text
			// 			style={
			// 				this.state.newRoutineName != ''
			// 					? styles.bottomButtonTextDisabled
			// 					: styles.bottomButtonText
			// 			}>
			// 			Save
			// </Text>
			// 	</TouchableOpacity>
			// 	<TouchableOpacity
			// 		style={styles.bottomButtonRight}
			// 		onPress={this.props.closeModal}>
			// 		<Text style={styles.bottomButtonText}>Close</Text>
			// 	</TouchableOpacity>
			// </View></View>
			// )

			<View style={styles.bottomButtonsContainer}>
				<TouchableOpacity
					style={styles.bottomButtonLeftClose}
					onPress={this.props.closeModal}>
					<Text style={styles.bottomButtonText}>Close</Text>
				</TouchableOpacity>
				<TouchableOpacity
					disabled={this.state.newRoutineName != '' ? false : true}
					style={
						this.state.newRoutineName != ''
							? styles.bottomButtonRight
							: styles.bottomButtonRightDisabled
					}
					onPress={() => {
						this.saveProjectInSelectedTask(this.state.projectId)
						notifier.scheduleAllNotifications();
						this.props.save()
					}}>
					<Text style={this.state.newRoutineName != '' ? styles.bottomButtonTextDisabled : styles.bottomButtonText}> Save</Text>
				</TouchableOpacity>
			</View >)
	}
	/* #endregion */

	render() {
		return (
			<Modal
				animationType={this.props.animationType}
				transparent={this.props.transparent}
				visible={this.props.visible}
				onRequestClose={this.props.onRequestClose}>

				{this.showTasksSelectionModal()}
				{this.renderEndDateModal()}
				{this.renderStartDateModal()}
				{this.renderNotificationTimesModal()}
				{this.renderNotesModal()}

				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<SafeAreaView style={styles.outerView}>
						<View>
							{/* {TOP NAVIGATION REGION} */}
							{this.renderTopBar()}

							{/* {NAME CONTAINER} */}
							{this.renderNameInputSection()}

							{/* {START DATE SECTION} */}
							{this.renderStartDate()}

							{/* {END DATE SECTION} */}
							{this.renderEndDate()}

							{/* {PROJECT SELECTION SECTION} */}
							{this.renderTaskSelection()}


							{/* {NOTIFICATION TIMES SECTION} */}
							{this.renderNotificationTimes()}


							{/* {NOTES SECTION} */}
							{/* {this.renderNotesSection()} */}
						</View>

						{/* {BOTTOM BUTTONS SECTION} */}
						{this.renderBottomButtons()}

					</SafeAreaView>
				</TouchableWithoutFeedback>
			</Modal>
		);
	}
}