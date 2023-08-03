import React, { useState, useEffect } from 'react';
import lessons from './lessons';

const AiTutor: React.FC = () => {
    const [stage, setStage] = useState('initialQuiz'); // Can be 'initialQuiz', 'lesson', or 'sectionQuiz'
    const [quizScore, setQuizScore] = useState(0);
    const [lessonStep, setLessonStep] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Array<string | null>>(Array(lessons[0].quiz.length).fill(null));

     // Reset selectedAnswers when transitioning to a new stage
  useEffect(() => {
    setSelectedAnswers(Array(lessons[lessonStep].quiz.length).fill(null));
  }, [stage, lessonStep]);

  
    const handleAnswerChange = (questionIndex: number, selectedOption: string) => {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[questionIndex] = selectedOption;
      setSelectedAnswers(newSelectedAnswers);
    };
  
    const handleQuizSubmit = () => {
      // Logic to calculate quiz score
      let score = 0;
      for (let i = 0; i < lessons[0].quiz.length; i++) {
        if (selectedAnswers[i] === lessons[0].quiz[i].answer) {
          score++;
        }
      }
      setQuizScore(score);
  
      // Move to lesson
      setStage('lesson');
    };

  const handleLessonComplete = () => {
    // Logic to move to section quiz
    setStage('sectionQuiz');
  };

  const handleSectionQuizSubmit = () => {
    // Logic to calculate section quiz score and move to next lesson
    setLessonStep(lessonStep + 1);
    setStage('lesson');
  };

  if (stage === 'initialQuiz') {
    return (
      <div>
        <h1>Initial Quiz</h1>
        {lessons[0].quiz.map((question, index) => (
          <div key={index}>
            <p>{question.question}</p>
            {question.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  value={option}
                  checked={selectedAnswers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button onClick={handleQuizSubmit}>Submit Quiz</button>
      </div>
    );
  } else if (stage === 'lesson') {
    return (
      <div>
        <h1>Lesson {lessonStep + 1}</h1>
        <p>{lessons[lessonStep].content}</p>
        <button onClick={handleLessonComplete}>Complete Lesson</button>
      </div>
    );
  } else { // sectionQuiz
    return (
      <div>
        <h1>Section Quiz</h1>
        {lessons[lessonStep].quiz.map((question, index) => (
          <div key={index}>
            <p>{question.question}</p>
            {question.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  value={option}
                  checked={selectedAnswers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button onClick={handleSectionQuizSubmit}>Submit Quiz</button>
      </div>
    );
  }
};


export default AiTutor;
