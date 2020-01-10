import React from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Button, Dimensions } from 'react-native'; // Version can be specified in package.json
import { SelectionModal } from '../selectionModal/selectionModal'
import { DateModal } from '../dateModal/dateModal'
import { notificationTimesModal, NotificationTimesModal } from '../notificationTimes/notificationTimesModal'
import { Database, Projects } from '../../db'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/Feather';
import Moment from 'moment';
import Slider from '@react-native-community/slider';
import SlidingPanel from 'react-native-sliding-up-down-panels';
const controller = new Controller;
const dateFormat = 'ddd, MMM Do, YY'
const todayDate = new Date();
const styles = require('./styles');
import { getInset } from 'react-native-safe-area-view';


export class CreateTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newTask: this.props.newTask,
            projectSelectionModalVisible: false,
            items: [],
            theSelectedProject: "",
            showDate: false,
            itemDate: "",
            itemNotificationTimes: '',
            newTaskImportance: 0,
            notificationTimesModal: false,
            newTaskName: '',
        };
    }
    componentDidMount() {

        controller.loadAll(this, Projects.TABLE_NAME);
    }

    showProjectSelectionModal() {
        if (this.state.projectSelectionModalVisible) {
            return <SelectionModal
                animationType="fade"
                items={this.state.items}
                itemName="Project"
                transparent={true}
                selectItem={(item) => {
                    this.props.project(item.key)
                    this.setState({ theSelectedProject: item.value.name }, () => {
                    })
                }}
                closeModal={() => { this.setProjectSelectionModalVisibility(false) }}>
            </SelectionModal>
        }
    }



    setDateModalVisibility(visible) {
        this.setState({ showDate: visible })
    }

    setProjectSelectionModalVisibility(visible) {
        this.setState({ projectSelectionModalVisible: visible })
    }

    setProjectSelectionModalNotVisible() {
        this.setState({ projectSelectionModalVisible: false })
    }

    renderProjectSelection() {
        if (this.state.theSelectedProject != "") {
            this.props.project = this.state.theSelectedProject;
            return (
                <TouchableOpacity style={styles.createProjectSelectionContainer} onPress={() => {
                    this.setProjectSelectionModalVisibility(true);
                }}>
                    <Text style={styles.createProjectSelectionButtonText}>{this.state.theSelectedProject}</Text>
                    <Text style={styles.notificationTimeButtonText}>
                        <SIcon name="layers" size={20} color="#ABABAB" />
                    </Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.createProjectSelectionContainer} onPress={this.setProjectSelectionModalVisibility.bind(this)}>
                    <Text style={styles.createProjectSelectionButtonText}>Is this part of a bigger project?</Text>
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

    renderNotificationTimes() {
        if (this.state.itemNotificationTimes != '') {
            console.warn(this.state.itemNotificationTimes.length)
        }
        return (<TouchableOpacity
            style={styles.notificationTimesButtonContainer}
            onPress={() => {
                this.setNotificationTimesVisibility(true);
            }}>
            <Text style={styles.notificationTimeButtonText}>
                When would you like to be notified?
                </Text>

            <Text style={styles.notificationTimeButtonText}>
                <SIcon name="clock" size={20} color="#ABABAB" />
            </Text>
        </TouchableOpacity>
        )

    }

    render() {
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={this.props.transparent}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                {this.showProjectSelectionModal()}

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <SafeAreaView style={styles.outerView}>
                        <View style={styles.topNav}>
                            <TouchableOpacity style={styles.topNavBackButton}
                                onPress={this.props.closeModal}>
                                <SIcon name="arrow-left" size={30} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => { this.nameTextInput.focus(); }}
                            style={styles.createNameContainer}>
                            <TextInput
                                ref={(input) => { this.nameTextInput = input; }}
                                maxLength={40}
                                style={styles.createNameText}
                                multiline={true}
                                placeholder={"Name"}
                                onChangeText={value => {
                                    this.setState({ newTaskName: value })
                                    this.props.name(value)
                                }}>
                            </TextInput>
                        </TouchableOpacity>
                        {this.renderDueDate()}
                        {this.renderNotificationTimesModal()}
                        <View style={styles.slidersSection}>
                            <View style={styles.slidersTitlesContainer}>
                                <View style={styles.sliderTitleContainerCenter}>
                                    <Text style={this.state.newTaskImportance > 0 ? styles.sliderTitleNull : styles.sliderTitle}>
                                        Importance
                        </Text>
                                </View>
                            </View>

                            <View style={styles.slidersContainer}>
                                {this.renderShowDate()}
                                <View style={styles.sliderContainerCenter}>
                                    <Slider
                                        style={styles.sliderSlider}
                                        minimumValue={0}
                                        maximumValue={100}
                                        minimumTrackTintColor={styles.blueColor}
                                        maximumTrackTintColor={styles.placeholderColor}
                                        onSlidingComplete={(value) => {
                                            this.setState({ newTaskImportance: value })
                                            this.props.importance(value)
                                        }}
                                        onValueChange={(value) => {
                                            this.setState({ newTaskImportance: value })
                                            this.props.importance(value)
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.projectSectionContainer}>
                            {this.renderProjectSelection()}
                        </View>
                        {this.renderNotificationTimes()}

                        <TouchableOpacity style={styles.createNotesContainer}>
                            <Text
                                style={styles.createNotesText}
                                multiline={true}
                                onChangeText={this.props.notes}>Notes ...
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.bottomButtonsContainer}>
                            <TouchableOpacity
                                disabled={this.state.newTaskName != '' ? false : true}
                                style={this.state.newTaskName != '' ? styles.bottomButtonLeft : styles.bottomButtonLeftDisabled}
                                onPress={this.props.save}>
                                <Text style={styles.bottomButtonText} >Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottomButtonRight} onPress={this.props.closeModal}>
                                <Text style={styles.bottomButtonText} >Close</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}