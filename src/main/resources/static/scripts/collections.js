window.onload = getUserBooks();

// get list of userbook entries per user email
function getUserBooks() {

    // construct url
    const base = "/books/";
    const suffix = document.getElementById("username").innerText.split(" ").join("+");
    const url = base + suffix;
    console.log("GET url: " + url)

    // make get request to openlibrary api
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    // event handler fired when req is ready
    xhr.onload = function () {
        if (this.status === 200 && this.readyState === 4) {
            data = JSON.parse(this.responseText);
            displayUserBooks(data);
        } else {
            console.log("api url not found");
        }
    }

    // send it
    xhr.send();
}

// for each userbook, get info
function displayUserBooks(data) {
    div = document.getElementById("content");

    // build book entry HTML
    out = ""
    data.forEach(e => {
        out += "<div id='div-" + e["workId"] + "'>"
        // out += "<form method='get' action='updatebook'>";

        //book info
        out += "<b>key:</b> " + e["workId"] + "<br>";
        out += "<b>review:</b> " + e["review"] + "<br>";
        out += "<b>status:</b> " + e["status"] + "<br>";

        //make next api call for remaining info
        out += '<span id="' + e["workId"] + '"></span>';
        getDataFromWorkId(e["workId"]);

        // change review
        out += '<label for="review">update review (0 to 10):</label>'
        out += '<input type="number" id="review" name="review" min="0" max="10"><br>'
        // change status
        out += '<label for="status">update status:</label>'
        out += '<input type="text" id="status" name="status "  max="100"><br>'
        // delete insertion
        out += '<input type="checkbox" id="delete" name="delete" value="Delete">'
        out += '<label for="delete">Delete Book from collection.</label><br>'

        //extra stuff
        out += '<input type="hidden" name="userEmail" value="' + document.getElementById("username").innerText + '">';
        out += "<input type=hidden value='" + e["workId"] + "' name=workId>"
        out += "<input type=submit value='update' onclick='updateBook(\"" + e["workId"] + "\")'>" //TODO add onclick=sendBook(workid)

        // out += "</form>"
        out += "<br><br></div>";
    });

    // put the results in respective div
    console.log("userbook: " + out);
    div = document.getElementById("content");
    div.innerHTML = out;

}

// extract book info from workid
function getDataFromWorkId(workId) {
    // construct url
    const base = "http://openlibrary.org";
    const suffix = ".json"
    const url = base + workId + suffix;
    console.log("url: " + url)

    // make get request to openlibrary api
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    // event handler fired when req is ready
    xhr.onload = function () {
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

// info for each work
function displayDataFromWorkId(data) {

    div = document.getElementById(data["key"]);
    const datakey = data["key"];

    // build book entry HTML
    out = ""
    out += "<b>title:</b> " + data["title"] + "<br>";
    out += "<b>descr.:</b> " + data["description"] + "<br>"; //TODO MAKE IT A SUBSTRING

    data["authors"].forEach(e => {
        console.log("AUTHOR KEY: " + e["author"]["key"])
        out += '<span id="' + datakey + e["author"]["key"] + '"></span>';
        getDataFromAuthorKey(datakey, e["author"]["key"]);
    })

    // put the results in respective div
    console.log("workid: " + out);
    div.innerHTML = out;

}

// extract author data from author key
function getDataFromAuthorKey(workId, author) {

    // construct url
    const base = "http://openlibrary.org";
    const suffix = ".json"
    const url = base + author + suffix;
    console.log("url: " + url)

    // make get request to openlibrary api
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    // event handler fired when req is ready
    xhr.onload = function () {
        if (this.status === 200 && this.readyState === 4) {
            data = JSON.parse(this.responseText);
            displayDataFromAuthorKey(workId, data);
        } else {
            console.log("api url not found");
        }
    }

    // send it
    xhr.send();
}

// info for each author
function displayDataFromAuthorKey(workId, data) {

    div = document.getElementById(workId + data["key"]);

    out = ""
    out += "<b>author:</b> " + data["name"] + "<br>";

    console.log("author: " + out)
    div.innerHTML += out;
}


// SEND USERBOOK UPDATE
function updateBook(wId) {
    //get userbook from db
    // construct url
    const base = "/books/";
    const suffix = document.getElementById("username").innerText.split(" ").join("+")
        + wId.split(" ").join("+");
    const url = base + suffix;
    console.log("GET url: " + url)

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
        if (this.status === 200) {

            data = JSON.parse(this.responseText);

            oldReview = data["review"]
            oldStatus = data["status"]

            div = document.getElementById("div-" + wId);

            console.log(div.children);

            //get info for update
            var userEmail = div.children["userEmail"].value;
            var workId = div.children["workId"].value;
            var review = div.children["review"].value;
            var status = div.children["status"].value;


            const toDelete = div.children["delete"].checked;




            if (review == "") {
                review = oldReview;
            }
            if (status == "") {
                status = oldStatus;
            }

            let userbook = {
                userEmail,
                workId,
                review,
                status,
            }

            console.log(userbook)

            console.log("review: " + review + " oldreview : " + oldReview);
            console.log("status:" + status + " oldStatus: " + oldStatus);
            

            // stringify and send to rest api
            var json = JSON.stringify(userbook);
            var xhr = new XMLHttpRequest();
            xhr.open(toDelete ? "DELETE" : "PATCH", "/updatebook/"); //set request type, based on toDelete checkbox
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (this.status === 200 || this.status === 204) {
                    alert("entry updated");
                    window.location.reload();
                } else {
                    console.log("api url not found");
                }
            }
            xhr.send(json);

        } else {
            console.log("api url not found");
        }
    }
    xhr.send();


}


// const toDelete  = document.getElementById("");
// if(toDelete){
//     removeBook( userbook );
// } else {
//     sendBook( userbook );
// }