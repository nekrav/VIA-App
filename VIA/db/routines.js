var uuid = require('react-native-uuid');

export class Routines {
    constructor(props) {
        this.id = uuid.v4
        this.name = props.name
        this.created_date = props.created_date
        this.start_time = props.start_time
        this.end_time = props.end_time
        this.completed = props.completed
        this.time_spent = props.time_spent
        this.notification_time = props.notification_time
        this.properties = props.properties
        this.notes = props.notes
    }

    static get TABLE_CREATE() {
        return `${Routines.TABLE_NAME} (` +
            'id text not null primary key unique, ' +
            'name text NOT NULL, ' +
            'created_date text NOT NULL, ' +
            'finished_date text, ' +
            'start_time text, ' +
            'end_time text, ' +
            'completed text,' +
            'time_spent text, ' +
            'notification_time text, ' +
            'properties text, ' +
            'notes text ' +
            ')'
    }

    static get TABLE_NAME() {
        return 'routines'
    }
}