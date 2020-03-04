import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'; // Version can be specified in package.json
import { MultipleSelectionModal } from '../selectionModal/multipleSelectionModal'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal'
import { Database, Projects, Tasks } from '../../db'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import Slider from '@react-native-community/slider';
const controller = new Controller;
const dateFormat = 'ddd, MMM Do, YY'
const todayDate = new Date();
const styles = require('./styles');
var uuid = require('react-native-uuid');

import { Notifier } from '../../notifier/notifier'

const notifier = new Notifier;


export class CreateProject extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newProject: this.props.newProject,
			tasksSelectionModalVisible: false,
			items: [],
			showDate: false,
			itemDate: '',
			itemNotificationTimes: '',
			newProjectImportance: 0,
			notificationTimesModal: false,
			newProjectName: '',
			itemNotes: '',
			numberOfTasks: '',
			tasks: [],
			projectId: uuid.v4(),
		};
	}

	componentDidMount() {
		controller.loadAll(this, Tasks.TABLE_NAME);
	}

	/* #region  Top Bar Region */

	renderTopRegion() {
		return (<View style={styles.topNav}>
			<TouchableOpacity
				style={styles.topNavBackButton}
				onPress={this.props.closeModal}>
				<SIcon
					name="arrow-left"
					size={30}
					color="#023C74"
				/>
			</TouchableOpacity>
		</View>)
	}
	/* #endregion */

	/* #region  Name Input Region */
	renderNameInputSection() {
		return (<TouchableOpacity
			onPress={() => {
				this.nameTextInput.focus();
			}}
			style={
				this.state.newProjectName != ''
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
					this.setState({ newProjectName: value });
					this.props.name(value);
					this.props.id(this.state.projectId);
				}}
			></TextInput>
		</TouchableOpacity>)
	}
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
					disabledSaveButtonBackgroundColor={colorsProvider.projectsMainColor}
					saveButtonBackgroundColor={colorsProvider.projectsMainColor}
					transparent={true}
					setDate={item => {
						this.props.due_date(item);
						this.setState({ itemDate: item });
					}}
					onSubmit={item => {
						this.props.due_date(item);
						this.setState({ itemDate: item });
						this.setDueDateModalVisibility(false);
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
				<View style={styles.createDueDateContainer}>
					<TouchableOpacity
						onPress={() => this.setDueDateModalVisibility(true)}
					>
						<Text style={styles.createSelectedDateText}>
							{Moment(new Date(this.state.itemDate)).format(dateFormat)}
						</Text>
					</TouchableOpacity>
					<Text style={styles.createSelectedDateText}>
						{Moment(new Date(this.state.itemDate)).diff({ todayDate }, 'days') +
							' days left'}
					</Text>
				</View>
			);
		}
		return (
			<View style={styles.createNameContainer}>
				<TouchableOpacity onPress={() => this.setDueDateModalVisibility(true)}>
					<Text style={styles.createDateText}>
						When do you want to finish this?
          </Text>
				</TouchableOpacity>
			</View>
		);
	}

	/* #endregion */

	/* #region  Slider Region */
	renderSliderSection() {
		return (<View style={styles.slidersSection}>
			<View style={styles.slidersTitlesContainer}>
				<View style={styles.sliderTitleContainerCenter}>
					<Text
						style={
							this.state.newTaskImportance > 0
								? styles.sliderTitle
								: styles.sliderTitleNull
						}
					>
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
						thumbTintColor={this.state.newTaskImportance > 0 ? "#023C74" : "#35689C"}
						minimumTrackTintColor={"#023C74"}
						maximumTrackTintColor={"#35689C"}
						onSlidingComplete={value => {
							this.setState({ newTaskImportance: value });
							this.props.importance(value);
						}}
						onValueChange={value => {
							this.setState({ newTaskImportance: value });
							this.props.importance(value);
						}}
					/>
				</View>
			</View>
		</View>
		)
	}
	/* #endregion */

	/* #region  Task Selection Region */

	showTasksSelectionModal() {
		if (this.state.tasksSelectionModalVisible) {
			return <MultipleSelectionModal
				animationType="fade"
				items={this.state.items}
				itemName="Tasks"
				titleTextColor="#023C74"
				titleContainerColor={colorsProvider.projectsMainColor}
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
				this.state.tasks[i].item.value.project = projectID
				Database.update(Tasks.TABLE_NAME, this.state.tasks[i].item.value).then(() => {
					controller.loadAll(this, Tasks.TABLE_NAME);
					notifier.scheduleAllNotifications()
				})
			}
		}
	}

	renderTaskSelection() {
		if (this.state.tasks.length > 0) {
			return (
				<View style={styles.projectSectionContainer}>
					<TouchableOpacity style={styles.hasProjectSelectionContainer} onPress={() => {
						this.setTaskSelectionModalVisibility(true);
					}}>
						<Text style={styles.hasProjectSelectionButtonText}>{this.renderSelectedTasksString()}</Text>
						<Text style={styles.notificationTimeButtonText}>

							<SIcon name="list" size={20} color="#023C74" />
						</Text>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View style={styles.projectSectionContainer}>
					<TouchableOpacity style={styles.createProjectSelectionContainer} onPress={this.setTaskSelectionModalVisibility.bind(this)}>
						<Text style={styles.createProjectSelectionButtonText}>Do you have any tasks that go here?</Text>
						<Text style={styles.notificationTimeButtonText}>
							<SIcon name="list" size={20} color="#35689C" />
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
					saveButtonBackgroundColor={colorsProvider.projectsMainColor}
					disabledSaveButtonBackgroundColor={colorsProvider.projectsMainColor}
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
						<SIcon name="bell" size={20} color="#023C74" />
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
					<SIcon name="bell" size={20} color="#35689C" />
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
					backgroundColor={colorsProvider.projectsMainColor}
					buttonContainerNotChangedColor={"#35689C"}
					buttonContainerTextNotChangedColor={colorsProvider.projectsMainColor}
					textPlaceholderColor={"#35689C"}
					textChangedColor={"#023C74"}

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
				disabled={this.state.newProjectName != '' ? false : true}
				style={
					this.state.newProjectName != ''
						? styles.bottomButtonLeft
						: styles.bottomButtonLeftDisabled
				}
				onPress={() => {
					notifier.scheduleAllNotifications()
					this.saveProjectInSelectedTask(this.state.projectId)
					this.props.save()
				}}
			>
				<Text
					style={
						this.state.newProjectName != ''
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
		</View>)
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
				{this.renderNotificationTimesModal()}
				{this.renderNotesModal()}

				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<SafeAreaView style={styles.outerView}>

						{/* {TOP BAR SECTION} */}
						{this.renderTopRegion()}

						{/* {NAME INPUT SECTION} */}
						{this.renderNameInputSection()}

						{/* {DUE DATE SECTION} */}
						{this.renderDueDate()}

						{/* {SLIDER SECTION} */}
						{this.renderSliderSection()}

						{/* {TASK SELECTION SECTION} */}
						{this.renderTaskSelection()}

						{/* {NOTIFICATION TIMES SECTION} */}
						{this.renderNotificationTimes()}

						{/* {NOTES SECTION} */}
						{this.renderNotesSection()}

						{/* {BOTTOM BUTTONS SECTION} */}
						{this.renderBottomButtons()}

					</SafeAreaView>
				</TouchableWithoutFeedback>
			</Modal>
		);
	}
}
