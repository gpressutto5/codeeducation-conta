window.menuComponent = Vue.extend({
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