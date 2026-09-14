const form = document.getElementById("predictionForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        area: Number(document.getElementById("area").value),
        bedrooms: Number(document.getElementById("bedrooms").value),
        bathrooms: Number(document.getElementById("bathrooms").value),
        stories: Number(document.getElementById("stories").value),
        parking: Number(document.getElementById("parking").value),
        age: Number(document.getElementById("age").value),
        location: document.getElementById("location").value
    };

    result.innerHTML = "Predicting...";

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/predict",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        const output = await response.json();

        const price = output.predicted_price;

        result.innerHTML = `
            <h2>Estimated Price</h2>
            <h1>₹${price.toLocaleString("en-IN")}</h1>
        `;

    } catch (error) {

        result.innerHTML =
            "Unable to connect to prediction server.";

        console.error(error);
    }
});