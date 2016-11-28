var app = new Vue({
	el: "#app",
	data: {
		titulo: "Contas a pagar",
		contas: [
			{vencimento: '20/12/2016', nome: 'Conta de Luz', valor: 153.47, pago: 1},
			{vencimento: '21/12/2016', nome: 'Conta de Água', valor: 84.32, pago: 0},
			{vencimento: '22/12/2016', nome: 'Conta de Telefone', valor: 174.87, pago: 0},
			{vencimento: '23/12/2016', nome: 'Supermercado', valor: 354.12, pago: 0},
			{vencimento: '24/12/2016', nome: 'Cartão de Crédito', valor: 1874.21, pago: 0},
			{vencimento: '25/12/2016', nome: 'Gasolina', valor: 354.11, pago: 0},
			{vencimento: '26/12/2016', nome: 'Aluguel', valor: 1300, pago: 0}
		]
	},
	computed: {
		status: function(){
			var count = 0;
			for(var i in this.contas){
				if (!this.contas[i].pago) {
					count++;
				}
			}
			return !count ? "Nenhuma conta a pagar." : "Existem " + count + " contas a pagar.";
		}
	}
});