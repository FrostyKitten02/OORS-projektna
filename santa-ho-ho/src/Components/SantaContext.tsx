import {createContext, ReactNode, useState} from "react";
import {v4 as uuid} from "uuid";
export interface Address {
    street?: string;
    number?: number;
    zip?: number;
    city?: string;
}

export interface Child {
    id?: string;
    firstname?: string;
    lastname?: string;
    age?: number;
    address?: Address;
    stars?: number;
    blackStart?: number;
}

export interface Present {
    id?: string;
    name?: string;

}

interface SantaBaseContext {
    searchChildren: (name: string) => Child[];
    searchPresents: (name: string) => Present[];
    addChild: (child: Child) => void;
    getChildById: (id: string) => Child | undefined;
    addPresent: (present: Present) => void;
}

interface ISantaContext extends SantaBaseContext{
    children: Child[],
    presents: Present[]
}

//TODO implement functions!
const initalState: ISantaContext = {
    children: [],
    presents: [],
    searchChildren: function(name: string) {
       return this.children.filter(child => child.firstname?.includes(name) || child.lastname?.includes(name));
    },
    searchPresents: function (name: string) {
        return this.presents.filter(present => present.name?.includes(name));
    },
    addChild: function (child: Child) {
        if (child.id === undefined) {
            child.id = uuid();
            this.children.push(child);
        }
    },
    getChildById: function (id: string) {
      return this.children.find(child => child.id === id);
    },
    addPresent: (present: Present) => {},
}


export const santaContext = createContext<SantaBaseContext>(initalState);
export default function SantaContext({children}:{children: ReactNode}) {
    const [ctx, setCtx] = useState<ISantaContext>(initalState);

    return (
        <santaContext.Provider value={ctx} >
            {children}
        </santaContext.Provider>
    )
}