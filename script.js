document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("employee-form");
    const tableBody = document.getElementById("employee-table").querySelector("tbody");
    const modal = document.getElementById("myModal");
    const editModal = document.getElementById("editModal");
    const confirmDeleteButton = document.getElementById("confirm-delete");
    const closeModalButtons = document.querySelectorAll(".modal .close, .modal .close-modal");
    const editForm = document.getElementById("editForm");

    loadSavedData();
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nom = document.getElementById("nom").value;
        const prenom = document.getElementById("prenom").value;
        const telephone = document.getElementById("telephone").value;
        const departement = document.getElementById("departement").value;
        const nextId = tableBody.querySelectorAll("tr").length + 1;

        const newRow = document.createElement("tr");
        newRow.setAttribute("data-id", nextId);
        newRow.innerHTML = `
            <td>${nextId}</td>
            <td>${nom}</td>
            <td>${prenom}</td>
            <td>${telephone}</td>
            <td>${departement}</td>
            <td>
                <button class="edit">Modifier</button>
                <button class="delete">Supprimer</button>
            </td>
        `;
        tableBody.appendChild(newRow);
        saveDataToLocalStorage(nextId, nom, prenom, telephone, departement);
        form.reset();
    });

    tableBody.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete")) {
            modal.style.display = "block";
            const row = event.target.closest("tr");
            confirmDeleteButton.addEventListener("click", function() {
                row.remove();
                modal.style.display = "none";
                updateSavedData();
            });
        } else if (event.target.classList.contains("edit")) {
            const row = event.target.closest("tr");
            const id = row.getAttribute("data-id"); 
            const cells = row.querySelectorAll("td");
            const nom = cells[1].textContent;
            const prenom = cells[2].textContent;
            const telephone = cells[3].textContent;
            const departement = cells[4].textContent;

            document.getElementById("edit-nom").value = nom;
            document.getElementById("edit-prenom").value = prenom;
            document.getElementById("edit-telephone").value = telephone;
            document.getElementById("edit-departement").value = departement;
            document.getElementById("edit-id").value = id; 

            editModal.style.display = "block";
        }
    });

    closeModalButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            modal.style.display = "none"; 
            editModal.style.display = "none"; 
        });
    });

    editForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const newNom = document.getElementById("edit-nom").value;
        const newPrenom = document.getElementById("edit-prenom").value;
        const newTelephone = document.getElementById("edit-telephone").value;
        const newDepartement = document.getElementById("edit-departement").value;
        const id = document.getElementById("edit-id").value; 
        const editedRow = tableBody.querySelector(`tr[data-id="${id}"]`);

        if (editedRow) {
            editedRow.innerHTML = `
                <td>${id}</td>
                <td>${newNom}</td>
                <td>${newPrenom}</td>
                <td>${newTelephone}</td>
                <td>${newDepartement}</td>
                <td>
                    <button class="edit">Modifier</button>
                    <button class="delete">Supprimer</button>
                </td>
            `;
            editedRow.setAttribute("data-id", id);
            editModal.style.display = "none";
            updateSavedData();
        } else {
            console.error("Ligne modifiée non trouvée");
        }
    });

    function loadSavedData() {
        const savedData = JSON.parse(localStorage.getItem("employeeData"));
        if (savedData) {
            savedData.forEach(function(data) {
                const newRow = document.createElement("tr");
                newRow.setAttribute("data-id", data.id); 
                newRow.innerHTML = `
                    <td>${data.id}</td>
                    <td>${data.nom}</td>
                    <td>${data.prenom}</td>
                    <td>${data.telephone}</td>
                    <td>${data.departement}</td>
                    <td>
                        <button class="edit">Modifier</button>
                        <button class="delete">Supprimer</button>
                    </td>
                `;
                tableBody.appendChild(newRow);
            });
        }
    }

    function saveDataToLocalStorage(id, nom, prenom, telephone, departement) {
        const savedData = JSON.parse(localStorage.getItem("employeeData")) || [];
        savedData.push({ id, nom, prenom, telephone, departement });
        localStorage.setItem("employeeData", JSON.stringify(savedData));
    }

    function updateSavedData() {
        const rows = tableBody.querySelectorAll("tr");
        const savedData = [];
        rows.forEach(function(row) {
            const columns = row.querySelectorAll("td");
            savedData.push({
                id: row.getAttribute("data-id"), 
                nom: columns[1].textContent,
                prenom: columns[2].textContent,
                telephone: columns[3].textContent,
                departement: columns[4].textContent
            });
        });
        localStorage.setItem("employeeData", JSON.stringify(savedData));
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const pagination = document.querySelector('.pagination');
    const precedentLink = pagination.querySelector('.precedent');
    const suivantLink = pagination.querySelector('.suivant');
    const spanPage = pagination.querySelector('span');
    let currentPage = 1; 

    precedentLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            spanPage.textContent = currentPage;


        }
    });

    suivantLink.addEventListener('click', function(e) {
        e.preventDefault();
        currentPage++;
        spanPage.textContent = currentPage;

        
    });
});
