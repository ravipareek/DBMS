document.addEventListener('DOMContentLoaded', init);

let data, view;

function init() {
    data = new Data();
    view = new View(data);
    data.delegate = view;

    document.getElementById('showAllButton')
        .addEventListener('click', view.showAllColumns);
    document.getElementById('showAllButData')
        .addEventListener('click', view.showAllButData);
    document.getElementById('showOnlyConnections')
        .addEventListener('click', view.showOnlyConnections);

    document.getElementById('addConnection')
        .onclick = () => data.addConnection();
}

// Model

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
        this.id = data.connections.length;
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
        this.id = connection.tables.length;
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
        this.id = table.records.length;
        this.value = value || {newColumn: 'newValue'};
    }
}

class Schema {
    constructor(columns) {
        this.columns = columns || ['newColumn'];
    }
}

// View


class View {
    constructor(data) {
        this.data = data;
    }

    // Delegate methods

    activeConnectionDidChange() {
        // TODO
    }

    activeTableDidChange() {
        // TODO
    }

    connectionsDidChange(connections) {
        connections = connections || this.data.connections;
        document.querySelectorAll('#connections .connection')
            .forEach(e => e.parentNode.removeChild(e));
        for (const connection of connections) {
            document.getElementById('connections').appendChild(
                this.makeConnectionDiv(connection, connection === this.data.activeConnection));
        }
    }

    tablesDidChange(tables) {
        tables = tables || this.data.activeConnection.tables;
        document.querySelectorAll('#tables .table')
            .forEach(e => e.parentNode.removeChild(e));
        for (const table of tables) {
            document.getElementById('tables').appendChild(
                this.makeTableDiv(table, table === this.data.activeTable));
        }
    }

    // Column management

    showAllColumns() {
        document.getElementById('container').className = 'all';
    }

    showAllButData() {
        document.getElementById('container').className = 'noData';
    }

    showOnlyConnections() {
        document.getElementById('container').className = 'onlyConnections';
    }

    // Utils

    makeConnectionDiv(connection, isActive) {
        var div = document.createElement('div');
        div.id = `connection-${connection.id}`;
        div.classList.add('connection');
        if (isActive) {
            div.classList.add('active');
        }
        div.innerHTML = connection.name;
        div.addEventListener('click', (e) => {
            this.data.activeConnection = connection;
            document.getElementById('addTable')
                .onclick = () => connection.addTable();
            this.connectionsDidChange();
        });
        return div;
    }

    makeTableDiv(table, isActive) {
        var div = document.createElement('div');
        div.id = `table-${table.id}`;
        div.classList.add('table');
        if (isActive) {
            div.classList.add('active');
        }
        div.innerHTML = table.name;
        div.addEventListener('click', (e) => {
            this.data.activeTable = table;
            document.getElementById('addTable')
                .onclick = () => table.addTable();
            this.tablesDidChange();
        });
        return div;
    }
}

// Utils
