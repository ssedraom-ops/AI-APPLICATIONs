

document.addEventListener("DOMContentLoaded", function() {
 
  const checkboxes = document.querySelectorAll('.toggle');

  checkboxes.forEach(checkbox => {
    const targetId = checkbox.getAttribute('data-target');
    const details = document.getElementById(targetId);


    details.style.display = 'none';


    checkbox.addEventListener('change', function() {
      if (this.checked) {
        details.style.display = 'block';
      } else {

        details.style.display = 'none';
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {


  const toggleBoxes = document.querySelectorAll(".toggle");
  toggleBoxes.forEach((box) => {
    const targetId = box.getAttribute("data-target");
    const details = document.getElementById(targetId);

    if (details) details.style.display = "none";
    box.addEventListener("change", function () {
      if (details) details.style.display = this.checked ? "block" : "none";
    });
  });


  const form = document.getElementById("appForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const appName = document.getElementById("appName").value.trim();
      const company = 

document.getElementById("company").value.trim();
      const url = document.getElementById("url").value.trim();
      const free = document.getElementById("free").value;
      const field = document.getElementById("field").value;
      const desc = document.getElementById("desc").value.trim();


      const nameRegex = /^[A-Za-z]+$/;
      if (!nameRegex.test(appName)) {
        alert("❌ اسم التطبيق يجب أن يحتوي على أحرف إنكليزية فقط بدون فراغات أو أرقام.");
        return;
      }

      if (!nameRegex.test(company)) {
        alert("❌ اسم الشركة يجب أن يحتوي على أحرف إنكليزية فقط.");
        return;
      }

      try {
        new URL(url);
      } catch (err) {
        alert("❌ الرجاء إدخال رابط موقع إلكتروني صحيح (URL).");
        return;
      }

      if (!field) {
        alert("❌ الرجاء اختيار مجال الاستخدام.");
        return;
      }

      if (!desc) {
        alert("❌ الرجاء إدخال شرح مختصر.");

        return;
      }

    
      const appData = { appName, company, url, free, field, desc };
      sessionStorage.setItem("newApp", JSON.stringify(appData));
      showSuccessMessage();
    });
  }

  
  const appsTable = document.querySelector("table");
  if (appsTable) {
    const newApp = JSON.parse(sessionStorage.getItem("newApp"));
    if (newApp) {
      addAppToTable(newApp, appsTable);
      
    }
  }


  function addAppToTable(app, table) {
    const detailsId = "details" + Date.now();
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
      <td>${app.appName}</td>
      <td>${app.company}</td>
      <td>${app.field}</td>
      <td><input type="checkbox" ${app.free === "yes" ? "checked" : ""}></td>
      <td>
        <input type="checkbox" class="toggle" 

data-target="${detailsId}">
        <div class="checkbox-group">
          <div id="${detailsId}">
            <p>: عنوان الموقع الإلكتروني</p>
            <a href="${app.url}" target="_blank">${app.url}</a><br>
            <p>شرح مختصر: ${app.desc}</p><br>
          </div>
        </div>
      </td>
    `;

    table.appendChild(newRow);

 
    const toggle = newRow.querySelector(".toggle");
    const details = newRow.querySelector(`#${detailsId}`);
    details.style.display = "none";
    toggle.addEventListener("change", 

function () {
      details.style.display = this.checked ? "block" : "none";
    });
  }

 
  function showSuccessMessage() {
    const successDiv = document.createElement("div");
    successDiv.classList.add("success-popup");
    successDiv.innerHTML = `
      <div class="popup-content">
        ✅ تم إضافة التطبيق بنجاح!
        <br><br>
        <button id="okBtn">موافق</button>
      </div>
    `;
    document.body.appendChild(successDiv);


    document.getElementById("okBtn").addEventListener("click", () => {
      window.location.href = "apps.html";
    });
  }
});


