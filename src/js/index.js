let offset = {}
let mouseDown = false
Array.prototype.forEach.call(document.getElementsByClassName('slider-container'), value => {
    //parse all of the sliders and use they id's as a key of a 'offset' object and a value as a actual offset from left side
    offset[value.children[0].id] = 0
    value.addEventListener('mousedown', event => onMouseDown(event))
    value.addEventListener('touchstart', event => onMouseDown(event))
    value.addEventListener('mouseup', event => onMouseUp(event))
    value.addEventListener('touchend', event => onMouseUp(event))
    value.addEventListener('mouseout', event => onMouseUp(event))
    value.addEventListener('mousemove', event => onMouseMove(event))
    value.addEventListener('touchmove', event => onMouseMove(event))
})
//triggering on mousedown event
function onMouseDown(event) {
    //getting coordinates
    let domRect = event.target.getBoundingClientRect()
    let clientX
    if (event.type === 'touchstart') {
        clientX = event.touches[0].clientX
    } else {
        clientX = event.clientX
    }
    mouseDown = clientX - (domRect.left + event.target.clientLeft)
}
//triggering on mousemove/touchmove events
function onMouseMove(event) {
    let id = event.target.children[0].id
    if (mouseDown) {
        let domRect = event.target.getBoundingClientRect()
        let clientX
        if (event.type === 'touchmove') {
            clientX = event.touches[0].clientX
        } else {
            clientX = event.clientX
        }
        let leftSide = clientX - (domRect.left + event.target.clientLeft)
        //remove last slide and prepend it in the beginning
        if (mouseDown < clientX - (domRect.left + event.target.clientLeft) && parseInt(event.target.children[0].style.left) >= 0) {
            let elem = event.target.children[0].children[event.target.children[0].children.length - 1].cloneNode()
            event.target.children[0].prepend(elem)
            event.target.children[0].removeChild(event.target.children[0].children[event.target.children[0].children.length - 1])
            offset[id] += -600
        }
        event.target.children[0].style.left = offset[id] + leftSide - mouseDown + 'px'
    }
}

//triggering on mouseup/touchend/mouseout events
function onMouseUp(event) {
    //do stuff in case mouseDown is not equals to false
    if (mouseDown) {
        let domRect = event.target.getBoundingClientRect()
        let id = event.target.children[0].id
        let clientX
        if (event.type === 'touchend') {
            clientX = event.changedTouches[0].clientX
        } else {
            clientX = event.clientX
        }
        //remove first slide and append it in the end of a img-childrens
        if (mouseDown > clientX - (domRect.left + event.target.clientLeft)) {
            if ((Math.abs(parseInt(offset[id])) + 600) / 600 === event.target.children[0].children.length - 1) {
                let elem = event.target.children[0].children[0].cloneNode()
                event.target.children[0].appendChild(elem)
                event.target.children[0].removeChild(event.target.children[0].children[0])
                animateSlider(event.target.children[0], offset[id], true, parseInt(event.target.children[0].style.left) - offset[id])
            } else {
                animateSlider(event.target.children[0], offset[id] - 600, true)
                offset[id] -= 600
            }

        } else if (mouseDown < clientX - (domRect.left + event.target.clientLeft)) {
            animateSlider(event.target.children[0], offset[id] + 600)
            offset[id] += 600
        }
    }
    mouseDown = false
}

// animation
function animateSlider(elem, destPos, left = false, currentPos) {
    if (!currentPos) {
        currentPos = parseInt(elem.style.left)
    }
    let id = setInterval(() => {
        if (currentPos === destPos) {
            clearInterval(id)
        } else {
            if (Math.abs(currentPos) >= 550 || Math.abs(currentPos) <= 50) {
                if (left) {
                    currentPos--
                } else {
                    currentPos++
                }
            } else {
                if (left) {
                    currentPos -= 10
                } else {
                    currentPos += 10
                }
            }
            elem.style.left = currentPos + 'px'
        }
    }, 1)
}