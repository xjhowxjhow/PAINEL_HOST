# PAINEL_HOST
Sistema de gerenciamento de senhas feito em Node.JS
A ideia desse projeto é atender pequenas clínicas ou comércios que precisam de organização no atendimento ao cliente.
Com esse software é possível atender em tempo real as filas de atendimento com senhas do estabelecimento.

Ele conta com 2 pavimentos:

1 - Recepção: O primeiro contato com o cliente, onde o mesmo será encaminhado para ser atendido (guichê).

2 - Salas de atendimento: o segundo e final contato com o cliente, após ser redirecionado no primeiro pavimento. Lá será possível tanto finalizar o atendimento com o cliente ou redirecioná-lo para outras salas do pavimento, até ser finalizado.

Funcionalidades:

1 - Rede local: Após iniciar o programa no seu executável (.exe), o mesmo já enxerga o localhost e é definido para ser utilizado nele. Portanto, a recomendação é que seja iniciado/hospedado o programa no servidor do estabelecimento, onde as máquinas que se conectam de alguma maneira ao servidor principal possam acessar o endereço a partir de seu escritório de atendimento. Por ser web, o mesmo é possível acessar via mobile, usando o seu navegador de preferência.

2 - Atendimento múltiplo: Como é possível cadastrar de 1 para muitos guichês/salas, é possível atender diversos clientes ao mesmo tempo para cada entidade (guichê/sala), mantendo o fluxo pela ordem de emissão da senha.

3 - Guichês/salas múltiplos: É totalmente personalizável o cadastro de salas e guichês. Você pode definir o que cada entidade vai fazer atribuindo o nome a esse item. Não há limites.

4 - A cronologia do sistema de senhas é sempre pela ordem de chegada, mantendo assim um fluxo correto.

5 - Possibilidade de exibição no painel a senha por número/nome do cliente, fica a critério do atendente.


# INSTALACAO

- Instale o Node.JS em sua máquina (https://nodejs.org/en/download/)
- Clone o repositório em sua máquina
- Abra o terminal e navegue até a pasta do projeto
- Execute o comando: ```bash
  npm install```
- Execute o comando: ```node index.js``` ou se preferir pode utilizar o nodemon.js ```nodemon index.js```
- Acesse o endereço: http://seuiplocal:3000


# Backgrounds:
- Painel 1
- ![6](https://github.com/xjhowxjhow/PAINEL_HOST/assets/58306583/1d372bbf-b159-48ed-bb9b-51f52bde4a23)

- Painel 2:
- ![8](https://github.com/xjhowxjhow/PAINEL_HOST/assets/58306583/a670bba8-7da8-432d-8b51-8a1faaf8a8cd)

- Menu de servicos:
- ![1](https://github.com/xjhowxjhow/PAINEL_HOST/assets/58306583/9f95c20d-45b4-42e5-9bef-7c28d9940582)

- Toten:
- ![3](https://github.com/xjhowxjhow/PAINEL_HOST/assets/58306583/0ee2c915-df76-4583-a618-2b9870f11bed)

- Painel Guiche (Atendimento) / Salas de atendimentos ( Redirecionamento/encaminhamento)
- ![4](https://github.com/xjhowxjhow/PAINEL_HOST/assets/58306583/6014a81d-b630-489e-907d-ccc8c315cb64)
