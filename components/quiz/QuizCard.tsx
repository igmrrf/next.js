import { useEffect, useState } from "react";

type IProps = {
  quiz: {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
  };
  position: number;
  result: Array<string>;
  setResult: (text: string[]) => void;
};

interface IState {
  options: Array<string>;
}

const QuizCard = ({ quiz, result, setResult, position }: IProps) => {
  const [options, setOptions] = useState<IState["options"]>([]);
  const [checked, setChecked] = useState<string>("");

  useEffect(() => {
    quiz.incorrect_answers[3] = quiz.correct_answer;
    function shuffle(newAnswers: Array<string>) {
      let currentIndex = newAnswers.length,
        randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [newAnswers[currentIndex], newAnswers[randomIndex]] = [
          newAnswers[randomIndex],
          newAnswers[currentIndex],
        ];
      }
      return newAnswers;
    }

    shuffle(quiz.incorrect_answers);
    setOptions(quiz.incorrect_answers);
  }, [quiz]);

  const handleAnswer = (option: string) => {
    setChecked(option);
    if (option === quiz.correct_answer) {
      setResult([...result, option]);
      console.log(result);
    }
    if (position === 9) {
      alert(`${result.length}`);
    }
  };
  return (
    <article>
      <p>{quiz.question.replace(/&quot;/g, '"')}</p>
      <section>
        {options.map((option, index) => (
          <div key={`${option}${index}`}>
            <input
              type="checkbox"
              onChange={(e) => handleAnswer(option)}
              id={option}
              name="vehicle1"
              value="Bike"
              checked={checked === option}
            />
            <label htmlFor={option}> {option.replace(/&quot;/g, '"')}</label>
            <br />
          </div>
        ))}
      </section>
    </article>
  );
};

export default QuizCard;
