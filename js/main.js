const Foo = { template: "<div>Foo</div>" };

var router = new VueRouter({
    routes: [
        { path: '/contas',      component: listaComponent },
        { path: '/conta/criar', component: formComponent },
        { path: '/foo',         component: Foo },
        { path: '*',            component: listaComponent }
    ]
});

const app = new Vue({
    router: router,
    components: {
        'app-component': appComponent
    }
}).$mount('#app');