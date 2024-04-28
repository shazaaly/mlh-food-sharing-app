import { useState } from "react";
import Button from "../components/Button";
import { register } from "../services/requests";

export default function Register() {
  const [formData, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  function handleForm(e) {
    const { name, value } = e.target;
    setData({
      ...formData,
      [name]: name === "role" ? value.toLowerCase() : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    const res = await register(formData);
    console.log(res);
    window.localStorage.setItem("loggedInUser", JSON.stringify(res));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        name <input type='text' onChange={handleForm} name='name' />
      </label>{" "}
      <br />
      <label>
        email <input type='text' onChange={handleForm} name='email' />
      </label>{" "}
      <br />
      <label>
        password <input type='text' onChange={handleForm} name='password' />
      </label>{" "}
      <br />
      <label>
        role <input type='text' onChange={handleForm} name='role' />
        <p>donor or receiver</p>
      </label>{" "}
      <br />
      <Button type='submit' label='submit' />
    </form>
  );
}
