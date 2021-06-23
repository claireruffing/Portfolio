const puppeteer = require('puppeteer');

function firstDate(relative) {
  let date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + relative);
  return date.getDay();
}

let browser;

beforeEach(async (done) => {
  browser = await puppeteer.launch({
  });
  done();
});

afterEach(async (done) => {
  await browser.close();
  done();
});

/* test('Next Month', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const num = Math.max(1,Math.floor(Math.random()*28));
  for (let i = 0; i < num; i++) {
    await page.click('#next');
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(500);
  const elem = await page.$("#d"+(firstDate(num)+num-1));
  const cont = await (await elem.getProperty('textContent')).jsonValue();
  expect(cont).toBe(''+num);
});*/

/* test('Prev Month', async () => {
    // debugger;
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    const num = Math.max(1,Math.floor(Math.random()*28));
    console.log('**'+num);
    for (let i = 0; i < num; i++) {
      await page.click('#prev');
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(500);
    const elem = await page.$("#d"+(firstDate(num)+num-1));
    const cont = await (await elem.getProperty('textContent')).jsonValue();
    expect(cont).toBe(''+num);
  });*/

// My Test 8
test('Display', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const date = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const elem = await page.$("#display");
  const cont = await (await elem.getProperty('textContent')).jsonValue();
  expect(cont).toBe(month + '-' + year);
});

test('Today', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const date = new Date();
  const today = date.getDate();
  const elem = await page.$("#today");
  const cont = await (await elem.getProperty('textContent')).jsonValue();
  expect(cont).toBe(today.toString());
});

test('First Day of Month', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstCellId = new Date(year, month, 1).getDay();
  const elem = await page.$("#d" + firstCellId);
  const cont = await (await elem.getProperty('id')).jsonValue();
  expect(cont).toBe('d' + firstCellId);
});

test('Blank Elements Before First Day', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstCellId = new Date(year, month, 1).getDay();
  let elem;
  let cont;
  if (firstCellId > 0) {
    for (let j = firstCellId; j >= 0; j--) {
      elem = await page.$("#d" + j);
      cont = await (await elem.getProperty('textContent')).jsonValue();
      expect(cont).toBe('');
    }
  }
});

test('Blank Elements After First Day', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const numDaysInMonth = new Date(year, month + 1, 0).getDate();
  let elem;
  let cont;
  for (let k = numDaysInMonth; k <= 41; k++) {
    elem = await page.$("#d" + k);
    cont = await (await elem.getProperty('textContent')).jsonValue();
    expect(cont).toBe('');
  }
});

test('Pressed Next No Today ID', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.click('#next');
  await page.waitForTimeout(100);
  const elem = await page.$("#today");
  expect(elem).toBe(null);
});

test('Pressed Prev No Today ID', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.click('#prev');
  await page.waitForTimeout(100);
  const elem = await page.$("#today");
  expect(elem).toBeFalsy();
});

test('Pressed Next then Prev has Today ID', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.click('#next');
  await page.click('#prev');
  await page.waitForTimeout(100);
  const elem = await page.$("#today");
  expect(elem).toBeTruthy();
});

test('Pressed Next Once then Prev Twice No Today ID', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.click('#next');
  await page.click('#prev');
  await page.click('#prev');
  await page.waitForTimeout(100);
  const elem = await page.$("#today");
  expect(elem).toBeFalsy();
});

test('Display Prev', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.click('#prev');
  const date = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[date.getMonth()-1];
  const year = date.getFullYear();
  const elem = await page.$("#display");
  const cont = await (await elem.getProperty('textContent')).jsonValue();
  expect(cont).toBe(month + '-' + year);
});

test('First Day of Month After Next Twice', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.click('#next');
  await page.click('#next');
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstCellId = new Date(year, month+2, 1).getDay();
  const elem = await page.$("#d" + firstCellId);
  const cont = await (await elem.getProperty('id')).jsonValue();
  expect(cont).toBe('d' + firstCellId);
});
