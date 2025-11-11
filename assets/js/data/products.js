const products = [
    {
        "code": "001",
        "ean": "7891010244521",
        "name": "Malbec Desodorante Colônia 100ml",
        "baseRetailPrice": 189.90,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/product/B84387/3fcf35bd-e85f-416e-bbbb-755c89f39e95-bot-84387-malbec-malbec-desodorante-colonia-frontal-01.jpg"
    },
    {
        "code": "002",
        "ean": "7891010244538",
        "name": "Lily Eau de Toilette 75ml",
        "baseRetailPrice": 149.90,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B77524/Lily-Eau-de-Parfum-75ml-B77524_.jpg"
    },
    {
        "code": "003",
        "ean": "7891010341527",
        "name": "Egeo Dolce Desodorante Colônia 90ml",
        "baseRetailPrice": 119.90,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B82688/Egeo-Des-Col-Dolce-C-Car-90Ml-B82688_.jpg"
    },
    {
        "code": "004",
        "ean": "7891010341534",
        "name": "Coffee Man Desodorante Colônia 100ml",
        "baseRetailPrice": 159.90,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/product/B74029/9ff28bd4-2308-4d11-b94b-64214706d812-coffee-man-desodorante-colonia-100-ml.png"
    },
    {
        "code": "005",
        "ean": "7891010442613",
        "name": "Floratta Blue Desodorante Colônia 75ml",
        "baseRetailPrice": 139.90,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B01004/FLORATTA-DES-COL-MY-BLUE-75ml-B01004_.jpg"
    },
    {
        "code": "93131",
        "ean": "7891033931316",
        "name": "Siage Ol Cap Bif Nutri Ol/Pod 90Ml",
        "baseRetailPrice": 74.99,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/products/E93131/93131.png"
    },
    {
        "code": "92761",
        "ean": "7891033927616",
        "name": "Glam Lapis Retr P/Sobranc Defin Perf Cl",
        "baseRetailPrice": 59.99,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/E92761/4a81208f-3699-4b7a-b17b-0b9168b01394-e57021-e92761-glam-lapiseira-retratil-para-sobrancelhas-definicao-perfeita.jpg"
    },
    {
        "code": "86973",
        "ean": "7891033869732",
        "name": "Qdb Plt Sombras Chame as Meninas 4G",
        "baseRetailPrice": 79.90,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/Q86973/5b73300c-37c7-405f-abde-a1a93513429b-qdb-86973-meninas-superpoderosas-paleta-01.jpg"
    },
    {
        "code": "86893",
        "ean": "7891033868933",
        "name": "Kit Siage Hair Plastia Mini",
        "baseRetailPrice": 72.99,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/E86893/6e66c746-346f-4d6b-99df-54d120671b51-e86893-siage-kit-miniatura-hairplastia-1.jpg"
    },
    {
        "code": "85995",
        "ean": "7891033859955",
        "name": "Siage Ol Cap Reconstroi/Fios 60Ml",
        "baseRetailPrice": 79.99,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/E85995/bd546ae7-ecfd-4a0d-9999-a718aa662def-e85995-siage-oleo-capilar-reconstroi-os-fios-60ml-1.jpg"
    },
    {
        "code": "85712",
        "ean": "7891033857128",
        "name": "Qdb Plt Duo Sombras 3G",
        "baseRetailPrice": 83.90,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/Q85712/c6dfc11f-3f47-412d-abf1-6669f57e3ed9-qdb-85712-duo-sombras-01.jpg"
    },
    {
        "code": "85403",
        "ean": "7891033854035",
        "name": "Niina Scrt Bat Liq Sk/Mat Cast/Begon 5Ml",
        "baseRetailPrice": 54.99,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/E85403/4842d272-67cc-45ad-a93b-6038cdb30c54-e85403-niina-secrets-batom-liquido-skinny-matte-castanho-begonia-5ml-1.jpg"
    },
    {
        "code": "70878",
        "ean": "7891033708789",
        "name": "Glam Lap Olho Kjal C/Esfum Marr Int 1,1G",
        "baseRetailPrice": 62.99,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/E70878/e1528111-141d-4fba-972b-daba4b124944-glam-lapis-kajal-com-esfumador-822458-p.png"
    },
    {
        "code": "70877",
        "ean": "7891033708772",
        "name": "Glam Lap Olho Kjal C/Esfum Pret Abs 1,1G",
        "baseRetailPrice": 62.99,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/E70877/49ab29fa-fb16-43ee-907f-b2a929df7a21-lapis-kajal-com-esfumador-glam-marrom-intenso-11g-marrom-intenso.png"
    },
    {
        "code": "59885",
        "ean": "7891033598854",
        "name": "Niina Secrets Blush Stick Daily Coral 5G",
        "baseRetailPrice": 59.99,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/E59885/aee471a8-6576-4b8f-b1ec-723328030e81-e59885-niina-secrets-blush-stick-daily-coral-5g-1.jpg"
    },
    {
        "code": "59068",
        "ean": "7891033590681",
        "name": "Instance Sabonete Vegetal Em Barra Perfumado Rosa Absoluta 4X80G",
        "baseRetailPrice": 29.99,
        "image": ""
    },
    {
        "code": "57022",
        "ean": "7891033570225",
        "name": "Glam Lapis Retr Sobranc Medio V2 0,35G",
        "baseRetailPrice": 59.99,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/E57022/393f3b7f-b631-493d-b9a8-1871233edc53-e57022-e92762-glam-lapiseira-retratil-para-sobrancelhas-definicao-perfeita-1.jpg"
    },
    {
        "code": "56984",
        "ean": "7891033569847",
        "name": "Qdb Lapis Olhos Laranjete 1,2G",
        "baseRetailPrice": 45.90,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/Q56984/7d41dc39-9a3b-42b8-aa3a-f777fb3610b3-qdb-56984-lapis-olhos-laranjete-frontal-01.jpg"
    },
    {
        "code": "56983",
        "ean": "7891033569830",
        "name": "Qdb Lapis Olhos Uvissima 1,2G",
        "baseRetailPrice": 45.90,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/Q56983/2a0b9785-09c4-412b-b5db-fe5563c1510e-qdb-56983-lapis-olhos-uvissima-frontal-01.jpg"
    },
    {
        "code": "55804",
        "ean": "7891033558049",
        "name": "Siàge Máscara Capilar Resgate Imediato 250G",
        "baseRetailPrice": 69.99,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/E55804/4a9124a2-6719-4a6a-9a83-9f9ba3ca91ea-e55804-selo-glamour.jpg"
    },
    {
        "code": "55800",
        "ean": "7891033558001",
        "name": "Eudora Glam Palette De Sombras Metals 5,85G",
        "baseRetailPrice": 104.99,
        "image": ""
    },
    {
        "code": "55764",
        "ean": "7891033557646",
        "name": "Siàge Kit Pro Cronology Máscara + 2 Potencializadores",
        "baseRetailPrice": 129.90,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/E55764/363df557-37ae-4244-bcb9-734c5f78a227-ed-cabelos-siage-kit-cronology-55764-1.jpg"
    },
    {
        "code": "54001",
        "ean": "7891033540013",
        "name": "Niina Secrets Batom Líquido Skinny Matte Rose Gardênia 5Ml",
        "baseRetailPrice": 54.99,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/products/E54001/NIINA-SECRETS-BATOM-SKINNY-MATTE-ROSE-GARDENIA-5ml-v2_E54001.jpg"
    },
    {
        "code": "53525",
        "ean": "7891033535255",
        "name": "Siage Oleo De Argan Reconstroi Os Fios 60Ml Rpck 2",
        "baseRetailPrice": 79.99,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/products/E53525/SIAGE_OLEO_ARGAN_RECONSTROI_OS_FIOS_E53525_PRINCIPAL_1.jpg"
    },
    {
        "code": "53440",
        "ean": "7891033534401",
        "name": "Siage Mascara Capilar Regeneracao Pós Química 250G Rpck 2",
        "baseRetailPrice": 69.99,
        "image": ""
    },
    {
        "code": "53355",
        "ean": "7891033533558",
        "name": "Siàge Máscara Capilar Pro Cronology 250Gr",
        "baseRetailPrice": 69.99,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/E53355/95e110c7-31b2-424b-9e93-7ec2fc53018b-ed-cabelos-siage-mascara-cronology-250g-53355-frontal-1.jpg"
    },
    {
        "code": "50705",
        "ean": "7891033507054",
        "name": "Make B Blush Po C/Ac Polig Coral 5,5G",
        "baseRetailPrice": 79.90,
        "image": "https://revendedores.grupoboticario.com.br/produto/blush-em-po-mate-luminoso-coral-make-b-55g?sku=50705"
    },
    {
        "code": "49901",
        "ean": "7891033499014",
        "name": "Qdb Pincel Sombra",
        "baseRetailPrice": 42.90,
        "image": "https://res.cloudinary.com/beleza-na-web/image/upload/w_297,f_auto,fl_progressive,q_auto:best/v1/imagens/product/Q49901/5b72069e-605b-4709-a0af-dfde052e6e17-q49901-repack-pinceis-color.jpg"
    }
];
