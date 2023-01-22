$(document).ready(function(){
    const slider = $(".popular-container")
    let isDown = false
    let startX;
    let scrollLeft;

    slider.mousedown(function (e) { 
        isDown = true
        slider.addClass('scroll-active')
        startX = e.pageX
        scrollLeft = slider.scrollLeft
    });

    slider.mouseleave(function () { 
        isDown = false
        slider.removeClass('scroll-active')
    });

    slider.mouseup(function () { 
        isDown = false
        slider.removeClass('scroll-active')
    });

    slider.mousemove(function (e) { 
        if(!isDown) return
        e.preventDefault()
        const x = e.pageX
        const scroll = (x - startX) * 3;
        slider.scrollLeft = scrollLeft - scroll
    });

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
    
})
