
const feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

     try {
        const response = await fetch("http://localhost:5000/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                rating,
                comment
            })
        });

        const data = await response.json();

        alert(data.message);
        feedbackForm.reset();

    } catch (error) {
        console.error("Error:", error);
        alert("Could not connect to backend");
    }
});




async function getFeedbacks() {
    try {
        const response = await fetch("http://localhost:5000/feedback");
        const feedbacks = await response.json();

        const feedbackList = document.getElementById("feedbackList");

        feedbackList.innerHTML = "";

        feedbacks.forEach((feedback) => {
            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${feedback.name}</h3>
                <p>Rating: ${feedback.rating}/5</p>
                <p>${feedback.comment}</p>
            `;

            feedbackList.appendChild(card);
        });

    } catch (error) {
        console.error("Error fetching feedback:", error);
    }
}

getFeedbacks();
