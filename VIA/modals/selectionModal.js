import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, FlatList} from 'react-native'; // Version can be specified in package.json

export class SelectionModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
        };
    }
    render() {
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                <View style={{ marginTop: 22, alignItems: "center" }}>
                    <Text>Select {this.props.itemName} </Text>
                </View>
                <FlatList
                    data={this.state.items}
                    renderItem={({ item }) => <TouchableOpacity
                        style={styles.itemButton}
                        onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }}>
                        <View style={styles.listItem}>
                            <CheckBox
                                style={styles.checkBox}
                                center
                                title='Click Here'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checked}
                            />
                            <Text style={styles.itemName}>{item.value.name}</Text>
                        </View>
                    </TouchableOpacity>} />
                <View>
                    <TouchableOpacity onPress={this.props.closeModal}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}