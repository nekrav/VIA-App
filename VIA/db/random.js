var uuid = require('react-native-uuid');

export class Random {
    constructor(props) {
        this.id = uuid.v4
        this.name = props.name
        this.created_date = props.created_date
        this.due_date = props.due_date
        this.importance = props.importance
        this.percentage_done = props.percentage_done
        this.completed = props.completed
        this.time_spent = props.time_spent
        this.notes = props.notes
        this.only_today = props.only_today
        this.properties = props.properties
        global.notifierication_time = props.notification_time
    }

    static get TABLE_CREATE() {
        return `${Random.TABLE_NAME} (` +
        'id text not null primary key unique, ' +
        'name text NOT NULL, ' +
        'created_date text NOT NULL, ' +
        'finished_date text, ' +
        'due_date text, ' +
        'importance text, ' +
        'percentage_done text, ' +
        'completed text, ' +
        'time_spent text, ' +
        'notes text,' +
        'notification_time text,' +
        'properties text, ' +
        'only_today text' +
        ')'
    }

    static get TABLE_NAME() {
        return 'random'
    }
}