import { afterEach, describe, expect, it, mock } from '../src/index.js'
import { Window } from 'happy-dom'

describe('XMLHttpRequest Mocking', () => {
    let mockHelper

    afterEach(() => {
        // Очистка моков после тестов при необходимости
        if (mockHelper && mockHelper.reset) {
            mockHelper.reset()
        }
    })

    it('Must correctly process the GET queries', async () => {
        // Настраиваем мок для XMLHttpRequest
        const mockConfig = {
            responseStatus: 200,
            responseData: { data: 'test' }
        }

        // Вызываем mock с флагом isXhr = true
        mockHelper = mock(mockConfig, "ajax")

        // Создаем экземпляр XHR (обратите внимание на оператор new)
        const xhr = new Window.XMLHttpRequest()

        // Создаем Promise для ожидания асинхронного ответа
        const responsePromise = new Promise(resolve => {
            xhr.onload = () => {
                resolve(true)
            }
        })

        // Отправляем запрос
        xhr.open('GET', '/api/data')
        xhr.send()

        // Ждем ответа
        const responseReceived = await responsePromise

        // Проверяем результаты
        expect(responseReceived).toBeTrue()
        expect(xhr.status).toBe(200)
        expect(JSON.parse(xhr.responseText)).toBeObject({ data: 'test' })
    })

    it('Must correctly process errors', async () => {
        // Настраиваем мок с ошибкой
        mockHelper = mock({
            responseStatus: 500,
            responseText: 'Server Error'
        }, "ajax")

        const xhr = new Window.XMLHttpRequest()

        const errorPromise = new Promise(resolve => {
            xhr.onerror = () => {
                resolve(true)
            }

            xhr.onload = () => {
                if (xhr.status >= 400) {
                    resolve(true)
                }
            }
        })

        xhr.open('GET', '/api/error')
        xhr.send()

        const errorReceived = await errorPromise

        expect(errorReceived).toBeTrue()
        expect(xhr.status).toBe(500)
    })
})