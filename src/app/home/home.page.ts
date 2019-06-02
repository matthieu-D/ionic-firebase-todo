import { Component } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;
  newTask = {name: ''};

  constructor(public db: AngularFireDatabase) {
    this.tasksRef = db.list('/tasks');

    this.tasks = this.tasksRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  addTask(newTask) {
    this.tasksRef.push(newTask);
    this.newTask = {name: ''};
  }

  removeTask(taskKey) {
    this.tasksRef.remove(taskKey);
  }

  updateTask(key, name) {
    this.tasksRef.update(key, {name: name});
  }
}
