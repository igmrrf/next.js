import cn from "classnames";
import alert from "../styles/alert.module.css";

export default function Alert({ type }) {
  return (
    <div
      className={cn({
        [alert.success]: type === "success",
        [alert.error]: type === "error",
      })}
    >
      This is an alert message
    </div>
  );
}
