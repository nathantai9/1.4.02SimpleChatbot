// Function that generates a reply message based on input text
function buildReply(message){
  // Convert the user's message to lowercase for consistent matching
  message = message.toLowerCase();
  // Remove punctuation from the message for cleaner word comparisons
  message = filterOutPunctuation(message);
  // Split the cleaned message into an array of individual words
  let messageArray = message.split(" ");
  // Initialize an empty array to store possible replies
  let replyArray = [];
  // Loop through each word in the message array
  for(let eachWord of messageArray){
    // Check if the current word exists in the dictionary
    if(dictionary[eachWord]){
      // If found, add the corresponding dictionary response to replyArray
      replyArray.push(dictionary[eachWord]);
    }
  }
  // If the size of the reply array is 0 then no matching keywords were found in the dictionary
  if(replyArray.length === 0){
    // Add the default reply to the replyArray
    replyArray.push(dictionary["default"]);
  }
  // Combine all collected replies into a single string separated by spaces
  let replyString = replyArray.join(" ");
  // Return the final reply string
  return replyString;
}
