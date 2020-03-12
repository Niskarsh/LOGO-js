let Token = function (type, lexeme, literal, line) {
    self = this;
    self.type = type;
    self.lexeme = lexeme;
    self.literal = literal;
    self.line = line;
    self.toString = function () {
        return `${type} ${lexeme} ${literal}`;
    };
};

module.exports = { Token };