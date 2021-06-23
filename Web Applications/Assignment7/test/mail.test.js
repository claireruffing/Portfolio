const supertest = require('supertest');
const http = require('http');

const app = require('../src/app');

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
});

afterAll((done) => {
  server.close(done);
});

test('GET Invalid URL', async () => {
  await request.get('/v0/email-blahblah/')
    .expect(404)
});

test('GET All', async () => {
  await request.get('/v0/mail')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      // expect(data.body['name']).toBeDefined();
      // expect(data.body['mail']).toBeDefined();
    })
});

test('GET One', async () => {
  await request.get('/v0/mail/17731287-7c23-42f8-99d2-b3d1856be203')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.id).toBeDefined();
      expect(data.body.id).toEqual('17731287-7c23-42f8-99d2-b3d1856be203');
      expect(data.body['to-name']).toEqual('CSE183 Student');
      expect(data.body['to-email']).toEqual('cse183-student@ucsc.edu');
      expect(data.body['from-name']).toEqual('Jerrome Ochiltree');
      expect(data.body['from-email']).toEqual('jochiltreeb@buzzfeed.com');
      expect(data.body.subject).toEqual('Girl 6');
      expect(data.body.received).toEqual('2020-07-17T00:51:16Z');
      expect(data.body.content).toEqual('Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.');
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
  id: 'e5c73e86-15c1-4226-b80f-ebeb72cca259',
  ['to-name']: 'CSE183 Student',
  ['to-email']: 'cse183-student@ucsc.edu',
  ['from-name']: 'Claire Ruffing',
  ['from-email']: 'cherrio246@gmail.com',
  subject: 'How you doin',
  received: '2019-11-02T15:52:27Z',
  content: 'Hello there aosfjdsnndv skjdbvd kn gvhdk vkjs hks dkdh vkjsbksd kihedkbjjdf wkshdbvjldnlvnnlsnvk.'
};

test('POST New', async () => {
  await request.post('/v0/mail/')
    .send(email)
    .expect(201)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.id).toBeDefined();
      expect(data.body['from-name']).toBeDefined();
      expect(data.body['from-email']).toBeDefined();
      expect(data.body['to-name']).toEqual(email['to-name']);
      expect(data.body['to-email']).toEqual(email['to-email']);
      expect(data.body.subject).toEqual(email.subject);
      const date = new Date().toISOString().split('.')[0] + 'Z';
      expect(data.body.received).toEqual(date);
      expect(data.body.content).toEqual(email.content);
    })
});

// test('GET After POST', async () => {
//   await request.get('/v0/mail/')
//     .expect(200)
//     .then(data => {
//       expect(data).toBeDefined();
//       expect(data.body).toBeDefined();
//       expect(data.body.id).toBeDefined();
//       expect(data.body['from-name']).toBeDefined();
//       expect(data.body['from-email']).toBeDefined();
//       expect(data.body['to-name']).toEqual(email['to-name']);
//       expect(data.body['to-email']).toEqual(email['to-email']);
//       expect(data.body.subject).toEqual(email.subject);
//       const date = new Date().toISOString().split('.')[0] + 'Z';
//       expect(data.body.received).toEqual(date);
//       expect(data.body.content).toEqual(email.content);
//     })
// });

// test('POST Invalid ID', async () => {
//   email.id = 'some-old-guff';
//   await request.post('/v0/mail/')
//     .send(email)
//     .expect(400)
// });

// test('POST Exisiting ID', async () => {
//   email.id = 'e5c73e86-15c1-4226-b80f-ebeb72cca259';
//   await request.post('/v0/mail/')
//     .send(email)
//     .expect(400)
// });


