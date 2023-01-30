$(document).ready(function(){
    $(".login-btn").click(function(){
        let name = $("#Username").val();
        let pass = $("#Password").val();

        let userList = JSON.parse(localStorage.getItem(localStorage.key(1)))
        
        for (let i = 0; i < userList.length; i++)
        {
            if (name == userList[i].Username && pass == userList[i].Password)
            {
                alert("hello")
            }

            else if(name == userList[i].Username && pass != userList[i].Password){
                alert("Wrong password was entered")
            }

            else if(name != userList[i].Username && pass == userList[i].Password){
                alert("Wrong username was entered")
            }

            else if (name != userList[i].Username && pass == userList[i].Password){
                alert("Wrong password and username was entered")
            }
        }
    })
})