import { useState } from "react";
import Button from "../components/Button";
import { login } from "../services/requests";

export default function Login() {
  const [formData, setData] = useState({
    name: "",
    password: "",
  });

  function handleForm(e) {
    const { name, value } = e.target;
    setData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    const res = await login(formData);
    console.log(res);
    window.localStorage.setItem("loggedInUser", JSON.stringify(res));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        name
        <input type='text' onChange={handleForm} name='name' />
      </label>
      <br />
      <label>
        password
        <input type='password' onChange={handleForm} name='password' />
      </label>
      <br />
      <Button type='submit' label='submit' />
    </form>
  );
}
