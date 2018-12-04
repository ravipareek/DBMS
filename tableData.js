const posts = {
    "Header":["ID", "Authour_ID", "Release-Date"],
    "Content":[
        [1, 3, new Date()],
        [2, 5, new Date()],
        [3, 3, new Date()],
        [4, 5, new Date()]
    ]
};

var currentData = {};

function addRow( data, header = false) {
   var row = document.createElement("tr");
   data.forEach((content) => {
        const col = document.createElement(header ? "th" : "td");
        const text = document.createElement('a');
        text.innerText = content;
        col.appendChild(text);

        // Add sorting
        if (header) {
            const up = document.createElement('i');
            up.className = "far fa-arrow-alt-circle-up";
            col.appendChild(up);

            const down = document.createElement('i');
            down.className = "far fa-arrow-alt-circle-down";
            col.appendChild(down);
        }
        row.appendChild(col)
   });
   return row;

}

function addColOption(data) {
    let container = document.createElement('div');
    let input = document.createElement('input');
    let text = document.createElement('a');

    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', data);
    input.setAttribute('value', data);
    input.checked = true;

    text.innerText = data;

    container.appendChild(input);
    container.appendChild(text);

    return container;
}

function selectTable(tableName = "posts") {
    let tableHolder = document.getElementById("tableData");
    let table = document.createElement("table");

    table.appendChild(addRow(posts.Header, true));
    posts.Content.forEach((content) => {
        table.appendChild(addRow(content));
    });

    while (tableHolder.firstChild) {
        tableHolder.removeChild(tableHolder.firstChild);
    }
    tableHolder.appendChild(table);

    // Fill data options
    let optionsHolder = document.querySelector("#tableDataOptions .popuptext");
    while (optionsHolder.firstChild) {
        optionsHolder.removeChild(optionsHolder.firstChild);
    }
    posts.Header.forEach((content) => {
        optionsHolder.appendChild(addColOption(content));
    });
}

function popup(query) {
    let container = document.querySelector(query);
    let bounds = container.getBoundingClientRect();

    if (container.classList.contains('show')) {
        container.classList.remove('show');
        container.classList.add('hide');

        removeClickEvent("popupHandler");
    } else {
        if (container.classList.contains('hide')) {
            container.classList.remove('hide');
        }
        container.classList.add('show');

        setTimeout(() => {
            addClickEvent("popupHandler", (event) => {
                let mouseX = event.pageX;
                let mouseY = event.pageY;
                if (mouseX < bounds.left || mouseX > bounds.right) {
                    popup(query)
                } else if (mouseY > bounds.bottom || mouseY < bounds.top) {
                    popup(query)
                }
            });
        }, 500);


    }
}