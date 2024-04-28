import "./nav.css";
import Button from "../Button";

export default function Nav() {
  return (
    <nav>
      <div className='logo'>Foodonor</div>
      <ul>
        <li>goals</li>
        <li>donations</li>
        <li>receipt</li>
      </ul>

      <Button label='Register' />
    </nav>
  );
}
