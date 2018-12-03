/*
**
**  MODEL
**
*/

class Data {
    constructor() {
        this.connections = [];
        this._activeConnection = null;
        this._activeTable = null;
        this.delegate = null;
    }

    addConnection(connection) {
        connection = connection || new Connection(this);
        this.connections.push(connection);
        console.log('Added connection!');
        this.delegate.connectionsDidChange(this.connections);
    }

    removeConnection() {
        this.connections = this.connections.filter(c => c !== this.activeConnection);
        this.activeConnection = null;
        console.log('Removed connection!');
        this.delegate.connectionsDidChange(this.connections);
    }

    // Getters and setters

    get activeConnection() {
        return this._activeConnection;
    }

    set activeConnection(newActiveConnection) {
        this._activeConnection = newActiveConnection;
        this.delegate.activeConnectionDidChange();
    }

    get activeTable() {
        return this._activeTable;
    }

    set activeTable(newActiveTable) {
        this._activeTable = newActiveTable;
        this.delegate.activeTableDidChange();
    }
}

class Connection {
    constructor(data, name) {
        this.data = data;
        this.id = newIdFor(data.connections);
        this.name = name || 'New Connection';
        this.tables = [];
    }

    addTable(table) {
        table = table || new Table(this);
        this.tables.push(table);
        console.log('Added table!');
        this.data.delegate.tablesDidChange(this.tables);
    }
}

class Table {
    constructor(connection, name, schema) {
        this.connection = connection;
        this.id = newIdFor(connection.tables);
        this.name = name || 'New Table';
        this.schema = schema || new Schema();
        this.records = [];
    }

    addRecord(record) {
        record = record || new Record(this);
        this.records.push(record);
    }
}

class Record {
    constructor(table, value) {
        this.table = table;
        this.id = newIdFor(table.records);
        this.value = value || {newColumn: 'newValue'};
    }
}

class Schema {
    constructor(columns) {
        this.columns = columns || ['newColumn'];
    }
}