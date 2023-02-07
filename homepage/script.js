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

    $(".nav-btn").click(function(){
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
        location.href = '/book+authorlist/book_author.html'
    })



    /*  RestDB Database  */
    let booklist = []

    //initiating book object
    function Book(BookID, Title, Synopsis, Author, Likes, Dislikes, ReviewID, Date, BookCover, Genre, _id)
    {
        this.BookID = BookID,
        this.Title = Title,
        this.Synopsis = Synopsis,
        this.Author = Author,
        this.Likes = Likes,
        this.Dislikes = Dislikes,
        this.ReviewID = ReviewID,
        this.Date = Date,
        this.BookCover = BookCover,
        this.Genre = Genre,
        this._id = _id

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
        $.ajax(settings).done(async function (response) 
        {
            for(let i = 0; i < response.length; i++)
            {
                booklist.push
                (
                    new Book(
                        response[i].BookID, 
                        response[i].Title, 
                        response[i].Synopsis, 
                        response[i].Author, 
                        response[i].Likes, 
                        response[i].Dislikes, 
                        response[i].ReviewID,
                        response[i].Date,
                        response[i].BookCover,
                        response[i].Genre,
                        response[i]._id
                        )
                )
                
            }
            //add to localStorage for use in other pages
            localStorage.setItem("booklist", JSON.stringify(booklist)) 

            //wait for data initialization to finish before initiating popular booklist
            await popular() 
            await latest()
        })

        
    }

    let userlist = []

    function User(UserID, Username, Password, Email, Usertype, Datejoin, Likes, Profilepic, Liked, Publish, _id)
    {
        this.UserID = UserID,
        this.Username = Username,
        this.Password = Password,
        this.Email = Email,
        this.Usertype = Usertype,
        this.Datejoin = Datejoin,
        this.Likes = Likes,
        this.Profilepic = Profilepic,
        this.Liked = Liked,
        this.Publish = Publish,
        this._id = _id
    }

    async function GetUsers()
    {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://nathaninteractivedev-4002.restdb.io/rest/userdata",
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            },
        }


        $.ajax(settings).done(async function (response)
        {
            for(let i = 0; i < response.length; i++)
            {
                if(response[i].Liked != undefined)
                {
                    function CalcLiked(){
                        likedlist = []
                        for(let x  = 0; x < response[i].Liked.length; x++)
                        {
                            likedlist.push(
                                new Book(response[i].Liked[x].BookID, 
                                response[i].Liked[x].Title, 
                                response[i].Liked[x].Synopsis, 
                                response[i].Liked[x].Author, 
                                response[i].Liked[x].Likes,
                                response[i].Liked[x].Dislikes, 
                                response[i].Liked[x].ReviewID, 
                                response[i].Liked[x].Date, 
                                response[i].Liked[x].BookCover, 
                                response[i].Liked[x].Genre, 
                                response[i].Liked[x]._id)
                                )
                        }
                        return likedlist
                    }

                    function FindPublish(){
                        publishlist =[]
                        for(let x = 0; x < response[i].Publish.length; x++)
                        {
                            publishlist.push(
                                new Book(response[i].Publish[x].BookID, 
                                response[i].Publish[x].Title, 
                                response[i].Publish[x].Synopsis, 
                                response[i].Publish[x].Author, 
                                response[i].Publish[x].Likes,
                                response[i].Publish[x].Dislikes, 
                                response[i].Publish[x].ReviewID, 
                                response[i].Publish[x].Date, 
                                response[i].Publish[x].BookCover, 
                                response[i].Publish[x].Genre, 
                                response[i].Publish[x]._id)
                            )
                        }
                        return publishlist
                    }

                    userlist.push
                    (
                        new User(
                            response[i].UserID, 
                            response[i].Username, 
                            response[i].Password, 
                            response[i].Email, 
                            response[i].Usertype, 
                            response[i].Datejoin, 
                            response[i].Likes,
                            response[i].Profilepic,
                            CalcLiked(),
                            FindPublish(),
                            response[i]._id
                        )
                    )  
                }
                else
                {
                    continue
                }
                  
            }
            localStorage.setItem("userlist", JSON.stringify(userlist))
            await author() 
        })           
    }

    let reviewlist = []

    function Review(ReviewID, Review, UserID, _id){
        this.ReviewID = ReviewID,
        this.Review = Review,
        this.UserID = UserID,
        this._id = _id
    }

    function GetReviews()
    {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://nathaninteractivedev-4002.restdb.io/rest/review",
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            },
          }

          $.ajax(settings).done(async function (response)
          {
              for(let i = 0; i < response.length; i++)
              {
                  reviewlist.push
                  (
                      new Review(
                          response[i].ReviewID, 
                          response[i].Review, 
                          response[i].UserID, 
                          response[i]._id
                          )
                  )  
              }
              localStorage.setItem("reviewlist", JSON.stringify(reviewlist))
            })
    }

    

    function author()
    {
        
        let userlist = JSON.parse(localStorage.getItem("userlist"))
        let sorted = userlist.slice(0)
        sorted.sort(function(a,b)
        {
            return b.Likes - a.Likes
        })

        for (let i = 0; i < 4; i++)
        {
            if(sorted[i].Usertype = "Author")
            {
                let root = document.querySelector("#author")

                let container = document.createElement("div")
                container.classList.add("table-book-container")
                container.setAttribute("data-link", sorted[i].UserID)
                container.addEventListener('click', function(){
                let UserID = container.getAttribute("data-link")
                localStorage.setItem("UserID", UserID)
                location.href = '/homepage/author/author.html'
            })

                let profilepic = document.createElement("img")
                profilepic.setAttribute("src", "https://nathaninteractivedev-4002.restdb.io/media/" + sorted[i].Profilepic)
                profilepic.setAttribute("alt", "profile picture")
                profilepic.classList.add("table-book-cover")

                let description = document.createElement("div")
                description.classList.add("table-book-desc")
                
                let author = document.createElement("div")
                let authormsg = document.createElement("p")
                authormsg.innerHTML = "Made By"
                let authorname = document.createElement("p")
                authorname.innerHTML = sorted[i].Username

                author.appendChild(authormsg)
                author.appendChild(authorname)

                let stats = document.createElement("div")
                likes_container = document.createElement("div")
                likes_container.classList.add("likes")
                likes = document.createElement("p")
                likes.innerHTML = sorted[i].Likes
                like_icon = document.createElement("img")
                like_icon.setAttribute("src", "img/blacklike.svg")
                like_icon.setAttribute("alt", "Like Icon")
                like_icon.classList.add("like-icon")

                likes_container.appendChild(likes)
                likes_container.appendChild(like_icon)

                let date_container = document.createElement("div")
                date_container.classList.add("date-released")
                date = document.createElement("p")
                date.innerHTML = sorted[i].Datejoin.substring(0,10).replace("/", "-")
                date_icon = document.createElement("img")
                date_icon.setAttribute("src", "img/blackdate.svg")
                date_icon.setAttribute("alt", "Date Icon")
                date_icon.classList.add("date-icon")

                date_container.appendChild(date)
                date_container.appendChild(date_icon)

                stats.appendChild(likes_container)
                stats.appendChild(date_container)

                description.appendChild(author)
                description.appendChild(stats)

                container.appendChild(profilepic)
                container.appendChild(description)

                root.appendChild(container)
            }
            
        }                        
    }

    function popular()
    {
        let booklist = []
        booklist = JSON.parse(localStorage.getItem("booklist"))

        if(booklist == [])
        {
            popular()
        }

        else
        {
            let sorted = booklist.slice(0) //duplicates the list into a array that always adds the higher liked book
            sorted.sort(function(a,b)
            {     
                return b.Likes - a.Likes
            })

            for (let i = 0; i <= 10; i++)
            {
                let root = document.getElementById("popular")
                let book_container = document.createElement("div")
                book_container.classList.add("popular-book-container")
                book_container.setAttribute("data-link", sorted[i].BookID)
                book_container.addEventListener('click', function(){
                    let bookid = book_container.getAttribute("data-link")
                    localStorage.setItem("BookID", bookid)
                    location.href = '/homepage/book/book.html'
                })

                let book = document.createElement("div")
                book.classList.add("book")
                let book_cover = document.createElement("img")
                book_cover.setAttribute("src", "https://nathaninteractivedev-4002.restdb.io/media/" + sorted[i].BookCover)
                book_cover.classList.add("book-cover")
                let book_overlay = document.createElement("div")
                book_overlay.classList.add("book-overlay")
                book_overlay.setAttribute("data-link", sorted[i].BookID)
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
                popular_stats.setAttribute("data-link", sorted[i].BookID)

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
    }

    function latest(){
        let booklist = []
        booklist = JSON.parse(localStorage.getItem("booklist"))
        if (booklist == [])
        {
            latest()
        }
        else
        {
            let sorted = booklist.slice(0) //duplicates the list into a array that always adds the most recent book
            sorted.sort(function(a,b)
            {  
                let ms = 1000 * 60 * 60 * 24;
                let date1 = new Date(b.Date.substring(0,10).replace('-', '/'))
                let date2 = new Date(a.Date.substring(0,10).replace('-', '/'))
                clean_date1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
                clean_date2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())
                return Math.floor((date1/ms - date2/ms) )
            })
            for(let i = 0; i <= 10; i++)
            {
                let root = document.querySelector(".table-container-latest-popular")

                let container = document.createElement("div")
                container.classList.add("table-book-container")
                container.setAttribute("data-link", sorted[i].BookID)
                container.addEventListener('click', function(){
                    let bookid = container.getAttribute("data-link")
                    localStorage.setItem("BookID", bookid)
                    location.href = '/homepage/book/book.html'
                })

                let img = document.createElement("img")
                img.classList.add("table-book-cover")
                img.setAttribute("src", "https://nathaninteractivedev-4002.restdb.io/media/" + sorted[i].BookCover)
                img.setAttribute("alt", "book-cover")

                let desc = document.createElement("div")
                desc.classList.add("table-book-desc")

                let desc1 = document.createElement("div")
                let author = document.createElement("p")
                author.innerHTML = "By: " + sorted[i].Author
                let date_released = document.createElement("div")
                date_released.classList.add("date-released")
                let date = document.createElement("p")
                date.innerHTML = sorted[i].Date.substring(0,10).replace("/", "-")
                let date_icon = document.createElement("img")
                date_icon.setAttribute("src", "img/blackdate.svg")
                date_icon.setAttribute("alt", "date")

                date_released.appendChild(date)
                date_released.appendChild(date_icon)

                desc1.appendChild(author)
                desc1.appendChild(date_released)
                
                let desc2 = document.createElement("div")
                let like_container = document.createElement("div")
                like_container.classList.add("likes")
                let like = document.createElement("p")
                like.innerHTML = sorted[i].Likes
                let like_icon = document.createElement("img")
                like_icon.setAttribute("src", "img/blacklike.svg")
                like_icon.setAttribute("alt", "likes")
                let genre = document.createElement("p")
                genre.innerHTML = sorted[i].Genre

                like_container.appendChild(like)
                like_container.appendChild(like_icon)

                desc2.appendChild(like_container)
                desc2.appendChild(genre)

                desc.appendChild(desc1)
                desc.appendChild(desc2)

                container.appendChild(img)
                container.appendChild(desc)

            root.appendChild(container)
             
        }
    }}
    
    function loadUser(){
        if(JSON.parse(localStorage.getItem("user")) != null)
        {
            let user = JSON.parse(localStorage.getItem("user"))
            document.querySelector(".pfp").innerHTML = `<img src = ${user.Profilepic} width = "40">`
            document.querySelector(".pfp").style.borderRadius = "10px"
        }

        else
        {
            return
        }

    }
    

    GetBooks()
    GetUsers()
    GetReviews()
    loadUser()  
})
