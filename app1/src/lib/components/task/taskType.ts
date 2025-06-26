export interface TaskType {
	id: number;
	name: string;
	description: string;
	finished: boolean;
	complexity: number;
	onMarkDone: (id: number) => void;
}
