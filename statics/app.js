const $timer = $(".timer");
const $form = $(".add-word");

let time;
let id;
let words;
let score;

$('.add-word').hide();

function handleSubmit(evt) {
    evt.preventDefault();
    button = evt.target;
    let word = $('.word').val().toLowerCase();

    if (!words.has(word)){
        words.add(word);
        postWord(word);
    } else $(".messages").text(`Word "${word}" already played.`)
}

function startGame() {
    $('.new-game').hide();
    $('.add-word').show();
    time = 60;
    score = 0;
    words = new Set();
    startTimer();
}

function endGame(){
    $(".add-word").hide();
    $('.messages').text(`Your Score: ${score}`);
    $('.new-game').show();

    postScore(score);
}

function startTimer(){
    id = setInterval(function() {
    time -= 1;
    
    $('.timer').text(time + 's');
    if (time === 0) {
        endTimer();
    }
}, 1000);} //wrap in a function

function endTimer() {
    $('.timer').text('TIME UP!!!')
        clearInterval(id);
        endGame();
};

async function postWord(word) {
    $('.messages').text('');

    let response = await axios.post("/check-word", {word});
    console.log()
    $('.messages').text(response.data.result);
    if (response.data.result === 'ok') {
        score += word.length;

        $('ul').append(`<li>${word}</li>`);
    }
}

$form.on('submit', handleSubmit);

$('.new-game').on('click', startGame);

async function postScore(score) {
    
    let response = await axios.post('/update-score', {score}); 
    console.log('done', response)

}

