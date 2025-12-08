/**
 * Demo App Script - Version 2.0 (CÓ HẠI - Đã bị hack)
 *
 * Script này được extract từ demo-sri-attack.html
 * Dùng cho Commit 2 (có hại) - Dùng trong demo không có SRI
 *
 * Nội dung: Logic demo có code độc hại, đánh cắp token, hijack navigation, etc.
 */
// ========== SCENARIO 1: TOKEN THEFT ==========
let userToken = null;
let userInfo = null;

function login() {
  // Giả lập login và lấy token
  userToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5ndXllbiBWYW4gQSIsImVtYWlsIjoiYS5uZ3V5ZW5AdGVzdC5jb20ifQ.abc123def456";
  userInfo = {
    id: "1234567890",
    name: "Nguyen Van A",
    email: "a.nguyen@test.com",
    role: "user",
  };
  document.getElementById(
    "result1"
  ).innerHTML = `<p style="color: #51cf66;"> Đăng nhập thành công!</p>
 <p>Token: ${userToken.substring(0, 50)}...</p>
 <p>User: ${userInfo.name} (${userInfo.email})</p>`;
  // NGUY HIỂM: Script độc hại từ CDN có thể đánh cắp token này
  setTimeout(() => {
    showAlert("alert1", " TOKEN ĐÃ BỊ ĐÁNH CẮP BỞI SCRIPT ĐỘC HẠI TỪ CDN!");
  }, 1000);
}

function getUserInfo() {
  if (!userToken) {
    alert("Vui lòng đăng nhập trước!");
    return;
  }
  // Giả lập API call với token
  document.getElementById(
    "result1"
  ).innerHTML = `<p>🔄 Đang gọi API với token...</p>`;
  setTimeout(() => {
    document.getElementById(
      "result1"
    ).innerHTML = `<p style="color: #51cf66;"> Thông tin người dùng:</p>
 <pre>${JSON.stringify(userInfo, null, 2)}</pre>`;
    showAlert(
      "alert1",
      " THÔNG TIN NGƯỜI DÙNG ĐÃ BỊ GỬI VỀ SERVER CỦA HACKER!"
    );
  }, 1000);
}

function showAlert(id, msg) {
  const alertEl = document.getElementById(id);
  if (alertEl) {
    alertEl.textContent = msg;
    alertEl.style.display = "block";
  }
}

// ========== SCENARIO 2: NAVIGATION HIJACKING ==========
function navigate(path) {
  document.getElementById(
    "result2"
  ).innerHTML = `<p>🔄 Đang chuyển đến: <strong>${path}</strong></p>`;
  // NGUY HIỂM: Script độc hại từ CDN đã override function này
  // Thay vì đi đến trang đúng, nó sẽ chuyển đến trang phishing
  setTimeout(() => {
    const phishingUrl = `https://phishing-site.com/fake${path}`;
    document.getElementById(
      "result2"
    ).innerHTML = `<p style="color: #ff6b6b;"> Thay vì đi đến <strong>${path}</strong>, bạn đã bị chuyển hướng đến:</p>
 <p style="color: #ff0000; font-weight: bold;">${phishingUrl}</p>
 <p style="color: #ffd93d;"> Đây là trang phishing giả mạo!</p>`;
    showAlert(
      "alert2",
      `🚨 LINK ${path} ĐÃ BỊ CHUYỂN HƯỚNG ĐẾN TRANG PHISHING!`
    );
  }, 1500);
}

// Override tất cả link clicks
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

// ========== SCENARIO 3: USER INFO THEFT ==========
function handleSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const creditCard = document.getElementById("creditCard").value;
  document.getElementById(
    "result3"
  ).innerHTML = `<p style="color: #51cf66;"> Form đã được gửi thành công!</p>
 <p>Email: ${email}</p>`;
  // NGUY HIỂM: Script độc hại đã đánh cắp thông tin này
  showAlert(
    "alert3",
    " THÔNG TIN CỦA BẠN ĐÃ BỊ ĐÁNH CẮP VÀ GỬI VỀ HACKER-SERVER.COM!"
  );
}
// Form stealing đã được xử lý bởi malicious-form.js từ GitHub
// Script sẽ tự động lắng nghe và đánh cắp thông tin form
// ========== SCRIPT ĐỘC HẠI ĐÃ ĐƯỢC LOAD TỪ GITHUB ==========
console.log(" Script độc hại đã được load từ CDN!");
console.log(" Đang lắng nghe và đánh cắp thông tin...");
