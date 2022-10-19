window.addEventListener('load', () => {
    
    console.log('window loaded');

    let feed = document.getElementById('feed');

    //fetch all messages from server
    fetch('/messages')
    .then(response => response.json())
    .then(data => {
        
        //get messages from data, and var name inside is data
        let messages = data.data;
        //messages.reverse();

        //loop through each message individually
        for (let i = 0; i < messages.length; i++){
            
            let message = messages[i].message;
            let time = messages[i].time;

            let newMessage = document.createElement('p');
            let newMessageContent = `${time}: ${message}`;
            newMessage.innerHTML = newMessageContent;
            feed.appendChild(newMessage);
        }
    })
    .catch(error => {
        console.log(error);
    })

    //input field and submit button
    let inputField = document.getElementById('msg-input');
    let msgButton = document.getElementById('msg-submit');
    
    //listen to the click
    msgButton.addEventListener('click', () => {
        
        let msgValue = inputField.value;
        console.log(msgValue);

        //create post request
        let messageObj = {
            message: msgValue
        };
        //stringify
        let messageObjJSON = JSON.stringify(messageObj);

        //send the new user data from input field to server via fetch func
        fetch('/new-message', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: messageObjJSON
        })
        .then(response => response.json())
        .then(data => {
            
            //extract vars from data obt
            let message = data.message.message;
            let time = data.message.time;

            let newMessage = document.createElement('p');
            let newMessageContent = `${time}: ${message}`;
            newMessage.innerHTML = newMessageContent;
            //feed.appendChild(newMessage);
            feed.insertBefore(newMessage, feed.firstChild);
        })
        .catch(error => {
            console.log(error);
        });
    });
    

})