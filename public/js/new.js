const imgURLInput = document.querySelector('#postImage');
const img = document.querySelector('.img-loaded');
const placeholder = document.querySelector('.img-placeholder')
const imgErrorText = document.querySelector('.img-error-text');

imgURLInput.addEventListener('input', () => {
    img.src = imgURLInput.value;
});

function showErrorMessage() {
    img.classList.add('hidden');
    placeholder.classList.remove('hidden');
    if (!imgURLInput.value) {
        imgErrorText.textContent = '';
    } else {
        imgErrorText.textContent = 'Invalid image URL';
    }
}

function showImage() {
    img.classList.remove('hidden');
    placeholder.classList.add('hidden');
    imgErrorText.textContent = '';
}
