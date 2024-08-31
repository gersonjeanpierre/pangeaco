import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const TimbradoForm = () => {
  // Estado inicial para manejar los valores de los inputs
  const [formData, setFormData] = useState({
    cto: "",
    borne: "",
    olt: "",
    slot: "",
    port: "",
    onuFinal: "",
    estadoInicial: "",
    estadoFinal: "",
    potenciaAntes: "",
    potenciaDespues: "",
    potenciaCampo: "",
    serialNumber: "",
    vnoCodeFinal: "",
    comentario: "",
    observacion: "",
    ctoCampo: "",
    tecnico: "",
    fecha: "",
    horaInicio: "",
    horaCierre: "",
    gestor: "",
  });

  // Manejar cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Manejar cambios en los selects
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="h-[600px] grid grid-cols-4 gap-3 items-end pl-1.5"
    >
      {/* <div>
        <Label htmlFor="cto">CTO</Label>
        <Input
          type="text"
          id="cto"
          name="cto"
          value={formData.cto}
          onChange={handleChange}
        />
      </div> */}

      <div>
        <Label htmlFor="borne">BORNE</Label>
        <Input
          type="text"
          id="borne"
          name="borne"
          value={formData.borne}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="olt">OLT</Label>
        <Input
          type="text"
          id="olt"
          name="olt"
          value={formData.olt}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="slot">SLOT</Label>
        <Input
          type="text"
          id="slot"
          name="slot"
          value={formData.slot}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="port">PORT</Label>
        <Input
          type="text"
          id="port"
          name="port"
          value={formData.port}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="onuFinal">ONU-FINAL</Label>
        <Input
          type="text"
          id="onuFinal"
          name="onuFinal"
          value={formData.onuFinal}
          onChange={handleChange}
        />
      </div>

      {/* <div>
        <Label htmlFor="estadoInicial">ESTADO EN CAMPO INICIAL</Label>
        <Select
          defaultValue={formData.estadoInicial}
          onValueChange={(value) => handleSelectChange("estadoInicial", value)}
        >
          <SelectItem value="OCUPADO">OCUPADO</SelectItem>
          <SelectItem value="DISPONIBLE">DISPONIBLE</SelectItem>
          <SelectItem value="RESERVADO">RESERVADO</SelectItem>
        </Select>
      </div>

      <div>
        <Label htmlFor="estadoFinal">ESTADO EN CAMPO FINAL</Label>
        <Select
          defaultValue={formData.estadoFinal}
          onValueChange={(value) => handleSelectChange("estadoFinal", value)}
        >
          <SelectItem value="OCUPADO">OCUPADO</SelectItem>
          <SelectItem value="DISPONIBLE">DISPONIBLE</SelectItem>
          <SelectItem value="RESERVADO">RESERVADO</SelectItem>
        </Select>
      </div> */}

      <div>
        <Label htmlFor="potenciaAntes">POTENCIA-ANTES</Label>
        <Input
          type="text"
          id="potenciaAntes"
          name="potenciaAntes"
          value={formData.potenciaAntes}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="potenciaDespues">POTENCIA-DESPUES</Label>
        <Input
          type="text"
          id="potenciaDespues"
          name="potenciaDespues"
          value={formData.potenciaDespues}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="potenciaCampo">POTENCIA-EN CAMPO</Label>
        <Input
          type="text"
          id="potenciaCampo"
          name="potenciaCampo"
          value={formData.potenciaCampo}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="serialNumber">SERIAL NUMBER</Label>
        <Input
          type="text"
          id="serialNumber"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="vnoCodeFinal">VNO CODE-FINAL</Label>
        <Input
          type="text"
          id="vnoCodeFinal"
          name="vnoCodeFinal"
          value={formData.vnoCodeFinal}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="comentario">COMENTARIO</Label>
        <Textarea
          id="comentario"
          name="comentario"
          value={formData.comentario}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="observacion">OBSERVACION</Label>
        <Textarea
          id="observacion"
          name="observacion"
          value={formData.observacion}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="ctoCampo">CTO EN CAMPO</Label>
        <Input
          type="text"
          id="ctoCampo"
          name="ctoCampo"
          value={formData.ctoCampo}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="tecnico">TECNICO</Label>
        <Input
          type="text"
          id="tecnico"
          name="tecnico"
          value={formData.tecnico}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="fecha">FECHA</Label>
        <Input
          type="date"
          id="fecha"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="horaInicio">HORA-INICIO</Label>
        <Input
          type="time"
          id="horaInicio"
          name="horaInicio"
          value={formData.horaInicio}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="horaCierre">HORA-CIERRE</Label>
        <Input
          type="time"
          id="horaCierre"
          name="horaCierre"
          value={formData.horaCierre}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="gestor">GESTOR</Label>
        <Input
          type="text"
          id="gestor"
          name="gestor"
          value={formData.gestor}
          onChange={handleChange}
        />
      </div>

      <Button type="submit">Guardar</Button>
    </form>
  );
};

export default TimbradoForm;
