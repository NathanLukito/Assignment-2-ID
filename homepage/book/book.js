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
            console.log($(".nav-btn"))
        }

        $(".icon1").toggleClass("topAnim")
        $(".icon2").toggleClass("midAnim")
        $(".icon3").toggleClass("botAnim")
    })

    /*Initiating Data*/
    let booklist = []
    let userlist = []
    booklist = JSON.parse(localStorage.getItem("booklist"))
    userlist= JSON.parse(localStorage.getItem("userlist"))

    let BookID = JSON.parse(localStorage.getItem("BookID"))
    function getBook(BookID, booklist){
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
    let book = getBook(BookID, booklist)
})