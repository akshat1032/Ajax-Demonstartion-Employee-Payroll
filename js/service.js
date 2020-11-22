const getElement = document.querySelector("#get_service");
const getURL = "http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true).
    then(responseText => {
        getElement.textContent = "Get User Data at: ", showTime(), ", data: ", responseText;
    })
    .catch(error => {
        getElement.textContent = "GET error status ", JSON.stringify(error);
    })

const deleteElement = document.querySelector("#delete_service");
const deleteURL = "http://localhost:3000/employees/3";
makePromiseCall("DELETE", deleteURL, false).
    then(responseText => {
        deleteElement.textContent = "Delete User Data at: ", showTime(), ", data: ", responseText;
    })
    .catch(error => {
        deleteElement.textContent = "DELETE error status ", JSON.stringify(error);
    })

const postElement = document.querySelector("#post_service");
const postURL = "http://localhost:3000/employees/";
const empData = { "name": "Hanabi Hyuga", "salary": 2850000 };
makePromiseCall("POST", postURL, true, empData,).
    then(responseText => {
        postElement.textContent = "Post User Data at: ", showTime(), ", data: ", responseText;
    })
    .catch(error => {
        postElement.textContent = "POST error status ", JSON.stringify(error);
    })