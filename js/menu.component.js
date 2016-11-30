window.menuComponent = Vue.extend({
    template: `
<ul class="nav nav-tabs">
    <router-link v-for="link in menus" tag="li" to="link.url">
        <a>{{ link.nome}}</a>
    </router-link>
    <!--<li v-for="link in menus" class="{{ activatedView == link.id ? 'active' : '' }}"><router-link to="/foo">{{ link.nome }}</router-link></li>-->
</ul>
<router-link to="/foo">teste</router-link>
`,
    props: ['activated-view'],
    data: function(){
        return {
            menus: [
                {id: 0, nome: "Listar contas", url: "/contas"},
                {id: 1, nome: "Criar conta", url: "/conta/criar"}
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