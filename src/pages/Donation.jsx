import { useState } from "react";
import { donates } from "../services/requests";
import Button from "../components/Button";

export function Donation() {
  const [formData, setData] = useState({
    name: "",
    quantity: "",
    expirationDate: "",
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
    const res = await donates(formData);
    console.log(res);
    setData({
      name: "",
      quantity: "",
      expirationDate: "",
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          name <input type='text' onChange={handleForm} name='name' />
        </label>{" "}
        <br />
        <label>
          quantity <input type='number' onChange={handleForm} name='quantity' />
        </label>{" "}
        <br />
        <label>
          expirationDate{" "}
          <input type='text' onChange={handleForm} name='expirationDate' />
        </label>{" "}
        <br />
        <Button type='submit' label='Donate' />
      </form>
    </div>
  );
}
