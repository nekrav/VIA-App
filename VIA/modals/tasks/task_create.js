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
            itemDate: ""
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
                <View style={styles.projectSectionView}>
                    <TouchableOpacity style={styles.projectSelectionButtonText} onPress={() => {
                        this.setProjectSelectionModalVisibility(true);
                    }}>
                        <Text style={styles.projectSelectionButtonText}>{this.state.theSelectedProject}</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.projectSectionView}>
                    <TouchableOpacity style={styles.projectSelectionButtonText} onPress={this.setProjectSelectionModalVisibility.bind(this)}>
                        <Text style={styles.projectSelectionButtonText}>Select Project</Text>
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

    renderDueDate() {
        if (this.state.itemDate != "") {
            return (
                <View style={styles.dueDateView}>
                    <TouchableOpacity onPress={() => this.setDateModalVisibility(true)}>
                        <Text style={styles.dateText}>
                            {Moment(new Date(this.state.itemDate)).format(dateFormat)}
                            {/* {this.state.itemDate} */}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.dateText}>
                        {Moment(new Date(this.state.itemDate)).diff({ todayDate }, "days") + " days left"}
                    </Text>
                </View>)
        }
        return (
            <View style={styles.dueDateView}>
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
                            <View style={styles.trashButton}
                                onPress={this.props.delete}>
                                <Text style={styles.topNavText}>Add Task</Text>
                            </View>
                        </View>
                 
                        <View style={styles.titleContainer}>
                            <View style={styles.nameContainer}>
                                <TextInput
                                    maxLength={40}
                                    style={styles.nameTextInput}
                                    multiline={true}
                                    placeholder={"Name"}
                                    onChangeText={this.props.name}>
                                </TextInput>
                            </View>
                        </View>
                        {/* <View>
                    <Text>Name</Text>
                    <TextInput
                        onChangeText={this.props.name}>
                    </TextInput>
                </View> */}
                        <View style={styles.dateContainer}>
                            {this.renderDueDate()}
                        </View>
                        <View style={styles.slidersSection}>
                            <View style={styles.slidersTitlesContainer}>
                                <View style={styles.sliderTitleContainerCenter}>
                                    <Text style={styles.sliderTitle}>
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
                                        maximumTrackTintColor="#2d3142"
                                        onSlidingComplete={(value) => {
                                            this.props.importance(value)
                                        }}
                                        onValueChange={(value) => {
                                            this.props.importance(value)
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.projectSectionContainer}>
                            {this.renderProjectSelection()}
                        </View>
                        <View>
                            <Text>Notification Time</Text>
                            <TextInput
                                onChangeText={this.props.notification_time}>
                            </TextInput>
                        </View>
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
                            <TouchableOpacity style={styles.bottomButton} onPress={this.props.closeModal}>
                                <Text style={styles.bottomButtonText} >Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottomButton} onPress={this.props.save}>
                                <Text style={styles.bottomButtonText} >Save</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}