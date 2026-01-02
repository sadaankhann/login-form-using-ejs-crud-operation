const userExistDiv = document.querySelector('.userExistDiv');
const userAlreadyExistDiv = document.querySelector('.userAlreadyExistDiv');

async function submitForm(e) {
    e.preventDefault();

    let form = e.target;

    const response = await fetch('/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: form.username.value,
            email: form.email.value,
            password: form.password.value,
            confirm_password: form.confirm.value
        })
    });

    form = "";

    const data = await response.json();

    if (!data.success) {
        userExistDiv.classList.remove('hidden')
        setTimeout(() => {
            userExistDiv.classList.add('hidden');
        }, 2000)
    }
    else{
         userAlreadyExistDiv.classList.remove('hidden')
        setTimeout(() => {
            userAlreadyExistDiv.classList.add('hidden');
        }, 2000)
    }
}
