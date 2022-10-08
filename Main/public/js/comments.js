const commentFormHandler = async function (event) {
	event.preventDefault();

	const commentId = document.querySelector('.new-comment-form').dataset.commentId;

	const commentDesc = document.querySelector('#comment_description').value.trim();

	if (commentDesc) {
		await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({
				commentId,
				commentDesc,
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		document.location.reload();
	}
};

document
	.querySelector('.new-comment-form')
	.addEventListener('submit', commentFormHandler);