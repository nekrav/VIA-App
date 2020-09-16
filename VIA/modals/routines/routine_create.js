import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, PixelRatio } from 'react-native'; // Version can be specified in package.json
import { MultipleSelectionModal } from '../selectionModal/multipleSelectionModal'
import { DateModal } from '../dateModal/dateModal'
import { NotesModal } from '../notesModal/notesModal';
import { NotificationTimesModal } from '../notificationTimes/notificationTimesModal'
import { Database, Habits, Routines } from '../../db'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Moment from 'moment';
import { TopBar, NotificationTimes, Notes, StartEndTime } from '../../components'

import NotifService from '../../notifier/newNotifier';

const controller = new Controller;
const dateFormat = 'hh:mm A'
const todayDate = new Date();
const styles = require('./styles');
var uuid = require('react-native-uuid');
const TOP_MARGIN = PixelRatio.get() < 3 ? 0 : 50;

const empty = ""
var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var year = new Date().getFullYear(); //Current Year
const timeDisplayFormat = 'hh:mm A'
const dateToday = new Date(year, month, date);



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
		this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );
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
			startTime: '',
			endTIme: '',
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

	/* #region  StartEndTime */
	renderStartEndTime() {
		return (<StartEndTime
			startTime={this.state.startTime}
			endTime={this.state.endTime}
			color={colorsProvider.routinesMainColor}
			setStartTime={item => {
				this.props.start_time(item);
				this.setState({ startTime: item });
			}}
			setEndTime={item => {
				this.props.end_time(item);
				this.setState({ endTime: item });
			}}
		/>)

	}

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
					this.notif.scheduleAllNotifications();
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

						{/* {this.renderStartEndTime()} */}

						{this.renderNotificationTimes()}

						{this.renderNotesSection()}

						{this.renderBottomButtons()}

					</View>
				</TouchableWithoutFeedback>
			</Modal>
		);
	}
}