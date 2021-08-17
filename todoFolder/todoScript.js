// a project here to create a working todo list
var ListLength;

// random function
function random(max) {
    let randDec = Math.random() * (max + 1);
    let randInt = Math.floor(randDec);
    return randInt;
}

// grab our button from our document
let addButton = document.querySelector("#addB");
let removeButton = document.querySelector("#removeB")
let clearButton = document.querySelector("#removeAll");

// grab our list element
let list = document.querySelector("#ourList");

// grab our input element
let inputText = document.querySelector("#input");
let numberInputText = document.querySelector("#numInput");

// both add and remove work
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
    firebase.database().ref().once('value', (data) => {
        let rawData = data.val();
       
        let objSize = 0;
        let local;
        for (i in rawData) {
            objSize += 1;
            // console.log("item: "+ i)
        }
        local = objSize;
        // declare global variable to contain objSize
        ListLength = local + 1;

        firebase.database().ref(String(ListLength)).set({
            Value: inputText.value,
        }) // ListLength here
    });

    // console.log("Our list length: " + ListLength)
    
    inputText.value = "";
}

// when firebase detects an added element
firebase.database().ref().on("child_added",showResults);

function showResults() {
    firebase.database().ref().once('value',(data) => {
        // here we can clean our todo list and relist everything
        list.innerHTML = "";
        let rawData = data.val();

        for (i in rawData) { // loop through nodes and be able to relist them

            let r = random(255);
            let g = random(255);
            let b = random(255);
            
            const string = rawData[i].Value;
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
            // list.removeChild(list.childNodes[1])
            
        }
    })
}
// if removeButton is clicked remove an item
removeButton.onclick = function(event) {
    event.preventDefault();

    // grab item index from number input
    const itemNum = numberInputText.value;
    
    list.removeChild(list.childNodes[itemNum-1]);

    firebase.database().ref(String(itemNum)).remove() // we remove node # here
    // we need to shift the greater nodes back one to maintain list format
    firebase.database().ref().once("value",(data) => {
        rawData = data.val();
        // console.log(rawData)
        for (nodes in rawData) {
            // loop through each node
            // nodes represents the keys for each object
            if ((nodes > itemNum) || (nodes == ListLength))  {
                let currentValue = rawData[nodes].Value; // this gets our values for each of these inputs

                // shift nodes value by one less
                firebase.database().ref(String(nodes)).remove();
                firebase.database().ref(String(nodes-1)).set({
                    Value: currentValue,
                })   
            }

        }
    });
    numberInputText.value = "";
}

clearButton.onclick = function(event) {
    event.preventDefault();

    firebase.database().ref().remove();
    let list = document.querySelector("#ourList")
    list.innerHTML = "";
}

list.onmouseover = function(event) {
    // event.preventDefault();
    // returns the array of all the li elements
    let rowList = document.querySelectorAll('li');

    // loop through each and check if item has been clicked
    for (let i = 0; i < 6; i++) { //ListLength here
        rowList[i].onclick = function(event) {
            event.preventDefault();
            rowList[i].style.textDecoration = "line-through";
            rowList[i].style.textDecorationThickness = "5px";
        }
    }

}

//Making a popup on image when hovered over
