const { Telegraf, Markup } = require('telegraf');
const fetch = require('node-fetch');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Полные моковые данные новостей для всех стран
const mockNewsData = {
  'Россия': {
    'мода': [
      { title: 'Новые тренды весны 2024 в России', url: 'https://example.com/ru-fashion1', summary: 'Пастельные тона и объемные силуэты доминируют' },
      { title: 'Московская неделя моды', url: 'https://example.com/ru-fashion2', summary: 'Показы российских дизайнеров собрали аншлаг' },
      { title: 'Устойчивая мода в России', url: 'https://example.com/ru-fashion3', summary: 'Экологичные коллекции набирают популярность' },
      { title: 'Российские бренды на мировых подиумах', url: 'https://example.com/ru-fashion4', summary: 'Успехи на международной арене' },
      { title: 'Мода в регионах России', url: 'https://example.com/ru-fashion5', summary: 'Развитие fashion-индустрии за пределами Москвы' }
    ],
    'спорт': [
      { title: 'Победа российской сборной по хоккею', url: 'https://example.com/ru-sport1', summary: 'Россия выиграла чемпионат мира' },
      { title: 'Новый стадион в Москве', url: 'https://example.com/ru-sport2', summary: 'Открытие современной арены на 45 тысяч мест' },
      { title: 'Развитие детского спорта в РФ', url: 'https://example.com/ru-sport3', summary: 'Государственные программы поддержки' },
      { title: 'Российские спортсмены на Олимпиаде-2024', url: 'https://example.com/ru-sport4', summary: 'Подготовка к летним играм' },
      { title: 'Хоккейная лига КХЛ', url: 'https://example.com/ru-sport5', summary: 'Новости регулярного чемпионата' }
    ],
    'политика': [
      { title: 'Новые законодательные инициативы', url: 'https://example.com/ru-politics1', summary: 'Обсуждение в Госдуме важных законопроектов' },
      { title: 'Международные отношения России', url: 'https://example.com/ru-politics2', summary: 'Встречи на высшем уровне с зарубежными коллегами' },
      { title: 'Региональные выборы 2024', url: 'https://example.com/ru-politics3', summary: 'Предвыборная кампания в регионах' },
      { title: 'Экономическая политика правительства', url: 'https://example.com/ru-politics4', summary: 'Новые меры поддержки бизнеса' },
      { title: 'Социальные программы поддержки', url: 'https://example.com/ru-politics5', summary: 'Помощь многодетным семьям и пенсионерам' }
    ],
    'финансы': [
      { title: 'Курс рубля к доллару и евро', url: 'https://example.com/ru-finance1', summary: 'Динамика национальной валюты на бирже' },
      { title: 'Фондовый рынок Москвы', url: 'https://example.com/ru-finance2', summary: 'Индексы Московской биржи показывают рост' },
      { title: 'Банковские новости России', url: 'https://example.com/ru-finance3', summary: 'Изменения в регулировании банковского сектора' },
      { title: 'Иностранные инвестиции в РФ', url: 'https://example.com/ru-finance4', summary: 'Приток капитала в российскую экономику' },
      { title: 'Регулирование криптовалют', url: 'https://example.com/ru-finance5', summary: 'Новые законы о цифровых активах' }
    ],
    'медицина': [
      { title: 'Новые медицинские технологии в России', url: 'https://example.com/ru-medicine1', summary: 'Инновации в лечении онкологических заболеваний' },
      { title: 'Развитие здравоохранения', url: 'https://example.com/ru-medicine2', summary: 'Национальные проекты по модернизации больниц' },
      { title: 'Программа вакцинации', url: 'https://example.com/ru-medicine3', summary: 'Иммунизация населения от различных заболеваний' },
      { title: 'Телемедицина в России', url: 'https://example.com/ru-medicine4', summary: 'Удаленные консультации стали доступнее' },
      { title: 'Медицинское образование', url: 'https://example.com/ru-medicine5', summary: 'Реформа подготовки медицинских кадров' }
    ]
  },
  'США': {
    'мода': [
      { title: 'NY Fashion Week 2024 Highlights', url: 'https://example.com/us-fashion1', summary: 'Нью-Йоркская неделя моды представила новые коллекции' },
      { title: 'Sustainable Fashion Trends in US', url: 'https://example.com/us-fashion2', summary: 'Эко-тренды набирают популярность в Америке' },
      { title: 'American Designers Spotlight', url: 'https://example.com/us-fashion3', summary: 'Лучшие американские дизайнеры сезона' },
      { title: 'US Retail Market Trends', url: 'https://example.com/us-fashion4', summary: 'Тенденции розничной торговли в США' },
      { title: 'Celebrity Fashion Events', url: 'https://example.com/us-fashion5', summary: 'Звездные образы на красных дорожках' }
    ],
    'спорт': [
      { title: 'Super Bowl LVIII Results', url: 'https://example.com/us-sport1', summary: 'Итоги главного спортивного события года в США' },
      { title: 'NBA Season Updates', url: 'https://example.com/us-sport2', summary: 'Новости баскетбольной ассоциации' },
      { title: 'MLB Opening Day', url: 'https://example.com/us-sport3', summary: 'Начало нового бейсбольного сезона' },
      { title: 'US Olympic Team Preparation', url: 'https://example.com/us-sport4', summary: 'Подготовка американских спортсменов к Олимпиаде' },
      { title: 'College Football Championships', url: 'https://example.com/us-sport5', summary: 'Чемпионат по американскому футболу среди колледжей' }
    ],
    'политика': [
      { title: 'Presidential Election Campaign', url: 'https://example.com/us-politics1', summary: 'Предвыборная гонка за пост президента США' },
      { title: 'Congress New Legislation', url: 'https://example.com/us-politics2', summary: 'Новые законопроекты в Конгрессе' },
      { title: 'Foreign Policy Updates', url: 'https://example.com/us-politics3', summary: 'Изменения во внешней политике США' },
      { title: 'State Governors Elections', url: 'https://example.com/us-politics4', summary: 'Выборы губернаторов в штатах' },
      { title: 'Supreme Court Decisions', url: 'https://example.com/us-politics5', summary: 'Важные решения Верховного суда' }
    ],
    'финансы': [
      { title: 'Federal Reserve Interest Rates', url: 'https://example.com/us-finance1', summary: 'Решение ФРС по ключевой ставке' },
      { title: 'Wall Street Market Report', url: 'https://example.com/us-finance2', summary: 'Обзор фондового рынка США' },
      { title: 'US Tech Stocks Performance', url: 'https://example.com/us-finance3', summary: 'Динамика акций технологических компаний' },
      { title: 'Cryptocurrency Regulations', url: 'https://example.com/us-finance4', summary: 'Новые правила для криптовалютного рынка' },
      { title: 'US Economic Growth Forecast', url: 'https://example.com/us-finance5', summary: 'Прогноз роста экономики США' }
    ],
    'медицина': [
      { title: 'New Medical Breakthroughs in US', url: 'https://example.com/us-medicine1', summary: 'Инновационные методы лечения в американских клиниках' },
      { title: 'Healthcare Reform Updates', url: 'https://example.com/us-medicine2', summary: 'Изменения в системе здравоохранения США' },
      { title: 'Vaccine Development News', url: 'https://example.com/us-medicine3', summary: 'Разработка новых вакцин' },
      { title: 'Telemedicine Expansion', url: 'https://example.com/us-medicine4', summary: 'Расширение услуг телемедицины' },
      { title: 'Mental Health Initiatives', url: 'https://example.com/us-medicine5', summary: 'Программы поддержки психического здоровья' }
    ]
  },
  'Великобритания': {
    'мода': [
      { title: 'London Fashion Week 2024', url: 'https://example.com/uk-fashion1', summary: 'Лондонская неделя моды привлекает мировое внимание' },
      { title: 'British Fashion Design Awards', url: 'https://example.com/uk-fashion2', summary: 'Награды британским дизайнерам' },
      { title: 'UK Sustainable Fashion', url: 'https://example.com/uk-fashion3', summary: 'Экологичная мода в Великобритании' },
      { title: 'Royal Family Fashion', url: 'https://example.com/uk-fashion4', summary: 'Стиль членов королевской семьи' },
      { title: 'UK Retail Fashion Trends', url: 'https://example.com/uk-fashion5', summary: 'Тенденции модной розницы' }
    ],
    'спорт': [
      { title: 'Premier League Updates', url: 'https://example.com/uk-sport1', summary: 'Новости английской премьер-лиги' },
      { title: 'Wimbledon Championships', url: 'https://example.com/uk-sport2', summary: 'Подготовка к теннисному турниру' },
      { title: 'British Rugby News', url: 'https://example.com/uk-sport3', summary: 'События в регбийных чемпионатах' },
      { title: 'UK Athletics Success', url: 'https://example.com/uk-sport4', summary: 'Успехи британских легкоатлетов' },
      { title: 'Cricket News in England', url: 'https://example.com/uk-sport5', summary: 'Новости крикета' }
    ],
    'политика': [
      { title: 'UK Government New Policies', url: 'https://example.com/uk-politics1', summary: 'Новые политические инициативы правительства' },
      { title: 'Brexit Updates', url: 'https://example.com/uk-politics2', summary: 'Последствия выхода из ЕС' },
      { title: 'Scottish Independence Debate', url: 'https://example.com/uk-politics3', summary: 'Обсуждение независимости Шотландии' },
      { title: 'UK Foreign Relations', url: 'https://example.com/uk-politics4', summary: 'Международные отношения Великобритании' },
      { title: 'London Mayoral Election', url: 'https://example.com/uk-politics5', summary: 'Выборы мэра Лондона' }
    ],
    'финансы': [
      { title: 'Bank of England Decisions', url: 'https://example.com/uk-finance1', summary: 'Решение Банка Англии по процентным ставкам' },
      { title: 'London Stock Exchange News', url: 'https://example.com/uk-finance2', summary: 'Новости Лондонской фондовой биржи' },
      { title: 'UK Fintech Innovations', url: 'https://example.com/uk-finance3', summary: 'Инновации в финансовых технологиях' },
      { title: 'British Pound Exchange Rate', url: 'https://example.com/uk-finance4', summary: 'Курс фунта стерлингов' },
      { title: 'UK Economic Outlook', url: 'https://example.com/uk-finance5', summary: 'Экономические прогнозы для Великобритании' }
    ],
    'медицина': [
      { title: 'NHS Updates and Reforms', url: 'https://example.com/uk-medicine1', summary: 'Новости и реформы Национальной службы здравоохранения' },
      { title: 'UK Medical Research', url: 'https://example.com/uk-medicine2', summary: 'Исследования британских ученых' },
      { title: 'Vaccination Programs in UK', url: 'https://example.com/uk-medicine3', summary: 'Программы иммунизации населения' },
      { title: 'Mental Health Services', url: 'https://example.com/uk-medicine4', summary: 'Развитие услуг психического здоровья' },
      { title: 'UK Hospital Modernization', url: 'https://example.com/uk-medicine5', summary: 'Модернизация больничных учреждений' }
    ]
  },
  'Германия': {
    'мода': [
      { title: 'Berlin Fashion Week', url: 'https://example.com/de-fashion1', summary: 'Берлинская неделя моды привлекает дизайнеров' },
      { title: 'German Fashion Brands', url: 'https://example.com/de-fashion2', summary: 'Немецкие бренды завоевывают мир' },
      { title: 'Sustainable Fashion in Germany', url: 'https://example.com/de-fashion3', summary: 'Эко-мода в Германии' }
    ],
    'спорт': [
      { title: 'Bundesliga Latest Results', url: 'https://example.com/de-sport1', summary: 'Последние результаты немецкой футбольной лиги' },
      { title: 'German National Team News', url: 'https://example.com/de-sport2', summary: 'Новости сборной Германии по футболу' },
      { title: 'Berlin Marathon 2024', url: 'https://example.com/de-sport3', summary: 'Подготовка к Берлинскому марафону' },
      { title: 'German Motorsport Success', url: 'https://example.com/de-sport4', summary: 'Успехи немецких автогонщиков' },
      { title: 'Winter Sports in Germany', url: 'https://example.com/de-sport5', summary: 'Новости зимних видов спорта' }
    ],
    'политика': [
      { title: 'German Government Policies', url: 'https://example.com/de-politics1', summary: 'Новые политические решения' },
      { title: 'EU Relations', url: 'https://example.com/de-politics2', summary: 'Отношения Германии с ЕС' }
    ],
    'финансы': [
      { title: 'German Stock Market', url: 'https://example.com/de-finance1', summary: 'Новости Франкфуртской биржи' },
      { title: 'German Economy Updates', url: 'https://example.com/de-finance2', summary: 'Экономические новости Германии' }
    ],
    'медицина': [
      { title: 'German Healthcare News', url: 'https://example.com/de-medicine1', summary: 'Новости здравоохранения Германии' },
      { title: 'Medical Research in Germany', url: 'https://example.com/de-medicine2', summary: 'Исследования немецких ученых' }
    ]
  },
  'Франция': {
    'мода': [
      { title: 'Paris Fashion Week', url: 'https://example.com/fr-fashion1', summary: 'Парижская неделя моды - главное событие' },
      { title: 'French Luxury Brands', url: 'https://example.com/fr-fashion2', summary: 'Французские люксовые бренды' }
    ],
    'спорт': [
      { title: 'French Open Tennis Tournament', url: 'https://example.com/fr-sport1', summary: 'Новости турнира "Ролан Гаррос"' },
      { title: 'Ligue 1 Football Updates', url: 'https://example.com/fr-sport2', summary: 'События французской футбольной лиги' },
      { title: 'Tour de France 2024', url: 'https://example.com/fr-sport3', summary: 'Подготовка к велогонке Тур де Франс' },
      { title: 'French Rugby Team News', url: 'https://example.com/fr-sport4', summary: 'Новости сборной Франции по регби' },
      { title: 'Paris 2024 Olympics Preparation', url: 'https://example.com/fr-sport5', summary: 'Подготовка к летней Олимпиаде в Париже' }
    ],
    'политика': [
      { title: 'French Politics Updates', url: 'https://example.com/fr-politics1', summary: 'Политические новости Франции' },
      { title: 'EU Presidency', url: 'https://example.com/fr-politics2', summary: 'Франция в ЕС' }
    ],
    'финансы': [
      { title: 'French Economy News', url: 'https://example.com/fr-finance1', summary: 'Экономические новости Франции' },
      { title: 'Paris Stock Exchange', url: 'https://example.com/fr-finance2', summary: 'Новости Парижской биржи' }
    ],
    'медицина': [
      { title: 'French Healthcare System', url: 'https://example.com/fr-medicine1', summary: 'Новости здравоохранения Франции' },
      { title: 'Medical Innovations in France', url: 'https://example.com/fr-medicine2', summary: 'Инновации в медицине' }
    ]
  },
  'Китай': {
    'мода': [
      { title: 'Shanghai Fashion Week', url: 'https://example.com/cn-fashion1', summary: 'Шанхайская неделя моды' },
      { title: 'Chinese Fashion Industry', url: 'https://example.com/cn-fashion2', summary: 'Развитие модной индустрии Китая' }
    ],
    'спорт': [
      { title: 'Chinese Basketball Association', url: 'https://example.com/cn-sport1', summary: 'Новости китайской баскетбольной ассоциации' },
      { title: 'Table Tennis Championships', url: 'https://example.com/cn-sport2', summary: 'Чемпионат по настольному теннису' },
      { title: 'Chinese Olympic Athletes', url: 'https://example.com/cn-sport3', summary: 'Подготовка китайских спортсменов к Олимпиаде' },
      { title: 'Badminton World Championships', url: 'https://example.com/cn-sport4', summary: 'Успехи китайских бадминтонистов' },
      { title: 'Traditional Chinese Sports', url: 'https://example.com/cn-sport5', summary: 'Развитие традиционных видов спорта' }
    ],
    'политика': [
      { title: 'Chinese Political News', url: 'https://example.com/cn-politics1', summary: 'Политические новости Китая' },
      { title: 'International Relations', url: 'https://example.com/cn-politics2', summary: 'Международные отношения Китая' }
    ],
    'финансы': [
      { title: 'Chinese Stock Market', url: 'https://example.com/cn-finance1', summary: 'Новости Шанхайской биржи' },
      { title: 'Chinese Economy Growth', url: 'https://example.com/cn-finance2', summary: 'Рост экономики Китая' }
    ],
    'медицина': [
      { title: 'Traditional Chinese Medicine', url: 'https://example.com/cn-medicine1', summary: 'Развитие традиционной китайской медицины' },
      { title: 'Modern Healthcare in China', url: 'https://example.com/cn-medicine2', summary: 'Современная медицина в Китае' }
    ]
  }
};

