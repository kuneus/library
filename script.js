// const { doc } = require('prettier');

// const { doc } = require("prettier");

const submitBtn = document.getElementById('submit-btn');
const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('book-author');
const pageInput = document.getElementById('page-input');
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
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// create new card when new book is added\
function createCard() {
  // variables for each of the three book sections based on read status
  const toReadContainer = document.getElementById('to-read');
  const currentlyReadingContainer =
    document.getElementById('currently-reading');
  const booksFinishedContainer = document.getElementById('finished');

  // Create DOM element for new book card
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-cards');
  bookCard.setAttribute('id', `book-card-${myLibrary.length}`);
  const cardTopContent = document.createElement('div');
  cardTopContent.classList.add('card-top-content');
  bookCard.appendChild(cardTopContent);
  const cardMiddleContent = document.createElement('div');
  cardMiddleContent.classList.add('card-middle-content');
  bookCard.appendChild(cardMiddleContent);
  const cardBottomContent = document.createElement('div');
  cardBottomContent.classList.add('card-bottom-content');
  bookCard.appendChild(cardBottomContent);

  // create DOM elements for text lines
  const titleLine = document.createElement('div');
  titleLine.classList.add('title-line');
  const titleValue = document.createElement('div');
  titleValue.classList.add('title-value');
  const authorLine = document.createElement('div');
  authorLine.classList.add('author-line');
  const authorValue = document.createElement('div');
  authorValue.classList.add('author-value');
  const pagesLine = document.createElement('div');
  pagesLine.classList.add('pages-line');
  const pagesValue = document.createElement('div');
  pagesValue.classList.add('pages-value');
  const statusLine = document.createElement('div');
  statusLine.classList.add('status-line');
  const statusValue = document.createElement('div');
  statusValue.classList.add('status-value');
  cardTopContent.appendChild(titleLine);
  cardTopContent.appendChild(titleValue);
  cardTopContent.appendChild(authorLine);
  cardTopContent.appendChild(authorValue);
  cardTopContent.appendChild(pagesLine);
  cardTopContent.appendChild(pagesValue);
  cardTopContent.appendChild(statusLine);
  cardTopContent.appendChild(statusValue);

  // create Edit and Delete button
  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  editBtn.classList.add('edit-btn');
  deleteBtn.classList.add('delete-btn');

  // create Edit options
  const editOptionsContainer = document.createElement('div');
  editOptionsContainer.classList.add('edit-options-container');
  cardMiddleContent.appendChild(editOptionsContainer);
  const editLabel = document.createElement('label');
  editLabel.setAttribute('for', `input1-${myLibrary.length}`);
  editLabel.textContent = 'Change read status:  ';
  editOptionsContainer.appendChild(editLabel);
  const editOptions = document.createElement('select');
  editOptionsContainer.appendChild(editOptions);
  editOptions.setAttribute('name', 'status');
  editOptions.setAttribute('id', `input1-${myLibrary.length}`);
  editOptions.setAttribute('name', 'read-status');
  editOptions.classList.add('update-status');
  const option1 = document.createElement('option');
  option1.setAttribute('value', 'read');
  option1.textContent = 'Read';
  editOptions.appendChild(option1);
  const option2 = document.createElement('option');
  option2.setAttribute('value', 'currently reading');
  option2.textContent = 'Currently reading';
  editOptions.appendChild(option2);
  const option3 = document.createElement('option');
  option3.setAttribute('value', 'to read');
  option3.textContent = 'Want to read';
  editOptions.appendChild(option3);

  // set id equal to location in myLibrary array
  editBtn.setAttribute('id', `edit-btn-${myLibrary.length}`);
  deleteBtn.setAttribute('id', `delete-btn-${myLibrary.length}`);
  editBtn.textContent = 'EDIT';
  deleteBtn.textContent = 'DELETE';
  cardBottomContent.appendChild(editBtn);
  cardBottomContent.appendChild(deleteBtn);

  // loop to iterate through myLibrary object array and append new book card
  for (let i = 0; i < myLibrary.length; i += 1) {
    if (myLibrary[i].status === 'read') {
      booksFinishedContainer.appendChild(bookCard);
    } else if (myLibrary[i].status === 'currently reading') {
      currentlyReadingContainer.appendChild(bookCard);
    } else if (myLibrary[i].status === 'to read') {
      toReadContainer.appendChild(bookCard);
    }

    titleLine.textContent = 'Title:';
    titleValue.textContent = `${myLibrary[i].title}`;
    authorLine.textContent = 'Author:';
    authorValue.textContent = ` ${myLibrary[i].author}`;
    pagesLine.textContent = 'Pages:';
    pagesValue.textContent = `${myLibrary[i].pages}`;
    statusLine.textContent = 'Status:';
    statusValue.textContent = `${myLibrary[i].status}`;
  }
}

