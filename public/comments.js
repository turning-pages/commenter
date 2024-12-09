(async function () {
  const env = window.env || {};
  const baseUrl = env.apiUrl || "http://localhost:3000";

  // Find the immediate parent of the script tag
  const scriptTag = document.currentScript;
  const parent = scriptTag.parentNode;

  // Create the comment box
  const commentBox = document.createElement("div");
  commentBox.className = "comment-box";

  const textArea = document.createElement("textarea");
  textArea.setAttribute("placeholder", "Write a comment...");
  textArea.style.width = "100%";
  textArea.style.marginBottom = "10px";
  textArea.style.padding = "10px";

  const commenterNameOrEmail = document.createElement("input");
  commenterNameOrEmail.style.width = "100%";
  commenterNameOrEmail.style.padding = "10px";
  commenterNameOrEmail.style.marginBottom = "10px";
  commenterNameOrEmail.setAttribute(
    "placeholder",
    "(Optional) Your name or email..."
  );

  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  submitButton.style.padding = "10px 15px";
  submitButton.style.backgroundColor = "#4CAF50";
  submitButton.style.color = "white";
  submitButton.style.border = "none";
  submitButton.style.cursor = "pointer";

  // Function to create the comment box
  function createCommentBox(parent) {
    // Add textarea and button to the comment box
    commentBox.appendChild(textArea);
    commentBox.appendChild(commenterNameOrEmail);
    commentBox.appendChild(submitButton);

    // Append the comment box to the parent
    parent.appendChild(commentBox);

    submitButton.addEventListener("click", addComment);
  }

  // Function to render the comments list
  function renderComments(commentData, parent) {
    document.querySelectorAll(".comment-list").forEach((list) => list.remove());

    const commentList = document.createElement("div");
    commentList.className = "comment-list";

    commentData
      .filter((comment) => comment.page_path === window.location.href)
      .forEach((comment) => {
        // Create the comment container
        const commentDiv = document.createElement("div");
        commentDiv.className = "comment";

        // Create the avatar
        const avatarDiv = document.createElement("div");
        avatarDiv.className = "avatar";
        const avatarImg = document.createElement("img");
        avatarImg.src = `https://ui-avatars.com/api/?size=50&name=${comment.commenter}&background=random&color=fff`;
        avatarImg.alt = comment.commenter;
        avatarDiv.appendChild(avatarImg);

        // Create the comment body
        const commentBody = document.createElement("div");
        commentBody.className = "comment-body";

        // Create the comment header (username and timestamp)
        const commentHeader = document.createElement("div");
        commentHeader.className = "comment-header";
        const usernameSpan = document.createElement("span");
        usernameSpan.className = "username";
        usernameSpan.textContent = comment.commenter;
        const timestampSpan = document.createElement("span");
        timestampSpan.className = "timestamp";
        timestampSpan.textContent =
          " at " + new Date(comment.created_at).toLocaleString();

        commentHeader.appendChild(usernameSpan);
        commentHeader.appendChild(timestampSpan);

        // Create the comment text
        const commentText = document.createElement("p");
        commentText.className = "comment-text";
        commentText.textContent = comment.comment;

        // Assemble the comment body
        commentBody.appendChild(commentHeader);
        commentBody.appendChild(commentText);

        // Assemble the complete comment
        commentDiv.appendChild(avatarDiv);
        commentDiv.appendChild(commentBody);

        // Add the comment to the comment list
        commentList.appendChild(commentDiv);
      });

    // Append the comment list to the parent
    // parent.appendChild(commentList);
    const referenceElement = document.getElementsByClassName("comment-box")[0];
    referenceElement.parentNode.insertBefore(
      newElement,
      referenceElement.nextSibling
    );
  }

  async function addComment() {
    const pagePath = window.location.href;
    const text = textArea.value.trim();
    const commenter = commenterNameOrEmail.value.trim() || "Anonymous";

    if (!text) {
      alert("Please enter a comment!");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: text, commenter, pagePath }),
      });

      if (response.ok) {
        textArea.value = ""; // Clear the textarea
        commenterNameOrEmail.value = ""; // Clear the commenter input
        fetchComments(); // Refresh the comments list
      } else {
        alert("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  // fetching comments
  const fetchComments = async () => {
    const response = await fetch(`${baseUrl}/comments`);
    const commentData = await response.json();
    renderComments(commentData, parent);
  };

  // Add the comment box and the comments list to the parent
  createCommentBox(parent);
  fetchComments();
})();
