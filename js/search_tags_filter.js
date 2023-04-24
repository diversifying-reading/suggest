var required_tags = [];
var filtered_data = "";
var filtered_data_list = [];
var button_list = "";
var button_value = "";
var value_in_url = "";
var button_count = 0;
var search_data = "";
var book_blocks = [];
var books_html = "";
var books_html_list = [];
var url = window.location.href;
var books_per_page = 48;
var libraryBibnumbers = [];
var pageNumber = parseInt(from_url("page"));

if (from_url('search') != 'undefined'){
  document.getElementById("input").value = decodeURIComponent(from_url('search')); //input value set to url search param value
}

all_tags.forEach(find_required_tags);
all_tags.forEach(make_buttons);
data.forEach(filter);

var search_data_list = [];

filtered_data_list.forEach(search_format);
filtered_data_list.forEach(search_and_tag_filter);

document.getElementById("buttons").innerHTML = button_list;
document.getElementById("search_list").innerHTML = search_data;

search_func();

correct_url();

linkToSLCPL();

function linkToSLCPL(){
  for(let i=0; i<document.getElementsByClassName("linkToSLCPL").length/3; i++){
    document.getElementsByClassName("linkToSLCPL")[3*i].href = "https://catalog.slcpl.org/search/title.aspx?ctx=1.1033.0.0.7&pos=2&cn=" + libraryBibnumbers[pageNumber*books_per_page+i][0]
    document.getElementsByClassName("linkToSLCPL")[3*i+1].href = "https://catalog.slcpl.org/search/title.aspx?ctx=1.1033.0.0.7&pos=2&cn=" + libraryBibnumbers[pageNumber*books_per_page+i][1]
    document.getElementsByClassName("linkToSLCPL")[3*i+2].href = "https://catalog.slcpl.org/search/title.aspx?ctx=1.1033.0.0.7&pos=2&cn=" + libraryBibnumbers[pageNumber*books_per_page+i][2]
  }
}

function nextPage(){
  window.location.href = window.location.href.split("page=")[0] + "page=" + (parseInt(from_url("page")) + parseInt(1));
}
function previousPage(){
  window.location.href = window.location.href.split("page=")[0] + "page=" + (parseInt(from_url("page")) + parseInt(-1));
}

function correct_url(){
//	if param 'search' is not included in paramString (already includes line 'if param.includes("search")' maybe if paramString includes might work? rewrite with selections
//	if url exactly equals 'https://diversifying-reading.github.io/search/" or "https://diversifying-reading.github.io/search" rewrite with selections
var paramString = url.split('?')[1];
if(paramString == undefined || !url.includes("search=") && !url.includes("page=")){
  if (!url.includes("?") || !url.includes("search=") && !url.includes("page=")){
    window.location.href = 'https://diversifying-reading.github.io/search/?' + required_tag_url_format + 'search=undefined&page=0';
  }
}
else if(!url.includes("search=") || !Boolean(parseInt(from_url("page"))>=0)){
  window.location.href = 'https://diversifying-reading.github.io/search/?' + required_tag_url_format + 'search=' + from_url("search") + "&page=0";
}
else if(!url.includes("page=")){
  window.location.href = 'https://diversifying-reading.github.io/search/?' + required_tag_url_format + 'search=undefined&page=' + from_url("page");
}

let includesSearchParam = false;
let otherParams = false;

for(let param of paramString.split('&')){
   if (param.includes("search")){
     includesSearchParam = true;
   }
   else if (param != undefined && param != ""){
     otherParams = true;
   }
 }

if(!includesSearchParam){
  if(otherParams){
    window.location += "&search=undefined"
  }
  else{
    window.location += "search=undefined";
  }
}
}

function make_buttons(value){

  button_value = value;
  value_in_url = value;

  if (required_tags.includes(value)){
    pressed_status = "pressed";
  }
  else {
    pressed_status = "unpressed";
  }

  required_tag_url_format = "";
  required_tags.forEach(url_format_tags);
  search_value = '&search=' + from_url('search');
  let page_value = "&page=0";

  if (value_in_url == ""){
    required_tag_url_format = required_tag_url_format.slice(0, -1);
  }

  if (required_tag_url_format == '' && value_in_url == ''){
    search_value = search_value.substring(1);
  }

  button_list += '<button onclick="window.location.href=' + "'" + window.location.href.split('?')[0] + '?' + required_tag_url_format + value_in_url + search_value + page_value +"'" +
  '"' + " class='" + pressed_status + "'" + '">' + tag_display_list[button_count] + '</button>';

  button_count += 1;

}


function url_format_tags(value) { //value = required tag in url

  if (button_value == value){
      if (pressed_status == "unpressed"){
        required_tag_url_format += value + '&';
      }
      else{
        value_in_url = '';
      }
  }
  else{
    required_tag_url_format += value + '&';
  }
}

