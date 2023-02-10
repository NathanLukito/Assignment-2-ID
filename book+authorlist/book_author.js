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
        window.location.href = '/book+authorlist/book_author.html'
    })

    

    let booklist = []
    let userlist = []
    userlist = JSON.parse(localStorage.getItem("userlist"))
    booklist = JSON.parse(localStorage.getItem("booklist"))
    let searchfor = localStorage.getItem("search")
    document.querySelector(".searchfor").innerHTML = "Searched for: " + searchfor

    
    for(let i = 0; i < booklist.length; i++)
    {
        function CalcLikes(){
            let likes = 0
            for(let x = 0; x < userlist.length; x++)
            {
                for(let a = 0; a < userlist[x].Liked.length; a++)
                {
                    if (userlist[x].Liked[a].BookID == booklist[i].BookID)
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
        if(searchfor == null)
        {
            root = document.querySelector(".booklist")
            let book_container = document.createElement("div")
            book_container.classList.add("book-container")
            book_container.setAttribute("data-link", booklist[i].BookID)
            book_container.addEventListener('click', function(){
                let bookid = book_container.getAttribute("data-link")
                localStorage.setItem("BookID", bookid)
                window.location.href = '/book/book.html'
            })                
            book_container.innerHTML = 
            ` 
                <div class = "book">
                    <h1>${booklist[i].Title}</h1>
                    <img class = "book-cover" src = "https://nathaninteractivedev-4002.restdb.io/media/${booklist[i].BookCover}">
                    <p class = "synopsis">${booklist[i].Synopsis}</p>
                </div>
                <div class = "book-details">
                    <h1>${CalcLikes()} Likes</h1>
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
                window.location.href = '/book/book.html'
            })                
            book_container.innerHTML = 
            ` 
                <div class = "book">
                    <h1>${booklist[i].Title}</h1>
                    <img class = "book-cover" src = "https://nathaninteractivedev-4002.restdb.io/media/${booklist[i].BookCover}">
                    <p class = "synopsis">${booklist[i].Synopsis}</p>
                </div>
                <div class = "book-details">
                    <h1>${CalcLikes()} Likes</h1>
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

    for(let i = 0; i < userlist.length; i++)
    {
        if(searchfor == null && userlist[i].Usertype == "Author")
        {
            function CalcBooks(){
                let total = [0,0]
                for(let i = 0; i < userlist.length; i++)
                {
                    for(let x = 0; x < userlist[i].Publish[x].length; x++)
                    {
                        total[0] += userlist[i].Publish[x].Likes
                        total[1] ++
                    }
                }
                return total
            }

            root = document.querySelector(".authorlist")
            let author = document.createElement("div")
            author.classList.add("author")
            author.setAttribute("data-link", userlist[i].UserID)
            author.addEventListener('click', function(){
                let userid = book_container.getAttribute("data-link")
                localStorage.setItem("UserID", userid)
                window.location.href = '/author/author.html'
            })                
            author.innerHTML = 
            ` 
                
                    <div class = "author-identity">
                        <h1 class = "author-name">${userlist[i].Username}</h1>
                        <img class = "profilepic"src = "https://nathaninteractivedev-4002.restdb.io/media/${userlist[i].Profilepic}" width = "50">
                    </div>
                    <div class = "author-details">
                        <h1>${CalcBooks()[0]} Likes</h1>
                        <h1>Datejoined ${userlist[i].Datejoin.substring(0,10).replace("/", "-")}</h1>
                        <h1>${CalcBooks()[1]}</h1>
                    </div>

            `
            root.appendChild(author)
        }

        else if((userlist[i].Username.toUpperCase().replaceAll(" ", "")).includes(searchfor.toUpperCase().replaceAll(" ", "")) == true && userlist[i].Usertype == "Author")
        {
            function CalcBooks(){
                let total = [0,0]
                for(let x = 0; x < userlist[i].Publish.length; x++)
                {
                    total[0] += userlist[i].Publish[x].Likes
                    total[1] ++
                }
                return total
            }
            root = document.querySelector(".authorlist")
            let author = document.createElement("div")
            author.classList.add("author")
            author.setAttribute("data-link", userlist[i].UserID)
            author.addEventListener('click', function(){
                let userid = author.getAttribute("data-link")
                localStorage.setItem("UserID", userid)
                window.location.href = '/author/author.html'
            })                
            author.innerHTML = 
            `  
                <div class = "author-identity">
                    <h1 class = "author-name">${userlist[i].Username}</h1>
                    <img class = "profilepic"src = "https://nathaninteractivedev-4002.restdb.io/media/${userlist[i].Profilepic}" width = "50">
                </div>
                <div class = "author-details">
                    <h1>${CalcBooks()[0]} Likes</h1>
                    <h1>Datejoined ${userlist[i].Datejoin.substring(0,10).replace("/", "-")}</h1>
                    <h1>${CalcBooks()[1]} Books</h1>
                </div> 
            `
            root.appendChild(author)
        }
        
        else
        {
            continue
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