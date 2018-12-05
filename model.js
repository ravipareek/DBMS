

function AppModel(data) {
    let connections = [];
    let activeConnection = null;
    let delegate = null;

    this.setDelegate = function(newDelegate) {
        delegate = newDelegate;
        if (delegate)
            delegate.connectionsDidChange(connections);
    }

    this.addConnection = function(newConnection) {
        connections.push(newConnection);
        if (delegate)
            delegate.connectionWasAdded(newConnection);
    }
    
    this.setActiveConnection = function(newConnection) {
        if (delegate)
            delegate.activeConnectionDidChange(activeConnection, newConnection);
        activeConnection = newConnection;
    }    

    this.removeActiveConnection = function() {
        if (delegate)
            delegate.connectionWasRemoved(activeConnection);
        connections = connections.filter(c => c !== activeConnection);
        this.setActiveConnection(null);
    }

    //

    this.makeNextId = function() {
        if (connections.length === 0) {
            return 0;
        } else {
            return connections[connections.length - 1].id + 1;
        }
    }

    //

    if (data) {
        for (const [connectionName, tables] of Object.entries(data)) {
            let newConnection = new ConnectionModel(this.makeNextId(), connectionName, tables);
            this.addConnection(newConnection);
        }
    }
}

function ConnectionModel(_id, _name, data) {
    this.id = _id;
    this.name = _name || 'Unnamed Connection';
    let tables = [];
    let activeTable = null;
    let delegate = null;

    this.setDelegate = function(newDelegate) {
        delegate = newDelegate;
        if (delegate)
            delegate.tablesDidChange(tables);
    }

    //

    this.addTable = function(newTable) {
        tables.push(newTable);
        if (delegate)
            delegate.tableWasAdded(newTable);
    }

    this.setActiveTable = function(newTable) {
        if (delegate)
            delegate.activeTableDidChange(activeTable, newTable);
        activeTable = newTable;
    }

    this.removeActiveTable = function() {
        if (delegate)
            delegate.tableWasRemoved(activeTable);
        tables = tables.filter(t => t !== activeTable);
        this.setActiveTable(null)
    }

    //

    this.makeNextId = function() {
        if (tables.length === 0) {
            return 0;
        } else {
            return tables[tables.length - 1].id + 1;
        }
    }

    //

    if (data) {
        for (const [tableName, records] of Object.entries(data)) {
            let newTable = new TableModel(this.makeNextId(), tableName);
            this.addTable(newTable);
        }
    }
}

function TableModel(_id, _name, _schema) {
    this.id = _id;
    this.name = _name || 'Unnamed Table';
    let schema = _schema;
    let records = []
    let delegate = null;

    this.setDelegate = function(newDelegate) {
        delegate = newDelegate;
    }

    this.addRecord = function(newRecord) {
        records.push(newRecord);
        delegate.recordWasAdded(newRecord);
    }

    this.setActiveRecord = function(newRecord) {
        delegate.activeRecordDidChange(activeRecord, newConnection);
        activeRecord = newRecord;
    }

    this.removeActiveRecord = function() {
        records = records.filter(t => t !== activeRecord);
        delegate.recordWasRemoved(activeRecord);
        this.setActiveRecord(null);
    }

    //

    this.makeNextId = function() {
        if (records.length === 0) {
            return 0;
        } else {
            return records[records.length - 1].id + 1;
        }
    }
}

function RecordModel(_id, _value) {
    this.id = _id;
    let value = _value;
}

function SchemaModel(_keyValue) {
    let keyValue = _keyValue;
}

