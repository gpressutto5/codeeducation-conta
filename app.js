var formComponent = Vue.extend({
    props: ['conta'],
    template: `
<form  class="form-horizontal" @submit.prevent="cadastrar">
    <div class="form-group">
        <label for="nome" class="col-md-2 control-label">Vencimento</label>
        <div class="col-md-5">
            <input name="vencimento" type="text" class="form-control" v-model="conta.vencimento">
        </div>
    </div>
    <div class="form-group">
        <label for="nome" class="col-md-2 control-label">Nome</label>
        <div class="col-md-5">
            <input name="nome" type="text" class="form-control" v-model="conta.nome">
        </div>
    </div>
    <div class="form-group">
        <label for="valor" class="col-md-2 control-label">Valor</label>
        <div class="col-md-5">
            <div class="input-group">
                <span class="input-group-addon">R$</span>
                <input name="valor" type="number" min="0" step="0.01" class="form-control" v-model="conta.valor">
            </div>
        </div>
    </div>
    <div class="col-md-5 col-md-offset-2">
        <div class="form-group">
            <button class="btn btn-primary form-control" type="submit">Cadastrar</button>
        </div>
    </div>
</form>
`,
    methods: {
        cadastrar: function(){
            if (this.$parent.formType == 'insert') {
                this.$parent.$children[1].contas.push(this.conta);
            }
            this.$parent.activatedView = 0;
            this.$parent.conta = {
                vencimento: '',
                nome: '',
                valor: 0,
                pago: 0
            };
        }
    }
})
var listaComponent = Vue.extend({
    template: `
<h3 v-show="!contas.length" class="text-info text-center">Não há contas</h3>
<table class="table table-hover" v-show="contas.length">
    <thead>
        <tr>
            <th>#</th>
            <th>Vencimento</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(index,conta) in contas">
            <td>{{ index + 1 }}</td>
            <td>{{ conta.vencimento }}</td>
            <td>{{ conta.nome }}</td>
            <td>{{ conta.valor | currency 'R$ ' 2 }}</td>
            <td><span class="label" :class="{ 'label-success': conta.pago, 'label-danger': !conta.pago }">{{ conta.pago | status }}</span></td>
            <td>
                <div class="dropdown">
                    <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Ações
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a href="#" @click.prevent="carregarConta(conta)"><i class="fa fa-fw fa-pencil-square-o" aria-hidden="true"></i> Editar</a></li>
                        <li><a href="#" @click.prevent="pagarConta(conta)"><i class="fa fa-fw fa-money" aria-hidden="true"></i> {{ conta.pago ? 'Não foi pago':'Pagar' }}</a></li>
                        <li><a href="#" @click.prevent="removerConta(index,conta)"><i class="fa fa-fw fa-trash" aria-hidden="true"></i> Remover</a></li>
                    </ul>
                </div>
            </td>
        </tr>
    </tbody>
</table>
    `,
    data: function(){
        return{
            contas: [
                {vencimento: '20/12/2016', nome: 'Conta de Luz', valor: 153.47, pago: 1},
                {vencimento: '21/12/2016', nome: 'Conta de Água', valor: 84.32, pago: 0},
                {vencimento: '22/12/2016', nome: 'Conta de Telefone', valor: 174.87, pago: 0},
                {vencimento: '23/12/2016', nome: 'Supermercado', valor: 354.12, pago: 0},
                {vencimento: '24/12/2016', nome: 'Cartão de Crédito', valor: 1874.21, pago: 0},
                {vencimento: '25/12/2016', nome: 'Gasolina', valor: 354.11, pago: 0},
                {vencimento: '26/12/2016', nome: 'Aluguel', valor: 1300, pago: 0}
            ]
        };
    },
    methods: {
        carregarConta: function(conta){
            this.$parent.conta = conta;
            this.$parent.formType = 'update';
            this.$parent.activatedView = 1;
        },
        pagarConta: function(conta){
            conta.pago = !conta.pago;
        },
        removerConta: function(index,conta){
            if (confirm("Tem certeza que deseja apagar " + conta.nome + "?")) {
                this.contas.splice(index,1);
            }
        }
    }
});
var menuComponent = Vue.extend({
    template: `
<ul class="nav nav-tabs">
    <li v-for="link in menus" class="{{ activatedView == link.id ? 'active' : '' }}"><a href="#" @click.prevent="showView(link.id)">{{ link.nome }}</a></li>
</ul>
`,
    props: ['activated-view'],
    data: function(){
        return {
            menus: [
                {id: 0, nome: "Listar contas"},
                {id: 1, nome: "Criar conta"}
            ]
        };
    },
    methods: {
        showView: function(opcao){
            this.$parent.activatedView = opcao;
            if (this.$parent.formType == 'update'){
                this.$parent.conta = {
                    vencimento: '',
                    nome: '',
                    valor: 0,
                    pago: 0
                };
            }
            if (opcao == 1) {
                this.$parent.formType = 'insert';
            }
        }
    }
});
var appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
        'lista-component': listaComponent,
        'form-component': formComponent
    },
    template: `
<nav class="navbar navbar-default">
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="navbar-brand">
                    Contas
                </div>
            </div>
        </div>
    </div>
</nav>
<div class="container" v-cloak>
    <div class="row"><div class="col-md-12 text-center">
        <h1>{{ titulo }}</h1>
        <h3>{{ status }}</h3>
    </div></div>
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <hr>
            <menu-component :activated-view="activatedView"></menu-component>
            <br/>
            <div v-show="!activatedView">
                <lista-component></lista-component>
            </div>
            <div v-show="activatedView">
                <form-component :conta="conta"></form-component>
            </div>
        </div>
    </div>
</div>
    `,
    data: function() {
        return {
            titulo: "Contas a pagar",
            formType: 'insert',
            activatedView: 1,
            conta: {
                vencimento: '',
                nome: '',
                valor: 0,
                pago: 0
            },
        };
    },
    computed: {
        status: function(){
            var count = 0;
            for(var i in this.$children[0].contas){
                if (!this.$children[0].contas[i].pago) {
                    count++;
                }
            }
            return !count ? "Nenhuma conta a pagar." : "Existem " + count + " contas a pagar.";
        }
    }
});
Vue.component('app-component', appComponent);
var app = new Vue({
    el: "#app"
});