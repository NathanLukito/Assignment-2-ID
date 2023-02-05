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

        if(pass == ""|| name == ""){
            alert("Please fill up all of the fields!")
        }

        else{
            let userList = JSON.parse(localStorage.getItem("userlist"))

            for (let i = 0; i < userList.length; i++)
            {
                if (name == userList[i].Username && pass == userList[i].Password)
                {
                    
                    document.querySelector(".login-btn").setAttribute("value", "Logging in...")
                    document.querySelector(".login-btn").style.backgroundColor = "rgba(27,185,157,0.6)"
                    setTimeout(function(){
                        location.href = "/homepage/index.html"
                    },1000)
                   
                }
    
                else if (name != userList[i].Username || pass != userList[i].Password)
                {
                    continue
                }
            }
        }

    })

    document.querySelector("#Username").addEventListener("focus", function(){
        setWidthUsername(100)
    })

    document.querySelector("#Username").addEventListener("blur", function(){
        setWidthUsername(0)
    })

    document.querySelector("#Password").addEventListener("focus", function(){
        setWidthPassword(100)
    })

    document.querySelector("#Password").addEventListener("blur", function(){
        setWidthPassword(0)
    })

    function setWidthUsername(value){
        document.querySelector(".bottom-border-username").style.width = value + "%";
        document.querySelector(".bottom-border-username").style.backgroundColor = "rgba(27,185,157,255)"
    }

    function setWidthPassword(value){
        document.querySelector(".bottom-border-password").style.width = value + "%";
        document.querySelector(".bottom-border-password").style.backgroundColor = "rgba(27,185,157,255)"
    }
})