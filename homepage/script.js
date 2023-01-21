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
})
