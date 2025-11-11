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
        "image": ""
    },
    {
        "code": "92761",
        "ean": "7891033927616",
        "name": "Glam Lapis Retr P/Sobranc Defin Perf Cl",
        "baseRetailPrice": 59.99,
        "image": ""
    },
    {
        "code": "86973",
        "ean": "7891033869732",
        "name": "Qdb Plt Sombras Chame as Meninas 4G",
        "baseRetailPrice": 79.90,
        "image": ""
    },
    {
        "code": "86893",
        "ean": "7891033868933",
        "name": "Kit Siage Hair Plastia Mini",
        "baseRetailPrice": 72.99,
        "image": ""
    },
    {
        "code": "86875",
        "ean": "7891033868759",
        "name": "Siage Ol Cap Nutri Rose 60Ml",
        "baseRetailPrice": 79.99,
        "image": ""
    },
    {
        "code": "86724",
        "ean": "7891033867240",
        "name": "Cj Sch Siage Nutri Ac/Compl Sh/C/M 3X7Ml",
        "baseRetailPrice": 2.49,
        "image": ""
    },
    {
        "code": "85995",
        "ean": "7891033859955",
        "name": "Siage Ol Cap Reconstroi/Fios 60Ml",
        "baseRetailPrice": 79.99,
        "image": ""
    },
    {
        "code": "85712",
        "ean": "7891033857128",
        "name": "Qdb Plt Duo Sombras 3G",
        "baseRetailPrice": 83.90,
        "image": ""
    },
    {
        "code": "85708",
        "ean": "7891033857081",
        "name": "Kit Caixa M Eudora Unit Mães 2025",
        "baseRetailPrice": 9.90,
        "image": ""
    },
    {
        "code": "85705",
        "ean": "7891033857050",
        "name": "Kit Caixa M Eudora Unit Natal 2025",
        "baseRetailPrice": 8.70,
        "image": ""
    },
    {
        "code": "85403",
        "ean": "7891033854035",
        "name": "Niina Scrt Bat Liq Sk/Mat Cast/Begon 5Ml",
        "baseRetailPrice": 54.99,
        "image": ""
    },
    {
        "code": "84216",
        "ean": "7891033842162",
        "name": "Kit Oui Descoberta",
        "baseRetailPrice": 36.28,
        "image": ""
    },
    {
        "code": "77814",
        "ean": "7891033778140",
        "name": "Qdb Lap Olh Pretuco 1,2G V3",
        "baseRetailPrice": 45.90,
        "image": ""
    },
    {
        "code": "70878",
        "ean": "7891033708789",
        "name": "Glam Lap Olho Kjal C/Esfum Marr Int 1,1G",
        "baseRetailPrice": 62.99,
        "image": ""
    },
    {
        "code": "70877",
        "ean": "7891033708772",
        "name": "Glam Lap Olho Kjal C/Esfum Pret Abs 1,1G",
        "baseRetailPrice": 62.99,
        "image": ""
    },
    {
        "code": "59959",
        "ean": "7891033599592",
        "name": "Kit Caixa M Eudora Natal 2024",
        "baseRetailPrice": 9.90,
        "image": ""
    },
    {
        "code": "59885",
        "ean": "7891033598854",
        "name": "Niina Secrets Blush Stick Daily Coral 5G",
        "baseRetailPrice": 59.99,
        "image": ""
    },
    {
        "code": "59068",
        "ean": "7891033590681",
        "name": "Instance Sabonete Vegetal Em Barra Perfumado Rosa Absoluta 4X80G",
        "baseRetailPrice": 29.99,
        "image": ""
    },
    {
        "code": "58441",
        "ean": "7891033584413",
        "name": "Qdb Lapis Olhos Lavandissima 1,2G",
        "baseRetailPrice": 45.90,
        "image": ""
    },
    {
        "code": "58210",
        "ean": "7891033582105",
        "name": "Cj Sch Siage Nut Ac/Com Sh/C/M Vda 3X7Ml",
        "baseRetailPrice": 2.49,
        "image": ""
    },
    {
        "code": "58068",
        "ean": "7891033580682",
        "name": "Conj Sachet Cachos E Crespos - 4X7Ml Doação",
        "baseRetailPrice": 0.61,
        "image": ""
    },
    {
        "code": "57022",
        "ean": "7891033570225",
        "name": "Glam Lapis Retr Sobranc Medio V2 0,35G",
        "baseRetailPrice": 59.99,
        "image": ""
    },
    {
        "code": "56985",
        "ean": "7891033569854",
        "name": "Qdb Lapis Olhos Pinkete 1,2G",
        "baseRetailPrice": 45.90,
        "image": ""
    },
    {
        "code": "56984",
        "ean": "7891033569847",
        "name": "Qdb Lapis Olhos Laranjete 1,2G",
        "baseRetailPrice": 45.90,
        "image": ""
    },
    {
        "code": "56983",
        "ean": "7891033569830",
        "name": "Qdb Lapis Olhos Uvissima 1,2G",
        "baseRetailPrice": 45.90,
        "image": ""
    },
    {
        "code": "55804",
        "ean": "7891033558049",
        "name": "Siàge Máscara Capilar Resgate Imediato 250G",
        "baseRetailPrice": 69.99,
        "image": ""
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
        "image": ""
    },
    {
        "code": "54003",
        "ean": "7891033540037",
        "name": "Niina Secrets Batom Líquido Skinny Matte Vermelho Hibisco 5Ml",
        "baseRetailPrice": 54.99,
        "image": ""
    },
    {
        "code": "54001",
        "ean": "7891033540013",
        "name": "Niina Secrets Batom Líquido Skinny Matte Rose Gardênia 5Ml",
        "baseRetailPrice": 54.99,
        "image": ""
    },
    {
        "code": "53968",
        "ean": "7891033539680",
        "name": "Combo Sachet Siage Regeneracao Pós Química Shampoo Condicionador Mascara 3X7Ml Venda Rpck 2",
        "baseRetailPrice": 2.49,
        "image": ""
    },
    {
        "code": "53960",
        "ean": "7891033539604",
        "name": "Combo Sachet Siage Nutri Rose Shampoo Condicionador Mascara 3X7Ml Venda Rpck 2",
        "baseRetailPrice": 2.49,
        "image": ""
    },
    {
        "code": "53946",
        "ean": "7891033539468",
        "name": "Combo Sachet Siage Liso Intenso Shampoo Condicionador Mascara 3X7Ml Venda Rpck 2",
        "baseRetailPrice": 2.49,
        "image": ""
    },
    {
        "code": "53945",
        "ean": "7891033539451",
        "name": "Combo Sachet Siage Acelera O Crescimento Shampoo Condicionador Mascara 3X7Ml Venda Rpck 2",
        "baseRetailPrice": 2.49,
        "image": ""
    },
    {
        "code": "53525",
        "ean": "7891033535255",
        "name": "Siage Oleo De Argan Reconstroi Os Fios 60Ml Rpck 2",
        "baseRetailPrice": 79.99,
        "image": ""
    },
    {
        "code": "53521",
        "ean": "7891033535217",
        "name": "Siage Mascara Capilar Reconstroi Os Fios 250G Rpck 2",
        "baseRetailPrice": 69.99,
        "image": ""
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
        "image": ""
    },
    {
        "code": "51752",
        "ean": "7891033517527",
        "name": "Sachet Sìage Cauterização Dos Lisos Sh/M/Cond 3X7Ml Doação",
        "baseRetailPrice": 2.49,
        "image": ""
    },
    {
        "code": "50705",
        "ean": "7891033507054",
        "name": "Make B Blush Po C/Ac Polig Coral 5,5G",
        "baseRetailPrice": 79.90,
        "image": ""
    },
    {
        "code": "49901",
        "ean": "7891033499014",
        "name": "Qdb Pincel Sombra",
        "baseRetailPrice": 42.90,
        "image": ""
    },
    {
        "code": "49810",
        "ean": "7891033498109",
        "name": "Cj Sch Siage S/Cond/M R/P/Quim 3X7Ml Vda",
        "baseRetailPrice": 2.49,
        "image": ""
    },
    {
        "code": "47172",
        "ean": "7891033471720",
        "name": "Cj Sch Siage Cbt/Friz 3X7Ml Rpck Vda",
        "baseRetailPrice": 2.49,
        "image": ""
    },
    {
        "code": "01648",
        "ean": "7891033016488",
        "name": "Cj Sch Siage Hair/Plas 3X7Ml Vda",
        "baseRetailPrice": 2.49,
        "image": ""
    },
    {
        "code": "01278",
        "ean": "7891033012787",
        "name": "Glam Masc Cilio Vol Infinity 8,5G",
        "baseRetailPrice": 62.99,
        "image": ""
    }
];
