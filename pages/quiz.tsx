import { useEffect, useState } from "react";
import MainContent from "../components/quiz/MainContent";

interface IState {
  quizzes: {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
  }[];
}

const Quiz = () => {
  const [quizList, setQuizList] = useState<IState["quizzes"]>([]);

  const fetchQuiz = async () => {
    const temp = await fetch(
      `https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple`
    ).then((res) => res.json());

    setQuizList(temp.results);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);
  return (
    <div>
      <h1>Quiz</h1>
      <MainContent quizList={quizList} />
    </div>
  );
};

export default Quiz;
