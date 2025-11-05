
export type GameView = 'menu' | 'seres-vivos' | 'tres-en-raya' | 'ahorcado' | 'jeopardy' | 'cien-galileanos';

export interface JeopardyQuestion {
  question: string;
  answer: string;
  points: number;
  revealed: boolean;
}

export interface JeopardyCategory {
  title: string;
  questions: JeopardyQuestion[];
}

export interface FeudAnswer {
  answer: string;
  points: number;
}

export interface FeudRound {
  question: string;
  answers: FeudAnswer[];
}
