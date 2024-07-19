// data/users.json

const usersData = [
  {
    id: "1",
    email: "herman.beck@example.com",
    firstName: "Herman",
    lastName: "Beck",
    password: "password123",
    phoneNumber: "123-456-7890",
    address: "123 Main St",
    active: true,
    createdAt: "2015-05-15T00:00:00.000Z",
    updatedAt: "2015-05-15T00:00:00.000Z",
    updatedBy: 1,
    role: 2,
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    progress: 25,
    amount: 77.99,
    deadline: "2015-05-15T00:00:00.000Z",
  },
  {
    id: "2",
    email: "messsy.adam@example.com",
    firstName: "Messsy",
    lastName: "Adam",
    password: "password456",
    phoneNumber: "987-654-3210",
    address: "456 Elm St",
    active: true,
    createdAt: "2015-07-01T00:00:00.000Z",
    updatedAt: "2015-07-01T00:00:00.000Z",
    updatedBy: 1,
    role: 2,
    profilePicture:
      "https://img.freepik.com/free-photo/front-view-smiley-woman-with-earbuds_23-2148613052.jpg",
    progress: 75,
    amount: 245.3,
    deadline: "2015-07-01T00:00:00.000Z",
  },
  {
    id: "3",
    email: "john.richards@example.com",
    firstName: "John",
    lastName: "Richards",
    password: "password789",
    phoneNumber: "123-123-1234",
    address: "789 Pine St",
    active: true,
    createdAt: "2015-04-12T00:00:00.000Z",
    updatedAt: "2015-04-12T00:00:00.000Z",
    updatedBy: 1,
    role: 2,
    profilePicture:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progress: 90,
    amount: 138.0,
    deadline: "2015-04-12T00:00:00.000Z",
  },
  {
    id: "4",
    email: "peter.meggik@example.com",
    firstName: "Peter",
    lastName: "Meggik",
    password: "password012",
    phoneNumber: "321-321-4321",
    address: "321 Oak St",
    active: true,
    createdAt: "2015-05-15T00:00:00.000Z",
    updatedAt: "2015-05-15T00:00:00.000Z",
    updatedBy: 1,
    role: 2,
    profilePicture:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    progress: 50,
    amount: 77.99,
    deadline: "2015-05-15T00:00:00.000Z",
  },
  {
    id: "5",
    email: "edward@example.com",
    firstName: "Edward",
    lastName: "Smith",
    password: "password345",
    phoneNumber: "456-456-4567",
    address: "456 Birch St",
    active: true,
    createdAt: "2015-05-03T00:00:00.000Z",
    updatedAt: "2015-05-03T00:00:00.000Z",
    updatedBy: 1,
    role: 2,
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    progress: 35,
    amount: 160.25,
    deadline: "2015-05-03T00:00:00.000Z",
  },
  {
    id: "6",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    password: "password678",
    phoneNumber: "789-789-7890",
    address: "789 Cedar St",
    active: false,
    createdAt: "2015-04-05T00:00:00.000Z",
    updatedAt: "2015-04-05T00:00:00.000Z",
    updatedBy: 1,
    role: 2,
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    progress: 65,
    amount: 123.21,
    deadline: "2015-04-05T00:00:00.000Z",
  },
  {
    id: "7",
    email: "henry.tom@example.com",
    firstName: "Henry",
    lastName: "Tom",
    password: "password901",
    phoneNumber: "111-222-3333",
    address: "111 Maple St",
    active: true,
    createdAt: "2015-06-16T00:00:00.000Z",
    updatedAt: "2015-06-16T00:00:00.000Z",
    updatedBy: 1,
    role: 2,
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDlebgIrUv7kuWq020zEiMBjqVsJOS0G6SkC5StIlGzXfvyDUFOwdxSQ9jc3ilXd-mFwM&usqp=CAU",
    progress: 20,
    amount: 150.0,
    deadline: "2015-06-16T00:00:00.000Z",
  },
];

export default usersData;