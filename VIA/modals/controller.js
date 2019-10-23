import React from 'react';
import { Database } from '../db'
export class Controller extends React.Component {

    setAddModalVisible(object, visible) {
        object.setState({ addModalVisible: visible });
    }

    setViewModalVisible(object, visible) {
        object.setState({ viewModalVisible: visible })
    }

    loadAll(object, tableName) {
        const itemsArr = []
        Database.getAll(tableName)
            .then((res) => {
                const len = res.rows.length;
                let item = {}
                for (let i = 0; i < len; i++) {
                    item = res.rows.item(i)
                    itemsArr.push({ key: JSON.stringify(item.id), value: item })
                }
                object.setState({
                    items: itemsArr
                })
            })
    }

    goToItem(object, tableName, item) {
        Database.getOne(tableName, item).then((res) => {
            selectedItem = res.rows.item(0)
            object.setState({ selectedItem: selectedItem })
        })
        this.setViewModalVisible(object, true);
    }

    saveExisting(object, tableName, habit) {
        Database.update(tableName, habit).then(() => {
            this.setViewModalVisible(object, false)
            this.loadAll(object, tableName);
        })
    }

    delete(object, tableName, habit) {
        Database.deleteOne(tableName, habit.id).then(() => {
            this.setViewModalVisible(object, false)
            this.loadAll(object, tableName);
        })
    }
}