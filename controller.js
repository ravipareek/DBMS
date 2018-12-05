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
        let result = confirm("Are you sure you want to delete the selected DBMS connection?");
        if (result) {
            model.removeActiveConnection();
        }
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
            connectionController = new ConnectionController(newActive, this);
            newActive.setDelegate(connectionController);
        }
        setEmptyTable();
            
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

    //

    this.activeTableDidChange = function(oldActive, newActive) {
        if (newActive) {
            document.querySelector('#data h1').innerHTML = newActive.name;
        }
    }

    //

    function makeConnectionDiv(newConnection) {
        let icon = document.createElement('i');
        icon.classList.add('fas', 'fa-database');

        let text = document.createElement('span');
        text.innerHTML = newConnection.name;

        let div = document.createElement('div');
        div.id = `connection-${newConnection.id}`;
        div.classList.add('connection');
        div.appendChild(icon);
        div.appendChild(text);
        div.addEventListener('click', (e) => {
            model.setActiveConnection(newConnection);
        });
        return div;
    }

    model.setDelegate(this);
}

function ConnectionController(_connection, _parent) {
    let connection = _connection;
    let tableController = null;
    let parent = _parent;

    // Bind buttons
    document.getElementById('addTable').onclick = () => {
        var newTable = new TableModel(
            connection.makeNextId());
        connection.addTable(newTable);
    }
    document.getElementById('removeTable').onclick = () => {
        let result = confirm("Are you sure you want to delete the selected table?");
        if (result) {
            connection.removeActiveTable();
        }
    }


    this.tableWasAdded = function(newTable) {
        let emptyItemDiv = document.querySelector('#tables .empty-item.active');
        if (emptyItemDiv)
            emptyItemDiv.classList.remove('active');
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
            selectTable(newActive.name)
        }
        if (parent)
            parent.activeTableDidChange(oldActive, newActive);
    }
    this.tableWasRemoved = function(oldTable) {
        let oldTableDiv = document.getElementById(`table-${oldTable.id}`);
        if (oldTableDiv) {
            oldTableDiv.parentNode.removeChild(oldTableDiv);
        }
        if (!document.querySelector('#tables .table')) {
            document.querySelector('#tables .empty-item').classList.add('active');
        }
        setEmptyTable();
    }

    this.tablesDidChange = function(newTables) {
        document.querySelectorAll('#tables .table')
            .forEach(e => e.parentNode.removeChild(e));
        document.querySelector('#tables .empty-item').classList.add('active');
        for (const newTable of newTables) {
            this.tableWasAdded(newTable);
        }
    }

    function makeTableDiv(newTable) {
        let icon = document.createElement('i');
        icon.classList.add('fas', 'fa-table');

        let text = document.createElement('span');
        text.innerHTML = newTable.name;

        let div = document.createElement('div');
        div.id = `table-${newTable.id}`;
        div.classList.add('table');
        div.appendChild(icon);
        div.appendChild(text);
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
    this.recordsDidChange = function(newRecords) {}

    table.setDelegate(this);
}