export function renderBase(ctx) {

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

    var m_canvas = document.createElement('canvas');
    m_canvas.width = 800;
    m_canvas.height = 800;
    var mx = m_canvas.getContext('2d');

    mx.fillStyle = '#ccc';
    mx.fill( new Path2D('M 240 159 L 400 199 L 320 719 L 40 679 z') );
    mx.fillStyle = '#ddd';
    mx.fill( new Path2D('M 399 200 L 479 120 L 239 160 z') );
    mx.fillStyle = '#aaa';
    mx.fill( new Path2D('M 479 120 L 599 640 L 479 720 L 400 200 z') );
    mx.fillStyle = '#444';
    mx.fill( new Path2D('M 400 200 L 480 720 H 320 z') );

    ctx.drawImage(m_canvas, -50, -50, 200, 200);
}