async function voteClickHandler(event) {
    event.preventDefault();

    console.log('button clicked');
}

document.querySelector('.vote-btn').addEventListener('click', voteClickHandler);