// Takes form's input values as arguments for Book constructor then pushes to library array
function addBookToLibrary() {
  const titleValue = titleInput.value;
  const authorValue = authorInput.value;
  const pagesValue = pageInput.value;
  const statusValue = statusInput.value;

  if (titleValue !== '' && authorValue !== '' && pagesValue !== '') {
    const book1 = new Book(titleValue, authorValue, pagesValue, statusValue);
    myLibrary.push(book1);

    // clear input fields
    titleInput.value = '';
    authorInput.value = '';
    pageInput.value = '';
    createCard();
    togglePopup();
  }
}

const addBookBtn = document.getElementById('add-book-btn');
const popup = document.getElementById('form-popup');
const closeBtn = document.getElementById('close-btn');

// opens and closes popup
function togglePopup() {
  if (popup.style.display === 'none' || popup.style.display === '') {
    popup.style.display = 'block';
  } else if (popup.style.display === 'block') {
    popup.style.display = 'none';
  }
}

// event listeners for add new book button and close button
addBookBtn.addEventListener('click', togglePopup);
closeBtn.addEventListener('click', togglePopup);

// event listener for submit button
submitBtn.addEventListener('click', addBookToLibrary);

// event listener for delete button
document.addEventListener('click', (event) => {
  if (event.target.matches('.delete-btn')) {
    // grandparent of delete button is the book card
    const grandParent = event.target.parentElement.parentElement;
    grandParent.remove();
  }
});

// event listener for edit button
document.addEventListener('click', (event) => {
  if (event.target.matches('.edit-btn')) {
    const placeHolder = event.target;
    const grandParent = placeHolder.parentElement.parentElement;
    const editOptionsContainer = grandParent.querySelector(
      '.edit-options-container',
    );

    const titleValue = grandParent.querySelector('.title-value').textContent;
    const authorValue = grandParent.querySelector('.author-value').textContent;
    const pagesValue = grandParent.querySelector('.pages-value').textContent;
    const updateStatusValue = grandParent.querySelector('.update-status').value;
    const book1 = new Book(
      titleValue,
      authorValue,
      pagesValue,
      updateStatusValue,
    );

    // change edit button text to 'update' and display hidden div with read status choices
    if (placeHolder.textContent === 'EDIT') {
      placeHolder.textContent = 'UPDATE';
      editOptionsContainer.style.display = 'block';
      placeHolder.style.backgroundColor = 'green';
    } else if (placeHolder.textContent === 'UPDATE') {
      // if user chooses same choice of current card, returns style back to normal
      if (
        updateStatusValue ===
        grandParent.querySelector('.status-value').textContent
      ) {
        placeHolder.textContent = 'EDIT';
        editOptionsContainer.style.display = 'none';
        placeHolder.style.backgroundColor = 'var(--edit-btn-color)';
      } else {
        // if user chooses new update status, makes a new card and deletes current one
        myLibrary.push(book1);
        createCard();
        grandParent.remove();
      }
    }
  }
});

const sectionTitle1 = document.getElementById('section-title-1');
const sectionTitle2 = document.getElementById('section-title-2');
const sectionTitle3 = document.getElementById('section-title-3');
const collapsible1 = document.getElementById('collapsible-1');
const collapsible2 = document.getElementById('collapsible-2');
const collapsible3 = document.getElementById('collapsible-3');
const expColl1 = document.getElementById('expand-collapse-1');
const expColl2 = document.getElementById('expand-collapse-2');
const expColl3 = document.getElementById('expand-collapse-3');

// variables for using as argument in sumContainerHeight function
const toRead = 'to read';
const read = 'read';
const currentlyReading = 'currently reading';

// function for calculating each container's book status height
// use the above variables as arguments to target the specific container
function sumContainerHeight(arg) {
  let sum = 0;
  for (let i = 0; i < myLibrary.length; i += 1) {
    if (myLibrary[i].status === arg) {
      sum += 1;
    }
  }
  return sum;
}

