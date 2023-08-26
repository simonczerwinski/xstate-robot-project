export interface RobotModel {
  id: number;
  x: number;
  y: number;
  direction: number;
  isPlaced: boolean;
  isLost: boolean;
  coordinates: string;
  commands: string;
}
