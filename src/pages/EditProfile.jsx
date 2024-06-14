import { useParams } from "react-router-dom";

import { getAuth, updatePassword } from "firebase/auth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function EditProfile() {
  const auth = getAuth();
  const token = localStorage.getItem("token");
  const user = auth.currentUser;
  const [data, setData] = useState([]);
  const { id } = useParams();
  console.log("EditProfile", id);

  useEffect(() => {
    fetch(`http://localhost:5000/user/get/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
        setData(data);
      });
  }, []);
  // console.log("new:", user);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const age = form.age.value;
    const mobileNumber = form.mobileNumber.value;
    const newPassword = form.newPassword.value;
    const confirmNewPassword = form.confirmNewPassword.value;

    // Check if new password and confirm password are the same
    if (newPassword === confirmNewPassword) {
      updatePassword(user, newPassword)
        .then(() => {
          // Update successful.
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      console.log("Passwords do not match");
    }

    // Update password

    const userData = {
      name,
      age,
      mobileNumber,
      //   email: data?.email,
    };

    Swal.fire({
      title: "Do you want Update Profile?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/user/${data?.email}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => console.log("patched:", data));
        Swal.fire("Profile Updated!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Profile not updated", "", "info");
      }
    });
  };
  return (
    <div>
      <h1 className="text-3xl mb-7">Edit Profile </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
        <div className="flex flex-col">
          <label htmlFor="">User Name</label>
          <input
            type="text"
            name="name"
            defaultValue={data?.name}
            className="py-2 px-1 bg-slate-50 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">User email</label>
          <input
            type="text"
            value={data?.email}
            disabled
            name="email"
            className="py-2 px-1 bg-slate-50 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">User Age</label>
          <input type="text" name="age" className="py-2 px-1 bg-slate-50 " />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">User Mobile</label>
          <input
            type="text"
            name="mobileNumber"
            className="py-2 px-1 bg-slate-50 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">New Password</label>
          <input
            type="password"
            name="newPassword"
            className="py-2 px-1 bg-slate-50 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            className="py-2 px-1 bg-slate-50 "
          />
        </div>
        <div className="flex flex-col">
          <input
            type="submit"
            value="Update Profile"
            className="py-2 px-1 bg-slate-950 text-white btn btn-secondary "
          />
        </div>
      </form>
    </div>
  );
}
