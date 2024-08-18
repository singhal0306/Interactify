document.addEventListener('DOMContentLoaded', function () {
    const dropArea = document.getElementById('drop-area');
    const inputFile = document.getElementById('input-image');
    const imageView = document.getElementById('img-view');

    function uploadImage() {
        if (inputFile.files.length > 0) {
            let imgLink = URL.createObjectURL(inputFile.files[0]);
            console.log('Image URL:', imgLink);
    
            imageView.style.backgroundImage = `url(${imgLink})`;
            imageView.textContent = "";
            imageView.style.border = 0;
        }
    }

    inputFile.addEventListener("change", uploadImage);
});