import fetch from "node-fetch";

export const resolvers = {
  Query: {
    hello: () => "home",
    getPerson: async (_: any, { id }: any) => {
      const response = await fetch(
        "http://localhost:7000/api/user/6426a784562a4ccf599e2550"
      );
      return response.json();
    },
    getAllPersons: async (_: any) => {
      const response = await fetch("http://localhost:7000/api/users");
      return response.json().then((response) => response.DATA);
    },
  },
  Mutation: {
    removeUser: async (_: any, { id }: any) => {
      let options = {
        method: "delete",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
      };
      const response = await fetch(
        `http://localhost:7000/api/user/${id}`,
        options
      );
      return response.json();
    },
    createUser: async (parent: any, args: any, ctx: any, info: any) => {
      await fetch(`http://localhost:7000/api/user`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args.input),
      }).then((x) => {
        return x.json();
      });
    },
  },
};
