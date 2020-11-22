let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

showTime = () => {
    const date = new Date();
    return date.getHours() + "hrs" + date.getMinutes() + "mins" + date.getSeconds() + "sec";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log(methodType + " state change called. Ready state : ", xhr.readyState, " Status : ", xhr.status);
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 series client error or 500 series server error");
            }
        }
    }
    xhr.open(methodType, url, async);
    if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(data));
    }
    else xhr.send();
    console.log(methodType + " request sent to the server at : ", showTime());
}

const getURL = "http://localhost:3000/employees/1";
function getUserDetails(data) {
    console.log(`Get User Data at: ${showTime()}, data : ${data}`);
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX call to Server at : ", showTime());

const deleteURL = "http://localhost:3000/employees/3";
function deleteUser(data) {
    console.log(`${data}, user deleted at : ${showTime()}`);
}
makeAJAXCall("DELETE", deleteURL, deleteUser, false);
console.log("Made DELETE AJAX call to Server at : ", showTime());

const postURL = "http://localhost:3000/employees/";
const empData = { "name": "Hanabi Hyuga", "salary": 2850000 };
function addUser(data) {
    console.log(`${data} added at ${showTime()}`);
}
makeAJAXCall("POST", postURL, addUser, true, empData,);
console.log("Made POST AJAX call to Server at : ", showTime());