import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookDetailComponent implements OnInit {

  book = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    if (this.route.snapshot.params['token'].length < 15) {
      const title = this.route.snapshot.params['token'];
      this.http.post('/book/search', {title: title}).subscribe(data => {
        this.book = data;
      });
    } else {
      this.getBookDetail(this.route.snapshot.params['token']);
    }
  }

  getBookDetail(token) {
    this.http.get('/book/' + token).subscribe(data => {
      this.book = data;
    });
  }

  deleteBook(token) {
    this.http.delete('/book/' + token)
      .subscribe((err) => {
        console.log(err);
      }
    );
    this.router.navigate(['/books']);
  }

}
