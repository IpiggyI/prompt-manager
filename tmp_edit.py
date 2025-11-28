from pathlib import Path
path = Path("GPT/prompt-manager.html")
text = path.read_text(encoding="utf-8")
start = text.index("async function logout() {")
end = text.index("async function verifyToken()", start)
new_fn = """async function logout() {
            authState.isLoggedIn = false;
            authState.token = null;
            localStorage.removeItem('authToken');
            authState.lastSync = null;
            localStorage.removeItem('lastSync');
            updateSyncStatus();
            renderPrompts();
            showToast('已退出登录', 'info');
        }

"""
text = text[:start] + new_fn + text[end:]
path.write_text(text, encoding="utf-8")