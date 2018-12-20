import React from "react";

export const Users = props => {
  const { users, userChange } = props;

  return users.map(user => {
    let seenByAdmin = true;
    let error = {};
    try {
      user.conversation.forEach(message => {
        if (message.seenBy.admin === false) {
          seenByAdmin = false;
          // breaking out of forEach, so that we don't have to iterate through whole array
          throw error;
        }
      });
    } catch (e) {
      if (e !== error) throw e;
    }
    return (
      <li key={user.id} className="admin-main__users--item">
        <button
          onClick={() => {
            userChange(user);
          }}
        >
          {user.username} {!seenByAdmin && <span className="seenState" />}
        </button>
      </li>
    );
  });
};
