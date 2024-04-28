import { useEffect, useState } from "react";
import Button from "../Button";
import SectionDivider from "../SectionDivider";
import "./action.css";
import { fetchtarget } from "../../services/requests";

function ActionCard({ data, action, link }) {
  const btn = {
    fontSize: "12px",
  };

  return (
    <div className='action'>
      <div className='actionHeader'>
        <h3>{data.name}</h3>
        {action !== "donates" ? (
          <Button label='Donates' style={btn} />
        ) : (
          <p>{link === "donation" ? data.donor.name : data.receiver.name}</p>
        )}
      </div>
      <div className='actionFooter'>
        <h3>{data.quantity}</h3>
        <p>{link === "donation" ? data.expirationDate : data.requestedDate}</p>
      </div>
    </div>
  );
}

export default function Action({ head, action, target }) {
  const [value, setValue] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await fetchtarget(target);
      setValue(res);
    }
    fetch();
  }, []);

  return (
    <div className='actionSection'>
      <SectionDivider label={head} />
      {value.map((v) => (
        <ActionCard data={v} action={action} key={v.id} link={target} />
      ))}
    </div>
  );
}
