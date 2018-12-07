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

    let __schema = new SchemaModel({
        'id': 'int',
        'name': 'string',
        'location': 'string'
    });

    let __records = [
        new RecordModel(1, [1, 'John', 'Hamilton']),
        new RecordModel(2, [2, 'Jane', 'Toronto']),
        new RecordModel(3, [3, 'Lucas', 'Montreal']),
        new RecordModel(4, [4, 'Bill', 'Buffalo']),
    ];

    let data = {
        'WSJ': {
            'Authors': {schema: __schema, records: __records},
            'Posts': {schema: __schema, records: __records},
            'Publications': {schema: __schema, records: __records},
            'Subscribers': {schema: __schema, records: __records},
        },
        'NYTimes': {
            'Podcasts': {schema: __schema, records: __records},
            'Best Sellers': {schema: __schema, records: __records},
            'Articles': {schema: __schema, records: __records},
            'Journalists': {schema: __schema, records: __records},
            'Authors': {schema: __schema, records: __records},
        },
        'The Post': {
            'Blog': {schema: __schema, records: __records},
            'Sections': {schema: __schema, records: __records},
            'Publishers': {schema: __schema, records: __records},
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

function zip(xs, ys) {
    const length = Math.min(xs.length, ys.length);
    var zipped = [];
    for (var i = 0; i < length; ++i) {
        zipped.push([xs[i], ys[i]]);
    }
    return zipped;
}
