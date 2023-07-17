# Processo Seletivo React

- O frontend construído com o framework React segue como exemplo o protótipo informado no documento do processo seletivo.
- No frontend o usuário é capaz de informar um período de tempo e/ou nome do operador da transação como filtros para buscar as transações.
- As transações são exibidas junto com o saldo total e o saldo total no período filtrado de acordo com o protótipo do documento.
- É possível visualizar todas as transações e as transações específicas para uma conta. A tela inicial carrega todas as transações presentes e também o saldo total que elas geram. Para o outro caso, basta apenas digitar o `id` da conta e será mostrada apenas as transferências relacionadas com a conta em questão. Além disso, é possível adicionar ainda mais filtros como o nome do operador da transação e o período em que foi realizada a transferência.
- O back-end do projeto está disponível em [back-end](https://github.com/guiseixas/desafio-supera).

Exemplos simples de execução:

Tela inicial: retorna todas as transferências presentes na base de dados da API assim como o saldo total levando em consideração o tipo de transferência: SALDO, DEPÓSITO, ENTRADA OU SAÍDA.

![image](https://github.com/guiseixas/desafio-supera-react/assets/83587109/2ea81866-fcd1-4950-908d-3b4db59389e0)

Aplicação de filtros: foi aplicado o filtro de conta, retornando apenas as transferências da conta de `id = 1` onde a data da transferência está no intervalo data início e data fim demonstrando também o saldo geral das transações retornadas e o saldo no período.

![image](https://github.com/guiseixas/desafio-supera-react/assets/83587109/5d0f515f-c189-4eef-b981-9b1a4d02fba7)

É possível realizar mais combinações de filtros para obter diferentes resultados de transferências retornados da API.
