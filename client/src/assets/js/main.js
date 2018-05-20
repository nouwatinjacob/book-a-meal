const myInput = document.querySelector('#myInput');
const myList = document.querySelector('#myList');
const addButton = document.querySelector('#add-btn');
const myErrorMessage = document.querySelector('.error');
addButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Am here');
  addToList();
});

addToList = () => {
  // create list item, append input value, append to list
  const listItem = document.createElement('p');
  const inputArray = ['Fried Rice'];
  if (inputArray.includes(myInput.value) && inputArray.length !== '') {
    myErrorMessage.append('You have picked this meal');
  } else if (myInput.value === '1') {
    myErrorMessage.append('You need to pick a meal');
  } else {
    inputArray.push(myInput.value);
    listItem.append(myInput.value);
    myList.append(listItem);
    // clear input
    myInput.value = '1';
  }
};
