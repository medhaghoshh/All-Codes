document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fileInput = document.getElementById('imageInput');
    const originalImage = document.getElementById('originalImage');
    const sketchImage = document.getElementById('sketchImage');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            originalImage.src = e.target.result;

            // Simulating the sketch effect by converting the image to grayscale
            // This part should be replaced by actual image processing logic
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const img = new Image();
            img.src = e.target.result;

            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // Apply sketch effect
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;
                    data[i + 1] = avg;
                    data[i + 2] = avg;
                }

                ctx.putImageData(imageData, 0, 0);
                sketchImage.src = canvas.toDataURL();
            };
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
});
