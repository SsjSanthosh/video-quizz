import { QuestionType } from "utils/types";
import { useState } from "react";
import styles from "./QuizController.module.scss";
import QuizQuestion from "components/QuizQuestion";

const QuizController = ({
  questions,
  onSuccess,
}: {
  questions: QuestionType[];
  onSuccess: () => void;
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const goToNextQuestion = () => {
    if (currentQuestion === questions.length - 1) onSuccess();
    else setCurrentQuestion(currentQuestion + 1);
  };
  return (
    <div className={styles["container"]}>
      <h2>Answer all the questions correctly to progress</h2>
      <div className={styles["question-container"]}>
        <QuizQuestion question={questions[currentQuestion]} onSuccess={goToNextQuestion} />
      </div>
    </div>
  );
};

export default QuizController;
