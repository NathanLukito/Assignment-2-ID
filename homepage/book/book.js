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

    /*Initiating Data*/
    let booklist = []
    let userlist = []
    let reviewlist = []
    init_data()
    async function init_data(){
        const BookID = JSON.parse(localStorage.getItem("BookID"))
        booklist = JSON.parse(localStorage.getItem("booklist"))
        userlist = JSON.parse(localStorage.getItem("userlist"))
        reviewlist = JSON.parse(localStorage.getItem("reviewlist"))
        await GetBook(BookID, booklist)
    }

    async function GetBook(BookID, booklist){
        for(let i = 0; i < booklist.length; i++){
            console.log(booklist[i].BookID, BookID)
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
    function AddDesc(book)
    {
        root = document.querySelector(".desc")

        book_desc = document.createElement("div")
        book_desc.classList.add("book-desc")

        title = document.createElement("h1")
        title.innerText = book.Title + " \nBy " + book.Author
        title.classList.add("book-title")

        synopsis = document.createElement("h1")
        synopsis.innerHTML = "Synopsis"
        synopsis_text = document.createElement("p")
        synopsis_text.innerHTML = book.Synopsis

        book_desc.appendChild(title)
        book_desc.appendChild(synopsis)
        book_desc.appendChild(synopsis_text)

        book_data = document.createElement("div")
        book_data.classList.add("book-data")

        likes = document.createElement("h1")
        likes.innerHTML = "Likes: " + book.Likes

        genre = document.createElement("h1")
        genre.innerHTML = "Genre: " + book.Genre



        book_data.appendChild(likes)
        
        book_data.appendChild(genre)

        root.appendChild(book_desc)
        root.appendChild(book_data)
    }

    function AddBookCover(book)
    {
        var root = document.querySelector(".book-container");
        let img = document.createElement("div")
        img.innerHTML = 
        `
            <img class = "book-cover" src = "https://nathaninteractivedev-4002.restdb.io/media/${book.BookCover}">
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
                            <img class = "profilepic" src = "https://nathaninteractivedev-4002.restdb.io/media/${userlist[x].Profilepic}">
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