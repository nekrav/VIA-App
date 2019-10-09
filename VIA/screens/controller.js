import React from 'react';

export class Controller extends React.Component {

    setAddModalVisible(object, visible) {
        object.setState({ addModalVisible: visible });
    }
}