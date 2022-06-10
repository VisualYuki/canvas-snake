import { Controller } from "./controller";
//import { View } from "./view";


class Game {
	//view: View;
	//model: Model;
	controller: Controller;

	constructor() {
		this.start();
	}

	start() {
		//this.view = new View();

		//this.model = new Model();
		this.controller = new Controller();
	}

	restart() {
		this.controller.domListener.destroy();
		this.controller = new Controller();
	}
}

let game: Game = new Game();

//ctx.moveTo(0, 0);
//ctx.lineTo(0, 600);
