

const title = document.querySelector('.input-title > input');
const description = document.querySelector('.input-description > textarea');
const priority = document.querySelector('.input-priority > select');
const dueTime = document.querySelector('#due-time');
const tag = document.querySelector('.input-tag > input');


// creating an event listener for the add button to add a new card 
// to the cards array and display it on the page
document.querySelector('.add-btn').addEventListener('click', () => {
    addCard();
})



// the cards array to hold the todo cards
const cards = [
    {
        priority: 'High',
        status: 'pending',
        title: 'Read Lupin Book',
        description: 'Read the book and write a review about it',
        timeRemaining: '2 days, 5 hours and 30 minutes',
        dueTime: '2026-06-30 10:00:00',
        tag: 'leisure',
        id: crypto.randomUUID()

    }

]



// add Todo card to the cards array 
// and display it on the page
function addCard() {

    if (priority.value && title.value && description.value && dueTime.value && tag.value) {

        cards.push({
            priority: priority.value,
            status: 'pending',
            title: title.value,
            description: description.value,
            timeRemaining: getRemainingTime(),
            dueTime: getDueTime(),
            tag: tag.value,
            id: crypto.randomUUID()
        });

        priority.value = '';
        title.value = '';
        description.value = '';
        dueTime.value = '';
        tag.value = '';

    }

    else {
        alert('Please fill in all fields');
    }

    displayCards();

}


// inputted due time converted to a date object(milliseconds)
function getDueTime() {

    const dueTimeValue = dayjs(dueTime.value);
    return dueTimeValue.format('YYYY-MM-DD HH:mm:ss');
}


// getting the remaining time until the due time 
// and converting it to days, hours, minutes and seconds


function getRemainingTime(givenDueTime) {

    const dueTimeValue = dayjs(givenDueTime);

    const now = dayjs();

    const timeDiff = dueTimeValue.diff(now);

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    const timeRemaining = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    return timeRemaining;
}

function updateRemainingTime() {

    cards.forEach((card) => {
        const timeRemainingcontainer = document.querySelector(`.time-remaining-${card.id}`);
        
        if (timeRemainingcontainer) {
            const newTimeRemaining = getRemainingTime(card.dueTime);
            timeRemainingcontainer.textContent = `Due ${newTimeRemaining}`;
            
        }
    })  

}

setInterval(updateRemainingTime, 1000);



// function to display the cards on the page by looping through
// the cards array and creating a card for each todo card
function displayCards() {

    let cardHtml = '';
    cards.forEach((card) => {

        cardHtml += `
          <section data-testid="test-todo-card" role="region" class="cards">

                <div class="card-layer-one">
                    <span data-testid="test-todo-priority" aria-label="Card priority" class="card-priority">
                        <img class="icons" src="./images/${card.priority}-priority-icon.svg" alt=""> ${card.priority} Priority
                    </span>
                    <span data-testid="test-todo-status" aria-label="Card status" class="card-status js-card-status-${card.id}">
                        Status: <img class="icons" src="./images/pending-icon.svg" alt=""> Pending
                    </span>
                </div>

                <h3 class="card-title-${card.id}" data-testid="test-todo-title">${card.title}</h3>

                <p data-testid="test-todo-description">${card.description}</p>

                <div class="time-container">

                    <time data-testid="test-todo-time-remaining" aria-live="polite" class="time-remaining-${card.id}" datetime="${card.timeRemaining}">
                        Due ${card.timeRemaining}
                    </time>

                    <time data-testid="test-todo-due-date" datetime="${card.dueTime}">
                        Time: ${card.dueTime}
                    </time>
                </div>
                <div class="card-layer-three">
                    <div data-testid="test-todo-complete-toggle" class="switch-container">
                        Completed:
                        <label class="switch">
                            <input type="checkbox" class="checkbox js-toggle toggle-${card.id}" data-id="${card.id}" aria-label="Toggle complete">
                            <span class="slider"></span>
                        </label>

                    </div>
                    <div>
                        <div data-testid="test-todo-tags" role="list" class="tag-container">
                            <img class="icons" src="./images/tag-icon.svg" alt="">Tag: ${card.tag}
                        </div>
                    </div>
                </div>

                <div class="card-layer-four">
                    <button data-testid="test-todo-edit-button" aria-label="Edit card" data-id="${card.id}" class="edit js-edit">
                        <img class="icons" src="./images/edit-icon.svg" alt="">Edit
                    </button>
                    <button data-testid="test-todo-delete-button" aria-label="Delete card" data-id="${card.id}" class="delete js-delete">
                        <img class="icons" src="./images/delete-icon.svg" alt="">Delete
                    </button>
                </div>

            </section>
       `
    })

    const cardContainer = document.querySelector('.card-container').innerHTML = cardHtml;

}

// running the function to display the cards on page load
displayCards();


// delete buttons event listeners to delete a card from the 
// cards array and remove it from the page
document.querySelectorAll('.js-delete')
    .forEach((button) => {


        button.addEventListener('click', () => {
            console.log('delete card');
        });
    })


// edit buttons event listeners to edit a card from the
document.querySelectorAll('.js-edit')
    .forEach((button) => {

        button.addEventListener('click', () => {
            console.log('edit card');

        });
    })

// toggle buttons event listeners to toggle the complete
//  status of a card and update the status on the page
document.querySelectorAll('.js-toggle')
    .forEach((button) => {

        const cardId = button.dataset.id;

        button.addEventListener('click', () => {
            const isChecked = document.querySelector(`.toggle-${cardId}`).checked;
            const statusElement = document.querySelector(`.js-card-status-${cardId}`);
            const titleElement = document.querySelector(`.card-title-${cardId}`);

            if (isChecked) {
                statusElement.innerHTML = 'Status: <img class="icons" src="./images/done-icon.svg" alt=""> Done';
                titleElement.style.textDecoration = 'line-through';
            }
            else {
                statusElement.innerHTML = 'Status: <img class="icons" src="./images/pending-icon.svg" alt=""> Pending';
                titleElement.style.textDecoration = 'none';
            }
        });
    })


//  all keyboard functions 
document.addEventListener('keydown', (e) => {

    switch (e.key) {
        case 'Enter':
            addCard();
            break;

        default:
            break;
    }

})







