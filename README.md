# DISCORD CLONE
#### Developed By Luis Laffitte
* Click **[HERE](https://laffitte-discord-clone.onrender.com/)** for the Live Demo
* Visit the **[WIKI](https://github.com/Wizzerrd/DiscordClone/wiki)** for a more in-depth look into the project's planning

This is a clone of the popular messaging app Discord built using React/Rails. Full user auth is implemented, meaning users can sign up, sign in, and sign out. Once signed in, Users can invite one another to be friends, as well as remove friends once they're added. Users can create servers, in which they can create messaging channels. Server and channel names can be updated, and servers and channels can be deleted. Users can invite their friends into created servers and send instant-messages with WebSocket functionality.

To use the application, follow the link above to the Live Demo, and either create an account or use one of the provided demo users to access to app's functionality. Once signed in simply access a pre-existing server or create one, and try sending a message in a channel. Also try logging in with another account in a new incognito tab and sending yourself a message.

![discsplash](https://github.com/Wizzerrd/DiscordClone/assets/133073175/fb442b7a-2ed9-47ac-af37-f45e297f6d2d)

### Features
#### A User can sign up, sign in, and sign out
To use the messaging functionality, a user must have an account. Navigate to the log in page by pressing the log in button at the top of the screen. Register for an account, log in, or use a demo account to access the application. To sign out, navigate to the friends section by pressing the Discord icon in the top left at the top of the server list. Once on the friend screen an option to log out should be present in the column next to the server list.

#### A User can add friends
On the friends page navigate to the "Add a friend" tab, located in the top bar. Search for a user by their username and, if they exist, a friend request will be sent. The other account can accept the request and the two will become friends. Friends can be invited to servers.

![discfriends](https://github.com/Wizzerrd/DiscordClone/assets/133073175/90ca38d7-c0fa-4599-9cad-62294ee5d7c2)

#### A User can create servers with messaging channels
In the server list, press the "+" button. This will display a modal where a user can input the server name to be created. Inside the server a user can press the "+" button next to Text Channels to create a new messaging channel. To invite a friend to a server press the box containing the server name, and it will display a modal where you can invite friends, leave the server, or, if you are the owner, modify the server name.

#### A User can send messages in channels
To select a server, press an icon in the server list and it will take you to the first channel in that server. A specific channel can be selected from the channel list, and once in a channel, a message can be send by filling the field on the bottom of the screen and pressing enter.

![discmsg](https://github.com/Wizzerrd/DiscordClone/assets/133073175/b2b14c45-b95e-47d1-9a21-269a7f00634d)



