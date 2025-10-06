const SIZE = 150;
let labels = [];

fetch('./label.txt')
    .then(r => r.text())
    .then(t => labels = t.trim().split(/\r?\n/));

document.getElementById('fileInput').addEventListener('change', async e => {
            const file = e.target.files[0];
            if (!file || !model) return;
            const img = document.getElementById('preview');
            const card = img.closest('.card');

            img.src = URL.createObjectURL(file);
            img.onload = () => {
                img.classList.add('visible');
                card.classList.add('has-image');
            };

            await img.decode();

            const x = tf.tidy(() =>
                tf.browser.fromPixels(img)
                .resizeBilinear([SIZE, SIZE])
                .toFloat()
                .div(255)
                .expandDims(0)
            );

            const y = model.execute(x);
            const p = await y.data();
            tf.dispose([x, y]);

            const top = Array.from(p)
                .map((v, i) => ({ i, v }))
                .sort((a, b) => b.v - a.v)
                .slice(0, 5)
                .map(({ i, v }) => `${labels[i] ?? `class_${i}`}: ${v.toFixed(4)}`)
    .join('\n');

  document.getElementById('result').textContent = top;
});