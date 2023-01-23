$(document).ready(function(){
    function clear(){
        localStorage.clear()
    }
    clear()
    // const slider = $(".popular-container")
    // let isDown = false
    // let startX;
    // let scrollLeft;

    // slider.mousedown(function (e) { 
    //     isDown = true
    //     slider.addClass('scroll-active')
    //     startX = e.pageX
    //     scrollLeft = slider.scrollLeft
    // });

    // slider.mouseleave(function () { 
    //     isDown = false
    //     slider.removeClass('scroll-active')
    // });

    // slider.mouseup(function () { 
    //     isDown = false
    //     slider.removeClass('scroll-active')
    // });

    // slider.mousemove(function (e) { 
    //     if(!isDown) return
    //     e.preventDefault()
    //     const x = e.pageX
    //     const scroll = (x - startX) * 3;
    //     slider.scrollLeft = scrollLeft - scroll
    // });

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


    /*  RestDB Database  */
    booklist = []
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
            localStorage.setItem("booklist", JSON.stringify(booklist))

            let newbooklist = JSON.parse(localStorage.getItem(localStorage.key(0)))
            await popular() //wait for this to finish before initiating second booklist
            
        })

        
    }

    function popular(){
        
        let booklist = JSON.parse(localStorage.getItem(localStorage.key(0)))
        let htmlbooklist = document.getElementById("popular")
        let popularchildren = htmlbooklist.children

        let sorted = booklist.slice(0) //sort by highest likes
        sorted.sort(function(a,b){
            return b.Likes - a.Likes
        })

        for (let i = 0; i < 20; i++)
        {
            console.log(sorted[i])
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
            let likes = document.createElement("p")
            likes.innerHTML = "Likes: " + sorted[i].Likes
            let author = document.createElement("p")
            author.innerHTML = "Author: " + sorted[i].Author
            let date = document.createElement("p")
            date.innerHTML = "Date: " + sorted[i].Date.substring(0,10);

            popular_stats.appendChild(likes)
            popular_stats.appendChild(author)
            popular_stats.appendChild(date)

            book_container.appendChild(book)
            book_container.appendChild(popular_stats)

            root.appendChild(book_container)
            // let likes = popularchildren[i].querySelector("#likes")
            // likes.innerHTML = "Likes: " + sorted[i].Likes
        }
        
    }
    
    GetBooks()

})
