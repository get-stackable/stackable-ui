cl = function (something) {
  console.log(something);
};

humanDate = function (date) {
    return moment(date).format('Do MMM YYYY');
};

truncate = function (str, limit) {
    if (typeof str !== 'string') {
        return str;
    }

    if (typeof limit == 'undefined') {
        limit = 11;
    }

    var ext = '';
    if (str.length > limit) {
        ext = '..';
    }

    return str.substring(0, limit) + ext;
};

titleize = function (str) {
    return s.titleize(s.humanize(str));
};

clean = function (str) {
    return s.clean(s.cleanDiacritics(str))
};

printArray = function (...array) {
    return '' + array;
};
