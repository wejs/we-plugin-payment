# We.js payment plugin

In development ...

## Installation

```sh
we i we-plugin-payment
```

## Development data

Paymento logic:

```
O produto pode ter dados para as buscas que são associados a cada sub loja que é obrigatóriamente associado a um product

product_search 
  -> Nx1 product
  -> NxN Organization

cart 
  -> NxN Product
  -> Nx1 User (optional)

payment_order
  -> 





```


Buy process:

```
o usuário entra na loja
Adiciona 1 ou mais produtos no carrinho
clica em ver carrinho ou fazer checkout
ve a lista de produtos 
Clica em Finalizar compra ou em Pagar
Seleciona a forma de envio
Seleciona a forma de pagamento
Ve um resumo e aceita

o usuário vai parar no paypal
Após aceitar volta para a loja 
O usuário vê uma mensagem de sucesso
```

## Links

* We.js site: http://wejs.org
* Paypal payment example: http://code.runnable.com/UXgzNO_v2oZyAADG/make-a-payment-with-paypal-api-for-node-js

## License

Under [the MIT license](https://github.com/wejs/we/blob/master/LICENSE.md)