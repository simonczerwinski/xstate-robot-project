export interface IModelRobot {
	id: number;
	icon: string;
	x: number;
	y: number;
	direction: number;
	isPlaced: boolean;
	isLost: boolean;
	coordinates: string;
	commands: string;
}
