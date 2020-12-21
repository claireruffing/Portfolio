const Templater = require('./templater');

// Test 1
test('Undefined', () => {
  const t = new Templater(undefined);
  expect(t.apply({})).toBe(undefined);
});

// Test 2
test('Single Tag', () => {
  const t = new Templater('Hello {{tag}}');
  expect(t.apply({tag: 'World'})).toBe('Hello World');
});

// Test 3
test('Multi Tag', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary had a little lamb');
});

// Test 4
test('Missing Tag', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', lamb: 'lamb'}))
      .toBe('Mary had a lamb');
});

// Test 5
test('Missing Tag Strict', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(() => t.apply({had: 'had', lamb: 'lamb'}, true))
      .toThrowError();
});

// My Test 6
test('No Spaces Tag', () => {
  const t = new Templater('Mary {{had}}{{little}}{{lamb}}');
  expect(t.apply({had: 'had', lamb: 'lamb'}))
      .toBe('Mary hadlamb');
});

// My Test 7
test('Duplicate Tags', () => {
  const t = new Templater('Mary {{had}} {{had}}{{lamb}}');
  expect(t.apply({had: 'had', lamb: 'lamb'}))
      .toBe('Mary had hadlamb');
});

// My Test 8
test('Separated by Other Than Spaces Tags', () => {
  const t = new Templater('Mary {{had}} a {{little}}-{{lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary had a little-lamb');
});

// My Test 9
test('Tag in Map is not in Input', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', world: 'world', lamb: 'lamb'}))
      .toBe('Mary had a lamb');
});

// My Test 10
test('No Tags in Map but Strict is False', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({}))
      .toBe('Mary a ');
});

// My Test 11
test('No Tags in the Input', () => {
  const t = new Templater('Mary had a lamb');
  expect(t.apply({had: 'had', world: 'world', lamb: 'lamb'}))
      .toBe('Mary had a lamb');
});

// My Test 12
test('Extra Spaces in the Input', () => {
  const t = new Templater('Mary {{had}}    a {{little}}    {{lamb}}');
  expect(t.apply({had: 'had', lamb: 'lamb'}))
      .toBe('Mary had a lamb');
});

// My Test 13
test('Extra Space in Tag', () => {
  const t = new Templater('Mary {{had }} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary a little lamb');
});

// My Test 14
test('Extra Space in Tag', () => {
  const t = new Templater('Mary {{had }} a {{little}} {{lamb}}');
  expect(() => t.apply({had: 'had', little: 'little', lamb: 'lamb'}, true))
      .toThrowError();
});
