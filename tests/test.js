import {getAllComputers} from '../middleware/computers.js';
import {app} from '../app.js/index.js.js';

const server = app.listen();



test('Check return getAllComputers()', () => {
  expect(getAllComputers()).toBe('All computers (func)');
});

test('adds 1 + 2 to equal 3', () => {
  expect().toBe('All computers (func)');
});
