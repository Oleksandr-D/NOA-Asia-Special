import { Injectable } from '@angular/core';
import { ICategoryRequest } from '../../interfaces/category/category.interface';
import { Firestore, CollectionReference, addDoc,
         collectionData, doc, updateDoc, deleteDoc 
        } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryCollection!: CollectionReference < DocumentData > ;

  constructor(private afs: Firestore) {
    this.categoryCollection = collection(this.afs, 'categories');
  }

  getAllFirebase() {
    return collectionData(this.categoryCollection, {
      idField: 'id'
    });
  }

  createFirebase(category: ICategoryRequest) {
    return addDoc(this.categoryCollection, category);
  }

  updateFirebase(category: ICategoryRequest, id: string) {
    const categoryDocumentReferense = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReferense, {...category});
  }
  
  deleteFirebase(id: string) {
    const categoryDocumentReferense = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReferense);
  }

}