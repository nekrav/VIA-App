import React from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput } from 'react-native'; // Version can be specified in package.json
import { SelectionModal} from '../selectionModal/selectionModal'
import { Database, Projects} from '../../db'
import { Controller } from '../controller'

const controller = new Controller;

export class CreateTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newTask: this.props.newTask,
            projectSelectionModalVisible: false,
            items: [],
            projects: [],
        };
    }
    componentDidMount() {
        // controller.loadAll(this, Projects.TABLE_NAME);
        console.warn("called mount")
        this.getProjects();

    }

    getProjects() {
        console.warn("called get project");
        // controller.loadAll(this, Projects.TABLE_NAME).bind(this);
        const itemsArr = []
        Database.getAll(Projects.TABLE_NAME)
        .then((res) => {
            console.warn("Got into db")
            const len = res.rows.length;
            console.warn(len)
            let item = {}
            for (let i = 0; i < len; i++) {
                item = res.rows.item(i)
                console.warn(i)
                itemsArr.push({ key: JSON.stringify(item.id), value: item })      
            }
            this.setState({
                items: itemsArr
            })
        })
    }


    showProjectSelectionModal() {
        if (this.state.projectSelectionModalVisible) {
            return <SelectionModal
                animationType="slide"
                items={this.state.items}
                itemName="Projects"
                transparent={true}
                closeModal={() => { this.setProjectSelectionModalNotVisible() }}>
            </SelectionModal>
        }
    }

    setProjectSelectionModalVisible() {
        this.setState({ projectSelectionModalVisible: true })
    }

    setProjectSelectionModalNotVisible() {
        this.setState({ projectSelectionModalVisible: false })
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
                    <TextInput
                        onChangeText={this.props.due_date}>
                    </TextInput>
                </View>
                <View>
                    <Text>Importance</Text>
                    <TextInput
                        onChangeText={this.props.importance}>
                    </TextInput>
                </View>
                <View>
                    <Text>Project</Text>
                    <TouchableOpacity onPress={this.setProjectSelectionModalVisible.bind(this)}>
                        <Text>Select Project</Text>
                    </TouchableOpacity>
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