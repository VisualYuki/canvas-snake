import { Direction } from "./model";
import { Model } from "./model";
import { View } from "./view";
import { config } from "./config";

export class Controller {
	model: Model;
	intervalId: number;

	constructor() {
		this.model = new Model();
		this.domListener.init();
		this.startSnake();
	}

	startSnake() {
		setInterval(() => {
			this.model.updateSnake();
		}, config.timeUpdate);
	}

	domListener: any = {
		init() {
			document.addEventListener("keyup", this.keyEvent);
		},
		destroy() {
			document.removeEventListener("keyup", this.keyEvent);
		},
		keyEvent: (event: KeyboardEvent) => {
			switch (event.key) {
				case "ArrowLeft":
					this.model.setSnakeDirection(Direction.left);
					break;
				case "ArrowRight":
					this.model.setSnakeDirection(Direction.right);
					break;
				case "ArrowUp":
					this.model.setSnakeDirection(Direction.up);
					break;
				case "ArrowDown":
					this.model.setSnakeDirection(Direction.down);
					break;
			}
		},
	};
}
