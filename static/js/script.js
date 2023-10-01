// Example POST method implementation:
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

document.addEventListener("DOMContentLoaded", function () {
  const questionInput = document.getElementById("questionInput");
  const sendButton = document.getElementById("sendButton");
  const newChatButton = document.getElementById("newChatButton");
  const reloadableSearchElements = document.querySelectorAll(".chat");

  questionInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendButton.click();
    }
  });

  sendButton.addEventListener("click", async () => {
    const questionInputValue = questionInput.value;

    questionInput.value = "";
    document.querySelector(".right2").style.display = "block";
    document.querySelector(".right1").style.display = "none";

    question1.innerHTML = questionInputValue;
    question2.innerHTML = questionInputValue;

    // Get the answer and populate it!
    const result = await postData("/api", { question: questionInputValue });
    solution.innerHTML = result.answer;

    // Clear previous question and answer
    question1.innerHTML = ""; // Clear previous question
  });

  reloadableSearchElements.forEach((element) => {
    const editIcon = element.querySelector(".edit-icon");
    const deleteIcon = element.querySelector(".delete-icon");

    element.addEventListener("mouseenter", () => {
      element.classList.add("hovered");
    });

    element.addEventListener("mouseleave", () => {
      element.classList.remove("hovered");
    });

    editIcon.addEventListener("click", (event) => {
      const clickedQuestion = element.querySelector("span").textContent;
      // Implement the edit functionality here
      // You can open a prompt or a modal to edit the question
      event.stopPropagation();
    });

    deleteIcon.addEventListener("click", async (event) => {
      const clickedQuestion = element.querySelector("span").textContent;
      // Implement the delete functionality here
      // You can remove the chat element and make an API call to delete from the database
      event.stopPropagation();
    });

    element.addEventListener("click", async () => {
      const clickedQuestion = element.querySelector("span").textContent;
      const result = await postData("/api", { question: clickedQuestion });
      solution.innerHTML = result.answer;
      question1.innerHTML = clickedQuestion;
      question2.innerHTML = clickedQuestion;
      document.querySelector(".right1").style.display = "none";
      document.querySelector(".right2").style.display = "block";
    });
  });

  newChatButton.addEventListener("click", function () {
    location.reload(); // Reload the page
  });
});
