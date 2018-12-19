import React from "react";
import { Link } from "react-router-dom";

export default ({ users, onDelete }) => {
  return (
    <tbody>
      {users.slice(1).map(user => {
        return (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.balance}</td>
            <td>{user.email}</td>
            <td>{user.birthday}</td>
            <td>
              <Link
                to={`/admin/users/edit/${user.id}`}
                className="btn btn-success"
              >
                <i className="fa fa-edit" />
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(user.id)}
              >
                <i className="fa fa-trash" />
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
