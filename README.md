# Tribe-chat-app

Clone the repository and install dependencies for running the project:

```bash
git clone https://github.com/santosh-jorka/tribe-chat-app.git
cd src
npm install
npm run start
```

## Must Haves Implemented
- A screen displaying a list of all chat messages.

- Each message includes:
    
  - Avatar and name of the participant,
  - Timestamp indicating when the message was sent

- Messages with reactions show a row of reactions underneath.

- Consecutive messages from the same participant are grouped together.

- An input bar is available at the bottom for sending new messages.

- Messages with image attachments display the image inline

## Good To Haves Implemented
- Date separator between messages sent on different days.
- Initial hydration and efficient use of the API using:
  - GET /info to validate session 
  - GET /messages/latest to load newest 25 messages
- Infinite scroll: older messages are fetched on upward scroll (GET /messages/older/<uuid>).

## Technical Design Notes

- To manage chat history efficiently, messages are stored in a Deque (double-ended queue):
  - New messages are added to the front using .unshift()
  - Older messages are appended to the back using .push()
- This ensures O(1) time complexity for both operations and avoids expensive list rebuilding during pagination or real-time updates.

## Notes
-AI tools were used for code scaffolding and writing helper utilities, but all logic and implementation were verified and written manually.


