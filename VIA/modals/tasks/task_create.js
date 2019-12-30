import React from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Button, Dimensions } from 'react-native'; // Version can be specified in package.json
import { SelectionModal } from '../selectionModal/selectionModal'
import { DateModal } from '../dateModal/dateModal'
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

const { width, height } = Dimensions.get('window');

const landScape = width > height;
const topPadding = getInset('top', landScape);
const bottomPadding = getInset('bottom', landScape);

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
            newTaskImportance: 0,
            notificationTimesModal: false,
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
                <View style={styles.createTitleContainer}>
                    <TouchableOpacity style={styles.projectSelectionButtonText} onPress={() => {
                        this.setProjectSelectionModalVisibility(true);
                    }}>
                        <Text style={styles.selectedProjectSelectionButtonText}>{this.state.theSelectedProject}</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.createTitleContainer}>
                    <TouchableOpacity style={styles.projectSelectionButtonText} onPress={this.setProjectSelectionModalVisibility.bind(this)}>
                        <Text style={styles.projectSelectionButtonText}>Is this part of a bigger project?</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    renderShowDate() {
        if (this.state.showDate) {
            return <DateModal
                animationType="fade"
                transparent={true}
                setDate={(item) => {
                    this.props.due_date(item)
                    this.setState({ itemDate: item })
                }}
                closeModal={() => { this.setDateModalVisibility(false) }}>
            </DateModal>
        }
        return null;
    }

    setNotificationTimesVisibility(visibility) {
        this.setState({ notificationTimesModal: visible })
    }

    renderDueDate() {
        if (this.state.itemDate != "") {
            return (
                <View style={styles.dueDateView}>
                    <TouchableOpacity onPress={() => this.setDateModalVisibility(true)}>
                        <Text style={styles.selectedDateText}>
                            {Moment(new Date(this.state.itemDate)).format(dateFormat)}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.selectedDateText}>
                        {Moment(new Date(this.state.itemDate)).diff({ todayDate }, "days") + " days left"}
                    </Text>
                </View>)
        }
        return (
            <View style={styles.createTitleContainer}>
                <TouchableOpacity onPress={() => this.setDateModalVisibility(true)}>
                    <Text style={styles.dateText}>
                        When do you want to finish this?
                        </Text>
                </TouchableOpacity>
            </View>)
    }

    render() {
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={this.props.transparent}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                {this.showProjectSelectionModal()}
                {this.renderShowDate()}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <SafeAreaView style={styles.outerView}>
                        <View style={styles.topNav}>
                            <TouchableOpacity style={styles.backButton}
                                onPress={this.props.closeModal}>
                                <SIcon name="arrow-left" size={30} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.createTitleContainer}>
                            <TextInput
                                maxLength={40}
                                style={styles.createNameTextInput}
                                multiline={true}
                                placeholder={"Name"}
                                onChangeText={this.props.name}>
                            </TextInput>
                        </View>
                        {/* <View style={styles.dateContainer}> */}
                        {this.renderDueDate()}
                        {/* </View> */}
                        <View style={styles.slidersSection}>
                            <View style={styles.slidersTitlesContainer}>
                                <View style={styles.sliderTitleContainerCenter}>
                                    <Text style={this.state.newTaskImportance > 0 ? styles.sliderTitleNull : styles.sliderTitle}>
                                        Importance
                        </Text>
                                </View>
                            </View>
                            <View style={styles.slidersContainer}>
                                <View style={styles.sliderContainerCenter}>
                                    <Slider
                                        style={{ width: 250, height: 1, transform: [{ rotate: '270deg' }] }}
                                        minimumValue={0}
                                        maximumValue={100}
                                        minimumTrackTintColor="#068ae8"
                                        maximumTrackTintColor="#ABABAB"
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
                        
                            <TouchableOpacity
                                style={styles.notificationTimesButtonContainer}
                                onPress={() => {
                                    this.setNotificationTimesVisibility(true);
                                }}>
                                <Text style={styles.notificationTimeButtonText} >When would you like to be notified?  </Text>
                               
                                <Text style={styles.notificationTimeButtonText} > <SIcon name="clock" size={20} color="#ABABAB" /> </Text>
                               
                            
                            </TouchableOpacity>
                        <View style={styles.notesContainer}>
                            <Text style={styles.notesTitle}>Notes</Text>
                            <TouchableOpacity>
                                <Text
                                    style={styles.notesTextInput}
                                    multiline={true}
                                    onChangeText={this.props.notes}>...
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomButtonsContainer}>
                            <TouchableOpacity style={styles.bottomButtonLeft} onPress={this.props.save}>
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