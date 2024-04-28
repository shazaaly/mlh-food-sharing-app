import SectionDivider from "./SectionDivider";
import "./goal.css";

function How({ title, body }) {
  return (
    <div className='how'>
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  );
}

export default function Goals() {
  const hows = [
    {
      title: "Pray",
      body: "Join us in praying for children and families affected by the hunger crisis in Africa and around the world.",
    },
    {
      title: "Give",
      body: "Your gift will help provide support such as emergency food aid, agricultural training, access to clean water, healthcare, and more, to vulnerable children and families.",
    },
    {
      title: "Sponsor a child",
      body: "Sponsorship makes a lasting impact as you help equip children, families, and communities with access to life-saving essentials like nutritious food, healthcare, clean water, quality education, and spiritual nurture",
    },
  ];
  return (
    <div className='goalSection'>
      <SectionDivider label='Goals' />
      <div className='goals'>
        <div className='goalOne'>
          <h3>Observations</h3>
          <p>
            More than 1 billion people in Africa struggle to afford a healthy
            diet. Addressing child hunger in Africa is critical, considering
            approximately 30% of children on the continent suffer from stunted
            growth due to malnutrition. An estimated 20% of the population is
            undernourished in Africa, with 57 million more people facing hunger
            since the start of the COVID-19 pandemic. An estimated 868 million
            people experienced moderate to severe food insecurity in Africa in
            2022, with over one-third of those facing severe food insecurity.
            Hunger trends in Africa show that progress over the decades has
            abruptly reversed. After a prolonged improvement period since 2000,
            hunger significantly worsened between 2019 and 2022. In 2023, World
            Vision supported over 25.4 million people, including 14 million
            children, across 28 countries — including 18 countries in Africa.
          </p>
        </div>
        <h3>Take actions</h3>
        <div className='goalTwo'>
          {hows.map((h) => (
            <How title={h.title} body={h.body} key={h.title} />
          ))}
        </div>
      </div>

      <video
        src='https://youtu.be/R-Z08kX0aR0?si=JzIIg0QTzHSS7NJU'
        autoPlay
        loop
        muted
      ></video>
    </div>
  );
}
