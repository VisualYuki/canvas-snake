import { config } from "./config";
import { Cell, Snake, Target } from "./model";

export class View {
	ctx: CanvasRenderingContext2D;

	constructor(snake: Snake, target: Target) {
		this.getCanvasContext();

		this.drawBoard();
		snake.cells.forEach((cell: Cell) => {
			this.drawSnakeCell(cell);
		});

		//this.drawSnake(snake);

		this.drawTarget(target);
	}

	getCanvasContext() {
		let canvas: HTMLCanvasElement = document.getElementById(
			"canvas"
		) as HTMLCanvasElement;
		let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
		this.ctx = ctx;
	}

	drawBoard() {
		this.ctx.strokeStyle = "grey";
		this.ctx.lineWidth = 1;

		for (let i = 0; i <= config.width; i += config.step) {
			this.ctx.beginPath();
			this.ctx.moveTo(i, 0);
			this.ctx.lineTo(i, config.height);
			this.ctx.stroke();
		}

		for (let j = 0; j <= config.height; j += config.step) {
			this.ctx.beginPath();
			this.ctx.moveTo(0, j);
			this.ctx.lineTo(config.height, j);
			this.ctx.stroke();
		}
	}

	drawSnakeCell(cell: Cell) {
		this.ctx.fillStyle = "green";

		this.ctx.fillRect(cell.xCanvas + 1, cell.yCanvas + 1, config.step - 2, config.step - 2);
	}

	drawTarget(target: Target) {
		this.ctx.beginPath();

		let radius: number = config.step / 2;

		this.ctx.arc(
			target.xCanvas + radius,
			target.yCanvas + radius,
			radius,
			0,
			Math.PI * 2,
			false
		);

		this.ctx.fillStyle = "red";

		this.ctx.fill();
	}

	clearCell(cell: Cell) {
		this.ctx.clearRect(cell.xCanvas + 1, cell.yCanvas + 1, config.step - 2, config.step - 2);
	}
}
