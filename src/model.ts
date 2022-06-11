import { game } from ".";
import { config } from "./config";
import { isEqualCells, log } from "./utils";
let random = require("lodash/fp/random");
import { View } from "./view";

export enum Direction {
	up,
	down,
	left,
	right,
}

export class Model {
	snake: Snake;
	view: View;
	board: Board;
	target: Target;

	constructor() {
		this.snake = new Snake();

		this.board = new Board(this.snake);
		this.target = new Target(this.board);
		this.view = new View(this.snake, this.target);
	}

	setSnakeDirection(direction: Direction) {
		let errorDirection: boolean = false;

		switch (direction) {
			case Direction.left:
				if (this.snake.direction == Direction.right) {
					errorDirection = true;
				}
				break;
			case Direction.right:
				if (this.snake.direction == Direction.left) {
					errorDirection = true;
				}
				break;
			case Direction.up:
				if (this.snake.direction == Direction.down) {
					errorDirection = true;
				}
				break;
			case Direction.down:
				if (this.snake.direction == Direction.up) {
					errorDirection = true;
				}
				break;
		}

		if (!errorDirection) {
			this.snake.direction = direction;
		}
	}

	updateSnake() {
		//log(this);
		//debugger;
		this.updateFootCell();

		//log(this);

		this.updateHeadCell();
		//log(this);
	}

	private isHeadTarget(): boolean {
		let headCell: Cell = this.snake.getHeadCell();

		if (isEqualCells(headCell, this.target)) {
			return true;
		} else {
			return false;
		}
	}

	private updateFootCell() {
		if (!this.isHeadTarget()) {
			this.removeFootCell();
		}
	}

	private removeFootCell() {
		let footCell: Cell = this.snake.getFootCell();

		this.board.addFreeCell(footCell);
		this.view.clearCell(footCell);
	}

	private updateHeadCell() {
		let headCell = this.snake.getHeadCell();
		let newHead: Cell;

		switch (this.snake.direction) {
			case Direction.down:
				newHead = new Cell(
					headCell.xCoord,
					(headCell.yCoord + 1) % this.board.yCells
				);
				break;
			case Direction.up:
				newHead = new Cell(
					headCell.xCoord,
					(headCell.yCoord - 1 + this.board.yCells) % this.board.yCells
				);
				break;
			case Direction.right:
				newHead = new Cell(
					(headCell.xCoord + 1) % this.board.xCells,
					headCell.yCoord
				);
				break;
			case Direction.left:
				newHead = new Cell(
					(headCell.xCoord - 1 + this.board.xCells) % this.board.xCells,
					headCell.yCoord
				);
				break;
		}
		this.snake.cells.push(newHead);

		if (this.snake.isHeadConflict()) {
			game.restart();
		}

		if (this.isHeadTarget()) {
			this.setNewTarget();
		}

		this.board.removeFreeCell(newHead);
		this.view.drawSnakeCell(newHead);
	}

	private setNewTarget() {
		debugger;
		this.target = new Target(this.board);

		this.view.drawTarget(this.target);
	}
}

export class Board {
	xCells: number;
	yCells: number;
	snake: Snake;

	freeCells: Array<Cell> = [];

	constructor(snake: Snake) {
		this.xCells = config.width / config.step;
		this.yCells = config.height / config.step;
		this.snake = snake;
		this.initFreeCells();
		this.getFreeCell();
	}

	initFreeCells() {
		let isFree = (boardX: number, boardY: number) => {
			return (
				this.snake.cells.filter((item: Cell) => {
					if (item.xCoord === boardX && item.yCoord === boardY) {
						return true;
					} else {
						return false;
					}
				}).length === 0
			);
		};

		for (let i = 0; i < this.xCells; i++) {
			for (let j = 0; j < this.yCells; j++) {
				if (isFree(i, j)) {
					this.freeCells.push(new Cell(i, j));
				}
			}
		}
	}

	removeFreeCell(cell: Cell) {
		this.freeCells = this.freeCells.filter((item: Cell) => {
			if (isEqualCells(item, cell)) {
				return false;
			} else {
				return true;
			}
		});
	}

	addFreeCell(cell: Cell) {
		this.freeCells.push(cell);
	}

	getFreeCell() {
		let randIndex: number = random(0, this.freeCells.length - 1);

		return this.freeCells[randIndex];
	}
}

export class Snake {
	cells: Array<Cell> = [];
	direction: Direction = Direction.down;

	constructor() {
		this.cells.push(new Cell(0, 0));
		this.cells.push(new Cell(0, 1));
		this.cells.push(new Cell(0, 2));
	}

	getHeadCell(): Cell {
		return this.cells[this.cells.length - 1];
	}

	getFootCell(): Cell {
		return this.cells.shift();
	}

	isHeadConflict(): boolean {
		let headCell = this.getHeadCell();

		if (this.cells.indexOf(headCell) === this.cells.length - 1) {
			return false;
		} else {
			return true;
		}
	}
}

export class Cell {
	xCoord: number;
	yCoord: number;
	xCanvas: number;
	yCanvas: number;

	constructor(x, y) {
		this.xCoord = x;
		this.yCoord = y;

		this.xCanvas = x * config.step;
		this.yCanvas = y * config.step;
	}
}

export class Target extends Cell {
	board: Board;

	constructor(board: Board) {
		let freeCell = board.getFreeCell();
		super(freeCell.xCoord, freeCell.yCoord);
		this.board = board;
	}
}
