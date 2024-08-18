


let isDragging = false;
let offsetX, offsetY;


const container = document.getElementById('container');

console.log(container.getBoundingClientRect());

container.addEventListener('mousedown', (e) => {

    isDragging = true;

    offsetX = e.clientX - container.getBoundingClientRect().left;
    offsetY = e.clientY - container.getBoundingClientRect().top;

    console.log(`${e.clientX - container.getBoundingClientRect().left}, ${e.clientY - container.getBoundingClientRect().top}`);

});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        container.style.left = e.clientX - offsetX + 'px';
        container.style.top = e.clientY - offsetY + 'px';
    }
});

document.addEventListener('mouseup', (e) => {
    isDragging = false;
    console.log(`${e.clientX - offsetX}, ${e.clientY - offsetY}`);
});
