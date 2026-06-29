const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");
const loading = document.getElementById("loading");
const resultCount = document.getElementById("resultCount");

// Search when form is submitted
searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const query = searchInput.value.trim();

    if (query === "") {
        showMessage("Please enter a medicine name or symptom.");
        return;
    }

    searchMedicine(query);
});

// Search API
async function searchMedicine(query) {

    resultsContainer.innerHTML = "";
    resultCount.textContent = "";

    loading.classList.remove("hidden");

    try {

        const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
        const medicines = await response.json();

        loading.classList.add("hidden");

        if (medicines.length === 0) {

            showNoResults(query);
            return;

        }

        resultCount.textContent = `${medicines.length} medicine(s) found`;

        medicines.forEach(medicine => {

            const card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `

                <div class="badge">Medicine Information</div>

                <h2>💊 ${medicine.name}</h2>

                <p>
                    <strong>Uses</strong><br>
                    ${medicine.uses}
                </p>

                <p>
                    <strong>Dosage</strong><br>
                    ${medicine.dosage}
                </p>

                <p>
                    <strong>Side Effects</strong><br>
                    ${medicine.sideEffects}
                </p>

                <p>
                    <strong>Age Group</strong><br>
                    ${medicine.age}
                </p>

                <p>
                    <strong>Precautions</strong><br>
                    ${medicine.precautions}
                </p>

            `;

            resultsContainer.appendChild(card);

        });

    } catch (error) {

        loading.classList.add("hidden");

        showMessage("Unable to connect to the server.");

        console.error(error);

    }

}

// No Results
function showNoResults(query) {

    resultsContainer.innerHTML = `

        <div class="no-result">

            <h2>❌ No Medicine Found</h2>

            <p>

                We couldn't find any medicine related to

                <span class="highlight">"${query}"</span>.

            </p>

            <br>

            <p>

                Try searching using:

                <br><br>

                ✔ Medicine Name

                <br>

                ✔ Fever

                <br>

                ✔ Pain

                <br>

                ✔ Allergy

                <br>

                ✔ Infection

            </p>

        </div>

    `;

}

// General Message
function showMessage(message) {

    resultsContainer.innerHTML = `

        <div class="no-result">

            <h2>ℹ️ Information</h2>

            <p>${message}</p>

        </div>

    `;

}

// Press "/" to focus search box
document.addEventListener("keydown", function (event) {

    if (event.key === "/") {

        event.preventDefault();

        searchInput.focus();

    }

});

// Auto focus when page loads
window.onload = () => {

    searchInput.focus();

};
