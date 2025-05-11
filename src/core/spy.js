/**
 * Створює спостерігач (mock) для функцій
 * @param {Function} originalFn - оригінальна функція
 * @returns {Function} - функція-спостерігач з додатковими властивостями
 */
const spy = (originalFn) => {
    // Збереження інформації про виклики
    const callHistory = [];

    // Створення функції-обгортки
    const spyFn = function(...args) {
        // Запис інформації про виклик
        const callInfo = {
            args,
            timestamp: Date.now()
        };

        // Виклик оригінальної функції і збереження результату
        const result = originalFn.apply(this, args);
        callInfo.result = result;
        callHistory.push(callInfo);

        return result;
    };

    // Додавання методів та властивостей до mock об'єкта
    Object.defineProperties(spyFn, {
        // Доступ до оригінальної функції
        original: {
            value: originalFn,
            writable: false
        },

        // Доступ до історії викликів
        calls: {
            get() {
                return [...callHistory];
            }
        },

        // Кількість викликів
        callCount: {
            get() {
                return callHistory.length;
            }
        },

        // Очистити історію викликів
        reset: {
            value: function() {
                callHistory.length = 0;
                return spyFn;
            }
        },

        // Останній виклик
        lastCall: {
            get() {
                return callHistory[callHistory.length - 1] || null;
            }
        },

        // Повернути оригінальну функцію
        restore: {
            value: function() {
                return originalFn;
            }
        },

        // Додати флаг, що це mock
        isMock: {
            value: true,
            writable: false
        }
    });

    // Розширення для імітації повернення значень
    Object.defineProperty(spyFn, 'mockReturnValue', {
        value: function(returnValue) {
            const originalFunc = originalFn;
            originalFn = function(...args) {
                return returnValue;
            };

            // Додаємо метод для відновлення оригінальної функції
            Object.defineProperty(spyFn, 'restoreBehaviour', {
                value: function() {
                    originalFn = originalFunc;
                    return spyFn;
                }
            });

            return spyFn;
        }
    });

    // Розширення для перевірки викликів
    Object.defineProperty(spyFn, 'calledWith', {
        value: function(...expectedArgs) {
            return callHistory.some(call => {
                if (call.args.length !== expectedArgs.length) return false;
                return expectedArgs.every((arg, index) =>
                    JSON.stringify(arg) === JSON.stringify(call.args[index]));
            });
        }
    });
    
    // Копіювати властивості оригінальної функції, якщо це не лямбда
    if (originalFn.name && originalFn.name !== '') {
        // Це існуюча іменована функція, треба скопіювати її властивості
        Object.getOwnPropertyNames(originalFn).forEach(prop => {
            if (prop !== 'arguments' && prop !== 'caller' && prop !== 'prototype' && prop !== 'length' && prop !== 'name') {
                try {
                    const descriptor = Object.getOwnPropertyDescriptor(originalFn, prop);
                    Object.defineProperty(spyFn, prop, descriptor);
                } catch (e) {
                    // Ігноруємо неможливі до копіювання властивості
                }
            }
        });

        // Копіювання prototype для конструкторів
        if (originalFn.prototype) {
            spyFn.prototype = originalFn.prototype;
        }

        // Зберігаємо назву функції
        Object.defineProperty(spyFn, 'name', {
            value: originalFn.name,
            writable: false
        });
    }

    return spyFn;
}

export default spy