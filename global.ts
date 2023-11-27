export interface Question {
  id: number;
  sentence: string;
  options: string[];
  answers: number[];
  explanation: string;
  feedback: string[];
  review: false;
}

