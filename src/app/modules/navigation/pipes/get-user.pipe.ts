import { Pipe, PipeTransform } from '@angular/core';
import { DocumentReference } from 'firebase/firestore';
import { Observable, Observer } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Pipe({
  name: 'getUser'
})
export class GetUserPipe implements PipeTransform {

  constructor(private userService: UsersService) {  }

  transform(userRef: DocumentReference) {
    return new Observable<string>((observer: Observer<string>) => {
      this.userService.fetchUserRef(userRef).subscribe((p) => {
        observer.next(`${p.username}`)
      });
    });
  }

}
