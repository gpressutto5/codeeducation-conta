window.appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
        'lista-component': listaComponent,
        'form-component': formComponent
    },
    template: `
<div>
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
                <router-view></router-view>
                <!--<div v-show="!activatedView">
                    <lista-component></lista-component>
                </div>
                <div v-show="activatedView">
                    <form-component :conta="conta"></form-component>
                </div>-->
            </div>
        </div>
    </div>
</div>
    `,
    data: function() {
        return {
            titulo: "Contas a pagar",
            formType: 'insert',
            activatedView: 0,
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