import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, FlatList, SafeAreaView } from 'react-native'; // Version can be specified in package.json
import { CheckBox } from 'react-native-elements'

const styles = require('./styles');


export class MultipleSelectionModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
        };
    }

    render() {
        if (this.state.items != null) {
            // console.warn(this.state.items.length)
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
                        <View style={styles.projectContainerView}>
                            <FlatList
                                data={this.props.items}
                                renderItem={({ item }) => 
                                // {

                                    // console.warn(item.value.name);
                                    <View style={styles.selectionItemContainer}>
                                        <CheckBox
                                            center
                                            key={item.value.id}
                                            title={item.value.name}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            // checked={item.checked}
                                            textStyle={styles.checkboxText}
                                            containerStyle={styles.weekSelectionContainer}
                                            onPress={() => {
                                                // item.item.checked = !item.item.checked
                                                this.setState({ times: arr })
                                            }}
                                        />
                                    </View>


                                }

                                    // <TouchableOpacity
                                    //     style={styles.projectContainer}
                                    //     onPress={() => {
                                    //         this.props.closeModal();
                                    //         this.props.selectItem(item)
                                    //     }}>
                                    //     <Text
                                    //         style={styles.projectText}
                                    //     >{item.value.name}</Text>
                                    // </TouchableOpacity>
                                // }

                            />
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