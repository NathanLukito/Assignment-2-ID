$(document).ready(function(){
    let password = document.querySelector("#password-field");
    let strengthContainer = document.querySelector(".strengthContainer");
    let strengthBar = document.querySelector("#strength-bar");
    let strengthText = document.querySelector(".strength-text");

    password.addEventListener("focus", function(){
        $(".strengthContainer").css("display", "flex")
    });

    password.addEventListener("blur", function(){
        $(".strengthContainer").css("display", "none")
    });

    function setStrength(value){
        strengthBar.style.width = value + "%";
    }

    function setColorAndText(color, text){
        $("#strength-bar").css("background-color", color)
        strengthText.innerHTML = text;
        $(".strength-text").css("color", color)

    }

    function clearStrength(){
        strengthBar.style.width = 0 + "%";
        $(".strength-bar").css("background-color", "")
        strengthText.innerHTML = "";

    }

    password.addEventListener("keyup", checkPasswordStrength);

    function checkPasswordStrength(){
        let strength = 0;

        if(password.value == ""){
            clearStrength();
            return false;
        }

        if(password.value.match(/\s/)){
            setColorAndText("red", "White space is not allowed");
            return false;
        }

        if(password.value.match(/<|>/)){
            setColorAndText("red", "< > characters are not allowed");
            return false;
        }

        if(password.value.length > 15){
            setColorAndText("red", "Password is greater than 15 characters");
            return false;
        }

        if(password.value.length < 7){
            strength = 20;
            setColorAndText("red", "Password is too short");
        }else{
            let lowerCase = password.value.match(/[a-z]/);
            let upperCase = password.value.match(/[A-Z]/);
            let numbers = password.value.match(/[0-9]/);
            let specialCharacters = password.value.match(/[\!\~\@\&\#\$\%\^\&\*\(\)\{\}\?\-\_\+\=]/);

            //Weak password
            if(lowerCase || upperCase || numbers || specialCharacters)
            {
                strength = 40;
                setColorAndText("red", "Weak");
            }

            //Medium password
            if( 
                (lowerCase && upperCase) || (lowerCase && numbers) || (lowerCase && specialCharacters) ||
                (upperCase && numbers) || (upperCase && specialCharacters) || (numbers && specialCharacters)
            )

            {
                strength = 60;
                setColorAndText("orange", "Medium");
            }

            //Strong password
            if(
                (lowerCase && upperCase && numbers) || (lowerCase && upperCase && specialCharacter) ||
                (lowerCase && numbers && specialCharacters) || (upperCase && numbers && specialCharacters)
            )
            {
                strength = 80;
                setColorAndText("#088f08", "Strong");
            }

            //Very strong password
            if(
                (lowerCase && upperCase && numbers && specialCharacters)
            )
            {
                strength = 100;
                setColorAndText("green", "Very Strong");
            }
        }

        setStrength(strength);
    }
})