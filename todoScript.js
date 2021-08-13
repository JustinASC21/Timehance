// a project here to create a working todo list!
let todoList = [];
// our todo list is an empty array

// ref to our database
let database = firebase.database().ref();

// random function
function random(max) {
    let randDec = Math.random() * (max + 1);
    let randInt = Math.floor(randDec);
    console.log(randInt);
    return randInt;
}

// grab our button from our document
let addButton = document.querySelector("#addB");
let removeButton = document.querySelector("#removeB")

// grab our list element
let list = document.querySelector("#ourList");

// grab our input element
let inputText = document.querySelector("#input");
let numberInputText = document.querySelector("#numInput");

// add user input and push it to the database
addButton.onclick = function(event) {
// prevent refreshing
    event.preventDefault();
    // random colors 
    let r = random(255);
    let g = random(255);
    let b = random(255);

    const string = inputText.value;
    // create our additional tag for the additional row
    let additionalRow = document.createElement('li');
    let hyperlink = document.createElement("a");
    // add the content to that row
    // below we add the text for our todo list
    // hyperlink first then append string
    hyperlink.append(string);
    hyperlink.href = "#";
    hyperlink.style.textDecoration = "none";
    additionalRow.append(hyperlink);

    // style each row for todoList
    additionalRow.style.color = "rgb("+r+","+g+","+b+")";
    // append our additional row in the list into the DOM, we add the element in the parent node 'ol' at the end
    list.appendChild(additionalRow);
    todoList.push(string);

    let value = {
        TODO: string,
        R: r,
        G: g,
        B: b
    }

    database.push(value);
    console.log("pushed")
    inputText.value = "";

}
// Display the data that collected from the database
database.on("child_added",addToDoList);

function addToDoList(data) {
    let rowObj = data.val(); // returns the object stored in firebase
    
    let additionalRow = document.createElement("li");
    let hyperlink = document.createElement("a");
    // same structure here to add list elements as the add button
    hyperlink.append(rowObj.TODO);
    additionalRow.append(hyperlink);

    // use color from database
    additionalRow.style.color = "rgb(" + rowObj.R + "," + rowObj.G + "," + rowObj.B + ")";

    // add li item to our list
    list.appendChild(additionalRow);
}

// if removeButton is clicked remove an item
removeButton.onclick = function(event) {
    event.preventDefault();

    // grab item index from number input
    const itemNum = numberInputText.value;
    
    if (itemNum <= todoList.length + 1) {
        
            todoList.splice(itemNum-1,1);
            // remove child function here uses the list property childnodes
            // remove the last child
            list.removeChild(list.childNodes[itemNum]);

    }

    numberInputText.value = "";
}
list.onmouseover = function(event) {
    event.preventDefault();
    // returns the array of all the li elements
    let rowList = document.querySelectorAll('li');

    // loop through each and check if item has been clicked
    for (let i = 0; i < todoList.length + 1; i++) {
        rowList[i].onclick = function(event) {
            event.preventDefault();
            // if (rowList[i].style.textDecoration == "line-through") {
            //     rowList[i].style.textDecoration = "overline";
            // }
            // else {
            //     rowList[i].style.textDecoration = "line-through";
            // }
            console.log(rowList[i].innerHTML);
            rowList[i].style.textDecoration = "line-through";
            console.log(rowList[i].innerHTML);
            rowList[i].style.textDecorationThickness = "5px";
        }
    }

}
