'use strict';

const memoryStorage = [];

class Note {
    constructor(props) {
        this.name = props.name;
        this.text = props.text;
        this.createdAt = props.createdAt;
    }

    save() {
        memoryStorage.push(this);
    }

    static find(name) {
        return memoryStorage.filter(note => note.name === name).pop();
    }

    static findAll() {
        return memoryStorage;
    }
}

memoryStorage.push(new Note({
    name: 'films',
    text: 'Films to watch'
}));

memoryStorage.push(new Note({
    name: 'books',
    text: 'Books to read'
}));

module.exports = Note;
