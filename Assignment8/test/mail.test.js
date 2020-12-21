const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../src/app');

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return db.reset();
});

afterAll((done) => {
  server.close(done);
});

test('GET Invalid URL', async () => {
  await request.get('/v0/so-not-a-real-end-point-ba-bip-de-doo-da/')
    .expect(404);
});

test('GET All', async () => {
  await request.get('/v0/mail')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();

    })
});

test('GET All by inbox mailbox', async () => {
  await request.get('/v0/mail?mailbox=inbox')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
    })
});

test('GET One', async () => {
  await request.get('/v0/mail/{id}')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      // expect(data.body).toBeDefined();
      // expect(data.body.id).toBeDefined();
      // expect(data.body.id).toEqual('b78cc4b5-01ef-44a1-840f-0516ec82ff2d');
      // expect(data.body.to.name).toEqual('CSE183 Student');
      // expect(data.body.to.email).toEqual('cse183-student@ucsc.edu');
      // expect(data.body.from.name).toEqual('Tansy Libbe');
      // expect(data.body.from.email).toEqual('tlibbe14@odnoklassniki.ru');
      // expect(data.body.subject).toEqual('Grass-roots dynamic frame');
      // expect(data.body.received).toEqual('2019-11-24T09:54:21Z');
      // expect(data.body.sent).toEqual('2020-03-24T13:35:45Z');
      // expect(data.body.content).toEqual('Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.');
    })
});

test('GET Missing', async () => {
  await request.get('/v0/mail/e5c85e73-15c1-4366-b80f-ebeb72cca836')
    .expect(404)
});

test('GET Invalid UUID ', async () => {
  await request.get('/v0/books/e5cede86-15c1-4226-b80f-ebeblxccah2v')
    .expect(404)
});

const email = {
  to: { name: 'CSE183 Student', email: 'cse183-student@ucsc.edu' },
  subject: 'How you doin',
  content: 'Hello there.'
};

test('POST New', async () => {
  await request.post('/v0/mail/')
    .send(email)
    .expect(201)
    .then(data => {
      expect(data).toBeDefined();
      const res = JSON.parse(JSON.stringify(data.body));
      expect(res).toBeDefined();
      expect(data.body.id).toBeDefined();
      expect(data.body.received).toBeDefined();
      expect(data.body.sent).toBeDefined();
      expect(res.content).toEqual(email.content);
      expect(res.subject).toBe(email.subject);
      expect(res['from.name']).toBeDefined();
      expect(res['from.email']).toBeDefined();
      expect(res['to.name']).toBe(email['to.name']);
      expect(res['to.email']).toBe(email['to.email']);
    })
});
