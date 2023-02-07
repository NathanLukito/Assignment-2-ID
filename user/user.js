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
            document.querySelector(".pfp").innerHTML = `<img src = ${user.Profilepic} width = "40">`
            document.querySelector(".pfp").style.borderRadius = "10px"
        }

        else
        {
            return
        }

    }

    function loadUserPfp(){
        if(JSON.parse(localStorage.getItem("user")) != null){
            let user = JSON.parse(localStorage.getItem("user"))
            document.querySelector(".profile-pic").innerHTML = `<img src = ${user.Profilepic}>`

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
            
            document.querySelector(user-likes).innerHTML = 
            `
                <div class = "books-liked>
                    <h1> Books Liked </h1>


            `
        }
    }

    loadUserNavPfp()
    loadUserPfp()
})