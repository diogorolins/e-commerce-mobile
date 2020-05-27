import { EstadoDTO } from "./estado.dto";

export class CidadeDTO {
  id: string;
  name: string;
  state? : EstadoDTO;
}