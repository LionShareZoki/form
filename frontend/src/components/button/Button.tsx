import "./Button.scoped.css";

interface ButtonProps {
  type?: "button" | "reset" | "submit" | undefined;
}

function Button(props: ButtonProps) {
  return (
    <div className="buttonWrapper">
      <button type={props.type} className="button">
        Save
      </button>
    </div>
  );
}

export default Button;
