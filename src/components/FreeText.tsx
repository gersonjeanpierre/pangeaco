import { Textarea } from "./ui/textarea";
import { useState } from "react";
// import { Button } from "./ui/button";

const FreeText = () => {
  const [text, setText] = useState<string>(localStorage.getItem("text") || "");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setTimeout(() => {
      localStorage.setItem("text", e.target.value);
    }, 2000);
  };
  return (
    <>
      <div className="flex flex-col w-full">
        <h2>Notas</h2>
        <Textarea id="text" value={text} onChange={handleChange} rows={20} />
      </div>
    </>
  );
};
export default FreeText;
