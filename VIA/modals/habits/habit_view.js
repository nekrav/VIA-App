import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, BackHandler } from 'react-native'; // Version can be specified in package.json
import { Controller } from '../controller';

import { SelectionModal } from '../selectionModal/selectionModal'
import { Database, Routines, Habits} from '../../db'

const controller = new Controller;
export class ViewHabit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canEdit: false,
            selectedItem: this.props.selectedItem,
            routineSelectionModalVisible: false,
            items: [],
            routine: null,
            routineName: "",
            theSelectedRoutine: "",
        };
    }

    componentDidMount() {
        controller.loadAll(this, Routines.TABLE_NAME);
        if (this.state.selectedItem.routine != "") {
            Database.getOne(Routines.TABLE_NAME, this.state.selectedItem.routine).then((res) => {
                this.setState({ routine: res.rows.item(0), routineName:res.rows.item(0).name })
            })
        }
    }

    showRoutineSelectionModal() {
        if (this.state.routineSelectionModalVisible) {
            return <SelectionModal
                animationType="fade"
                items={this.state.items}
                itemName="Routine"
                transparent={true}
                selectItem={(item) => {
                    this.props.editRoutine(item.value.id)
                    this.setState({ routineName: item.value.name })
                }}
                closeModal={() => { this.setRoutineSelectionModalNotVisible() }}>
            </SelectionModal>
        }
        // return null;
    }

    setRoutineSelectionModalVisible() {
        this.setState({ routineSelectionModalVisible: true })
    }

    setRoutineSelectionModalNotVisible() {
        this.setState({ routineSelectionModalVisible: false })
    }

    canEdit() {
        this.setState({ canEdit: true })
    }


    renderRoutineName() {
        if (this.state.selectRoutine != "")
        {
            return this.state.selectRoutine 
        }
        return this.state.routine.name
    }

    renderRoutineSection() {
        if (this.state.routine != null) {
            return (<View>
                <Text>Routine</Text>
                <TouchableOpacity disabled={!this.state.canEdit}
                     onPress={() => {
                        this.setRoutineSelectionModalVisible();
                    }}>
                    <Text>{this.state.routineName}</Text>
                </TouchableOpacity>
            </View>);
        }
        if (this.state.routineName != "") {
            return (<View>
                <Text>Routine</Text>
                <TouchableOpacity disabled={!this.state.canEdit}
                     onPress={() => {
                        this.setRoutineSelectionModalVisible();
                    }}>
                    <Text>{this.state.routineName}</Text>
                </TouchableOpacity>
            </View>);
        }
        return (<View>
            <Text>Routine</Text>
            <TouchableOpacity disabled={!this.state.canEdit}
                     onPress={() => {
                        this.setRoutineSelectionModalVisible();
                    }}>
            <Text>No Routine Selected</Text>
            </TouchableOpacity>
        </View>);
    }

    render() {
        if (this.props.selectedItem != {}) {
            return (
                <Modal
                    animationType={this.props.animationType}
                    transparent={this.props.transparent}
                    visible={this.props.visible}
                    onRequestClose={this.props.onRequestClose}>
                    {this.showRoutineSelectionModal()}
                    <View style={{ marginTop: 22, alignItems: "center" }}>
                        <Text>View Habit</Text>
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
                        <Text>Due Time</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            value={this.props.selectedItem.due_time}
                            onChangeText={this.props.editDueTime}>
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
                        <Text>Time to Spend</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            value={this.props.selectedItem.time_to_spend}
                            onChangeText={this.props.editTimeToSpend}>
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
                    {this.renderRoutineSection()}
                    <View>
                        <Text>Days to do</Text>
                        <TextInput
                            editable={this.state.canEdit}
                            value={this.props.selectedItem.days_to_do}
                            onChangeText={this.props.editDaysToDo}>
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