const http = require('http');
const os = require('os');
var request = require('request');
const util = require('util');
const enhancedRequest = util.promisify(request);
const TIME_SERVICE_HOST = process.env.TIME_SERVICE_HOST || "time-service:8080"


console.log("Business server starting...");

var handler = async function(request, response) {
    console.log("Received request from " + request.connection.remoteAddress);
    var result = { time: new Date(),
        hostAddress: os.networkInterfaces().eth0[0].address,
        host: os.hostname(),
        timeServiceHost: TIME_SERVICE_HOST
    };
    response.setHeader('Content-Type', 'application/json');
    response.writeHead(200);
    try {
        result.timeServerResponse = await get('http://' + TIME_SERVICE_HOST + '/');
        result.quote = getRandomQuote();
        response.end(JSON.stringify(result, null, 3));
    }catch (e) {
        response.end(JSON.stringify({error: e}, null, 3));
    }


}

var get = async function(url){
    const { body } = await enhancedRequest({
        method: 'GET',
        uri: url
    });

    return JSON.parse(body);
}

var www = http.createServer(handler);

process.on('SIGTERM', function () {
    console.log("Received SIGTERM. Shutting down.");
    www.close(function () {
        console.log("HTTP server has shut down. Process exiting.");
        process.exit(0);
    });
});

www.listen(8080);

var getRandomQuote = function (){
    return quotes[Math.floor(Math.random() * quotes.length)];
}

const quotes = [{
    "quoteText": "Если ты попробуешь, у тебя есть два варианта: получится или не получится. А если ты не попробуешь, то есть всего один вариант.",
    "quoteAuthor": "",
    "senderName": "",
    "senderLink": "",
    "quoteLink": "http://forismatic.com/ru/8c46b3efe1/"
},
    {
        "quoteText": "Если хочешь измениться, отбрось прежние представления о самом себе.",
        "quoteAuthor": "Теун Морез",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/ru/72c8e0e22d/"
    },
    {
        "quoteText": "Ценностям мы не можем научиться — ценности мы должны пережить. ",
        "quoteAuthor": "",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/ru/06c9ce2d25/"
    },
    {
        "quoteText": "Если человек думает только о себе и ищет во всем своей выгоды, то он не может быть счастлив. Хочешь жить для истинного своего блага, жить для себя, живи для других.",
        "quoteAuthor": "Сенека",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/ru/a402f982d2/"
    },
    {
        "quoteText": "Если всё время смотреть под ноги, никогда не увидишь неба. ",
        "quoteAuthor": "",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/ru/ca3b8ec4a3/"
    },
    {
        "quoteText": "На день надо смотреть как на маленькую жизнь. ",
        "quoteAuthor": "Максим Горький",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/ru/85b2a75ade/"
    },
    {
        "quoteText": "Храни всегда свои сны… Никогда не знаешь, в какие дни они могут пригодиться.",
        "quoteAuthor": "Карлос Руис Сафон",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/ru/7595dfc7f4/"
    },
    {
        "quoteText": "Иногда удается спросить себя только когда спросишь другого.",
        "quoteAuthor": "Эрих Мария Ремарк",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/ru/b2fcf2d469/"
    },
    {
        "quoteText": "Умеренность — основной принцип действия. Твердое ломается, острое тупится.",
        "quoteAuthor": "Лао Дань",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/ru/aaba609b5e/"
    },
    {
        "quoteText": "Реорганизуй свою жизнь в простоте. Овладей искусством радости по поводу простых вещей. И жизнь твоя станет намного проще.",
        "quoteAuthor": "",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/ru/17b9ae3e4a/"
    },
    {
        "quoteText": "Многие великие истины были сначала кощунством.",
        "quoteAuthor": "Бернард Шоу",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/ru/c6b3cfe876/"
    },{
        "quoteText": "Свои способности человек может узнать только попытавшись применить их на деле. ",
        "quoteAuthor": "Сенека",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/ru/a233f9a8d5/"
    },
    {
        "quoteText": "Делай вид, что уважаешь себя, и тебя будут уважать. ",
        "quoteAuthor": "Александр Дюма",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/ru/7d7fbf33dc/"
    },
    {
        "quoteText": "Всякое достоинство, всякая сила спокойны — именно потому, что уверены в самих себе.",
        "quoteAuthor": "Виссарион Григорьевич Белинский",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/ru/28825c5156/"
    },{
        "quoteText": "Мужество — не в силе руки и не в искусстве владения мечом, мужество — в том, чтобы владеть собой и быть справедливым.",
        "quoteAuthor": "Саади",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/ru/16d7b06856/"
    }];

