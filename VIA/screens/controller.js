import React from 'react';
import { Database, Habits } from '../db'
export class Controller extends React.Component {

    setAddModalVisible(object, visible) {
        object.setState({ addModalVisible: visible });
    }

    setViewModalVisible(object, visible) {
        object.setState({ viewModalVisible: visible })
    }

    loadAll(object, tableName) {
        const itemsArr = []
        const finishedArr = []
        Database.getAll(tableName)
            .then((res) => {
                const len = res.rows.length;
                let item = {}
                for (let i = 0; i < len; i++) {
                    item = res.rows.item(i)
                    itemsArr.push({ key: JSON.stringify(item.id), value: item })
                    if (item.completed === 'true') {
                        finishedArr.push({ key: JSON.stringify(item.id), value: item })
                    }
                }
                object.setState({
                    items: itemsArr,
                    numberOfItems: len,
                    numberOfFinishedItems: finishedArr.length
                })
            })
    }

    goToItem(object, tableName, item) {
        Database.getOne(tableName, item).then((res) => {
            selectedHabit = res.rows.item(0)
            object.setState({ selectedHabit: selectedHabit })
        })
        this.setViewModalVisible(object, true);

    }

      
}