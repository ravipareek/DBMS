

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

    this.dataAsJSON = function() {
        let data = {};
        for (const connection of connections) {
            data[connection.name] = connection.dataAsJSON();
        }
        return data;
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

    this.downloadActiveConnection = function() {
        if (activeConnection) {
            return [activeConnection.name, activeConnection.dataAsJSON()];
        }
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
    this.name = _name || 'Default #' + this.id;
    let tables = [];
    let activeTable = null;
    let delegate = null;

    this.setDelegate = function(newDelegate) {
        delegate = newDelegate;
        if (delegate)
            delegate.tablesDidChange(tables);
    }

    this.dataAsJSON = function() {
        let data = {};
        for (const table of tables) {
            data[table.name] = table.dataAsJSON();
        }
        return data;
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

    this.downloadActiveTable = function() {
        if (activeTable) {
            return [activeTable.name, activeTable.dataAsJSON()];
        }
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
        for (const [tableName, tableData] of Object.entries(data)) {
            let newTable = new TableModel(this.makeNextId(), tableName, tableData.schema, tableData.records);
            this.addTable(newTable);
        }
    }
}

function TableModel(_id, _name, _schema, _records) {
    this.id = _id;
    this.name = _name || 'Default #' + this.id;
    let schema = _schema;
    let records = _records || [];
    let delegate = null;

    this.setDelegate = function(newDelegate) {
        delegate = newDelegate;
    }

    this.dataAsJSON = function() {
        let data = [];
        for (const record of records) {
            data.push(record.dataAsJSON(schema));
        }
        return data;
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

function RecordModel(_id, _values) {
    this.id = _id;
    let values = _values;

    this.dataAsJSON = function(schema) {
        let data = {};
        for (const [key, value] of zip(schema.columns(), values)) {
            data[key] = value;
        }
        return data;
    }
}

function SchemaModel(_keyValue) {
    let keyValue = _keyValue;

    this.columns = function() {
        return Object.keys(keyValue);
    }
}

