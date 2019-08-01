var uuid = require('react-native-uuid');

export class Projects {
    constructor(props) {
        this.id = uuid.v4
        this.name = props.name
        this.created_date = props.created_date
        this.due_date = props.due_date
        this.importance = props.importance
        this.percentage_done = props.percentage_done
        this.completed = props.completed
        this.time_spent = props.time_spent
    }

    static get TABLE_CREATE() {
        return `${Projects.TABLE_NAME} (` +
        'id text not null primary key unique, ' +
        'name text NOT NULL, ' +
        'created_date NOT NULL, ' +
        'due_date text, ' +
        'importance integer, ' +
        'percentage_done integer, ' +
        'completed text, ' +
        'time_spent text ' +
        ')'
    }

    static get TABLE_NAME() {
        return 'projects'
    }
}