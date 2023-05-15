import { QuestionType } from "utils/types";
import { useEffect, useState } from "react";
import styles from "./QuizQuestion.module.scss";
import { Alert, Button, Radio, RadioGroup, Stack } from "@chakra-ui/react";

const QuizQuestion = ({
  question,
  onSuccess,
}: {
  question: QuestionType;
  onSuccess: () => void;
}) => {
  const [answer, setAnswer] = useState(question.options[0].id);
  const [error, setError] = useState(false);
  const handleSubmit = () => {
    setError(false);
    console.log({ answer, question });
    if (answer === question.correct) {
      onSuccess();
    } else setError(true);
  };
  useEffect(() => {
    setAnswer(question.options[0].id);
  }, [question]);
  return (
    <div className={styles["container"]}>
      <h2>{question.question}</h2>
      <RadioGroup value={answer} onChange={(val) => setAnswer(val)}>
        <Stack spacing="4">
          {question.options.map((opt) => {
            return (
              <Radio size="md" value={opt.id} key={opt.id}>
                {opt.option}
              </Radio>
            );
          })}
        </Stack>
      </RadioGroup>
      {error && (
        <Alert status="error">Incorrect answer, please try again</Alert>
      )}
      <Button onClick={handleSubmit}>Check</Button>
    </div>
  );
};

export default QuizQuestion;
