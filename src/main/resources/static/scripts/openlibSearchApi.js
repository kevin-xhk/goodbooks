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
        out += '<form method="post" action="books">'
        out += "<p>";

        // work content
        out += "<b>title:</b> "     + e["title"]       + "<br>";
        out += "<b>author(s):</b> " + e["author_name"] + "<br>";
        out += "<b>key:</b> "       + e["key"]         + "<br>";
            // out += "<b>isbn:</b> "      + e["isbn"]        + "<br>";

        // buttons
        out += '<input type="hidden" name="workId" value="' + e["key"]+ '">';
        out += '<input type="hidden" name="userEmail" value="' + document.getElementById("username").innerText + '">';
        out += "<input type='submit' name='add-book' value='add book'>";

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
    username = document.getElementById("username").value

    var data = {
        userId: username,
        workId: workID,
        review: 0,
        status: ""
    }

    // send it
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/books/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(json);
}