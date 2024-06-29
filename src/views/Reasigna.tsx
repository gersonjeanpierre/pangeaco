import FreeText from "@/components/FreeText";
import ReasignaForm from "@/components/ReasignaForm";

const Reasigna = () => {
  return (
    <>
      <h1>Reasigna</h1>
      <div className="flex gap-10">
        <ReasignaForm />
        <FreeText />
      </div>
    </>
  );
};

export default Reasigna;
