import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { read, utils } from "xlsx";
import ComboBox from "../components/ComboBox";
import { transposeMatrix, cleanCell } from "../utils/timbrado";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TimbradoForm from "@/components/TimbradoForm";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useConsolidadoStore } from "@/store/consolidado";

interface PropsComboBox {
  value: string;
  label: string;
}

const Timbrado = () => {
  const departamentosArray: PropsComboBox[] = [];
  const gestoresArray: PropsComboBox[] = [];
  const tecnicosArray: PropsComboBox[] = [];

  const [open, setOpen] = useState(false);

  const [dataRoutes, setDataRoutes] = useState<any[]>([]);

  const [department, setDepartment] = useState<string[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataRuta: any[] = [];
    if (!e.target.files) return;
    const file = e.target.files[0];
    /* data is an ArrayBuffer */
    const data = await file.arrayBuffer();
    const workbook = read(data);

    const departments = workbook.SheetNames;

    const newDepartments: string[] = []; // Nueva lista de departamentos

    departments.forEach((department) => {
      let rutas: any[] = [];
      const jsonData: any[] = utils.sheet_to_json(
        workbook.Sheets[`${department}`],
        {
          header: 1,
        }
      );
      const t = transposeMatrix(jsonData);

      t.map((row) => {
        let _ctos: string[] = [];
        let ctoState: any[] = [];
        for (let i = 3; i < row.length; i++) {
          _ctos.push(row[i]);
        }
        _ctos.map((cto) => {
          ctoState.push({
            cto: cto,
            state: "NO TIMBRADO",
            observation: "",
          });
        });
        let ruta = cleanCell(row[0]);
        let gestor = cleanCell(row[1]);
        let tecnico = cleanCell(row[2]).toUpperCase();
        rutas.push({
          ruta: ruta,
          gestor: gestor,
          tecnico: tecnico,
          ctos: ctoState,
        });
      });

      dataRuta.push({
        departamento: department,
        rutas: rutas,
      });
      newDepartments.push(department); // Agregar el nombre del departamento a la lista
      console.log(dataRuta);
    });

    setDepartment(newDepartments);
    setDataRoutes(dataRuta); // Actualizar el estado de departamentos
  };

  // Zustand
  // const cto = useConsolidadoStore((state) => state.cto);

  return (
    <>
      <h1>Timbrados</h1>
      {/* <p>Zustand test CTO: {cto}</p> */}
      <div className="flex flex-col mt-4 w-full gap-1.5">
        {/* <div className="flex gap-2 items-end">
          <div>
            <Label htmlFor="ruta">Ruta</Label>
            <Input type="text" id="ruta" placeholder="Ruta" />
          </div>
          <div>
            <Label htmlFor="ruta">Gestor</Label>
            <Input type="text" id="gestor" placeholder="Gestor" />
          </div>
          <div>
            <Label htmlFor="ruta">Tecnico</Label>
            <Input type="text" id="tecnico" placeholder="Tecnico" />
          </div>
          <Button className="w-32">Guardar</Button>
        </div> */}
        <div className="flex flex-col gap-2 mt-3">
          <Label htmlFor="orden">CSV Programacion de rutas</Label>
          <Input
            type="file"
            placeholder="Ruta Asignada"
            onChange={handleFileUpload}
          ></Input>
        </div>
        {/* <div className="flex flex-col gap-1.5">
          <Label htmlFor="ruta">Departamento</Label>
          <ComboBox props={departamentosArray} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ruta">Gestor</Label>
          <ComboBox props={gestoresArray} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ruta">Tecnico</Label>
          <ComboBox props={tecnicosArray} />
        </div> */}
      </div>
      <div className=" w-auto h-auto">
        <Tabs defaultValue="LIMA">
          <TabsList>
            {department.map((data, index) => (
              <TabsTrigger key={`TT${index}`} value={data}>
                {data}
              </TabsTrigger>
            ))}
          </TabsList>
          {department.map((data, index) => (
            <TabsContent key={index} value={data}>
              Contenido para {data}
              <div>
                {dataRoutes[index].rutas.map((ruta: any, index: number) => (
                  <Card key={index} className="mt-2">
                    <h2 className="text-lg font-bold ml-4 mt-3">{ruta.ruta}</h2>

                    <ToggleGroup
                      type="multiple"
                      variant="outline"
                      className="grid grid-cols-4 gap-2 p-3"
                    >
                      {ruta.ctos.map((cto: any, index: number) => (
                        <Dialog>
                          <DialogTrigger asChild>
                            <ToggleGroupItem key={index} value={cto.cto}>
                              {cto.cto}
                            </ToggleGroupItem>
                          </DialogTrigger>
                          <DialogContent
                            className="min-w-fit"
                            onInteractOutside={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <ScrollArea className="h-[500px]  ">
                              <DialogHeader>
                                <DialogTitle>{cto.cto}</DialogTitle>
                                <DialogDescription>
                                  CTO HORIZONTAL
                                  <ToggleGroup type="multiple">
                                    <ToggleGroupItem
                                      value="bold"
                                      aria-label="Toggle bold"
                                    >
                                      1
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                      value="italic"
                                      aria-label="Toggle italic"
                                    >
                                      2
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                      value="strikethrough"
                                      aria-label="Toggle strikethrough"
                                    >
                                      3
                                    </ToggleGroupItem>
                                  </ToggleGroup>
                                </DialogDescription>
                              </DialogHeader>
                              <TimbradoForm />
                              <DialogFooter className="justify-start">
                                <DialogClose asChild>
                                  <Button type="button" variant="secondary">
                                    Guardar
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </ToggleGroup>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default Timbrado;
