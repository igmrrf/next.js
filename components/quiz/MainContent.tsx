import { useState } from "react";
import QuizCard from "./QuizCard";

type IProps = {
  quizList: {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
  }[];
};

const MainContent = ({ quizList }: IProps) => {
  const [result, setResult] = useState<Array<string>>([]);
  return (
    <main>
      <div className='quiz-list'>
        {quizList.map((quiz, index) => (
          <QuizCard quiz={quiz} position={index} result={result} setResult={setResult} key={index} />
        ))}
      </div>
    </main>
  );
};

export default MainContent;
