const book = {
    title: "",
    authors: [],
    desc: "",
    status: "",
    review: 0,
}

function getUserBookss() {
    // construct url
    const base = "/books/";
    const suffix = document.getElementById("username").innerText.split(" ").join("+");
    const url = base + suffix;
    console.log("GET url: " + url)
    
    // make get request to openlibrary api
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    // event handler fired when req is ready
    xhr.onload = function() {
        if (this.status === 200 && this.readyState === 4) {
            data = JSON.parse(this.responseText);
            data.forEach( userbook => {
                getDescAndAuthorsKey( userbook )
                console.log(book)
            })
        } else {
            console.log("api url not found");
        }
    }

    // send it
    xhr.send();
}

function getDescAndAuthorsKey(){
    // construct url
    const base = "http://openlibrary.org";
    const suffix = ".json"
    const url = base + workId + suffix;
    console.log("url: " + url)
    
    // make get request to openlibrary api
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    // event handler fired when req is ready
    xhr.onload = function() {
        if (this.status === 200) {
            data = JSON.parse(this.responseText);

            book.title = data.title;
            book.desc = data.description;

            data.authors.forEach(author =>{
                getAuthorInfo(author.author)
            })
            
        } else {
            console.log("api url not found");
        }
    }   

    // send it
    xhr.send();
}
function getAuthorInfo(author) {

    // construct url
    const base = "http://openlibrary.org";
    const suffix = ".json"
    const url = base + author + suffix;
    console.log("url: " + url)
    
    // make get request to openlibrary api
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    // event handler fired when req is ready
    xhr.onload = function() {
        if (this.status === 200 && this.readyState === 4) {
            data = JSON.parse(this.responseText);
            book.authors.push(author)
        } else {
            console.log("api url not found");
        }
    }

    // send it
    xhr.send();
}


