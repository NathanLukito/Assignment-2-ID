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
        location.href = '/book+authorlist/book_author.html'
    })

    var author = JSON.parse(localStorage.getItem("user"))
    var booklist = JSON.parse(localStorage.getItem("booklist"))
    let ids = booklist.map(object => {
        return object.BookID;
    })
    let max = Math.max(...ids) + 1
    $(".submit").click(function(){
        event.preventDefault()
        $(".load").css("display", "block")
        $(".load").css("width", 40)
        let Title = $("#title").val()
        let Genre = $("#genre").val()
        let Synopsis = $("#synopsis").val()
        let Bookcover = $("#bookcover").val().replace(/^.*\\/, "");
        const date = new Date()
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        // console.log(max)
        // console.log(Title)
        // console.log(Synopsis)
        // console.log(author.Username)
        // console.log(Title)
        // console.log(Title)
        // console.log(Title)
        // console.log(Title)
        // console.log(Title)
        // console.log(Title)
        if(Title != null && Genre != null && Synopsis != null && Bookcover != null)
        {
            var jsondata = {
                "BookID": max,
                "Title": Title,
                "Synopsis": Synopsis,
                "Author": author.Username,
                "Likes": 0,
                "Dislikes": 0,
                "Date": `${day}/${month}/${year}`,
                "BookCover": Bookcover,
                "ReviewID": 0,
                "Genre": Genre
            };

            console.log(jsondata)
            var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://nathaninteractivedev-4002.restdb.io/rest/book",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "63b3e1aa969f06502871a8c1",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata),
            "error": function(){
                alert("Publish did not work, please try again")
                $(".load").css("width", 0)
                setTimeout(function(){
                    $(".load").css("display", "none")
                })
            }
            }

            $.ajax(settings).done(function(){
                $(".load").css("width", 0)
                setTimeout(function(){
                    $(".load").css("display", "none")
                })
                alert("Book Published")
                document.querySelector("form").reset()
                location.href = "/user/user.html"
            });
        }
        else
        {
            alert("Form is incomplete")
        }
    })
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