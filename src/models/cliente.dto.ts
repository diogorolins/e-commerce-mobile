import { EnderecoDTO } from "./endereco.dto";

export class ClienteDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
  cpfCnpj: string;
  clientType: string;
  addresses: EnderecoDTO[];
  phones: string[];
  roles: string[];

}