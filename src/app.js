const $form = document.querySelector('[data-form]');

$form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData($form);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/data', true);

    //Send the proper header information along with the request
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            const response = JSON.parse(this.responseText)
            console.log('xhr.onreadystatechange -> response', response);
            appendResult(response);
        }
    }
    const data = {term: $form.querySelector('[data-term]').value};
    console.log('data', data);
    xhr.send(JSON.stringify(data));
});

/**
 *
 * @param {array} result
 */
const appendResult = (result) => {
    const $container = document.querySelector('[data-results="content"]');
    $container.innerHTML = '';
    result.forEach((user) => {
        const $row = document.createElement('TR');
        const objectKeys = Object.keys(user);
        objectKeys.forEach(key => {
            $row.innerHTML =  $row.innerHTML + `<td>${user[key]}</td>`;
        });
        $container.appendChild($row);
    });
};