export function renderBase(ctx) {

    /*var m_canvas = document.createElement('canvas');
    m_canvas.width = 64;
    m_canvas.height = 64;
    var m_context = m_canvas.getContext(‘2d’);
    drawMario(m_context);

    function render() {
        context.drawImage(m_canvas, 0, 0);*/

    /*    var path = new Path2D('M 540 480 H 660 L 1200 660 H 0 z');
        ctx.fill(path);*/


    ctx.save();

    ctx.globalAlpha = 0.7;
    ctx.filter = 'blur(40px)';
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 20, 1200, 200);

    ctx.globalAlpha = 0.9;
    ctx.filter = 'blur(20px)';
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 380, 1200, 100);

    ctx.filter = 'blur(40px)';
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 580, 1200, 40);

    ctx.restore();
}

export function renderUI(ctx) {

}

export function renderGame(ctx) {

}