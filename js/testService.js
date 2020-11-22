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
        xhr.onerror = function () {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
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