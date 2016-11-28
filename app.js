var app = new Vue({
	el: "#app",
	data: {
		titulo: "Contas a pagar",
		contas: [
			{vencimento: '20/08/2016', nome: 'Conta de Luz', valor: 153.47},
			{vencimento: '21/08/2016', nome: 'Conta de Água', valor: 84.32},
			{vencimento: '22/08/2016', nome: 'Conta de Telefone', valor: 174.87}
		]
	}
});