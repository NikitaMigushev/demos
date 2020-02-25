const mandrill = require('mandrill-api/mandrill');
const mandrill_client = new mandrill.Mandrill('***');

const arrayFromObject = content => {
  const val = [];
  for (const key in content) {
    val.push({
      name: key,
      content: content[key]
    });
  }
  return val;
};

const emailContent = {
  clientName: 'Стройматериалы',
  clientAdress: 'Город Красноярск, Улица Мичурина, 75/3, Красноярский край, Сибирский федеральный округ',
  ExpectedDeliveryDate: '2020-02-10',
  ContactFace: 'Сергей Птрович',
  client_90: '83912413779',
  client_91: 'stroysistema_2008@mail.ru',
  peopleName: 'Андрей Зыков',
  people_tel: '+79991112255',
  orders: [{
      code: '67140',
      caption: 'Теплый Дом-ТВИН 50 мм (0.67 м3)',
      code_ean: 'N/A',
      quantity: 2,
      boxes: 2,
      price: 345
    },
    {
      code: '1015400',
      caption: 'вебер.тек 930 20 кг',
      code_ean: '4650073102390',
      quantity: 4,
      boxes: 2,
      price: 232
    },
    {
      code: '67141',
      caption: 'Теплый Дом-ТВИН 50 мм (0.85 м3)',
      code_ean: 'N/A',
      quantity: 1,
      boxes: 1,
      price: 200
    }
  ]
};

const sendEmail = async (emailContent, targetEmailAddress) => {
  const message = {
    subject: 'Поступил новый заказ',
    from_email: process.env.EMAIL_FROM,
    from_name: process.env.EMAIL_NAME_FROM,
    to: [{
      email: targetEmailAddress,
      type: 'to'
    }],
    metadata: {
      order_id: '2394'
    },
    merge_language: 'handlebars',
    headers: {
      'Reply-To': process.env.EMAIL_FROM
    },
    global_merge_vars: arrayFromObject(emailContent)
  };

  console.log(message.global_merge_vars);

  const template = {
    template_name: 'order_information',
    template_content: [],
    message: message,
    async: false,
    ip_pool: 'Main Pool'
  };

  return new Promise((resolve, reject) => {
    mandrill_client.messages.sendTemplate(
      template,
      result => {
        resolve(result);
      },
      e => {
        console.error(e);
        reject(e);
      }
    );
  });
};

sendEmail(emailContent, 'migushev@gmail.com')
  .then(result => console.log(result))
  .catch(error => console.log('Cannot send the email, error:' + error));