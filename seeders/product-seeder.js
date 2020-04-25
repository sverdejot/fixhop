var db = require('../config/db');
var Product = require('../model/product');

var products = [
    {
        name: 'Leader 721',
        description: 'Diseñada especialmente para ser usada en entornos urbanos, la bicicleta fixie Leader 721 2016 ofrece tanto funcionalidad como comodidad, gracias a su ligereza, y es perfecta para aquellos ciclistas que busquen un acabado impecable y de buen gusto.',
        url: '/images/products/leader721.png',
        price: 595.95
    },
    {
        name: 'Aventon Mataró',
        description: 'La bicicleta de pista Aventon Mataro ya es un clásico de las bicicletas de piñón fijo. Pero no uno de esos clásicos aburridos! Al contrario, es perfecta para el ciclista que busca que su corazón palpite mientras sortea el tráfico.',
        url: '/images/products/mataro.png',
        price: 595.95
    },
    {
        name: 'BLB La Piovra ATK',
        description: 'La bicicleta de pista La Piovra ATK es para los que buscan ligereza, belleza y calidad. Este nuevo cuadro tiene las soldaduras suaves, el tubo superior inclinado para darle más agresividad a la bici y permite una posición más aerodinámica del ciclista.',
        url: '/images/products/lapiovra.png',
        price: 765.95
    },
    {
        name: 'Polo&bike Williamsburg',
        description: ' Originalidad creada con calidad que constituye nuestra aportación a tu diversión. Nuestras bicicletas fixed y sus componentes nacen con la intención de aportar nuevas maneras de vivir. Polo & Bike es un estilo de vida nuevo, sano y deportivo.',
        url: '/images/products/williamsburg.png',
        price: 895.95
    },
    {
        name: 'BLB Notorious Disc',
        description: 'Cualquier ciclista experimentado sentirá de inmediato la diferencia en la capacidad de respuesta y la rigidez al utilizar esta rueda. Su tamaño es 700c, es decir es compatible con todas las ruedas de bicicleta de carretera. Puedes ponerle cubiertas de 23 y de 25.',
        url: '/images/products/notorious-disc.png',
        price: 999.95
    },
    {
        name: 'BLB Notorious 90',
        description: 'La llanta Notorious está hecha 100% de carbono 3k y tiene 90mm de perfil. Es una llanta ultraligera para el perfil tan alto que tiene. Y puedes tener tu rueda eligiendo entre 2 bujes: el BLB King de alta calidad y el BLB Track, que harán que la calidad y el precio final varíen.',
        url: '/images/products/notorious-90.png',
        price: 395.95
    },
    {
        name: 'HED 3 H3 Track',
        description: 'Desde el año 1984 Steve Hed ha dedicado su vida a desarrollar las mejores ruedas para ciclismo de alta competición. Cuando se trata de ruedas, estas tienen que ser lo más rápidas posibles, que aunque parece fácil, hacer las ruedas más rápidas del mundo es complicado.',
        url: '/images/products/hed3-jet.png',
        price: 1795.95
    },
    {
        name: 'Cinelli Mash Bullhorn',
        description: 'Cinelli es una de las marcas más reconocidas a nivel mundial como fabricante de bicicletas y componentes. Fue fundada en 1948 por Cino Cinelli (1916-2001), que fue ciclista profesional y presidente de la Asociación de Ciclistas Italianos.',
        url: '/images/products/cinelli-mash.png',
        price: 105.95
    }
];

Promise.all(products.map(product => new Product(product).save()))
    .then(() => {
        return Product.find()
    })
    .then(products => { 
        for (let product of products) console.log('Product [' + product.name + '] added to DB')
    })
    .catch(err => console.error(err));


