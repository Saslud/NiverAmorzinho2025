async function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  const errorEl = document.getElementById("error");

  const correctHash = "1827b48e596a3e5251ab658af584a79abeabfb4ad926254e91f3b07f711306a9";

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (hashHex === correctHash) {
      window.location.href = "main.html";
    } else {
      errorEl.textContent = "Senha incorreta. Tente novamente.";
    }
  } catch (e) {
    console.error("Erro ao verificar senha:", e);
    errorEl.textContent = "Erro interno. Tente novamente mais tarde.";
  }
}