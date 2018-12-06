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
    // Add sample data

    let data = {
        'WSJ': {
            'Authors': [],
            'Posts': [],
            'Publications': [],
            'Subscribers': [],
        },
        'NYTimes': {
            'Podcasts': [],
            'Best Sellers': [],
            'Articles': [],
            'Journalists': [],
        },
        'The Post': {
            'Blog': [],
            'Sections': [],
            'Publishers': [],
        },
    }


    let model = new AppModel(data);
    let controller = new AppController(model);


    // add click listener to document
    document.addEventListener('click', (event) => {
        for(let index in clickEvents) {
            clickEvents[index](event);
        }
    });
}