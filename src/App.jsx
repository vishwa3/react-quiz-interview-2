import { useState } from "react";
import "./App.css";

const quiz = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the boiling point of water?",
    options: ["0°C", "50°C", "100°C", "150°C"],
    answer: "100°C",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pb", "Fe"],
    answer: "Au",
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yen", "Won", "Dollar", "Euro"],
    answer: "Yen",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      "Harper Lee",
      "Mark Twain",
      "Ernest Hemingway",
      "F. Scott Fitzgerald",
    ],
    answer: "Harper Lee",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
    answer: "Blue Whale",
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Onion", "Pepper"],
    answer: "Avocado",
  },
  {
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
    answer: "Mitochondria",
  },
  {
    question: "Which programming language is used for React?",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: "JavaScript",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
];

export default function App() {
  const [quizState, setQuizState] = useState({
    isStarted: false,
    currentQuestionIndex: 0,
    score: 0,
    questions: quiz.map((q) => ({ ...q, selectedAnswer: null })),
    isFinished: false,
  });

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const isLastQuestion = quizState.currentQuestionIndex === quiz.length - 1;

  function handleNext() {
    if (isLastQuestion) {
      const score = quizState.questions.reduce(
        (score, question) =>
          score + (question.selectedAnswer === question.answer ? 1 : 0),
        0
      );
      setQuizState((prev) => ({
        ...prev,
        isFinished: true,
        score,
      }));
    } else {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: Math.min(
          prev.currentQuestionIndex + 1,
          quiz.length - 1
        ),
      }));
    }
  }

  function handlePrevious() {
    setQuizState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1),
    }));
  }

  function handleAnswerSelect(selectedAnswer) {
    setQuizState((prev) => ({
      ...prev,
      questions: prev.questions.map((q, id) =>
        id === prev.currentQuestionIndex ? { ...q, selectedAnswer } : q
      ),
    }));
  }

  if (!quizState.isStarted) {
    return (
      <button
        onClick={() => setQuizState((prev) => ({ ...prev, isStarted: true }))}
      >
        Start Quiz
      </button>
    );
  }

  if (quizState.isFinished) {
    return (
      <div className="quiz-result">
        <h2>Quiz Completed! </h2>
        <p>
          Your score is: {quizState.score} out of {quiz.length}
        </p>
        <button onClick={() => window.location.reload()}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="progress-indicator">
        Question {quizState.currentQuestionIndex + 1} of {quiz.length}
      </div>
      <div className="question-container">
        <h3>{currentQuestion.question}</h3>
        <div className="options-container">
          {currentQuestion.options.map((option) => (
            <label key={option} className="option-label">
              <input
                type="radio"
                value={option}
                checked={currentQuestion.selectedAnswer === option}
                onChange={() => handleAnswerSelect(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className="navigation-buttons">
        {quizState.currentQuestionIndex > 0 && (
          <button onClick={handlePrevious}>Previous</button>
        )}
        <button onClick={handleNext} disabled={!currentQuestion.selectedAnswer}>
          {isLastQuestion ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
