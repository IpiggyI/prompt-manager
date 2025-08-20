// Token验证API端点
export async function onRequestGet(context) {
  const { request, env } = context;
  
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ valid: false });
    }
    
    const token = authHeader.substring(7);
    const tokenData = await env.USER_AUTH.get(`token:${token}`);
    
    if (!tokenData) {
      return Response.json({ valid: false });
    }
    
    return Response.json({ valid: true });
    
  } catch (error) {
    return Response.json({ valid: false });
  }
}