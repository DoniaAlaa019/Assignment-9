var namebookmark = document.getElementById('site-name');
var urlbookmark = document.getElementById('site-url');
var layer1 = document.getElementById('pop-layer');
var popup1 = document.getElementById('popup');
var bookmarkscontainer;
if (localStorage.getItem('bookmarks')) {
    bookmarkscontainer = JSON.parse(localStorage.getItem('bookmarks').toString());
    display(bookmarkscontainer);

} else {
    bookmarkscontainer = [];
}

function add() {

    var bookmarker = {
        b_name: namebookmark.value,
        b_url: urlbookmark.value
    };
    console.log(findinbookmarkcontainer(bookmarkscontainer, bookmarker));
    if (validname(bookmarker.b_name) && validurl(bookmarker.b_url) && !(findinbookmarkcontainer(bookmarkscontainer, bookmarker))) {
        bookmarkscontainer.push(bookmarker);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkscontainer));
        display(bookmarkscontainer);
        clear();
    } else {
        layer1.classList.remove('d-none');
        layer1.classList.add('d-block');
        popup1.classList.remove('d-none');
        popup1.classList.add('d-block');
    }
}

function clear() {
    namebookmark.value = '';
    urlbookmark.value = '';
    namebookmark.classList.remove('is-valid');
    urlbookmark.classList.remove('is-valid');
}

function display(bookmarks) {
    var tags = '';
    for (var i = 0; i < bookmarks.length; i++) {
        tags = tags +
            `<tr>
        <td>${i+1}</td>
        <td>${bookmarks[i].b_name}</td>
        <td><a href="Https://${bookmarks[i].b_url}" target="_blank"><button class="btn btn-success" id="visit" >
            <i class="fa-solid fa-eye pe-2"></i>
            Visit</button></a></td>
        <td><button class="btn btn-danger" id="delete" onclick="deletebookmark(${i})">
            <i class="fa-solid fa-trash-can pe-2"></i>
            Delete</button></td>
        </tr>`;
    }
    document.getElementById("table-content").innerHTML = tags;
}

function deletebookmark(id) {
    bookmarkscontainer.splice(id, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkscontainer));
    display(bookmarkscontainer);
}

var nameregux = /^\w{3,}((\W+\S)|(\s+\w+))*$/;
var urlregux = /^(https:\/\/)?(w{3}\.)\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

function validname(expression) {
    if (nameregux.test(expression)) {
        namebookmark.classList.add('is-valid');
        namebookmark.classList.remove('is-invalid');
        return true;
    } else {
        namebookmark.classList.add('is-invalid');
        namebookmark.classList.remove('is-valid');
        return false;
    }
}

function validurl(expression) {
    if (urlregux.test(expression)) {
        urlbookmark.classList.add('is-valid');
        urlbookmark.classList.remove('is-invalid');
        return true;
    } else {
        urlbookmark.classList.add('is-invalid');
        urlbookmark.classList.remove('is-valid');
        return false;
    }
}

function closebutton() {
    layer1.classList.remove('d-block');
    layer1.classList.add('d-none');
    popup1.classList.remove('d-block');
    popup1.classList.add('d-none');
}

function findinbookmarkcontainer(cont, obj) {
    for (const c of cont) {
        if (c.b_url.toLowerCase() === obj.b_url.toLowerCase()) {
            return true;
        }
    }
    return false;
}