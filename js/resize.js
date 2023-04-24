var sidenav_scrollOnLoad;

setTimeout(function(){ // "no" delay to allow website to load (it works?)
  sidenav_scrollOnLoad = document.documentElement.scrollTop
},0)

document.getElementById("menu_button").addEventListener("click", switch_menu_state);

function resize_sequence(){
  scroll_function();
  resize_topnav();
  resize_books();
  resize_sidenav();

  setTimeout(() => {  resize_books(); }, 200); // helps to stay current with resizing: resizes after .2 sec
  resize_sidenav();

	if(document.getElementsByClassName("book_format").length > 0 && (parseFloat((document.getElementsByClassName("book_format")[0].style.width))+marginWidth*2+borderWidth*2+1)*Math.floor(book_div.offsetWidth/document.getElementsByClassName("book_format")[0].offsetWidth) <= book_div.offsetWidth+0.002){
		// second check
	  setTimeout(() => {  resize_sequence(); }, 1); // redue sequence
  }

  if(document.getElementsByClassName("topnav_text_links").length > 0 && document.getElementsByClassName("topnav_text_links")[0].offsetHeight != parseInt(document.getElementById("topnav").style.height)){
    setTimeout(function(){
      resize_sequence();
    },1);
  }
  // setTimeout(() => {  resize_books(); }, 500); // account for animation time
}

function switch_menu_state() {
  resize_sequence();

  if(screenWidth <= 687){ // set sidenav screen size class
		document.getElementById("sidenav").className = "sidenav_smallScreen";
	}
	else{
		document.getElementById("sidenav").className = "sidenav_largeScreen";
	}

	if(sidenav_openStatus == 0){ // opening sidenav

		if(document.getElementById("sidenav").className == "sidenav_largeScreen"){
			sidenav_openStatus = 2; // reset to "untouched"

			if(screenWidth <= 700){
				document.getElementById("sidenav").style.width = "40vw";
			}
			else if (screenWidth <= 940){
				document.getElementById("sidenav").style.width = "30vw";
			}
			else{
				document.getElementById("sidenav").style.width = "20vw";
			}
		}
		else{ // open with small screen
			sidenav_openStatus = 1;
			document.getElementById("sidenav").style.width = "100vw";
		}

		document.getElementById("menu_button").className = "menu_button_open";
		sidenav_padding = 20*screenWidth/100 + 5; //20vw

	}
	else if(sidenav_openStatus == 1){ // close sidenav
		if(document.getElementById("sidenav").className == "sidenav_smallScreen"){
			sidenav_openStatus = 2;
		}
		else{
			sidenav_openStatus = 0;
		}

		document.getElementById("sidenav").style.width = "0vw";
		document.getElementById("menu_button").className = "menu_button_closed";
		sidenav_padding = 5;
	}
	else{ // not manually set yet
		if(document.getElementById("sidenav").className == "sidenav_smallScreen"){
			sidenav_openStatus = 1; // open with small screen

			document.getElementById("sidenav").style.width = "100vw";
			document.getElementById("menu_button").className = "menu_button_open";
			sidenav_padding = screenWidth/5 + 5;
		}
		else{ // close with large screen
			sidenav_openStatus = 0;

			document.getElementById("sidenav").style.width = "0vw";
			document.getElementById("menu_button").className = "menu_button_closed";
			sidenav_padding = 5;
		}
	}


	document.getElementById("book_div_position").style.paddingLeft = parseInt(sidenav_padding) + "px";
}

