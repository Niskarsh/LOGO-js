const fs = require("fs");
const path = require("path");
const { error, report } = require("./src/errorHandling");
const { Scanner } = require("./src/scanning/Scanner.js");
const sourceFile = process.argv[2];





let Logo = function (source) {
    self = this;
    self.source = source;
    self.hadError = false;
    self.error = error;
    self.report = report;
    self.runLogo = function () {
        console.log(`Source is: \n`, this.source);
        let scanner = new Scanner(this.source);
        let tokens = scanner.scanTokens();
        console.log(`tokens are: \n`, tokens);
    };
}

const test = async () => {
    let source = "";
    const sourcePath = path.resolve(__dirname, "tests", "source.txt");
    await fs.readFile(sourcePath, 'utf8', (err, data) => {
        source = data;
        let logoInstance = new Logo(source);
        logoInstance.runLogo();
    });
}

test();
