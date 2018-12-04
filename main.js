document.addEventListener('DOMContentLoaded', init);

// Handle click events
const clickEvents = {};

function addClickEvent(id, func) {
    clickEvents[id] = func;
}

function removeClickEvent(id) {
    clickEvents[id] = () => {};
}


function init() {
    let model = new AppModel();
    let controller = new AppController(model);

    // add click listener to document
    document.addEventListener('click', (event) => {
        for(let index in clickEvents) {
            clickEvents[index](event);
        }
    });
}