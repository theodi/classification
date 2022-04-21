var cards = [];
cards.trainingSet = [];
cards.testSet = [];
cards.evaluationSet = [];

var rCount = 0;
var rDone = [];
var pCount = 0;
var pDone = [];
var maxCount = 20;

/* Page functions */

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}

function startInput() {
    var number = prompt("Evaluation set: Please enter a number between 1 and 242", "1");

    if (number == null || number == "") {
        number = 0;
    }
    processNumber(number);
}
function startInputPurple() {
    var number = prompt("Test set: Please enter a number between 1 and 250", "1");
    if (number == null || number == "") {
        number = 0;
    }
    processNumberPurple(number);
}

function processNumber(val) {
    if (rCount >= maxCount) {
        alert("You have reached your limit of " + maxCount + " cards!");
    }
    if (rDone[val]) {
        alert("You already have that card");
    } else {
        getRedCard(val);
    }
}

function processNumberPurple(val) {
    if (pCount >= maxCount) {
        alert("You have reached your limit of " + maxCount + " cards!");
    }
    if (pDone[val]) {
        alert("You already have that card");
    } else {
        getPurpleCard(val);
    }
}

function selectSet(set) {
    document.getElementById("instructions-set").style.display = "none";
    document.getElementById("instructions-tab").classList.remove("selected");
    document.getElementById("training-set").style.display = "none";
    document.getElementById("training-tab").classList.remove("selected");
    document.getElementById("test-set").style.display = "none";
    document.getElementById("test-tab").classList.remove("selected");
    document.getElementById("evaluation-set").style.display = "none";
    document.getElementById("evaluation-tab").classList.remove("selected");

    document.getElementById(set+"-set").style.display = "block";
    document.getElementById(set+"-tab").classList.add("selected");  
}

window.addEventListener('keydown', function (e) {
    console.log(e.key)
    if ( e.key == "=" ) {
        
        $(".model-button").show();
    }
}, false);

/* Add card functions */

function getBlueCards(group,card) {
    var count = 1;
    var index = 1;
    d3.csv('data/houses.csv', function(data) {
        data.index = index;
        if (data.group == group) {
            cards.trainingSet.push(data);
            renderCard(data,index,'blue');
            count += 1;
        }
        index += 1;
    });
}

function getRedCard(card) {
    var index = 1;
    d3.csv('data/red_cards.csv', function(data) {
        if (index == card && rCount < maxCount) {
            data.city = "?";
            data.index = index;
            cards.evaluationSet.push(data);
            renderRedCard(data,index,'red');
            rCount += 1;
            rDone[index] = true;
            if (rCount == maxCount) {
                $('#fill-reds').hide();
                $('#remove-reds').show();
            }
        }
        index += 1;
    });
}

function getPurpleCard(card) {
    var index = 1;
    d3.csv('data/houses.csv', function(data) {
        if (index == card && pCount < maxCount) {
            data.index = index;
            cards.testSet.push(data);
            renderPurpleCard(data,index,'purple');
            pCount += 1;
            pDone[index] = true;
            if (pCount == maxCount) {
                $('#fill-purples').hide();
                $('#remove-purples').show();
            }
        }
        index += 1;
    });
}

function getRandomReds(count) {
    var i = rCount;
    var min = 1;
    var max = 242;
    var random = [];
    while (i<count) {
        var card = Math.floor((Math.random() * max) + min);
        if (!random[card]) {
            random[card] = true;
            getRedCard(card);
            i++;
        }
    }
}

function getRandomPurples(count) {
    var i = pCount;
    var min = 1;
    var max = 250;
    var random = [];
    while (i<count) {
        var card = Math.floor((Math.random() * max) + min);
        if (!random[card]) {
            random[card] = true;
            getPurpleCard(card);
            i++;
        }
    }
}

/* Remove card functions */

function removeCards(cardset,color) {
    var temp = cardset;
    temp.forEach(function(card,value,index) {
        cardset = removeCard(card.index,cardset,color);
    });
    removeCards(cardset,color);
}

function removeCard(id,cardset,color){
    $('#'+color+id).remove();
    if (color == "r") { 
        rCount = rCount - 1;
        rDone[id] = false;
        $('#remove-reds').hide();
        $('#fill-reds').show();
    }
    if (color == "b") { 
        bCount = bCount - 1;
        bDone[id] = false;
    }
    if (color == "p") { 
        pCount = pCount - 1;
        pDone[id] = false;
        $('#remove-purples').hide();
        $('#fill-purples').show();
    }
    cardset.forEach(function(card,index,object) {
        if (card.index == id) {
            object.splice(index,1);
        }
    });
    return cardset;
}

/* Render card functions */

