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
    }
    setFormState((prevState) => ({ ...prevState, [id]: value }));
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

    setTextWsp(`Orden:   ${formState.orden}
LineID:  ${formState.lineId}
CTO:     ${formState.ctoFinal}
Divisor: ${formState.divisor}
Borne:   ${formState.borne}`);
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
      gestor: "",
      timeResponse: "",
      nodo: "",
      comentario: "",
    });
    setTextWsp("");
  };

  const btnCopyToWsp = () => {
    navigator.clipboard.writeText(textWsp);
  };

  const stylo = `font-bold w-full ${isReasigna ? "" : "hidden"}`;
  return (
    <>
      <div className="grid mt-4 w-full max-w-sm items-center gap-1.5">
        <div className="flex">
          <Input
            type="text"
            id="gestor"
            placeholder="Gestor"
            onChange={handleGestor}
            disabled={isGestor}
          />
          <Button className="ml-2" onClick={saveGestor}>
            Guardar
          </Button>
        </div>
        <Label htmlFor="orden">Orden</Label>
        <Input
          type="text"
          id="orden"
          placeholder="Orden"
          onChange={handleChange}
          value={formState.orden}
        />
        <Label htmlFor="lineId">LineID</Label>
        <Input
          type="text"
          id="lineId"
          placeholder="LineID"
          onChange={handleChange}
          value={formState.lineId}
        />
        <Label htmlFor="ctoInicial">CTO Inicial</Label>
        <Input
          type="text"
          id="ctoInicial"
          placeholder="CTO Inicial"
          onChange={handleChange}
          value={formState.ctoInicial}
        />
        <Label htmlFor="ctoFinal">CTO Final</Label>
        <div className="flex gap-3">
          <Input
            type="text"
            id="ctoFinal"
            placeholder="CTO Final"
            onChange={handleChange}
            value={formState.ctoFinal}
          />
          <Input
            type="text"
            id="divisor"
            placeholder="Divisor"
            onChange={handleChange}
            value={formState.divisor}
          />
          <Input
            type="number"
            min="1"
            max="16"
            id="borne"
            onChange={handleChange}
            value={formState.borne}
          />
        </div>
        <Label htmlFor="timeOpen">Hora Inicio Ticket</Label>
        <Input
          type="time"
          id="timeOpen"
          onChange={handleChange}
          value={formState.timeOpen}
        />
        <Label htmlFor="comentario">Comentario</Label>
        <Input
          type="text"
          id="comentario"
          placeholder="Comentario"
          onChange={handleChange}
          value={formState.comentario}
        />
        <div className="flex gap-2">
          <Button id="btnReasignar" onClick={btnReasignacion}>
            Reasignar
          </Button>
          <Button id="copyReasignar" onClick={btnCopyReasigna}>
            Copiar
          </Button>
          <Button id="cleanReasignar" onClick={btnCleanReasigna}>
            Limpiar
          </Button>
        </div>
        <div className={stylo}>
          <p>Orden: {formState.orden}</p>
          <p>LineID: {formState.lineId}</p>
          <p>CTO: {formState.ctoFinal}</p>
          <p>Divisor: {formState.divisor}</p>
          <p>Borne: {formState.borne}</p>
          <Button
            id="btnCopy"
            onClick={btnCopyToWsp}
            className="bg-green-500 hover:bg-green-700 w-full"
          >
            <img src={whasappIcon} alt="whatsapp" className="w-8 h-8 mr-5" />
            <span>Copiar</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReasignaForm;
