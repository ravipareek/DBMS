/*
**
**  CONTROLLER
**
*/


class Controller {
    constructor(data) {
        this.data = data;
    }

    // Delegate methods

    activeConnectionDidChange() {


        if (this.data.activeConnection !== null) {
            document.getElementById('addTable')
                .onclick = () => this.data.activeConnection.addTable();
        } else {
            document.getElementById('addTable')
                .onclick = null;
        }
        this.tablesDidChange(); // ??
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
            // document.getElementById('addTable')
            //     .onclick = () => connection.addTable();
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
            // add record??
            this.tablesDidChange();
        });
        return div;
    }
}