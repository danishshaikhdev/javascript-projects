


const text = ['World', 'JavaScript'];
let currTextIndex = 0;
let currLetter = 0;

const heading = document.querySelector('h2');


const updateText = () => {
    heading.innerHTML = `Hello ${text[currTextIndex].slice(0, currLetter)}`;
    currLetter++;
    if(currLetter === text[currTextIndex].length) {
        currTextIndex++;
        currLetter = 0;
    }

    if(currTextIndex === text.length) {
        currTextIndex = 0;
    }
    console.log(text.length);
    setTimeout(updateText, 250);
}

updateText();