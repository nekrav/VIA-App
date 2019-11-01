import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, BackHandler } from 'react-native'; // Version can be specified in package.json
import { Controller } from '../controller';
import { SelectionModal } from '../selectionModal/selectionModal'
import { Database, Projects, Tasks } from '../../db'

const controller = new Controller;

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
        };
    }

    componentDidMount() {
        controller.loadAll(this, Projects.TABLE_NAME);
        if (this.state.selectedItem.project != null) {
            Database.getOne(Projects.TABLE_NAME, this.state.selectedItem.project).then((res) => {
                this.setState({ proj: res.rows.item(0) , projName: res.rows.item(0).name})
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
                selectProject={(item) => {
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
        if (this.state.selectProject != "")
        {
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
        return (<View>
            <Text>Project</Text>
            <Text>No Project Selected</Text>
        </View>);
    }

    render() {
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={this.props.transparent}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                {this.showProjectSelectionModal()}
                <View style={{ marginTop: 22, alignItems: "center" }}>
                    <Text>View Task</Text>
                </View>

                <View>
                    <Text>Name</Text>
                    <TextInput
                        editable={this.state.canEdit}
                        value={this.props.selectedItem.name}
                        onChangeText={this.props.editName}>
                    </TextInput>
                </View>
                <View>
                    <Text>Created Date</Text>
                    <TextInput
                        editable={false}
                        value={this.props.selectedItem.created_date}>
                    </TextInput>
                </View>
                <View>
                    <Text>Due Date</Text>
                    <TextInput
                        editable={this.state.canEdit}
                        value={this.props.selectedItem.due_date}
                        onChangeText={this.props.editDueDate}>
                    </TextInput>
                </View>
                <View>
                    <Text>Importance</Text>
                    <TextInput
                        editable={this.state.canEdit}
                        value={this.props.selectedItem.importance}
                        onChangeText={this.props.editImportance}>
                    </TextInput>
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
                    <Text>Completed</Text>
                    <TextInput
                        editable={this.state.canEdit}
                        value={this.props.selectedItem.completed}
                        onChangeText={this.props.editCompleted}>
                    </TextInput>
                </View>
                {this.renderProjectSection()}
                <View>
                    <Text>Time Spent</Text>
                    <TextInput
                        editable={this.state.canEdit}
                        value={this.props.selectedItem.time_spent}
                        onChangeText={this.props.editTimeSpent}>
                    </TextInput>
                </View>
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
            </Modal>
        );
    }


}