# Инструкция по эксплуатации gRPC сервера

1. Склонируйте репозиторий на свой компьютер:
   ```bash
   git clone https://github.com/shinkai-tester/gRPCServer.git
   ```
2. Установите [Node.js](https://nodejs.org/en/download/prebuilt-binaries)

   После установки можем проверить версии Node.js и npm (стандартный менеджер пакетов, устанавливается вместе с Node.js):
   
   ```bash
   node -v
   npm -v
   ```

3. Установите зависимости для проекта:
   ```bash
   npm install @grpc/grpc-js @grpc/proto-loader
   ```
   
4. Запустите gRPC сервер:
   ```bash
   node server.js
   ```

5. Откройте Postman и создайте gRPC запрос


6. Имплементируйте Protobuf


- Нажмите **Service definition** => **Import a proto.file** => **Choose a File** => Выбрать **protobuf.proto** => **Import as API** => **Create a New API**


7. В адресную строку введите *0.0.0.0:50051*


8. Выбирайте метод, который хотите использовать в **Select a method**

## Пример gRPC-запроса

### Добавление пользователя

**Запрос**:
```json
          {
            "id": "1",
            "name": "Jane Doe",
            "age": 30
          }
```

```bash
grpcurl -plaintext -import-path . -proto protobuf.proto -d '{"id": "1", "name": "Jane Doe", "age": 30}' localhost:50051 peoplePackage.PeopleService/AddPerson
```

**Ответ**:
```json
          {
            "message": "Person added successfully"
          }
```

## Об этом проекте

Этот проект основан на оригинальном gRPC сервере, созданном пользователем [JackBlaaack](https://github.com/JackBlaaack). Оригинальный репозиторий можно найти по следующей ссылке: [gRPCServer](https://github.com/JackBlaaack/gRPCServer).

