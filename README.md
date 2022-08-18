# TestTask

# RU тестовое задание для МаркетГуру

Для корректной работы прошу запустить json-server. Командой json-server --watch db.json Если у вас windows и появились
консольные ошибки то их можно просто убрать командой что вводиться в powerShell(админ режим)
Set-ExecutionPolicy unrestricted. Или же вы можете вместо всего этого просто воспользоваться командой npm run bg. Но
если вы не захотите это делать, то я уже продумал этот момент и в случае того, что запрос не пройдет, то он выкинет
массив с этими данными Компонента таблица принимает 1 параметр, один их них данные с бэка вторая шапка таблицы, которую
нужно в данном примере настраивать для перевода и указания какие фильтруются элементы а какие сортируются, пока что под
фильтр идут числовые элементы. Пагинация: Сделана по типу выбора кол-во эллементов и выбора страницы Сортировка:
Выбираются из шапки те элементы у которых isSort true значение/ Фильтр: По аналогии с Сортировкаой кроме лишь того что
пока что нет фильтрации текстовых. По коду разборсаны комментарии к каждой функции и переменной. Буду ждать обратной
связи. Много моментов что можно было бы сделать лучше, я это в момент кода закончил заметил. Но в момоент написания
данной логики я старался думать на перед, для динамики таблицы, надеюсь местами не так сильно я ошибался. Один из
моментов который я не сделал и об этом сожалею это то что я не сделал тесты под компоненты. Заранее простите меня за ts-ignore в 2
местах. А так же заранее спасибо за просмотр и буду ждать обратной связи!

# EN test task for MarketGuru

Please run json-server to work correctly. Use json-server --watch db.json If you have windows and
Console errors, you can remove them by typing in powerShell (admin mode)
Set-ExecutionPolicy unrestricted. Or you can just use npm run bg instead. But
if you don't want to do that, I've already thought about it and in case the request doesn't go through, it will throw away
array with these data The table component takes 1 parameter, one of them is data from back the second table header which
you have to set up in this example to translate and specify which elements are filtered and which are sorted.
filter are numeric elements. Pagination: Made by choosing number of elements and selecting page Sort:
They are taken from the header of those elements which have isSort true value/ Filter: Similar to Sorting except that
there is no filtering of the text ones yet. There are comments for each function and variable scattered throughout the code. I will wait for feedback
feedback. Many things that could be done better, I have noticed this at the time of the code finished. But at the time of writing
I was trying to think ahead for the dynamics of the table, I hope I wasn't too much wrong in some places. One of the
moment that I didn't do and about this I regret that I didn't make tests for components. Forgive me in advance for the ts-ignore in 2
places. Also thanks in advance for watching and will look forward to feedback!
