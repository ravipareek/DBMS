const tables = {
    "WSJ:Authors": {
        "name": "Authors", // The name of the table we are viewing
        "Header":["ID", "Pen-Name", "Location", "Birthday"], // Note first item in the table MUST be ID
        "Content":[
            [1, "Jeff", "Toronto, Ontario", new Date()],
            [2, "Carl", "Boston, Massatuces", new Date()],
            [3, "Stephanie", "Quebec, Quebec", new Date()],
            [4, "Magic", "London, United Kingdom", new Date()],
            [5, "Return of the kind", "Unknown", new Date()],
        ]
    }, "WSJ:Posts": {
        "name": "Posts",
        "lookup":[1, "WSJ:Authors"], // [The position of the foreign key in the row, the table the foreign key relates to]
        "Header":["ID", "Authour_ID", "Release-Date", "views", "shares", "up-votes", "down-votes"],
        "Content":[
            [1, 3, new Date(), 500, 12, 56, 200],
            [2, 5, new Date(), 6390, 2301, 4751, 6100],
            [3, 3, new Date(), 469, 49, 416, 362],
            [4, 5, new Date(), 900, 341, 163, 880]
        ]
    }, "WSJ:Publications": {
        "name": "Publications",
        "lookup":[1, "WSJ:Posts"],
        "Header":["ID", "From Post"],
        "Content":[
            [1, 1],
            [2, 1],
            [3, 2],
            [4, 3],
            [5, 1],
            [6, 3],
            [7, 4],
            [8, 1],
            [9, 2],
            [10, 3],
            [11, 4],
            [12, 1],

        ]
    }, "WSJ:Subscribers": {
        "name": "Subscribers",
        "lookup":[4, "WSJ:Authors"],
        "Header":["ID", "Following", "Followers", "Total Usage (Hours)", "Subscribed To Author"],
        "Content":[
            [1,3,4,18,1],
            [10,62,181,5654,1],
            [11,356,706,5109,1],
            [12,921,694,32,1],
            [13,120,186,3330,2],
            [14,729,492,1289,1],
            [15,907,815,4120,3],
            [16,615,273,7246,2],
            [17,633,506,2965,1],
            [18,530,104,9266,2],
            [19,410,462,7618,1],
            [2,5,5,16,2],
            [20,352,334,1714,3],
            [21,144,940,3230,2],
            [22,977,56,4724,3],
            [23,510,250,5172,1],
            [24,178,526,2331,1],
            [25,40,377,3750,1],
            [26,710,253,7368,2],
            [27,997,594,2317,1],
            [28,821,315,3247,3],
            [29,323,754,6261,2],
            [3,3,8,2,3],
            [30,425,517,1060,2],
            [31,832,323,2202,2],
            [32,647,890,5896,1],
            [33,113,763,7509,1],
            [34,857,58,2363,2],
            [35,934,23,45,1],
            [36,863,515,4073,1],
            [37,48,867,1613,1],
            [38,122,850,5879,3],
            [39,523,666,3071,2],
            [4,5,10,14,4],
            [40,321,917,5950,2],
            [41,898,42,7721,1],
            [42,54,11,4393,2],
            [43,583,536,7881,2],
            [44,289,556,2129,2],
            [45,583,509,4535,2],
            [46,437,230,5625,2],
            [47,245,588,6132,2],
            [5,322,841,5492,1],
            [6,717,667,3556,2],
            [7,621,687,6296,1],
            [8,388,472,577,2],
            [9,972,997,8159,2],
            [48,142,798,1382,1]
        ]
    }, "NYTimes:Podcasts": {
        "name": "Podcasts",
        "lookup":[1, "WSJ:Authors"],
        "Header":["ID", "Authour_ID", "Release-Date", "s", "a", "d"],
        "Content":[
            [1, 3, new Date(), new Date(), new Date(), new Date()],
            [2, 5, new Date(), new Date(), new Date(), new Date()],
            [3, 3, new Date(), new Date(), new Date(), new Date()],
            [4, 5, new Date(), new Date(), new Date(), new Date()]
        ]
    }, "NYTimes:Best Sellers": {
        "name": "Sellers",
        "lookup":[1, "WSJ:Authors"],
        "Header":["ID", "Authour_ID", "Release-Date", "s", "a", "d"],
        "Content":[
            [1, 3, new Date(), new Date(), new Date(), new Date()],
            [2, 5, new Date(), new Date(), new Date(), new Date()],
            [3, 3, new Date(), new Date(), new Date(), new Date()],
            [4, 5, new Date(), new Date(), new Date(), new Date()]
        ]
    }, "NYTimes:Articles": {
        "name": "Articles",
        "lookup":[1, "WSJ:Authors"],
        "Header":["ID", "Authour_ID", "Release-Date", "s", "a", "d"],
        "Content":[
            [1, 3, new Date(), new Date(), new Date(), new Date()],
            [2, 5, new Date(), new Date(), new Date(), new Date()],
            [3, 3, new Date(), new Date(), new Date(), new Date()],
            [4, 5, new Date(), new Date(), new Date(), new Date()]
        ]
    }, "NYTimes:Journalists": {
        "name": "Journalists",
        "lookup":[1, "WSJ:Authors"],
        "Header":["ID", "Authour_ID", "Release-Date", "s", "a", "d"],
        "Content":[
            [1, 3, new Date(), new Date(), new Date(), new Date()],
            [2, 5, new Date(), new Date(), new Date(), new Date()],
            [3, 3, new Date(), new Date(), new Date(), new Date()],
            [4, 5, new Date(), new Date(), new Date(), new Date()]
        ]
    }, "The Post:Blog": {
        "name": "Blog",
        "lookup":[1, "WSJ:Authors"],
        "Header":["ID", "Authour_ID", "Release-Date", "s", "a", "d"],
        "Content":[
            [1, 3, new Date(), new Date(), new Date(), new Date()],
            [2, 5, new Date(), new Date(), new Date(), new Date()],
            [3, 3, new Date(), new Date(), new Date(), new Date()],
            [4, 5, new Date(), new Date(), new Date(), new Date()]
        ]
    }, "The Post:Sections": {
        "name": "Sections",
        "lookup":[1, "WSJ:Authors"],
        "Header":["ID", "Authour_ID", "Release-Date", "s", "a", "d"],
        "Content":[
            [1, 3, new Date(), new Date(), new Date(), new Date()],
            [2, 5, new Date(), new Date(), new Date(), new Date()],
            [3, 3, new Date(), new Date(), new Date(), new Date()],
            [4, 5, new Date(), new Date(), new Date(), new Date()]
        ]
    }, "The Post:Publishers": {
        "name": "Publishes",
        "lookup":[1, "WSJ:Authors"],
        "Header":["ID", "Authour_ID", "Release-Date", "s", "a", "d"],
        "Content":[
            [1, 3, new Date(), new Date(), new Date(), new Date()],
            [2, 5, new Date(), new Date(), new Date(), new Date()],
            [3, 3, new Date(), new Date(), new Date(), new Date()],
            [4, 5, new Date(), new Date(), new Date(), new Date()]
        ]
    },
    "default": {
        "Header":["ID", "dsadsa", "dsa"], // Note the default table has no keys connected to another table
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
    let foreignData = tables[otherTable].Content.find((tmp) => {return tmp[0] === tables[currentData].Content[index][tables[currentData].lookup[0]]});

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
    title.innerText = `Table ${tables[otherTable].name}`;

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

function addRow(data, header = false, index) {
   var row = document.createElement("tr");
   data.forEach((content, index2) => {
       if (colStates[index2]) {
           const col = document.createElement(header ? "th" : "td");
           const text = document.createElement('a');
           text.innerText = content;
           col.appendChild(text);
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

function selectTable(tableName) {
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
    console.log('hi')
    let tableHolder = document.getElementById("tableData");
    let table = document.createElement("table");

    tables[currentData].Content.sort((a,b) => {
        let aStr = a[curSort[0]];
        let bStr = b[curSort[0]];
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
        setTimeout(() => {
            container.classList.add('hidePost');
        }, 400);

        removeClickEvent("popupHandler");
        if (!!onClose) {
            onClose();
        }
    } else {
        if (container.classList.contains('hide')) {
            container.classList.remove('hide');
            container.classList.remove('hidePost');
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