// Функция для получения случайных новостей
function getRandomNews(country, topic, count = 5) {
  console.log(`Запрос новостей: страна="${country}", тема="${topic}"`);
  
  const countryData = mockNewsData[country];
  if (!countryData) {
    console.log(`❌ Нет данных для страны: ${country}`);
    return [];
  }
  
  const topicData = countryData[topic];
  if (!topicData) {
    console.log(`❌ Нет данных для темы "${topic}" в стране "${country}"`);
    return [];
  }
  
  console.log(`✅ Найдено ${topicData.length} новостей`);
  
  // Если данных меньше, чем нужно, возвращаем все, что есть
  if (topicData.length <= count) {
    return topicData;
  }
  
  // Возвращаем случайные новости
  const shuffled = [...topicData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Хранение состояния пользователей
const userState = new Map();

// Главное меню с выбором страны
const countryMenu = Markup.inlineKeyboard([
  [Markup.button.callback('🇷🇺 Россия', 'country_Россия')],
  [Markup.button.callback('🇺🇸 США', 'country_США')],
  [Markup.button.callback('🇬🇧 Великобритания', 'country_Великобритания')],
  [Markup.button.callback('🇩🇪 Германия', 'country_Германия')],
  [Markup.button.callback('🇫🇷 Франция', 'country_Франция')],
  [Markup.button.callback('🇨🇳 Китай', 'country_Китай')]
]);

// Функция для создания меню тем
function createTopicMenu(country) {
  return Markup.inlineKeyboard([
    [Markup.button.callback('👗 Мода', `topic_мода_${country}`)],
    [Markup.button.callback('⚽ Спорт', `topic_спорт_${country}`)],
    [Markup.button.callback('🏛️ Политика', `topic_политика_${country}`)],
    [Markup.button.callback('💰 Финансы', `topic_финансы_${country}`)],
    [Markup.button.callback('🏥 Медицина', `topic_медицина_${country}`)],
    [Markup.button.callback('↩️ Назад к выбору страны', 'back_to_country')]
  ]);
}

// Функция для создания меню действий
function createActionMenu() {
  return Markup.inlineKeyboard([
    [Markup.button.callback('🔍 Искать еще', 'search_more')],
    [Markup.button.callback('🔄 Сменить тему', 'change_topic')],
    [Markup.button.callback('🌍 Сменить страну', 'change_country')]
  ]);
}

// Команда /start
bot.start(async (ctx) => {
  const username = ctx.from.first_name;
  console.log(`👋 Пользователь ${username} (${ctx.from.id}) запустил бота`);
  
  await ctx.replyWithHTML(
    `Привет, ${username}! 👋\n\n` +
    '<b>Я - бот для чтения новостей.</b>\n' +
    'Я помогу вам быть в курсе последних событий.\n\n' +
    'Выберите страну, новости которой вас интересуют:',
    countryMenu
  );
});

// Обработчик выбора страны
bot.action(/^country_(.+)$/, async (ctx) => {
  try {
    const country = ctx.match[1];
    const userId = ctx.from.id;
    
    console.log(`🌍 Пользователь ${userId} выбрал страну: ${country}`);
    
    userState.set(userId, { country });
    
    await ctx.answerCbQuery(`Выбрана страна: ${country}`);
    
    await ctx.editMessageText(
      `Вы выбрали: <b>${country}</b>\n\n` +
      'Теперь выберите интересующую вас тематику:',
      {
        parse_mode: 'HTML',
        ...createTopicMenu(country)
      }
    );
  } catch (error) {
    console.error('❌ Ошибка при выборе страны:', error);
    await ctx.answerCbQuery('Произошла ошибка. Попробуйте снова.');
  }
});

// Обработчик выбора темы - ИСПРАВЛЕННЫЙ
bot.action(/^topic_(.+)_(.+)$/, async (ctx) => {
  try {
    console.log('🎯 Обработчик темы вызван!');
    console.log('Match:', ctx.match);
    
    await ctx.answerCbQuery('Ищу новости...'); // Подтверждаем нажатие кнопки
    
    const [_, topic, country] = ctx.match;
    const userId = ctx.from.id;
    
    console.log(`📰 Пользователь ${userId} выбрал: страна="${country}", тема="${topic}"`);
    
    userState.set(userId, { country, topic });
    
    await ctx.editMessageText(
      `⏳ Ищу новости для <b>${country}</b> по теме "<b>${topic}</b>"...`,
      { parse_mode: 'HTML' }
    );
    
    // Получаем новости
    const news = getRandomNews(country, topic);
    
    console.log(`Найдено новостей: ${news.length}`);
    
    if (news.length === 0) {
      await ctx.editMessageText(
        `😕 К сожалению, не удалось найти новости для <b>${country}</b> по теме "<b>${topic}</b>".\n\n` +
        'Возможно, по этой теме пока нет новостей.\n' +
        'Попробуйте выбрать другую тему или страну.',
        {
          parse_mode: 'HTML',
          ...createActionMenu()
        }
      );
      return;
    }
    
    // Формируем сообщение с новостями
    let message = `📰 <b>Новости для ${country} - ${topic}</b>\n\n`;
    
    news.forEach((item, index) => {
      message += `<b>${index + 1}. ${item.title}</b>\n`;
      message += `📝 ${item.summary}\n`;
      message += `🔗 <a href="${item.url}">Читать полностью</a>\n\n`;
    });
    
    message += '---\nХотите увидеть больше новостей?';
    
    await ctx.editMessageText(message, {
      parse_mode: 'HTML',
      disable_web_page_preview: false,
      ...createActionMenu()
    });
    
  } catch (error) {
    console.error('❌ Ошибка при выборе темы:', error);
    await ctx.answerCbQuery('Произошла ошибка. Попробуйте снова.');
    await ctx.reply('Произошла ошибка при поиске новостей. Попробуйте снова /start');
  }
});

// Обработчик кнопки "Искать еще"
bot.action('search_more', async (ctx) => {
  try {
    console.log('🔍 Кнопка "Искать еще" нажата');
    
    await ctx.answerCbQuery('Ищу другие новости...');
    
    const userId = ctx.from.id;
    const state = userState.get(userId);
    
    console.log('Текущее состояние пользователя:', state);
    
    if (!state || !state.country || !state.topic) {
      console.log('❌ Нет состояния пользователя');
      await ctx.reply('Пожалуйста, начните с выбора страны и темы.', countryMenu);
      return;
    }
    
    await ctx.editMessageText(
      `⏳ Ищу дополнительные новости для <b>${state.country}</b> по теме "<b>${state.topic}</b>"...`,
      { parse_mode: 'HTML' }
    );
    
    // Получаем еще новости
    const moreNews = getRandomNews(state.country, state.topic);
    
    if (moreNews.length === 0) {
      await ctx.editMessageText(
        '😔 К сожалению, больше новостей по данной теме не найдено.\n\n' +
        'Попробуйте выбрать другую тему или страну.',
        createActionMenu()
      );
      return;
    }
    
    let message = `📰 <b>Еще новости для ${state.country} - ${state.topic}</b>\n\n`;
    
    moreNews.forEach((item, index) => {
      message += `<b>${index + 1}. ${item.title}</b>\n`;
      message += `📝 ${item.summary}\n`;
      message += `🔗 <a href="${item.url}">Читать полностью</a>\n\n`;
    });
    
    message += '---\nХотите увидеть еще новости?';
    
    await ctx.editMessageText(message, {
      parse_mode: 'HTML',
      disable_web_page_preview: false,
      ...createActionMenu()
    });
    
  } catch (error) {
    console.error('❌ Ошибка при поиске дополнительных новостей:', error);
    await ctx.answerCbQuery('Произошла ошибка. Попробуйте снова.');
  }
});

// Обработчик кнопки "Сменить тему"
bot.action('change_topic', async (ctx) => {
  try {
    await ctx.answerCbQuery();
    
    const userId = ctx.from.id;
    const state = userState.get(userId);
    
    if (!state || !state.country) {
      await ctx.reply('Пожалуйста, начните с выбора страны.', countryMenu);
      return;
    }
    
    await ctx.editMessageText(
      `Выберите новую тематику для <b>${state.country}</b>:`,
      {
        parse_mode: 'HTML',
        ...createTopicMenu(state.country)
      }
    );
    
  } catch (error) {
    console.error('❌ Ошибка при смене темы:', error);
    await ctx.answerCbQuery('Произошла ошибка. Попробуйте снова.');
  }
});

// Обработчик кнопки "Сменить страну"
bot.action('change_country', async (ctx) => {
  try {
    await ctx.answerCbQuery();
    await ctx.editMessageText(
      'Выберите страну, новости которой вас интересуют:',
      countryMenu
    );
  } catch (error) {
    console.error('❌ Ошибка при смене страны:', error);
  }
});

// Обработчик кнопки "Назад к выбору страны"
bot.action('back_to_country', async (ctx) => {
  try {
    await ctx.answerCbQuery();
    await ctx.editMessageText(
      'Выберите страну, новости которой вас интересуют:',
      countryMenu
    );
  } catch (error) {
    console.error('❌ Ошибка при возврате к выбору страны:', error);
  }
});

// Команда /help
bot.help(async (ctx) => {
  await ctx.replyWithHTML(
    '<b>📰 Новостной бот</b>\n\n' +
    '<b>Доступные команды:</b>\n' +
    '/start - Начать работу с ботом\n' +
    '/help - Показать эту справку\n\n' +
    '<b>Как использовать:</b>\n' +
    '1. Выберите страну\n' +
    '2. Выберите тематику\n' +
    '3. Читайте новости\n' +
    '4. Используйте кнопки для навигации\n\n' +
    '<b>Кнопки:</b>\n' +
    '🔍 Искать еще - показать другие новости по выбранной теме\n' +
    '🔄 Сменить тему - выбрать другую тему для текущей страны\n' +
    '🌍 Сменить страну - выбрать другую страну\n' +
    '↩️ Назад - вернуться к предыдущему меню'
  );
});

// Обработка текстовых сообщений
bot.on('text', async (ctx) => {
  const text = ctx.message.text;
  
  if (text.startsWith('/')) {
    return; // Команды обрабатываются отдельно
  }
  
  console.log(`📝 Получено текстовое сообщение: "${text}" от ${ctx.from.id}`);
  
  await ctx.replyWithHTML(
    'Пожалуйста, используйте кнопки для навигации.\n\n' +
    'Или воспользуйтесь командами:\n' +
    '/start - начать работу\n' +
    '/help - помощь',
    countryMenu
  );
});

// Обработка ошибок
bot.catch((err, ctx) => {
  console.error(`❌ Ошибка для ${ctx.updateType}:`, err);
  ctx.reply('Произошла ошибка. Пожалуйста, попробуйте снова или используйте /start для перезапуска.');
});

// Проверка токена бота
if (!process.env.BOT_TOKEN) {
  console.error('❌ ОШИБКА: Не установлен токен бота!');
  console.error('Добавьте BOT_TOKEN=ваш_токен в файл .env');
  process.exit(1);
}

// Запуск бота
async function startBot() {
  try {
    console.log('🚀 Запуск бота...');
    console.log(`🤖 Токен бота: ${process.env.BOT_TOKEN.substring(0, 10)}...`);
    await bot.launch();
    console.log('✅ Бот успешно запущен!');
    console.log('🤖 Бот готов к работе');
    console.log('📝 Проверьте бота в Telegram, нажав /start');
  } catch (err) {
    console.error('❌ Ошибка запуска бота:', err);
  }
}

startBot();

// Обработка завершения работы
process.once('SIGINT', () => {
  console.log('🛑 Остановка бота...');
  bot.stop('SIGINT');
  process.exit(0);
});

process.once('SIGTERM', () => {
  console.log('🛑 Остановка бота...');
  bot.stop('SIGTERM');
  process.exit(0);
});