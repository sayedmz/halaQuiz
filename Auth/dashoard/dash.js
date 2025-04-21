document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("#table tbody");

  // Get results from localStorage (same as your original code)
  const quizResults = JSON.parse(localStorage.getItem("quizResults")) || [];

  // Loop through the results (same as your original code)
  quizResults.forEach((result) => {
    const row = document.createElement("tr"); // Create row (same as original)

    // Populate the row's cells
    row.innerHTML = `
      <td>${result.fullName || "-"}</td>      
      <td>${result.username || "-"}</td>      
      <td>${result.email || "-"}</td>         
      <td>${result.phone || "-"}</td>        
      <td>${result.score !== undefined ? result.score : "-"}</td> 
      <td>${result.total !== undefined ? result.total : "-"}</td> 
    `;

    tableBody.appendChild(row); // Add row to table (same as original)
  });
});
