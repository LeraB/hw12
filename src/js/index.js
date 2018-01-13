var sliders = document.getElementsByClassName('slider-container')

var mouseDown = false

Array.prototype.forEach.call(sliders, function (value) {
    value.addEventListener('mousedown', function (event) {
        var domRect = event.target.getBoundingClientRect()
        mouseDown = event.clientX - (domRect.left + event.target.clientLeft)
    })

    value.addEventListener('mouseup', function () {
        mouseDown = false
    })

    value.addEventListener('mouseout', function () {
        mouseDown = false
    })

    value.addEventListener('mousemove', function (event) {
        if (mouseDown) {
            var domRect = event.target.getBoundingClientRect()
            var leftSide = event.clientX - (domRect.left + event.target.clientLeft)
            event.target.children[0].style.left = leftSide - mouseDown + 'px'
        }
    })
})
