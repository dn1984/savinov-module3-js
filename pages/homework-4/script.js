"use strict";

// 1. Составить 3 мини-рассказа, используя исходные данные и соблюдая следующие требования:
// - Если длина списка с ЯП испытавшими влияние больше 4, то показывать только первые 4 элемента списка и делать 
// приписку “и другие языки программирования”.
// - Перед расширениями файлов должна стоять точка.
// - Структура рассказа должна соответствовать шаблону.
// 2. Перед выводом информации в консоль, предупредите, что информация будет выведена через 10 секунд и запустите 
// обратный счетчик.
//Шаблон
// Название ЯП - язык программирования выпущен в ГОД ВЫПУСКА ЯП году.
// Автором языка стал АВТОР ЯП - РОД ДЕЯТЕЛЬНОСТИ ЯП.
// Файлы программ, написанных на НАЗВАНИЕ ЯП, могут иметь расширения РАСШИРЕНИЯ ФАЙЛОВ.
// НАЗВАНИЕ ЯП испытал влияние ДЛИННА СПИСКА С ЯП ОКАЗАВШИМИ ВЛИЯНИЕ языков программирования: СПИСОК ЯП ОКАЗАВШИХ ВЛИЯНИЕ.
// НАЗВАНИЕ ЯП повлиял на ЯП ИСПЫТАВШИЕ ВЛИЯНИЕ.
//Исходные данные
// developers - авторя ЯП
// name - имя автора
// work - род деятельности автора
var developers = [{
  index: 0,
  name: "Брендан Эйх",
  work: "специалист в области информатики, программист, технический директор"
}, {
  index: 2,
  name: "Джеймс Гослинг",
  work: "специалист в области информационных технологий"
}, {
  index: 3,
  name: "Бьёрн Страуструп",
  work: "программист"
}]; // data - ЯП про которые должны быть рассказы
// name - название ЯП
// year - год выпуска ЯП
// filenameExtensions -расширения файлов
// influencedBy - ЯП оказавшие влияние
// affectedBy - ЯП испытавшие влияние ЯП
// developerIndex - уникальный идентификатор автора языка программирования

var data = [{
  name: "JavaScript",
  year: 1995,
  filenameExtensions: "js, mjs",
  influencedBy: ["AWK", "C", "HyperTalk", "Java", "Lua", "Perl", "Python", "Scheme", "Self"],
  affectedBy: ["ActionScript", "AtScript", "CoffeeScript", "Dart", "JScript .NET", "LiveScript", "Objective-J", "Opa", "QML", "Raku", "TypeScript"],
  developerIndex: 0
}, {
  name: "Java",
  year: 1995,
  filenameExtensions: "java, class, jar, jad, jmod",
  influencedBy: ["C++", "Си", "Ада", "Simula 67", "Smalltalk", "Objective-C", "Object Pascal", "Оберон", "Eiffel", "Модула-3", "Mesa", "Симула", "C#", "UCSD Pascal"],
  affectedBy: ["Ada 2005", "BeanShell", "C#", "Chapel", "Clojure", "ECMAScript", "Fantom", "Gambas", "Groovy", "Hack", "Haxe", "J#", "Kotlin", "PHP", "Python", "Scala", "Seed7", "Vala"],
  developerIndex: 2
}, {
  name: "C++",
  year: 1983,
  filenameExtensions: "cc, cpp, cxx, c, c++, h, hpp, hh, hxx, h++",
  influencedBy: ["C++", "Си", "Ада", "Simula 67", "Smalltalk", "Objective-C", "Object Pascal", "Оберон", "Eiffel", "Модула-3", "Mesa", "Симула", "C#", "UCSD Pascal"],
  affectedBy: ["Ada", "C", "Modula-2", "Simula"],
  developerIndex: 3
}]; //преобразование строки с расширениями в массив и добавление точки перед эллементами

function extentionToArray(extStr) {
  var outExtention = extStr.split(", ");
  var newExtentionArr = [];
  outExtention.forEach(function (item, index, array) {
    newExtentionArr.push("." + item);
  });
  return newExtentionArr;
} //преобразование массива с языками программирования в строку для вывода (обрезка до 4 эллементов + добавление фразу если эллементов более 4)


function affectedByTransform(affectedArr) {
  var resultEffectedBy = affectedArr.slice(0, 4);
  resultEffectedBy = resultEffectedBy.join(", ");
  if (affectedArr.length > 4) resultEffectedBy += " и другие языки программирования";
  return resultEffectedBy;
}

(function () {
  var outData = data.map(function (element) {
    return {
      name: element.name,
      year: element.year,
      filenameExtensions: extentionToArray(element.filenameExtensions),
      influencedBy: element.influencedBy.join(", "),
      affectedBy: affectedByTransform(element.affectedBy),
      developer: developers.find(function (item) {
        return item.index === element.developerIndex;
      })
    };
  });
  console.log("Через 10 секунд будет выведена информация.");
  var countTime = 10;
  var finalSetinterval = setInterval(function () {
    countTime--;
    console.log("".concat(countTime, " \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435..."));
  }, 1000);
  setTimeout(function () {
    clearInterval(finalSetinterval);
    outData.forEach(function (element, index) {
      console.log("\n                ".concat(element.name, " - \u044F\u0437\u044B\u043A \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0432\u044B\u043F\u0443\u0449\u0435\u043D \u0432 ").concat(element.year, " \u0433\u043E\u0434\u0443.\n                \u0410\u0432\u0442\u043E\u0440\u043E\u043C \u044F\u0437\u044B\u043A\u0430 \u0441\u0442\u0430\u043B ").concat(element.developer.name, " - ").concat(element.developer.work, ".\n                \u0424\u0430\u0439\u043B\u044B \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C, \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u043D\u044B\u0445 \u043D\u0430 ").concat(element.name, ", \u043C\u043E\u0433\u0443\u0442 \u0438\u043C\u0435\u0442\u044C \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u044F ").concat(element.filenameExtensions, ".\n                ").concat(element.name, " \u0438\u0441\u043F\u044B\u0442\u0430\u043B \u0432\u043B\u0438\u044F\u043D\u0438\u0435 ").concat(element.influencedBy.length, " \u044F\u0437\u044B\u043A\u043E\u0432 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F: ").concat(element.influencedBy, ".\n                ").concat(element.name, " \u043F\u043E\u0432\u043B\u0438\u044F\u043B \u043D\u0430 ").concat(element.affectedBy, ".\n            "));
    });
  }, 10000);
})();