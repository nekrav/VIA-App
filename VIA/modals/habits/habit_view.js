import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, BackHandler } from 'react-native'; // Version can be specified in package.json
import { Database, Habits } from '../../db'

export class ViewHabit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canEdit: false,
            newName: selectedHabit.name,
            selectedHabit: {}
        };
    }

    componentDidMount() {
        if (this.props.selectedHabit != {}) {
            this.loadHabit(this.props.selectedHabit.id);
        }

    }

    loadHabit(id) {
        let selectedHabit = {};
        Database.getOne(Habits.TABLE_NAME, this.props.selectedHabit.id).then((res) => {
            selectedHabit = res.rows.item(0)
            this.setState({ selectedHabit: selectedHabit })
        })
    }

    canEdit() {
        this.setState({ canEdit: true })
    }

    render() {
        // console.warn(this.state.selectedHabit)
        if (this.state.selectedHabit != {}) {
            return (
                <Modal
                    animationType={this.props.animationType}
                    transparent={this.props.transparent}
                    visible={this.props.visible}
                    onRequestClose={this.props.onRequestClose}>
                    <View style={{ marginTop: 22, alignItems: "center" }}>
                        <Text>View Habit</Text>
                    </View>
                    <View>
                        <Text>Name</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            value={"gaeg"}
                        // onChangeText={text => this.state.selectedHabit.name = text}
                        // onChangeText={this.props.editName}
                        >
                        </TextInput>
                    </View>
                    {/* <View>
                        <Text>Due Time</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            value={this.props.selectedHabit.due_time}
                            onChangeText={this.props.due_time}>
                        </TextInput>
                    </View>
                    <View>
                        <Text>Importance</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            value={this.props.selectedHabit.importance}
                            onChangeText={this.props.importance}>
                        </TextInput>
                    </View>
                    <View>
                        <Text>Time to Spend</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            value={this.props.selectedHabit.time_to_spend}
                            onChangeText={this.props.time_to_spend}>
                        </TextInput>
                    </View>
                    <View>
                        <Text>Notification Time</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            value={this.props.selectedHabit.notification_time}
                            onChangeText={this.props.notification_time}>
                        </TextInput>
                    </View>
                    <View>
                        <Text>Days to do</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            value={this.props.selectedHabit.days_to_do}
                            onChangeText={this.props.days_to_do}>
                        </TextInput>
                    </View> */}
                    <View>
                        <TouchableOpacity onPress={this.props.closeModal}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.save}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.deleteHabit}>
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