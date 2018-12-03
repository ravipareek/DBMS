

function AppModel() {
    let connections = [];
    let activeConnection = null;
    let delegate = null;

    this.setDelegate = function(newDelegate) {
        delegate = newDelegate;
        if (delegate) {
            delegate.connectionsDidChange(connections);
        }
    }

    this.addConnection = function(newConnection) {
        connections.push(newConnection);
        delegate.connectionWasAdded(newConnection);
    }
    
    this.setActiveConnection = function(newConnection) {
        delegate.activeConnectionDidChange(activeConnection, newConnection);
        activeConnection = newConnection;
    }    

    this.removeActiveConnection = function() {
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
}

function ConnectionModel(_id, _name) {
    this.id = _id;
    this.name = _name || 'Unnamed Connection';
    let tables = [];
    let activeTable = null;
    let delegate = null;

    this.setDelegate = function(newDelegate) {
        delegate = newDelegate;
        if (delegate) {
            delegate.tablesDidChange(tables);
        }
    }

    //

    this.addTable = function(newTable) {
        tables.push(newTable);
        delegate.tableWasAdded(newTable);
    }

    this.setActiveTable = function(newTable) {
        delegate.activeTableDidChange(activeTable, newTable);
        activeTable = newTable;
    }

    this.removeActiveTable = function() {
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

