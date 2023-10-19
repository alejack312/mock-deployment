/*
  Demo: test ordinary Java/TypeScript
*/

import { test, expect } from '@playwright/test';

// all exports from main will now be available as main.X
// import * as main from '../mock/src/main';
// import * as main from '../src/main';

test('is 1 + 1 = 2?', () => {
  expect(1 + 1).toBe(2)
})

