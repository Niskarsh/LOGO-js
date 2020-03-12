// import { hadError } from "../Logo.js"
function error(line, message) {
    this.report(line, "", message);
}

function report(line, where, message) {
    console.log(
        "[line " + line + "] Error" + where + ": " + message);
    this.hadError = true;
    // return;
}

module.exports = { error, report };