let textInput;
let sendButton;
let textY = 30;

const dictionary = {
  hello: "Hello there, how are you today?",
  hi: "Hi, how are you?",
  default: "I see. Please tell me more.",
  "Good, how are you today?": "I'm just a bot, but thanks for asking!",
  sad: "I'm sorry to hear that. Hope things get better!",
  happy: "That's great to hear! Keep smiling!",
  angry: "Take a deep breath. It's going to be okay.",
  bored: "Maybe try a new hobby or activity?",
  tired: "Make sure to get some rest!",
  excited: "That's awesome! Enjoy the moment!",
  weather: "The weather is great today.",
  food: "I love pizza.",
  movie: "I like sci-fi movies.",
  music: "I enjoy listening to jazz.",
  sport: "Soccer is a fun sport to watch.",
  hobby: "I like painting in my free time.",
  travel: "Traveling opens your mind to new cultures."
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(155); // TODO
  addUserInterface();
}

function draw() {
  // Draw function is not used
}

function resetMessages(){
  textY = 30;
  background(225); // TODO
}
// Create the text input and send button elements
function addUserInterface(){
  // Create an input element.
  // Set its default text to "hello!".
  textInput = createInput('hello!');
  // Set the font size for the input
  textInput.style('font-size', '25px');
  // Place it at the bottom of the canvas. 
  textInput.position(width*0.1, height-50); // Place input near bottom
  // Set its width and height 
  textInput.size(width*0.8,30);
  // Create a send button.
  sendButton = createButton("Send");
  // Place it at the bottom of the canvas. 
  sendButton.position(width*0.92, height-50); // Place button near input
  // Set its width and height 
  sendButton.size(50,36);
  // Tell it what function to call when clicked
  sendButton.mousePressed(sendMessage);
}

// Function to remove common punctuation characters from a given text string
function filterOutPunctuation(textString){
  // Define a string containing common punctuation characters to filter out
  let commonPunctuation = ".,!?;:'\"()[]{}-_"; // Common punctuation
  // Initialize an empty string to store the cleaned result
  let result = "";
  // Loop through each character of the input text string
  for(let i = 0; i < textString.length; i++){
    // Use substring to extract the current character at position i
  let currentLetter = textString.substring(i, i+1);
    // Check if the current character is NOT found in the punctuation list
  if(commonPunctuation.indexOf(currentLetter) == -1){
      // If it’s not punctuation, add it to the result string
  result += currentLetter;
    }
  }
  // Return the text string with punctuation removed
  return result;
}

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

// Define a function named sendMessage, responsible for handling chat input/output
function sendMessage(){
  // Set the color of the human's text to blue
  fill(0, 0, 255); // Human text color (blue)
  // Set the text size for the messages
  textSize(24); // Reasonable text size
  // If the textY is too low
  if(textY > height-60){
    // Call the reset messages function
  resetMessages();
  }
  // Get the current value typed into the text input field
  let userMessage = textInput.value();
  // Clear the text input field after capturing the message
  textInput.value("");
  // Align text to the right for displaying the user's message
  textAlign(RIGHT)
  // Set the fill color for the user's text
  fill(0, 102, 204); // User message color (blue)
  // Draw the user's message near the right side of the canvas at the current Y position
  text(userMessage, width-20, textY); // Near right edge
  // Move the text position downward for the next line of text
  textY += 36;
  // Align text to the left for displaying the bot’s reply
  textAlign(LEFT)
  // Set the fill color for the bot's reply
  fill(255, 0, 0); // Bot reply color (red)
  // Draw the chatbot’s reply text at the left side of the canvas at the current Y position
  text(buildReply(userMessage), 20, textY); // Near left edge
  // Move the text position downward for the next message/reply
  textY += 36;
}

// Define a function to handle keyboard input events
function keyPressed(){
  // Check if the pressed key was the ENTER key
  if (keyCode === ENTER) {
    // Call sendMessage to process and display the input
  sendMessage();
  }
}