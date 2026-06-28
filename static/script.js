// Load medicines from JSON
let medicines = [];

fetch("medicines.json")
.then(response => response.json())
.then(data => {
    medicines = data;
})
.catch(error => {
    console.error("Error loading medicines:", error);
});

// Elements
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("userInput");
const send = document.getElementById("sendBtn");

// Search button
send.onclick = searchMedicine;

// Enter key support
input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        searchMedicine();
    }
});

// Main Search Function
function searchMedicine(){

    let text = input.value.trim();

    if(text === "") return;

    // User Message
    chatBox.innerHTML += `
    <div class="user-message">
        ${text}
    </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    // Search Medicine
    let found = medicines.find(
        medicine => medicine.name.toLowerCase() === text.toLowerCase()
    );

    setTimeout(()=>{

        if(found){

            chatBox.innerHTML += `
            <div class="bot-message">

            <h2>💊 ${found.name}</h2>

            <p><b>Uses:</b><br>${found.uses}</p>

            <p><b>Dosage:</b><br>${found.dosage}</p>

            <p><b>Side Effects:</b><br>${found.sideEffects}</p>

            <p><b>Age:</b><br>${found.age}</p>

            <p><b>Precautions:</b><br>${found.precautions}</p>

            </div>
            `;

        }else{

            // Suggestions
            let suggestions = medicines.filter(medicine =>
                medicine.name.toLowerCase().includes(text.toLowerCase())
            );

            // If nothing matches, search using first letter
            if(suggestions.length === 0){

                suggestions = medicines.filter(medicine =>
                    medicine.name.toLowerCase().startsWith(text[0].toLowerCase())
                );

            }

            if(suggestions.length > 0){

                let html = `
                <div class="bot-message">

                ❌ <b>Medicine not found.</b>

                <br><br>

                Did you mean one of these?

                <ul style="margin-top:10px;">
                `;

                suggestions.forEach(medicine=>{

                    html += `
                    <li
                    onclick="fillMedicine('${medicine.name}')"
                    style="
                    cursor:pointer;
                    color:#1565c0;
                    margin:10px 0;
                    font-weight:bold;">
                    💊 ${medicine.name}
                    </li>
                    `;

                });

                html += `
                </ul>

                <small>
                Click any medicine name to search automatically.
                </small>

                </div>
                `;

                chatBox.innerHTML += html;

            }else{

                chatBox.innerHTML += `
                <div class="bot-message">

                ❌ Sorry!

                <br><br>

                I couldn't find that medicine.

                <br><br>

                Please check the spelling.

                </div>
                `;

            }

        }

        chatBox.scrollTop = chatBox.scrollHeight;

    },700);

    input.value="";

}

// Click suggestion
function fillMedicine(name){

    input.value = name;

    searchMedicine();

}

// Image Upload
document.getElementById("imageUpload").addEventListener("change",function(){

    chatBox.innerHTML += `
    <div class="bot-message">

    📷 Image uploaded successfully.

    <br><br>

    🔍 Medicine recognition will be added in the next version.

    </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

});