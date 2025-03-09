# gRPC Server usage instructions

1. Clone the repository to your computer:
   ```bash
   git clone https://github.com/shinkai-tester/gRPCServer.git
   ```
2. Install [Node.js](https://nodejs.org/en/download/prebuilt-binaries)

   After installation, verify Node.js and npm versions (npm is a default package manager installed alongside Node.js):
   
   ```bash
   node -v
   npm -v
   ```

3. Install project dependencies:
   ```bash
   npm install @grpc/grpc-js @grpc/proto-loader
   ```
   
4. Run the gRPC server:
   ```bash
   node server.js
   ```

5. Open Postman and create a gRPC request


6. Implement Protobuf


- Click **Service definition** => **Import a proto.file** => **Choose a File** => Select **protobuf.proto** => **Import as API** => **Create a New API**


7. Enter *0.0.0.0:50051* into the address bar


8. Select the desired method from **Select a method**

## Example gRPC request

### Adding a User

**Request**:
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

**Response**:
```json
          {
            "message": "Person added successfully"
          }
```

## About this project

This project is based on the original gRPC server created by [JackBlaaack](https://github.com/JackBlaaack). You can find the original repository at the following link: [gRPCServer](https://github.com/JackBlaaack/gRPCServer).

