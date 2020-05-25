import { CategoriaDTO } from "./categoria.dto";

export interface ProdutoDTO {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  categories?: CategoriaDTO[];
}