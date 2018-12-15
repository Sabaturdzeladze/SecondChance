import React from "react";

export const Users = props => {
  const { users, userChange } = props;

  return users.map(user => (
    <li key={user.id} className="admin-main__users--item">
      <button onClick={() => {userChange(user)}}>{user.username}</button>
    </li>
  ));
};
