const newFormHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#blog-title').value.trim();

	const description = document.querySelector('#comentDesc').value.trim();

	if (title && description) {
		const response = await fetch(`/api/post`, {
			method: 'POST',
			body: JSON.stringify({ title, description }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to create post');
		}
	}
};

const delButtonHandler = async (event) => {
	if (event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');

		const response = await fetch(`/api/post/${id}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to delete post');
		}
	}
};

document
	.querySelector('.new-post-form')
	.addEventListener('submit', newFormHandler);

document
	.querySelector('.post-list')
	.addEventListener('click', delButtonHandler);