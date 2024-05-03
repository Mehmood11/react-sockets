import React from 'react'

const Login = ({newUsername, handleChange, logNewUser}) => {
  return (
    <div className="card w-100 text-center border-white">
            <div className="row">
              <div className="col-12">
                <h5>Enter Username</h5>
              </div>
              <div className="d-flex justify-content-center py-1">
                <div className="col-4">
                  <input
                    type="text"
                    name="username"
                    value={newUsername}
                    className="form-control"
                    placeholder="User Name"
                    onChange={(e) => handleChange(e)}
                    onKeyPress={(e) =>
                      e.code === "Enter" ? logNewUser() : null
                    }
                  />
                  <button
                    className="btn btn-success w-100 mt-2"
                    onClick={logNewUser}
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
  )
}

export default Login