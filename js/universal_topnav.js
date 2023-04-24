var window_url = "https://diversifying-reading.github.io/home/?search=undefined";
var repository = window_url.split("https://diversifying-reading.github.io/")[1].split("/")[0];
var scrollOnLoad = document.documentElement.scrollTop;
var screenWidth = window.innerWidth;
if(mobileDevice()){
  if(screen.orientation.type == "landscape-primary" || screen.orientation.type == "landscape-secondary"){
    screenWidth = screen.height;
  }
  else{
    screenWidth = screen.width;
  }

  scrollOnLoad = 0.1;
  document.documentElement.scrollTop = 0.1;
}

for(let i = 0; i < document.getElementsByClassName("topnav_text").length; i++){
  if(document.getElementsByClassName("topnav_text")[i].innerHTML.toUpperCase() == repository.toUpperCase()){
    document.getElementsByClassName("topnav_text")[i].style.backgroundColor = "lightgrey";
  }
}

function mobileDevice() {
     if (navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPad/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
     } else {
        return false ;
     }
}

function selectTopnavUpdate(){
  var link = document.getElementsByClassName("select")[0].value;
  if(link == "Catalog"){
    window.location.href = "https://diversifying-reading.github.io/search/";
  }
  else if(link == "Resources"){
    window.location.href = "https://diversifying-reading.github.io/resources/";
  }
  else if(link == "Suggest a Book"){
    window.location.href = "https://diversifying-reading.github.io/suggest/";
  }
  else if(link == "Home"){
    window.location.href = "https://diversifying-reading.github.io/home/";
  }
}

function resize_topnav(){
  let options = ["Suggest a Book", "Home", "Catalog", "Resources"];

  let optionsFormatted = "";

  for(var i=0; i<options.length; i++){
    optionsFormatted += "<option> ";
    optionsFormatted += options[i];
    optionsFormatted += "</option>"
  }

  if(screenWidth <= 687 && document.getElementsByClassName("topnav_text")[0].style.height == ""){
    document.getElementsByClassName("topnav_text")[0].innerHTML = '<select class="select" onchange="selectTopnavUpdate()">' + optionsFormatted + '</select>';
    document.getElementsByClassName("topnav_text")[0].style.height = "100%";
    document.getElementsByClassName("topnav_text")[0].style.width = document.getElementsByClassName("select")[0].offsetWidth+10 + "px";
    document.getElementsByClassName("topnav_text")[0].style.paddingTop = "0px";
    document.getElementsByClassName("topnav_text")[0].style.paddingLeft = "0px";
    document.getElementsByClassName('topnav_text')[0].style.fontSize = "";
    document.getElementsByClassName('topnav_text')[0].style.marginLeft = "0px";

    scroll_function();
  }
  else if(screenWidth > 687 && document.getElementsByClassName("select").length > 0){
    document.getElementsByClassName("topnav_text")[0].style.height = "";
    document.getElementsByClassName("topnav_text")[0].style.paddingLeft = "14px";
    document.getElementsByClassName("topnav_text")[0].style.width = "";

    document.getElementsByClassName("topnav_text")[0].innerHTML = '\n  <a href="https://diversifying-reading.github.io/home/" class="topnav_text_links" style="position:fixed; left:0px; padding-top: 8px; padding-bottom: 8px;">Home</a>\n  <a href="https://diversifying-reading.github.io/suggest/" class="currentTextLink" style="float: right; padding-top: 8px; padding-bottom: 8px;">Suggest a Book</a>\n  <a href="https://diversifying-reading.github.io/resources/" class="topnav_text_links" style="float: right; padding-top: 8px; padding-bottom: 8px;">Resources</a>\n  <a href="https://diversifying-reading.github.io/search/" class="topnav_text_links" style="float: right; padding-top: 8px; padding-bottom: 8px;">Catalog</a>\n  ';
    document.getElementsByClassName('topnav_text')[0].style.marginLeft = "1vmin";

    scroll_function();
  }
  if(screenWidth > 687){
    document.getElementsByClassName("topnav_text")[0].style.fontSize = document.getElementById("topnav").offsetHeight/2 +"px";
    document.getElementsByClassName("topnav_text")[0].style.fontSize = parseFloat(document.getElementsByClassName("topnav_text")[0].style.fontSize) * document.getElementById("topnav").offsetHeight;
  }

  if(document.getElementsByClassName("select").length > 0){
    document.getElementsByClassName("select")[0].style.width = "100vw";
  }

  if(mobileDevice() && document.getElementsByClassName("select").length > 0){
    // 387
    // document.getElementsByClassName('select')[0].style.fontSize = 74 + "px";
    // document.getElementsByClassName('select')[0].style.paddingLeft = 33 + "px"
    // document.getElementById("topnav").style.height = parseInt(document.getElementsByClassName("select")[0].style.fontSize) + 51 + "px";
    // document.getElementById("topnav").style.borderBottom = 14 + "px solid #7fa569"
    // // 687
    document.getElementsByClassName('select')[0].style.fontSize = 44 + ((687-screenWidth)/10) + "px";
    document.getElementsByClassName('select')[0].style.paddingLeft = 15 + ((687-screenWidth)*3/50) + "px"
    document.getElementById("topnav").style.height = parseInt(document.getElementsByClassName("select")[0].style.fontSize) + 26 + ((687-screenWidth)/12)+ "px";
    document.getElementById("topnav").style.borderBottom = 7 + ((687-screenWidth)*7/300) + "px solid #7fa569"
  }
  else if(mobileDevice() && screenWidth <= 1390){
    // // 1390
    document.getElementsByClassName('topnav_text')[0].style.fontSize = 27 + ((1390-screenWidth)*11/700) + "px";
    document.getElementsByClassName("currentTextLink")[0].style.paddingTop = 8 + ((1390-screenWidth)*3/700) + "px";
    document.getElementsByClassName("currentTextLink")[0].style.paddingBottom = 8 + ((1390-screenWidth)*3/700) + "px";
    document.getElementsByClassName("topnav_text_links")[0].style.paddingTop = 8 + ((1390-screenWidth)*3/700) + "px";
    document.getElementsByClassName("topnav_text_links")[1].style.paddingTop = 8 + ((1390-screenWidth)*3/700) + "px";
    document.getElementsByClassName("topnav_text_links")[2].style.paddingTop = 8 + ((1390-screenWidth)*3/700) + "px";
    document.getElementById("topnav").style.height = 49  + ((1390-screenWidth)*2/70)+ "px";
    document.getElementById("topnav").style.borderBottom = 5  + ((1390-screenWidth)*2/700)+ "px solid #7fa569"

    // document.getElementsByClassName('topnav_text')[0].style.fontSize = 27 + "px";
    // document.getElementById("topnav").style.height = 49 + "px";
    // document.getElementById("topnav").style.borderBottom = 5 + "px solid #7fa569"
  }
}

