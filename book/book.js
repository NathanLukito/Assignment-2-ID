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
        window.location.href = '/Assignment-2-ID/book+authorlist/book_author.html'
    })

    let booklist = []
    let userlist = []
    let reviewlist = []
    init_data()
    async function init_data(){
        const BookID = JSON.parse(localStorage.getItem("BookID"))
        booklist = JSON.parse(localStorage.getItem("booklist"))
        userlist = JSON.parse(localStorage.getItem("userlist"))
        reviewlist = JSON.parse(localStorage.getItem("reviewlist"))
        const book = await GetBook(BookID, booklist)
        await AddDesc(book)
        await AddBookCover(book)
        await AddReviews(book)
        await AddReview()
    }
    
    async function GetBook(BookID, booklist){
        for(let i = 0; i < booklist.length; i++){
            if(booklist[i].BookID == BookID){
                return booklist[i];
            }
            else
            {
                continue;
            }
        }
    }

    function CalcLikes(book){
        let likes = 0
        for(let i = 0; i < userlist.length; i++)
        {
            for(let x = 0; x < userlist[i].Liked.length; x++)
            {
                if (userlist[i].Liked[x].BookID == book.BookID)
                {
                    likes += 1
                }
                else
                {
                    continue
                }
            }
        }
        return likes
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

        speech_container = document.createElement("button")
        speech_container.classList.add("read")
        speech_container.innerHTML = 
        `
        <p>Read</p>
        <lottie-player class = "read-anim" src="https://assets1.lottiefiles.com/packages/lf20_jxiw7p9v.json"  background="transparent"  speed="1" loop autoplay></lottie-player>
        `
        speech_container.addEventListener('click', function(){
        responsiveVoice.speak(book.Synopsis)
        })

        book_desc.appendChild(title)
        book_desc.appendChild(speech_container)
        book_desc.appendChild(synopsis)
        book_desc.appendChild(synopsis_text)

        book_data = document.createElement("div")
        book_data.classList.add("book-data")

        likes = document.querySelector(".like-container")
        likes.innerHTML = "Likes:" + CalcLikes(book) +
        `
            <button type = "submit" class = "submit-like">
                <img class = "like-icon" src = "/Assignment-2-ID/img/blacklike.svg">
            </button>
        `

        genre = document.createElement("h1")
        genre.innerHTML = "Genre: " + book.Genre



        book_data.appendChild(likes)
        
        book_data.appendChild(genre)

        root.appendChild(book_desc)
        root.appendChild(book_data)

        function sendLikesSet(LikesData){
            let user = JSON.parse(localStorage.getItem("user"))
            const APIKEY = "63b3e1aa969f06502871a8c1"
            let settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://nathaninteractivedev-4002.restdb.io/rest/userdata/" + user._id,
                "method": "PUT",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": APIKEY,
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(LikesData)
            }
    
            $.ajax(settings).done(function (){
            })
        }

        $(".submit-like").click(function(){
            event.preventDefault()
            let bookid = JSON.parse(localStorage.getItem("BookID"))
            let user = JSON.parse(localStorage.getItem("user"))
            let likedCheck = 0
            for(let i = 0; i < booklist.length; i++)
            {
                if(bookid == booklist[i].BookID)
                {
                    for(let j = 0; j < userlist.length; j++)
                    {
                        if(user.UserID == userlist[j].UserID)
                        {
                            for(let k = 0; k < userlist[j].Liked.length; k++)
                            {
                                if(userlist[j].Liked[k].BookID == bookid)
                                {
                                    likedCheck += 1
                                }

                            }

                            if(likedCheck == 0)
                            {
                                userlist[j].Liked.push(booklist[i])
                                localStorage.setItem("userlist",JSON.stringify(userlist))
                                localStorage.setItem("user",JSON.stringify(userlist[j]))
                                user_liked_list = CalcLiked()

                                let jsonLikedData = {
                                    "Datejoin" : userlist[j].Datejoin,
                                    "Email"  : userlist[j].Email,
                                    "Liked"  : userlist[j].Liked,
                                    "Likes"  : userlist[j].Likes,
                                    "Password": userlist[j].Password,
                                    "Profilepic": userlist[j].Profilepic,
                                    "Publish" : userlist[j].Publish,
                                    "UserID" : userlist[j].UserID,
                                    "Username" : userlist[j].Username,
                                    "Usertype" : userlist[j].Usertype,
                                    "_id" : userlist[j]._id
                                    
                                }

                                sendLikesSet(jsonLikedData)
                                
                            }

                            else{
                                alert("You have already liked this book")
                            }

                        }
                    }
                }
            }

        })



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
            if(book.BookID == reviewlist[i].BookID)
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

    function sendReviewSet(reviewData){
        const APIKEY = "63b3e1aa969f06502871a8c1"
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://nathaninteractivedev-4002.restdb.io/rest/review",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(reviewData)
        }

        $.ajax(settings).done(function (){
            window.location.reload();
        })
    }

    $(".submit-review-btn").click(function(){
        event.preventDefault()
        let review_content = $(".book-review").val();
        let user = JSON.parse(localStorage.getItem("user"))
        let bookid = JSON.parse(localStorage.getItem("BookID"))
        if(review_content == ""){
            alert("Please fill in the review form!")
        }

        else{
            let jsonReviewData = {
                "BookID": bookid,
                "Review": review_content,
                "UserID": user.UserID
            }
            sendReviewSet(jsonReviewData)

            document.querySelector("#form").reset();
            document.querySelector(".submit-review-btn").setAttribute("value", "Submitting...")  
            document.querySelector(".submit-review-btn").style.backgroundColor = "rgba(27,185,157,0.6)"
        }

        
    })
    async function AddReview()
    {
        document.querySelector(".book-review").addEventListener("focus", function(){
            setWidthReview(100)
        })
    
        document.querySelector(".book-review").addEventListener("blur", function(){
            setWidthReview(0)
        })
        function setWidthReview(value){
            document.querySelector(".bottom-border-review").style.width = value + "%";
            document.querySelector(".bottom-border-review").style.backgroundColor = "rgba(27,185,157,255)"
        }
    }

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

    function CalcLiked(){
        likedlist = []
        let user = JSON.parse(localStorage.getItem("user"))
        let bookid = JSON.parse(localStorage.getItem("BookID"))
        for(let j = 0; j < userlist.length; j++)
        {
            if(userlist[j].UserID == user.UserID)
            {
                for(let x  = 0; x < userlist[j].Liked.length; x++)
                {
                    if(userlist[j].Liked[x].BookID == bookid)
                    {
                        likedlist.push(
                            new Book(userlist[j].Liked[x].BookID, 
                            userlist[j].Liked[x].Title, 
                            userlist[j].Liked[x].Synopsis, 
                            userlist[j].Liked[x].Author, 
                            userlist[j].Liked[x].Likes,
                            userlist[j].Liked[x].Dislikes, 
                            userlist[j].Liked[x].ReviewID, 
                            userlist[j].Liked[x].Date, 
                            userlist[j].Liked[x].BookCover, 
                            userlist[j].Liked[x].Genre, 
                            userlist[j].Liked[x]._id)
                            )
                    }
        
                }
                return likedlist
            }
        }

    }
    function loadUserNavPfp(){
        if(JSON.parse(localStorage.getItem("user")) != null)
        {
            let user = JSON.parse(localStorage.getItem("user"))
            document.querySelector(".profile").innerHTML = `<img src = "https://nathaninteractivedev-4002.restdb.io/media/${user.Profilepic}" class = "nav-pfp">`
        }

        else
        {
            return
        }

    }
    loadUserNavPfp()
})