import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookEditComponent implements OnInit {

  book = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getBook(this.route.snapshot.params['token']);
  }

  getBook(token) {
    this.http.get('/book/' + token).subscribe(data => {
      this.book = data;
    });
  }

  updateBook(book) {
    this.http.put('/book/' + book._key, book)
      .subscribe(res => {
          const returnedToken = res['_key'];
          this.router.navigate(['/book-details', returnedToken]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
