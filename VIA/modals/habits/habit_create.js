import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput } from 'react-native'; // Version can be specified in package.json
import { Database, Routines } from '../../db'
import { SelectionModal } from '../selectionModal/selectionModal'
import { Controller } from '../controller'
const controller = new Controller;

export class CreateHabit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newHabit: this.props.newHabit,
            routineSelectionModalVisible: false,
            items: [],
            theSelectedRoutine: "",
        };
    }

    componentDidMount() {
        controller.loadAll(this, Routines.TABLE_NAME);
    }

    showRoutineSelectionModal() {
        if (this.state.routineSelectionModalVisible) {
            return <SelectionModal
                animationType="fade"
                items={this.state.items}
                itemName="Routines"
                transparent={true}
                selectItem={(item) => {
                    this.props.routine(item.key)
                    this.setState({ theSelectedRoutine: item.value.name }, () => {
                    })
                }}
                closeModal={() => { this.setRoutineSelectionModalNotVisible() }}>
            </SelectionModal>
        }
    }

    setRoutineSelectionModalVisible() {
        this.setState({ routineSelectionModalVisible: true })
    }

    setRoutineSelectionModalNotVisible() {
        this.setState({ routineSelectionModalVisible: false })
    }

    renderRoutineSelection() {
        if (this.state.theSelectedRoutine != "") {
            this.props.routine = this.state.theSelectedRoutine;
            return (
                <TouchableOpacity onPress={() => {
                    this.setRoutineSelectionModalVisible();
                }}>
                    <Text>{this.state.theSelectedRoutine}</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={this.setRoutineSelectionModalVisible.bind(this)}>
                    <Text>Select Routine</Text>
                </TouchableOpacity>
            );
        }
    }

    render() {
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={this.props.transparent}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                    {this.showRoutineSelectionModal()}
                <View style={{ marginTop: 22, alignItems: "center" }}>
                    <Text>Add Habit</Text>
                </View>
                <View>
                    <Text>Name</Text>
                    <TextInput
                        onChangeText={this.props.name}>
                    </TextInput>
                </View>
                <View>
                    <Text>Due Time</Text>
                    <TextInput
                        onChangeText={this.props.due_time}>
                    </TextInput>
                </View>
                <View>
                    <Text>Importance</Text>
                    <TextInput
                        onChangeText={this.props.importance}>
                    </TextInput>
                </View>
                <View>
                    <Text>Time to Spend</Text>
                    <TextInput
                        onChangeText={this.props.time_to_spend}>
                    </TextInput>
                </View>
                <View>
                    <Text>Notification Time</Text>
                    <TextInput
                        onChangeText={this.props.notification_time}>
                    </TextInput>
                </View>
                <View>
                    <Text>Routine</Text>
                    {this.renderRoutineSelection()}
                </View>
                <View>
                    <Text>Days to do</Text>
                    <TextInput
                        onChangeText={this.props.days_to_do}>
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