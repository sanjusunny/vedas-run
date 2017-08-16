

export function render(ctx) {

    /*var m_canvas = document.createElement('canvas');
    m_canvas.width = 64;
    m_canvas.height = 64;
    var m_context = m_canvas.getContext(‘2d’);
    drawMario(m_context);

    function render() {
        context.drawImage(m_canvas, 0, 0);*/

    ctx.font = '48px arial';
    ctx.fillText('LOST RIVER', 50, 100);

    var path = new Path2D('M 540 480 H 660 L 1200 660 H 0 z');
    ctx.fill(path);
}