import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, FlatList, SafeAreaView } from 'react-native'; // Version can be specified in package.json
import { CheckBox } from 'react-native-elements'

const styles = require('./styles');


export class MultipleSelectionModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            itemsToSelect: [],
            selectedItems: [],
        };
    }

     componentDidMount() {
        this.createItemArrayListForSelection();
    }

    createItemArrayListForSelection() {
        var emptyArr = []
        if (this.state.items != null) {
            for (let i = 0; i < this.state.items.length; i++) {
                emptyArr.push({checked: false, item: this.state.items[i]})
            }

            this.setState({itemsToSelect: emptyArr})
        }

    }



    render() {
        if (this.state.itemsToSelect != []) {
            // console.warn(this.state.itemsToSelect.map())

            var arr = this.state.itemsToSelect

            this.state.itemsToSelect.map( value => {
            //    console.warn(value.item.value.name)
            })


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
                                data={Object.values(arr)}
                                renderItem={({ item }) =>
                              
                                    <View style={styles.selectionItemContainer}>
                                        <CheckBox
                                            center
                                            key={item.item.value.id}
                                            title={item.item.value.name}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={item.checked}
                                            textStyle={styles.checkboxText}
                                            containerStyle={styles.itemSelectionContainer}
                                            onPress={() => {
                                                item.checked = !item.checked
                                                this.setState({ times: arr })
                                            }}
                                        />
                                    </View>
                                }
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