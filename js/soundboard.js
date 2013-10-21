$(function(){

window.AudioContext = window.AudioContext || window.webkitAudioContext;
if(AudioContext){
  var context = new AudioContext();
  var bufferLoader;

  var currentSound;
}

var prevCards = [];

var hundred_important = [
	["的","dik1","Of"],["一","jat1","A"],["是","si6","Be"],["不","bat1","Not"],["了","liu5","The"],
	["在","zoi6","In"],["人","jan4","People"],["有","jau5 jau6","Have"],["我","ngo5","I"],
	["他","taa1 to1","He"],["這","ze2 ze3 ze5","This"],["個","go3","A"],["們","mun4","They"],
	["中","zung1 zung3","In"],["來","lai4 loi4 loi6","Come"],["上","soeng5 soeng6","On"],
	["大","daai6","Large"],["為","wai4 wai6","To"],["和","wo4 wo6","And"],["國","gwok3","Country"],
	["地","dei6 deng6","Ground"],["到","dou3","To"],["以","ji5","With"],
	["說","jyut6 seoi3 syut3","Say"],["時","si4","Time"],["要","jiu1 jiu3","Wish"],
	["就","zau6","On"],["出","ceot1","Out"],["會","kui2 wui5 wui6","Can"],["可","ho2","Can"],
	["也","jaa5","Also"],["你","nei5","You"],["對","deoi3","To"],["生","saang1 sang1","Raw"],
	["能","nang4","Can"],["而","ji4","And"],["子","zi2","Child"],
	["那","naa5 naa6 no1 no4 no5 no6","That"],["得","dak1","Get"],["於","jyu1 wu1","At"],
	["著","zoek3 zoek6 zyu3","With"],["下","haa5 haa6","Next"],["自","zi","From"],
	["之","zi1","The"],["年","nin4","Years"],["過","gwo1 gwo3","Cross"],["發","faat3","Hair"],
	["後","hau6","After"],["作","zok3","Make"],["裡","lei5","In"],["用","jung6","Use"],
	["道","dou3 dou6","Road"],["行","haang4 hang4 hang6 hong4","Row"],["所","so2","The"],
	["然","jin4","However"],["家","gaa1 gu1","Home"],["種","zung2 zung3","Seed"],
	["事","si6","Thing"],["成","cing4 seng4 sing4","Become"],["方","fong1","Square"],
	["多","do1","Multi-"],["經","ging1","After"],["麼","maa1 mo1","What"],
	["去","heoi2 heoi3","Go"],["法","faat3","Law"],["學","hok6","Learn"],["如","jyu4","As"],
	["都","dou1","Both"],["同","tung4","With"],["現","jin6","Present"],
	["當","dong1 dong3","When the"],["沒","mut6","Not"],["動","dung6","Move"],
	["面","min6","Surface"],["起","hei2","Start"],["看","hon1 hon3","Look"],
	["定","deng6 ding6","Fixed"],["天","tin1","Day"],["分","fan1 fan6","Minute"],
	["還","syun4 waan4","Also"],["進","zeon3","Enter"],["好","hou2 hou3","Good"],
	["小","siu2","Small"],["部","bou6","Department"],["其","gei1 kei4","Its"],["些","se1","Some"],
	["主","zyu2","Main"],["樣","joeng6","Sample"],["理","lei5","Reason"],["心","sam1","Heart"],
	["她","ji1 taa1","She"],["本","bun2","This"],["前","cin4","Ago"],["開","hoi1","Open"],
	["但","daan6","But"],["因","jan1","Because"],["只","zek3 zi2","Only"],
	["從","cung4 sung1 zung6","From"],["想","soeng2","Want"],["實","sat6","Real"]
];
var easy_set = [
	["一","jat1","A"],["不","bat1","Not"],["了","liu5","The"],["人","jan4","People"],["我","ngo5","I"],
	["他","taa1 to1","He"],["個","go3","A"],["們","mun4","They"],["中","zung1 zung3","In"],["上","soeng5 soeng6","On"],
	["大","daai6","Large"],["國","gwok3","Country"],["要","jiu1 jiu3","Wish"],["出","ceot1","Out"],["可","ho2","Can"],
	["也","jaa5","Also"],["生","saang1 sang1","Raw"],["而","ji4","And"],["子","zi2","Child"],["下","haa5 haa6","Next"],
	["自","zi","From"],["之","zi1","The"],["年","nin4","Years"],["發","faat3","Hair"],["用","jung6","Use"],
	["事","si6","Thing"],["方","fong1","Square"],["多","do1","Multi-"],["學","hok6","Learn"],["如","jyu4","As"],
	["都","dou1","Both"],["同","tung4","With"],["面","min6","Surface"],["天","tin1","Day"],["好","hou2 hou3","Good"],
	["小","siu2","Small"],["主","zyu2","Main"],["心","sam1","Heart"],["本","bun2","This"],["開","hoi1","Open"],
	["因","jan1","Because"],["只","zek3 zi2","Only"]
];
var very_easy_set = [
	["一","jat1","A"],["不","bat1","Not"],["了","liu5","The"],["人","jan4","People"],
	["中","zung1 zung3","In"],["上","soeng5 soeng6","On"],
	["大","daai6","Large"],["國","gwok3","Country"],["出","ceot1","Out"],
	["也","jaa5","Also"],["生","saang1 sang1","Raw"],["而","ji4","And"],["子","zi2","Child"],["下","haa5 haa6","Next"],
	["自","zi","From"],["之","zi1","The"],["年","nin4","Years"],["用","jung6","Use"],
	["方","fong1","Square"],["多","do1","Multi-"],
	["同","tung4","With"],["面","min6","Surface"],["天","tin1","Day"],
	["小","siu2","Small"],["主","zyu2","Main"],["心","sam1","Heart"],["本","bun2","This"],["開","hoi1","Open"],
	["因","jan1","Because"],["只","zek3 zi2","Only"]
];
var current_set = very_easy_set;

var btns = $('.btn');
var soundboardBtn = $(btns.get(0));
var testBtn = $(btns.get(1));
var typeBtn = $(btns.get(2));

var soundboardDiv = $('.soundboard').show();
var testDiv = $('.cards');
var typeDiv = $('.form-jyutping');

var correctAnswer;
var score = 0;
var answered = 0;

soundboardBtn.on('click', function(){
  btns.parent().removeClass('active');
  soundboardDiv.show();
  soundboardBtn.parent().addClass('active');
  testDiv.hide();
  typeDiv.hide();
});
testBtn.on('click', function(){
  btns.parent().removeClass('active');
  soundboardDiv.hide();
  testDiv.show();
  testBtn.parent().addClass('active');
  typeDiv.hide();

  // setInterval(function(){
  //   setTimeout(flipCard, 300);
  //   setTimeout(flipCard, 1000);
  //   setTimeout(flipCard, 1800);
  //   setTimeout(flipCard, 2100);
  //   setTimeout(flipCard, 2400);
  //   setTimeout(nextCard, 3000);
  // }, 3000);
  nextCard();
});
typeBtn.on('click', function(){
  btns.parent().removeClass('active');
  soundboardDiv.hide();
  testDiv.hide();
  typeDiv.show();
  typeBtn.parent().addClass('active');
});

typeDiv.find(".btn").on("click", function(e){
  var text = typeDiv.find("input").val();
  playJyutping(text);
});

for(var i = 0; i < current_set.length; i++){
  var word = current_set[i],
      card = $('<div class="card">'
          +'<div class="side-a">'
            +'<p class="chinese">'+word[0]+'</p>'
          +'</div>'
          +'<div class="side-b">'
            +'<p class="english">'+word[2]+'</p>'
            +'<p class="jyutping">'+word[1]+'</p>'
          +'</div>'
        +'</div>'),
      sound = word[1].split(" ")[0];
  card.on('mousedown', (function(sound, card){
    return function(){
      card.addClass('card-flipped');
      var bufferLoader = new BufferLoader(context, ["sounds/jyutping-wong/"+sound+".wav"], function(bufferList){
        playSound(bufferList[0]);
      });
      bufferLoader.load();
    };
  }(sound, card)));
  card.on("mouseup mouseout", (function(card){
    return function(){
     card.removeClass("card-flipped");
    };
  }(card)));
  soundboardDiv.append(card);
}

var buttons = $('.cards button');
var nextButton = $(buttons[0]);
nextButton.on('click', function(e){
  nextCard();
});
var answerButtons = [
  $(buttons[0]),
  $(buttons[1]),
  $(buttons[2]),
  $(buttons[3])
  ];
function answerTestCard(answer){
  if(correctAnswer == answer){
    incrementScore();
    nextCard();
  }
  else {
    flipCard();
  }
  incrementTotalAnswered();
 }
answerButtons[0].on('click', function(e){
  answerTestCard(0);
});
answerButtons[1].on('click', function(e){
  answerTestCard(1);
});
answerButtons[2].on('click', function(e){
  answerTestCard(2);
});
answerButtons[3].on('click', function(e){
  answerTestCard(3);
});

function incrementScore(){
  score++;
  $('#score').text(score);
}
function incrementTotalAnswered(){
  answered++;
  $('#answered').text(answered + " " + ((score / answered)*100).toFixed(0) + "%");
}

$('.cards').on('click', '.card', function(e){
  var card = $(e.currentTarget);
  card.toggleClass('card-flipped');
  playSound(currentSound);
});
var startTime;
$(document).on('keydown', function(e){
  var time = Date.now();
  if(e.keyCode == 37){
    prevCard();
    e.preventDefault();
    return;
  }
  if(e.keyCode == 39){
    if(startTime > 0){
      console.log(time - startTime);
    }
    startTime = time;
    nextCard();
    e.preventDefault();
    return;
  }
  if(e.keyCode == 38 || e.keyCode == 40){
    if(startTime > 0){
      console.log(time - startTime);
    }
    flipCard();
    e.preventDefault();
    return;
  }
  if(e.keyCode == 49){
      answerTestCard(0);
      return;
  }
  if(e.keyCode == 50){
      answerTestCard(1);
      return;
  }
  if(e.keyCode == 51){
      answerTestCard(2);
      return;
  }
  if(e.keyCode == 52){
      answerTestCard(3);
      return;
  }
});

function playSound(sound) {
  if(context){
    var source = context.createBufferSource();
    source.buffer = sound;

    source.connect(context.destination);
    source.start(0);
  }
}

function flipCard(){
  var card = $('.card-current');
  card.toggleClass('card-flipped');
  playSound(currentSound);
}
/**
 * Random Exclusive
 *
 * Generate a random integer from 0 - n, exluding i
 */
function randEx(n, i){
	var rand = Math.floor(Math.random()*n);
	if(rand == i)
		return randEx(n, i);
	return rand;
}

function nextCard(){
  var prevCard = $('.card-prev');
  var currentCard = $('.card-current');
  var nextCard = $('.card-next'),
	  WC = current_set.length,
      index = randEx(WC),
      word = current_set[index],
      index1 = randEx(WC, index),
      index2 = randEx(WC, index),
      index3 = randEx(WC, index),
      answers = [
        current_set[index1],
        current_set[index2],
        current_set[index3],
      ];
  correctAnswer = Math.floor(Math.random()*4);

  prevCard.hide()
          .removeClass('card-prev')
          .addClass('card-next');
  setTimeout(function(){prevCard.show();},1000);

  currentCard.removeClass('card-current')
             .removeClass('card-flipped')
             .addClass('card-prev')
             .show();


  prevCards.push(index);
  nextCard.find('.chinese').text(word[0]);
  nextCard.find('.english').text(word[2]);
  nextCard.find('.jyutping').text(word[1]);
  nextCard.removeClass('card-next')
          .addClass('card-current')
          .show();

  var sound = word[1].split(" ")[0];
  var bufferLoader = new BufferLoader(context, ["sounds/jyutping-wong/"+sound+".wav"], function(bufferList){
    currentSound = bufferList[0];
  });
  bufferLoader.load();

  for(var i = 0; i < 4; i++){
    if(correctAnswer == i){
      answerButtons[i].text(word[2]);
    }
    else {
      answerButtons[i].text(answers[i>correctAnswer?i-1:i][2]);
    }
  }
}

function prevCard(){
  var prevCard = $('.card-prev');
  var currentCard = $('.card-current');
  var nextCard = $('.card-next');


  if(prevCards.length > 1){

    prevCard.removeClass('card-prev')
            .addClass('card-current');

    currentCard.removeClass('card-current')
               .removeClass('card-flipped')
               .addClass('card-next')
               .show();
    
    nextCard.hide()
            .removeClass('card-next')
            .addClass('card-prev');
    setTimeout(function(){nextCard.show();},1000);

    var index = prevCards.pop(),
        word = current_set[index];
  }


  if(prevCards.length > 1){
    index = prevCards.pop();
    word = current_set[index];

    nextCard.find('.chinese').text(word[0]);
    nextCard.find('.english').text(word[2]);
    nextCard.find('.jyutping').text(word[1]);

    var sound = word[1].split(" ")[0];
    var bufferLoader = new BufferLoader(context, ["sounds/jyutping-wong/"+sound+".wav"], function(bufferList){
      currentSound = bufferList[0];
    });
    bufferLoader.load();

  }
}
function playJyutping(text){
  var words = text.split(" "),
      paths = [],
      bufferLoader,
      i,
      source = [];
  for (i = words.length - 1; i >= 0; i--) {
    paths[i] = "sounds/jyutping-wong/"+words[i]+".wav";
  };
  // var paths = _.map(words, function(t){return "sounds/jyutping-wong/"+t+".wav"});
  bufferLoader = new BufferLoader(context, paths, function(bufferList){
    for (i = bufferList.length - 1; i >= 0; i--) {
      source[i] = context.createBufferSource();
      source[i].buffer = bufferList[i];
      source[i].connect(context.destination);
      source[i].start(i*0.3);
    };
  });
  bufferLoader.load();
}


});