import { makeAutoObservable } from 'mobx'
export default class ObjectStore {
    constructor() {
        this._objects = [];
        makeAutoObservable(this)
    }

    setObject(objects) {
        this._objects = objects;
    }

    get objects() {
        return this._objects;
    }
}