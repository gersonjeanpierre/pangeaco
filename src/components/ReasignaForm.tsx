import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import moment from "moment";
import whasappIcon from "/whatsapp.svg";

interface ReasignaForm {
  orden: string;
  lineId: string;
  ctoInicial: string;
  ctoFinal: string;
  divisor: string;
  borne: string;
  dateOpen: string;
  timeOpen: string;
  dateClosed: string;
  timeClosed: string;
  gestor: string;
  timeResponse: string;
  nodo: string;
  comentario: string;
}

const ReasignaForm = () => {
  const [isGestor, setIsGestor] = useState<boolean>(false);
  const [isReasigna, setIsReasigna] = useState<boolean>(false);
  const [gestor, setGestor] = useState<string>("");
  const [textWsp, setTextWsp] = useState<string>("");
  const [formState, setFormState] = useState<ReasignaForm>({
    orden: "",
    lineId: "",
    ctoInicial: "",
    ctoFinal: "",
    divisor: "",
    borne: "",
    dateOpen: "",
    timeOpen: "",
    dateClosed: "",
    timeClosed: "",
    gestor: "",
    timeResponse: "",
    nodo: "",
    comentario: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "borne" && (parseInt(value) > 16 || parseInt(value) < 1)) {
      return;
    }
    if (id === "borne" && parseInt(value) < 10) {
      setFormState((prevState) => ({ ...prevState, [id]: "0" + value }));
      return;
    } else setFormState((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleGestor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGestor(e.target.value);
    setFormState((prevState) => ({ ...prevState, gestor: e.target.value }));
  };

  const saveGestor = () => {
    setIsGestor(true);
    console.log("Gestor", gestor, isGestor);
  };

  const btnReasignacion = () => {
    formState.timeClosed = moment().format("HH:mm");
    formState.dateOpen = moment().format("DD-MM-YYYY");
    formState.dateClosed = moment().format("DD-MM-YYYY");
    formState.nodo = formState.ctoFinal.slice(0, 2);
    const timeResponseMinutes = moment
      .duration(
        moment(formState.timeClosed, "HH:mm").diff(
          moment(formState.timeOpen, "HH:mm")
        )
      )
      .asMinutes();
    formState.timeResponse =
      Math.floor(timeResponseMinutes / 60) +
      ":" +
      ("00" + (timeResponseMinutes % 60)).slice(-2);

    const data = [
      formState.orden,
      formState.lineId,
      formState.ctoInicial,
      formState.ctoFinal,
      formState.dateOpen,
      formState.timeOpen,
      formState.dateClosed,
      formState.timeClosed,
      formState.gestor,
      formState.timeResponse,
      formState.nodo,
      formState.comentario,
    ];
    console.log("data", data);

    setTextWsp(
      `Orden:  ${formState.orden}
LineID:  ${formState.lineId}
CTO:     ${formState.ctoFinal}
Divisor: ${formState.divisor}
Borne:   ${formState.borne}`
    );
    setIsReasigna(true);
  };

  const btnCopyReasigna = () => {
    //copiar al portapapeles como fila para excel de formState;
    const data = [
      formState.orden,
      formState.lineId,
      formState.ctoInicial,
      formState.ctoFinal,
      formState.dateOpen,
      formState.timeOpen,
      formState.dateClosed,
      formState.timeClosed,
      formState.gestor,
      formState.timeResponse,
      formState.nodo,
      formState.comentario,
    ];
    const text = data.join("\t");
    navigator.clipboard.writeText(text);
  };

  const btnCleanReasigna = () => {
    setFormState({
      orden: "",
      lineId: "",
      ctoInicial: "",
      ctoFinal: "",
      divisor: "",
      borne: "",
      dateOpen: "",
      timeOpen: "",
      dateClosed: "",
      timeClosed: "",
      gestor: gestor,
      timeResponse: "",
      nodo: "",
      comentario: "",
    });
    setTextWsp("");
    setIsReasigna(false);
  };

  const btnCopyToWsp = () => {
    navigator.clipboard.writeText(textWsp);
  };

  const stylo = `font-bold w-full ${isReasigna ? "" : "hidden"}`;
  return (
    <>
      <h1>Desorrollo de tools consulte a 959733651</h1>
    </>
  );
};

export default ReasignaForm;