function renderCard(data,count,color) {
	$('#area').append('<card draggable="true" class="draggable drag-drop" id="b'+count+'"><h1 class="target">'+data.city+'</h1><h1 class="number">#'+count+'</h1><image src="img/house.png"></image><table class="'+color+'"><tr><td class="attribute">Bathrooms</td><td class="value">'+data.bath+'</td></tr><tr><td class="attribute">Bedrooms</td><td class="value">'+data.beds+'</td></tr><tr><td class="attribute">Year built</td><td class="value">'+data.year_built+'</td></tr><tr><td class="attribute">Elevation</td><td class="value">'+formatNumber(data.elevation)+'ft</td></tr><tr><td class="attribute">Square Footage</td><td class="value">'+formatNumber(data.sqft)+'</td></tr><tr><td class="attribute">Price</td><td class="value">$'+formatNumber(data.price)+'</td></tr><tr><td class="attribute">Price per sqft</td><td class="value">$'+formatNumber(data.price_per_sqft)+'</td></tr></table></card>');
}

function renderRedCard(data,count,color) {
    $('#evaluation-set').append('<card id="r'+count+'" class="draggable drag-drop"><h1 class="target">'+data.city+'</h1><h1 class="number">#'+count+'</h1><image src="img/house.png"></image><table class="'+color+'"><tr><td class="attribute">Bathrooms</td><td class="value">'+data.bath+'</td></tr><tr><td class="attribute">Bedrooms</td><td class="value">'+data.beds+'</td></tr><tr><td class="attribute">Year built</td><td class="value">'+data.year_built+'</td></tr><tr><td class="attribute">Elevation</td><td class="value">'+formatNumber(data.elevation)+'ft</td></tr><tr><td class="attribute">Square Footage</td><td class="value">'+formatNumber(data.sqft)+'</td></tr><tr><td class="attribute">Price</td><td class="value">$'+formatNumber(data.price)+'</td></tr><tr><td class="attribute">Price per sqft</td><td class="value">$'+formatNumber(data.price_per_sqft)+'</td></tr></table><div></card>');
}
function renderPurpleCard(data,count,color) {
    $('#test-set').append('<card id="p'+count+'" class="draggable drag-drop"><h1 class="target">'+data.city+'</h1><h1 class="number">#'+count+'</h1><image src="img/house.png"></image><table class="'+color+'"><tr><td class="attribute">Bathrooms</td><td class="value">?????</td></tr><tr><td class="attribute">Bedrooms</td><td class="value">?????</td></tr><tr><td class="attribute">Year built</td><td class="value">?????</td></tr><tr><td class="attribute">Elevation</td><td class="value">?????</td></tr><tr><td class="attribute">Square Footage</td><td class="value">?????</td></tr><tr><td class="attribute">Price</td><td class="value">?????</td></tr><tr><td class="attribute">Price per sqft</td><td class="value">?????</td></tr></table><div></card>');
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

/* Animations */

function moveAnimate(element, newParent){
    //Allow passing in either a jQuery object or selector
    element = $(element);
    newParent= $(newParent);

    var oldOffset = element.offset();
    element.appendTo(newParent);
    var newOffset = element.offset();

    var temp = element.clone().appendTo('body');
    temp.css({
        'position': 'absolute',
        'left': oldOffset.left,
        'top': oldOffset.top,
        'z-index': 1000
    });
    element.hide();
    temp.animate({'top': newOffset.top, 'left': newOffset.left}, 'slow', function(){
       element.show();
       temp.remove();
    });
}

function animateCard(card,color) {
    moveAnimate('#'+color+card.index,'#box_' + card.box);
}

function returnCards(cardset,boxid,color) {
    var interval = 0;
    cardset.forEach(function(card,value,index) {
        $('#'+color+card.index).removeAttr('style');
        setTimeout(function() {
            moveAnimate('#'+color+card.index,'#'+boxid);
        },interval);
        interval += 100;
    });
}

/* Card sorter */

function sortCards(cardset,color) {
    var currentPosition = "";
    var interval = 0;
    cardset.forEach(function(card,value,index) {
        $('#'+color+card.index).removeAttr('style');
        setTimeout(function() { 
            animateCard(sortCard(card,currentPosition),color);
        },interval);
        interval += 800;
    });
}

function sortCard(card,currentPosition) {
    if (currentPosition == "") {
        card.box = "";  
    }

    var factor = $('#factor_'+currentPosition).val();
    var boundary = $('#condition_'+currentPosition+'a').val();
    if (!factor || !boundary) {
        return card;
    }
    if(parseFloat(card[factor]) <= boundary) {
        currentPosition = currentPosition + "l";
        card.box = card.box + "l";
        if (currentPosition.length < 3) {
            return sortCard(card,currentPosition);
        } else {
            return card;
        }
    } else {
        currentPosition = currentPosition + "r";
        card.box = card.box + "r";
        if (currentPosition.length < 3) {
            return sortCard(card,currentPosition);
        } else {
            return card;
        }
    }
}