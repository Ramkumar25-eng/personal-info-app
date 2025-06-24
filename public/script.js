// script.js

let avatarBase64 = "";

// Convert selected avatar to Base64 and preview it
document.addEventListener("DOMContentLoaded", () => {
  const avatarInput = document.getElementById("avatar");
  const avatarPreview = document.getElementById("avatarPreview");

  if (avatarInput) {
    avatarInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          avatarBase64 = e.target.result;
          if (avatarPreview) {
            avatarPreview.src = avatarBase64;
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Handle form submission (index.html)
  const form = document.getElementById("signupForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const user = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        dob: document.getElementById("dob").value,
        number: document.getElementById("number").value,
        email: document.getElementById("email").value,
        avatar: avatarBase64
      };

      try {
        const response = await fetch("https://personal-info-backend.onrender.com/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          localStorage.setItem("userEmail", user.email);
          window.location.href = "details.html";
        } else {
          const data = await response.json();
          alert("Signup failed: " + data.message);
        }
      } catch (err) {
        alert("Connection failed. Please try again.");
        console.error(err);
      }
    });
  }

  // Show user data (details.html)
  if (window.location.pathname.includes("details.html")) {
    const email = localStorage.getItem("userEmail");

    if (email) {
      fetch(`https://personal-info-backend.onrender.com/api/users/${email}`)
        .then(res => res.json())
        .then(user => {
          if (user) {
            document.getElementById("userAvatar").src = user.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
            document.getElementById("userName").textContent = user.name;
            document.getElementById("userAge").textContent = user.age;
            document.getElementById("userGender").textContent = user.gender;
            document.getElementById("userDOB").textContent = user.dob;
            document.getElementById("userNumber").textContent = user.number;
            document.getElementById("userEmail").textContent = user.email;
          } else {
            document.getElementById("userInfo").innerText = "User not found.";
          }
        })
        .catch(err => {
          console.error("Failed to fetch user:", err);
          document.getElementById("userInfo").innerText = "Error fetching user data.";
        });
    }
  }
});
