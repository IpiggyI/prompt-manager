// Cloudflare Pages 通配符路由 - 处理所有非 API 请求
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // 如果是根路径或者其他路径，都返回主页面
  if (url.pathname === '/' || !url.pathname.startsWith('/api/')) {
    // 读取主 HTML 文件
    try {
      const htmlResponse = await context.env.ASSETS.fetch(new URL('/prompt-manager.html', request.url));
      const html = await htmlResponse.text();
      
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    } catch (error) {
      // 如果读取失败，返回简单的重定向
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>提示词管理工具</title>
          <script>window.location.href = '/prompt-manager.html';</script>
        </head>
        <body>
          <p>正在跳转到提示词管理工具...</p>
          <p><a href="/prompt-manager.html">如果没有自动跳转，请点击这里</a></p>
        </body>
        </html>
      `, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }
  }
  
  // 对于其他请求，返回 404
  return new Response('Not Found', { status: 404 });
}