async function voteClickHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/vote/vote-routes', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
    })
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.vote-btn').addEventListener('click', voteClickHandler);
