interface Direction {
	(x: number, y: number): string;
}

export interface IModelRobot {
	id: number;
	icon: string;
	x: number;
	y: number;
	direction?: Direction;
	isPlaced: boolean;
	isLost: boolean;
	coordinates: string;
	commands: string;
}
