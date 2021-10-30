import HKTextarea from "./HKTextarea";
import { render, screen, fireEvent } from '@testing-library/react';
jest.mock('react-i18next', () => ({
    withTranslation: () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
      return Component;
    },
})); 
describe('HKTextarea component', () => {
    test('Should render without crash', async () => {
        render(<HKTextarea />);
    });
    test('Should contains props values', async () => {
        render(<HKTextarea label={"Label test"} placeholder={"Placeholder test"}  value={"Value test"} rows={3}/>);
        const label = screen.getByTestId('label');
        const textarea = screen.getByTestId('textarea');
        expect(label.textContent).toBe('Label test');
        expect(textarea.value).toBe('Value test');
        expect(textarea.placeholder).toBe('Placeholder test');
        fireEvent.change(textarea, {target: {value: 'address'}});
        expect(textarea.value).toBe('address');
        expect(textarea.rows).toBe(3);
    });
    test('Should contains props values (disabled)', async () => {
        render(<HKTextarea placeholder={"Placeholder test"}  value={""} disabled={true}/>);
        const textarea = screen.getByTestId('textarea');
        expect(textarea.disabled).toBe(true);
    });
    test('Should contains props values (invalid_message)', async () => {
        render(<HKTextarea value={""}  invalid_message={"Invalid message"}/>);
        var invalid_message = screen.getByText('Invalid message');
        expect(invalid_message.textContent).toBe("Invalid message");
    });
    test('Should contains props values (error_message)', async () => {
        render(<HKTextarea value={""}  error_message={"Error message"}  invalid_message={"Invalid message"}/>);
        var error_message = screen.getByText('Error message');
        expect(error_message.textContent).toBe("Error message");
    });
    test('Should contains props values (valid_message)', async () => {
        render(<HKTextarea value={""}  valid_message={"Valid message"} />);
        var valid_message = screen.getByText('Valid message');
        expect(valid_message.textContent).toBe("Valid message");
    });
});