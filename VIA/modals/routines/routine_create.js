import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput } from 'react-native'; // Version can be specified in package.json

export class CreateRoutine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newRoutine: this.props.newRoutine,
        };
    }
    render() {
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={this.props.transparent}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                <View style={{ marginTop: 22, alignItems: "center" }}>
                    <Text>Add Routine</Text>
                </View>
                <View>
                    <Text>Name</Text>
                    <TextInput
                        onChangeText={this.props.name}>
                    </TextInput>
                </View>
                <View>
                    <Text>Start Time</Text>
                    <TextInput
                        onChangeText={this.props.start_time}>
                    </TextInput>
                </View>
                <View>
                    <Text>End Time</Text>
                    <TextInput
                        onChangeText={this.props.end_time}>
                    </TextInput>
                </View>
                <View>
                    <Text>Notification Time</Text>
                    <TextInput
                        onChangeText={this.props.notification_time}>
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