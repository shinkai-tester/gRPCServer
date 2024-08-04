const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Загружаем файл .proto
const PROTO_PATH = path.join(__dirname, 'protobuf.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const peopleProto = protoDescriptor.peoplePackage;

const people = []; // Хранилище данных о людях

// Проверка возраста
function checkAge(age) {
  const maxAge = 100;
  if (age <= 0 || age > maxAge) {
    throw new Error(`Invalid age: ${age}`);
  }
}

// Проверка уникальности ID
function isIdUnique(id) {
  return !people.some(person => person.id === id);
}

// Добавление человека
function addPerson(call, callback) {
  const person = call.request;
  try {
    if (!person.id || !person.name || person.age === undefined) {
      throw new Error('Missing required fields');
    }
    if (!isIdUnique(person.id)) {
      throw new Error('ID must be unique');
    }
    checkAge(person.age);
    people.push(person);
    callback(null, { message: 'Person added successfully' });
  } catch (error) {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: error.message,
    });
  }
}

// Поиск человека по имени
function findPersonByName(call, callback) {
  const name = call.request.name;
  const foundPerson = people.find(person => person.name.toLowerCase() === name.toLowerCase());

  if (foundPerson) {
    callback(null, foundPerson);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Person not found',
    });
  }
}

// Поиск человека по ID
function findPersonById(call, callback) {
  const id = call.request.id;
  const foundPerson = people.find(person => person.id === id);
  if (foundPerson) {
    callback(null, foundPerson);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Person not found',
    });
  }
}

// Обновление информации о человеке
function updatePerson(call, callback) {
  const person = call.request;
  try {
    if (!person.id || !person.name || person.age === undefined) {
      throw new Error('Missing required fields');
    }
    checkAge(person.age);
    const index = people.findIndex(p => p.id === person.id);
    if (index !== -1) {
      people[index].name = person.name;
      people[index].age = person.age;
      const updatedData = {
        id: people[index].id,
        name: people[index].name,
        age: people[index].age,
      };
      callback(null, {
        message: 'Person updated successfully',
        person: updatedData,
      });
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Person not found',
      });
    }
  } catch (error) {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: error.message,
    });
  }
}

// Получение списка всех людей
function getAllPeople(call, callback) {
  callback(null, { people: people });
}

// Удаление человека по ID
function deletePerson(call, callback) {
  const idToDelete = call.request.id;
  const index = people.findIndex(person => person.id === idToDelete);

  if (index !== -1) {
    people.splice(index, 1); // Удалить пользователя из массива
    callback(null, { message: 'Person deleted successfully' });
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Person not found',
    });
  }
}

function main() {
  const server = new grpc.Server();
  server.addService(peopleProto.PeopleService.service, {
    addPerson: addPerson,
    findPersonByName: findPersonByName,
    findPersonById: findPersonById,
    updatePerson: updatePerson,
    getAllPeople: getAllPeople,
    deletePerson: deletePerson,
  });

  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(`Server binding failed: ${err.message}`);
      return;
    }
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

main();
