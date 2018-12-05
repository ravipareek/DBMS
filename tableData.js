const tables = {
    "Posts": {
        "lookup":[1, "Authors"],
        "Header":["ID", "Authour_ID", "Release-Date", "s", "a", "d"],
        "Content":[
            [1, 3, new Date(), new Date(), new Date(), new Date()],
            [2, 5, new Date(), new Date(), new Date(), new Date()],
            [3, 3, new Date(), new Date(), new Date(), new Date()],
            [4, 5, new Date(), new Date(), new Date(), new Date()]
        ]
    },
    "Authors": {
        "lookup":[1, "Posts"],
        "Header":["ID", "dsadsa", "dsa"],
        "Content":[
            [1, 1, new Date()],
            [2, 2, new Date()],
            [3, 3, new Date()],
            [4, 2, new Date()],
            [5, 3, new Date()],
        ]
    },
    "default": {
        "Header":["ID", "dsadsa", "dsa"],
        "Content":[
            [1, 3, new Date()],
            [2, 5, new Date()],
            [3, 3, new Date()],
        ]
    }
};

var currentData = {};
var colStates = [];
var curAction = null;
var curSort = [0,0];
var popupOpen = null;

function addKeyPopup(x, y, index) {
    if (!!popupOpen) {
        popup(popupOpen[0], popupOpen[1]);
    }

    let popupDiv = document.createElement('div');
    popupDiv.setAttribute("class", `popuptext class${index}`);
    popupDiv.setAttribute("tabindex", "0");
    popupDiv.setAttribute("id", "dataKeyLink");
    popupDiv.style = `top: ${y}; left:${x}`;

    let content = document.createElement('div');
    content.className = "content";

    //Fill with content
    let otherTable = tables[currentData].lookup[1];
    let foreginKey = tables[currentData].Content[index][tables[currentData].lookup[0]];
    let foreignData = tables[otherTable].Content.find((tmp) => {return tmp[0] === foreginKey});

    let table = document.createElement('table');
    for (let i =0; i < tables[otherTable].Header.length; i++) {

        let tr = document.createElement('tr');
        let th = document.createElement('th');
        th.innerText = tables[otherTable].Header[i];
        let td = document.createElement('td');
        td.innerText = foreignData[i];

        tr.appendChild(th)
        tr.appendChild(td);
        table.appendChild(tr);
    }

    let title = document.createElement('h3');
    title.innerText = `Table ${otherTable}`;

    content.appendChild(title);
    content.appendChild(table);
    popupDiv.appendChild(content);
    document.body.appendChild(popupDiv);

    // Ensure popup is removed once done
    popupOpen = [`#dataKeyLink.popuptext.class${index}`, () => {
        document.body.removeChild(popupDiv);
        popupOpen = null;
    }];
    popup(popupOpen[0], popupOpen[1]);
}

function addRowBasic(data, header = false) {
    var row = document.createElement("tr");
    data.forEach((content, index2) => {
        const col = document.createElement(header ? "th" : "td");
        const text = document.createElement('a');
        text.innerText = content;
        col.appendChild(text);
        console.log(index2)
        row.appendChild(col)
    });
    return row;
}


