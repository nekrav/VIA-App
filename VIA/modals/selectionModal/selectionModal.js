import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, FlatList } from 'react-native'; // Version can be specified in package.json

export class SelectionModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
        };
    }
    render() {
        if (this.state.items != null) {
            return (
                <Modal
                    animationType={this.props.animationType}
                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={this.props.onRequestClose}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        {this.props.children}

                        <View style={{ marginTop: 22, alignItems: "center" }}>
                            <Text>Select {this.props.itemName} </Text>
                        </View>
                        <FlatList
                            data={this.props.items}
                            renderItem={({ item }) => <TouchableOpacity
                                // style={}
                                onPress={
                                    () => {
                                        this.props.closeModal();
                                        this.props.selectProject(item);
                                    }
                                }>
                                <View
                                // style={styles.listItem}
                                >
                                    <Text
                                    // style={styles.itemName}
                                    >{item.value.name}</Text>
                                </View>
                            </TouchableOpacity>} />
                        <View>
                            <TouchableOpacity onPress={this.props.closeModal}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            );
        }

    }
}