// const { doc } = require('prettier');

const submitBtn = document.getElementById('submit-btn');
const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('book-author');
const statusInput = document.getElementById('book-status');

// toggle light/dark theme
function setTheme() {
  const root = document.documentElement;
  const newTheme = root.className === 'dark' ? 'light' : 'dark';
  root.className = newTheme;
}
document.querySelector('.theme-toggle').addEventListener('click', setTheme);
// default dark mode
setTheme();

let myLibrary = [];

// the book constructor
function Book(title, author, status) {
  this.title = title;
  this.author = author;
  // this.pages = pages; ADD LATER
  this.status = status;
}

function createCard() {
  const toReadContainer = document.getElementById('to-read');
  const currentlyReadingContainer =
    document.getElementById('currently-reading');
  const booksFinishedContainer = document.getElementById('finished');

  // Create DOM element for new book card
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-cards');

  // create DOM elements for text lines
  const titleLine = document.createElement('div');
  titleLine.classList.add('title-line');
  const authorLine = document.createElement('div');
  authorLine.classList.add('author-line');
  const statusLine = document.createElement('div');
  statusLine.classList.add('status-line');
  bookCard.appendChild(titleLine);
  bookCard.appendChild(authorLine);
  bookCard.appendChild(statusLine);

  // loop to iterate through myLibrary object array and append new book card
  for (let i = 0; i < myLibrary.length; i += 1) {
    if (myLibrary[i].status === 'read') {
      booksFinishedContainer.appendChild(bookCard);
    } else if (myLibrary[i].status === 'currently reading') {
      currentlyReadingContainer.appendChild(bookCard);
    } else if (myLibrary[i].status === 'to read') {
      toReadContainer.appendChild(bookCard);
    }

    titleLine.textContent = `Title:  ${myLibrary[i].title}`;
    authorLine.textContent = `Author:  ${myLibrary[i].author}`;
    statusLine.textContent = `Status:  ${myLibrary[i].status}`;
  }
}

// Takes form's input values as arguments for Book constructor then pushes to library array
function addBookToLibrary() {
  console.log('button clicked');
  const titleValue = titleInput.value;
  const authorValue = authorInput.value;
  const statusValue = statusInput.value;
  const book1 = new Book(titleValue, authorValue, statusValue);
  myLibrary.push(book1);

  // clear input fields
  titleInput.value = '';
  authorInput.value = '';
  createCard();
}

// event listener for submit button
document
  .querySelector('#submit-btn')
  .addEventListener('click', addBookToLibrary);

const temp = document.getElementById('temp');
const showContainer = document.getElementById('hide-container');

temp.addEventListener('click', () => {
  if (showContainer.style.display === '') {
    showContainer.style.display = 'block';
  } else if (showContainer.style.display === 'block') {
    showContainer.style.display = '';
  }
});

/*
function createRowV2() {
  let resultContainer = document.createElement('div');
  resultContainer.classList.add('rowOne');
  resultsRow.prepend(resultContainer);

  for (let i = 0; i <= 2; i++) {
    let resultBox = document.createElement('div');
    resultBox.classList.add('rowOneResults');
    resultBox.textContent = guessArray[i];
    resultContainer.appendChild(resultBox);
  }

  let hintBox = document.createElement('div');
  hintBox.classList.add('clueContainer');

  if (currentTries == 0) {
    startTimer(); //starts timer for the first submission
  }

  currentTries += 1;
  lineScore.textContent = currentTries;

  if (correctResult === 3) {
    hintBox.textContent = winMessage;
    scoreArray.push(currentTries);
    pauseTimer();
    submit.value = 'Reset';
  } else if (correctResult > 0 && incorrectResult > 0) {
    hintBox.textContent =
      correctResult +
      ' correct and in the right spot. ' +
      incorrectResult +
      ' correct but in the wrong spot.';
  } else if (correctResult > 0 && incorrectResult === 0) {
    hintBox.textContent = correctResult + ' correct and in the right spot.';
  } else if (correctResult === 0 && incorrectResult > 0) {
    hintBox.textContent = incorrectResult + ' correct but in the wrong spot.';
  } else if (correctResult === 0 && incorrectResult === 0) {
    hintBox.textContent = wrong;
  }

  resultContainer.appendChild(hintBox);
}
*/

/*
What to include:  
- separate into 3 sections
  - books read, currently reading, to read
- total pages read




*/

/*  INSTRUCTIONS
If you haven’t already, set up your project with skeleton HTML/CSS and JS files.
All of your book objects are going to be stored in a simple array, so add a function to the script (not the constructor) that can take user’s input and store the new book objects into an array. Your code should look something like this:

let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}
Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books to your array so you can see the display.
Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it’s been read and anything else you might want. You will most likely encounter an issue where submitting your form will not do what you expect it to do. That’s because the submit input tries to send the data to a server by default. If you’ve done the bonus section for the calculator assignment, you might be familiar with event.preventDefault();. Read up on the event.preventDefault documentation again and see how you can solve this issue!
Add a button on each book’s display to remove the book from the library.
You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.
Add a button on each book’s display to change its read status.
To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.
NOTE: You’re not required to add any type of storage right now. You will have the option to come back to this project later on in the course.
*/
