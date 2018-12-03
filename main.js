document.addEventListener('DOMContentLoaded', init);

let data, controller;

function init() {
    data = new Data();
    controller = new Controller(data);
    data.delegate = controller;

    document.getElementById('showAllButton')
        .addEventListener('click', controller.showAllColumns);
    document.getElementById('showAllButData')
        .addEventListener('click', controller.showAllButData);
    document.getElementById('showOnlyConnections')
        .addEventListener('click', controller.showOnlyConnections);

    document.getElementById('addConnection')
        .onclick = () => data.addConnection();
    document.getElementById('removeConnection')
        .onclick = () => data.removeConnection();
}