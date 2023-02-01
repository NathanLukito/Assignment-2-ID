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

    $(".login-btn").click(function(){
        event.preventDefault()
        let name = $("#Username").val();
        let pass = $("#Password").val();

        let userList = JSON.parse(localStorage.getItem("userlist"))

        for (let i = 0; i < userList.length; i++)
        {
            if (name == userList[i].Username && pass == userList[i].Password)
            {
                
                document.querySelector(".login-btn").setAttribute("value", "Logging in...")  
                setTimeout(function(){
                    location.href = "/homepage/index.html"
                },1000)
               
            }

            else if (name != userList[i].Username || pass != userList[i].Password)
            {
                continue
            }
        }
    })
})