function find_required_tags(value) {
  var paramString = url.split('?')[1];

if (paramString != '' && typeof paramString != "undefined"){
  for(let param of paramString.split('&')){
     if (param == value){
       required_tags.push(value);
     }
   }
}
}

function from_url(inputParam) {
  var paramString = url.split('?')[1];
if (paramString != '' && typeof paramString != "undefined"){
  for(let param of paramString.split('&')){
   if (param.includes(inputParam)){
      return param.split('=')[1];
   }
  }
}
}

function filter(value) {
  var required_tag_count = required_tags.length;
  var valid_tags = 0;
  var book_tags = Object.keys(value);
  var book_tags_string = '';

  book_tags.shift(); //remove first two and last 4 tags (if last 4 tags exist)
  book_tags.shift();
  if(value.publishersSummary != undefined){
    book_tags.pop();
  }
  if(value.audioBibnumber != undefined){
    book_tags.pop();
  }
  if(value.ebookBibnumber != undefined){
    book_tags.pop();
  }
  if(value.bookBibnumber != undefined){
    book_tags.pop();
  }

  for(var i = 0; i < book_tags.length; i++){
    book_tags_string += "<a style='color: #000000;text-decoration: none;background-color: #cdbead;padding-left: 5px;padding-right: 5px;padding-top: 2px;padding-bottom: 2px;border-radius: 4px;' href='" + "https://diversifying-reading.github.io/search/?" + book_tags[i] + "&search=undefined&page=0'>"
    book_tags_string += display_book_tags(book_tags[i]);
    book_tags_string += "</a>"
    if (i < book_tags.length - 1){
      book_tags_string += "&nbsp&nbsp";
    }
  }

  book_tags_string.slice(0, -3);

  for(var i = 0; i < required_tag_count; i++) { //for each required tag; i=index value of required tag
    var required_tag = required_tags[i];

    if (book_tags.includes(required_tag)) { //if the book tags include the required tag
      valid_tags += 1;
    }

  }

  if (valid_tags == required_tag_count) { //if every required tag is in the book's tags
    add_formated_to_filtered_data_list(value, book_tags_string);
  }

}

function display_book_tags(value){
   return tag_display_list[all_tags.indexOf(value)]
}

function add_formated_to_filtered_data_list(value, book_tags_string){
    filtered_data_list.push(value.title + " written by " + value.author + '<br> -tags: ' + book_tags_string + '<br><br>');
    book_blocks.push("<p class=book_block>" + value.title + " written by " + value.author + '<br> -tags: ' + book_tags_string + '<br><br> </p>');

    let publishersSummary = value.publishersSummary;
    if(publishersSummary == undefined){
      publishersSummary = "Sorry, we don't have a summary for this yet!";
    }

    let image_path = value.title + "," + value.author + ".jpeg";
    image_path = image_path.replace(/\s/g, '');
    image_path = image_path.replace("?", '');
    image_path = image_path.replace(':', '-');

    if(screenWidth <= 940){
      book_width_minimum = 350;
    }
    else{
      book_width_minimum = 400;
    }
    let book_padding = book_width_minimum - borderWidth*2 - marginWidth*2 - 1 + fit_window();

    let goodreadsURL = "https://www.goodreads.com/search?utf8=%E2%9C%93&q=";
    goodreadsURL += value.title.replace(/s\s/g,'+') + " by " +  value.author.replace(/s\s/g,'+');
    book_tags_string += '<h5> <a style="color:#591b83; text-decoration: none;" href="'+ goodreadsURL + '">More on Goodreads ></a> </h5>'

    books_html_list.push('<div class="book_format"> <img src="./images/covers/' + image_path + '" class="book_img">' + "<a class='linkToSLCPL' target='_blank'><img class='bookLink' src='./images/book_icon.jpeg' + style=top:" + String(book_padding*book_height_ratio*0.65) + "px;left:" + String(book_padding*0.37) +'px;></a>' + "<a class='linkToSLCPL' target:'_blank'> <img class='ebookLink' src='./images/ebook_icon.jpeg' + style=top:" + String(book_padding*book_height_ratio*0.65) + "px;left:" + String(book_padding*0.37) +'px;></a>' + "<a class='linkToSLCPL' target:'_blank'> <img class='audiobookLink' src='./images/audiobook_icon.jpeg' + style=top:" + String(book_padding*book_height_ratio*0.65) + "px;left:" + String(book_padding*0.37) +'px;></a>'+ '<div class="book_text"> <p style="display: block; font-size: 200%; font-weight: bold; margin-block-start: 0em; margin-block-end: 0em;">' + value.title + "</p>" + '<p style="display: block; font-size: 150%; font-weight: bold; margin-block-start: 0em; margin-block-end: 0em;">' + value.author + "</p>" + '<p>' + publishersSummary + '</p>' + "</div> <div style='margin:1%; padding-top:65%'> <h4 style='line-height:26px;margin-top:0px;word-break:break-word;'>" + book_tags_string + "</h4> </div></div>");

    bibnumbers = [];

    bibnumbers.push(value.bookBibnumber);
    bibnumbers.push(value.ebookBibnumber);
    bibnumbers.push(value.audioBibnumber);

    libraryBibnumbers.push(bibnumbers)
}

