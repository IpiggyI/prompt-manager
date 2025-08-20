// 数据同步API端点
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    // 验证token
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.substring(7);
    const tokenData = await env.USER_AUTH.get(`token:${token}`);
    
    if (!tokenData) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { userId } = JSON.parse(tokenData);
    const data = await request.json();
    
    // 存储用户数据
    await env.PROMPT_DATA.put(`user:${userId}`, JSON.stringify({
      data,
      lastSync: Date.now()
    }));
    
    return Response.json({ 
      success: true, 
      synced: true 
    });
    
  } catch (error) {
    return Response.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 });
  }
}