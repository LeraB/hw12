var offset = {
    offset1: 0,
    offset2: 0,
    offset3: 0,
    offset4: 0
};

var mouseDown = false

Array.prototype.forEach.call(document.getElementsByClassName('slider-container'), function (value) {
    value.addEventListener('mousedown', function (event) {
        var domRect = event.target.getBoundingClientRect()
        mouseDown = event.clientX - (domRect.left + event.target.clientLeft)
    })

    value.addEventListener('mouseup', function () {
        var domRect = event.target.getBoundingClientRect()
        var id = event.target.children[0].id
        if (mouseDown > event.clientX - (domRect.left + event.target.clientLeft)) {
            if ((Math.abs(parseInt(offset[id])) + 600) / 600 === event.target.children[0].children.length) {
                event.target.children[0].style.left = 0 + 'px'
                offset[id] = 0
            } else {
                event.target.children[0].style.left = offset[id] - 600 + 'px'
                offset[id] -= 600
            }
        } else if (mouseDown < event.clientX - (domRect.left + event.target.clientLeft)){
            if (parseInt(offset[id]) === 0) {
                event.target.children[0].style.left = -Math.abs(event.target.children[0].children.length * 600) + 600 + 'px'
                offset[id] = -Math.abs(event.target.children[0].children.length * 600) + 600
            } else {
                event.target.children[0].style.left = offset[id] + 600 + 'px'
                offset[id] += 600
            }
        }
        mouseDown = false
    })

    value.addEventListener('mouseout', function () {
        event.target.children[0].style.left = offset[event.target.children[0].id] + 'px'
        mouseDown = false
    })

    value.addEventListener('mousemove', function (event) {
        var id = event.target.children[0].id
        if (mouseDown) {
            var domRect = event.target.getBoundingClientRect()
            var leftSide = event.clientX - (domRect.left + event.target.clientLeft)

            event.target.children[0].style.left = offset[id] + leftSide - mouseDown + 'px'
        }
    })
})
