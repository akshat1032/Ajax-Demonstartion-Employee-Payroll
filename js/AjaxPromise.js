let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

showTime = () => {
    const date = new Date();
    return date.getHours() + "hrs" + date.getMinutes() + "mins" + date.getSeconds() + "sec";
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log(methodType + " state change called. Ready state : ", xhr.readyState, " Status : ", xhr.status);
            if (xhr.status === 200 || xhr.status === 201) {
                resolve(xhr.responseText);
            } else if (xhr.status >= 400) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log(`Error occured, status : ${reject.status}, statusText : ${reject.statusText}`);
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
    });
}

const getURL = "http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true).
    then(responseText => {
        console.log("Get User Data at: ", showTime(), ", data: ", responseText)
    })
    .catch(error => {
        console.log("GET error status ", JSON.stringify(error));
    })

const deleteURL = "http://localhost:3000/employees/3";

makePromiseCall("DELETE", deleteURL, false).
    then(responseText => {
        console.log("Delete User Data at: ", showTime(), ", data: ", responseText)
    })
    .catch(error => {
        console.log("DELETE error status ", JSON.stringify(error));
    })

const postURL = "http://localhost:3000/employees";
const empData = { "name": "Hanabi Hyuga", "salary": 2850000 };
makePromiseCall("POST", postURL, true, empData,).
    then(responseText => {
        console.log("Post User Data at: ", showTime(), ", data: ", responseText)
    })
    .catch(error => {
        console.log("POST error status ", JSON.stringify(error));
    })
