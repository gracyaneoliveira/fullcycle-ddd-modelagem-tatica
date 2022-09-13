// Entidade focada em NEGÓCIO
// O ORM precisa de uma entidade focada em persistência

// # DOMAIN - Complexidade de Negóio
// - Entity
//-- customer.ts (Regra de Negócio)

// # INFRA - Mundo externo - Complexidade acidental
// - Entity / Model
//-- customer.ts (get, set)

import Address from "./address";


export default class Customer {
    
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    validate() {
        if(this._id.length === 0) {
            throw new Error("Id is required")
        }
        if(this._name.length === 0) {
            throw new Error("Name is required")
        }        
    }
    
    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    isActive(): boolean {
        return this._active;
    }

    activate() {
        if(this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get address(): Address {
        return this._address;
    }
    
    set address(address: Address) {
        this._address = address;
    }    
}
