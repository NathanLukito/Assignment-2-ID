$(document).ready(function(){

    const listItems = document.querySelector('.menu').children
    const listArray = Array.from(listItems)
    $(".nav-btn").click(function(index){
        var interval = 100      
        listArray.forEach(function (i, index) {
            setTimeout(function () {
                i.classList.toggle("show")
            }, index * interval)
        })
    })

    $(".navbar").click(function(){
        if (document.querySelector(".icon1").getAttribute("class").endsWith("topAnim"))
        { 
            document.querySelector(".menu-btn").innerHTML = "Menu"
        }

        else if (document.querySelector(".icon1").getAttribute("class").endsWith("icon1"))
        {
            document.querySelector(".menu-btn").innerHTML = "Close"
        }

        $(".icon1").toggleClass("topAnim")
        $(".icon2").toggleClass("midAnim")
        $(".icon3").toggleClass("botAnim")
    })

    $(".search-icon").click(function(){
        let search = $("#search").val()
        localStorage.setItem("search", search)
        location.href = '/booklist/booklist.html'
    })

    let booklist = []
    booklist = JSON.parse(localStorage.getItem("booklist"))
    let searchfor = localStorage.getItem("search")
    document.querySelector(".searchfor").innerHTML = "Searched for: " + searchfor
    for(let i = 0; i < booklist.length; i++)
    {
        if(searchfor == null)
        {
            root = document.querySelector(".booklist")
            let book_container = document.createElement("div")
            book_container.classList.add("book-container")
            book_container.setAttribute("data-link", booklist[i].BookID)
            book_container.addEventListener('click', function(){
                let bookid = book_container.getAttribute("data-link")
                localStorage.setItem("BookID", bookid)
                location.href = '/homepage/book/book.html'
            })                
            book_container.innerHTML = 
            ` 
                <div class = "book">
                    <h1>${booklist[i].Title}</h1>
                    <img class = "book-cover" src = "https://nathaninteractivedev-4002.restdb.io/media/${booklist[i].BookCover}">
                    <p class = "synopsis">${booklist[i].Synopsis}</p>
                </div>
                <div class = "book-details">
                    <h1>${booklist[i].Likes} Likes</h1>
                    <h1>${booklist[i].Date.substring(0,10).replace("/", "-")}</h1>
                    <h1>By: ${booklist[i].Author}</h1>
                    <h1>Genre: ${booklist[i].Genre}</h1>
                </div> 
            `
            root.appendChild(book_container)
        }

        else if((booklist[i].Title.toUpperCase().replaceAll(" ", "")).includes(searchfor.toUpperCase().replaceAll(" ", "")) == true)
        {
            root = document.querySelector(".booklist")
            let book_container = document.createElement("div")
            book_container.classList.add("book-container")
            book_container.setAttribute("data-link", booklist[i].BookID)
            book_container.addEventListener('click', function(){
                let bookid = book_container.getAttribute("data-link")
                localStorage.setItem("BookID", bookid)
                location.href = '/homepage/book/book.html'
            })                
            book_container.innerHTML = 
            ` 
                <div class = "book">
                    <h1>${booklist[i].Title}</h1>
                    <img class = "book-cover" src = "https://nathaninteractivedev-4002.restdb.io/media/${booklist[i].BookCover}">
                    <p class = "synopsis">${booklist[i].Synopsis}</p>
                </div>
                <div class = "book-details">
                    <h1>${booklist[i].Likes} Likes</h1>
                    <h1>${booklist[i].Date.substring(0,10).replace("/", "-")}</h1>
                    <h1>By: ${booklist[i].Author}</h1>
                    <h1>Genre: ${booklist[i].Genre}</h1>
                </div> 
            `
            root.appendChild(book_container)
        }
        
        else
        {
            continue
        }
    }
})