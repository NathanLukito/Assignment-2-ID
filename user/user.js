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
        location.href = '/booklist/booklist.html'
    })

    function loadUserNavPfp(){
        if(JSON.parse(localStorage.getItem("user")) != null)
        {
            let user = JSON.parse(localStorage.getItem("user"))
            document.querySelector(".profile").innerHTML = `<img src = "https://nathaninteractivedev-4002.restdb.io/media/${user.Profilepic}" width = "60">`
        }

        else
        {
            return
        }

    }

    function loadUserPfp(){
        if(JSON.parse(localStorage.getItem("user")) != null){
            let user = JSON.parse(localStorage.getItem("user"))
            document.querySelector(".profile-pic").innerHTML = `<img src = "https://nathaninteractivedev-4002.restdb.io/media/${user.Profilepic}" width = "100px">`

            document.querySelector(".profile-name").innerHTML = user.Username
        }

        else
        {
            return
        }
    }

    function loadUserData(){
        if(JSON.parse(localStorage.getItem("user")) != null){
            let user = JSON.parse(localStorage.getItem("user"))
            for(let i = 0; i < user.Liked.length; i++)
            {
                if(user.Liked.length != 0)
                {
                    root = document.querySelector(".books-liked-title")
                    let book_container = document.createElement("div")
                    book_container.classList.add("book-container")

                    book_container.innerHTML =
                    `
                            <h2>Book Title: ${user.Liked[i].Title}<h2>
                            <img class = "book-cover" src = "https://nathaninteractivedev-4002.restdb.io/media/${user.Liked[i].BookCover}" width = "60">

                    `

                    root.appendChild(book_container)
                }

                else{
                    document.querySelector(user-likes).innerHTML = 
                    `
                        <div class = "books-liked>
                            <h1> Books Liked: No liked books</h1>
        
        
                    `
                }

            }

        }
    }

    loadUserNavPfp()
    loadUserPfp()
    loadUserData()
})