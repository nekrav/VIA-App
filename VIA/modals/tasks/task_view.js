import React from 'react';
import { Animated, Text, View, TouchableOpacity, TouchableHighlight, TextInput, BackHandler, SafeAreaView, Button } from 'react-native'; // Version can be specified in package.json
import { Controller } from '../controller';
import { SelectionModal } from '../selectionModal/selectionModal'
import { Database, Projects, Tasks } from '../../db'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { VerticalSlider } from "../../components";
import Modal from "react-native-modal";


const controller = new Controller;

const styles = require('./styles');

export class ViewTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canEdit: false,
            selectedItem: this.props.selectedItem,
            projectSelectionModalVisible: false,
            items: [],
            proj: null,
            projName: "",
            theSelectedProject: "",
            importance: this.props.selectedItem.importance,
        };
    }

    componentDidMount() {
        controller.loadAll(this, Projects.TABLE_NAME);
        if (this.state.selectedItem.project != "") {
            Database.getOne(Projects.TABLE_NAME, this.state.selectedItem.project).then((res) => {
                this.setState({ proj: res.rows.item(0), projName: res.rows.item(0).name })
            })
        }
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
                }}
                closeModal={() => { this.setProjectSelectionModalNotVisible() }}>
            </SelectionModal>
        }
        // return null;
    }

    setProjectSelectionModalVisible() {
        this.setState({ projectSelectionModalVisible: true })
    }

    setProjectSelectionModalNotVisible() {
        this.setState({ projectSelectionModalVisible: false })
    }

    canEdit() {
        this.setState({ canEdit: true })
    }

    renderProjName() {
        if (this.state.selectProject != "") {
            return this.state.selectProject
        }
        return this.state.proj.name
    }

    renderProjectSection() {
        if (this.state.proj != null) {
            return (<View>
                <Text>Project</Text>
                <TouchableOpacity disabled={!this.state.canEdit}
                    onPress={() => {
                        this.setProjectSelectionModalVisible();
                    }}>
                    <Text>{this.state.projName}</Text>
                </TouchableOpacity>
            </View>);
        }
        if (this.state.projName != "") {
            return (<View>
                <Text>Project</Text>
                <TouchableOpacity disabled={!this.state.canEdit}
                    onPress={() => {
                        this.setProjectSelectionModalVisible();
                    }}>
                    <Text>{this.state.projName}</Text>
                </TouchableOpacity>
            </View>);
        }
        return (<View>
            <Text>Project</Text>
            <TouchableOpacity disabled={!this.state.canEdit}
                onPress={() => {
                    this.setProjectSelectionModalVisible();
                }}>
                <Text>No Project Selected</Text>
            </TouchableOpacity>
        </View>);
    }

    renderDueDate() {
        if (this.state.selectedItem.due_date != "") {
            return (
                <View style={styles.dueDateView}>
                    <TextInput
                        editable={this.state.canEdit}
                        value={this.props.selectedItem.due_date}
                        onChangeText={this.props.editDueDate}>
                    </TextInput></View>)
        }
        return (
            <View style={styles.dueDateView}>
                <TextInput
                    editable={this.state.canEdit}
                    value="No Due Date"
                    onChangeText={this.props.editDueDate}>
                </TextInput></View>)
    }

    handlerClick = () => {
        //handler for Long Click
        Alert.alert(' Button Long Pressed');
    };

    render() {
        return (
            <Modal
            isVisible={() => this.props.visible}
                backdropOpacity={0}
                // hasBackdrop={false}
                animationIn='slideInUp'	
                animationInTiming="500"
                // backdropTransitionOutTiming={0}
                // animationOut='zoomInDown'
                // coverScreen={true}
                style={{ margin: 0 }}
                // onSwipeMove={this.props.closeModal}
                onSwipeComplete={this.props.closeModal}
                swipeDirection={"right"}
                // transparent={this.props.transparent}
               
                // onRequestClose={this.props.onRequestClose}
                >
                {/* {this.showProjectSelectionModal()} */}
                <SafeAreaView style={styles.outerView}>
                    <View style={styles.topNav}>
                        <TouchableOpacity style={styles.backButton}
                            onPress={this.props.closeModal}>
                            <Icon name="arrow-left" size={35} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleContainer}>
                        <View style={styles.nameContainer}>

                            <TextInput
                                style={styles.nameTextInput}
                                multiline={true}
                                value={this.props.selectedItem.name}
                                onChangeText={this.props.editName}>
                            </TextInput>
                        </View>
                        {this.renderDueDate()}
                    </View>
                    {/* <View style={styles.completeButtonContainer}> */}
                    <TouchableOpacity
                        style={styles.completeButtonBody}
                        onPress={() => this.props.editCompleted("true")}>
                        <Text style={styles.completeButtonText}>Complete</Text>
                    </TouchableOpacity>
                    {/* </View> */}

                    <View style={styles.sliders}>
                        <View style={styles.verticalSliderContainer}>
                            <Text>Importance</Text>
                            <VerticalSlider
                                value={parseInt(this.state.selectedItem.importance)}
                                disabled={false}
                                min={0}
                                max={100}
                                onChange={(value: number) => {
                                    // this.props.editImportance(value)
                                    this.props.editImportance(value)
                                }}
                                onComplete={(value: number) => {
                                    this.props.editImportance(value)
                                    this.props.editCompleted("true")
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
                            {/* <TextInput
                            editable={this.state.canEdit}
                            value={this.props.selectedItem.importance}
                            onChangeText={this.props.editImportance}>
                        </TextInput> */}
                        </View>
                        <View>
                            <Text>Percentage Done</Text>
                            <TextInput
                                editable={this.state.canEdit}
                                value={this.props.selectedItem.percentage_done}
                                onChangeText={this.props.editPercentageDone}>
                            </TextInput>
                        </View>
                        <View>
                            <Text>Time Spent</Text>
                            <TextInput
                                editable={this.state.canEdit}
                                value={this.props.selectedItem.time_spent}
                                onChangeText={this.props.editTimeSpent}>
                            </TextInput>
                        </View>
                    </View>
                    <View>
                        <Text>Completed</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            value={this.props.selectedItem.completed}
                            onChangeText={this.props.editCompleted}>
                        </TextInput>
                    </View>
                    {this.renderProjectSection()}
                    <View>
                        <Text>Notification Time</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            value={this.props.selectedItem.notification_time}
                            onChangeText={this.props.editNotificationTime}>
                        </TextInput>
                    </View>
                    <View>
                        <Text>Notes</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            value={this.props.selectedItem.notes}
                            onChangeText={this.props.editNotes}>
                        </TextInput>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.props.closeModal}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.save}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.delete}>
                            <Text>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.canEdit()}>
                            <Text>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        );
    }


}