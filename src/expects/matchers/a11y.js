export default {
    toHaveAriaAttribute(expected, msg = null) {
        let received = this.received
        let result = received.hasAttribute(`aria-${expected}`)

        this.assert(
            result,
            msg,
            'toHaveAriaAttribute',
            `aria-${expected}`,
        )

        return this
    },
    
    toHaveAriaAttributes(msg = null) {
        let received = this.received
        let result = false

        for (const attr of received.attributes) {
            if (attr.name.startsWith(`aria-`)) {
                result = true
                break
            }
        }
        
        this.assert(
            result,
            msg,
            'toHaveAriaAttributes',
            `aria-*`,
        )

        return this
    },
    
    toHaveAriaRole(expected, msg = null) {
        let received = this.received
        let result = received.getAttribute(`role`) === expected

        this.assert(
            result,
            msg,
            'toHaveAriaRole',
            received.getAttribute(`role`),
        )

        return this
    },
    
    toHaveAriaLabel(msg = null) {
        let received = this.received
        let result = received.hasAttribute(`aria-label`)

        this.assert(
            result,
            msg,
            'toHaveAriaLabel',
            received.getAttribute(`aria-label`),
        )

        return this
    },
    
    toHaveAltText(msg = null) {
        let received = this.received
        let alt = received.getAttribute(`alt`)
        let result = alt && alt !== '' 

        this.assert(
            result,
            msg,
            'toHaveAltText',
            alt,
        )

        return this
    },
    
    toBeKeyboardAccessible(msg = null) {
        let received = this.received;
        let result = false;
        let reason = '';

        // Елементи, які за замовчуванням отримують фокус
        const nativelyFocusable = [
            'a', 'button', 'input', 'select', 'textarea', 'summary', 'audio[controls]',
            'video[controls]', '[contenteditable]'
        ];

        // Перевіряємо, чи елемент має вбудовану фокусовність
        const tagName = received.tagName.toLowerCase();
        const isNativelyFocusable = nativelyFocusable.some(selector => {
            if (selector.includes('[')) {
                // Для селекторів з атрибутами
                const [tag, attr] = selector.split('[');
                const attrName = attr.replace(']', '');
                return tagName === tag && received.hasAttribute(attrName);
            }
            return tagName === selector;
        });

        // Перевіряємо tabindex
        const hasTabindex = received.hasAttribute('tabindex');
        const tabindexValue = hasTabindex ? received.getAttribute('tabindex') : null;
        const hasValidTabindex = hasTabindex && tabindexValue !== '-1';

        // Перевіряємо, чи елемент не є прихованим
        const isHidden =
            received.hasAttribute('hidden') ||
            received.hasAttribute('aria-hidden') === 'true' ||
            (received.style && received.style.display === 'none') ||
            (received.style && received.style.visibility === 'hidden');

        if (isNativelyFocusable && !isHidden) {
            result = true;
        } else if (hasValidTabindex && !isHidden) {
            result = true;
        } else if (isHidden) {
            result = false
        } else if (hasTabindex && tabindexValue === '-1') {
            result = false
        } else {
            result = false
        }
        
        this.assert(
            result,
            msg,
            'toBeKeyboardAccessible',
            'Accessible',
            `Not Accessible`
        );

        return this;
    }
}