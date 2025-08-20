// 数据加载API端点
export async function onRequestGet(context) {
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
    const userData = await env.PROMPT_DATA.get(`user:${userId}`);
    
    if (!userData) {
      return Response.json({ data: null });
    }
    
    const parsed = JSON.parse(userData);
    return Response.json({ 
      data: parsed.data, 
      lastSync: parsed.lastSync 
    });
    
  } catch (error) {
    return Response.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 });
  }
}