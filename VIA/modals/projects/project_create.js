import React from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'; // Version can be specified in package.json
import { SelectionModal } from '../selectionModal/selectionModal'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal'
import { Projects, Tasks } from '../../db'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import Slider from '@react-native-community/slider';
const controller = new Controller;
const dateFormat = 'ddd, MMM Do, YY'
const todayDate = new Date();
const styles = require('./styles');
import { getInset } from 'react-native-safe-area-view';
import { ThemeProvider } from 'styled-components';


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
			tasks: []
		};
	}
	componentDidMount() {
		controller.loadAll(this, Tasks.TABLE_NAME);
	}

	showTasksSelectionModal() {
		if (this.state.tasksSelectionModalVisible) {
			return <SelectionModal
				animationType="fade"
				items={this.state.items}
				itemName="Task"
				transparent={true}
				selectItem={(item) => {
					this.props.tasks(item.key)
					this.setState({ theSelectedProject: item.value.name }, () => {
					})
				}}
				closeModal={() => { this.setTaskSelectionModalVisibility(false) }}>
			</SelectionModal>
		}
	}

	setDateModalVisibility(visible) {
		this.setState({ showDate: visible });
	}

	setTaskSelectionModalVisibility(visible) {
		this.setState({ projectSelectionModalVisible: visible })
	}

	renderTaskSelection() {
		if (this.state.tasks != []) {
			return (
				<TouchableOpacity style={styles.hasProjectSelectionContainer} onPress={() => {
					this.setTaskSelectionModalVisibility(true);
				}}>
					<Text style={styles.hasProjectSelectionButtonText}>{this.state.numberOfTasks}</Text>
					<Text style={styles.notificationTimeButtonText}>
						<SIcon name="layers" size={20} color="#ffffff" />
					</Text>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity style={styles.createProjectSelectionContainer} onPress={this.setProjectSelectionModalVisibility.bind(this)}>
					<Text style={styles.createProjectSelectionButtonText}>Do you have any tasks that go here?</Text>
					<Text style={styles.notificationTimeButtonText}>
						<SIcon name="layers" size={20} color="#ABABAB" />
					</Text>
				</TouchableOpacity>
			);
		}
	}

	renderShowDate() {
		if (this.state.showDate) {
			return <DateModal
				pickerMode="date"
				animationType="fade"
				transparent={true}
				setDate={(item) => {
					this.props.due_date(item)
					this.setState({ itemDate: item })
				}}
				onSubmit={(item) => {
					this.props.due_date(item)
					this.setState({ itemDate: item })
					this.setDateModalVisibility(false)
				}}
				closeModal={() => { this.setDateModalVisibility(false) }}>
			</DateModal>
		}
		return null;
	}

	setNotificationTimesVisibility(visible) {
		this.setState({ notificationTimesModal: visible })
	}

	renderNotificationTimesModal() {
		if (this.state.notificationTimesModal) {
			return <NotificationTimesModal
				animationType="fade"
				transparent={true}
				setDate={(item) => {
					this.props.notification_time(item)
					this.setState({ itemNotificationTimes: item })
				}}
				closeModal={() => { this.setNotificationTimesVisibility(false) }}>
			</NotificationTimesModal>
		}
		return null;
	}

	renderDueDate() {
		if (this.state.itemDate != "") {
			return (
				<View style={styles.createDueDateContainer}>
					<TouchableOpacity onPress={() => this.setDateModalVisibility(true)}>
						<Text style={styles.createSelectedDateText}>
							{Moment(new Date(this.state.itemDate)).format(dateFormat)}
						</Text>
					</TouchableOpacity>
					<Text style={styles.createSelectedDateText}>
						{Moment(new Date(this.state.itemDate)).diff({ todayDate }, "days") + " days left"}
					</Text>
				</View>)
		}
		return (
			<View style={styles.createNameContainer}>
				<TouchableOpacity onPress={() => this.setDateModalVisibility(true)}>
					<Text style={styles.createDateText}>
						When do you want to finish this?
                        </Text>
				</TouchableOpacity>
			</View>)
	}

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

	renderShowDate() {
		if (this.state.showDate) {
			return (
				<DateModal
					pickerMode="date"
					animationType="fade"
					transparent={true}
					setDate={item => {
						this.props.due_date(item);
						this.setState({ itemDate: item });
					}}
					onSubmit={item => {
						this.props.due_date(item);
						this.setState({ itemDate: item });
						this.setDateModalVisibility(false);
					}}
					closeModal={() => {
						this.setDateModalVisibility(false);
					}}
				></DateModal>
			);
		}
		return null;
	}

	renderNotificationTimes() {
		var daysWithNotifications = '';
		var arr = this.state.itemNotificationTimes;

		Object.keys(arr).map(key => {
			if (arr[key].times.length > 0 && arr[key].checked == true) {
				daysWithNotifications = daysWithNotifications.concat(arr[key].name + ', ');
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
					<Text style={styles.hasNotificationTimeButtonText}>{daysWithNotifications}</Text>

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
				<Text style={styles.notificationTimeButtonText}>When would you like to be notified?</Text>

				<Text style={styles.notificationTimeButtonText}>
					<SIcon name="clock" size={20} color="#ABABAB" />
				</Text>
			</TouchableOpacity>
		);
	}

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
					<Text style={styles.hasNotesText} multiline={true} onChangeText={this.props.notes}>
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
				<Text style={styles.createNotesText} multiline={true} onChangeText={this.props.notes}>
					Notes ...
				</Text>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<Modal
				animationType={this.props.animationType}
				transparent={this.props.transparent}
				visible={this.props.visible}
				onRequestClose={this.props.onRequestClose}
			>
				{/* {this.showProjectSelectionModal()} */}
				<View style={{ marginTop: 22, alignItems: 'center' }}>
					<Text>Add Project</Text>
				</View>
				<View>
					<Text>Name</Text>
					<TextInput onChangeText={this.props.name}></TextInput>
				</View>
				<View>
					<Text>Due Date</Text>
					<TextInput onChangeText={this.props.due_date}></TextInput>
				</View>
				<View>
					<Text>Importance</Text>
					<TextInput onChangeText={this.props.importance}></TextInput>
				</View>
				<View>
					<Text>Notes</Text>
					<TextInput onChangeText={this.props.notes}></TextInput>
				</View>
				<View>
					<TouchableOpacity onPress={this.props.closeModal}>
						<Text>Close</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.props.save}>
						<Text>Save</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		);
	}
}
