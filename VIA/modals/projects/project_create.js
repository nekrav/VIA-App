import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, PixelRatio } from 'react-native'; // Version can be specified in package.json
import { MultipleSelectionModal } from '../selectionModal/multipleSelectionModal'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal'
import { Database, Projects, Tasks } from '../../db'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import Slider from '@react-native-community/slider';
var uuid = require('react-native-uuid');
import { TopBar, DoneSlider, CompleteButton, TrashButton, NotificationTimes, Notes } from '../../components'
import NotifService from '../../notifier/newNotifier';

const TOP_MARGIN = PixelRatio.get() < 3 ? 0 : 50;

const empty = ""
var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var year = new Date().getFullYear(); //Current Year
const timeDisplayFormat = 'hh:mm A'
const dateToday = new Date(year, month, date);


const controller = new Controller();
const dateFormat = 'dd/mm/yy'

const styles = require('./styles');

export class CreateProject extends React.Component {
	constructor(props) {
		super(props);

		global.notifier = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
		);
		
		this.state = {
			allPossibleChildren: [],
			name: '',
			importance: 0,
			dueDate: '',
			notificationTimes: "",
			notes: "",
		};
	}

	onRegister(token) {
        this.setState({registerToken: token.token, fcmRegistered: true});
      }
    
      onNotif(notif) {
        //Alert.alert(notif.title, notif.message);
      }
    
      handlePerm(perms) {
        //Alert.alert('Permissions', JSON.stringify(perms));
      }


	componentDidMount() {
		controller.loadAll(this, Tasks.TABLE_NAME);
	}

	/* #region  Top Bar Region */
	renderTopBar() {
		return <TopBar
			color={colorsProvider.projectsMainColor}
			fromCreate={true}
			nameOfItem={this.state.name}
			hasDueDate={true}
			dueDate={this.state.dueDate}
			importance={this.state.importance}
			allPossibleChildren={this.state.allPossibleChildren}
			closeModal={this.props.closeModal}
			editName={item => {
				this.setState({ name: item });
				this.props.name(item);
			}}
			hasImportance={true}
			hasParent={false}
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
				this.setProjectSelectionModalVisibility(true);
			}}
			selectDueDate={date => {
				this.props.due_date(date);
				this.setState({ dueDate: date });
			}}
		/>
	}
	/* #endregion */

	/* #region  Notification Times Region */
	renderNotificationTimes() {
		return (<NotificationTimes
			color={colorsProvider.projectsMainColor}
			notificationTimes={this.state.notificationTimes}
			saveSpecificNotificationDates={(dates) => {
                this.props.saveSpecificNotificationDates(dates);
            }}
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
			color={colorsProvider.projectsMainColor}
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
			marginBottom: TOP_MARGIN,
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
							borderColor: colorsProvider.setButtonColor,
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
					global.notifier.scheduleAllNotifications();
					this.props.notification_time(this.state.notificationTimes);
					this.props.save()
				}}>
				<Text style={this.state.name != '' ? styles.bottomButtonTextDisabled : styles.bottomButtonText}> Save</Text>
			</TouchableOpacity>
		</View>)
	}
	/* #endregion */

	/* #region  Task Selection Region */
	showTasksSelectionModal() {
		if (this.state.tasksSelectionModalVisible) {
			return <MultipleSelectionModal
				animationType="fade"
				items={this.state.items}
				itemName="Tasks"
				titleTextColor={colorsProvider.tasksComplimentaryColor}
				titleContainerColor={colorsProvider.tasksMainColor}
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
					global.notifier.scheduleAllNotifications()
				})
			}
		}
	}

	renderTaskSelection() {
		if (this.state.tasks.length > 0) {
			return (
				<View style={styles.projectSectionContainer}>
					<TouchableOpacity style={styles.hasProjectSelectionContainer} onPress={() => {
						Keyboard.dismiss()
						this.setTaskSelectionModalVisibility(true);
					}}>
						<Text maxLines={2} style={styles.hasProjectSelectionButtonText}>{this.renderSelectedTasksString()}</Text>
						<Text style={styles.notificationTimeButtonText}>

							<SIcon name="list" size={20} color={colorsProvider.projectsComplimentaryColor} />
						</Text>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View style={styles.projectSectionContainer}>
					<TouchableOpacity style={styles.createProjectSelectionContainer}
						onPress={() => {
							Keyboard.dismiss
							this.setTaskSelectionModalVisibility(true);
						}}>
						<Text style={styles.createProjectSelectionButtonText}>Do you have any tasks that go here?</Text>
						<Text style={styles.notificationTimeButtonText}>
							<SIcon name="list" size={20} color={colorsProvider.projectsPlaceholderColor} />
						</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}
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
