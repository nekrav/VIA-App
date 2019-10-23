import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, BackHandler } from 'react-native'; // Version can be specified in package.json
import { Controller } from '../controller';
import { Database, Projects, Tasks } from '../../db'

const controller = new Controller;

export class ViewTask extends React.Component {

    constructor(props) {
        super(props);
        console.warn(props)
        this.state = {
            canEdit: false,
            selectedItem: this.props.selectedItem,
            // project: controller.getOne(this, Projects.TABLE_NAME, this.props.selectedItem.project),
        };
    }

    // componentDidMount() {
    //     // controller.getOne(this, Projects.TABLE_NAME, this.state.project)
    // }

    canEdit() {
        this.setState({ canEdit: true })
    }

    render() {
        // if (this.state.project != {}) {
            // console.warn(this.state.project)
            return (
                <Modal
                    animationType={this.props.animationType}
                    transparent={this.props.transparent}
                    visible={this.props.visible}
                    onRequestClose={this.props.onRequestClose}>
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
                    <View>
                        <Text>Project</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            // value={this.state.project}
                            onChangeText={this.props.editProject}>
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
    // }

}