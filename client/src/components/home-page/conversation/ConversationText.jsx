import React from "react";

export const ConversationText = props => {
  return props.messages.map(message =>
    message.username === "Admin" ? (
      <span key={message.id} className="admin-span">
        <p className="admin">{message.text}</p>
      </span>
    ) : (
      <span key={message.id}>
        <p className="user">{message.text}</p>
      </span>
    )
  );
};
