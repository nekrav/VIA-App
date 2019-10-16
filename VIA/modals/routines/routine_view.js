import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, BackHandler } from 'react-native'; // Version can be specified in package.json
import { Database, Projects } from '../../db'

export class ViewRoutine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canEdit: false,
        };
    }

    canEdit() {
        this.setState({ canEdit: true })
    }

    render() {
        if (this.props.selectedItem != {}) {
            return (
                <Modal
                    animationType={this.props.animationType}
                    transparent={this.props.transparent}
                    visible={this.props.visible}
                    onRequestClose={this.props.onRequestClose}>
                    <View style={{ marginTop: 22, alignItems: "center" }}>
                        <Text>View Routine</Text>
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
                        <Text>Start Time</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            value={this.props.selectedItem.start_time}
                            onChangeText={this.props.editStartTime}>
                        </TextInput>
                    </View>
                    <View>
                        <Text>End Time</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            value={this.props.selectedItem.end_time}
                            onChangeText={this.props.editEndTime}>
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
}