/*
**
**  CONTROLLER
**
*/


// Controllers

function AppController(_model) {
    let model = _model;
    let connectionController = null;

    // Bind buttons
    document.getElementById('addConnection').onclick = () => {
        var newConnection = new ConnectionModel(
            model.makeNextId());
        model.addConnection(newConnection);
    }
    document.getElementById('removeConnection').onclick = () => {
        model.removeActiveConnection();
    }

    // Column management

    this.showAllColumns = function() {
        document.getElementById('container').className = 'all';
        document.getElementById('data').className = 'content show';
        document.getElementById('tables').className = 'content show';
        document.getElementById('connections').className = 'content show';
    }

    this.showAllButData = function() {
        document.getElementById('container').className = 'noData';
        document.getElementById('data').className = 'content hide';
        document.getElementById('tables').className = 'content show';
        document.getElementById('connections').className = 'content show';
    }

    this.showOnlyConnections = function() {
        document.getElementById('container').className = 'onlyConnections';
        document.getElementById('data').className = 'content hide';
        document.getElementById('tables').className = 'content hide';
        document.getElementById('connections').className = 'content show';
    }

    document.getElementById('showAllButton').onclick = () => {
        this.showAllColumns()
    };
    document.getElementById('showAllButData').onclick = () => {
        this.showAllButData()
    };
    document.getElementById('showOnlyConnections').onclick = () => {
        this.showOnlyConnections()
    };

    // Delegate methods

    this.connectionWasAdded = function(newConnection) {
        let newConnectionDiv = makeConnectionDiv(newConnection);
        document.getElementById('connections').appendChild(
            newConnectionDiv);
    }
    this.activeConnectionDidChange = function(oldActive, newActive) {
        if (oldActive) {
            let oldActiveDiv = document.getElementById(`connection-${oldActive.id}`);
            if (oldActiveDiv) {
                oldActiveDiv.classList.remove('active');
            }
            oldActive.setDelegate(null);
            connectionController = null;
        }
        if (newActive) {
            document.getElementById(`connection-${newActive.id}`)
                .classList.add('active');
            connectionController = new ConnectionController(newActive);
            newActive.setDelegate(connectionController);
        }
    }
    this.connectionWasRemoved = function(oldConnection) {
        let oldConnectionDiv = document.getElementById(`connection-${oldConnection.id}`);
        if (oldConnectionDiv) {
            oldConnectionDiv.parentNode.removeChild(oldConnectionDiv);
        }
    }

    this.connectionsDidChange = function(newConnections) {
        document.querySelectorAll('#connections .connection')
            .forEach(e => e.parentNode.removeChild(e));
        for (const newConnection of newConnections) {
            let newConnectionDiv = makeConnectionDiv(newConnection);
            document.getElementById('connections')
                .appendChild(newConnectionDiv);
        }
    }

    function makeConnectionDiv(newConnection) {
        let div = document.createElement('div');
        div.id = `connection-${newConnection.id}`;
        div.classList.add('connection');
        div.innerHTML = newConnection.name;
        div.addEventListener('click', (e) => {
            model.setActiveConnection(newConnection);
        });
        return div;
    }

    model.setDelegate(this);
}

function ConnectionController(_connection) {
    let connection = _connection;
    let tableController = null;

    // Bind buttons
    document.getElementById('addTable').onclick = () => {
        var newTable = new TableModel(
            connection.makeNextId());
        connection.addTable(newTable);
    }
    document.getElementById('removeTable').onclick = () => {
        connection.removeActiveTable();
    }


    this.tableWasAdded = function(newTable) {
        let newTableDiv = makeTableDiv(newTable);
        document.getElementById('tables').appendChild(newTableDiv);
    }
    this.activeTableDidChange = function(oldActive, newActive) {
        if (oldActive) {
            let oldActiveDiv = document.getElementById(`table-${oldActive.id}`);
            if (oldActiveDiv) {
                oldActiveDiv.classList.remove('active');
            }
            oldActive.setDelegate(null);
            tableController = null;
        }
        if (newActive) {
            document.getElementById(`table-${newActive.id}`)
                .classList.add('active');
            tableController = new TableController(newActive);
            newActive.setDelegate(tableController);
        }
    }
    this.tableWasRemoved = function(oldTable) {
        let oldTableDiv = document.getElementById(`table-${oldTable.id}`);
        if (oldTableDiv) {
            oldTableDiv.parentNode.removeChild(oldTableDiv);
        }
    }

    this.tablesDidChange = function(newTables) {
        document.querySelectorAll('#tables .table')
            .forEach(e => e.parentNode.removeChild(e));
        for (const newTable of newTables) {
            let newTableDiv = makeTableDiv(newTable);
            document.getElementById('tables').appendChild(newTableDiv);
        }
    }

    function makeTableDiv(newTable) {
        let div = document.createElement('div');
        div.id = `table-${newTable.id}`;
        div.classList.add('table');
        div.innerHTML = newTable.name;
        div.addEventListener('click', (e) => {
            connection.setActiveTable(newTable);
        });
        return div;
    }

    connection.setDelegate(this);
}

function TableController(_table) {
    let table = _table;

    this.recordWasAdded = function(newRecord) {}
    this.activeRecordDidChange = function(oldActive, newActive) {}
    this.recordWasRemoved = function(records) {}

    table.setDelegate(this);
}