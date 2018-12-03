document.addEventListener('DOMContentLoaded', init);

function init() {
    let model = new AppModel();
    let controller = new AppController(model);
}