import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, FlatList, SafeAreaView } from 'react-native'; // Version can be specified in package.json

const styles = require('./styles');

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
                    <SafeAreaView style={styles.outerView}>
                        {this.props.children}
                        <View style={styles.titleView}>
                            <Text style={styles.titleText}>Select {this.props.itemName} </Text>
                        </View>
                        <FlatList
                            data={this.props.items}
                            renderItem={({ item }) => <TouchableOpacity
                                style={styles.projectContainer}
                                onPress={() => {
                                    this.props.closeModal();
                                    this.props.selectItem(item)
                                }}>
                                    <Text
                                        style={styles.projectText}
                                    >{item.value.name}</Text>
                            </TouchableOpacity>} />
                        <View>
                            <TouchableOpacity style={styles.closeButtonContainer} onPress={this.props.closeModal}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>
            );
        }
    }
}