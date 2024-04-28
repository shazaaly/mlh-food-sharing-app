import Button from "../Button";
import Logo from "../../assets/logo.png";
import "./header.css";

export default function Header() {
  return (
    <header>
      <div className='headerBrand'>
        <h1>Join Us in Fighting Hunger: Donate Food Today!</h1>
        <p>
          At <i>Foodonor</i>, we believe that no one should go hungry. That's
          why we're dedicated to making a difference in our community by
          collecting and distributing food donations to those in need. With your
          support, we can ensure that every family has access to nutritious
          meals. Whether you're donating canned goods, fresh produce, or
          non-perishable items, every contribution makes a difference. Together,
          we can make a positive impact and help alleviate hunger in our
          community. Join us in the fight against hunger today
        </p>
        <Button label='Read More' />
      </div>

      <img src={Logo} alt='the logo' />
    </header>
  );
}
