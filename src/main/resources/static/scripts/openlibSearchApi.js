function apiCall() {
    
    // construct url
    const base = "http://openlibrary.org/search.json?q=";
    const suffix = document.getElementById("search-input").value.split(" ").join("+");
    const url = base + suffix;
    console.log("url: " + url)
    
    // make get request to openlibrary api
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    // event handler fired when req is ready
    xhr.onload = function() {
        if (this.status === 200) {
            data = JSON.parse(this.responseText);
            displayDataFromWorkId(data);
        } else {
            console.log("api url not found");
        }
    }

    // send it
    xhr.send();
}

function displayDataFromWorkId( data ) {

    console.log("userid: " + document.getElementById("username").innerText);
    // build book entry HTML
    out = ""
    data["docs"].forEach(e => {
        // html opening tags
            // out += '<form method="post" onclick="sendBook(\''+ e["key"] +'\')">' 
        // out += '<form method="post" action="books">'
        out += "<form name='"+e["key"]+"'>"
        out += "<p>";

        // work content
        out += "<b>title:</b> "     + e["title"]       + "<br>";
        out += "<b>author(s):</b> " + e["author_name"] + "<br>";
        out += "<b>key:</b> "       + e["key"]         + "<br>";
            // out += "<b>isbn:</b> "      + e["isbn"]        + "<br>";

        // buttons
        out += '<input type="hidden" name="workId" value="' + e["key"]+ '">';
        out += '<input type="hidden" name="userEmail" value="' + document.getElementById("username").innerText + '">';
        // out += "<input type='submit' name='add-book' value='add book'>";    // TODO change Form into button.onclick = sendbook(workid)
        out += "<input type='submit' name='add-book' value='add book' onclick='sendBook(\"" + e["key"] + "\")'>";    // TODO change Form into button.onclick = sendbook(workid)

        // html closing tags
        out += "</p><br>";
        out += "</form>";
    });

    // put the results in respective div
    div = document.getElementById("search-results");
    div.innerHTML = out;

}

function sendBook( workID ){

    // prepare post data to send to backend
    console.log("post workid: " + workID)
    username = document.getElementById("username").innerText

    // var data = {
    //     userId: username,
    //     workId: workID,
    //     review: 0,
    //     status: ""
    // }

    // var data = new FormData();
    // data.append('userEmail', username);
    // data.append('workId', workID);

    // // send it
    // var json = JSON.stringify(data);

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "/books/", true);
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.onload = function() {
    //     console.log(xhr.responseText);
    // }

    // xhr.send(json);




    // const xhr = new XMLHttpRequest();

    // // configure a `POST` request
    // xhr.open('POST', '/books');

    // // create a JSON object
    // const params = {
    //     workId: workID,
    //     userEmail: username
    // };

    // console.log("params: " + JSON.stringify(params))

    // // set `Content-Type` header
    // xhr.setRequestHeader('Content-Type', 'application/json');

    // // pass `params` to `send()` method
    // xhr.send("workID='"+workID+"'&userEmail='"+username+"'");

    // // listen for `load` event
    // xhr.onload = () => {
    // console.log(xhr.responseText);
    // }


      // pre-fill FormData from the form
    let formData = new FormData(document.forms[workID]);
    console.log("formdata: " + formData);
    

    // add one more field
    // formData.append("middle", "Lee");

    // send it out
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/books");
    xhr.send(formData);

    xhr.onload = () => alert("book added to collection");
}