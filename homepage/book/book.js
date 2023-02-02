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
            console.log($(".nav-btn"))
        }

        $(".icon1").toggleClass("topAnim")
        $(".icon2").toggleClass("midAnim")
        $(".icon3").toggleClass("botAnim")
    })

    /*Initiating Data*/
    let booklist = []
    let userlist = []
    let reviewlist = []
    booklist = JSON.parse(localStorage.getItem("booklist"))
    userlist = JSON.parse(localStorage.getItem("userlist"))
    reviewlist = JSON.parse(localStorage.getItem("reviewlist"))

    let BookID = JSON.parse(localStorage.getItem("BookID"))
    async function GetBook(BookID, booklist){
        for(let i = 0; i < booklist.length; i++){
            if(booklist[i].BookID == BookID){
                
                var book = booklist[i];
            }
            else
            {
                continue;
            }
        }
        await AddDesc(book)
        await AddBookCover(book)
        await AddReviews(book)
    }
    let book = GetBook(BookID, booklist)

    function AddDesc(book)
    {
        root = document.querySelector(".desc")

        book_desc = document.createElement("div")
        book_desc.classList.add("book-desc")

        title = document.createElement("h1")
        title.innerText = "Title: " + book.Title

        synopsis = document.createElement("h1")
        synopsis.innerHTML = "Synopsis: "
        synopsis_text = document.createElement("p")
        synopsis_text.innerHTML = book.Synopsis

        book_desc.appendChild(title)
        book_desc.appendChild(synopsis)
        book_desc.appendChild(synopsis_text)

        book_data = document.createElement("div")
        book_data.classList.add("book-data")

        likes = document.createElement("h1")
        likes.innerHTML = "Likes: " + book.Likes

        views = document.createElement("h1")
        views.innerHTML = "Views: " + book.Views

        book_data.appendChild(likes)
        
        book_data.appendChild(views)

        root.appendChild(book_desc)
        root.appendChild(book_data)
    }

    function AddBookCover(book)
    {
        var root = document.querySelector(".review");
        let img = document.createElement("div")
        img.innerHTML = 
        `
            <img class = "book-cover" src = "https://nathaninteractivedev-4002.restdb.io/media/${book.BookCover}">
            <h3 class = "book-review-container">Reviews</h3>
        `
        root.appendChild(img)
    }

    async function AddReviews(book)
    {
        for (let i = 0; i < reviewlist.length; i++)
        {
            if(book.ReviewID == reviewlist[i].ReviewID)
            {
                
                for(let x = 0; x < userlist.length; x++)
                {
                    if(reviewlist[i].UserID == userlist[x].UserID)
                    {
                        var root = document.querySelector(".review");
                        let review_container = document.createElement("div")
                        review_container.classList.add("review_container")
                        let html = document.createElement("div")
                        html.classList.add("review-account")
                        html.innerHTML = 
                        `                     
                            <img src = "img/brand-icon.svg" width = "30" height = "30">
                            <p>${userlist[x].Username}<br></p>
                        `
                        let review = document.createElement("p")
                        review.innerHTML = `${reviewlist[i].Review}`
                        review_container.appendChild(html)
                        review_container.appendChild(review)
                  
                        root.appendChild(review_container)
                        
                    }

                    else
                    {
                        continue
                    }
                }
                
            }
            else
            {
                continue
            }
        }  
    }


})