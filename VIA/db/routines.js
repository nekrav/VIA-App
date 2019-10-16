var uuid = require('react-native-uuid');

export class Routines {
    constructor(props) {
        this.id = uuid.v4
        this.name = props.name
        this.created_date = props.created_date
        this.start_time = props.start_time
        this.notification_time = props.notification_time
    }

    static get TABLE_CREATE() {
        return `${Routines.TABLE_NAME} (` +
            'id text not null primary key unique, ' +
            'name text NOT NULL, ' +
            'created_date text NOT NULL, ' +
            'start_time text, ' +
            'notification_time text ' +
            ')'
    }

    static get TABLE_NAME() {
        return 'routines'
    }
}