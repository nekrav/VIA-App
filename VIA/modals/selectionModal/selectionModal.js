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
                        <View style={styles.itemsContainerView}> 
                        <FlatList
                            data={this.props.items}
                            renderItem={({ item }) => 
                            <TouchableOpacity
                                style={styles.itemsContainer}
                                onPress={() => {
                                    this.props.closeModal();
                                    this.props.selectItem(item)
                                }}>
                                    <Text
                                        style={styles.itemText}
                                    >{item.value.name}</Text>
                            </TouchableOpacity>} />
                            </View>
                        <View>
                            <TouchableOpacity style={styles.bottomButtonContainer} onPress={this.props.closeModal}>
                                <Text style={styles.bottomButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>
            );
        }
    }
}