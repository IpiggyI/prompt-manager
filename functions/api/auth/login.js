// 登录API端点
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const { password } = await request.json();
    
    // 简单密码验证
    const validPassword = env.AUTH_PASSWORD || 'admin123';
    
    if (password === validPassword) {
      // 生成token
      const token = btoa(Date.now() + ':' + Math.random());
      
      // 存储token到KV (24小时过期)
      await env.USER_AUTH.put(`token:${token}`, JSON.stringify({
        created: Date.now(),
        userId: 'default'
      }), { expirationTtl: 86400 });
      
      return Response.json({ 
        success: true, 
        token 
      });
    }
    
    return Response.json({ 
      error: 'Invalid password' 
    }, { status: 401 });
    
  } catch (error) {
    return Response.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 });
  }
}