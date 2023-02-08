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
        location.href = '/book+authorlist/book_author.html'
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
        console.log(BookID)
        console.log(booklist)
        console.log(userlist)
        console.log(reviewlist)
        const book = await GetBook(BookID, booklist)
        await AddDesc(book)
        await AddBookCover(book)
        await AddReviews(book)
        // await AddRecentlyViewed(book)
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
        console.log(book)
        let likes = 0
        for(let i = 0; i < userlist.length; i++)
        {
            for(let x = 0; x < userlist[i].Liked.length; x++)
            {
                if (userlist[i].Liked[x].BookID == book.BookID)
                {
                    likes += userlist[i].Liked[x].Likes
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

        book_desc.appendChild(title)
        book_desc.appendChild(synopsis)
        book_desc.appendChild(synopsis_text)

        book_data = document.createElement("div")
        book_data.classList.add("book-data")

        likes = document.createElement("h1")
        likes.innerHTML = "Likes: " + CalcLikes(book)

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

    async function AddRecentlyViewed(book)
    {
        recentlyViewedList = JSON.parse(localStorage.getItem("recentlyViewed"))
        if(recentlyViewedList.includes(book) == false)
        {   
            
            recentlyViewedList.push(book)
        }

        else
        {
            return
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

            console.log(jsonReviewData)
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


})