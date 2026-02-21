
export type PlantType = 'succulent' | 'cactus' | 'fern' | 'flower' | 'tree';

export interface Habit {
  id: string;
  name: string;
  plantType: PlantType;
  lastCompletedDate: string | null; // ISO string YYYY-MM-DD
  growthStage: number; // 0 to 4
  createdAt: string;
}

export interface Quote {
  text: string;
  author: string;
}
