import {
  Injectable
} from '@angular/core';
import { deleteObject, getDownloadURL, percentage,
         ref, Storage, uploadBytesResumable
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public uploadPercent = 0;

  constructor(private storage: Storage) { }

  async uploadFile(){
    
  }


}