function resize_sidenav(){
	if(screenWidth <= 687){ // set sidenav screen size class
		document.getElementById("sidenav").className = "sidenav_smallScreen";
	}
	else{
		document.getElementById("sidenav").className = "sidenav_largeScreen";
	}


	// set sidenav width
	if(document.getElementById("sidenav").className == "sidenav_smallScreen"){ // small screen
		if(sidenav_openStatus == 1){ // if sidenav was manually opened
			document.getElementById("sidenav").style.width = "100vw";
		}
		else{ // sidenav was manually closed or not touched
			document.getElementById("sidenav").style.width = "0vw";
		}
	}
	else{ // large screen
		if(sidenav_openStatus == 0){ // if sidenav was manually closed
			document.getElementById("sidenav").style.width = "0vw";
		}
		else{ // sidenav was manually opened or not touched
			if(screenWidth <= 700){
				document.getElementById("sidenav").style.width = "40vw";
			}
			else if (screenWidth <= 1025){
				document.getElementById("sidenav").style.width = "30vw";
			}
			else{
				document.getElementById("sidenav").style.width = "20vw";
			}
		}
	}

  // set sidenav text height
  document.getElementsByClassName("sidenav-text")[0].style.height = document.getElementById("buttons").offsetHeight + document.getElementById("tag_dictionary_open").offsetHeight + 150 + "px";

  document.getElementsByClassName("tagDictionary")[0].style.width = 0.9*screenWidth-(document.getElementById("sidenav").offsetWidth) + "px"
  document.getElementsByClassName("tagDictionary")[0].style.left = 0.05*screenWidth+(document.getElementById("sidenav").offsetWidth) + "px"
  document.getElementsByClassName("tagDictionary")[0].style.top = 0.05*screenWidth+(document.getElementById("topnav").offsetHeight) + "px"
  document.getElementsByClassName("tagDictionary")[0].style.height = window.innerHeight-(document.getElementById("topnav").offsetHeight) - 0.1*screenWidth+ "px"

  document.getElementsByClassName("tagDictionaryClose")[0].style.top = 0.05*screenWidth+(document.getElementById("topnav").offsetHeight) + "px"
  document.getElementsByClassName("tagDictionaryClose")[0].style.right = screenWidth - document.getElementsByClassName("tagDictionary")[0].offsetWidth - document.getElementsByClassName("tagDictionary")[0].offsetLeft + "px"

}

function resize_books(){
	if(screenWidth <= 940){
		book_width_minimum = 350;
	}
	else{
		book_width_minimum = 400;
	}

	sidenav_padding = sidenav.offsetWidth;
	topnav_padding = topnav.offsetHeight;
	book_padding = book_width_minimum - borderWidth*2 - marginWidth*2 - 1 + fit_window(); // book_width_minimum minus border widths minus margin minus one

	document.getElementById("book_div_position").style.paddingLeft = parseInt(sidenav_padding) + "px";
	document.getElementById("book_div_position").style.paddingTop = parseInt(topnav_padding) + "px";

	for(let i=0; i<document.getElementsByClassName("book_format").length; i++){

    let ebookTop = book_padding*0.072 + 6;
    let audiobookTop = book_padding*0.144 + 6;

    // resize links based on avaliablility
    if(libraryBibnumbers[pageNumber*books_per_page+i][0] == undefined || libraryBibnumbers[pageNumber*books_per_page+i][0] == 0){ // book is gone, move up ebook and audiobook
      document.getElementsByClassName("bookLink")[i].style.display = "none";
      ebookTop -= book_padding*0.072;
      audiobookTop -= book_padding*0.072;
    }
    if(libraryBibnumbers[pageNumber*books_per_page+i][1] == undefined || libraryBibnumbers[pageNumber*books_per_page+i][1] == 0){ // ebook is gone, move up audiobook
      document.getElementsByClassName("ebookLink")[i].style.display = "none";
      audiobookTop -= book_padding*0.072;
    }
    if(libraryBibnumbers[pageNumber*books_per_page+i][2] == undefined || libraryBibnumbers[pageNumber*books_per_page+i][2] == 0){ // audiobook is gone
      document.getElementsByClassName("audiobookLink")[i].style.display = "none";
    }

		document.getElementsByClassName("book_format")[i].style.width = book_padding + "px";
		document.getElementsByClassName("book_format")[i].style.height = book_padding*book_height_ratio + "px";

    if(document.getElementsByClassName("bookLink")[i] != undefined && document.getElementsByClassName("bookLink")[i].style.display != "none"){
      document.getElementsByClassName("bookLink")[i].style.width = book_padding*0.07 + "px";
      document.getElementsByClassName("bookLink")[i].style.height = book_padding*0.07 + "px";
      document.getElementsByClassName("bookLink")[i].style.left = (document.getElementsByClassName("book_img")[0].style.width - book_padding*0.071 - 7)+ "px";
      document.getElementsByClassName("bookLink")[i].style.top = "6px";
    }

    if(document.getElementsByClassName("ebookLink")[i] != undefined && document.getElementsByClassName("ebookLink")[i].style.display != "none"){
      document.getElementsByClassName("ebookLink")[i].style.width = book_padding*0.07 + "px";
      document.getElementsByClassName("ebookLink")[i].style.height = book_padding*0.07 + "px";
      document.getElementsByClassName("ebookLink")[i].style.left = (document.getElementsByClassName("book_img")[0].style.width - book_padding*0.071 - 7)+ "px";
      document.getElementsByClassName("ebookLink")[i].style.top = ebookTop + "px";
    }

    if(document.getElementsByClassName("audiobookLink")[i] != undefined && document.getElementsByClassName("audiobookLink")[i].style.display != "none"){
      document.getElementsByClassName("audiobookLink")[i].style.width = book_padding*0.07 + "px";
      document.getElementsByClassName("audiobookLink")[i].style.height = book_padding*0.07 + "px";
      document.getElementsByClassName("audiobookLink")[i].style.left = (document.getElementsByClassName("book_img")[0].style.width - book_padding*0.071 - 7)+ "px";
      document.getElementsByClassName("audiobookLink")[i].style.top = audiobookTop + "px";
    }
	}

}

