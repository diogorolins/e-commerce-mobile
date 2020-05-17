import { RefDTO } from "./ref.dto";
import { PagamentoDTO } from "./pagamento.dto";
import { ItemPedidoDTO } from "./item-pedido.dto";

export interface PedidoDTO {
  client: RefDTO;
  address: RefDTO;
  payment: PagamentoDTO;
  items: ItemPedidoDTO[];
}