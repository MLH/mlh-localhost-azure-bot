$(document).ready(function () {
  // Setup DOM element references
  const chatPlaceholder = $("#chat-placeholder");
  const submitField = $('#submit-field');
  const queryField = $('#query-field');
  const chatBox = $("#chat");

  // Handle the placeholder ("Got a question?") switching to the chat UI
  chatPlaceholder.on('click', function () {
    chatBox.show();
    chatPlaceholder.hide()
  });

  // Setup logic for submitting a question
  const submitForm = function () {
    const chatArea = $('#chat-area');
    const query = queryField.val();

    // Reset the field
    queryField.val('');

    // Add the users message to the chat
    chatArea.append($('<div>', { class: 'message-from' }).text('Me: ' + query));

    // Send a request to the API, that forwards the request to the QnA bot on Azure.
    $.post("/query", { query }, function (response) {
      chatArea.append($('<div>', { class: 'message-to' }).text('Bot: ' + response));
      chatArea.animate({ scrollTop: chatArea.prop("scrollHeight") }, 400); // Scroll to bottom in case the user isn't at the bottom
    });
  };

  // Handle the enter key being pressed on the query input
  queryField.keyup(function (event) {
    if (event.key === "Enter") {
      submitForm();
    }
  });

  // Handle the submit button getting clicked
  submitField.on('click', submitForm);
});