import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { collection, DocumentData } from '@firebase/firestore';
import { IProductRequest } from '../../interfaces/product/product.interface';
import { query, where, getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public changeBasket = new Subject<boolean>();
  private userCollection!: CollectionReference<DocumentData>;
  private productCollection!: CollectionReference<DocumentData>;

   constructor(private afs: Firestore) { 
    this.userCollection = collection(this.afs, 'users');
    this.productCollection = collection(this.afs, 'orders');
  }
  
  createFirebaseOrder(order: IProductRequest, userId: string) {
    const userOrderCollection = collection(this.afs, 'users', userId, 'orders');
    return addDoc(userOrderCollection, order);
  }

  getUserOrdersFirebase(userId: string): Observable<any[]> {
    const userOrdersCollection = collection(this.afs, 'users', userId, 'orders');
    const ordersQuery = query(userOrdersCollection);
    return new Observable((observer) => {
      getDocs(ordersQuery)
        .then((querySnapshot) => {
          const orders: any[] = [];
          querySnapshot.forEach((doc) => {
            const order = doc.data();
            orders.push(order);
          });
          observer.next(orders);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getOneFirebase(id: string) {
    return docData(doc(this.afs, `users/${id}`), { idField: 'id' });
  }
}
