import { CidadeDTO } from "./cidade.dto";

export interface EnderecoDTO {
  id: string;
  street: string;
  number: string;
  compl: string;
  neighborhood: string;
  zipCode: string;
  city: CidadeDTO;

}