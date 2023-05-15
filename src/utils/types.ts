export interface ChildrenType {
  children: React.ReactElement;
}

export interface GenericObject {
  [key: string]: any;
}

export interface QuestionType {
  question: string;
  id: string;
  correct: string;
  options: {
    option: string;
    id: string;
  }[];
}

export interface VideoType {
  title: string;
  duration: string;
  id: string;
  thumbnail: string;
  position: number;
  questions: QuestionType[];
}