function kolobok(name) {
    switch (name) {
        case 'дедушка':
            return 'Я от дедушки ушёл';
        case 'лиса':
            return 'Меня съели';
        case 'заяц':
            return 'Я от зайца ушёл';
        default:
            return `Я и ${name} не встретились`;
    }
}

const persons = ['дедушка', 'лиса', 'заяц', 'ворон'];

for (let index = 0; index < persons.length; index++) {
    console.log('-Колобок, что с тобой произошло? -', kolobok(persons[index]));
}

function newYear(name) {
    return `${name}! ${name}! ${name}!`;
}

console.log(newYear('Дед Мороз'));
console.log(newYear('Снегурочка'));
