let input = document.querySelector('#input');
const list = document.querySelector('#list');
const deleteBtn = document.querySelector('.del');
const clearAllBtn = document.querySelector('#clear-all');
const itemDiv = document.querySelector('#item');



let div;
let deleteIcon;
let items;

clearAllBtn.style.display = "none";


const retrieveItemsFromLocalStorage = () => {
    // Retrieve the JSON string from localStorage and parse it back to an array
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
        return JSON.parse(storedItems);
    } else {
        return [];
    }
};


const storeItemsInLocalStorage = (items) => {
    // Convert the array of items to a JSON string and store it in localStorage
    localStorage.setItem('items', JSON.stringify(items));
}



const convertFirstLetterToUpperCase = (str) => {
    
    str = str[0].toUpperCase() + str.slice(1);
    return str;
}


const createItem = (str) => {

    // creating div,adding class, id, innerText and then appending into the list div
    div = document.createElement('div')
    div.className = 'item';
    div.id = convertToValidID(str).toLowerCase();
    div.innerText = convertFirstLetterToUpperCase(str);
    list.appendChild(div);

    // creating icon and adding class Name and appending into the div.item
    deleteIcon = document.createElement('img');
    deleteIcon.src = 'images/trash.png';
    deleteIcon.classList.add('trash-icon');
    deleteIcon.alt = "trash-icon";
    div.appendChild(deleteIcon);

    // check the div
    console.log(div);

    if(list.childElementCount > 1) {
        clearAllBtn.style.display = "block";
        // delete all items in the list
        clearAllBtn.addEventListener('click', () => {
            while(list.firstElementChild) {
                list.removeChild(list.firstElementChild);
                clearAllBtn.style.display = "none";
                deleteAllItemsFromList();
            }
        });
    }

}


window.addEventListener('load', () => {
    items = retrieveItemsFromLocalStorage();
    console.log(items);
    for(let item in items) {
        createItem(items[item]);
    }
});


const addItemToList = (item) => {
    items.push(convertFirstLetterToUpperCase(item));

    // check the list
    console.log(items);

    // store the items list in local storage
    storeItemsInLocalStorage(items);
};


const updateItemList = (specificItem) => {
    let itemIndex = items.findIndex(item => item === specificItem);
        if(itemIndex !== -1) {
            items.splice(itemIndex, 1);
        }
    
    // update the items list in the local storage
    storeItemsInLocalStorage(items);
};


const deleteAllItemsFromList = () => {

    // delete the items list from the local storage
    localStorage.removeItem('items');
};


const convertToValidID = (str) => {
    str = str.split(' ').join('-');
    return str;
};




// add items with button
document.querySelector('#add-btn')
.addEventListener('click', () => {
    if(input.value !== '') {
        createItem(input.value);
        addItemToList(input.value);

        input.value = '';
    }
});


// add items with enter
input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && input.value !== '') {
        createItem(input.value);
        addItemToList(input.value);

        input.value = '';
    }
});



// delete a specific item
list.addEventListener('click', (e) => {
    if(e.target.className === 'trash-icon' && e.target.parentNode.parentNode && e.target.parentNode) {
        list.removeChild(e.target.parentNode);
        if(list.childElementCount < 1) {
            clearAllBtn.style.display = "none";
        }

        updateItemList(e.target.parentNode.innerText);
    }
});

if(list.childElementCount > 1) {
    clearAllBtn.style.display = "block";
    // delete all items in the list
    clearAllBtn.addEventListener('click', () => {
        while(list.firstElementChild) {
            list.removeChild(list.firstElementChild);
            clearAllBtn.style.display = "none";
            deleteAllItemsFromList();
        }
    });
}
