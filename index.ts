import express from "express";
import Backendless from "backendless";


Backendless.initApp(APP_ID, API_KEY);

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
const data = {
  name: "whil",
  age: 19,
};

const createPerson = (): Promise<Person> => {
  const person = new Person(data.name, data.age);
  return Backendless.Data.of(Person).save<Person>(person);
};

const app = express();
const PORT = 3000;

app.get("/", (req, res, next) => {
  createPerson()
    .then((person) => res.json(person))
    .then((data) => console.log(data))
    .catch(next);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
