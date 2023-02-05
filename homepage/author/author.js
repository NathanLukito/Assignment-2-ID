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

    let userlist = []
    let booklist = []
    const AuthorID = localStorage.getItem("UserID")
    userlist = JSON.parse(localStorage.getItem("userlist"))
    booklist = JSON.parse(localStorage.getItem("booklist"))
    function FindAuthor(){
        for(let i = 0; i < userlist.length; i++)
        {
            if (userlist[i].UserID == AuthorID)
            {
                return userlist[i]
            }
            else
            {
                continue
            }
        }
    }

    const author = FindAuthor()

    function CalcBooks(){
        let total = [0,0]
        for(let i = 0; i < booklist.length; i++)
        {
            if (author.UserID == booklist[i].AuthorID)
            {
                total[0] ++
                total[1] += booklist[i].Likes
            }
            else
            {
                continue
            }
        }
        return total
    }
    const TotalBooks = CalcBooks()

    function loadAuthor(){
        let root = document.querySelector(".author-container")

        let profilepic  = document.createElement("img")
        profilepic.src = "https://nathaninteractivedev-4002.restdb.io/media/" + author.Profilepic
        profilepic.classList.add("profilepic")

        let details = document.createElement("div")
        details.classList.add("author-details")
        details.innerHTML = 
        `
        <h1>${author.Username}</h1>
        <h1>${author.Datejoin.substring(0,10).replace("/", "-")}</h1>
        <h1>Total Books: ${TotalBooks[0]}</h1>
        <h1>Total Likes: ${TotalBooks[1]}</h1>
        `
        
        root.appendChild(profilepic)
        root.appendChild(details)
    }

    function loadBooks(){
        for(let i = 0; i < booklist.length; i++)
        {
            if(author.UserID == booklist[i].UserID)
            {
                let root = document.querySelector(".book-container")
                let book = document.createElement("div")
                books.classList.add("book")
                book.innerHTML = 
                `
                <img class = "book-image" src = "https://nathaninteractivedev-4002.restdb.io/media/${booklist[i].BookCover}">
                <div class = "book-details">
                   <h1>${booklist[i].Likes}</h1>
                   <h1>${booklist[i].Date}</h1>
                </div>
                `
                root.appendChild(root)
            }
            else
            {
                continue
            }
        }
    }
    loadAuthor()
    loadBooks()
})
