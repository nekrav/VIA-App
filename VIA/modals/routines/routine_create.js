import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'; // Version can be specified in package.json
import { MultipleSelectionModal } from '../selectionModal/multipleSelectionModal'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal'
import { Database, Habits, Routines } from '../../db'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
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


export class CreateRoutine extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// newRoutine: this.props.newRoutine,
			// habitsSelectionModalVisibility: false,
			// items: [],
			// showStartDate: false,
			// showEndDate: false,
			// itemStartDate: '',
			// itemEndDate: '',
			// itemNotificationTimes: '',
			// newProjectImportance: 0,
			// notificationTimesModal: false,
			// newRoutineName: '',
			// itemNotes: '',
			// numberOfTasks: '',
			// tasks: [],
			// projectId: uuid.v4(),

			allPossibleChildren: [],
			name: '',
			importance: 0,
			notificationTimes: "",
			notes: "",
		};
	}

	componentDidMount() {
		controller.loadAll(this, Habits.TABLE_NAME);
	}

	/* #region  Top bar Region */
	renderTopBar() {
		return <TopBar
			color={colorsProvider.routinesMainColor}
			fromCreate={true}
			hasParent={false}
			nameOfItem={this.state.name}
			hasDueDate={false}
			importance={this.state.importance}
			allChildren={this.state.allPossibleChildren}
			closeModal={this.props.closeModal}
			editName={item => {
				this.setState({ name: item });
				this.props.name(item);
			}}
			hasImportance={true}

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
		/>
	}
	/* #endregion */

	/* #region  Notification Times Region */
	renderNotificationTimes() {
		return (<NotificationTimes
			color={colorsProvider.routinesMainColor}
			notificationTimes={this.state.notificationTimes}
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
			color={colorsProvider.routinesMainColor}
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

	/* #region  Name Input Region */
	// renderNameInputSection() {
	// 	return (<TouchableOpacity
	// 		onPress={() => {
	// 			this.nameTextInput.focus();
	// 		}}
	// 		style={
	// 			this.state.newRoutineName != '' ? styles.hasNameTextInputContainer : styles.createNameContainer}>
	// 		<TextInput
	// 			ref={input => {
	// 				this.nameTextInput = input;
	// 			}}
	// 			maxLength={40}
	// 			style={styles.createNameText}
	// 			multiline={true}
	// 			placeholder={'Name'}
	// 			onChangeText={value => {
	// 				this.setState({ newRoutineName: value });
	// 				this.props.name(value);
	// 				this.props.id(this.state.projectId);
	// 			}}
	// 		></TextInput>
	// 	</TouchableOpacity>)
	// }
	/* #endregion */


	/* #region  Start Date Region */
	// setStartDateModalVisibility(visible) {
	// 	this.setState({ showStartDate: visible });
	// }

	// renderStartDateModal() {
	// 	if (this.state.showStartDate) {
	// 		return (
	// 			<DateModal
	// 				pickerMode="time"
	// 				animationType="fade"
	// 				disabledSaveButtonBackgroundColor={colorsProvider.routinesMainColor}
	// 				saveButtonBackgroundColor={colorsProvider.routinesMainColor}
	// 				transparent={true}
	// 				setDate={item => {
	// 					this.props.start_time(item);
	// 					this.setState({ itemStartDate: item });
	// 				}}
	// 				onSubmit={item => {
	// 					this.props.start_time(item);
	// 					this.setState({ itemStartDate: item });
	// 					this.setStartDateModalVisibility(false);
	// 				}}
	// 				closeModal={() => {
	// 					this.setStartDateModalVisibility(false);
	// 				}}
	// 			></DateModal>
	// 		);
	// 	}
	// 	return null;
	// }

	// renderStartDate() {
	// 	if (this.state.itemStartDate != '') {
	// 		return (
	// 			<View style={styles.createDueDateContainer}>
	// 				<TouchableOpacity
	// 					onPress={() => {
	// 						Keyboard.dismiss()
	// 						this.setStartDateModalVisibility(true)
	// 					}}
	// 				>
	// 					<Text style={styles.createSelectedDateText}>
	// 						{Moment(new Date(this.state.itemStartDate)).format(dateFormat)}
	// 					</Text>
	// 				</TouchableOpacity>
	// 			</View>
	// 		);
	// 	}
	// 	return (
	// 		<View style={styles.createNameContainer}>
	// 			<TouchableOpacity onPress={() => {
	// 				Keyboard.dismiss()
	// 				this.setStartDateModalVisibility(true)
	// 			}}>
	// 				<Text style={styles.createDateText}>
	// 					When do you want this routine to start?
	// 		  </Text>
	// 			</TouchableOpacity>
	// 		</View>
	// 	);
	// }

	/* #endregion */

	/* #region  End Date Region */
	// setEndDateModalVisibility(visible) {
	// 	this.setState({ showEndDate: visible });
	// }

	// renderEndDateModal() {
	// 	if (this.state.showEndDate) {
	// 		return (
	// 			<DateModal
	// 				pickerMode="time"
	// 				animationType="fade"
	// 				disabledSaveButtonBackgroundColor={colorsProvider.routinesMainColor}
	// 				saveButtonBackgroundColor={colorsProvider.routinesMainColor}
	// 				transparent={true}
	// 				setDate={item => {
	// 					this.props.end_time(item);
	// 					this.setState({ itemEndDate: item });
	// 				}}
	// 				onSubmit={item => {
	// 					this.props.end_time(item);
	// 					this.setState({ itemEndDate: item });
	// 					this.setEndDateModalVisibility(false);
	// 				}}
	// 				closeModal={() => {
	// 					this.setEndDateModalVisibility(false);
	// 				}}
	// 			></DateModal>
	// 		);
	// 	}
	// 	return null;
	// }

	// renderEndDate() {
	// 	if (this.state.itemEndDate != '') {
	// 		return (
	// 			<View style={styles.createDueDateContainer}>
	// 				<TouchableOpacity
	// 					onPress={() => {
	// 						Keyboard.dismiss()
	// 						this.setEndDateModalVisibility(true)
	// 					}}>
	// 					<Text style={styles.createSelectedDateText}>
	// 						{Moment(new Date(this.state.itemEndDate)).format(dateFormat)}
	// 					</Text>
	// 				</TouchableOpacity>
	// 			</View>
	// 		);
	// 	}
	// 	return (
	// 		<View style={styles.createNameContainer}>
	// 			<TouchableOpacity onPress={() => {
	// 				Keyboard.dismiss()
	// 				this.setEndDateModalVisibility(true)
	// 			}}>
	// 				<Text style={styles.createDateText}>
	// 					When do you want this routine to end?
	// 		  </Text>
	// 			</TouchableOpacity>
	// 		</View>
	// 	);
	// }

	// /* #endregion */

	/* #region  Habit Selection Region */
	// showTasksSelectionModal() {
	// 	if (this.state.habitsSelectionModalVisibility) {
	// 		return <MultipleSelectionModal
	// 			animationType="fade"
	// 			items={this.state.items}
	// 			titleTextColor={colorsProvider.habitsComplimentaryColor}
	// 			titleContainerColor={colorsProvider.habitsMainColor}
	// 			itemName="Habits"
	// 			checkBoxColor={colorsProvider.habitsComplimentaryColor}
	// 			transparent={true}
	// 			selectItems={items => {
	// 				this.setState({ tasks: items })
	// 			}}
	// 			closeModal={() => { this.setHabitsSelectionModalVisibility(false) }}>
	// 		</MultipleSelectionModal>
	// 	}
	// }

	// setHabitsSelectionModalVisibility(visible) {
	// 	this.setState({ habitsSelectionModalVisibility: visible })
	// }

	// renderSelectedTasksString() {
	// 	var tasksString = "";
	// 	if (this.state.tasks.length > 0) {
	// 		for (var i = 0; i < this.state.tasks.length; i++) {
	// 			tasksString = tasksString.concat(this.state.tasks[i].item.value.name + ", ")
	// 		}
	// 	}
	// 	return tasksString;
	// }

	// saveProjectInSelectedTask(projectID) {
	// 	if (this.state.tasks.length > 0) {
	// 		for (var i = 0; i < this.state.tasks.length; i++) {
	// 			this.state.tasks[i].item.value.routine = projectID
	// 			Database.update(Habits.TABLE_NAME, this.state.tasks[i].item.value).then(() => {
	// 				controller.loadAll(this, Habits.TABLE_NAME);
	// 				notifier.scheduleAllNotifications()
	// 			})
	// 		}
	// 	}
	// }

	// renderTaskSelection() {
	// 	if (this.state.tasks.length > 0) {
	// 		return (
	// 			<TouchableOpacity
	// 				style={styles.hasProjectSelectionContainer}
	// 				onPress={() => {
	// 					Keyboard.dismiss();
	// 					this.setHabitsSelectionModalVisibility(true);
	// 				}}>
	// 				<Text maxLines={2} style={styles.hasProjectSelectionButtonText}>{this.renderSelectedTasksString()}</Text>
	// 				<Text style={styles.notificationTimeButtonText}>

	// 					<SIcon name="reload" size={20} color={colorsProvider.routinesComplimentaryColor} />
	// 				</Text>
	// 			</TouchableOpacity>
	// 		);
	// 	} else {
	// 		return (
	// 			<TouchableOpacity
	// 				style={styles.createProjectSelectionContainer}
	// 				onPress={() => {
	// 					Keyboard.dismiss();
	// 					this.setHabitsSelectionModalVisibility(true);
	// 				}}>
	// 				<Text style={styles.createProjectSelectionButtonText}>Do you have any habits that go here?</Text>
	// 				<Text style={styles.notificationTimeButtonText}>
	// 					<SIcon name="reload" size={20} color={colorsProvider.routinesPlaceholderColor} />
	// 				</Text>
	// 			</TouchableOpacity>
	// 		);
	// 	}
	// }
	/* #endregion */


	/* #region  Notification Times Region */
	// setNotificationTimesVisibility(visible) {
	// 	this.setState({ notificationTimesModal: visible });
	// }

	// renderNotificationTimesModal() {
	// 	if (this.state.notificationTimesModal) {
	// 		return (
	// 			<NotificationTimesModal
	// 				animationType="fade"
	// 				transparent={true}
	// 				saveButtonBackgroundColor={colorsProvider.routinesMainColor}
	// 				disabledSaveButtonBackgroundColor={colorsProvider.routinesMainColor}
	// 				setDate={item => {
	// 					this.props.notification_time(item);
	// 					this.setState({ itemNotificationTimes: item });
	// 				}}
	// 				closeModal={() => {
	// 					this.setNotificationTimesVisibility(false);
	// 				}}
	// 			></NotificationTimesModal>
	// 		);
	// 	}
	// 	return null;
	// }

	// renderNotificationTimes() {
	// 	var daysWithNotifications = '';
	// 	var arr = this.state.itemNotificationTimes;

	// 	Object.keys(arr).map(key => {
	// 		if (arr[key].times.length > 0 && arr[key].checked == true) {
	// 			daysWithNotifications = daysWithNotifications.concat(
	// 				arr[key].name + ', '
	// 			);
	// 		}
	// 	});
	// 	if (daysWithNotifications != '') {
	// 		return (
	// 			<TouchableOpacity
	// 				style={styles.hasNotificationTimesButtonContainer}
	// 				onPress={() => {
	// 					Keyboard.dismiss();
	// 					this.setNotificationTimesVisibility(true);
	// 				}}>
	// 				<Text style={styles.hasNotificationTimeButtonText}>
	// 					{daysWithNotifications}
	// 				</Text>
	// 				<Text style={styles.notificationTimeButtonText}>
	// 					<SIcon name="bell" size={20} color={colorsProvider.routinesComplimentaryColor} />
	// 				</Text>
	// 			</TouchableOpacity>
	// 		);
	// 	}
	// 	return (
	// 		<TouchableOpacity
	// 			style={styles.notificationTimesButtonContainer}
	// 			onPress={() => {
	// 				Keyboard.dismiss();
	// 				this.setNotificationTimesVisibility(true);
	// 			}}>
	// 			<Text style={styles.notificationTimeButtonText}>
	// 				When would you like to be notified?</Text>
	// 			<Text style={styles.notificationTimeButtonText}>
	// 				<SIcon name="bell" size={20} color={colorsProvider.routinesPlaceholderColor} />
	// 			</Text>
	// 		</TouchableOpacity>
	// 	);
	// }
	/* #endregion */

	/* #region  Notes Region */
	// setNotesModalVisibility(visible) {
	// 	this.setState({ notesModalVisible: visible });
	// }

	// renderNotesModal() {
	// 	if (this.state.notesModalVisible) {
	// 		return (
	// 			<NotesModal
	// 				animationType="slide"
	// 				transparent={true}
	// 				existingNotes={this.state.itemNotes}
	// 				notesBackgroundColor={colorsProvider.routinesMainColor}
	// 				notesButtonNoNotesTextColor={colorsProvider.routinesPlaceholderColor}
	// 				notesButtonNotesTextColor={colorsProvider.routinesMainColor}
	// 				notesButtonContainerNoNotesText={colorsProvider.routinesMainColor}
	// 				notesButtonContainerNotesText={colorsProvider.routinesComplimentaryColor}

	// 				placeholder={'Notes...'}
	// 				setNotes={item => {
	// 					this.props.notes(item);
	// 					this.setState({ itemNotes: item });
	// 				}}
	// 				closeModal={() => {
	// 					this.setNotesModalVisibility(false);
	// 				}}
	// 			></NotesModal>
	// 		);
	// 	}
	// 	return null;
	// }

	// renderNotesSection() {
	// 	if (this.state.itemNotes != '') {
	// 		return (
	// 			<TouchableOpacity
	// 				style={styles.hasNotesContainer}
	// 				onPress={() => {
	// 					this.setNotesModalVisibility(true);
	// 				}}
	// 			>
	// 				<Text
	// 					style={styles.hasNotesText}
	// 					multiline={true}
	// 					onChangeText={this.props.notes}
	// 				>
	// 					{this.state.itemNotes}
	// 				</Text>
	// 			</TouchableOpacity>
	// 		);
	// 	}
	// 	return (
	// 		<TouchableOpacity
	// 			style={styles.createNotesContainer}
	// 			onPress={() => {
	// 				this.setNotesModalVisibility(true);
	// 			}}
	// 		>
	// 			<Text
	// 				style={styles.createNotesText}
	// 				multiline={true}
	// 				onChangeText={this.props.notes}
	// 			>
	// 				Notes ...
	// </Text>
	// 		</TouchableOpacity>
	// 	);
	// }
	/* #endregion */
	/* #region  Bottom Buttons Region */
	// renderBottomButtons() {
	// 	return (
	// 		<View style={styles.bottomButtonsContainer}>
	// 			<TouchableOpacity
	// 				style={styles.bottomButtonLeftClose}
	// 				onPress={this.props.closeModal}>
	// 				<Text style={styles.bottomButtonText}>Close</Text>
	// 			</TouchableOpacity>
	// 			<TouchableOpacity
	// 				disabled={this.state.newRoutineName != '' ? false : true}
	// 				style={
	// 					this.state.newRoutineName != ''
	// 						? styles.bottomButtonRight
	// 						: styles.bottomButtonRightDisabled
	// 				}
	// 				onPress={() => {
	// 					this.saveProjectInSelectedTask(this.state.projectId)
	// 					notifier.scheduleAllNotifications();
	// 					this.props.save()
	// 				}}>
	// 				<Text style={this.state.newRoutineName != '' ? styles.bottomButtonTextDisabled : styles.bottomButtonText}> Save</Text>
	// 			</TouchableOpacity>
	// 		</View >)
	// }
	/* #endregion */

	render() {
		return (
			<Modal
				animationType={this.props.animationType}
				transparent={this.props.transparent}
				visible={this.props.visible}
				onRequestClose={this.props.onRequestClose}>

				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<View style={styles.outerView}>
						{this.renderTopBar()}

						{this.renderNotificationTimes()}

						{this.renderNotesSection()}

						{this.renderBottomButtons()}

					</View>
				</TouchableWithoutFeedback>
			</Modal>
		);
	}
}