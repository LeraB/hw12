let offset = {
    offset1: 0,
    offset2: 0,
    offset3: 0,
    offset4: 0
};
let mouseDown = false
Array.prototype.forEach.call(document.getElementsByClassName('slider-container'), value => {
    value.addEventListener('mousedown', event => onMouseDown(event))
    value.addEventListener('touchstart', event => onMouseDown(event))
    value.addEventListener('mouseup', event => onMouseUp(event))
    value.addEventListener('touchend', event => onMouseUp(event))
    value.addEventListener('mouseout', event => onMouseOut(event))
    value.addEventListener('mousemove', event => onMouseMove(event))
    value.addEventListener('touchmove', event => onMouseMove(event))
})
function onMouseDown(event) {
    let domRect = event.target.getBoundingClientRect()
    let clientX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX
    mouseDown = clientX - (domRect.left + event.target.clientLeft)
}
function onMouseOut(event) {
    event.target.children[0].style.left = offset[event.target.children[0].id] + 'px'
    mouseDown = false
}
function onMouseMove(event) {
    let id = event.target.children[0].id
    if (mouseDown) {
        let domRect = event.target.getBoundingClientRect()
        let clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX
        let leftSide = clientX - (domRect.left + event.target.clientLeft)
        event.target.children[0].style.left = offset[id] + leftSide - mouseDown + 'px'
    }
}
function onMouseUp(event) {
    let domRect = event.target.getBoundingClientRect()
    let id = event.target.children[0].id
    let clientX = event.type === 'touchend' ? event.changedTouches[0].clientX : event.clientX
    if (mouseDown > clientX - (domRect.left + event.target.clientLeft)) {
        if ((Math.abs(parseInt(offset[id])) + 600) / 600 === event.target.children[0].children.length) {
            event.target.children[0].style.left = 0 + 'px'
            offset[id] = 0
        } else {
            event.target.children[0].style.left = offset[id] - 600 + 'px'
            offset[id] -= 600
        }
    } else if (mouseDown < clientX - (domRect.left + event.target.clientLeft)){
        if (parseInt(offset[id]) === 0) {
            event.target.children[0].style.left = -Math.abs(event.target.children[0].children.length * 600) + 600 + 'px'
            offset[id] = -Math.abs(event.target.children[0].children.length * 600) + 600
        } else {
            event.target.children[0].style.left = offset[id] + 600 + 'px'
            offset[id] += 600
        }
    }
    mouseDown = false
}
