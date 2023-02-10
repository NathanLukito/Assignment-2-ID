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
        window.location.href = '/Book-Sommeliers/book+authorlist/book_author.html'
    })

    var author = JSON.parse(localStorage.getItem("user"))
    var booklist = JSON.parse(localStorage.getItem("booklist"))
    var userlist = JSON.parse(localStorage.getItem("userlist"))
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
            function Book(BookID, Title, Synopsis, Author, Likes, Dislikes, ReviewID, Date, BookCover, Genre)
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
                this.Genre = Genre
            }
            let newbook = new Book(max, Title, Synopsis, author.Username, 0, 0, `${day}/${month}/${year}`, Bookcover, 0, Genre)
            author.Publish.push(newbook)
            var userdata = {
                "UserID": author.UserID,
                "Username": author.Username,
                "Password": author.Password,
                "Email": author.Email,
                "Usertype": author.Usertype,
                "Datejoin": author.Likes,
                "Profilepic": author.Profilepic,
                "Liked": author.Liked,
                "Publish": author.Publish
            }

            function User(UserID, Username, Password, Email, Usertype, Datejoin, Likes, Profilepic, Liked, Publish)
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
                this.Publish = Publish
            }
            let newuser = new User(author.UserID,author.Username,author.Password,author.Email,author.Usertype,author.Datejoin, author.Likes,author.Profilepic,author.Liked,author.Publish)
            localStorage.setItem("User", JSON.stringify(newuser))
            for(let i = 0; i < userlist.length; i++)
            {
                if(userlist[i].UserID == author.UserID)
                {
                    userlist[i] = newuser
                    localStorage.setItem("userlist", JSON.stringify(userlist))
                }
            }
            var usersettings = {
                "async": true,
                "crossDomain": true,
                "url": "https://nathaninteractivedev-4002.restdb.io/rest/userdata/" + author._id,
                "method": "PUT",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": "63b3e1aa969f06502871a8c1",
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(userdata),
                "error": function(){
                    alert("Publish did not work, please try again")
                    $(".load").css("width", 0)
                    setTimeout(function(){
                        $(".load").css("display", "none")
                    })
                }
                }
            $.ajax(usersettings).done(function (response) {})
            $.ajax(settings).done(function(){
                $(".load").css("width", 0)
                setTimeout(function(){
                    $(".load").css("display", "none")
                })
                alert("Book Published")
                document.querySelector("form").reset()
                window.location.href = "/Book-Sommeliers/user/user.html"
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