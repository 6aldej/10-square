const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let score = 0;



$("#button-start").click(function() {
    firstHitTime = getTimestamp(); 
    $("#welcome").css('display', 'none');  
    $(".game-field").css('display', 'block'); 
    $("#button-reload").show();
    $("#button-start").hide();
   });
    

function handleClick(event) {
  let target = $(event.target);
  
  if (target.hasClass('target')) {
    hits = hits + 1;
    score = score + 1;
    target.text('');
    round();
  }
  else { 
    $(event.target).addClass('miss') 
    score = score - 1;
    
  }
}

function round() {
  
  $('.target').removeClass('target');
  $('.miss').removeClass('miss');


  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);
  console.log(divSelector);

  if (hits === maxHits) { endGame(); }
}


function endGame() {
  $('.game-field').hide();
  $("#button-start").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  
  $("#score").text(score);
    if (score === 10)             {$("#emoji").text('😎') }
    if (score >= 7 && score < 10) {$("#emoji").text('🙂') }
    if (score >= 4 && score <=6)  {$("#emoji").text('😬') }
    if (score >= 1 && score < 4)  {$("#emoji").text('😫') }
    if (score ===0)               {$("#emoji").text('😵') }
    if (score < 0)                {$("#emoji").text('💩') }
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
}



function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
