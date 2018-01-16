let offset = {}
let mouseDown = false
Array.prototype.forEach.call(document.getElementsByClassName('slider-container'), value => {
    offset[value.children[0].id] = 0
    value.addEventListener('mousedown', event => onMouseDown(event))
    value.addEventListener('touchstart', event => onMouseDown(event))
    value.addEventListener('mouseup', event => onMouseUp(event))
    value.addEventListener('touchend', event => onMouseUp(event))
    value.addEventListener('mouseout', event => onMouseUp(event))
    value.addEventListener('mousemove', event => onMouseMove(event))
    value.addEventListener('touchmove', event => onMouseMove(event))
})
function onMouseDown(event) {
    let domRect = event.target.getBoundingClientRect()
    let clientX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX
    mouseDown = clientX - (domRect.left + event.target.clientLeft)
}
function onMouseMove(event) {
    let id = event.target.children[0].id
    if (mouseDown) {
        let domRect = event.target.getBoundingClientRect()
        let clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX
        let leftSide = clientX - (domRect.left + event.target.clientLeft)
        if (mouseDown < clientX - (domRect.left + event.target.clientLeft) && parseInt(event.target.children[0].style.left) >= 0){
            let elem = event.target.children[0].children[event.target.children[0].children.length - 1].cloneNode()
            event.target.children[0].prepend(elem)
            event.target.children[0].removeChild(event.target.children[0].children[event.target.children[0].children.length - 1])
            offset[id] += -600
        }
        event.target.children[0].style.left = offset[id] + leftSide - mouseDown + 'px'
    }
}
function onMouseUp(event) {
    if (mouseDown) {
        let domRect = event.target.getBoundingClientRect()
        let id = event.target.children[0].id
        let clientX = event.type === 'touchend' ? event.changedTouches[0].clientX : event.clientX
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

        } else if (mouseDown < clientX - (domRect.left + event.target.clientLeft)){
            animateSlider(event.target.children[0], offset[id] + 600)
            offset[id] += 600
        }
    }
    mouseDown = false
}
function animateSlider(elem, destPos, left = false, currentPos) {
    let id = setInterval(frame, 1)
    currentPos = currentPos ? currentPos : parseInt(elem.style.left)
    function frame() {
        if (currentPos === destPos) {
            clearInterval(id)
        } else {
            if (Math.abs(currentPos) >= 550 || Math.abs(currentPos) <= 50) {
                left ? currentPos-- : currentPos++
            } else {
                left ? currentPos -= 10 : currentPos += 10
            }
            elem.style.left = currentPos + 'px'
        }
    }
}
