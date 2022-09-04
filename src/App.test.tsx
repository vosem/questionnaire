import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import AddWidget from './components/AddWidget';
import config from './components/db.json';

const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum?'

test('Adding question: The input value is displayed only if it\'s valid', () => {
  render(<App />);

  const input = screen.getByTestId('add-question') as HTMLInputElement;

  fireEvent.change(input, {target: {value: 'Hello? "Nobody is at home"'}});
  expect(input.value).toBe('Hello? "Nobody is at home"');
});

test('Adding question: The length of question should not exceed 255 chars', () => {
  render(<App />);

  const input = screen.getByTestId('add-question') as HTMLInputElement;

  fireEvent.change(input, {target: {value: `${longText}?`}});
  expect(input.value).toBe('');
});

test('Adding question: The length of answer should not exceed 255 chars', () => {
  render(<App />);

  const input = screen.getByTestId('add-question') as HTMLInputElement;

  fireEvent.change(input, {target: {value: `Hello? "${longText}"`}});
  expect(input.value).toBe('');
});

test('Adding question: The data is changed only if input value is valid', () => {
  const setData = jest.fn();

  render(<AddWidget data={config.data} setData={setData} />);

  const input = screen.getByTestId('add-question') as HTMLInputElement;

  fireEvent.submit(input, {target: {value: 'Hello? "Nobody is at home"'}});
  expect(setData).toHaveBeenCalled();
});

test('Adding question: The data is not changed if input value does not contain "?"', () => {
  const setData = jest.fn();

  render(<AddWidget data={config.data} setData={setData} />);

  const input = screen.getByTestId('add-question') as HTMLInputElement;

  fireEvent.submit(input, {target: {value: 'Hello "Nobody is at home"'}});
  expect(setData).not.toHaveBeenCalled();
});

test('Adding question: The data is not changed if input value does not contain any answer', () => {
  const setData = jest.fn();

  render(<AddWidget data={config.data} setData={setData} />);

  const input = screen.getByTestId('add-question') as HTMLInputElement;

  fireEvent.submit(input, {target: {value: 'Hello?'}});
  expect(setData).not.toHaveBeenCalled();
});

test('Adding question: The data is not changed if input value does not contain any non-empty answer', () => {
  const setData = jest.fn();

  render(<AddWidget data={config.data} setData={setData} />);

  const input = screen.getByTestId('add-question') as HTMLInputElement;

  fireEvent.submit(input, {target: {value: 'Hello? ""'}});
  expect(setData).not.toHaveBeenCalled();
});

test('Adding question: The data is not changed if answer is not quoted', () => {
  const setData = jest.fn();

  render(<AddWidget data={config.data} setData={setData} />);

  const input = screen.getByTestId('add-question') as HTMLInputElement;

  fireEvent.submit(input, {target: {value: 'Hello? there is nobody here'}});
  expect(setData).not.toHaveBeenCalled();
});

test('Asking question: The length of question should not exceed 255 chars', () => {
  render(<App />);

  const input = screen.getByTestId('ask-question') as HTMLInputElement;

  fireEvent.change(input, {target: {value: `${longText}?`}});
  expect(input.maxLength).toBe(255);
});
