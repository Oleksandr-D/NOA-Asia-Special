import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { collection, DocumentData } from '@firebase/firestore';
import { IUserRequest } from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isUserLogin$ = new Subject<boolean>();
  private userCollection!: CollectionReference<DocumentData>;
  
  constructor(private afs: Firestore) { 
    this.userCollection = collection(this.afs, 'users');
  }

  updateFirebase(discount: IUserRequest, id: string) {
    const categoryDocumentReferense = doc(this.afs, `users/${id}`);
    return updateDoc(categoryDocumentReferense, { ...discount });
  }

  getOneFirebase(id: string) {
    const productDocumentReferense = doc(this.afs, `users/${id}`);
    return docData(productDocumentReferense, { idField: 'id' });
  }

}
