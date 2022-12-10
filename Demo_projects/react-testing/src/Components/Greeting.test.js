import {render, screen} from '@testing-library/react';
import Greeting from './Greeting';

describe('Greeting component', ()=>{
    test('Test Greeting component with text Hello World!', ()=>{
        render(<Greeting/>);
        const helloWorldText = screen.getByText('Hello World!');
        expect(helloWorldText).toBeInTheDocument();
    });
});