function fit_window(){
  var extra_width = document.getElementById("book_div").offsetWidth % book_width_minimum;
  var additional_book_width = extra_width/Math.floor(document.getElementById("book_div").offsetWidth/book_width_minimum); // extra width divided amongst the number of books
  var additional_sidebar_width;

  return additional_book_width;
  while (additional_book_width > 50) {
    additional_sidebar_width = additional_book_width - 50;
    additional_sidebar_width *= Math.floor(document.getElementById("book_div")/book_width_minimum);
  }
}

function sidenav_scroll(){
  let sidenav_width;

  let scrollFromOnLoad = 0;
  if(document.documentElement.scrollTop >= sidenav_scrollOnLoad){
    scrollFromOnLoad = document.documentElement.scrollTop - sidenav_scrollOnLoad;
  }
  else{
    scrollFromOnLoad = 0;
    sidenav_scrollOnLoad = document.documentElement.scrollTop;
  }

  if(screenWidth <= 700 && sidenav_openStatus != 0){
    sidenav_width = screenWidth*0.4;
  }
  else if (screenWidth <= 940 && sidenav_openStatus != 0){
    sidenav_width = screenWidth*0.3;
  }
  else if (sidenav_openStatus != 0){
    sidenav_width = screenWidth*0.2;
  }

  if(scrollFromOnLoad >= 200){
    if(screenWidth <= 700 && sidenav_openStatus == 2){
      sidenav_width = screenWidth*0.4-((scrollFromOnLoad-200)*2);
    }
    else if (screenWidth <= 940 && sidenav_openStatus == 2){
      sidenav_width = screenWidth*0.3-((scrollFromOnLoad-200)*2);
    }
    else if (sidenav_openStatus == 2){
      sidenav_width = screenWidth*0.2-((scrollFromOnLoad-200)*2);
    }
  }

  if(sidenav_width <= 0){
    sidenav_width = "0";
    sidenav_openStatus = 0;
    document.getElementById("menu_button").className = "menu_button_closed";
  }

  document.getElementById("sidenav").style.width = sidenav_width + "px";
}

function openTagDictionary(){
  if(document.getElementById("tagDictionary").style.display == "block"){
    document.getElementById("tagDictionary").style.display = "none";
  }
  else{
    document.getElementById("tagDictionary").style.display = "block";
  }
}

function closeTagDictionary(){
  document.getElementById("tagDictionary").style.display = "none";
}

var sidenav_openStatus = 2; // 0 = closed, 1 = open, 2 = untouched;
var book_width_minimum = 350;
var borderWidth = 1;
var marginWidth = 10;
var book_height_ratio = 0.9;

resize_sidenav();

var sidenav = document.getElementById("sidenav");
var sidenav_padding = sidenav.offsetWidth;

var topnav = document.getElementById("topnav");
var topnav_padding = topnav.offsetHeight;

document.getElementById("book_div_position").style.paddingLeft = parseInt(sidenav_padding) + "px";

document.getElementById("book_div_position").style.paddingTop = parseInt(topnav_padding) + "px";

setTimeout(function(){ // "no" delay to allow website to load (it works?)
  resize_sequence(); // includes resize sequence inside
  scroll_function();
},10);

// update for universal_topnav after everything is loaded
setTimeout(function(){
  scrollOnLoad = document.documentElement.scrollTop;
},100);

addEventListener('resize', (event) => {
  resize_sequence();
  screenWidth = window.innerWidth;

  if(mobileDevice()){
    screenWidth = screen.width;
  }
  if(document.getElementsByClassName("topnav_text_links").length == 4){
    document.getElementsByClassName("topnav_text_links")[3].className = "currentTextLink";
  }
});
addEventListener('scroll', (event) => {
  resize_sequence();
});
