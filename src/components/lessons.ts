// lessons.ts
interface Quiz {
    question: string;
    options: string[];
    answer: string;
  }
  
  interface Lesson {
    title: string;
    content: string;
    quiz: Quiz[];
  }
  
  const lessons: Lesson[] = [
    {
      title: 'Lesson 1: Basics of Saving',
      content: 'Here is where the lesson content will go...',
      quiz: [
        {
          question: 'What is saving?',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          answer: 'Option 1',
        },
        // More questions...
      ],
    },
    {
      title: 'Lesson 2: Basics of Investing',
      content: 'Here is where the lesson content will go...',
      quiz: [
        {
          question: 'What is investing?',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          answer: 'Option 1',
        },
        // More questions...
      ],
    },
    // More lessons...
  ];
  
  export default lessons;
  