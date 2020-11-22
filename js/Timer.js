function showTime() {
    const date = new Date();
    return date.getHours() + "hrs" + date.getMinutes() + "mins" + date.getSeconds() + "sec";
}
function showSessionExpire() {
    console.log("Activity B : Your session expired at : ", showTime());
}

console.log("Activity A : Triggering Activity-B at : ", showTime());
let timeout = 17600;
setTimeout(showSessionExpire, timeout);
console.log("Activity A : Triggered Activity-B at : ", showTime(), `will execute after ${(timeout/1000)} seconds`);