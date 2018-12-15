import React from "react";

export const Messages = props => {
  const { user } = props;
  return Object.keys(user).length
    ? user.conversation.map((message, index) =>
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
    : <h1>No Conversatins</h1>;
};
