const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

beforeAll(() => {
});

afterEach(() => {
    document.body.innerHTML = '';
});

describe('Rendering React Components', () => {
    it('should render without error', async () => {
        await expect(<Button text="Click me" />).react.toRenderWithoutError();
    });
    it('should render button and button has text', async () => {
        await expect(<Button text="Click me" />).react.toRenderText("Click me");
    });
})

describe('Check DOM after Rendering React Components', () => {
    it('should has button', async () => {
        await expect(<Button text="Click me" />).react.toContainElement("button");
    });
    it('should has 1 button', async () => {
        await expect(<Button text="Click me" />).react.toHaveElementCount("button", 1);
    });
})

describe('React Button (JSX)', () => {
    it('should render a button with text', async () => {
        const { container } = await R.render(<Button text="Click me" />);
        await waitFor(100);
        const button = container.querySelector('button');
        expect(button).toBeHtmlElement().hasText('Click me');
    });

    it('should handle click events', async () => {
        let clicked = false;
        const handleClick = () => {
            clicked = true;
        };
        const { container } = await R.render(<Button text="Click me" onClick={handleClick} />);
        await waitFor(100);
        const button = container.querySelector('button');
        expect(button).toBeHtmlElement();
        button.click();
        expect(clicked).toBeTrue();
    });
});
