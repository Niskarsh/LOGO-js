const { TokenType } = require("");
const { Binary, Grouping, Unary, Literal } = require("");

const parser = function(tokens) {
	self = this;
	self.tokens = tokens;

	self.match = function(types) {
		for (let i = 0; i < types.length; i++) {
			let type = types[i];
			if (this.check(type)) {
				this.advance();
				return true;
			}
		}
		return false;
	};

	self.check = function(type) {
		if (this.isAtEnd()) return false;
		return this.peek().type == type;
	};

	self.advance = function() {
		if (!this.isAtEnd()) this.current++;
		return this.previous();
	};

	self.isAtEnd = function() {
		return this.peek().type == TokenType.EOF;
	};

	self.peek = function() {
		return this.tokens[this.current];
	};

	self.previous = function() {
		return this.tokens[this.current - 1];
	};

	self.expression = function() {
		return this.equality();
	};

	self.equality = function() {
		var expr = this.comparison();

		while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
			var operator = this.previous();
			var right = this.comparison();
			expr = new Binary(expr, operator, right);
		}
		return expr;
	};

	self.comparison = function() {
		var expr = this.addition();

		while (
			this.match(
				TokenType.GREATER,
				TokenType.GREATER_EQUAL,
				TokenType.LESS,
				TokenType.LESS_EQUAL
			)
		) {
			var operator = this.previous();
			var right = this.addition();
			expr = new Binary(expr, operator, right);
		}
		return expr;
	};

	self.addition = function() {
		var expr = this.multiplication();

		while (this.match(TokenType.MINUS, TokenType.PLUS)) {
			var operator = this.previous();
			var right = this.multiplication();
			expr = new Binary(expr, operator, right);
		}

		return expr;
	};

	self.multiplication = function() {
		var expr = this.unary();

		while (this.match(TokenType.SLASH, TokenType.STAR)) {
			var operator = this.previous();
			var right = this.unary();
			expr = new Binary(expr, operator, right);
		}

		return expr;
	};

	self.unary = function() {
		if (this.match(TokenType.BANG, TokenType.MINUS)) {
			var operator = this.previous();
			var right = this.unary();
			return new Unary(operator, right);
		}

		return this.primary();
	};
};
