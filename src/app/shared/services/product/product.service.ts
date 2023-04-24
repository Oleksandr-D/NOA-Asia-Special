import { Injectable } from '@angular/core';
import {IProductRequest } from '../../interfaces/product/product.interface';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc,
         docData, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { collection, DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productCollection!: CollectionReference<DocumentData>;

   constructor(private afs: Firestore) {
    this.productCollection = collection(this.afs, 'products');
  }

  getAllFirebase() {
    return collectionData(this.productCollection, { idField: 'id' });
  }

  createFirebase(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  updateFirebase(product: IProductRequest, id: string) {
    const productDocumentReferense = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReferense, { ...product });
  }

  deleteFirebase(id: string) {
    const productDocumentReferense = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReferense);
  }

  getOneFirebase(id: string) {
    const productDocumentReferense = doc(this.afs, `products/${id}`);
    return docData(productDocumentReferense, { idField: 'id' });
  }

  async getAllByCategoryFirebase(name: string) {
    const arr: DocumentData[] = [];
    const category = query(
      collection(this.afs, 'products'), where('category.path', '==', `${name}`));
    const querySnapshot = await getDocs(category);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    return arr;
  }

}
