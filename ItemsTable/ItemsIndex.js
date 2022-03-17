// /**
//  * Data Model Interfaces
//  */
//  import { BaseItem, Item } from "../model/items";
//  import { Items } from "./ItemsMiddleware";

// /**
//  * In-Memory Store
//  */
//  let items: Items = {
//     1: {
//       id: 1,
//       name: "Premium Rage Session",
//       time: "20 minutes",
//       price: 8300,
//       numberOfPeople: "1 person Only- Aged 13+",
//       description: "6 mini items, 10 small items, 5 large items, 1 large item",
//       image: " "
//     },
//     2: {
//       id: 2,
    //   name: "Keep It Glassy",
    //   time: "20 minutes",
    //   price: 11025,
    //   numberOfPeople: "1-2 people- Aged 13+",
    //   description: "12 mini items, 24 small items, 12 medium",
    //   image: " "
//     },
//     3: {
//       id: 3,
//       name: "Date Night",
//       time: "25 minutes",
//       price: 14400,
//       numberOfPeople: "1-2 people- Aged 13+",
//       description: "6 mini items, 16 small items, 7 medium items, 3 large items",
//       image: " "
//     },
//     4: {
//         id: 4,
//         name: "Smash Party",
//         time: "30 minutes",
//         price: 23200,
//         numberOfPeople: "1-4 people- Aged 13+",
//         description: "12 mini items, 22 small items, 14 medium items, 6 large items",
//         image: " "
//     },
//     5: {
//       id: 5,
//       name: "Shattered Dreams (all glass & ceramic package)",
//       time: "30 minutes",
//       price: 41000,
//       numberOfPeople: "1-8 people- Aged 13+",
//       description: "48 mini items, 96 small items, 48 medium items",
//       image: " "
//     },
//     6: {
//         id: 6,
//         name: "Overkill",
//         time: "45 minutes",
//         price: 44100,
//         numberOfPeople: "1-8 people- Aged 13+",
//         description: "24 mini items, 50 small items, 34 medium items, 12 large items, BONUS FREE tractor tire",
//         image: " "
//     },
//     7: {
//         id: 7,
//         name: "Rage-A-Palooza",
//         time: "45 minutes",
//         price: 66200,
//         numberOfPeople: "1-12 people- Aged 13+",
//         description: "36 mini items, 74 small items, 50 medium items, 16 large items, BOUNS FREE tractor tire",
//         image: " "
//     },
//     8: {
//         id: 8,
//         name: "The Big Bang",
//         time: "45 minutes",
//         price: 82700,
//         numberOfPeople: "1-15 people- Aged 13+",
//         description: "36 mini items, 96 small items, 62 medium items, 20 large items, BONUS FREE tractor tire",
//         image: " "
//       }  
//   };

// /**
//  * SERVICE METHOD to perform read & write on the items, findAll returns all items, find finds the id,
//  * create receives an object of type BaseItem as an arguement, to create a unique id value I'm using the value of the current Date
//  */
//  export const findAll = async (): Promise<Item[]> => Object.values(items);

//  export const find = async (id: number): Promise<Item> => items[id];

//  export const create = async (newItem: BaseItem): Promise<Item> => {
//     const id = new Date().valueOf();
//         items[id] = {
//         id,
//         ...newItem,
//     };
//     return items[id];
//   };

// // update method receives the item id property& itemUpdate as object arguements, id finds the item
//   export const update = async (
//         id: number,
//         itemUpdate: BaseItem
//     ): Promise<Item | null> => {
//         const item = await find(id);
//              (!item) {
//             return null;
//     }
//     items[id] = { id, ...itemUpdate };
//     return items[id];
//   };  

//   // Removes items by id
//   export const remove = async (id: number): Promise<null | void> => {
//     const item = await find(id);
  
//     if (!item) {
//       return null;
//     }
  
//     delete items[id];
//   };