function scroll_function(){
  resize_topnav();

  let scrollFromOnLoad;
  if(document.documentElement.scrollTop >= scrollOnLoad){
    scrollFromOnLoad = document.documentElement.scrollTop - scrollOnLoad;
  }
  else{
    scrollFromOnLoad = 0;
    scrollOnLoad = document.documentElement.scrollTop;
  }

  let topnav_paddingTop = 17.5-(scrollFromOnLoad-30)/30;

  if(topnav_paddingTop < 8){
    topnav_paddingTop = 8;
    scrollOnLoad = 0;
  }
  else if(topnav_paddingTop > 17.5){
    topnav_paddingTop = 17.5;
  }

  if(screenWidth <= 1390){
    topnav_paddingTop = 8;
  }

  for(i=0; i<document.getElementsByClassName("topnav_text_links").length; i++){
    document.getElementsByClassName("topnav_text_links")[i].style.paddingTop = topnav_paddingTop + "px";
    document.getElementsByClassName("topnav_text_links")[i].style.paddingBottom = topnav_paddingTop + "px";
  }

  if(document.getElementsByClassName("currentTextLink").length > 0){
    document.getElementsByClassName("currentTextLink")[0].style.paddingTop = topnav_paddingTop + "px";
    document.getElementsByClassName("currentTextLink")[0].style.paddingBottom = topnav_paddingTop + "px";
  }

  if(document.getElementsByClassName("topnav_text_links").length > 0){
    document.getElementById("topnav").style.height = document.getElementsByClassName("topnav_text_links")[0].offsetHeight + "px";
  }
  else{
    document.getElementById("topnav").style.height = "50px";
  }
  document.getElementById("body_text").style.paddingTop = document.getElementById("topnav").offsetHeight - 15 + "px";

}

if(document.getElementsByClassName("topnav_text_links").length == 4){
  document.getElementsByClassName("topnav_text_links")[1].className = "currentTextLink";
}
