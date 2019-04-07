
export const convertDateToAge = function(dateObj) {
    return new Date() - dateObj;
}

export const convertAgeToSentence = function(age) {

    var convertedAge = age;

    if(convertedAge < 1000) {
        return 'just now';
    }
    convertedAge = convertedAge / 1000;

    if(convertedAge < 60) {
        const phrase = convertedAge >= 2 ? 'seconds' : 'second';
        return Math.floor(convertedAge) + ' ' + phrase;
    }
    convertedAge = convertedAge / 60
    
    if(convertedAge < 60) { 
        const phrase = convertedAge >= 2 ? 'minutes' : 'minute';
        return Math.floor(convertedAge) + ' ' + phrase;
    }
    convertedAge = convertedAge / 60;

    if(convertedAge < 24) { 
        const phrase = convertedAge >= 2 ? 'hours' : 'hour';
        return Math.floor(convertedAge) + ' ' + phrase;
    }
    convertedAge = convertedAge / 24;

    if(convertedAge < 7) { 
        const phrase = convertedAge >= 2 ? 'days' : 'day';
        return Math.floor(convertedAge) + ' ' + phrase;
    }
    convertedAge = convertedAge / 7;

    if(convertedAge < 31) { 
        const phrase = convertedAge >= 2 ? 'weeks' : 'week';
        return Math.floor(convertedAge) + ' ' + phrase;
    }
    convertedAge = convertedAge / 31;

    if(convertedAge < 12) { 
        const phrase = convertedAge >= 2 ? 'months' : 'month';
        return Math.floor(convertedAge) + ' ' + phrase;
    }

    convertedAge = convertedAge / 12;
    const phrase = convertedAge >= 2 ? 'years' : 'year';
    return Math.floor(convertedAge) + ' ' + phrase;

    return false;
}

export const convertDateToAgeSentence = function(dateObj) {
    if(dateObj) {
        return this.convertAgeToSentence( this.convertDateToAge(dateObj) );
    }

    return false;
}

export default {
    convertDateToAge,
    convertAgeToSentence,
    convertDateToAgeSentence   
}