import "./btn.css";

export default function Button({ label, style, type }) {
  return (
    <button style={style} type={type}>
      {label}
    </button>
  );
}
