/**
 * Demo App Script - Version 1.0 (VÔ HẠI - An toàn)
 *
 * Script dùng cho demo SRI Protection
 */
// ========== XỬ LÝ XỬ CHỐNG XSS ==========
function escapeHTML(str) {
  const escape = document.createElement("div");
  escape.textContent = str;
  return escape.innerHTML;
}

// ========== SCENARIO 1: TOKEN PROTECTED ==========
let userToken = null;
let userInfo = null;

function login() {
  userToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5ndXllbiBWYW4gQSIsImVtYWlsIjoiYS5uZ3V5ZW5AdGVzdC5jb20ifQ.abc123def456";

  userInfo = {
    id: "1234567890",
    name: "Nguyen Van A",
    email: "a.nguyen@test.com",
    role: "user",
  };

  document.getElementById("result1").innerHTML = `
    <p style="color: #51cf66;">✅ Đăng nhập thành công!</p>
    <p>Token: ${userToken.substring(0, 50)}...</p>
    <p>User: ${userInfo.name} (${userInfo.email})</p>
    <p style="color: #51cf66; margin-top: 10px;">🛡️ Token được bảo vệ bởi SRI</p>
  `;
}

function getUserInfo() {
  if (!userToken) {
    alert("Vui lòng đăng nhập trước!");
    return;
  }

  document.getElementById("result1").innerHTML = `
    <p>🔄 Đang gọi API với token...</p>
  `;

  setTimeout(() => {
    document.getElementById("result1").innerHTML = `
      <p style="color: #51cf66;">✅ Thông tin người dùng:</p>
      <pre>${JSON.stringify(userInfo, null, 2)}</pre>
      <p style="color: #51cf66; margin-top: 10px;">🛡️ Thông tin được bảo vệ bởi SRI</p>
    `;
  }, 1000);
}

// ========== SCENARIO 2: NAVIGATION PROTECTED ==========
function navigate(path) {
  document.getElementById("result2").innerHTML = `
    <p style="color: #51cf66;">✅ Đang chuyển đến: <strong>${path}</strong></p>
    <p style="color: #51cf66;">🛡️ Navigation được bảo vệ bởi SRI</p>
  `;
}

document.addEventListener(
  "click",
  function (e) {
    const link = e.target.closest("a");
    if (link && link.href) {
      e.preventDefault();
      const href = new URL(link.href, window.location.origin).pathname;
      navigate(href);
    }
  },
  true
);

// ========== SCENARIO 3: USER INFO PROTECTED ==========
function handleSubmit(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;

  // AN TOÀN: Sử dụng escapeHTML để chống XSS khi render email vào HTML
  const safeEmail = escapeHTML(email);

  document.getElementById("result3").innerHTML = `
    <p style="color: #51cf66;">✅ Form đã được gửi thành công!</p>
    <p>Email: ${safeEmail}</p>
    <p style="color: #51cf66; margin-top: 10px;">🛡️ Thông tin được bảo vệ bởi SRI & chống XSS</p>
  `;
}

// ========== SRI STATUS ==========
window.addEventListener(
  "error",
  function (e) {
    if (e.message.includes("integrity") || e.message.includes("digest")) {
      document.getElementById("protection1").innerHTML = `
        <p style="color: #ff6b6b;">🚨 SRI đã phát hiện script bị thay đổi!</p>
        <p>Script độc hại đã bị từ chối load.</p>
        <p>Bạn được bảo vệ an toàn!</p>
      `;
    }
  },
  true
);

console.log("✅ Script an toàn đã được load với SRI");
