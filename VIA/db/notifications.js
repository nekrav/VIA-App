var uuid = require('react-native-uuid');

export class Notifications {
    constructor(props) {
        this.id = props.id
        this.userInfo = props.userInfo
        this.title = props.title
        this.date = props.date
        this.message = props.message
        this.playSound = props.playSound
        this.soundName = props.soundName
        this.number = props.number
        this.data = props.data
        this.properties = props.properties
        this.repeatType = props.repeatType
    }

    static get TABLE_CREATE() {
        return `${Notifications.TABLE_NAME} (` +
            'id not null primary key unique, ' +
            'userInfo text, ' +
            'title text NOT NULL, ' +
            'date text NOT NULL,' +
            'message text NOT NULL, ' +
            'playSound text,  ' +
            'soundName text, ' +
            'number text, ' +
            'data text, ' +
            'properties text, ' +
            'repeatType text' +
            ')'
    }

    static get TABLE_NAME() {
        return 'notifications'
    }
}