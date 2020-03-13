function Expr() {}
Expr.prototype.Visitor = function() {};
Expr.prototype.accept = function() {};

function Binary(left, operator, right) {
	self = this;
	self.left = left;
	self.operator = operator;
	self.right = right;
}
Binary.prototype = Object.create(Expr.prototype);
Binary.prototype.constructor = Binary;

function Grouping(expression) {
	self = this;
	self.expression = expression;
}
Grouping.prototype = Object.create(Expr.prototype);
Grouping.prototype.constructor = Grouping;

function Unary(operator, right) {
	self = this;
	self.operator = operator;
	self.right = right;
}
Unary.prototype = Object.create(Expr.prototype);
Unary.prototype.constructor = Unary;

function Literal(value) {
	self = this;
	self.value = value;
}
Literal.prototype = Object.create(Expr.prototype);
Literal.prototype.constructor = Literal;

module.exports = {
	Binary,
	Grouping,
	Unary,
	Literal
};
