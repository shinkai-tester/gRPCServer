const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Загружаем файл .proto
const packageDefinition = protoLoader.loadSync(path.join(__dirname, 'protobuf.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const peoplePackage = protoDescriptor.peoplePackage;

const client = new peoplePackage.PeopleService('localhost:50051', grpc.credentials.createInsecure());

function addPerson() {
  const person = {
    id: '1',
    name: 'Alice Smith',
    age: 30,
  };

  client.addPerson(person, (err, response) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Response:', response.message);
    }
  });
}

function findPersonByName() {
  const request = {
    name: 'Alice Smith',
  };

  client.findPersonByName(request, (err, response) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Response:', response);
    }
  });
}

function findPersonById() {
  const request = {
    id: '1',
  };

  client.findPersonById(request, (err, response) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Response:', response);
    }
  });
}

function updatePerson() {
  const request = {
    id: '1',
    name: 'Alice Johnson',
    age: 31,
  };

  client.updatePerson(request, (err, response) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Response:', response.message);
    }
  });
}

function getAllPeople() {
  const request = {};

  client.getAllPeople(request, (err, response) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Response:', response.people);
    }
  });
}

function deletePerson() {
  const request = {
    id: '1',
  };

  client.deletePerson(request, (err, response) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Response:', response.message);
    }
  });
}

// Пример использования функций клиента
addPerson();  // Добавить человека
getAllPeople(); // Получить всех людей
findPersonByName(); // Найти человека по имени
updatePerson(); // Обновить информацию о человеке
deletePerson(); // Удалить человека
