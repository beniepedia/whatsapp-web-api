const phoneNumberFormat = function(number)  {
    let formatted = number.replace(/\D/g, '');
    // let formatted = parseInt(number);

    if(formatted.startsWith('0')){
        formatted = '62' + formatted.substr(1);
    }

    if(!formatted.startsWith('0')){
        formatted = '62' + formatted;
    }

    if(!formatted.endsWith('@c.us')){
        formatted += '@c.us';
    }

    return formatted;
}

module.exports = {
    phoneNumberFormat
}