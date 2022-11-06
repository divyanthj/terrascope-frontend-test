const fs = require("fs");

function jsonWriter(filePath, data) {
    let error = null;
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
        error = err;
    });
    return error || data;
}

module.exports = jsonWriter;