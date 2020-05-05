import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from './services/todo.service';
import { MatTableDataSource } from '@angular/material/table';
import { ITodo } from './interfaces/itodo';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'PlaceHolder';
  displayedColumns: string[] = ['id', 'userId', 'title', 'completed'];
  dataSource: MatTableDataSource<ITodo>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) page: MatPaginator;
  constructor(private todoService: TodoService) {}

  async ngOnInit() {
    const data = this.todoService.get();
    this.dataSource = new MatTableDataSource<ITodo>(await data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.page;
  }

  filterKeyUp(value: string) {
    this.dataSource.filter = value;
  }
}
