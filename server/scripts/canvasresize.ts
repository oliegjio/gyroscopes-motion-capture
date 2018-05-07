let canvas: HTMLCanvasElement = document.querySelector('#scene')

window.onresize = (event: Event) => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}