function search_func(){
  var filter, ul, li, i;

  if (from_url('search') != 'undefined'){
    filter = decodeURIComponent(from_url('search'));
    filter = filter.toUpperCase();
  }
  else{
    filter = '';
  }

  ul = document.getElementById("search_list");
  li = ul.getElementsByTagName("li");

  for (i = 0; i < filtered_data_list.length; i++) {
    let dataNumber;
    for(j=0;j<data.length;j++){
      if(data[j].title == filtered_data_list[i].split(" written by ")[0] && data[j].author == filtered_data_list[i].split(" written by ")[1].split("<br> -tags:")[0]) {
          dataNumber = j;
      }
    }

    txtValue = data[dataNumber].title + data[dataNumber].author;

    if(data[dataNumber].publishersSummary != undefined){
      txtValue += data[dataNumber].publishersSummary;
    }

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      search_data_list.push(filtered_data_list[i]);
      li[i].style.display = "none"; // don't display
    }
    else{
      li[i].style.display = "none"; // don't display
    }
  }
  filtered_data = '';
  books_html = ' ';
  for(let i=books_per_page * parseInt(from_url("page"));i<books_per_page*from_url("page")+books_per_page;i){
    if(search_data_list.length > i) {
        search_and_tag_filter(search_data_list[i]);
        i++;
    }
    else{
      i = books_per_page*from_url("page")+books_per_page;
    }
  }
  if(search_data_list.length > books_per_page*(parseInt(from_url("page"))+1)) {
    document.getElementsByClassName("next_page_btn")[0].style.display = "";
  }
  else{ // end of book message
    if(search_data_list == 0){
      if (document.getElementById("input").value != "" && required_tags.length == 0){ // search value and no tag values
        document.getElementById("end_of_books_msg").innerHTML = "Sorry, we don't currently have any books that match these critera. Please check your spelling or broaden your search to allow us to reccomend you books. <br>Our collection is always growing, and to help us grow our collection, we encourage you to submit a suggestion to our 'Suggest a Book' page. Thank you and happy reading!"
      }
      else if(document.getElementById("input").value != ""){ // search value and tag values
        document.getElementById("end_of_books_msg").innerHTML = "Sorry, we don't currently have any books that match these critera. Please check your spelling or reduce the number of tags you are searching by to allow us to reccomend you books. <br>Our collection is always growing, and to help us grow our collection, we encourage you to submit a suggestion to our 'Suggest a Book' page. Thank you and happy reading!"
      }
      else{ // tag values
        document.getElementById("end_of_books_msg").innerHTML = "Sorry, we don't currently have any books that match these critera. Please reduce the number of tags you are searching by to allow us to reccomend you books. <br>Our collection is always growing, and to help us grow our collection, we encourage you to submit a suggestion to our 'Suggest a Book' page. Thank you and happy reading!"
      }
      document.getElementById("book_div").style.display = "none"
    }
    else{
      document.getElementById("end_of_books_msg").innerHTML = "Sorry, we don't have any more books that match these critera, but our collection is always growing. To help us grow our collection, we encourage you to submit a suggestion to our 'Suggest a Book' page. Thank you and happy reading!"
      document.getElementById("book_div").style.display = ""
    }
  }

  if(0 <= books_per_page*(parseInt(from_url("page"))-1)) {
    document.getElementsByClassName("previous_page_btn")[0].style.display = "";
  }
  document.getElementById("book_div").innerHTML = books_html;
}

function search(e){
  if (document.getElementById("input").value != ""){
    address = document.getElementById("input").value;
  }
  else{
    address = 'undefined';
  }

  if(e.which==13||e.keyCode === 13){
    window.location.href = url.split('search=')[0] + 'search=' + address + "&page=0";
    search_func();
  }
  return false;
}

function search_format(value){
  search_data += '<li><a href="#">'+value.split("<br>")[0]+'</a></li>';
}

function search_and_tag_filter(value){ // search data list
  filtered_data += book_blocks[filtered_data_list.indexOf(value)];
  books_html += books_html_list[filtered_data_list.indexOf(value)];
}
