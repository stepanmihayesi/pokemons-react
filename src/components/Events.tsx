import React, { FC, useState } from "react";

const Events: FC = () => {
  const [value, setValue] = useState<string>("");
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(value);
  };
  return (
    <div>
      <input value={value} onChange={changeHandler} type="text" />
      <button onClick={clickHandler}>Log</button>
    </div>
  );
};

export default Events;
