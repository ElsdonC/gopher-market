const URL = "https://gophermarket.onrender.com/"

function redirect(url, query) {
    if (url.includes("bookmarked")) {
        window.location = `${URL}bookmarked?${query}`
    } else if (url.includes("userItems")) {
        window.location = `${URL}userItems?${query}`
    } else {
        window.location = `${URL}?${query}`
    }
}

// Item Cards
document.querySelectorAll(".itemCard").forEach(card => {
    card.addEventListener("click", async (e) => {
        if (e.target.tagName == "path" || e.target.tagName == "svg" || e.target.tagName == "A") {
            let svg;
            // check if edit button is clicked
            if (e.target.tagName == "A" && !e.target.classList.contains("bookmark")) {
                return;
            }
            // check if the save button is clicked
            if (e.target.tagName == "A" && e.target.classList.contains("bookmark")) {
                svg = e.target.querySelector("svg")
            } else {
                svg = e.target.closest("svg")
            }
            if (svg.classList.contains("bi-bookmark-fill")) {
                $(`#unSaveModal_${svg.id}`).modal("show");
            } else {
                await fetch(`${URL}bookmarked/add/${svg.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).catch((err) => {
                    console.error(err);
                });
                window.location.reload();
            }
        } else if (e.target.tagName != "BUTTON") {
            window.location = `/item/${e.currentTarget.id}`
        }
    })
    card.style.cursor = "pointer"
})

// Show Bookmark On Item Hover
document.querySelectorAll(".itemCard").forEach((card) => {
    const bookmarkAnchor = card.querySelector(".bookmarkAnchor");
    card.addEventListener("mouseover", () => {
        bookmarkAnchor.style.display = "inline-flex";
    });
    card.addEventListener("mouseout", () => {
        bookmarkAnchor.style.display = "none";
    });
});

// Confirm Unsave Item
async function unSave(id) {
    await fetch(`${URL}bookmarked/remove/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }).catch((err) => {
        console.error(err);
    });
    window.location.reload();
}

// Validate Form Submissions
function validateForm() {
    let name = document.getElementById("name").value.replace(/\s/g, "");
    if (name == "") {
        let nameField = document.getElementById("name");
        let nameError = document.createElement("div");
        nameError.className = "error-message";
        nameError.textContent = "Please fill out this field";
        nameField.insertAdjacentElement("afterend", nameError);
        nameField.focus();
        return false;
    }
    let description = document.getElementById("description").value.replace(/\s/g, "");
    if (description == "") {
        let descField = document.getElementById("description");
        let descError = document.createElement("div");
        descError.className = "error-message";
        descError.textContent = "Please fill out this field";
        descField.insertAdjacentElement("afterend", descError);
        descField.focus();
        return false;
    }
    let category = document.getElementById("category").value;
    if (category == "") {
        let categoryField = document.getElementById("category");
        let categoryError = document.createElement("div");
        categoryError.className = "error-message";
        categoryError.textContent = "Please fill out this field";
        categoryField.insertAdjacentElement("afterend", categoryError);
        categoryField.focus();
        return false;
    }
    let location = document.getElementById("location").value;
    if (location == "") {
        let locationField = document.getElementById("location");
        let locationError = document.createElement("div");
        locationError.className = "error-message";
        locationError.textContent = "Please fill out this field";
        locationField.insertAdjacentElement("afterend", locationError);
        locationField.focus();
        return false;
    }
    let condition = document.getElementById("condition").value;
    if (condition == "") {
        let conditionField = document.getElementById("condition");
        let conditionError = document.createElement("div");
        conditionError.className = "error-message";
        conditionError.textContent = "Please fill out this field";
        conditionField.insertAdjacentElement("afterend", conditionError);
        conditionField.focus();
        return false;
    }
    let deliveryMethod = document.getElementById("deliveryMethod").value;
    if (deliveryMethod == "") {
        let deliveryMethodField = document.getElementById("deliveryMethod");
        let deliveryMethodError = document.createElement("div");
        deliveryMethodError.className = "error-message";
        deliveryMethodError.textContent = "Please fill out this field";
        deliveryMethodField.insertAdjacentElement("afterend", deliveryMethodError);
        deliveryMethodField.focus();
        return false;
    }
    if (imgFileName == "") {
        let imageField = document.getElementById("image");
        let imageError = document.createElement("div");
        imageError.className = "error-message";
        imageError.textContent = "Please upload an image";
        imageField.insertAdjacentElement("afterend", imageError);
        imageField.focus();
        return false;
    }
}

// Confirm Delete
async function deleteItem(id) {
    await fetch(`${URL}delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                alert(data.message)
            }
        });
    window.location.reload();
}

function showDeleteModal(id) {
    $(`#deleteModal_${id}`).modal("show");
}

// Show Mobile nav menu
const mobileMenu = document.querySelector(".mobile-nav-menu");
const mobileDropdownButton = document.querySelector('.mobile-dropdown-button');

mobileDropdownButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("show-mobile-nav-menu");
    document.querySelector(".title").classList.toggle("send-to-back");
})