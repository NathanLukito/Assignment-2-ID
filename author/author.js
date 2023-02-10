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
        window.location.href = '/Book-Sommeliers/book+authorlist/book_author.html'
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

    function CalcData(){
        let total = [0,0]
        for(let i = 0; i < author.Publish.length; i++)
        {
            total[0] ++
            total[1] += author.Publish[i].Likes
        }
        return total
    }

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
        <h1>Total Books: ${CalcData(author)[0]}</h1>
        <h1>Total Likes: ${CalcData(author)[1]}</h1>
        `
        
        root.appendChild(profilepic)
        root.appendChild(details)
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

    function loadBooks(){
        for(let i = 0; i < author.Publish.length; i++)
        {
            let root = document.querySelector(".book-container")
            let book = document.createElement("div")
            book.classList.add("book")
            book.setAttribute("data-link", author.Publish[i].BookID)
            book.addEventListener('click', function(){
                let bookid = book.getAttribute("data-link")
                localStorage.setItem("BookID", bookid)
                window.location.href = '/Book-Sommeliers/book/book.html'
            })
            book.innerHTML = 
            `
            <img class = "book-image" src = "https://nathaninteractivedev-4002.restdb.io/media/${author.Publish[i].BookCover}">
            <div class = "book-details">
                <h1>${author.Publish[i].Likes} Likes</h1>
                <h1>${author.Publish[i].Date.substring(0,10).replace("/", "-")}</h1>
            </div>
            `
            root.appendChild(book)
        }
    }
    loadAuthor()
    loadBooks()
    loadUserNavPfp()
})
