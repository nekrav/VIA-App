import React from 'react';
import { Text, View, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Controller } from '../controller';
import { SelectionModal } from '../selectionModal/selectionModal'
import { DateModal } from '../dateModal/dateModal'
import { Database, Projects } from '../../db'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/Feather';
import { VerticalSlider } from "../../components";
import Modal from "react-native-modal";
import Moment from 'moment';

const controller = new Controller;

const styles = require('./styles');

const empty = ""
const dateFormat = 'dddd, MMM Do, YY'

export class ViewTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canEdit: false,
            selectedItem: this.props.selectedItem,
            projectSelectionModalVisible: false,
            items: [],
            proj: null,
            projName: empty,
            theSelectedProject: empty,
            importance: this.props.selectedItem.importance,
            showDate: false,
            dueDate: '',
            notificationTimesModal: false,
        };
    }

    componentDidMount() {
        controller.loadAll(this, Projects.TABLE_NAME);
        if (this.state.selectedItem.project != empty) {
            Database.getOne(Projects.TABLE_NAME, this.state.selectedItem.project).then((res) => {
                this.setState({ proj: res.rows.item(0), projName: res.rows.item(0).name })
            })
        }
    }

    setProjectSelectionModalVisibility(visible) {
        this.setState({ projectSelectionModalVisible: visible })
    }

    setNotificationTimesVisibility(visible) {
        this.setState({ notificationTimesModal: visible })
    }

    showProjectSelectionModal() {
        if (this.state.projectSelectionModalVisible) {
            return <SelectionModal
                animationType="fade"
                items={this.state.items}
                itemName="Project"
                transparent={true}
                selectItem={(item) => {
                    this.props.editProject(item.value.id)
                    this.setState({ projName: item.value.name })
                    this.props.save();
                }}
                closeModal={() => { this.setProjectSelectionModalVisibility(false) }}>
            </SelectionModal>
        }
        return null;
    }

    setDateModalVisibility(visible) {
        this.setState({ showDate: visible })
    }

    renderShowDate() {
        if (this.state.showDate) {
            return <DateModal
                animationType="fade"
                itemDate={this.props.selectedItem.due_date ? this.props.selectedItem.due_date : empty}
                itemName="Project"
                transparent={true}
                setDate={(item) => {
                    this.props.editDueDate(item)
                    this.setState({ dueDate: item })
                    this.props.save();
                }}
                closeModal={() => { this.setDateModalVisibility() }}>
            </DateModal>
        }
        return null;
    }

    canEdit() {
        this.setState({ canEdit: true })
    }

    renderProjName() {
        if (this.state.selectProject != empty) {
            return this.state.selectProject
        }
        return this.state.proj.name
    }

    renderSliderSection() {
        return (
            <View style={styles.slidersContainer}>
                <View style={styles.verticalSliderContainer}>
                    <View style={styles.sliderTitleContainer}>
                        <Text style={styles.sliderTitle}>
                            Importance
                        </Text>
                    </View>
                    <VerticalSlider
                        value={parseInt(this.state.selectedItem.importance)}
                        disabled={false}
                        min={0}
                        max={100}
                        onChange={(value: number) => {
                            this.props.save;
                            this.props.editImportance(value);
                        }}
                        onComplete={(value: number) => {
                            this.props.editImportance(value)

                        }}
                        width={50}
                        height={300}
                        step={1}
                        borderRadius={5}
                        minimumTrackTintColor={"gray"}
                        maximumTrackTintColor={"tomato"}

                        ballIndicatorColor={"gray"}
                        ballIndicatorTextColor={"white"}
                    />
                </View>
                <View style={styles.verticalSliderContainer}>
                    <View style={styles.sliderTitleContainer}>
                        <Text style={styles.sliderTitle}>
                            % Done
                        </Text>
                    </View>
                    <VerticalSlider
                        value={parseInt(this.state.selectedItem.percentage_done)}
                        disabled={false}
                        min={0}
                        max={100}
                        onChange={(value: number) => {
                            // this.props.editImportance(value)
                            this.props.editPercentageDone(value);
                        }}
                        onComplete={(value: number) => {
                            this.props.editPercentageDone(value)
                            this.props.save();
                        }}
                        width={50}
                        height={300}
                        step={1}
                        borderRadius={5}
                        minimumTrackTintColor={"gray"}
                        maximumTrackTintColor={"tomato"}

                        ballIndicatorColor={"gray"}
                        ballIndicatorTextColor={"white"}
                    />
                </View>
            </View>)

    }

    renderDeleteSection() {
        return (
            <TouchableOpacity
                style={styles.projectSelectionButton}
                onPress={this.props.delete}>
                <SIcon name="close" size={30} color="#000" />
                <Text style={styles.projectSelectionButtonText} >Delete</Text>
            </TouchableOpacity>);

    }

    renderNotificationTimesSection() {
        return (
            <TouchableOpacity
                style={styles.projectSelectionButton}
                onPress={() => {
                    this.setNotificationTimesVisibility(true);
                }}>
                <Text style={styles.projectSelectionButtonText} >Notification Times</Text>
            </TouchableOpacity>);

    }

    renderProjectSection() {
        if (this.state.proj != null) {
            return (
                <View>
                    <Text style={styles.projectSelectionButtonText}>
                        {this.state.projName}
                    </Text>
                    <TouchableOpacity
                        style={styles.projectSelectionButton}
                        onPress={() => {
                            this.setProjectSelectionModalVisibility(true);
                        }}>
                        <FIcon name="edit-2" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

            );
        }
        if (this.state.projName != empty) {
            return (
                <View>
                    <Text style={styles.projectSelectionButtonText}>
                        {this.state.projName}
                    </Text>
                    <TouchableOpacity
                        style={styles.projectSelectionButton}
                        onPress={() => {
                            this.setProjectSelectionModalVisibility(true);
                        }}>
                        <FIcon name="edit-2" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View style={styles.projectSectionView}>
                <Text style={styles.projectSelectionButtonText}>
                    No Project Selected
                     </Text>
                <TouchableOpacity
                    style={styles.projectSelectionButton}
                    onPress={() => {
                        this.setProjectSelectionModalVisibility(true);
                    }}>
                    <FIcon name="edit-2" size={20} color="#000" />
                </TouchableOpacity>
            </View>
        );
    }

    renderCompleteButton() {
        return (<TouchableOpacity
            style={styles.completeButtonBody}
            onLongPress={() => this.props.editCompleted("false")}
            onPress={() => this.props.editCompleted("true")}>
            {this.renderCompleteButtonText()}
        </TouchableOpacity>)
    }

    renderCompleteButtonText() {
        if (this.state.selectedItem.completed == "true")
            return (<Text style={styles.completeButtonText}>Done</Text>)
        else
            return (<Text style={styles.completeButtonText}>Complete</Text>)
    }

    renderDueDate() {
        if (this.state.selectedItem.due_date != empty) {
            return (
                <View style={styles.dueDateView}>
                    <TouchableOpacity onPress={() => this.setDateModalVisibility(true)}>
                        <Text style={styles.dateText}>
                            {Moment(this.props.selectedItem.due_date).format(dateFormat)}
                        </Text>
                    </TouchableOpacity>
                </View>)
        }
        return (
            <View style={styles.dueDateView}>
                <TouchableOpacity onPress={() => this.setDateModalVisibility(true)}>
                    <Text style={styles.dateText}>
                        No Due Date
                        </Text>
                </TouchableOpacity>
            </View>)
    }

    render() {
        return (
            <Modal
                backdropOpacity={0}
                animationIn='slideInRight'
                animationInTiming={400}
                animationOut='slideOutRight'
                animationOutTiming={400}
                isVisible={this.props.visible}
                style={{ margin: 0 }}
                onSwipeComplete={this.props.closeModal}
                swipeDirection={"right"}>
                {this.renderShowDate()}
                {this.showProjectSelectionModal()}
                <SafeAreaView style={styles.outerView}>
                    <View style={styles.topNav}>
                        <TouchableOpacity style={styles.backButton}
                            onPress={this.props.closeModal}>
                            <SIcon name="arrow-left" size={30} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.trashButton}
                            onPress={this.props.delete}>
                            <SIcon name="trash" size={30} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleContainer}>
                        <View style={styles.nameContainer}>
                            <TextInput
                                maxLengh={40}
                                onEndEditing={this.props.save()}
                                style={styles.nameTextInput}
                                multiline={true}
                                value={this.props.selectedItem.name}
                                onChangeText={this.props.editName}>
                            </TextInput>
                        </View>
                    </View>
                    <View style={styles.dateContainer}>
                        {this.renderProjectSection()}
                    </View>

                    <View style={styles.dateContainer}>
                        {this.renderDueDate()}
                    </View>

                    {this.renderSliderSection()}
                    {this.renderCompleteButton()}
                    {/* {this.renderProjectSection()} */}
                    <View style={styles.projectsNotificationsSection}>
                        {this.renderNotificationTimesSection()}
                    </View>


                    <View style={styles.notesContainer}>
                        <Text>Notes</Text>
                        <TextInput
                            style={styles.notesTextInput}
                            multiline={true}
                            value={this.props.selectedItem.notes ? this.props.selectedItem.notes : "..."}
                            onChangeText={this.props.editNotes}>
                        </TextInput>
                    </View>

                </SafeAreaView>
            </Modal>
        );
    }
}