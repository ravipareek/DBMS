const tables = {
    "posts": {
        "Header":["ID", "Authour_ID", "Release-Date", "s", "a", "d"],
        "Content":[
            [1, 3, new Date(), new Date(), new Date(), new Date()],
            [2, 5, new Date(), new Date(), new Date(), new Date()],
            [3, 3, new Date(), new Date(), new Date(), new Date()],
            [4, 5, new Date(), new Date(), new Date(), new Date()]
        ]
    },
    "default": {
        "Header":["ID", "dsadsa", "dsa"],
        "Content":[
            [1, 3, new Date()],
            [2, 5, new Date()],
            [3, 3, new Date()],
            [4, 5, new Date()]
        ]
    }
};

var currentData = {};
var colStates = [];
var curAction = null;

function addRow(data, header = false, index) {
   var row = document.createElement("tr");
   data.forEach((content, index) => {
       if (colStates[index]) {
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
       }
   });
   row.onclick = () => {
       if (header)
           return;
      if (curAction = "delete") {
          tables[currentData].Content.splice(index, 1);
          tableUpdate();
      }
   };
   return row;

}

function addColOption(data, num) {
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

    input.addEventListener('change', (event) => {
        colStates[num] = event.srcElement.checked;
        //Ensure at minimum one element is active
        if(!colStates.reduce((a,b) => { return b ? b : a }, false))
            colStates[num] = event.srcElement.checked = true;
        colStates[num] = event.srcElement.checked;
        tableUpdate();
    });

    return container;
}

function selectTable(tableName = "posts") {
    tables[tableName] = !!tables[tableName] ? tables[tableName] : tables["default"];
    currentData = tableName;
    colStates = [];

    // Fill data options
    let optionsHolder = document.querySelector("#tableDataOptions .popuptext");
    while (optionsHolder.firstChild) {
        optionsHolder.removeChild(optionsHolder.firstChild);
    }

    tables[currentData].Header.forEach((content,index) => {
        colStates[index] = true;
        optionsHolder.appendChild(addColOption(content, index));
    });

    tableUpdate();
}

function tableUpdate() {
    let tableHolder = document.getElementById("tableData");
    let table = document.createElement("table");

    table.appendChild(addRow(tables[currentData].Header, true));
    tables[currentData].Content.forEach((content, index) => {
        table.appendChild(addRow(content, false, index));
    });

    while (tableHolder.firstChild) {
        tableHolder.removeChild(tableHolder.firstChild);
    }
    tableHolder.appendChild(table);
}


function removeDataRow() {
    var body = document.querySelector('body');
    body.classList.add("removeDataRow");
    curAction = "delete";
}

function cancelCurAction() {var body = document.querySelector('body');
    if (curAction = "delete") {
        body.classList.remove("removeDataRow");
    }
    curAction = null;
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