$(document).ready(function(){
    function clear(){
        localStorage.clear()
    }
    clear()

    let translate = 0
    let container = document.querySelector(".scroll-images")
    $(".scroll-left").click(function(){
        if(translate != 0)
        {
            translate += 4.5;
            container.style.transform = "translateX(" + translate + "%)"
        }

        else
        {
            return;
        }   
    })

    $(".scroll-right").click(function(){
        if(translate >= -95)
        {
            translate -= 4.5;
            container.style.transform = "translateX(" + translate + "%)"
            console.log(translate)
        }

        else
        {
            return;
        }
    })


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
            console.log("done2")
        }

        else if (document.querySelector(".icon1").getAttribute("class").endsWith("icon1"))
        {
            document.querySelector(".menu-btn").innerHTML = "Leave"
            console.log($(".nav-btn"))
        }

        $(".icon1").toggleClass("topAnim")
        $(".icon2").toggleClass("midAnim")
        $(".icon3").toggleClass("botAnim")
        
        console.log("done")
    })


    /*  RestDB Database  */
    booklist = []

    //initiating book object
    function Book(BookID, Title, Synopsis, Author, Likes, Dislikes, ReviewID, Date, BookCover){
        this.BookID = BookID,
        this.Title = Title,
        this.Synopsis = Synopsis,
        this.Author = Author,
        this.Likes = Likes,
        this.Dislikes = Dislikes,
        this.ReviewID = ReviewID,
        this.Date = Date,
        this.BookCover = BookCover

    }
    const APIKEY = "63b3e1aa969f06502871a8c1"
    async function GetBooks(){
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://nathaninteractivedev-4002.restdb.io/rest/book",
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            },
          }
    //Getting data from databse
        $.ajax(settings).done(async function (response) {
            for(let i = 0; i < response.length; i++)
            {
                booklist.push(
                    new Book(
                        response[i].BookID, 
                        response[i].Title, 
                        response[i].Synopsis, 
                        response[i].Author, 
                        response[i].Likes, 
                        response[i].Dislikes, 
                        response[i].ReviewID,
                        response[i].Date,
                        response[i].BookCover
                        )
                )
                
            }
            //add to localStorage for use in other pages
            localStorage.setItem("booklist", JSON.stringify(booklist)) 

            //wait for data initialization to finish before initiating popular booklist
            await popular() 
            
        })

        
    }

    function popular(){
        
        let booklist = JSON.parse(localStorage.getItem(localStorage.key(0)))

        let sorted = booklist.slice(0) //duplicates the list into a array that always adds the higher liked book
        sorted.sort(function(a,b){     
            return b.Likes - a.Likes
        })

        for (let i = 0; i <= 20; i++)
        {
            let root = document.getElementById("popular")

            let book_container = document.createElement("div")
            book_container.classList.add("popular-book-container")

            let book = document.createElement("div")
            book.classList.add("book")

            let book_cover = document.createElement("img")
            book_cover.setAttribute("src", "https://nathaninteractivedev-4002.restdb.io/media/" + sorted[i].BookCover)
            book_cover.classList.add("book-cover")
            let book_overlay = document.createElement("div")
            book_overlay.classList.add("book-overlay")
            let title = document.createElement("h1")
            title.innerHTML = sorted[i].Title
            let synopsis = document.createElement("p")
            synopsis.innerHTML = sorted[i].Synopsis

            book_overlay.appendChild(title)
            book_overlay.appendChild(synopsis)
            book.appendChild(book_cover)
            book.appendChild(book_overlay)


            let popular_stats = document.createElement("div")
            popular_stats.classList.add("popular-stats")

            let likes_container = document.createElement("div")
            likes_container.classList.add("likes")
            let likes = document.createElement("p")
            likes.innerHTML = sorted[i].Likes
            let likes_icon = document.createElement("img")
            likes_icon.setAttribute("src", "img/blacklike.svg")
            likes_container.appendChild(likes)
            likes_container.appendChild(likes_icon)

            let author = document.createElement("p")
            author.innerHTML = "By: " + sorted[i].Author

            let date_container = document.createElement("div")
            date_container.classList.add("date-released")
            let date = document.createElement("p")
            date.innerHTML = sorted[i].Date.substring(0,10)
            let date_icon = document.createElement("img")
            date_icon.setAttribute("src", "img/blackdate.svg")

            date_container.appendChild(date)
            date_container.appendChild(date_icon)

            popular_stats.appendChild(likes_container)
            popular_stats.appendChild(author)
            popular_stats.appendChild(date_container)

            book_container.appendChild(book)
            book_container.appendChild(popular_stats)

            root.appendChild(book_container)
            
        }
        
    }
    
    GetBooks()

})
