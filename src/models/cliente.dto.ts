import { EnderecoDTO } from "./endereco.dto";

export interface ClienteDTO {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  cpfCnpj: string;
  clientType: string;
  addresses: EnderecoDTO[];
  phones: string[];
  roles: string[];

}