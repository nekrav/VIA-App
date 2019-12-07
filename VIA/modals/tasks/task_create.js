import React from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput } from 'react-native'; // Version can be specified in package.json
import { SelectionModal } from '../selectionModal/selectionModal'
import { DateModal } from '../dateModal/dateModal'
import { Database, Projects } from '../../db'
import { Controller } from '../controller'

const controller = new Controller;

const styles = require('./styles');

export class CreateTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newTask: this.props.newTask,
            projectSelectionModalVisible: false,
            items: [],
            theSelectedProject: "",
            showDate: false,
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
                closeModal={() => { this.setProjectSelectionModalNotVisible() }}>
            </SelectionModal>
        }
    }

    

    setDateModalVisibility(visible) {
        this.setState({ showDate: visible })
    }

    setProjectSelectionModalVisible() {
        this.setState({ projectSelectionModalVisible: true })
    }

    setProjectSelectionModalNotVisible() {
        this.setState({ projectSelectionModalVisible: false })
    }

    renderProjectSelection() {
        if (this.state.theSelectedProject != "") {
            this.props.project = this.state.theSelectedProject;
            return (
                <TouchableOpacity onPress={() => {
                    this.setProjectSelectionModalVisible();
                }}>
                    <Text>{this.state.theSelectedProject}</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={this.setProjectSelectionModalVisible.bind(this)}>
                    <Text>Select Project</Text>
                </TouchableOpacity>
            );
        }
    }

    renderShowDate() {
        if (this.state.showDate) {
            return <DateModal
                animationType="fade"
                itemDate={this.props.selectedItem.due_date ? this.props.selectedItem.due_date : ""}
                itemName="Project"
                transparent={true}
                setDate={(item) => {
                    this.props.editDueDate(item)
                    this.setState({ dueDate: item })
                    this.props.save();
                }}
                closeModal={() => { this.setDateModalVisibility(false) }}>
            </DateModal>
        }
        return null;
    }

    renderDueDate() {
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
                <View style={{ marginTop: 22, alignItems: "center" }}>

                    <Text>Add Task</Text>
                </View>
                <View>
                    <Text>Name</Text>
                    <TextInput
                        onChangeText={this.props.name}>
                    </TextInput>
                </View>
                <View>
                    <Text>Due Date</Text>
                   {this.renderDueDate()}
                </View>
                <View>
                    <Text>Importance</Text>
                    <TextInput
                        onChangeText={this.props.importance}>
                    </TextInput>
                </View>
                <View>
                    <Text>Project</Text>
                    {this.renderProjectSelection()}
                </View>
                <View>
                    <Text>Notification Time</Text>
                    <TextInput
                        onChangeText={this.props.notification_time}>
                    </TextInput>
                </View>
                <View>
                    <Text>Notes</Text>
                    <TextInput
                        onChangeText={this.props.notes}>
                    </TextInput>
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