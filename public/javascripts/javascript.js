const userExistDiv = document.querySelector('.userExistDiv');
const userAlreadyExistDiv = document.querySelector('.userAlreadyExistDiv');

const profileChanged = document.querySelector('.profileChanged');
const profileNotChanged = document.querySelector('.profileNotChanged');

async function submitForm(e) {
    e.preventDefault();

    let form = e.target;

    const response = await fetch('/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: form.username.value,
            image: form.image.value,
            email: form.email.value,
            password: form.password.value,
            confirm_password: form.confirm_password.value,
        })
    });

    const data = await response.json();
    form.reset();

    if (!data.success) {
        userExistDiv.classList.remove('hidden')
        setTimeout(() => {
            userExistDiv.classList.add('hidden');
        }, 2000)
    }
    else {
        userAlreadyExistDiv.classList.remove('hidden')
        setTimeout(() => {
            userAlreadyExistDiv.classList.add('hidden');
        }, 2000)
    }
}