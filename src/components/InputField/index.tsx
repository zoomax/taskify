import React, { useRef } from "react";
import "./styles.css";
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: (ev: React.FormEvent) => void;
}
const InputField: React.FC<Props> = ({
  todo,
  setTodo,
  handleAddTodo,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <form
      className="input"
      onSubmit={(ev: React.FormEvent) => {
        handleAddTodo(ev);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        value={todo}
        onChange={(ev) => {
          ev.preventDefault();
          setTodo(ev.target.value);
        }}
        className="input__box"
        type="text"
        placeholder="Enter a task..."
      />
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
