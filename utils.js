// Utils

function newIdFor(elements) {
    if (elements.length === 0) {
        return 0;
    } else {
        return elements[elements.length - 1].id + 1;
    }
}