function addRow(data, header = false, index) {
   var row = document.createElement("tr");
   data.forEach((content, index2) => {
       if (colStates[index2]) {
           const col = document.createElement(header ? "th" : "td");
           const text = document.createElement('a');
           text.innerText = content;
           col.appendChild(text);
           console.log(index2)
           console.log(currentData)
           if (header) {

           } else if (content === "~NO DATA~") {
               col.classList.add("edit");
           } else if (!!tables[currentData].lookup && index2 === tables[currentData].lookup[0]) {

               col.classList.add("viewConnection");
           }

           col.onclick = () => {
               if (header)
                   return;

               console.log(col.children[0])
               console.log(col.children[0].type)
               if (content === "~NO DATA~") {
                   const input = document.createElement("input");
                   input.setAttribute("type", "text");
                   input.placeholder = "~NO DATA~";

                   while (col.firstChild) {
                       col.removeChild(col.firstChild);
                   }
                   col.appendChild(input);
                   input.focus();
                   input.addEventListener("keyup", function(event) {
                       if (event.key === "Enter") {
                           tableUpdate();
                       } else {
                           tables[currentData].Content[index][index2] = input.value;
                       }
                   });
                   addClickEvent("newDataInputHandler"+index+index2, (event) => {
                       var bounds = input.getBoundingClientRect();
                       let mouseX = event.pageX;
                       let mouseY = event.pageY;
                       if (mouseX < bounds.left || mouseX > bounds.right || mouseY > bounds.bottom || mouseY < bounds.top) {
                           removeClickEvent("newDataInputHandler"+index+index2)
                           tableUpdate();
                       }
                   });
               }
               else if (!!tables[currentData].lookup && index2 === tables[currentData].lookup[0]) {
                   var bounds = col.getBoundingClientRect();
                   addKeyPopup(bounds.left + (bounds.width/2), bounds.bottom, index);
               }
           };

           // Add sorting
           if (header) {

               const up = document.createElement('i');
               const down = document.createElement('i');
               up.className = "far fa-arrow-alt-circle-up";
               down.className = "far fa-arrow-alt-circle-down";
               up.onclick = () => {
                   curSort[0] = index2;
                   curSort[1] = 1;
                   tableUpdate();
               };
               down.onclick = () => {
                   curSort[0] = index2;
                   curSort[1] = 0;
                   tableUpdate();
               };


               if (curSort[0] === index2) {
                   if (!!curSort[1]) {
                       up.className = "fas fa-arrow-circle-up"
                   } else {
                       down.className = "fas fa-arrow-circle-down"
                   }
               }
               col.appendChild(up);
               col.appendChild(down);
           }
           row.appendChild(col)
       }
   });
   row.onclick = () => {
       if (header)
           return;
      if (curAction === "delete") {
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
    document.querySelector('#data .content-container').classList.remove('inactive');
    document.querySelector('#data .empty-container').classList.remove('active');

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

function setEmptyTable() {
    document.querySelector('#data .content-container').classList.add('inactive');
    document.querySelector('#data .empty-container').classList.add('active');
    document.querySelector('#data h1').innerHTML = '';
    document.querySelectorAll('#tableData table')
        .forEach(e => e.parentNode.removeChild(e));
}

function tableUpdate() {
    let tableHolder = document.getElementById("tableData");
    let table = document.createElement("table");

    tables[currentData].Content.sort((a,b) => {
        let aStr = a[curSort[0]].toString();
        let bStr = b[curSort[0]].toString();
        if (aStr < bStr) {
            return !!curSort[1] ? 1 : -1;
        }
        if (aStr > bStr) {
            return !!curSort[1] ? -1 : 1;
        }
        return 0;
    });

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

function addDataRow() {
    tables[currentData].Content.push(tables[currentData].Header.reduce((a) => {a.push("~NO DATA~"); return a;}, []));
    tableUpdate();
}

function cancelCurAction() {var body = document.querySelector('body');
    if (curAction === "delete") {
        body.classList.remove("removeDataRow");
    }
    curAction = null;
}

function popup(query, onClose) {
    let container = document.querySelector(query);
    let bounds = container.getBoundingClientRect();

    if (container.classList.contains('show')) {
        container.classList.remove('show');
        container.classList.add('hide');

        removeClickEvent("popupHandler");
        if (!!onClose) {
            onClose();
        }
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
                    popup(query, onClose)
                } else if (mouseY > bounds.bottom || mouseY < bounds.top) {
                    popup(query, onClose)
                }
            });
        }, 500);
    }
}

function notExist(query) {
    alert("This feature has not been implemented");
    popup(query);
}

function downloadTable() {
    var link = document.createElement("a");
    link.download = currentData+".csv";
    link.href = "./download/table.csv";
    link.click();
}

function exportSchema() {
    var link = document.createElement("a");
    link.download = currentData+"_Schema";
    link.href = "./download/tableSchema";
    link.click();
}