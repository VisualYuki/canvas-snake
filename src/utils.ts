import { Cell, Model } from "./model";

export function isEqualCells(first: Cell, second: Cell): boolean {
	if (first.xCoord === second.xCoord && first.yCoord === second.yCoord) {
		return true;
	} else {
		return false;
	}
}

export function log(model: Model) {
	console.log("==========");
	console.log("board",model.board.freeCells);
	console.log("snake", model.snake.cells);
}
