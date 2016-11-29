var router = new VueRouter();

router.map({
    '/contas': {
        component: listaComponent
    },
    '/conta/criar': {
        component: formComponent
    }
});

router.start({
    components: {
        'app-component': appComponent
    }
});