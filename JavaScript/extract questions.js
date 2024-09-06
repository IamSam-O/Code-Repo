const ids = ['answer_body_A', 'answer_body_B', 'answer_body_C', 'answer_body_D'];
const column = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
const allData = [];

// Mapping for answer transformations
const answerMapping = {
    'A': '1',
    'B': '2',
    'C': '3',
    'D': '4',
    'E': '5' 
};

// Select all correct and wrong answer elements
const correctAnswerElements = document.querySelectorAll('#result-body > div:nth-child(2) > div.right-answers > ul > ul > li > a');
const wrongAnswerElements = document.querySelectorAll('#result-body > div:nth-child(2) > div.wrong-answers > ul > ul > li > a');

// Function to extract data from a question
async function extractQuestionData(element, index) {
    element.click();

    // Wait for the question to be populated
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Extract the question data
    const data = {};
    const questionElement = document.getElementById('question_body');
    const question = questionElement ? questionElement.textContent.replace(/\n/g, '') : `Question element for question ${index + 1} not found.`;
    const correctAnswerElement = document.querySelector('a.correct-answer.ng-binding');
    const correctAnswerText = correctAnswerElement ? correctAnswerElement.textContent : '';
    let correctAnswer = correctAnswerText.replace('Correct Answer: ', '');
    const correctAnswerSize = correctAnswer ? correctAnswer.split(',').length : 0;
    
    // Trim spaces on checkbox answers
    if (correctAnswerSize > 1) {
        correctAnswer = correctAnswer.split(',').map(answer => answer.trim()).join(', ');
    }
    
    ids.forEach((id, idx) => {
        const optionElement = document.getElementById(id);
        const label = optionElement ? optionElement.textContent.replace(/\n/g, '') : `Label element within id ${id} not found.`;
        data['Question Text'] = question;
        data['Question Type'] = correctAnswerSize > 1 ? 'Checkbox' : 'Multiple Choice';
        data[column[idx]] = label;
    });
    data['Option 5'] = '';
    // Get the correct answer from the <a> element
    data['Correct Answer'] = correctAnswer;
    
    allData.push(data);
    }
    
    // Function to process all questions
    async function processQuestions() {
        for (let i = 0; i < correctAnswerElements.length; i++) {
            await extractQuestionData(correctAnswerElements[i], i);
        }
    
        for (let i = 0; i < wrongAnswerElements.length; i++) {
            await extractQuestionData(wrongAnswerElements[i], i + correctAnswerElements.length);
        }
    
        // Apply the answer value mapping
        allData.forEach(data => {
            if (data['Correct Answer']) {
                const answers = data['Correct Answer'].split(',');
                const mappedAnswers = answers.map(answer => answerMapping[answer.trim()] || answer.trim());
                data['Correct Answer'] = mappedAnswers.join(',');
            }
        });

    // Log the entire array as a table after all data is extracted and mapped
    console.table(allData);
}

// Start processing questions
processQuestions();