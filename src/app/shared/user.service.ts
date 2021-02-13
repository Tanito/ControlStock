import { Injectable } from '@angular/core';
import { User } from './User';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userList: AngularFireList<any>;
  userRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createUser(user: User) {
    return this.userList.push({
      tipo: user.tipo,
      sabor: user.sabor,
      cantidad: user.cantidad
    })
  }

  // Get single object
  getUser(id: string) {
    this.userRef = this.db.object('/user/' + id);
    return this.userRef;
  }

  // Get List
  getUserList() {
    this.userList = this.db.list('/user');
    return this.userList;
  }

  // Update
  updateUser(id, user: User) {
    return this.userRef.update({
      tipo: user.tipo,
      sabor: user.sabor,
      cantidad: user.cantidad
    })
  }

  // Delete
  deleteUser(id: string) {
    this.userRef = this.db.object('/user/' + id);
    this.userRef.remove();
  }
}