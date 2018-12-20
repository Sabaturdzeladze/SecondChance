import React from "react";

export const Messages = props => {
  const { user } = props; 
  return Object.keys(user).length
    ? (
      <>
      <p className="current-conversation">
        Conversation With {user.username}
      </p>
      <div className="admin-main__messages--text">
        {
          user.conversation.map((message, index) =>
          message.username === "Admin" ? (
            <span key={message.id} className="admin-span">
              <p className="admin-main__admin">
                {message.text}
              </p>
            </span>
          ) : (
            <span key={message.id}>
              <p className="admin-main__user">{message.text}</p>
            </span>
          )
        )
        }
      </div>
      </>
    )
    : <h2>Choose User to see the Conversation</h2>;
};