// event listeners for collpasing each section
sectionTitle1.addEventListener('click', () => {
  // calculate the max possible container height of the "Books to Read" section
  const containerHeight = sumContainerHeight(toRead) * 300 + 'px';

  if (
    collapsible1.style.maxWidth === '1200px' ||
    collapsible1.style.maxWidth === ''
  ) {
    collapsible1.style.maxWidth = '0px';
    setTimeout(() => {
      collapsible1.style.maxHeight = '0px';
    }, 100);
    expColl1.textContent = 'Expand ➕';
  } else {
    collapsible1.style.maxWidth = '1200px';
    setTimeout(() => {
      collapsible1.style.maxHeight = containerHeight;
    }, 10);
    expColl1.textContent = 'Collapse ➖';
  }
});
sectionTitle2.addEventListener('click', () => {
  const containerHeight = sumContainerHeight(currentlyReading) * 300 + 'px';

  if (
    collapsible2.style.maxWidth === '1200px' ||
    collapsible2.style.maxWidth === ''
  ) {
    collapsible2.style.maxWidth = '0px';
    setTimeout(() => {
      collapsible2.style.maxHeight = '0px';
    }, 100);
    expColl2.textContent = 'Expand ➕';
  } else {
    collapsible2.style.maxWidth = '1200px';
    setTimeout(() => {
      collapsible2.style.maxHeight = containerHeight;
    }, 10);
    expColl2.textContent = 'Collapse ➖';
  }
});
sectionTitle3.addEventListener('click', () => {
  const containerHeight = sumContainerHeight(read) * 300 + 'px';

  if (
    collapsible3.style.maxWidth === '1200px' ||
    collapsible3.style.maxWidth === ''
  ) {
    collapsible3.style.maxWidth = '0px';
    setTimeout(() => {
      collapsible3.style.maxHeight = '0px';
    }, 100);
    expColl3.textContent = 'Expand ➕';
  } else {
    collapsible3.style.maxWidth = '1200px';
    setTimeout(() => {
      collapsible3.style.maxHeight = containerHeight;
    }, 10);
    expColl3.textContent = 'Collapse ➖';
  }
});

// load page with sample books to library
const sampleBook1 = new Book(
  'An Enquiry Concerning Human Understanding',
  'David Hume',
  '119',
  'currently reading',
);
myLibrary.push(sampleBook1);
createCard();

const sampleBook2 = new Book(
  'Introduction to Mathematical Philosophy',
  'Bertrand Russell',
  '208',
  'to read',
);
myLibrary.push(sampleBook2);
createCard();

const sampleBook3 = new Book(
  'The Birth of the Clinic: An Archaeology of Medical Perception',
  'Michel Foucault',
  '102400',
  'read',
);
myLibrary.push(sampleBook3);
createCard();

const sampleBook4 = new Book('The Republic', 'Plato', '416', 'read');
myLibrary.push(sampleBook4);
createCard();

const sampleBook5 = new Book(
  'Against Method',
  'Paul Feyerabend',
  '296',
  'read',
);
myLibrary.push(sampleBook5);
createCard();

const sampleBook6 = new Book(
  'The Big Picture: On the Origins of Life, Meaning, and the Universe Itself',
  'Sean Carroll',
  '480',
  'read',
);
myLibrary.push(sampleBook6);
createCard();

const sampleBook7 = new Book(
  'The Big Picture: On the Origins of Life, Meaning, and the Universe Itself',
  'Sean Carroll',
  '480',
  'read',
);
myLibrary.push(sampleBook7);
createCard();

const sampleBook8 = new Book(
  'The Demon-Haunted World: Science as a Candle in the Dark',
  'Carl Sagan',
  '459',
  'read',
);
myLibrary.push(sampleBook8);
createCard();

const sampleBook9 = new Book(
  'Beyond Good and Evil',
  'Friedrich Nietzsche',
  '240',
  'read',
);
myLibrary.push(sampleBook9);
createCard();

const sampleBook10 = new Book(
  'Philosophical Foundations of Neuroscience',
  'M.R. Bennett, P.M. Hacker',
  '480',
  'currently reading',
);
myLibrary.push(sampleBook10);
createCard();

const sampleBook11 = new Book(
  'The Logic of Scientific Discovery',
  'Karl Popper',
  '544',
  'currently reading',
);
myLibrary.push(sampleBook11);
createCard();

const sampleBook12 = new Book(
  'Critique of Pure Reason',
  'Immanuel Kant',
  '785',
  'to read',
);
myLibrary.push(sampleBook12);
createCard();
/*

to-do:
- add javascript validation or turn button into submit button and use event.preventdefault

*/
