import Dexie, { type EntityTable } from 'dexie';

// export class TabDb extends Dexie {
//   tabs!: Dexie.Table<Tab, number>;

//   constructor() {
//     super("tabs");

//     // Define tables and indexes
//     this.version(1).stores({
//       tabs: "++id,name,path,order,take,skip,search,orderBy",
//     });
//   }
// }

export interface Tab {
  // id?: number;
  name: string,
  path: string,
  order: number,
  take: number,
  skip: number,
  search?: string | null | undefined,
  orderBy?: string | null | undefined
}


const db = new Dexie('TabDb') as Dexie & {
  tabs: EntityTable<
    Tab,
    'order' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  tabs: "++id,name,path,order,take,skip,search,orderBy",
});

export { db };
